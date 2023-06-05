import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { ColoredDoc } from './colored.doc';
import { EventsDoc } from './eventsdoc';
import { ImportDoc } from './importdoc';
import { PropsDoc } from './propsdoc';
import { SelectionDoc } from './selectiondoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, OrganizationChartModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, TemplateDoc, SelectionDoc, ColoredDoc, StyleDoc, PropsDoc, EventsDoc, AccessibilityDoc, TemplatesDoc]
})
export class OrganizationChartDocModule {}
