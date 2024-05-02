import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { BasicDoc } from './basicdoc';
import { TemplateDoc } from './templatedoc';
import { ImportDoc } from './importdoc';
import { StyleDoc } from './styledoc';
import { AccessibilityDoc } from './accessibilitydoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, ProgressSpinnerModule],
    declarations: [BasicDoc, ImportDoc, TemplateDoc, StyleDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class ProgressSpinnerDocModule {}
