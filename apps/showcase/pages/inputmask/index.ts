import { AccessibilityDoc } from '@/doc/inputmask/accessibility-doc';
import { BasicDoc } from '@/doc/inputmask/basic-doc';
import { DisabledDoc } from '@/doc/inputmask/disabled-doc';
import { FilledDoc } from '@/doc/inputmask/filled-doc';
import { FloatlabelDoc } from '@/doc/inputmask/floatlabel-doc';
import { IftaLabelDoc } from '@/doc/inputmask/iftalabel-doc';
import { ImportDoc } from '@/doc/inputmask/import-doc';
import { InvalidDoc } from '@/doc/inputmask/invalid-doc';
import { MaskDoc } from '@/doc/inputmask/mask-doc';
import { OptionalDoc } from '@/doc/inputmask/optional-doc';
import { ReactiveFormsDoc } from '@/doc/inputmask/reactiveforms-doc';
import { SizesDoc } from '@/doc/inputmask/sizes-doc';
import { SlotCharDoc } from '@/doc/inputmask/slotchar-doc';
import { TemplateDrivenFormsDoc } from '@/doc/inputmask/templatedrivenforms-doc';
import { FluidDoc } from '@/doc/inputmask/fluid-doc';
import { ClearIconDoc } from '@/doc/inputmask/clearicon-doc';
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
