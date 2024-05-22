import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { BasicDoc } from './basicdoc';
import { InvalidDoc } from './invaliddoc';
import { ImportDoc } from './importdoc';
import { DisabledDoc } from './disableddoc';
import { StyleDoc } from './styledoc';
import { RouterModule } from '@angular/router';
import { AccessibilityDoc } from './accessibilitydoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { FilledDoc } from './filleddoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, TriStateCheckboxModule, FormsModule, ReactiveFormsModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, InvalidDoc, DisabledDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, FilledDoc]
})
export class TristatecheckboxDocModule {}
