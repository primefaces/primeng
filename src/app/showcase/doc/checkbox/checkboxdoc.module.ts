import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { ImportDoc } from './importdoc';
import { BasicDoc } from './basicdoc';
import { MultipleDoc } from './multipledoc';
import { LabelDoc } from './labeldoc';
import { DynamicDoc } from './dynamicdoc';
import { DisabledDoc } from './disableddoc';
import { InvalidDoc } from './invaliddoc';
import { StyleDoc } from './styledoc';
import { AccessibilityDoc } from './accessibilitydoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { FilledDoc } from './filleddoc';
import { IndeterminateDoc } from './indeterminatedoc';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule, AppCodeModule, AppDocModule, CheckboxModule, ReactiveFormsModule],
    exports: [ImportDoc],
    declarations: [ImportDoc, BasicDoc, IndeterminateDoc, MultipleDoc, LabelDoc, DynamicDoc, DisabledDoc, InvalidDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, FilledDoc]
})
export class CheckboxDocModule {}
