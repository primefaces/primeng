import { ChangeDetectionStrategy, Component, computed, HostListener, inject, input, model, NgModule, output, signal } from '@angular/core';
import { MotionOptions } from '@primeuix/motion';
import { findSingle, focus, getAttribute, uuid } from '@primeuix/utils';
import { BlockableUI, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { AccordionPassThrough, AccordionTabCloseEvent, AccordionTabOpenEvent, AccordionValue } from 'primeng/types/accordion';
import { transformToBoolean } from 'primeng/utils';
import { AccordionContent } from './accordion-content';
import { AccordionHeader } from './accordion-header';
import { AccordionPanel } from './accordion-panel';
import { ACCORDION_INSTANCE } from './accordion-token';
import { AccordionStyle } from './style/accordionstyle';

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
