import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RatingModule } from 'primeng/rating';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { DisabledDoc } from './disableddoc';
import { EventsDoc } from './eventsdoc';
import { ImportDoc } from './importdoc';
import { NumberOfStarsDoc } from './numberofstarsdoc';
import { PropsDoc } from './propsdoc';
import { ReadOnlyDoc } from './readonlydoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { WithoutCancelDoc } from './withoutcanceldoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, RatingModule, FormsModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, WithoutCancelDoc, NumberOfStarsDoc, TemplateDoc, ReadOnlyDoc, DisabledDoc, StyleDoc, PropsDoc, EventsDoc, AccessibilityDoc]
})
export class RatingDocModule {}
