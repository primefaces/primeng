import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { CardDoc } from './carddoc';
import { DataTableDoc } from './datatabledoc';
import { ImportDoc } from './importdoc';
import { ListDoc } from './listdoc';
import { ShapesDoc } from './shapesdoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, TableModule, SkeletonModule],
    declarations: [CardDoc, DataTableDoc, ImportDoc, ListDoc, ShapesDoc, StyleDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class SkeletonDocModule {}
