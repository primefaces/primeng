import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { DisabledDoc } from './disableddoc';
import { FilledDoc } from './filleddoc';
import { FloatLabelDoc } from './floatlabeldoc';
import { IftaLabelDoc } from './iftalabeldoc';
import { ImportDoc } from './importdoc';
import { InvalidDoc } from './invaliddoc';
import { LocaleDoc } from './localedoc';
import { MeterDoc } from './meterdoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { SizesDoc } from './sizesdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { ToggleMaskDoc } from './togglemaskdoc';

@NgModule({
    imports: [CommonModule, InputTextModule, AppCodeModule, AppDocModule, PasswordModule, FormsModule, ReactiveFormsModule, DividerModule, RouterModule, FloatLabelModule, IftaLabelModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, MeterDoc, LocaleDoc, ToggleMaskDoc, TemplateDoc, FloatLabelDoc, IftaLabelDoc, InvalidDoc, DisabledDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, FilledDoc, SizesDoc]
})
export class PasswordDocModule {}
