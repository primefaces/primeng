import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { FilterDoc } from './filterdoc';
import { ImportDoc } from './importdoc';
import { InputDoc } from './inputdoc';
import { RangeDoc } from './rangedoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { StepDoc } from './stepdoc';
import { StyleDoc } from './styledoc';
import { VerticalDoc } from './verticaldoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, FormsModule, ReactiveFormsModule, SliderModule, AppDocModule, InputTextModule, SelectButtonModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, InputDoc, StepDoc, RangeDoc, VerticalDoc, FilterDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc]
})
export class SliderDocModule {}
