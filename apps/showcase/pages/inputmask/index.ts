import { AccessibilityDoc } from '@/doc/inputmask/accessibilitydoc';
import { BasicDoc } from '@/doc/inputmask/basicdoc';
import { DisabledDoc } from '@/doc/inputmask/disableddoc';
import { FilledDoc } from '@/doc/inputmask/filleddoc';
import { FloatlabelDoc } from '@/doc/inputmask/floatlabeldoc';
import { IftaLabelDoc } from '@/doc/inputmask/iftalabeldoc';
import { ImportDoc } from '@/doc/inputmask/importdoc';
import { InputMaskDocModule } from '@/doc/inputmask/inputmaskdoc.module';
import { InvalidDoc } from '@/doc/inputmask/invaliddoc';
import { MaskDoc } from '@/doc/inputmask/maskdoc';
import { OptionalDoc } from '@/doc/inputmask/optionaldoc';
import { ReactiveFormsDoc } from '@/doc/inputmask/reactiveformsdoc';
import { SizesDoc } from '@/doc/inputmask/sizesdoc';
import { SlotCharDoc } from '@/doc/inputmask/slotchardoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc
        docTitle="Angular InputMask Component"
        header="InputMask"
        description="InputMask component is used to enter input in a certain format such as numeric, date, currency and phone."
        [docs]="docs"
        [apiDocs]="['InputMask']"
        themeDocs="inputmask"
    ></app-doc> `,
    standalone: true,
    imports: [InputMaskDocModule]
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
            label: 'SlotChar',
            component: SlotCharDoc
        },
        {
            id: 'filled',
            label: 'Filled',
            component: FilledDoc
        },
        {
            id: 'floatlabel',
            label: 'Float Label',
            component: FloatlabelDoc
        },
        {
            id: 'iftalabel',
            label: 'Ifta Label',
            component: IftaLabelDoc
        },
        {
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc
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
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
