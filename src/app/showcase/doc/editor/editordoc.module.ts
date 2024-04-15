import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { DropdownModule } from '@alamote/primeng/dropdown';
import { ImportDoc } from './importdoc';
import { QuillDoc } from './quilldoc';
import { BasicDoc } from './basicdoc';
import { EditorModule } from '@alamote/primeng/editor';
import { ReadOnlyDoc } from './readonlydoc';
import { CustomToolbarDoc } from './customtoolbardoc';
import { StyleDoc } from './styledoc';
import { AccessibilityDoc } from './accessibilitydoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, EditorModule, FormsModule, DropdownModule, ReactiveFormsModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, QuillDoc, BasicDoc, ReadOnlyDoc, CustomToolbarDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc]
})
export class EditorDocModule {}
