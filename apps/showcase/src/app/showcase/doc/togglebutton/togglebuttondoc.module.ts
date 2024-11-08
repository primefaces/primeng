import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToggleButton } from 'primeng/togglebutton';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { CustomizedDoc } from './customizeddoc';
import { ImportDoc } from './importdoc';
import { DisabledDoc } from './disableddoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { StyleDoc } from './styledoc';
import { InvalidDoc } from './invaliddoc';
import { SizesDoc } from './sizesdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, ToggleButton, FormsModule, ReactiveFormsModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, CustomizedDoc, InvalidDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, DisabledDoc, SizesDoc],
})
export class ToggleButtonDocModule {}
