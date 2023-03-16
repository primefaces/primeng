import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { FileUploadAdvancedDemo } from './advanceddoc';
import { FileUploadBasicDemo } from './basicdoc';
import { EventsDoc } from './eventsdoc';
import { ImportDoc } from './importdoc';
import { MethodsDoc } from './methodsdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { FileUploadTemplateDemo } from './templatedoc';
import { TemplatesDoc } from './templatesdoc';
import { FileUploadAutoDemo } from './autodoc';

@NgModule({
    imports: [CommonModule, FormsModule, AppCodeModule, AppDocModule, ButtonModule, TagModule, ProgressBarModule, ToastModule, FileUploadModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, FileUploadBasicDemo, FileUploadTemplateDemo, StyleDoc, PropsDoc, EventsDoc, TemplatesDoc, FileUploadAdvancedDemo, MethodsDoc, FileUploadAutoDemo]
})
export class FileUploadDocModule {}
