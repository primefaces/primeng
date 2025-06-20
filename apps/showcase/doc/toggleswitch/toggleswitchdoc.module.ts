import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { DisabledDoc } from './disableddoc';
import { ImportDoc } from './importdoc';
import { InvalidDoc } from './invaliddoc';
import { PreselectionDoc } from './preselectiondoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { TemplateDrivenFormsDoc } from './templatedrivenformsdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, FormsModule, ReactiveFormsModule, ToggleSwitch, MessageModule, ToastModule, ButtonModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, PreselectionDoc, DisabledDoc, InvalidDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, TemplateDoc, TemplateDrivenFormsDoc]
})
export class ToggleSwitchDocModule {}
