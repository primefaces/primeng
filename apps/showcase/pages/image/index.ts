import { AccessibilityDoc } from '@/doc/Image/accessibilitydoc';
import { BasicDoc } from '@/doc/Image/basicdoc';
import { ImageDocModule } from '@/doc/Image/imagedoc.module';
import { ImportDoc } from '@/doc/Image/importdoc';
import { PreviewDoc } from '@/doc/Image/previewdoc';
import { TemplateDoc } from '@/doc/Image/templatedoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Image Component" header="Image" description="Displays an image with preview and tranformation options." [docs]="docs" [apiDocs]="['Image']" themeDocs="image"></app-doc> `,
    standalone: true,
    imports: [ImageDocModule]
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
}
