import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Drawer } from 'primeng/drawer';
import { Ripple } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { StyleClass } from 'primeng/styleclass';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { FullScreenDoc } from './fullscreendoc';
import { HeadlessDoc } from './headlessdoc';
import { ImportDoc } from './importdoc';
import { PositionDoc } from './positiondoc';
import { SizeDoc } from './sizedoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';

@NgModule({
    imports: [CommonModule, FormsModule, AppCodeModule, RouterModule, SidebarModule, ButtonModule, AppDocModule, AvatarModule, Ripple, StyleClass, Drawer],
    declarations: [BasicDoc, TemplateDoc, ImportDoc, StyleDoc, PositionDoc, FullScreenDoc, SizeDoc, AccessibilityDoc, HeadlessDoc],
    exports: [AppDocModule]
})
export class DrawerDocModule {}
