import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';
import { InputDoc } from './inputdoc';
import { RangeDoc } from './rangedoc';
import { StepDoc } from './stepdoc';
import { StyleDoc } from './styledoc';
import { VerticalDoc } from './verticaldoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, FormsModule, ReactiveFormsModule, SliderModule, AppDocModule, InputTextModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, InputDoc, StepDoc, RangeDoc, VerticalDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc]
})
export class SliderDocModule {}
