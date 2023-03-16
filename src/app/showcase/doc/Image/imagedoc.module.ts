import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { TemplatesDoc } from './templatesdoc';
import { ImageBasicDemo } from './basicdoc';
import { EventsDoc } from './eventsdoc';
import { ImageIndicatorTemplateDemo } from './indicatortemplatedoc';
import { ImagePreviewDemo } from './previewdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { ImportDoc } from './importdoc';

@NgModule({
    imports: [CommonModule, RouterModule, ImageModule, AppCodeModule, AppDocModule],
    declarations: [ImportDoc, ImageBasicDemo, ImageIndicatorTemplateDemo, ImagePreviewDemo, StyleDoc, PropsDoc, EventsDoc, TemplatesDoc],
    exports: [AppDocModule]
})
export class ImageDocModule {}
