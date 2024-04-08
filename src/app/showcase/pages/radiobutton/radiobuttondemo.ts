import { Component } from '@angular/core';
import { ReactiveFormsDoc } from '@doc/radiobutton/reactiveformsdoc';
import { AccessibilityDoc } from '@doc/radiobutton/accessibilitydoc';
import { DisabledDoc } from '@doc/radiobutton/disableddoc';
import { DynamicDoc } from '@doc/radiobutton/dynamicdoc';
import { GroupDoc } from '@doc/radiobutton/groupdoc';
import { ImportDoc } from '@doc/radiobutton/importdoc';
import { InvalidDoc } from '@doc/radiobutton/invaliddoc';
import { StyleDoc } from '@doc/radiobutton/styledoc';
import { FilledDoc } from '@doc/radiobutton/filleddoc';

@Component({
    templateUrl: './radiobuttondemo.html'
})
export class RadioButtonDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'group',
            label: 'Group',
            component: GroupDoc
        },
        {
            id: 'dynamic',
            label: 'Dynamic',
            component: DynamicDoc
        },
        {
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc
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
