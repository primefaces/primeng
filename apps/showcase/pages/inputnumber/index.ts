import { AccessibilityDoc } from '@/doc/inputnumber/accessibilitydoc';
import { ButtonsDoc } from '@/doc/inputnumber/buttonsdoc';
import { CurrencyDoc } from '@/doc/inputnumber/currencydoc';
import { DisabledDoc } from '@/doc/inputnumber/disableddoc';
import { FilledDoc } from '@/doc/inputnumber/filleddoc';
import { FloatlabelDoc } from '@/doc/inputnumber/floatlabeldoc';
import { IftaLabelDoc } from '@/doc/inputnumber/iftalabeldoc';
import { ImportDoc } from '@/doc/inputnumber/importdoc';
import { InputNumberDocModule } from '@/doc/inputnumber/inputnumberdoc.module';
import { InvalidDoc } from '@/doc/inputnumber/invaliddoc';
import { LocaleDoc } from '@/doc/inputnumber/localedoc';
import { NumeralsDoc } from '@/doc/inputnumber/numeralsdoc';
import { PrefixSuffixDoc } from '@/doc/inputnumber/prefixsuffixdoc';
import { ReactiveFormsDoc } from '@/doc/inputnumber/reactiveformsdoc';
import { SizesDoc } from '@/doc/inputnumber/sizesdoc';
import { VerticalDoc } from '@/doc/inputnumber/verticaldoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular InputNumber Component" header="InputNumber" description="InputNumber is an input component to provide numerical input." [docs]="docs" [apiDocs]="['InputNumber']" themeDocs="inputnumber"></app-doc> `,
    standalone: true,
    imports: [InputNumberDocModule]
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
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc
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
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc
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
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
