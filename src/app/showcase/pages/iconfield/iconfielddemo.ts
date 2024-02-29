import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/iconfield/importdoc';
import { BasicDoc } from '../../doc/iconfield/basicdoc';
import { TemplateDoc } from '../../doc/iconfield/templatedoc';
import { StyleDoc } from '../../doc/iconfield/styledoc';
import { AccessibilityDoc } from '../../doc/iconfield/accessibilitydoc';

@Component({
    templateUrl: './iconfielddemo.html',
    styleUrls: ['./iconfielddemo.scss']
})
export class IconFieldDemo {
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
            id: 'template',
            label: 'Template',
            component: TemplateDoc
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
        },
    
    ];
}
