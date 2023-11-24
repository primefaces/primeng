import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChipModule } from 'primeng/chip';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { IconDoc } from './icondoc';
import { ImageDoc } from './imagedoc';
import { ImportDoc } from './importdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, ChipModule],
    declarations: [ImportDoc, BasicDoc, IconDoc, ImageDoc, StyleDoc, TemplateDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class ChipDocModule {}
