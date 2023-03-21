import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { ImportDoc } from './importdoc';
import { BasicDoc } from './basicdoc';
import { DropdownModule } from 'primeng/dropdown';
import { EditableDoc } from './editabledoc';
import { GroupDoc } from './groupdoc';
import { TemplateDoc } from './templatedoc';
import { DisabledDoc } from './disableddoc';
import { VirtualScrollDoc } from './virtualscrolldoc';
import { FilterDoc } from './filterdoc';
import { FloatLabelDoc } from './floatlabeldoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { EventsDoc } from './eventsdoc';
import { MethodsDoc } from './methodsdoc';
import { TemplatesDoc } from './templatesdoc';
import { AccessibilityDoc } from './accessibilitydoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, FormsModule, ReactiveFormsModule, DropdownModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, EditableDoc, GroupDoc, TemplateDoc, DisabledDoc, VirtualScrollDoc, FilterDoc, FloatLabelDoc, PropsDoc, StyleDoc, EventsDoc, MethodsDoc, TemplatesDoc, AccessibilityDoc, ReactiveFormsDoc]
})
export class DropdownDocModule {}
