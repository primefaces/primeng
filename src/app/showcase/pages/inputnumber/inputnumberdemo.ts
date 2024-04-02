import { Component, ViewEncapsulation } from '@angular/core';
import { LocaleDoc } from '@doc/inputnumber/localedoc';
import { ImportDoc } from '@doc/inputnumber/importdoc';
import { NumeralsDoc } from '@doc/inputnumber/numeralsdoc';
import { CurrencyDoc } from '@doc/inputnumber/currencydoc';
import { PrefixSuffixDoc } from '@doc/inputnumber/prefixsuffixdoc';
import { ButtonsDoc } from '@doc/inputnumber/buttonsdoc';
import { VerticalDoc } from '@doc/inputnumber/verticaldoc';
import { FloatlabelDoc } from '@doc/inputnumber/floatlabeldoc';
import { InvalidDoc } from '@doc/inputnumber/invaliddoc';
import { DisabledDoc } from '@doc/inputnumber/disableddoc';
import { StyleDoc } from '@doc/inputnumber/styledoc';
import { AccessibilityDoc } from '@doc/inputnumber/accessibilitydoc';
import { ReactiveFormsDoc } from '@doc/inputnumber/reactiveformsdoc';

@Component({
    templateUrl: './inputnumberdemo.html',
    encapsulation: ViewEncapsulation.None
})
export class InputNumberDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'numeral',
            label: 'Numeral',
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
