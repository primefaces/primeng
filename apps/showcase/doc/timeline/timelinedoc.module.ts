import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Timeline } from 'primeng/timeline';
import { AccessibilityDoc } from './accessibilitydoc';
import { AlignmentDoc } from './alignmentdoc';
import { BasicDoc } from './basicdoc';
import { HorizontalDoc } from './horizontaldoc';
import { ImportDoc } from './importdoc';
import { OppositeDoc } from './oppositedoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, Timeline, CardModule, ButtonModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, AlignmentDoc, OppositeDoc, TemplateDoc, HorizontalDoc, StyleDoc, AccessibilityDoc]
})
export class TimelineDocModule {}
