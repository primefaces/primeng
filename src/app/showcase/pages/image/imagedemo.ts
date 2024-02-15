import { Component } from '@angular/core';
import { AccessibilityDoc } from '../../doc/Image/accessibilitydoc';
import { BasicDoc } from '../../doc/Image/basicdoc';
import { ImportDoc } from '../../doc/Image/importdoc';
import { PreviewDoc } from '../../doc/Image/previewdoc';
import { PreviewImageSourceDoc } from '../../doc/Image/previewimagesourcedoc';
import { StyleDoc } from '../../doc/Image/styledoc';
import { TemplateDoc } from '../../doc/Image/templatedoc';

@Component({
    templateUrl: './imagedemo.html'
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
            id: 'templates',
            label: 'Indicator',
            component: TemplateDoc
        },
        {
            id: 'preview-image-source',
            label: 'Image Source',
            component: PreviewImageSourceDoc
        },
        {
            id: 'style',
            label: 'Style',
            component: StyleDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
