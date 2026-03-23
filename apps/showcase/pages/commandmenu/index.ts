import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/commandmenu/accessibility-doc';
import { BasicDoc } from '@/doc/commandmenu/basic-doc';
import { ControlledDoc } from '@/doc/commandmenu/controlled-doc';
import { CustomDoc } from '@/doc/commandmenu/custom-doc';
import { WithDialogDoc } from '@/doc/commandmenu/with-dialog-doc';
import { FilterDoc } from '@/doc/commandmenu/filter-doc';
import { PTComponent } from '@/doc/commandmenu/pt/PTComponent';
import { UsageDoc } from '@/doc/commandmenu/usage-doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc
        docTitle="Angular CommandMenu Component"
        header="CommandMenu"
        description="CommandMenu is a search-driven command palette component."
        [docs]="docs"
        [heroDoc]="heroDoc"
        [apiDocs]="['CommandMenu']"
        [ptDocs]="ptComponent"
        themeDocs="commandmenu"
    ></app-doc> `,
    standalone: true,
    imports: [AppDoc]
})
export class CommandMenuDemo {
    ptComponent = PTComponent;
    heroDoc = BasicDoc;

    docs = [
        {
            id: 'usage',
            label: 'Usage',
            component: UsageDoc
        },
        {
            id: 'examples',
            label: 'Examples',
            children: [
                {
                    id: 'basic',
                    label: 'Basic',
                    component: BasicDoc
                },
                {
                    id: 'filter',
                    label: 'Filter',
                    component: FilterDoc
                },
                {
                    id: 'controlled',
                    label: 'Controlled',
                    component: ControlledDoc
                },
                {
                    id: 'with-dialog',
                    label: 'With Dialog',
                    component: WithDialogDoc
                },
                {
                    id: 'custom',
                    label: 'Custom',
                    component: CustomDoc
                }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
