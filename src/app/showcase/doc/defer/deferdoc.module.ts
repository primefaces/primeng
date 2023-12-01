import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DeferModule } from 'primeng/defer';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { BasicDoc } from './basicdoc';
import { DataTableDoc } from './datatabledoc';
import { ImportDoc } from './importdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, FormsModule, DeferModule, TableModule, ToastModule],
    exports: [ImportDoc, BasicDoc, DataTableDoc, AppDocModule],
    declarations: [ImportDoc, BasicDoc, DataTableDoc]
})
export class DeferDocModule {}
