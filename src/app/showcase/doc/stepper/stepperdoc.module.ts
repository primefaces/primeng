import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { ImportDoc } from './importdoc';
import { BasicDoc } from './basicdoc';
import { ButtonModule } from 'primeng/button';
import { VerticalDoc } from './verticaldoc';
import { LinearDoc } from './lineardoc';
import { TemplateDoc } from './templatedoc';
import { PasswordModule } from 'primeng/password';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepList } from 'primeng/steplist';
import { Stepper } from 'primeng/stepper';
import { StepPanel } from 'primeng/steppanel';
import { StepPanels } from 'primeng/steppanels';
import { StepperSeparator } from 'src/app/components/stepper/stepperseparator';
import { Step } from 'primeng/step';

@NgModule({
    imports: [
        CommonModule,
        AppCodeModule,
        AppDocModule,
        Stepper,
        StepList,
        StepPanels,
        StepPanel,
        Step,
        StepperSeparator,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        PasswordModule,
        InputIconModule,
        IconFieldModule,
        InputTextModule,
        ToggleButtonModule
    ],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, VerticalDoc, LinearDoc, TemplateDoc, AccessibilityDoc]
})
export class StepperDocModule {}
