import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { CommaSeperatorDoc } from './commaseperator.doc';
import { ImportDoc } from './importdoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { RegexpSeperatorDoc } from './regexpseperator.doc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { MaxValuesDoc } from './maxvaluesdoc';

@NgModule({
    imports: [CommonModule, ChipsModule, FormsModule, ReactiveFormsModule, AppCodeModule, AppDocModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, CommaSeperatorDoc, RegexpSeperatorDoc, TemplateDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, MaxValuesDoc]
})
export class ChipsDocModule {}
