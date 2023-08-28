import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { BasicDoc } from './basicdoc';
import { TemplateDoc } from './templatedoc';
import { PreviewDoc } from './previewdoc';
import { PreviewImageSourceDoc } from './previewimagesourcedoc';
import { StyleDoc } from './styledoc';
import { ImportDoc } from './importdoc';
import { AccessibilityDoc } from './accessibilitydoc';

@NgModule({
    imports: [CommonModule, RouterModule, ImageModule, AppCodeModule, AppDocModule],
    declarations: [ImportDoc, BasicDoc, TemplateDoc, PreviewDoc, PreviewImageSourceDoc, StyleDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class ImageDocModule {}
