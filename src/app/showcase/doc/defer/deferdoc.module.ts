import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { DeferModule } from 'primeng/defer';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ImportDoc } from './importdoc';
import { BasicDoc } from './basicdoc';
import { DataTableDoc } from './datatabledoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, FormsModule, DeferModule, TableModule, ToastModule],
    exports: [ImportDoc, BasicDoc, DataTableDoc, AppDocModule],
    declarations: [ImportDoc, BasicDoc, DataTableDoc]
})
export class DeferDocModule {}
