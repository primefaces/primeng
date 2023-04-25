import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/chips/importdoc';
import { BasicDoc } from '../../doc/chips/basicdoc';
import { CommaSeperatorDoc } from '../../doc/chips/commaseperator.doc';
import { RegexpSeperatorDoc } from '../../doc/chips/regexpseperator.doc';
import { TemplateDoc } from '../../doc/chips/templatedoc';
import { StyleDoc } from '../../doc/chips/styledoc';
import { PropsDoc } from '../../doc/chips/propsdoc';
import { AccessibilityDoc } from '../../doc/chips/accessibilitydoc';
import { ReactiveFormsDoc } from '../../doc/chips/reactiveformsdoc';
import { TemplatesDoc } from '../../doc/chips/templatesdoc';

@Component({
    templateUrl: './chipsdemo.html'
})
export class ChipsDemo {
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
            id: 'commaseperator',
            label: 'Comma Seperator',
            component: CommaSeperatorDoc
        },
        {
            id: 'regexpseperator',
            label: 'RegExp Seperator',
            component: RegexpSeperatorDoc
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

    apiDocs = [
        {
            id: 'properties',
            label: 'Properties',
            component: PropsDoc
        },
        {
            id: 'templates',
            label: 'Templates',
            component: TemplatesDoc
        }
    ];
}
