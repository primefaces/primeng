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
import { TemplateDrivenFormsDoc } from './templatedrivenformsdoc';
import { SizesDoc } from './sizesdoc';
import { StyleDoc } from './styledoc';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, ToggleButton, FormsModule, ReactiveFormsModule, RouterModule, ButtonModule, ToastModule, MessageModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, CustomizedDoc, InvalidDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, DisabledDoc, SizesDoc, TemplateDrivenFormsDoc]
})
export class ToggleButtonDocModule {}
