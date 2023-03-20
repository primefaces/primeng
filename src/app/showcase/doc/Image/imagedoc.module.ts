import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { TemplatesDoc } from './templatesdoc';
import { BasicDoc } from './basicdoc';
import { EventsDoc } from './eventsdoc';
import { IndicatorTemplateDoc } from './indicatortemplatedoc';
import { PreviewDoc } from './previewdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { ImportDoc } from './importdoc';

@NgModule({
    imports: [CommonModule, RouterModule, ImageModule, AppCodeModule, AppDocModule],
    declarations: [ImportDoc, BasicDoc, IndicatorTemplateDoc, PreviewDoc, StyleDoc, PropsDoc, EventsDoc, TemplatesDoc],
    exports: [AppDocModule]
})
export class ImageDocModule {}
