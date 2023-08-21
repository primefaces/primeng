import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/Image/importdoc';
import { StyleDoc } from '../../doc/Image/styledoc';
import { BasicDoc } from '../../doc/Image/basicdoc';
import { TemplateDoc } from '../../doc/Image/templatedoc';
import { AccessibilityDoc } from '../../doc/Image/accessibilitydoc';
import { PreviewDoc } from '../../doc/Image/previewdoc';
import { PreviewImageSourceDoc } from '../../doc/Image/previewimagesourcedoc';

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
            id: 'templates',
            label: 'Indicator Template',
            component: TemplateDoc
        },
        {
            id: 'preview',
            label: 'Preview',
            component: PreviewDoc
        },
        {
            id: 'preview-image-source',
            label: 'Preview Image Source',
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
