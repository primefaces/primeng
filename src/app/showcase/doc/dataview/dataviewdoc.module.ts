import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primengrtl/button';
import { DataViewModule } from 'primengrtl/dataview';
import { DropdownModule } from 'primengrtl/dropdown';
import { RatingModule } from 'primengrtl/rating';
import { TagModule } from 'primengrtl/tag';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';
import { LayoutDoc } from './layoutdoc';
import { PaginationDoc } from './paginationdoc';
import { SortingDoc } from './sortingdoc';
import { StyleDoc } from './styledoc';
import { LoadingDoc } from './loadingdoc';
import { SkeletonModule } from 'primengrtl/skeleton';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, DataViewModule, DropdownModule, ButtonModule, RouterModule, RatingModule, TagModule, FormsModule, SkeletonModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, PaginationDoc, SortingDoc, LayoutDoc, LoadingDoc, StyleDoc, AccessibilityDoc]
})
export class DataViewDocModule {}
