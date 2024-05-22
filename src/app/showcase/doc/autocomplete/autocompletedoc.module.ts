import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ImportDoc } from './importdoc';
import { BasicDoc } from './basicdoc';
import { TemplateDoc } from './templatedoc';
import { GroupDoc } from './groupdoc';
import { VirtualScrollDoc } from './virtualscrolldoc';
import { MultipleDoc } from './multipledoc';
import { StyleDoc } from './styledoc';
import { AccessibilityDoc } from './accessibilitydoc';
import { DropdownDoc } from './dropdowndoc';
import { ForceSelectionDoc } from './forceselectiondoc';
import { ObjectsDoc } from './objectsdoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { FloatLabelDoc } from './floatlabeldoc';
import { DisabledDoc } from './disableddoc';
import { InvalidDoc } from './invaliddoc';
import { FilledDoc } from './filleddoc';
import { FloatLabelModule } from 'primeng/floatlabel';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, FormsModule, AppDocModule, AutoCompleteModule, ReactiveFormsModule, RouterModule, FloatLabelModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, TemplateDoc, GroupDoc, VirtualScrollDoc, MultipleDoc, StyleDoc, AccessibilityDoc, DropdownDoc, ForceSelectionDoc, ObjectsDoc, ReactiveFormsDoc, FloatLabelDoc, DisabledDoc, InvalidDoc, FilledDoc]
})
export class AutoCompleteDocModule {}
