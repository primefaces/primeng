import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { SidebarBasicDemo } from './basicdoc';
import { SidebarTemplateDemo } from './templatedoc';
import { EventsDoc } from './eventsdoc';
import { ImportDoc } from './importdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { TemplatesDoc } from './templatesdoc';
import { SidebarPositionDemo } from './positiondoc';
import { SidebarFullScreenDemo } from './fullscreendoc';
import { SidebarSizeDemo } from './sizedoc';

@NgModule({
    imports: [CommonModule, FormsModule, AppCodeModule, RouterModule, SidebarModule, ButtonModule, AppDocModule],
    declarations: [SidebarBasicDemo, SidebarTemplateDemo, EventsDoc, ImportDoc, PropsDoc, StyleDoc, TemplatesDoc, SidebarPositionDemo, SidebarFullScreenDemo, SidebarSizeDemo],
    exports: [AppDocModule]
})
export class SidebarDocModule {}
