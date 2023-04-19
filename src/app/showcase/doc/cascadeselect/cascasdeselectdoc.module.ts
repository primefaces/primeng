import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { EventsDoc } from './eventsdoc';
import { ImportDoc } from './importdoc';
import { PropsDoc } from './propsdoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, RouterModule, CascadeSelectModule, FormsModule, AppCodeModule, AppDocModule, ReactiveFormsModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, TemplateDoc, StyleDoc, PropsDoc, EventsDoc, AccessibilityDoc, ReactiveFormsDoc, TemplatesDoc]
})
export class CascadeSelectDocModule {}
