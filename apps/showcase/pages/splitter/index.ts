import { AccessibilityDoc } from '@/doc/splitter/accessibility-doc';
import { HorizontalDoc } from '@/doc/splitter/horizontal-doc';
import { UsageDoc } from '@/doc/splitter/usage-doc';
import { NestedDoc } from '@/doc/splitter/nested-doc';
import { SizeDoc } from '@/doc/splitter/size-doc';
import { VerticalDoc } from '@/doc/splitter/vertical-doc';
import { PTComponent } from '@/doc/splitter/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `
        <app-doc
            docTitle="Angular Splitter Component"
            header="Splitter"
            description="Splitter is utilized to separate and resize panels."
            [docs]="docs"
            [heroDoc]="heroDoc"
            [apiDocs]="['Splitter']"
            [ptDocs]="ptComponent"
            themeDocs="splitter"
        ></app-doc>
    `,
    standalone: true,
    imports: [AppDoc]
})
export class SplitterDemo {
    ptComponent = PTComponent;
    heroDoc = HorizontalDoc;
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
                    id: 'horizontal',
                    label: 'Horizontal',
                    component: HorizontalDoc
                },
                {
                    id: 'size',
                    label: 'Size',
                    component: SizeDoc
                },
                {
                    id: 'vertical',
                    label: 'Vertical',
                    component: VerticalDoc
                },
                {
                    id: 'nested',
                    label: 'Nested',
                    component: NestedDoc
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
