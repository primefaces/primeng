import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { StyleDoc } from './styledoc';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';
import { TemplateDoc } from './templatedoc';
import { ToggleableDoc } from './toggleabledoc';
import { AccessibilityDoc } from './accessibilitydoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, PanelModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, ToggleableDoc, TemplateDoc, StyleDoc, AccessibilityDoc]
})
export class PanelDocModule {}
