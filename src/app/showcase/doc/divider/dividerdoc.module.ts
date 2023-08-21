import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { ContentDoc } from './contentdoc';
import { ImportDoc } from './importdoc';
import { LoginDoc } from './logindoc';
import { StyleDoc } from './styledoc';
import { TypeDoc } from './typedoc';
import { VerticalDoc } from './verticaldoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, DividerModule, ButtonModule, InputTextModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, TypeDoc, ContentDoc, VerticalDoc, LoginDoc, StyleDoc, AccessibilityDoc]
})
export class DividerDocModule {}
