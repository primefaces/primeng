import { AccessibilityDoc } from '@/doc/inputmask/accessibilitydoc';
import { BasicDoc } from '@/doc/inputmask/basicdoc';
import { DisabledDoc } from '@/doc/inputmask/disableddoc';
import { FilledDoc } from '@/doc/inputmask/filleddoc';
import { FloatlabelDoc } from '@/doc/inputmask/floatlabeldoc';
import { IftaLabelDoc } from '@/doc/inputmask/iftalabeldoc';
import { ImportDoc } from '@/doc/inputmask/importdoc';
import { InvalidDoc } from '@/doc/inputmask/invaliddoc';
import { MaskDoc } from '@/doc/inputmask/maskdoc';
import { OptionalDoc } from '@/doc/inputmask/optionaldoc';
import { ReactiveFormsDoc } from '@/doc/inputmask/reactiveformsdoc';
import { SizesDoc } from '@/doc/inputmask/sizesdoc';
import { SlotCharDoc } from '@/doc/inputmask/slotchardoc';
import { TemplateDrivenFormsDoc } from '@/doc/inputmask/templatedrivenformsdoc';
import { FluidDoc } from '@/doc/inputmask/fluiddoc';
import { ClearIconDoc } from '@/doc/inputmask/clearicondoc';
import { PTComponent } from '@/doc/inputmask/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc
        docTitle="Angular InputMask Component"
        header="InputMask"
        description="InputMask component is used to enter input in a certain format such as numeric, date, currency and phone."
        [docs]="docs"
        [ptDocs]="ptComponent"
        [apiDocs]="['InputMask']"
        themeDocs="inputmask"
    ></app-doc> `,
    standalone: true,
    imports: [AppDoc]
})
export class InputMaskDemo {
    ptComponent = PTComponent;

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
            id: 'clearicon',
            label: 'Clear Icon',
            component: ClearIconDoc
        },
        {
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc
        },
        {
            id: 'fluid',
            label: 'Fluid',
            component: FluidDoc
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
            id: 'forms',
            label: 'Forms',
            children: [
                { id: 'templatedriven', label: 'Template Driven', component: TemplateDrivenFormsDoc },
                { id: 'reactive', label: 'Reactive Forms', component: ReactiveFormsDoc }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
