import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { ControlledDoc } from './controlleddoc';
import { DisabledDoc } from './disableddoc';
import { EventsDoc } from './eventsdoc';
import { ImportDoc } from './importdoc';
import { MultipleDoc } from './multipledoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, AccordionModule, ButtonModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, MultipleDoc, DisabledDoc, ControlledDoc, TemplateDoc, StyleDoc, PropsDoc, EventsDoc, TemplatesDoc, AccessibilityDoc]
})
export class AccordionDocModule {}
