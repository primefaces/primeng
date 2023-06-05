import { Component } from '@angular/core';
import { AccessibilityDoc } from '../../doc/inputmask/accessibilitydoc';
import { BasicDoc } from '../../doc/inputmask/basicdoc';
import { DisabledDoc } from '../../doc/inputmask/disableddoc';
import { EventsDoc } from '../../doc/inputmask/eventsdoc';
import { FloatlabelDoc } from '../../doc/inputmask/floatlabeldoc';
import { ImportDoc } from '../../doc/inputmask/importdoc';
import { InvalidDoc } from '../../doc/inputmask/invaliddoc';
import { MaskDoc } from '../../doc/inputmask/maskdoc';
import { MethodsDoc } from '../../doc/inputmask/methodsdoc';
import { OptionalDoc } from '../../doc/inputmask/optionaldoc';
import { PropsDoc } from '../../doc/inputmask/propsdoc';
import { ReactiveFormsDoc } from '../../doc/inputmask/reactiveformsdoc';
import { SlotCharDoc } from '../../doc/inputmask/slotchardoc';
import { StyleDoc } from '../../doc/inputmask/styledoc';
import { TemplatesDoc } from '../../doc/inputmask/templatesdoc';

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
            id: 'slotchar',
            label: 'Slot Char',
            component: SlotCharDoc
        },
        {
            id: 'optional',
            label: 'Optional',
            component: OptionalDoc
        },
        {
            id: 'floatlabel',
            label: 'FloatLabel',
            component: FloatlabelDoc
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
        },
        {
            id: 'invalid',
            label: 'Invalid',
            component: InvalidDoc
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
            id: 'events',
            label: 'Events',
            component: EventsDoc
        },
        {
            id: 'methods',
            label: 'Methods',
            component: MethodsDoc
        },
        {
            id: 'templates',
            label: 'Templates',
            component: TemplatesDoc
        }
    ];
}
