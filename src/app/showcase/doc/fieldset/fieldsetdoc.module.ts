import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FieldsetModule } from 'primeng/fieldset';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { EventsDoc } from './eventsdoc';
import { ImportDoc } from './importdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { TemplatesDoc } from './templatesdoc';
import { ToggleableDoc } from './toggleabledoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, FieldsetModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, ToggleableDoc, TemplateDoc, StyleDoc, PropsDoc, EventsDoc, TemplatesDoc, AccessibilityDoc]
})
export class FieldsetDocModule {}
