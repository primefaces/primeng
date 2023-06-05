import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ImportDoc } from './importdoc';
import { BasicDoc } from './basicdoc';
import { InlineDoc } from './inlinedoc';
import { FormatDoc } from './formatdoc';
import { DisabledDoc } from './disableddoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { EventsDoc } from './eventsdoc';
import { AccessibilityDoc } from './accessibilitydoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, FormsModule, ReactiveFormsModule, ColorPickerModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, InlineDoc, FormatDoc, DisabledDoc, PropsDoc, StyleDoc, EventsDoc, AccessibilityDoc, ReactiveFormsDoc]
})
export class ColorPickerDocModule {}
