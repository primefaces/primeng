import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { ImportDoc } from './/importdoc';
import { BasicDoc } from './basicdoc';
import { LazyLoadDoc } from './lazyloaddoc';
import { StyleDoc } from './styledoc';
import { RouterModule } from '@angular/router';
import { PropsDoc } from './propsdoc';
import { EventsDoc } from './eventsdoc';
import { MethodsDoc } from './methodsdoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, RouterModule, VirtualScrollerModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, LazyLoadDoc, StyleDoc, PropsDoc, EventsDoc, MethodsDoc, TemplatesDoc]
})
export class VirtualScrollerDocModule {}
