import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PickListModule } from 'primeng/picklist';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { FilterDoc } from './filterdoc';
import { DragDropDoc } from "./dragdropdoc";
import { SelectableDoc } from "./selectabledoc";
import { ImportDoc } from './importdoc';
import { StyleDoc } from './styledoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, PickListModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, FilterDoc, TemplatesDoc, DragDropDoc, SelectableDoc, StyleDoc, AccessibilityDoc]
})
export class PicklistDocModule {}
