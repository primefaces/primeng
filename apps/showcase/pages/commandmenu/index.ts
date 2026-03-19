import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/commandmenu/accessibility-doc';
import { BasicDoc } from '@/doc/commandmenu/basic-doc';
import { ControlledDoc } from '@/doc/commandmenu/controlled-doc';
import { CustomDoc } from '@/doc/commandmenu/custom-doc';
import { DialogDoc } from '@/doc/commandmenu/dialog-doc';
import { FilterDoc } from '@/doc/commandmenu/filter-doc';
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
        themeDocs="commandmenu"
    ></app-doc> `,
    standalone: true,
    imports: [AppDoc]
})
export class CommandMenuDemo {
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
                    id: 'controlled',
                    label: 'Controlled',
                    component: ControlledDoc
                },
                {
                    id: 'custom',
                    label: 'Custom Content',
                    component: CustomDoc
                },
                {
                    id: 'filter',
                    label: 'Custom Filter',
                    component: FilterDoc
                },
                {
                    id: 'dialog',
                    label: 'Dialog',
                    component: DialogDoc
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
