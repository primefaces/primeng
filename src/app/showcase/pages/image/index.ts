import { Component } from '@angular/core';
import { AccessibilityDoc } from '@doc/Image/accessibilitydoc';
import { BasicDoc } from '@doc/Image/basicdoc';
import { ImportDoc } from '@doc/Image/importdoc';
import { PreviewDoc } from '@doc/Image/previewdoc';
import { PreviewImageSourceDoc } from '@doc/Image/previewimagesourcedoc';
import { TemplateDoc } from '@doc/Image/templatedoc';
import { ImageDocModule } from '@doc/Image/imagedoc.module';

@Component({
    template: `<app-doc
        docTitle="Angular Image Component"
        header="Image"
        description="Displays an image with preview and tranformation options."
        [docs]="docs"
        [apiDocs]="['Image']"
        themeDocs="image"
    ></app-doc> `,
    standalone: true,
    imports: [ImageDocModule],
})
export class ImageDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc,
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc,
        },
        {
            id: 'preview',
            label: 'Preview',
            component: PreviewDoc,
        },
        {
            id: 'templates',
            label: 'Indicator',
            component: TemplateDoc,
        },
        {
            id: 'preview-image-source',
            label: 'Image Source',
            component: PreviewImageSourceDoc,
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
