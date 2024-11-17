import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FluidModule } from 'primeng/fluid';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { AccessibilityDoc } from './accessibilitydoc';
import { ButtonsDoc } from './buttonsdoc';
import { CurrencyDoc } from './currencydoc';
import { DisabledDoc } from './disableddoc';
import { FilledDoc } from './filleddoc';
import { FloatlabelDoc } from './floatlabeldoc';
import { IftaLabelDoc } from './iftalabeldoc';
import { ImportDoc } from './importdoc';
import { InvalidDoc } from './invaliddoc';
import { LocaleDoc } from './localedoc';
import { NumeralsDoc } from './numeralsdoc';
import { PrefixSuffixDoc } from './prefixsuffixdoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { SizesDoc } from './sizesdoc';
import { StyleDoc } from './styledoc';
import { VerticalDoc } from './verticaldoc';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, InputNumberModule, RouterModule, AppCodeModule, AppDocModule, FloatLabelModule, FluidModule, IftaLabelModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, NumeralsDoc, LocaleDoc, CurrencyDoc, PrefixSuffixDoc, ButtonsDoc, VerticalDoc, FloatlabelDoc, IftaLabelDoc, InvalidDoc, FilledDoc, DisabledDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, SizesDoc]
})
export class InputNumberDocModule {}
