import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { DisabledDoc } from './disableddoc';
import { FloatLabelDoc } from './floatlabeldoc';
import { ImportDoc } from './importdoc';
import { InvalidDoc } from './invaliddoc';
import { MeterDoc } from './meterdoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { ToggleMaskDoc } from './togglemaskdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, PasswordModule, FormsModule, ReactiveFormsModule, DividerModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, MeterDoc, ToggleMaskDoc, TemplateDoc, FloatLabelDoc, InvalidDoc, DisabledDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc]
})
export class PasswordDocModule {}
