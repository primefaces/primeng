import { CommonModule } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    inject,
    InjectionToken,
    input,
    Input,
    NgModule,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { MotionEvent, MotionOptions } from '@primeuix/motion';
import { uuid } from '@primeuix/utils';
import { BlockableUI, Footer, PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { ButtonModule } from 'primeng/button';
import { MinusIcon, PlusIcon } from 'primeng/icons';
import { MotionModule } from 'primeng/motion';
import { Nullable } from 'primeng/ts-helpers';
import type { PanelAfterToggleEvent, PanelBeforeToggleEvent, PanelHeaderIconsTemplateContext, PanelPassThrough } from 'primeng/types/panel';
import { PanelStyle } from './style/panelstyle';

const PANEL_INSTANCE = new InjectionToken<Panel>('PANEL_INSTANCE');

/**
 * Panel is a container with the optional content toggle feature.
 * @group Components
 */
@Component({
    selector: 'p-panel',
    standalone: true,
    imports: [CommonModule, PlusIcon, MinusIcon, ButtonModule, SharedModule, BindModule, MotionModule],
    template: `
        <div [pBind]="ptm('header')" [class]="cx('header')" *ngIf="showHeader" (click)="onHeaderClick($event)" [attr.id]="id + '-titlebar'" [attr.data-p]="dataP">
            <span [pBind]="ptm('title')" [class]="cx('title')" *ngIf="_header" [attr.id]="id + '_header'">{{ _header }}</span>
            <ng-content select="p-header"></ng-content>
            <ng-container *ngTemplateOutlet="headerTemplate || _headerTemplate"></ng-container>
            <div [pBind]="ptm('headerActions')" [class]="cx('headerActions')">
                <ng-template *ngTemplateOutlet="iconsTemplate || _iconsTemplate"></ng-template>
                <p-button
                    *ngIf="toggleable"
                    [attr.id]="id + '_header'"
                    severity="secondary"
                    [text]="true"
                    [rounded]="true"
                    type="button"
                    role="button"
                    [styleClass]="cx('pcToggleButton')"
                    [attr.aria-label]="buttonAriaLabel"
                    [attr.aria-controls]="id + '_content'"
                    [attr.aria-expanded]="!collapsed"
                    (click)="onIconClick($event)"
                    (keydown)="onKeyDown($event)"
                    [buttonProps]="toggleButtonProps"
                    [pt]="ptm('pcToggleButton')"
                    [unstyled]="unstyled()"
                >
                    <ng-template #icon>
                        <ng-container *ngIf="!headerIconsTemplate && !_headerIconsTemplate && !toggleButtonProps?.icon">
                            <ng-container *ngIf="!collapsed">
                                <svg data-p-icon="minus" [pBind]="ptm('pcToggleButton.icon')" />
                            </ng-container>

                            <ng-container *ngIf="collapsed">
                                <svg data-p-icon="plus" [pBind]="ptm('pcToggleButton.icon')" />
                            </ng-container>
                        </ng-container>

                        <ng-template *ngTemplateOutlet="headerIconsTemplate || _headerIconsTemplate; context: { $implicit: collapsed }"></ng-template>
                    </ng-template>
                </p-button>
            </div>
        </div>
        <div
            [pBind]="ptm('contentContainer')"
            [pMotion]="!toggleable || (toggleable && !collapsed)"
            pMotionName="p-collapsible"
            [pMotionOptions]="computedMotionOptions()"
            [class]="cx('contentContainer')"
            [id]="id + '_content'"
            role="region"
            [attr.aria-labelledby]="id + '_header'"
            [attr.aria-hidden]="collapsed"
            [attr.tabindex]="collapsed ? '-1' : undefined"
            (pMotionOnAfterEnter)="onToggleDone($event)"
        >
            <div [pBind]="ptm('contentWrapper')" [class]="cx('contentWrapper')">
                <div [pBind]="ptm('content')" [class]="cx('content')" #contentWrapper>
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate"></ng-container>
                </div>

                <div [pBind]="ptm('footer')" [class]="cx('footer')" *ngIf="footerFacet || footerTemplate || _footerTemplate">
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate || _footerTemplate"></ng-container>
                </div>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [PanelStyle, { provide: PANEL_INSTANCE, useExisting: Panel }, { provide: PARENT_INSTANCE, useExisting: Panel }],
    host: {
        '[id]': 'id',
        '[class]': "cn(cx('root'), styleClass)",
        '[attr.data-p]': 'dataP'
    },
    hostDirectives: [Bind]
})
export class Panel extends BaseComponent<PanelPassThrough> implements BlockableUI {
    componentName = 'Panel';

    $pcPanel: Panel | undefined = inject(PANEL_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    _componentStyle = inject(PanelStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * Id of the component.
     */
    @Input() id: string | undefined = uuid('pn_id_');
    /**
     * Defines if content of panel can be expanded and collapsed.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) toggleable: boolean | undefined;

    /**
     * Header text of the panel.
     * @group Props
     */
    @Input('header') _header: string | undefined;

    /**
     * Internal collapsed state
     */
    _collapsed: boolean | undefined;

    /**
     * Defines the initial state of panel content, supports one or two-way binding as well.
     * @group Props
     */
    @Input({ transform: booleanAttribute })
    get collapsed(): boolean | undefined {
        return this._collapsed;
    }
    set collapsed(value: boolean | undefined) {
        this._collapsed = value;
    }

    /**
     * Style class of the component.
     * @group Props
     * @deprecated since v20.0.0, use `class` instead.
     */
    @Input() styleClass: string | undefined;

    /**
     * Position of the icons.
     * @group Props
     */
    @Input() iconPos: 'start' | 'end' | 'center' = 'end';

    /**
     * Specifies if header of panel cannot be displayed.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showHeader: boolean = true;

    /**
     * Specifies the toggler element to toggle the panel content.
     * @group Props
     */
    @Input() toggler: 'icon' | 'header' = 'icon';

    /**
     * Transition options of the animation.
     * @group Props
     * @deprecated since v21.0.0, use `motionOptions` instead.
     */
    @Input() transitionOptions: string = '400ms cubic-bezier(0.86, 0, 0.07, 1)';

    /**
     * Used to pass all properties of the ButtonProps to the Button component.
     * @group Props
     */
    @Input() toggleButtonProps: any;

    /**
     * The motion options.
     * @group Props
     */
    motionOptions = input<MotionOptions | undefined>(undefined);

    computedMotionOptions = computed<MotionOptions>(() => {
        return {
            ...this.ptm('motion'),
            ...this.motionOptions()
        };
    });

    /**
     * Emitted when the collapsed changes.
     * @param {boolean} value - New Value.
     * @group Emits
     */
    @Output() collapsedChange: EventEmitter<boolean | undefined> = new EventEmitter<boolean | undefined>();

    /**
     * Callback to invoke before panel toggle.
     * @param {PanelBeforeToggleEvent} event - Custom panel toggle event
     * @group Emits
     */
    @Output() onBeforeToggle: EventEmitter<PanelBeforeToggleEvent> = new EventEmitter<PanelBeforeToggleEvent>();

    /**
     * Callback to invoke after panel toggle.
     * @param {PanelAfterToggleEvent} event - Custom panel toggle event
     * @group Emits
     */
    @Output() onAfterToggle: EventEmitter<PanelAfterToggleEvent> = new EventEmitter<PanelAfterToggleEvent>();

    @ContentChild(Footer) footerFacet: Nullable<TemplateRef<void>>;
    /**
     * Defines template option for header.
     * @group Templates
     */
    @ContentChild('header', { descendants: false }) headerTemplate: TemplateRef<void> | undefined;
    /**
     * Defines template option for icons.
     * @example
     * ```html
     * <ng-template #icons> </ng-template>
     * ```
     * @group Templates
     */
    @ContentChild('icons', { descendants: false }) iconsTemplate: TemplateRef<void> | undefined;

    /**
     * Defines template option for content.
     * @example
     * ```html
     * <ng-template #content> </ng-template>
     * ```
     * @group Templates
     */
    @ContentChild('content', { descendants: false }) contentTemplate: TemplateRef<void> | undefined;

    /**
     * Defines template option for footer.
     * @example
     * ```html
     * <ng-template #footer> </ng-template>
     * ```
     * @group Templates
     */
    @ContentChild('footer', { descendants: false }) footerTemplate: TemplateRef<void> | undefined;

    /**
     * Defines template option for headerIcon.
     * @param {PanelHeaderIconsTemplateContext} context - context of the template.
     * @example
     * ```html
     * <ng-template #headericons let-collapsed> </ng-template>
     * ```
     * @see {@link PanelHeaderIconsTemplateContext}
     * @group Templates
     */
    @ContentChild('headericons', { descendants: false }) headerIconsTemplate: TemplateRef<PanelHeaderIconsTemplateContext> | undefined;

    _headerTemplate: TemplateRef<void> | undefined;

    _iconsTemplate: TemplateRef<void> | undefined;

    _contentTemplate: TemplateRef<void> | undefined;

    _footerTemplate: TemplateRef<void> | undefined;

    _headerIconsTemplate: TemplateRef<PanelHeaderIconsTemplateContext> | undefined;

    @ViewChild('contentWrapper') contentWrapperViewChild: ElementRef;

    get buttonAriaLabel() {
        return this._header;
    }

    onHeaderClick(event: MouseEvent) {
        if (this.toggler === 'header') {
            this.toggle(event);
        }
    }

    onIconClick(event: MouseEvent) {
        if (this.toggler === 'icon') {
            this.toggle(event);
        }
    }

    toggle(event: MouseEvent) {
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });

        if (this.collapsed) this.expand();
        else this.collapse();

        event.preventDefault();
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
        return this.el.nativeElement;
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

    onKeyDown(event: KeyboardEvent) {
        if (event.code === 'Enter' || event.code === 'Space') {
            this.toggle(event as any);
            event.preventDefault();
        }
    }

    onToggleDone(event: MotionEvent) {
        this.onAfterToggle.emit({ originalEvent: event as any, collapsed: this.collapsed });
    }

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    onAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this._headerTemplate = item.template;
                    break;

                case 'content':
                    this._contentTemplate = item.template;
                    break;

                case 'footer':
                    this._footerTemplate = item.template;
                    break;

                case 'icons':
                    this._iconsTemplate = item.template;
                    break;

                case 'headericons':
                    this._headerIconsTemplate = item.template;
                    break;

                default:
                    this._contentTemplate = item.template;
                    break;
            }
        });
    }

    get dataP() {
        return this.cn({
            toggleable: this.toggleable
        });
    }
}

@NgModule({
    imports: [Panel, SharedModule, BindModule],
    exports: [Panel, SharedModule, BindModule]
})
export class PanelModule {}
