import { AccessibilityDoc } from '@/doc/fluid/accessibility-doc';
import { BasicDoc } from '@/doc/fluid/basic-doc';
import { UsageDoc } from '@/doc/fluid/usage-doc';
import { PTComponent } from '@/doc/fluid/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc
            docTitle="Angular Fluid Component"
            header="Fluid"
            description="Fluid is a layout component to make descendant components span full width of their container."
            [docs]="docs"
            [heroDoc]="heroDoc"
            [ptDocs]="ptComponent"
            themeDocs="fluid"
        ></app-doc>
    `
})
export class FluidDemo {
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
