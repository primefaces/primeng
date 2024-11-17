import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';
import { InvalidDoc } from './invaliddoc';
import { StyleDoc } from './styledoc';
import { VariantsDoc } from './variantsdoc';
@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, FormsModule, FloatLabelModule, InputTextModule],
    declarations: [ImportDoc, BasicDoc, VariantsDoc, InvalidDoc, StyleDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class FloatLabelDocModule {}
