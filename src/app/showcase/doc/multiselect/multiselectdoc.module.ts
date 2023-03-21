import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MultiSelectModule } from 'primeng/multiselect';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { ChipsDoc } from './chipsdoc';
import { DisabledDoc } from './disableddoc';
import { EventsDoc } from './eventsdoc';
import { FilterDoc } from './filterdoc';
import { FloatLabelDoc } from './floatlabeldoc';
import { GroupDoc } from './groupdoc';
import { ImportDoc } from './importdoc';
import { InvalidDoc } from './invaliddoc';
import { PropsDoc } from './propsdoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { TemplatesDoc } from './templatesdoc';
import { VirtualScrollDoc } from './virtualscrolldoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, MultiSelectModule, FormsModule, ReactiveFormsModule, AppDocModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, ChipsDoc, GroupDoc, FilterDoc, TemplateDoc, VirtualScrollDoc, FloatLabelDoc, InvalidDoc, DisabledDoc, StyleDoc, PropsDoc, EventsDoc, TemplatesDoc, AccessibilityDoc, ReactiveFormsDoc]
})
export class MultiSelectDocModule {}
