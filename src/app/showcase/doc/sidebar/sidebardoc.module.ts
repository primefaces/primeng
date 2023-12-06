import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { BasicDoc } from './basicdoc';
import { TemplateDoc } from './templatedoc';
import { ImportDoc } from './importdoc';
import { StyleDoc } from './styledoc';
import { PositionDoc } from './positiondoc';
import { FullScreenDoc } from './fullscreendoc';
import { SizeDoc } from './sizedoc';
import { AccessibilityDoc } from './accessibilitydoc';

@NgModule({
    imports: [CommonModule, FormsModule, AppCodeModule, RouterModule, SidebarModule, ButtonModule, AppDocModule],
    declarations: [BasicDoc, TemplateDoc, ImportDoc, StyleDoc, PositionDoc, FullScreenDoc, SizeDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class SidebarDocModule {}
