import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListboxModule } from 'primeng/listbox';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
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
import { LazyLoadDoc } from './lazyloaddoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, ListboxModule, FormsModule, ReactiveFormsModule, AppDocModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, MultipleDoc, TemplateDoc, InvalidDoc, DisabledDoc, FilterDoc, GroupDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, VirtualScrollDoc, LazyLoadDoc]
})
export class ListboxDocModule {}
