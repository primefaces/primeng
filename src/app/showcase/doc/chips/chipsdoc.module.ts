import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { CommaSeparatorDoc } from './commaseparator.doc';
import { ImportDoc } from './importdoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { RegexpSeparatorDoc } from './regexpseparator.doc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';

@NgModule({
    imports: [CommonModule, ChipsModule, FormsModule, ReactiveFormsModule, AppCodeModule, AppDocModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, CommaSeparatorDoc, RegexpSeparatorDoc, TemplateDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc]
})
export class ChipsDocModule {}
