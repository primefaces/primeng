import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { ControlledDoc } from './controlleddoc';
import { TemplateDoc } from './customtemplatedoc';
import { DisabledDoc } from './disableddoc';
import { DynamicDoc } from './dynamicdoc';
import { ImportDoc } from './importdoc';
import { ScrollableDoc } from './scrollabledoc';
import { TabmenuDoc } from './tabmenudoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, TabsModule, RouterModule, ButtonModule, AvatarModule, BadgeModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, ControlledDoc, DynamicDoc, DisabledDoc, TemplateDoc, ScrollableDoc, TabmenuDoc, AccessibilityDoc]
})
export class TabsDocModule {}
