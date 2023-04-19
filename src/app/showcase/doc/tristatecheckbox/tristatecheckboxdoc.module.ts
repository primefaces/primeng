import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';
import { DisabledDoc } from './disableddoc';
import { PropsDoc } from './propsdoc';
import { EventsDoc } from './eventsdoc';
import { StyleDoc } from './styledoc';
import { RouterModule } from '@angular/router';
import { AccessibilityDoc } from './accessibilitydoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, TriStateCheckboxModule, FormsModule, ReactiveFormsModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, DisabledDoc, PropsDoc, EventsDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, TemplatesDoc]
})
export class TristatecheckboxDocModule {}
