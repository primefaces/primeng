import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChild, HostListener, inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { findSingle, focus, getAttribute } from '@primeuix/utils';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { ChevronDown as ChevronDownIcon } from '@primeicons/angular/chevron-down';
import { ChevronUp as ChevronUpIcon } from '@primeicons/angular/chevron-up';
import { Ripple } from 'primeng/ripple';
import { AccordionHeaderPassThrough, AccordionToggleIconTemplateContext } from 'primeng/types/accordion';
import type { Accordion } from './accordion';
import { AccordionPanel } from './accordion-panel';
import { ACCORDION_INSTANCE, ACCORDION_HEADER_INSTANCE, ACCORDION_PANEL_INSTANCE } from './accordion-token';
import { AccordionStyle } from './style/accordionstyle';

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
        '[attr.tabindex]': 'hostTabindex()',
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

    pcAccordion = inject<Accordion>(ACCORDION_INSTANCE);

    pcAccordionPanel = inject<AccordionPanel>(ACCORDION_PANEL_INSTANCE);

    id = computed(() => `${this.pcAccordion.id()}_accordionheader_${this.pcAccordionPanel.value()}`);

    active = computed(() => this.pcAccordionPanel.active());

    disabled = computed(() => this.pcAccordionPanel.disabled());

    ariaControls = computed(() => `${this.pcAccordion.id()}_accordioncontent_${this.pcAccordionPanel.value()}`);

    hostTabindex = computed(() => (this.disabled() ? '-1' : '0'));
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
        const index = this.pcAccordionPanel.value() as number;

        if (!wasActive && isActive) {
            this.pcAccordion.onOpen.emit({ originalEvent: event!, index });
        } else if (wasActive && !isActive) {
            this.pcAccordion.onClose.emit({ originalEvent: event!, index });
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
        this.pcAccordion.updateValue(this.pcAccordionPanel.value() as string | number);
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
