import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StepperModule } from 'primeng/stepper';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { ImportDoc } from './importdoc';
import { BasicDoc } from './basicdoc';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, StepperModule, RouterModule,ButtonModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, AccessibilityDoc]
})
export class StepperDocModule {}
