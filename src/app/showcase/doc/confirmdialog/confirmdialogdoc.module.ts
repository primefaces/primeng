import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { ConfirmDialogBasicDemo } from './basicdoc';
import { EventsDoc } from './eventsdoc';
import { ImportDoc } from './importdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { ConfirmDialogPositionDemo } from './positiondoc';
import { ConfirmDialogTemplateDemo } from './customdoc';
import { ServiceDoc } from './servicedoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, ConfirmDialogModule, ButtonModule, ToastModule, AppDocModule],
    declarations: [ConfirmDialogBasicDemo, EventsDoc, ImportDoc, PropsDoc, StyleDoc, ConfirmDialogPositionDemo, ConfirmDialogTemplateDemo, ServiceDoc, TemplatesDoc],
    exports: [AppDocModule]
})
export class ConfirmDialogDocModule {}
