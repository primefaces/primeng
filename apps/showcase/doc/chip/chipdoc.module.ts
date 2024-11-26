import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Chip } from 'primeng/chip';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { IconDoc } from './icondoc';
import { ImageDoc } from './imagedoc';
import { ImportDoc } from './importdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, Chip],
    declarations: [ImportDoc, BasicDoc, IconDoc, ImageDoc, StyleDoc, TemplateDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class ChipDocModule {}
