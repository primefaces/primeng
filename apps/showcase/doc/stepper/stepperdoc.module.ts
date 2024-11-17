import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { StepsOnlyDoc } from '@/doc/stepper/stepsonly';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { StepperModule } from 'primeng/stepper';
import { ToggleButton } from 'primeng/togglebutton';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';
import { LinearDoc } from './lineardoc';
import { TemplateDoc } from './templatedoc';
import { VerticalDoc } from './verticaldoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, StepperModule, RouterModule, FormsModule, ReactiveFormsModule, ButtonModule, PasswordModule, InputIcon, IconField, InputTextModule, ToggleButton],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, VerticalDoc, LinearDoc, TemplateDoc, AccessibilityDoc, StepsOnlyDoc]
})
export class StepperDocModule {}
