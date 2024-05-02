import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { ImportDoc } from './importdoc';
import { BasicDoc } from './basicdoc';
import { DropdownModule } from 'primeng/dropdown';
import { EditableDoc } from './editabledoc';
import { GroupDoc } from './groupdoc';
import { TemplateDoc } from './templatedoc';
import { DisabledDoc } from './disableddoc';
import { InvalidDoc } from './invaliddoc';
import { VirtualScrollDoc } from './virtualscrolldoc';
import { LazyVirtualScrollDoc } from './lazyvirtualscrolldoc';
import { FilterDoc } from './filterdoc';
import { CustomFilterDoc } from './customfilterdoc';
import { FloatLabelDoc } from './floatlabeldoc';
import { StyleDoc } from './styledoc';
import { AccessibilityDoc } from './accessibilitydoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckmarkDoc } from './checkmarkdoc';
import { ClearIconDoc } from './clearicondoc';
import { LoadingStateDoc } from './loadingstatedoc';
import { FilledDoc } from './filleddoc';
import { FloatLabelModule } from 'primeng/floatlabel';
@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, FormsModule, ReactiveFormsModule, DropdownModule, ButtonModule, InputTextModule, FloatLabelModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, EditableDoc, GroupDoc, TemplateDoc, DisabledDoc, InvalidDoc, VirtualScrollDoc, LazyVirtualScrollDoc, CustomFilterDoc, FilterDoc, FloatLabelDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, CheckmarkDoc, ClearIconDoc, LoadingStateDoc, FilledDoc]
})
export class DropdownDocModule {}
