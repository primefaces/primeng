import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '@alamote/primeng/button';
import { TagModule } from '@alamote/primeng/tag';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { StyleDoc } from './styledoc';
import { BasicDoc } from './basicdoc';
import { IconDoc } from './icondoc';
import { ImportDoc } from './importdoc';
import { PillDoc } from './pilldoc';
import { TemplateDoc } from './templatedoc';
import { SeverityDoc } from './severitydoc';
import { AccessibilityDoc } from './accessibilitydoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, TagModule, ButtonModule],
    declarations: [ImportDoc, BasicDoc, IconDoc, PillDoc, StyleDoc, TemplateDoc, SeverityDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class TagDocModule {}
