import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputMaskModule } from 'primeng/inputmask';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { DisabledDoc } from './disableddoc';
import { EventsDoc } from './eventsdoc';
import { FloatlabelDoc } from './floatlabeldoc';
import { ImportDoc } from './importdoc';
import { InvalidDoc } from './invaliddoc';
import { MaskDoc } from './maskdoc';
import { MethodsDoc } from './methodsdoc';
import { OptionalDoc } from './optionaldoc';
import { PropsDoc } from './propsdoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { SlotCharDoc } from './slotchardoc';
import { StyleDoc } from './styledoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, InputMaskModule, RouterModule, AppCodeModule, AppDocModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, MaskDoc, SlotCharDoc, OptionalDoc, FloatlabelDoc, DisabledDoc, InvalidDoc, PropsDoc, EventsDoc, MethodsDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, TemplatesDoc]
})
export class InputMaskDocModule {}
