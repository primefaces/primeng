import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, Input, NgModule, OnDestroy, Output, QueryList, Renderer2, TemplateRef, ViewChild, ViewEncapsulation, booleanAttribute } from '@angular/core';
import { BlockableUI, PrimeTemplate, SharedModule } from 'primeng/api';
import { MinusIcon } from 'primeng/icons/minus';
import { PlusIcon } from 'primeng/icons/plus';
import { RippleModule } from 'primeng/ripple';
import { Nullable } from 'primeng/ts-helpers';
import { UniqueComponentId } from 'primeng/utils';
import { FieldsetAfterToggleEvent, FieldsetBeforeToggleEvent } from './fieldset.interface';
import { Subject, takeUntil } from 'rxjs';

/**
 * Fieldset is a grouping component with the optional content toggle feature.
 * @group Components
 */
@Component({
    selector: 'p-fieldset',
    template: `
        <fieldset
            [attr.id]="id"
            [ngClass]="{ 'p-fieldset p-component': true, 'p-fieldset-toggleable': toggleable, 'p-fieldset-expanded': !collapsed && toggleable }"
            [ngStyle]="style"
            [class]="styleClass"
            [attr.data-pc-name]="'fieldset'"
            [attr.data-pc-section]="'root'"
        >
            <legend class="p-fieldset-legend" [attr.data-pc-section]="'legend'">
                <ng-container *ngIf="toggleable; else legendContent">
                    <a [attr.id]="id + '_header'" pRipple tabindex="0" role="button" [attr.aria-controls]="id + '_content'" [attr.aria-expanded]="!collapsed" [attr.aria-label]="buttonAriaLabel" (click)="toggle($event)" (keydown)="onKeyDown($event)">
                        <ng-container *ngIf="collapsed">
                            <PlusIcon *ngIf="!expandIconTemplate" [styleClass]="'p-fieldset-toggler'" [attr.data-pc-section]="'togglericon'" />
                            <span *ngIf="expandIconTemplate" class="p-fieldset-toggler" [attr.data-pc-section]="'togglericon'">
                                <ng-container *ngTemplateOutlet="expandIconTemplate"></ng-container>
                            </span>
                        </ng-container>
                        <ng-container *ngIf="!collapsed">
                            <MinusIcon *ngIf="!collapseIconTemplate" [styleClass]="'p-fieldset-toggler'" [attr.aria-hidden]="true" [attr.data-pc-section]="'togglericon'" />
                            <span *ngIf="collapseIconTemplate" class="p-fieldset-toggler" [attr.data-pc-section]="'togglericon'">
                                <ng-container *ngTemplateOutlet="collapseIconTemplate"></ng-container>
                            </span>
                        </ng-container>
                        <ng-container *ngTemplateOutlet="legendContent"></ng-container>
                    </a>
                </ng-container>
                <ng-template #legendContent>
                    <span class="p-fieldset-legend-text" [attr.data-pc-section]="'legendtitle'">{{ legend }}</span>
                    <ng-content select="p-header"></ng-content>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                </ng-template>
            </legend>
            <div
                [attr.id]="id + '_content'"
                role="region"
                class="p-toggleable-content"
                [@fieldsetContent]="collapsed ? { value: 'hidden', params: { transitionParams: transitionOptions, height: '0' } } : { value: 'visible', params: { transitionParams: animating ? transitionOptions : '0ms', height: '*' } }"
                [attr.aria-labelledby]="id + '_header'"
                [attr.aria-hidden]="collapsed"
                [attr.data-pc-section]="'toggleablecontent'"
                (@fieldsetContent.done)="onToggleDone()"
            >
                <div class="p-fieldset-content" [attr.data-pc-section]="'content'" #contentContainer>
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
            </div>
        </fieldset>
    `,
    animations: [
        trigger('fieldsetContent', [
            state(
                'hidden',
                style({
                    height: '0'
                })
            ),
            state(
                'visible',
                style({
                    height: '*'
                })
            ),
            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
            transition('void => *', animate(0))
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./fieldset.css'],
    host: {
        class: 'p-element'
    }
})
export class Fieldset implements AfterContentInit, BlockableUI, OnDestroy {
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
     * Defines the default visibility state of the content.
     * * @group Props
     */
    @Input({ transform: booleanAttribute }) collapsed: boolean | undefined = false;
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

    @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

    get id() {
        return UniqueComponentId();
    }

    get buttonAriaLabel() {
        return this.legend;
    }

    public animating: Nullable<boolean>;

    headerTemplate: Nullable<TemplateRef<any>>;

    contentTemplate: Nullable<TemplateRef<any>>;

    collapseIconTemplate: Nullable<TemplateRef<any>>;

    expandIconTemplate: Nullable<TemplateRef<any>>;

    @ViewChild('contentContainer') contentContainer: ElementRef;

    destroy$: Subject<void> = new Subject<void>();

    focusableChildren: NodeListOf<Element> | null = null;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {}

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'expandicon':
                    this.expandIconTemplate = item.template;
                    break;

                case 'collapseicon':
                    this.collapseIconTemplate = item.template;
                    break;

                case 'content':
                    this.contentTemplate = item.template;
                    break;
            }
        });

        this.onBeforeToggle.pipe(takeUntil(this.destroy$)).subscribe((event) => {
            if (event.collapsed) this.setTabIndexesRenderer(this.contentContainer.nativeElement, 0);
        });

        this.onAfterToggle.pipe(takeUntil(this.destroy$)).subscribe((event) => {
            if (event.collapsed) this.setTabIndexesRenderer(this.contentContainer.nativeElement, -1);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    setTabIndexesRenderer(parentElement: HTMLElement, tabindex: number) {
        requestAnimationFrame(() => {
            if (!this.focusableChildren) this.focusableChildren = parentElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

            this.focusableChildren.forEach((el) => {
                this.renderer.setAttribute(el, 'tabindex', tabindex.toString());
            });
        });
    }

    toggle(event: MouseEvent) {
        if (this.animating) {
            return false;
        }

        this.animating = true;
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });

        if (this.collapsed) this.expand();
        else this.collapse();

        this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        event.preventDefault();
    }

    onKeyDown(event) {
        if (event.code === 'Enter' || event.code === 'Space') {
            this.toggle(event);
            event.preventDefault();
        }
    }

    expand() {
        this.collapsed = false;
        this.collapsedChange.emit(this.collapsed);
    }

    collapse() {
        this.collapsed = true;
        this.collapsedChange.emit(this.collapsed);
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    onToggleDone() {
        this.animating = false;
    }
}

@NgModule({
    imports: [CommonModule, RippleModule, MinusIcon, PlusIcon],
    exports: [Fieldset, SharedModule],
    declarations: [Fieldset]
})
export class FieldsetModule {}
