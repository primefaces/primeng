import { AccessibilityDoc } from '@/doc/Image/accessibility-doc';
import { BasicDoc } from '@/doc/Image/basic-doc';
import { UsageDoc } from '@/doc/Image/usage-doc';
import { PreviewDoc } from '@/doc/Image/preview-doc';
import { TemplateDoc } from '@/doc/Image/template-doc';
import { PTComponent } from '@/doc/Image/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `
        <app-doc docTitle="Angular Image Component" header="Image" description="Displays an image with preview and tranformation options." [docs]="docs" [heroDoc]="heroDoc" [apiDocs]="['Image']" [ptDocs]="ptComponent" themeDocs="image"></app-doc>
    `,
    standalone: true,
    imports: [AppDoc]
})
export class ImageDemo {
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
                { id: 'preview', label: 'Preview', component: PreviewDoc },
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
