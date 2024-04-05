import { Component } from '@angular/core';
import { AccessibilityDoc } from '@doc/inputmask/accessibilitydoc';
import { BasicDoc } from '@doc/inputmask/basicdoc';
import { DisabledDoc } from '@doc/inputmask/disableddoc';
import { FilledDoc } from '@doc/inputmask/filleddoc';
import { FloatlabelDoc } from '@doc/inputmask/floatlabeldoc';
import { ImportDoc } from '@doc/inputmask/importdoc';
import { InvalidDoc } from '@doc/inputmask/invaliddoc';
import { MaskDoc } from '@doc/inputmask/maskdoc';
import { OptionalDoc } from '@doc/inputmask/optionaldoc';
import { ReactiveFormsDoc } from '@doc/inputmask/reactiveformsdoc';
import { SlotCharDoc } from '@doc/inputmask/slotchardoc';
import { StyleDoc } from '@doc/inputmask/styledoc';

@Component({
    templateUrl: './inputmaskdemo.html'
})
export class InputMaskDemo {
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
            id: 'mask',
            label: 'Mask',
            component: MaskDoc
        },
        {
            id: 'optional',
            label: 'Optional',
            component: OptionalDoc
        },
        {
            id: 'slotchar',
            label: 'Slot Char',
            component: SlotCharDoc
        },
        {
            id: 'floatlabel',
            label: 'FloatLabel',
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
