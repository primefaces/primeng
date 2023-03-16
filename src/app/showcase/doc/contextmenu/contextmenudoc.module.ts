import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContextMenuModule } from 'primeng/contextmenu';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { ContextMenuBasicDemo } from './basicdoc';
import { ContextMenuDocumentDemo } from './documentdoc';
import { EventsDoc } from './eventsdoc';
import { ImportDoc } from './importdoc';
import { MenuItemDoc } from './menuitemdoc';
import { MethodsDoc } from './methodsdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { ContextMenuTriggerEventDemo } from './triggereventdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, ContextMenuModule, AppDocModule],
    declarations: [ContextMenuBasicDemo, ImportDoc, ContextMenuDocumentDemo, EventsDoc, MenuItemDoc, MethodsDoc, PropsDoc, StyleDoc, ContextMenuTriggerEventDemo],
    exports: [AppDocModule]
})
export class ContextMenuDocModule {}
