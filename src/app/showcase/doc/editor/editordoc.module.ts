import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { DropdownModule } from 'primeng/dropdown';
import { ImportDoc } from './importdoc';
import { QuillDoc } from './quilldoc';
import { BasicDoc } from './basicdoc';
import { EditorModule } from 'primeng/editor';
import { ReadOnlyDoc } from './readonlydoc';
import { CustomToolbarDoc } from './customtoolbardoc';
import { PropsDoc } from './propsdoc';
import { EventsDoc } from './eventsdoc';
import { MethodsDoc } from './methodsdoc';
import { StyleDoc } from './styledoc';
import { AccessibilityDoc } from './accessibilitydoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, EditorModule, FormsModule, DropdownModule, ReactiveFormsModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, QuillDoc, BasicDoc, ReadOnlyDoc, CustomToolbarDoc, PropsDoc, EventsDoc, MethodsDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, TemplatesDoc]
})
export class EditorDocModule {}
