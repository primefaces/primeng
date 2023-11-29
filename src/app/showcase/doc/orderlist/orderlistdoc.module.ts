import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderListModule } from 'primeng/orderlist';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { BasicDoc } from './basicdoc';
import { DragDropDoc } from './dragdropdoc';
import { FilterDoc } from './filterdoc';
import { ImportDoc } from './importdoc';
import { StyleDoc } from './styledoc';
import { AccessibilityDoc } from './accessibilitydoc';
import { TagModule } from 'primeng/tag';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, OrderListModule, RouterModule, TagModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, FilterDoc, DragDropDoc, StyleDoc, AccessibilityDoc]
})
export class OrderlistDocModule {}
