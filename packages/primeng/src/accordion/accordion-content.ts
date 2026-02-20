import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { MotionOptions } from '@primeuix/motion';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { MotionModule } from 'primeng/motion';
import { AccordionContentPassThrough } from 'primeng/types/accordion';
import type { Accordion } from './accordion';
import { AccordionPanel } from './accordion-panel';
import { ACCORDION_INSTANCE, ACCORDION_CONTENT_INSTANCE, ACCORDION_PANEL_INSTANCE } from './accordion-token';
import { AccordionStyle } from './style/accordionstyle';

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

    pcAccordion = inject<Accordion>(ACCORDION_INSTANCE);

    pcAccordionPanel = inject<AccordionPanel>(ACCORDION_PANEL_INSTANCE);

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
