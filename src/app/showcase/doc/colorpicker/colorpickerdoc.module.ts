import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
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

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, FormsModule, ColorPickerModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, InlineDoc, FormatDoc, DisabledDoc, PropsDoc, StyleDoc, EventsDoc, AccessibilityDoc]
})
export class ColorPickerDocModule {}
