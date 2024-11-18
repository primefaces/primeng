import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FluidModule } from 'primeng/fluid';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputMaskModule } from 'primeng/inputmask';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { DisabledDoc } from './disableddoc';
import { FilledDoc } from './filleddoc';
import { FloatlabelDoc } from './floatlabeldoc';
import { IftaLabelDoc } from './iftalabeldoc';
import { ImportDoc } from './importdoc';
import { InvalidDoc } from './invaliddoc';
import { MaskDoc } from './maskdoc';
import { OptionalDoc } from './optionaldoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { SizesDoc } from './sizesdoc';
import { SlotCharDoc } from './slotchardoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, InputMaskModule, RouterModule, AppCodeModule, AppDocModule, FloatLabelModule, FluidModule, IftaLabelModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, MaskDoc, SlotCharDoc, OptionalDoc, FloatlabelDoc, DisabledDoc, InvalidDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, FilledDoc, SizesDoc, IftaLabelDoc]
})
export class InputMaskDocModule {}
