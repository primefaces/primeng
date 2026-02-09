import { AccessibilityDoc } from '@/doc/inputnumber/accessibility-doc';
import { ButtonsDoc } from '@/doc/inputnumber/buttons-doc';
import { ClearIconDoc } from '@/doc/inputnumber/clearicon-doc';
import { CurrencyDoc } from '@/doc/inputnumber/currency-doc';
import { DisabledDoc } from '@/doc/inputnumber/disabled-doc';
import { FilledDoc } from '@/doc/inputnumber/filled-doc';
import { FloatlabelDoc } from '@/doc/inputnumber/floatlabel-doc';
import { FluidDoc } from '@/doc/inputnumber/fluid-doc';
import { IftaLabelDoc } from '@/doc/inputnumber/iftalabel-doc';
import { ImportDoc } from '@/doc/inputnumber/import-doc';
import { InvalidDoc } from '@/doc/inputnumber/invalid-doc';
import { LocaleDoc } from '@/doc/inputnumber/locale-doc';
import { NumeralsDoc } from '@/doc/inputnumber/numerals-doc';
import { PrefixSuffixDoc } from '@/doc/inputnumber/prefixsuffix-doc';
import { PTComponent } from '@/doc/inputnumber/pt/PTComponent';
import { ReactiveFormsDoc } from '@/doc/inputnumber/reactiveforms-doc';
import { SizesDoc } from '@/doc/inputnumber/sizes-doc';
import { TemplateDrivenFormsDoc } from '@/doc/inputnumber/templatedrivenforms-doc';
import { VerticalDoc } from '@/doc/inputnumber/vertical-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc
        docTitle="Angular InputNumber Component"
        header="InputNumber"
        description="InputNumber is an input component to provide numerical input."
        [docs]="docs"
        [apiDocs]="['InputNumber']"
        themeDocs="inputnumber"
        [ptDocs]="ptComponent"
    ></app-doc> `,
    standalone: true,
    imports: [AppDoc]
})
export class InputNumberDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'numerals',
            label: 'Numerals',
            component: NumeralsDoc
        },
        {
            id: 'locale',
            label: 'Locale',
            component: LocaleDoc
        },
        {
            id: 'currency',
            label: 'Currency',
            component: CurrencyDoc
        },
        {
            id: 'prefixsuffix',
            label: 'Prefix & Suffix',
            component: PrefixSuffixDoc
        },
        {
            id: 'buttons',
            label: 'Buttons',
            component: ButtonsDoc
        },
        {
            id: 'vertical',
            label: 'Vertical',
            component: VerticalDoc
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

    ptComponent = PTComponent;
}
