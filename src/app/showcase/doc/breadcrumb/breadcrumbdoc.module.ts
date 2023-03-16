import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { StyleDoc } from './styledoc';
import { BreadcrumbBasicDemo } from './basicdoc';
import { EventsDoc } from './eventsdoc';
import { ImportDoc } from './importdoc';
import { MenuItemDoc } from './menuitemdoc';
import { PropsDoc } from './propsdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, BreadcrumbModule, AppDocModule],
    declarations: [BreadcrumbBasicDemo, EventsDoc, ImportDoc, MenuItemDoc, PropsDoc, EventsDoc, StyleDoc],
    exports: [AppDocModule]
})
export class BreadcrumbDocModule {}
