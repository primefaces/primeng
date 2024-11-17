import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { FieldsetModule } from 'primeng/fieldset';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { ToggleableDoc } from './toggleabledoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, FieldsetModule, RouterModule, AvatarModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, ToggleableDoc, TemplateDoc, StyleDoc, AccessibilityDoc]
})
export class FieldsetDocModule {}
