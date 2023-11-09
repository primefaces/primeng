import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/chips/importdoc';
import { BasicDoc } from '../../doc/chips/basicdoc';
import { CommaSeparatorDoc } from '../../doc/chips/commaseparator.doc';
import { RegexpSeparatorDoc } from '../../doc/chips/regexpseparator.doc';
import { TemplateDoc } from '../../doc/chips/templatedoc';
import { StyleDoc } from '../../doc/chips/styledoc';
import { AccessibilityDoc } from '../../doc/chips/accessibilitydoc';
import { ReactiveFormsDoc } from '../../doc/chips/reactiveformsdoc';

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
            id: 'commaseparator',
            label: 'Comma Separator',
            component: CommaSeparatorDoc
        },
        {
            id: 'regexpseparator',
            label: 'RegExp Separator',
            component: RegexpSeparatorDoc
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
