import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { FloatLabelDoc } from './floatlabeldoc';
import { IftaLabelDoc } from './iftalabeldoc';
import { ImportDoc } from './importdoc';
import { SizesDoc } from './sizesdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, InputTextModule, IconFieldModule, InputIconModule, FormsModule, FloatLabelModule, IftaLabelModule],
    declarations: [ImportDoc, BasicDoc, TemplateDoc, FloatLabelDoc, IftaLabelDoc, SizesDoc, AccessibilityDoc, StyleDoc],
    exports: [AppDocModule]
})
export class IconFieldDocModule {}
