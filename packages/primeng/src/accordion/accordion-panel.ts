import { ChangeDetectionStrategy, Component, computed, inject, input, model, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { AccordionPanelPassThrough, AccordionValue } from 'primeng/types/accordion';
import { transformToBoolean } from 'primeng/utils';
import type { Accordion } from './accordion';
import { ACCORDION_INSTANCE, ACCORDION_PANEL_INSTANCE } from './accordion-token';
import { AccordionStyle } from './style/accordionstyle';

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

    pcAccordion = inject<Accordion>(ACCORDION_INSTANCE);
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
