import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Skeleton } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { AccessibilityDoc } from './accessibilitydoc';
import { CardDoc } from './carddoc';
import { DataTableDoc } from './datatabledoc';
import { ImportDoc } from './importdoc';
import { ListDoc } from './listdoc';
import { ShapesDoc } from './shapesdoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, TableModule, Skeleton],
    declarations: [CardDoc, DataTableDoc, ImportDoc, ListDoc, ShapesDoc, StyleDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class SkeletonDocModule {}
