import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { CusstomDoc } from './customdoc';
import { ImportDoc } from './importdoc';
import { MethodsDoc } from './methodsdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, ScrollPanelModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, CusstomDoc, StyleDoc, PropsDoc, MethodsDoc, TemplatesDoc, AccessibilityDoc]
})
export class ScrollPanelDocModule {}
