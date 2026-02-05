import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChild, forwardRef, HostListener, inject, InjectionToken, input, model, NgModule, output, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MotionOptions } from '@primeuix/motion';
import { findSingle, focus, getAttribute, uuid } from '@primeuix/utils';
import { BlockableUI, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { ChevronDownIcon, ChevronUpIcon } from 'primeng/icons';
import { MotionModule } from 'primeng/motion';
import { Ripple } from 'primeng/ripple';
import { AccordionContentPassThrough, AccordionHeaderPassThrough, AccordionPanelPassThrough, AccordionPassThrough, AccordionTabCloseEvent, AccordionTabOpenEvent, AccordionToggleIconTemplateContext, AccordionValue } from 'primeng/types/accordion';
import { transformToBoolean } from 'primeng/utils';
import { AccordionStyle } from './style/accordionstyle';

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
    imports: [BindModule],
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

    componentName = 'AccordionPanel';

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('root'));
    }

    pcAccordion = inject(forwardRef(() => Accordion));
    /**
     * Value of the active tab.
     * @defaultValue undefined
     * @group Props
     */
    value = model<AccordionValue>(undefined);
    /**
     * Disables the tab when enabled.
     * @defaultValue false
     * @group Props
     */
    disabled = input(false, { transform: (v: unknown) => transformToBoolean(v) });

    active = computed(() => (this.pcAccordion.multiple() ? this.valueEquals(this.pcAccordion.value(), this.value()) : this.pcAccordion.value() === this.value()));

    valueEquals(currentValue: AccordionValue, value: AccordionValue): boolean {
        if (Array.isArray(currentValue) && (typeof value === 'string' || typeof value === 'number')) {
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
    imports: [NgTemplateOutlet, ChevronDownIcon, ChevronUpIcon, BindModule],
    standalone: true,
    template: `
        <ng-content />
        @if (toggleicon()) {
            <ng-container *ngTemplateOutlet="toggleicon(); context: toggleIconContext()"></ng-container>
        } @else {
            @if (active()) {
                @if (pcAccordion.collapseIcon()) {
                    <span [class]="cn(cx('toggleicon'), pcAccordion.collapseIcon())" [attr.aria-hidden]="true" [pBind]="ptm('toggleicon')"></span>
                } @else {
                    <svg data-p-icon="chevron-up" [class]="cx('toggleicon')" [pBind]="ptm('toggleicon')" [attr.aria-hidden]="true" />
                }
            } @else {
                @if (pcAccordion.expandIcon()) {
                    <span [class]="cn(cx('toggleicon'), pcAccordion.expandIcon())" [attr.aria-hidden]="true" [pBind]="ptm('toggleicon')"></span>
                } @else {
                    <svg data-p-icon="chevron-down" [attr.aria-hidden]="true" [pBind]="ptm('toggleicon')" />
                }
            }
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
        '[attr.data-p]': 'dataP()'
    },
    hostDirectives: [Ripple, Bind],
    providers: [AccordionStyle, { provide: ACCORDION_HEADER_INSTANCE, useExisting: AccordionHeader }, { provide: PARENT_INSTANCE, useExisting: AccordionHeader }]
})
export class AccordionHeader extends BaseComponent<AccordionHeaderPassThrough> {
    $pcAccordionHeader: AccordionHeader | undefined = inject(ACCORDION_HEADER_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    componentName = 'AccordionHeader';

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
    toggleicon = contentChild<TemplateRef<AccordionToggleIconTemplateContext>>('toggleicon');

    toggleIconContext = computed<AccordionToggleIconTemplateContext>(() => ({ active: this.active() }));

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

    private findPanel(headerElement: EventTarget | null) {
        return (headerElement as HTMLElement | null)?.closest('[data-pc-name="accordionpanel"]') as HTMLElement | null;
    }

    private findHeader(panelElement: HTMLElement | null) {
        return panelElement ? (findSingle(panelElement, '[data-pc-name="accordionheader"]') as HTMLElement | null) : null;
    }

    private findNextPanel(panelElement: HTMLElement | null, selfCheck = false) {
        const element = selfCheck ? panelElement : (panelElement?.nextElementSibling as HTMLElement | null);
        return element ? (getAttribute(element, 'data-p-disabled') ? this.findNextPanel(element) : this.findHeader(element)) : null;
    }

    private findPrevPanel(panelElement: HTMLElement | null, selfCheck = false) {
        const element = selfCheck ? panelElement : (panelElement?.previousElementSibling as HTMLElement | null);
        return element ? (getAttribute(element, 'data-p-disabled') ? this.findPrevPanel(element) : this.findHeader(element)) : null;
    }

    private findFirstPanel() {
        return this.findNextPanel(this.pcAccordion.el.nativeElement.firstElementChild as HTMLElement | null, true);
    }

    private findLastPanel() {
        return this.findPrevPanel(this.pcAccordion.el.nativeElement.lastElementChild as HTMLElement | null, true);
    }

    private changeFocusedPanel(_event: KeyboardEvent, element: HTMLElement | null) {
        if (element) focus(element);
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

    dataP = computed(() =>
        this.cn({
            active: this.active()
        })
    );
}

@Component({
    selector: 'p-accordion-content, p-accordioncontent',
    imports: [BindModule, MotionModule],
    standalone: true,
    template: `
        <p-motion [visible]="active()" name="p-collapsible" hideStrategy="visibility" [mountOnEnter]="false" [unmountOnLeave]="false" [options]="computedMotionOptions()">
            <div [pBind]="ptm('contentWrapper', ptParams())" [class]="cx('contentWrapper')">
                <div [pBind]="ptm('content', ptParams())" [class]="cx('content')">
                    <ng-content />
                </div>
            </div>
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

    componentName = 'AccordionContent';

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

    computedMotionOptions = computed<MotionOptions>(() => {
        return {
            ...this.ptm('motion', this.ptParams()),
            ...this.pcAccordion.computedMotionOptions()
        };
    });
}

/**
 * Accordion groups a collection of contents in tabs.
 * @group Components
 */
@Component({
    selector: 'p-accordion',
    standalone: true,
    imports: [SharedModule, BindModule],
    template: ` <ng-content />`,
    host: {
        '[class]': "cx('root')"
    },
    hostDirectives: [Bind],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [AccordionStyle, { provide: ACCORDION_INSTANCE, useExisting: Accordion }, { provide: PARENT_INSTANCE, useExisting: Accordion }]
})
export class Accordion extends BaseComponent<AccordionPassThrough> implements BlockableUI {
    componentName = 'Accordion';

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
    value = model<AccordionValue>(undefined);
    /**
     * When enabled, multiple tabs can be activated at the same time.
     * @defaultValue false
     * @group Props
     */
    multiple = input(false, { transform: (v: unknown) => transformToBoolean(v) });
    /**
     * Icon of a collapsed tab.
     * @group Props
     */
    expandIcon = input<string>();
    /**
     * Icon of an expanded tab.
     * @group Props
     */
    collapseIcon = input<string>();
    /**
     * When enabled, the focused tab is activated.
     * @defaultValue false
     * @group Props
     */
    selectOnFocus = input(false, { transform: (v: unknown) => transformToBoolean(v) });
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
     * Callback to invoke when an active tab is collapsed by clicking on the header.
     * @param {AccordionTabCloseEvent} event - Custom tab close event.
     * @group Emits
     */
    onClose = output<AccordionTabCloseEvent>();
    /**
     * Callback to invoke when a tab gets expanded.
     * @param {AccordionTabOpenEvent} event - Custom tab open event.
     * @group Emits
     */
    onOpen = output<AccordionTabOpenEvent>();

    id = signal(uuid('pn_id_'));

    _componentStyle = inject(AccordionStyle);

    @HostListener('keydown', ['$event'])
    onKeydown(event: KeyboardEvent) {
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

    onTabArrowDownKey(event: KeyboardEvent) {
        const nextHeaderAction = this.findNextHeaderAction((event.target as HTMLElement | null)?.parentElement ?? null);
        nextHeaderAction ? this.changeFocusedTab(nextHeaderAction) : this.onTabHomeKey(event);
        event.preventDefault();
    }

    onTabArrowUpKey(event: KeyboardEvent) {
        const prevHeaderAction = this.findPrevHeaderAction((event.target as HTMLElement | null)?.parentElement ?? null);
        prevHeaderAction ? this.changeFocusedTab(prevHeaderAction) : this.onTabEndKey(event);
        event.preventDefault();
    }

    onTabHomeKey(event: KeyboardEvent) {
        const firstHeaderAction = this.findFirstHeaderAction();
        this.changeFocusedTab(firstHeaderAction);
        event.preventDefault();
    }

    changeFocusedTab(element: HTMLElement | null) {
        if (element) {
            focus(element);
        }
    }

    findNextHeaderAction(tabElement: HTMLElement | null, selfCheck = false) {
        const nextTabElement = selfCheck ? tabElement : (tabElement?.nextElementSibling as HTMLElement | null);
        const headerElement = nextTabElement ? (findSingle(nextTabElement, '[data-pc-section="accordionheader"]') as HTMLElement | null) : null;

        if (!headerElement) return null;
        if (getAttribute(headerElement, 'data-p-disabled')) {
            return this.findNextHeaderAction(headerElement.parentElement);
        }
        return findSingle(headerElement.parentElement!, '[data-pc-section="accordionheader"]') as HTMLElement | null;
    }

    findPrevHeaderAction(tabElement: HTMLElement | null, selfCheck = false) {
        const prevTabElement = selfCheck ? tabElement : (tabElement?.previousElementSibling as HTMLElement | null);
        const headerElement = prevTabElement ? (findSingle(prevTabElement, '[data-pc-section="accordionheader"]') as HTMLElement | null) : null;

        if (!headerElement) return null;
        if (getAttribute(headerElement, 'data-p-disabled')) {
            return this.findPrevHeaderAction(headerElement.parentElement);
        }
        return findSingle(headerElement.parentElement!, '[data-pc-section="accordionheader"]') as HTMLElement | null;
    }

    findFirstHeaderAction() {
        const firstEl = this.el.nativeElement.firstElementChild as HTMLElement | null;
        return this.findNextHeaderAction(firstEl, true);
    }

    findLastHeaderAction() {
        const lastEl = this.el.nativeElement.lastElementChild as HTMLElement | null;
        return this.findPrevHeaderAction(lastEl, true);
    }

    onTabEndKey(event: KeyboardEvent) {
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

            this.value.set(newValue);
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
