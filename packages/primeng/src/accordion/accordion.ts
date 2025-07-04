import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ContentChild, EventEmitter, forwardRef, HostListener, inject, Input, input, InputSignalWithTransform, model, NgModule, Output, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { findSingle, focus, getAttribute, uuid } from '@primeuix/utils';
import { BlockableUI, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { ChevronDownIcon, ChevronUpIcon } from 'primeng/icons';
import { Ripple } from 'primeng/ripple';
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

/**
 * AccordionPanel is a helper component for Accordion component.
 * @group Components
 */
@Component({
    selector: 'p-accordion-panel, p-accordionpanel',
    imports: [CommonModule],
    standalone: true,
    template: `<ng-content />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'cx("panel")',
        '[attr.data-pc-name]': '"accordionpanel"',
        '[attr.data-p-disabled]': 'disabled()',
        '[attr.data-p-active]': 'active()'
    },
    providers: [AccordionStyle]
})
export class AccordionPanel extends BaseComponent {
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
    imports: [CommonModule, ChevronDownIcon, ChevronUpIcon],
    standalone: true,
    template: `
        <ng-content />
        @if (toggleicon) {
            <ng-template *ngTemplateOutlet="toggleicon; context: { active: active() }"></ng-template>
        } @else {
            <ng-container *ngIf="active()">
                <span *ngIf="pcAccordion.collapseIcon" [class]="pcAccordion.collapseIcon" [ngClass]="pcAccordion.iconClass" [attr.aria-hidden]="true"></span>
                <svg data-p-icon="chevron-up" *ngIf="!pcAccordion.collapseIcon" [class]="pcAccordion.iconClass" [attr.aria-hidden]="true" />
            </ng-container>
            <ng-container *ngIf="!active()">
                <span *ngIf="pcAccordion.expandIcon" [class]="pcAccordion.expandIcon" [ngClass]="pcAccordion.iconClass" [attr.aria-hidden]="true"></span>
                <svg data-p-icon="chevron-down" *ngIf="!pcAccordion.expandIcon" [class]="pcAccordion.iconClass" [attr.aria-hidden]="true" />
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
        '[attr.data-pc-name]': '"accordionheader"',
        '[style.user-select]': '"none"'
    },
    hostDirectives: [Ripple],
    providers: [AccordionStyle]
})
export class AccordionHeader extends BaseComponent {
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

    @HostListener('focus', ['$event']) onFocus() {
        this.pcAccordion.selectOnFocus() && this.changeActiveValue();
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
        this.changeActiveValue();
        event.preventDefault();
    }
}

@Component({
    selector: 'p-accordion-content, p-accordioncontent',
    imports: [CommonModule],
    standalone: true,
    template: ` <div [class]="cx('content')" [@content]="active() ? { value: 'visible', params: { transitionParams: pcAccordion.transitionOptions } } : { value: 'hidden', params: { transitionParams: pcAccordion.transitionOptions } }">
        <ng-content />
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'cx("contentContainer")',
        '[attr.id]': 'id()',
        '[attr.role]': '"region"',
        '[attr.data-pc-name]': '"accordioncontent"',
        '[attr.data-p-active]': 'active()',
        '[attr.aria-labelledby]': 'ariaLabelledby()'
    },
    animations: [
        trigger('content', [
            state(
                'hidden',
                style({
                    height: '0',
                    paddingBottom: '0',
                    visibility: 'hidden'
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
    providers: [AccordionStyle]
})
export class AccordionContent extends BaseComponent {
    pcAccordion = inject(forwardRef(() => Accordion));

    pcAccordionPanel = inject(forwardRef(() => AccordionPanel));

    active = computed(() => this.pcAccordionPanel.active());

    ariaLabelledby = computed(() => `${this.pcAccordion.id()}_accordionheader_${this.pcAccordionPanel.value()}`);

    id = computed(() => `${this.pcAccordion.id()}_accordioncontent_${this.pcAccordionPanel.value()}`);

    _componentStyle = inject(AccordionStyle);
}

/**
 * Accordion groups a collection of contents in tabs.
 * @group Components
 */
@Component({
    selector: 'p-accordion',
    standalone: true,
    imports: [CommonModule, SharedModule],
    template: ` <ng-content /> `,
    host: {
        '[class]': "cn(cx('root'), styleClass)"
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [AccordionStyle]
})
export class Accordion extends BaseComponent implements BlockableUI {
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

        return headerElement ? (getAttribute(headerElement, 'data-p-disabled') ? this.findNextHeaderAction(headerElement.parentElement) : findSingle(headerElement.parentElement, '[data-pc-section="accordionheader"]')) : null;
    }

    findPrevHeaderAction(tabElement, selfCheck = false) {
        const prevTabElement = selfCheck ? tabElement : tabElement.previousElementSibling;
        const headerElement = findSingle(prevTabElement, '[data-pc-section="accordionheader"]');

        return headerElement ? (getAttribute(headerElement, 'data-p-disabled') ? this.findPrevHeaderAction(headerElement.parentElement) : findSingle(headerElement.parentElement, '[data-pc-section="accordionheader"]')) : null;
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
    imports: [Accordion, SharedModule, AccordionPanel, AccordionHeader, AccordionContent],
    exports: [Accordion, SharedModule, AccordionPanel, AccordionHeader, AccordionContent]
})
export class AccordionModule {}
