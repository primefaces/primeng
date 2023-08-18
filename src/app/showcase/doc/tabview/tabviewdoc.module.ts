import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { BasicDoc } from './basicdoc';
import { ControlledDoc } from './controlleddoc';
import { DisabledDoc } from './disableddoc';
import { TemplateDoc } from './customtemplatedoc';
import { ImportDoc } from './importdoc';
import { ClosableDoc } from './closabledoc';
import { ScrollableDoc } from './scrollabledoc';
import { StyleDoc } from './styledoc';
import { AccessibilityDoc } from './accessibilitydoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, TabViewModule, RouterModule, ButtonModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, ControlledDoc, DisabledDoc, TemplateDoc, ClosableDoc, ScrollableDoc, StyleDoc, AccessibilityDoc]
})
export class TabViewDocModule {}
