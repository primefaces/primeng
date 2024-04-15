import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { TimelineModule } from '@alamote/primeng/timeline';
import { ImportDoc } from './importdoc';
import { BasicDoc } from './basicdoc';
import { AlignmentDoc } from './alignmentdoc';
import { OppositeDoc } from './oppositedoc';
import { TemplateDoc } from './templatedoc';
import { CardModule } from '@alamote/primeng/card';
import { ButtonModule } from '@alamote/primeng/button';
import { HorizontalDoc } from './horizontaldoc';
import { StyleDoc } from './styledoc';
import { RouterModule } from '@angular/router';
import { AccessibilityDoc } from './accessibilitydoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, TimelineModule, CardModule, ButtonModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, AlignmentDoc, OppositeDoc, TemplateDoc, HorizontalDoc, StyleDoc, AccessibilityDoc]
})
export class TimelineDocModule {}
