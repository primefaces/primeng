import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Listbox } from 'primeng/listbox';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { CheckmarkDoc } from './checkmarkdoc';
import { DisabledDoc } from './disableddoc';
import { FilterDoc } from './filterdoc';
import { GroupDoc } from './groupdoc';
import { ImportDoc } from './importdoc';
import { InvalidDoc } from './invaliddoc';
import { MultipleDoc } from './multipledoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { VirtualScrollDoc } from './virtualscrolldoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, Listbox, FormsModule, ReactiveFormsModule, AppDocModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, MultipleDoc, TemplateDoc, InvalidDoc, DisabledDoc, FilterDoc, GroupDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, VirtualScrollDoc, CheckmarkDoc]
})
export class ListboxDocModule {}
