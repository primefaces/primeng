import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TreeSelectModule } from 'primeng/treeselect';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { CheckboxDoc } from './checkboxdoc';
import { DisabledDoc } from './disableddoc';
import { EventsDoc } from './eventsdoc';
import { FilterDoc } from './filterdoc';
import { FloatLabelDoc } from './floatlabeldoc';
import { ImportDoc } from './importdoc';
import { InvalidDoc } from './invaliddoc';
import { MultipleDoc } from './multipledoc';
import { PropsDoc } from './propsdoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { StyleDoc } from './styledoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, TreeSelectModule, FormsModule, ReactiveFormsModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, MultipleDoc, CheckboxDoc, FilterDoc, FloatLabelDoc, InvalidDoc, DisabledDoc, PropsDoc, EventsDoc, TemplatesDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc]
})
export class TreeSelectDocModule {}
