import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { ConfirmationApiDoc } from './confirmationapidoc';
import { HeadlessDoc } from './headlessdoc';
import { ImportDoc } from './importdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, ConfirmPopupModule, ButtonModule, ToastModule, AppDocModule],
    declarations: [BasicDoc, ImportDoc, PropsDoc, StyleDoc, ConfirmationApiDoc, AccessibilityDoc, TemplatesDoc, TemplateDoc, HeadlessDoc],
    exports: [AppDocModule]
})
export class ConfirmPopupDocModule {}
