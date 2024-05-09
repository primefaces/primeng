import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { ColoredDoc } from './colored.doc';
import { ImportDoc } from './importdoc';
import { SelectionDoc } from './selectiondoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, OrganizationChartModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, TemplateDoc, SelectionDoc, ColoredDoc, StyleDoc, AccessibilityDoc]
})
export class OrganizationChartDocModule {}
