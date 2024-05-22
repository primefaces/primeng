import { Component } from '@angular/core';
import { ReactiveFormsDoc } from '@doc/inputtextarea/reactiveformsdoc';
import { AccessibilityDoc } from '@doc/inputtextarea/accessibilitydoc';
import { AutoResizeDoc } from '@doc/inputtextarea/autoresizedoc';
import { BasicDoc } from '@doc/inputtextarea/basicdoc';
import { DisabledDoc } from '@doc/inputtextarea/disableddoc';
import { FloatlabelDoc } from '@doc/inputtextarea/floatlabeldoc';
import { InvalidDoc } from '@doc/inputtextarea/invaliddoc';
import { ImportDoc } from '@doc/inputtextarea/importdoc';
import { KeyfilterDoc } from '@doc/inputtextarea/keyfilterdoc';
import { StyleDoc } from '@doc/inputtextarea/styledoc';
import { FilledDoc } from '@doc/inputtextarea/filleddoc';

@Component({
    templateUrl: './inputtextareademo.html'
})
export class InputTextareaDemo {
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
            id: 'autoresize',
            label: 'AutoResize',
            component: AutoResizeDoc
        },
        {
            id: 'floatlabel',
            label: 'Float Label',
            component: FloatlabelDoc
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
