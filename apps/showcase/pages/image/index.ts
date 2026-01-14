import { AccessibilityDoc } from '@/doc/Image/accessibility-doc';
import { BasicDoc } from '@/doc/Image/basic-doc';
import { ImportDoc } from '@/doc/Image/import-doc';
import { PreviewDoc } from '@/doc/Image/preview-doc';
import { TemplateDoc } from '@/doc/Image/template-doc';
import { PTComponent } from '@/doc/Image/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc docTitle="Angular Image Component" header="Image" description="Displays an image with preview and tranformation options." [docs]="docs" [apiDocs]="['Image']" [ptDocs]="ptComponent" themeDocs="image"></app-doc> `,
    standalone: true,
    imports: [AppDoc]
})
export class ImageDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc
        },
        {
            id: 'preview',
            label: 'Preview',
            component: PreviewDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];

    ptComponent = PTComponent;
}
