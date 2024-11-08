import { Component } from '@angular/core';
import { ImportDoc } from '@doc/tooltip/importdoc';
import { PositionDoc } from '@doc/tooltip/positiondoc';
import { EventDoc } from '@doc/tooltip/eventdoc';
import { AutoHideDoc } from '@doc/tooltip/autohidedoc';
import { DelayDoc } from '@doc/tooltip/delaydoc';
import { OptionsDoc } from '@doc/tooltip/optionsdoc';
import { AccessibilityDoc } from '@doc/tooltip/accessibilitydoc';
import { CustomDoc } from '@doc/tooltip/customdoc';
import { TooltipDocModule } from '@doc/tooltip/tooltipdoc.module';

@Component({
    template: `<app-doc
        docTitle="Angular Tooltip Component"
        header="Tooltip"
        description="Tooltip directive provides advisory information for a component. Tooltip is integrated within various PrimeNG components."
        [docs]="docs"
        [apiDocs]="['Tooltip', 'TooltipOptions']"
        themeDocs="tooltip"
    ></app-doc>`,
    standalone: true,
    imports: [TooltipDocModule],
})
export class TooltipDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc,
        },
        {
            id: 'position',
            label: 'Position',
            component: PositionDoc,
        },
        {
            id: 'event',
            label: 'Event',
            component: EventDoc,
        },
        {
            id: 'autohide',
            label: 'Auto Hide',
            component: AutoHideDoc,
        },
        {
            id: 'delay',
            label: 'Delay',
            component: DelayDoc,
        },
        {
            id: 'custom',
            label: 'Custom',
            component: CustomDoc,
        },
        {
            id: 'options',
            label: 'Tooltip Options',
            component: OptionsDoc,
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
