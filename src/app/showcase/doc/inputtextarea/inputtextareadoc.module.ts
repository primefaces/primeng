import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { AutoResizeDoc } from './autoresizedoc';
import { BasicDoc } from './basicdoc';
import { DisabledDoc } from './disableddoc';
import { FloatlabelDoc } from './floatlabeldoc';
import { InvalidDoc } from './invaliddoc';
import { ImportDoc } from './importdoc';
import { KeyfilterDoc } from './keyfilterdoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { StyleDoc } from './styledoc';
import { FilledDoc } from './filleddoc';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, AppCodeModule, InputTextModule, FormsModule, ReactiveFormsModule, InputTextareaModule, AppDocModule, KeyFilterModule, FloatLabelModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, AutoResizeDoc, FloatlabelDoc, InvalidDoc, DisabledDoc, KeyfilterDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, FilledDoc]
})
export class InputtextareaDocModule {}
