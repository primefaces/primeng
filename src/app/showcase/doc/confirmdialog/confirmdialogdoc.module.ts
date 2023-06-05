import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { BasicDoc } from './basicdoc';
import { EventsDoc } from './eventsdoc';
import { ImportDoc } from './importdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { PositionDoc } from './positiondoc';
import { TemplateDoc } from './templatedoc';
import { ServiceDoc } from './servicedoc';
import { TemplatesDoc } from './templatesdoc';
import { AccessibilityDoc } from './accessibilitydoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, ConfirmDialogModule, ButtonModule, ToastModule, AppDocModule],
    declarations: [BasicDoc, EventsDoc, ImportDoc, PropsDoc, StyleDoc, PositionDoc, TemplateDoc, ServiceDoc, TemplatesDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class ConfirmDialogDocModule {}
