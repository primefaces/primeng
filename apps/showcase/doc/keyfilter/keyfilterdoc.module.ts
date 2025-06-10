import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilter } from 'primeng/keyfilter';
import { AccessibilityDoc } from './accessibilitydoc';
import { ImportDoc } from './importdoc';
import { PresetsDoc } from './presetsdoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { TemplateDrivenFormsDoc } from './templatedrivenformsdoc';
import { RegexDoc } from './regexdoc';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [CommonModule, AppCodeModule, ReactiveFormsModule, AppDocModule, KeyFilter, InputTextModule, ToastModule, MessageModule, ButtonModule, FormsModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, PresetsDoc, RegexDoc, AccessibilityDoc, ReactiveFormsDoc, TemplateDrivenFormsDoc]
})
export class KeyFilterDocModule {}
