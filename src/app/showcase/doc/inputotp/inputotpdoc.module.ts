import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { InputOtpModule } from 'primeng/inputotp';
import { ImportDoc } from './importdoc';
import { BasicDoc } from './basicdoc';
import { MaskDoc } from './maskdoc';
import { IntegerOnlyDoc } from './integeronlydoc';
import { TemplateDoc } from './templatedoc';
import { InputTextModule } from 'primeng/inputtext';
import { SampleDoc } from './sampledoc';
import { ButtonModule } from 'primeng/button';
import { AccessibilityDoc } from './accessibilitydoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, FormsModule, ReactiveFormsModule, InputOtpModule, InputTextModule, ButtonModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, MaskDoc, IntegerOnlyDoc, TemplateDoc, SampleDoc, AccessibilityDoc]
})
export class InputOtpDocModule {}
