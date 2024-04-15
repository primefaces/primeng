import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from '@alamote/primeng/accordion';
import { ButtonModule } from '@alamote/primeng/button';
import { AvatarModule } from '@alamote/primeng/avatar';
import { BadgeModule } from '@alamote/primeng/badge';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { ControlledDoc } from './controlleddoc';
import { DisabledDoc } from './disableddoc';
import { ImportDoc } from './importdoc';
import { MultipleDoc } from './multipledoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, AccordionModule, ButtonModule, RouterModule, AvatarModule, BadgeModule, FormsModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, MultipleDoc, DisabledDoc, ControlledDoc, TemplateDoc, StyleDoc, AccessibilityDoc]
})
export class AccordionDocModule {}
