import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { SeparatorDoc } from './separatordoc';
import { ImportDoc } from './importdoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { RegexpSeparatorDoc } from './regexpseparator.doc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { MaxValuesDoc } from './maxvaluesdoc';
import { FilledDoc } from './filleddoc';
import { FloatLabelDoc } from './floatlabeldoc';
import { RouterModule } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InvalidDoc } from './invaliddoc';
import { DisabledDoc } from './disableddoc';
@NgModule({
    imports: [CommonModule, ChipsModule, FormsModule, RouterModule, ReactiveFormsModule, AppCodeModule, AppDocModule, FloatLabelModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, SeparatorDoc, RegexpSeparatorDoc, TemplateDoc, FloatLabelDoc, FilledDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, MaxValuesDoc, InvalidDoc, DisabledDoc]
})
export class ChipsDocModule {}
