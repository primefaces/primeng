import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { ButtonsDoc } from './buttonsdoc';
import { CurrencyDoc } from './currencydoc';
import { DisabledDoc } from './disableddoc';
import { FloatlabelDoc } from './floatlabeldoc';
import { ImportDoc } from './importdoc';
import { InvalidDoc } from './invaliddoc';
import { LocaleDoc } from './localedoc';
import { NumeralsDoc } from './numeralsdoc';
import { PrefixSuffixDoc } from './prefixsuffixdoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { StyleDoc } from './styledoc';
import { VerticalDoc } from './verticaldoc';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FilledDoc } from './filleddoc';
import { FluidModule } from 'primeng/fluid';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, InputNumberModule, RouterModule, AppCodeModule, AppDocModule, FloatLabelModule, FluidModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, NumeralsDoc, LocaleDoc, CurrencyDoc, PrefixSuffixDoc, ButtonsDoc, VerticalDoc, FloatlabelDoc, InvalidDoc, FilledDoc, DisabledDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc]
})
export class InputNumberDocModule {}
