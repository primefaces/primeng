import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { TemplatesDoc } from './templatesdoc';
import { BasicDoc } from './basicdoc';
import { EventsDoc } from './eventsdoc';
import { TemplateDoc } from './templatedoc';
import { PreviewDoc } from './previewdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { ImportDoc } from './importdoc';
import { AccessibilityDoc } from './accessibilitydoc';

@NgModule({
    imports: [CommonModule, RouterModule, ImageModule, AppCodeModule, AppDocModule],
    declarations: [ImportDoc, BasicDoc, TemplateDoc, PreviewDoc, StyleDoc, PropsDoc, EventsDoc, TemplatesDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class ImageDocModule {}
