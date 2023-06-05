import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { ServiceDoc } from './servicedoc';
import { ConfirmationApiDoc } from './confirmationapidoc';
import { AccessibilityDoc } from './accessibilitydoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, ConfirmPopupModule, ButtonModule, ToastModule, AppDocModule],
    declarations: [BasicDoc, ImportDoc, PropsDoc, StyleDoc, ServiceDoc, ConfirmationApiDoc, AccessibilityDoc, TemplatesDoc],
    exports: [AppDocModule]
})
export class ConfirmPopupDocModule {}
