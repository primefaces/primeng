import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/scrollpanel/accessibility-doc';
import { BasicDoc } from '@/doc/scrollpanel/basic-doc';
import { CusstomDoc } from '@/doc/scrollpanel/custom-doc';
import { UsageDoc } from '@/doc/scrollpanel/usage-doc';
import { PTComponent } from '@/doc/scrollpanel/pt/PTComponent';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc
        docTitle="Angular Scroll Panel Component"
        header="ScrollPanel"
        description="ScrollPanel is a cross browser, lightweight and skinnable alternative to native browser scrollbar."
        [docs]="docs"
        [apiDocs]="['ScrollPanel']"
        themeDocs="scrollpanel"
        [ptDocs]="ptComponent"
        [heroDoc]="heroDoc"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class ScrollPanelDemo {
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
                    id: 'custom',
                    label: 'Custom',
                    component: CusstomDoc
                }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];

    ptComponent = PTComponent;
}
