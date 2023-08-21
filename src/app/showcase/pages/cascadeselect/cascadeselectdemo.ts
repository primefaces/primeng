import { Component } from '@angular/core';
import { AccessibilityDoc } from '../../doc/cascadeselect/accessibilitydoc';
import { BasicDoc } from '../../doc/cascadeselect/basicdoc';
import { ImportDoc } from '../../doc/cascadeselect/importdoc';
import { ReactiveFormsDoc } from '../../doc/cascadeselect/reactiveformsdoc';
import { StyleDoc } from '../../doc/cascadeselect/styledoc';
import { TemplateDoc } from '../../doc/cascadeselect/templatedoc';

@Component({
    templateUrl: './cascadeselectdemo.html'
})
export class CascadeSelectDemo {
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
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc
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
        }
    ];
}
