import { AccessibilityDoc } from '@/doc/chip/accessibility-doc';
import { BasicDoc } from '@/doc/chip/basic-doc';
import { IconDoc } from '@/doc/chip/icon-doc';
import { ImageDoc } from '@/doc/chip/image-doc';
import { UsageDoc } from '@/doc/chip/usage-doc';
import { TemplateDoc } from '@/doc/chip/template-doc';
import { PTComponent } from '@/doc/chip/pt/PTComponent';
import { AppDoc } from '@/components/doc/app.doc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc docTitle="Angular Chip Component" header="Chip" description="Chip represents entities using icons, labels and images." [docs]="docs" [heroDoc]="heroDoc" [apiDocs]="['Chip']" [ptDocs]="ptComponent" themeDocs="chip"></app-doc>
    `
})
export class ChipDemo {
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
                { id: 'basic', label: 'Basic', component: BasicDoc },
                { id: 'icon', label: 'Icon', component: IconDoc },
                { id: 'image', label: 'Image', component: ImageDoc },
                { id: 'template', label: 'Template', component: TemplateDoc }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
