import { AccessibilityDoc } from '@/doc/inputtext/accessibility-doc';
import { BasicDoc } from '@/doc/inputtext/basic-doc';
import { DisabledDoc } from '@/doc/inputtext/disabled-doc';
import { FilledDoc } from '@/doc/inputtext/filled-doc';
import { FloatLabelDoc } from '@/doc/inputtext/floatlabel-doc';
import { HelpTextDoc } from '@/doc/inputtext/helptext-doc';
import { IftaLabelDoc } from '@/doc/inputtext/iftalabel-doc';
import { ImportDoc } from '@/doc/inputtext/import-doc';
import { InvalidDoc } from '@/doc/inputtext/invalid-doc';
import { PTComponent } from '@/doc/inputtext/pt/PTComponent';
import { ReactiveFormsDoc } from '@/doc/inputtext/reactiveforms-doc';
import { SizesDoc } from '@/doc/inputtext/sizes-doc';
import { TemplateDrivenFormsDoc } from '@/doc/inputtext/templatedrivenforms-doc';
import { FluidDoc } from '@/doc/inputtext/fluid-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `<app-doc
        docTitle="Angular InputText Component"
        header="InputText"
        description="InputText is an extension to standard input element with theming and keyfiltering."
        [apiDocs]="['InputText']"
        [docs]="docs"
        [ptDocs]="ptComponent"
        themeDocs="inputtext"
    ></app-doc> `
})
export class InputTextDemo {
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
            id: 'floatlabel',
            label: 'Float Label',
            component: FloatLabelDoc
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
            id: 'fluid',
            label: 'Fluid',
            component: FluidDoc
        },
        {
            id: 'helptext',
            label: 'Help Text',
            component: HelpTextDoc
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
