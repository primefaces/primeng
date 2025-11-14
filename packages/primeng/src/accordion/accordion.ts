import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ContentChild,
    EventEmitter,
    forwardRef,
    HostListener,
    inject,
    InjectionToken,
    Input,
    input,
    InputSignalWithTransform,
    model,
    NgModule,
    Output,
    signal,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { findSingle, focus, getAttribute, uuid } from '@primeuix/utils';
import { BlockableUI, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { ChevronDownIcon, ChevronUpIcon } from 'primeng/icons';
import { MotionModule } from 'primeng/motion';
import { Ripple } from 'primeng/ripple';
import { AccordionContentPassThrough, AccordionHeaderPassThrough, AccordionPanelPassThrough, AccordionPassThrough } from 'primeng/types/accordion';
import { transformToBoolean } from 'primeng/utils';
import { AccordionStyle } from './style/accordionstyle';

/**
 * Custom tab open event.
 * @see {@link onOpen}
 * @group Interface
 */
export interface AccordionTabOpenEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Opened tab index.
     */
    index: number;
}

/**
 * Custom tab close event.
 * @see {@link onClose}
 * @extends {AccordionTabOpenEvent}
 * @group Interface
 */
export interface AccordionTabCloseEvent extends AccordionTabOpenEvent {}

/**
 * Toggle icon template context.
 * @group Interface
 */
export interface AccordionToggleIconTemplateContext {
    /**
     * Represents the active status of the panel.
     */
    active: boolean;
}
const ACCORDION_PANEL_INSTANCE = new InjectionToken<AccordionPanel>('ACCORDION_PANEL_INSTANCE');
const ACCORDION_HEADER_INSTANCE = new InjectionToken<AccordionHeader>('ACCORDION_HEADER_INSTANCE');
const ACCORDION_CONTENT_INSTANCE = new InjectionToken<AccordionContent>('ACCORDION_CONTENT_INSTANCE');
const ACCORDION_INSTANCE = new InjectionToken<Accordion>('ACCORDION_INSTANCE');

/**
 * AccordionPanel is a helper component for Accordion component.
 * @group Components
 */
