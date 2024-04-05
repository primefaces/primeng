import { Component } from '@angular/core';
import { BasicDoc } from '@doc/checkbox/basicdoc';
import { ImportDoc } from '@doc/checkbox/importdoc';
import { MultipleDoc } from '@doc/checkbox/multipledoc';
import { DynamicDoc } from '@doc/checkbox/dynamicdoc';
import { DisabledDoc } from '@doc/checkbox/disableddoc';
import { InvalidDoc } from '@doc/checkbox/invaliddoc';
import { StyleDoc } from '@doc/checkbox/styledoc';
import { AccessibilityDoc } from '@doc/checkbox/accessibilitydoc';
import { ReactiveFormsDoc } from '@doc/checkbox/reactiveformsdoc';
import { FilledDoc } from '@doc/checkbox/filleddoc';

@Component({
    templateUrl: './checkboxdemo.html'
})
export class CheckboxDemo {
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
            id: 'group',
            label: 'Group',
            component: MultipleDoc
        },
        {
            id: 'dynamic',
            label: 'Dynamic',
            component: DynamicDoc
        },
        {
            id: 'invalid',
            label: 'Invalid',
            component: InvalidDoc
        },
        {
            id: 'filled',
            label: 'Filled',
            component: FilledDoc
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
