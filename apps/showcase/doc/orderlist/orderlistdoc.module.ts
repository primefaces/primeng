import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderListModule } from 'primeng/orderlist';
import { TagModule } from 'primeng/tag';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { DragDropDoc } from './dragdropdoc';
import { FilterDoc } from './filterdoc';
import { ImportDoc } from './importdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, OrderListModule, RouterModule, TagModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, FilterDoc, DragDropDoc, TemplateDoc, StyleDoc, AccessibilityDoc]
})
export class OrderlistDocModule {}
