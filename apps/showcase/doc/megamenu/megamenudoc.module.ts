import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MegaMenu } from 'primeng/megamenu';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { CommandDoc } from './commanddoc';
import { ImportDoc } from './importdoc';
import { RouterDoc } from './routerdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { VerticalDoc } from './verticaldoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, MegaMenu, InputTextModule, ButtonModule, AppDocModule, AvatarModule],
    declarations: [BasicDoc, ImportDoc, StyleDoc, TemplateDoc, VerticalDoc, CommandDoc, RouterDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class MegaMenuDocModule {}
