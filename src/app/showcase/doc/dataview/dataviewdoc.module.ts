import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { BasicDoc } from './basicdoc';
import { EventsDoc } from './eventsdoc';
import { ImportDoc } from './importdoc';
import { LayoutDoc } from './layoutdoc';
import { PaginationDoc } from './paginationdoc';
import { PrimeflexDoc } from './primeflexdoc';
import { PropsDoc } from './propsdoc';
import { SortingDoc } from './sortingdoc';
import { StyleDoc } from './styledoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, DataViewModule, DropdownModule, ButtonModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, PrimeflexDoc, BasicDoc, PaginationDoc, SortingDoc, LayoutDoc, StyleDoc, PropsDoc, EventsDoc, TemplatesDoc]
})
export class DataViewDocModule {}