@Component({
    selector: 'p-accordion-panel, p-accordionpanel',
    imports: [CommonModule, BindModule],
    standalone: true,
    template: `<ng-content />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'cx("panel")',
        '[attr.data-p-disabled]': 'disabled()',
        '[attr.data-p-active]': 'active()'
    },
    hostDirectives: [Bind],
    providers: [AccordionStyle, { provide: ACCORDION_PANEL_INSTANCE, useExisting: AccordionPanel }, { provide: PARENT_INSTANCE, useExisting: AccordionPanel }]
})
export class AccordionPanel extends BaseComponent<AccordionPanelPassThrough> {
    $pcAccordionPanel: AccordionPanel | undefined = inject(ACCORDION_PANEL_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('root'));
    }

    pcAccordion = inject(forwardRef(() => Accordion));
    /**
     * Value of the active tab.
     * @defaultValue undefined
     * @group Props
     */
    value = model<undefined | null | string | number | string[] | number[]>(undefined);
    /**
     * Disables the tab when enabled.
     * @defaultValue false
     * @group Props
     */
    disabled: InputSignalWithTransform<any, boolean> = input(false, { transform: (v: any) => transformToBoolean(v) });

    active = computed(() => (this.pcAccordion.multiple() ? this.valueEquals(this.pcAccordion.value(), this.value()) : this.pcAccordion.value() === this.value()));

    valueEquals(currentValue: any, value: any): boolean {
        if (Array.isArray(currentValue)) {
            return currentValue.includes(value);
        }
        return currentValue === value;
    }

    _componentStyle = inject(AccordionStyle);
}
/**
 * AccordionHeader is a helper component for Accordion component.
 * @group Components
 */
@Component({
    selector: 'p-accordion-header, p-accordionheader',
    imports: [CommonModule, ChevronDownIcon, ChevronUpIcon, BindModule],
    standalone: true,
    template: `
        <ng-content />
        @if (toggleicon) {
            <ng-template *ngTemplateOutlet="toggleicon; context: { active: active() }"></ng-template>
        } @else {
            <ng-container *ngIf="active()">
                <span *ngIf="pcAccordion.collapseIcon" [class]="cn(cx('toggleicon'), pcAccordion.collapseIcon)" [attr.aria-hidden]="true" [pBind]="ptm('toggleicon')"></span>
                <svg data-p-icon="chevron-up" *ngIf="!pcAccordion.collapseIcon" [class]="cx('toggleicon')" [pBind]="ptm('toggleicon')" [attr.aria-hidden]="true" />
            </ng-container>
            <ng-container *ngIf="!active()">
                <span *ngIf="pcAccordion.expandIcon" [class]="cn(cx('toggleicon'), pcAccordion.expandIcon)" [attr.aria-hidden]="true" [pBind]="ptm('toggleicon')"></span>
                <svg data-p-icon="chevron-down" *ngIf="!pcAccordion.expandIcon" [attr.aria-hidden]="true" [pBind]="ptm('toggleicon')" />
            </ng-container>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cx('header')",
        '[attr.id]': 'id()',
        '[attr.aria-expanded]': 'active()',
        '[attr.aria-controls]': 'ariaControls()',
        '[attr.aria-disabled]': 'disabled()',
        '[attr.role]': '"button"',
        '[attr.tabindex]': 'disabled()?"-1":"0"',
        '[attr.data-p-active]': 'active()',
        '[attr.data-p-disabled]': 'disabled()',
        '[style.user-select]': '"none"',
        '[attr.data-p]': 'dataP'
    },
    hostDirectives: [Ripple, Bind],
    providers: [AccordionStyle, { provide: ACCORDION_HEADER_INSTANCE, useExisting: AccordionHeader }, { provide: PARENT_INSTANCE, useExisting: AccordionHeader }]
})
export class AccordionHeader extends BaseComponent<AccordionHeaderPassThrough> {
    $pcAccordionHeader: AccordionHeader | undefined = inject(ACCORDION_HEADER_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('root'));
    }

    pcAccordion = inject(forwardRef(() => Accordion));

    pcAccordionPanel = inject(forwardRef(() => AccordionPanel));

    id = computed(() => `${this.pcAccordion.id()}_accordionheader_${this.pcAccordionPanel.value()}`);

    active = computed(() => this.pcAccordionPanel.active());

    disabled = computed(() => this.pcAccordionPanel.disabled());

    ariaControls = computed(() => `${this.pcAccordion.id()}_accordioncontent_${this.pcAccordionPanel.value()}`);
    /**
     * Toggle icon template.
     * @type {TemplateRef<AccordionToggleIconTemplateContext>} context - Context of the template
     * @example
     * ```html
     * <ng-template #toggleicon let-active="active"> </ng-template>
     * ```
     * @see {@link AccordionToggleIconTemplateContext}
     * @group Templates
     */
    @ContentChild('toggleicon') toggleicon: TemplateRef<AccordionToggleIconTemplateContext> | undefined;

    @HostListener('click', ['$event']) onClick(event?: MouseEvent | KeyboardEvent) {
        if (this.disabled()) {
            return;
        }

        const wasActive = this.active();

        this.changeActiveValue();

        const isActive = this.active();
        const index = this.pcAccordionPanel.value();

        if (!wasActive && isActive) {
            this.pcAccordion.onOpen.emit({ originalEvent: event, index });
        } else if (wasActive && !isActive) {
            this.pcAccordion.onClose.emit({ originalEvent: event, index });
        }
    }

    @HostListener('focus') onFocus() {
        if (!this.disabled() && this.pcAccordion.selectOnFocus()) {
            this.changeActiveValue();
        }
    }

    @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
        switch (event.code) {
            case 'ArrowDown':
                this.arrowDownKey(event);
                break;
            case 'ArrowUp':
                this.arrowUpKey(event);
                break;
            case 'Home':
                this.onHomeKey(event);
                break;
            case 'End':
                this.onEndKey(event);
                break;
            case 'Enter':
            case 'Space':
            case 'NumpadEnter':
                this.onEnterKey(event);
                break;
            default:
                break;
        }
    }

    _componentStyle = inject(AccordionStyle);

    changeActiveValue() {
        this.pcAccordion.updateValue(this.pcAccordionPanel.value());
    }

    private findPanel(headerElement) {
        return headerElement?.closest('[data-pc-name="accordionpanel"]');
    }

    private findHeader(panelElement) {
        return findSingle(panelElement, '[data-pc-name="accordionheader"]');
    }

    private findNextPanel(panelElement, selfCheck = false) {
        const element = selfCheck ? panelElement : panelElement.nextElementSibling;

        return element ? (getAttribute(element, 'data-p-disabled') ? this.findNextPanel(element) : this.findHeader(element)) : null;
    }

    private findPrevPanel(panelElement, selfCheck = false) {
        const element = selfCheck ? panelElement : panelElement.previousElementSibling;

        return element ? (getAttribute(element, 'data-p-disabled') ? this.findPrevPanel(element) : this.findHeader(element)) : null;
    }

    private findFirstPanel() {
        return this.findNextPanel(this.pcAccordion.el.nativeElement.firstElementChild, true);
    }

    private findLastPanel() {
        return this.findPrevPanel(this.pcAccordion.el.nativeElement.lastElementChild, true);
    }

    private changeFocusedPanel(event, element) {
        focus(element);
    }

    private arrowDownKey(event: KeyboardEvent) {
        const nextPanel = this.findNextPanel(this.findPanel(event.currentTarget));
        nextPanel ? this.changeFocusedPanel(event, nextPanel) : this.onHomeKey(event);
        event.preventDefault();
    }

    private arrowUpKey(event: KeyboardEvent) {
        const prevPanel = this.findPrevPanel(this.findPanel(event.currentTarget));

        prevPanel ? this.changeFocusedPanel(event, prevPanel) : this.onEndKey(event);
        event.preventDefault();
    }

    private onHomeKey(event: KeyboardEvent) {
        const firstPanel = this.findFirstPanel();

        this.changeFocusedPanel(event, firstPanel);
        event.preventDefault();
    }

    private onEndKey(event: KeyboardEvent) {
        const lastPanel = this.findLastPanel();

        this.changeFocusedPanel(event, lastPanel);
        event.preventDefault();
    }

    private onEnterKey(event: KeyboardEvent) {
        if (!this.disabled()) {
            this.changeActiveValue();
        }
        event.preventDefault();
    }

    get dataP() {
        return this.cn({
            active: this.active()
        });
    }
}

