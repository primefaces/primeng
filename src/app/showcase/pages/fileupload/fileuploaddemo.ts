import { Component } from '@angular/core';
import { AdvancedDoc } from '../../doc/fileupload/advanceddoc';
import { AutoDoc } from '../../doc/fileupload/autodoc';
import { BasicDoc } from '../../doc/fileupload/basicdoc';
import { ImportDoc } from '../../doc/fileupload/importdoc';
import { StyleDoc } from '../../doc/fileupload/styledoc';
import { TemplateDoc } from '../../doc/fileupload/templatedoc';
import { AccessibilityDoc } from '../../doc/fileupload/accessibilitydoc';

@Component({
    templateUrl: './fileuploaddemo.html'
})
export class FileUploadDemo {
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
            id: 'auto',
            label: 'Auto',
            component: AutoDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'advanced',
            label: 'Advanced',
            component: AdvancedDoc
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
