import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';
import { InvalidDoc } from './invaliddoc';
import { FloatLabelDoc } from './floatlabeldoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { DisabledDoc } from './disableddoc';
import { FilledDoc } from './filleddoc';
import { LoadingDoc } from './loadingdoc';
import { FloatLabelModule } from 'primeng/floatlabel';
@NgModule({
    imports: [CommonModule, RouterModule, CascadeSelectModule, FormsModule, AppCodeModule, AppDocModule, ReactiveFormsModule, FloatLabelModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, TemplateDoc, InvalidDoc, FloatLabelDoc, FilledDoc, DisabledDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, LoadingDoc]
})
export class CascadeSelectDocModule {}
