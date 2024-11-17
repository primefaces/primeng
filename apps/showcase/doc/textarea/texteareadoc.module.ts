import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TextareaModule } from 'primeng/textarea';
import { AccessibilityDoc } from './accessibilitydoc';
import { AutoResizeDoc } from './autoresizedoc';
import { BasicDoc } from './basicdoc';
import { DisabledDoc } from './disableddoc';
import { FilledDoc } from './filleddoc';
import { FloatlabelDoc } from './floatlabeldoc';
import { IftaLabelDoc } from './iftalabeldoc';
import { ImportDoc } from './importdoc';
import { InvalidDoc } from './invaliddoc';
import { KeyfilterDoc } from './keyfilterdoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { SizesDoc } from './sizesdoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, InputTextModule, FormsModule, ReactiveFormsModule, TextareaModule, AppDocModule, KeyFilterModule, FloatLabelModule, RouterModule, IftaLabelModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, AutoResizeDoc, FloatlabelDoc, InvalidDoc, DisabledDoc, KeyfilterDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, FilledDoc, IftaLabelDoc, SizesDoc]
})
export class TextareaDocModule {}
