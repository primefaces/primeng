import { CommonModule } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    inject,
    InjectionToken,
    Input,
    NgModule,
    Output,
    QueryList,
    signal,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { uuid } from '@primeuix/utils';
import { BlockableUI, PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { MinusIcon, PlusIcon } from 'primeng/icons';
import type { FieldsetAfterToggleEvent, FieldsetBeforeToggleEvent, FieldsetPassThrough } from 'primeng/types/fieldset';
import { FieldsetStyle } from './style/fieldsetstyle';

const FIELDSET_INSTANCE = new InjectionToken<Fieldset>('FIELDSET_INSTANCE');

/**
 * Fieldset is a grouping component with the optional content toggle feature.
 * @group Components
 */
@Component({
    selector: 'p-fieldset',
    standalone: true,
    imports: [CommonModule, MinusIcon, PlusIcon, SharedModule, BindModule],
    template: `
        <fieldset [attr.id]="id" [ngStyle]="style" [class]="cn(cx('root'), styleClass)" [pBind]="ptm('root')" [attr.data-p]="dataP">
            <legend [class]="cx('legend')" [pBind]="ptm('legend')" [attr.data-p]="dataP">
                <ng-container *ngIf="toggleable; else legendContent">
                    <button
                        [attr.id]="id + '_header'"
                        tabindex="0"
                        role="button"
                        [attr.aria-controls]="id + '_content'"
                        [attr.aria-expanded]="!collapsed"
                        [attr.aria-label]="buttonAriaLabel"
                        (click)="toggle($event)"
                        (keydown)="onKeyDown($event)"
                        [class]="cx('toggleButton')"
                        [pBind]="ptm('toggleButton')"
                    >
                        <ng-container *ngIf="collapsed">
                            <svg data-p-icon="plus" *ngIf="!expandIconTemplate && !_expandIconTemplate" [class]="cx('toggleIcon')" [pBind]="ptm('toggleIcon')" />
                            <span *ngIf="expandIconTemplate || _expandIconTemplate" [class]="cx('toggleIcon')" [pBind]="ptm('toggleIcon')">
                                <ng-container *ngTemplateOutlet="expandIconTemplate || _expandIconTemplate"></ng-container>
                            </span>
                        </ng-container>
                        <ng-container *ngIf="!collapsed">
                            <svg data-p-icon="minus" *ngIf="!collapseIconTemplate && !_collapseIconTemplate" [class]="cx('toggleIcon')" [attr.aria-hidden]="true" [pBind]="ptm('toggleIcon')" />
                            <span *ngIf="collapseIconTemplate || _collapseIconTemplate" [class]="cx('toggleIcon')" [pBind]="ptm('toggleIcon')">
                                <ng-container *ngTemplateOutlet="collapseIconTemplate || _collapseIconTemplate"></ng-container>
                            </span>
                        </ng-container>
                        <ng-container *ngTemplateOutlet="legendContent"></ng-container>
                    </button>
                </ng-container>
                <ng-template #legendContent>
                    <span [class]="cx('legendLabel')" [pBind]="ptm('legendLabel')">{{ legend }}</span>
                    <ng-content select="p-header"></ng-content>
                    <ng-container *ngTemplateOutlet="headerTemplate || _headerTemplate"></ng-container>
                </ng-template>
            </legend>
            <div
                [attr.id]="id + '_content'"
                role="region"
                [class]="cx('contentContainer')"
                [pBind]="ptm('contentContainer')"
                [attr.aria-labelledby]="id + '_header'"
                [attr.aria-hidden]="collapsed"
                [class.p-animating]="animating()"
                [class.p-collapsible-open]="toggleable && !collapsed"
                (transitionrun)="onToggleStart($event)"
                (transitionend)="onToggleDone($event)"
            >
                <div [class]="cx('content')" [pBind]="ptm('content')" #contentWrapper>
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate"></ng-container>
                </div>
            </div>
        </fieldset>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [FieldsetStyle, { provide: FIELDSET_INSTANCE, useExisting: Fieldset }, { provide: PARENT_INSTANCE, useExisting: Fieldset }],
    hostDirectives: [Bind]
})
export class Fieldset extends BaseComponent<FieldsetPassThrough> implements BlockableUI {
    $pcFieldset: Fieldset | undefined = inject(FIELDSET_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    _componentStyle = inject(FieldsetStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('host'));
    }

    animating = signal<boolean>(false);

    get dataP() {
        return this.cn({
            toggleable: this.toggleable
        });
    }

    /**
     * Header text of the fieldset.
     * @group Props
     */
    @Input() legend: string | undefined;
    /**
     * When specified, content can toggled by clicking the legend.
     * @group Props
     * @defaultValue false
     */
    @Input({ transform: booleanAttribute }) toggleable: boolean | undefined;
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Transition options of the panel animation.
     * @group Props
     */
    @Input() transitionOptions: string = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
    /**
     * Emits when the collapsed state changes.
     * @param {boolean} value - New value.
     * @group Emits
     */
    @Output() collapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    /**
     * Callback to invoke before panel toggle.
     * @param {PanelBeforeToggleEvent} event - Custom toggle event
     * @group Emits
     */
    @Output() onBeforeToggle: EventEmitter<FieldsetBeforeToggleEvent> = new EventEmitter<FieldsetBeforeToggleEvent>();
    /**
     * Callback to invoke after panel toggle.
     * @param {PanelAfterToggleEvent} event - Custom toggle event
     * @group Emits
     */
    @Output() onAfterToggle: EventEmitter<FieldsetAfterToggleEvent> = new EventEmitter<FieldsetAfterToggleEvent>();

    @ViewChild('contentWrapper') contentWrapperViewChild: ElementRef;

    private _id: string = uuid('pn_id_');

    get id() {
        return this._id;
    }

    get buttonAriaLabel() {
        return this.legend;
    }

    /**
     * Internal collapsed state
     */
    _collapsed: boolean | undefined;

    /**
     * Defines the initial state of content, supports one or two-way binding as well.
     * @group Props
     */
    @Input({ transform: booleanAttribute })
    get collapsed(): boolean | undefined {
        return this._collapsed;
    }
    set collapsed(value: boolean | undefined) {
        this._collapsed = value;
        this.animating.set(true);
    }

    /**
     * Defines the header template.
     * @group Templates
     */
    @ContentChild('header', { descendants: false }) headerTemplate: TemplateRef<any> | undefined;

    /**
     * Defines the expandicon template.
     * @group Templates
     */
    @ContentChild('expandicon', { descendants: false }) expandIconTemplate: TemplateRef<any> | undefined;

    /**
     * Defines the collapseicon template.
     * @group Templates
     */
    @ContentChild('collapseicon', { descendants: false }) collapseIconTemplate: TemplateRef<any> | undefined;

    /**
     * Defines the content template.
     * @group Templates
     */
    @ContentChild('content', { descendants: false }) contentTemplate: TemplateRef<any> | undefined;

    toggle(event: MouseEvent) {
        this.animating.set(true);
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });

        if (this.collapsed) this.expand();
        else this.collapse();

        event.preventDefault();
    }

    onKeyDown(event) {
        if (event.code === 'Enter' || event.code === 'Space') {
            this.toggle(event);
            event.preventDefault();
        }
    }

    expand() {
        this._collapsed = false;
        this.collapsedChange.emit(false);
        this.updateTabIndex();
    }

    collapse() {
        this._collapsed = true;
        this.collapsedChange.emit(true);
        this.updateTabIndex();
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    updateTabIndex() {
        if (this.contentWrapperViewChild) {
            const focusableElements = this.contentWrapperViewChild.nativeElement.querySelectorAll('input, button, select, a, textarea, [tabindex]');
            focusableElements.forEach((element: HTMLElement) => {
                if (this.collapsed) {
                    element.setAttribute('tabindex', '-1');
                } else {
                    element.removeAttribute('tabindex');
                }
            });
        }
    }

    onToggleStart(event: TransitionEvent) {
        this.animating.set(true);
    }

    onToggleDone(event: any) {
        this.animating.set(false);
        this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
    }

    _headerTemplate: TemplateRef<any> | undefined;

    _expandIconTemplate: TemplateRef<any> | undefined;

    _collapseIconTemplate: TemplateRef<any> | undefined;

    _contentTemplate: TemplateRef<any> | undefined;

    @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

    onAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this._headerTemplate = item.template;
                    break;

                case 'expandicon':
                    this._expandIconTemplate = item.template;
                    break;

                case 'collapseicon':
                    this._collapseIconTemplate = item.template;
                    break;

                case 'content':
                    this._contentTemplate = item.template;
                    break;
            }
        });
    }
}

@NgModule({
    imports: [Fieldset, SharedModule, BindModule],
    exports: [Fieldset, SharedModule, BindModule]
})
export class FieldsetModule {}
