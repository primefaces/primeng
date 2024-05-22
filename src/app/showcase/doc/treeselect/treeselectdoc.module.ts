import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TreeSelectModule } from 'primeng/treeselect';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { CheckboxDoc } from './checkboxdoc';
import { DisabledDoc } from './disableddoc';
import { FilterDoc } from './filterdoc';
import { FloatLabelDoc } from './floatlabeldoc';
import { ImportDoc } from './importdoc';
import { InvalidDoc } from './invaliddoc';
import { MultipleDoc } from './multipledoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { StyleDoc } from './styledoc';
import { VirtualScrollDoc } from './virtualscrolldoc';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FilledDoc } from './filleddoc';
import { LazyDoc } from './lazydoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, TreeSelectModule, FormsModule, ReactiveFormsModule, RouterModule, FloatLabelModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, MultipleDoc, CheckboxDoc, LazyDoc, VirtualScrollDoc, FilterDoc, FloatLabelDoc, InvalidDoc, DisabledDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, FilledDoc]
})
export class TreeSelectDocModule {}
