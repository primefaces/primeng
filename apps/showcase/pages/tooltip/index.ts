import { AccessibilityDoc } from '@/doc/tooltip/accessibility-doc';
import { AutoHideDoc } from '@/doc/tooltip/autohide-doc';
import { CustomDoc } from '@/doc/tooltip/custom-doc';
import { DelayDoc } from '@/doc/tooltip/delay-doc';
import { EventDoc } from '@/doc/tooltip/event-doc';
import { ImportDoc } from '@/doc/tooltip/import-doc';
import { OptionsDoc } from '@/doc/tooltip/options-doc';
import { PositionDoc } from '@/doc/tooltip/position-doc';
import { PTComponent } from '@/doc/tooltip/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc
        docTitle="Angular Tooltip Component"
        header="Tooltip"
        description="Tooltip directive provides advisory information for a component. Tooltip is integrated within various PrimeNG components."
        [docs]="docs"
        [apiDocs]="['Tooltip', 'TooltipOptions']"
        [ptDocs]="ptComponent"
        themeDocs="tooltip"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class TooltipDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'position',
            label: 'Position',
            component: PositionDoc
        },
        {
            id: 'event',
            label: 'Event',
            component: EventDoc
        },
        {
            id: 'autohide',
            label: 'Auto Hide',
            component: AutoHideDoc
        },
        {
            id: 'delay',
            label: 'Delay',
            component: DelayDoc
        },
        {
            id: 'custom',
            label: 'Custom',
            component: CustomDoc
        },
        {
            id: 'options',
            label: 'Tooltip Options',
            component: OptionsDoc
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];

    ptComponent = PTComponent;
}
