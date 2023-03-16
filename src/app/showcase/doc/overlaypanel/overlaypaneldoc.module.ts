import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { OverlayPanelBasicDemo } from './basicdoc';
import { ImportDoc } from './importdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { TemplatesDoc } from './templatesdoc';
import { OverlayPanelDataTableDemo } from './datatabledoc';
import { OverlayPanelTemplateDemo } from './templatedoc';
import { OverlayPanelTargetDemo } from './targetdoc';
import { EventsDoc } from './eventsdoc';
import { MethodsDoc } from './methodsdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, OverlayPanelModule, ButtonModule, TableModule, ToastModule, AppDocModule],
    declarations: [OverlayPanelBasicDemo, ImportDoc, PropsDoc, StyleDoc, TemplatesDoc, OverlayPanelDataTableDemo, OverlayPanelTemplateDemo, OverlayPanelTargetDemo, EventsDoc, MethodsDoc],
    exports: [AppDocModule]
})
export class OverlayPanelDocModule {}
