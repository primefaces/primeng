import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { AccordionBasicDemo } from './basicdoc';
import { AccordionControlledDemo } from './controlleddoc';
import { AccordionDisabledDemo } from './disableddoc';
import { EventsDoc } from './eventsdoc';
import { ImportDoc } from './importdoc';
import { AccordionMultipleDemo } from './multipledoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { AccordionTemplateDemo } from './templatedoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, AccordionModule, ButtonModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, AccordionBasicDemo, AccordionMultipleDemo, AccordionDisabledDemo, AccordionControlledDemo, AccordionTemplateDemo, StyleDoc, PropsDoc, EventsDoc, TemplatesDoc]
})
export class AccordionDocModule {}
