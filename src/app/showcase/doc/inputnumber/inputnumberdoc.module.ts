import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { ButtonsDoc } from './buttonsdoc';
import { CurrencyDoc } from './currencydoc';
import { DisabledDoc } from './disableddoc';
import { EventsDoc } from './eventsdoc';
import { FloatlabelDoc } from './floatlabeldoc';
import { ImportDoc } from './importdoc';
import { InvalidDoc } from './invaliddoc';
import { LocaleDoc } from './localedoc';
import { MethodsDoc } from './methodsdoc';
import { NumeralsDoc } from './numeralsdoc';
import { PrefixSuffixDoc } from './prefixsuffixdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { VerticalDoc } from './verticaldoc';

@NgModule({
    imports: [CommonModule, FormsModule, InputNumberModule, RouterModule, AppCodeModule, AppDocModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, NumeralsDoc, LocaleDoc, CurrencyDoc, PrefixSuffixDoc, ButtonsDoc, VerticalDoc, FloatlabelDoc, InvalidDoc, DisabledDoc, PropsDoc, MethodsDoc, EventsDoc, StyleDoc]
})
export class InputNumberDocModule {}
