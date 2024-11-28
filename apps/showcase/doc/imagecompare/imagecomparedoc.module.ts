import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { ResponsiveDoc } from './responsivedoc';
import { ImportDoc } from './importdoc';
import { ImageCompareModule } from 'primeng/imagecompare';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, FormsModule, ImageCompareModule],
    declarations: [ImportDoc, BasicDoc, AccessibilityDoc, ResponsiveDoc],
    exports: [AppDocModule]
})
export class ImageCompareDocModule {}
