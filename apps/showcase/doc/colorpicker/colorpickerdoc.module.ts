import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ColorPicker } from 'primeng/colorpicker';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { DisabledDoc } from './disableddoc';
import { FormatDoc } from './formatdoc';
import { ImportDoc } from './importdoc';
import { InlineDoc } from './inlinedoc';
import { TemplateDrivenFormsDoc } from './templatedrivenformsdoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { StyleDoc } from './styledoc';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, FormsModule, ReactiveFormsModule, ColorPicker, ButtonModule, MessageModule, ToastModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, InlineDoc, FormatDoc, DisabledDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, TemplateDrivenFormsDoc]
})
export class ColorPickerDocModule {}