@Component({
    selector: 'p-accordion-content, p-accordioncontent',
    imports: [CommonModule, BindModule, MotionModule],
    standalone: true,
    template: `
        <p-motion [visible]="active()" name="p-accordion-content" hideStrategy="visibility" [mountOnEnter]="false" [unmountOnLeave]="false">
            <div [pBind]="ptm('content', ptParams())" [class]="cx('content')"><ng-content /></div>
        </p-motion>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'cx("contentContainer")',
        '[attr.id]': 'id()',
        '[attr.role]': '"region"',
        '[attr.data-p-active]': 'active()',
        '[attr.aria-labelledby]': 'ariaLabelledby()'
    },
    hostDirectives: [Bind],
    providers: [AccordionStyle, { provide: ACCORDION_CONTENT_INSTANCE, useExisting: AccordionContent }, { provide: PARENT_INSTANCE, useExisting: AccordionContent }]
})
export class AccordionContent extends BaseComponent<AccordionContentPassThrough> {
    $pcAccordionContent: AccordionContent | undefined = inject(ACCORDION_CONTENT_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('root'));
    }

    pcAccordion = inject(forwardRef(() => Accordion));

    pcAccordionPanel = inject(forwardRef(() => AccordionPanel));

    active = computed(() => this.pcAccordionPanel.active());

    ariaLabelledby = computed(() => `${this.pcAccordion.id()}_accordionheader_${this.pcAccordionPanel.value()}`);

    id = computed(() => `${this.pcAccordion.id()}_accordioncontent_${this.pcAccordionPanel.value()}`);

    _componentStyle = inject(AccordionStyle);

    ptParams = computed(() => ({ context: this.active() }));
}

/**
 * Accordion groups a collection of contents in tabs.
 * @group Components
 */
@Component({
    selector: 'p-accordion',
    standalone: true,
    imports: [CommonModule, SharedModule, BindModule],
    template: ` <ng-content />`,
    host: {
        '[class]': "cn(cx('root'), styleClass)"
    },
    hostDirectives: [Bind],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [AccordionStyle, { provide: ACCORDION_INSTANCE, useExisting: Accordion }, { provide: PARENT_INSTANCE, useExisting: Accordion }]
})
export class Accordion extends BaseComponent<AccordionPassThrough> implements BlockableUI {
    $pcAccordion: Accordion | undefined = inject(ACCORDION_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('root'));
    }

    /**
     * Value of the active tab.
     * @defaultValue undefined
     * @group Props
     */
    value = model<undefined | null | string | number | string[] | number[]>(undefined);
    /**
     * When enabled, multiple tabs can be activated at the same time.
     * @defaultValue false
     * @group Props
     */
    multiple = input(false, { transform: (v: any) => transformToBoolean(v) });
    /**
     * Class of the element.
     * @deprecated since v20.0.0, use `class` instead.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Icon of a collapsed tab.
     * @group Props
     */
    @Input() expandIcon: string | undefined;
    /**
     * Icon of an expanded tab.
     * @group Props
     */
    @Input() collapseIcon: string | undefined;
    /**
     * When enabled, the focused tab is activated.
     * @defaultValue false
     * @group Props
     */
    selectOnFocus = input(false, { transform: (v: any) => transformToBoolean(v) });
    /**
     * Transition options of the animation.
     * @group Props
     */
    @Input() transitionOptions: string = '400ms cubic-bezier(0.86, 0, 0.07, 1)';

    /**
     * Callback to invoke when an active tab is collapsed by clicking on the header.
     * @param {AccordionTabCloseEvent} event - Custom tab close event.
     * @group Emits
     */
    @Output() onClose: EventEmitter<AccordionTabCloseEvent> = new EventEmitter();
    /**
     * Callback to invoke when a tab gets expanded.
     * @param {AccordionTabOpenEvent} event - Custom tab open event.
     * @group Emits
     */
    @Output() onOpen: EventEmitter<AccordionTabOpenEvent> = new EventEmitter();

    id = signal(uuid('pn_id_'));

    _componentStyle = inject(AccordionStyle);

    @HostListener('keydown', ['$event'])
    onKeydown(event) {
        switch (event.code) {
            case 'ArrowDown':
                this.onTabArrowDownKey(event);
                break;

            case 'ArrowUp':
                this.onTabArrowUpKey(event);
                break;

            case 'Home':
                if (!event.shiftKey) {
                    this.onTabHomeKey(event);
                }
                break;

            case 'End':
                if (!event.shiftKey) {
                    this.onTabEndKey(event);
                }
                break;
        }
    }

    onTabArrowDownKey(event) {
        const nextHeaderAction = this.findNextHeaderAction(event.target.parentElement);
        nextHeaderAction ? this.changeFocusedTab(nextHeaderAction) : this.onTabHomeKey(event);

        event.preventDefault();
    }

    onTabArrowUpKey(event) {
        const prevHeaderAction = this.findPrevHeaderAction(event.target.parentElement);
        prevHeaderAction ? this.changeFocusedTab(prevHeaderAction) : this.onTabEndKey(event);

        event.preventDefault();
    }

    onTabHomeKey(event) {
        const firstHeaderAction = this.findFirstHeaderAction();
        this.changeFocusedTab(firstHeaderAction);
        event.preventDefault();
    }

    changeFocusedTab(element) {
        if (element) {
            focus(element);
        }
    }

    findNextHeaderAction(tabElement, selfCheck = false) {
        const nextTabElement = selfCheck ? tabElement : tabElement.nextElementSibling;
        const headerElement = findSingle(nextTabElement, '[data-pc-section="accordionheader"]');

        return headerElement ? (getAttribute(headerElement, 'data-p-disabled') ? this.findNextHeaderAction(headerElement.parentElement) : findSingle(headerElement.parentElement as HTMLElement, '[data-pc-section="accordionheader"]')) : null;
    }

    findPrevHeaderAction(tabElement, selfCheck = false) {
        const prevTabElement = selfCheck ? tabElement : tabElement.previousElementSibling;
        const headerElement = findSingle(prevTabElement, '[data-pc-section="accordionheader"]');

        return headerElement ? (getAttribute(headerElement, 'data-p-disabled') ? this.findPrevHeaderAction(headerElement.parentElement) : findSingle(headerElement.parentElement as HTMLElement, '[data-pc-section="accordionheader"]')) : null;
    }

    findFirstHeaderAction() {
        const firstEl = this.el.nativeElement.firstElementChild;
        return this.findNextHeaderAction(firstEl, true);
    }

    findLastHeaderAction() {
        const lastEl = this.el.nativeElement.lastElementChild;
        return this.findPrevHeaderAction(lastEl, true);
    }

    onTabEndKey(event) {
        const lastHeaderAction = this.findLastHeaderAction();
        this.changeFocusedTab(lastHeaderAction);
        event.preventDefault();
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    updateValue(value: string | number) {
        const currentValue = this.value();
        if (this.multiple()) {
            const newValue = Array.isArray(currentValue) ? [...currentValue] : [];
            const index = newValue.indexOf(value);

            if (index !== -1) {
                newValue.splice(index, 1);
            } else {
                newValue.push(value);
            }

            this.value.set(newValue as typeof this.value extends (...args: any) => infer R ? R : never);
        } else {
            if (currentValue === value) {
                this.value.set(undefined);
            } else {
                this.value.set(value);
            }
        }
    }
}

@NgModule({
    imports: [Accordion, SharedModule, AccordionPanel, AccordionHeader, AccordionContent, BindModule],
    exports: [Accordion, SharedModule, AccordionPanel, AccordionHeader, AccordionContent, BindModule]
})
export class AccordionModule {}
