import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollPanelModule } from '@alamote/primeng/scrollpanel';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { CusstomDoc } from './customdoc';
import { ImportDoc } from './importdoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, ScrollPanelModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, CusstomDoc, StyleDoc, AccessibilityDoc]
})
export class ScrollPanelDocModule {}
