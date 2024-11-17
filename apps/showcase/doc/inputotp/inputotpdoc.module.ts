import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputOtp } from 'primeng/inputotp';
import { InputTextModule } from 'primeng/inputtext';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';
import { IntegerOnlyDoc } from './integeronlydoc';
import { MaskDoc } from './maskdoc';
import { SampleDoc } from './sampledoc';
import { SizesDoc } from './sizesdoc';
import { TemplateDoc } from './templatedoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, FormsModule, ReactiveFormsModule, InputOtp, InputTextModule, ButtonModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, MaskDoc, IntegerOnlyDoc, TemplateDoc, SampleDoc, SizesDoc, AccessibilityDoc]
})
export class InputOtpDocModule {}
