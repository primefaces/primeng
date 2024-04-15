import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProgressBarModule } from '@alamote/primeng/progressbar';
import { ToastModule } from '@alamote/primeng/toast';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { DynamicDoc } from './dynamicdoc';
import { ImportDoc } from './importdoc';
import { IndeterminateDoc } from './indeterminatedoc';
import { TemplateDoc } from './templatedoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, ProgressBarModule, ToastModule],
    declarations: [BasicDoc, DynamicDoc, ImportDoc, IndeterminateDoc, TemplateDoc, StyleDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class ProgressBarDocModule {}
