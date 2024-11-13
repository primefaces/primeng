import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Rating } from 'primeng/rating';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { DisabledDoc } from './disableddoc';
import { ImportDoc } from './importdoc';
import { NumberOfStarsDoc } from './numberofstarsdoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { ReadOnlyDoc } from './readonlydoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { WithoutCancelDoc } from './withoutcanceldoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, Rating, FormsModule, ReactiveFormsModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, WithoutCancelDoc, NumberOfStarsDoc, TemplateDoc, ReadOnlyDoc, DisabledDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc]
})
export class RatingDocModule {}
