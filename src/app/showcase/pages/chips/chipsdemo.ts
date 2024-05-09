import { Component } from '@angular/core';
import { ImportDoc } from '@doc/chips/importdoc';
import { BasicDoc } from '@doc/chips/basicdoc';
import { SeparatorDoc } from '@doc/chips/separatordoc';
import { TemplateDoc } from '@doc/chips/templatedoc';
import { StyleDoc } from '@doc/chips/styledoc';
import { AccessibilityDoc } from '@doc/chips/accessibilitydoc';
import { ReactiveFormsDoc } from '@doc/chips/reactiveformsdoc';
import { MaxValuesDoc } from '@doc/chips/maxvaluesdoc';
import { FilledDoc } from '@doc/chips/filleddoc';
import { FloatLabelDoc } from '@doc/chips/floatlabeldoc';
import { InvalidDoc } from '@doc/chips/invaliddoc';
import { DisabledDoc } from '@doc/chips/disableddoc';

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
            id: 'max-values',
            label: 'Max Values',
            component: MaxValuesDoc
        },
        {
            id: 'separator',
            label: 'Separator',
            component: SeparatorDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'floatlabel',
            label: 'Float Label',
            component: FloatLabelDoc
        },
        {
            id: 'filled',
            label: 'Filled',
            component: FilledDoc
        },
        {
            id: 'invalid',
            label: 'Invalid',
            component: InvalidDoc
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
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
