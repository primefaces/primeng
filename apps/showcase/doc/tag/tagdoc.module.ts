import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { IconDoc } from './icondoc';
import { ImportDoc } from './importdoc';
import { PillDoc } from './pilldoc';
import { SeverityDoc } from './severitydoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, Tag, ButtonModule],
    declarations: [ImportDoc, BasicDoc, IconDoc, PillDoc, StyleDoc, TemplateDoc, SeverityDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class TagDocModule {}
