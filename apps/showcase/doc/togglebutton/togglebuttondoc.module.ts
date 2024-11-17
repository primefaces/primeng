import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToggleButton } from 'primeng/togglebutton';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { CustomizedDoc } from './customizeddoc';
import { DisabledDoc } from './disableddoc';
import { ImportDoc } from './importdoc';
import { InvalidDoc } from './invaliddoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { SizesDoc } from './sizesdoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, ToggleButton, FormsModule, ReactiveFormsModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, CustomizedDoc, InvalidDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, DisabledDoc, SizesDoc]
})
export class ToggleButtonDocModule {}
