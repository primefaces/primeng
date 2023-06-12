import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlideMenuModule } from 'primeng/slidemenu';
import { ButtonModule } from 'primeng/button';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';
import { PopupDoc } from './popupdoc';
import { StyleDoc } from './styledoc';
import { AccessibilityDoc } from './accessibilitydoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, SlideMenuModule, ButtonModule, AppDocModule],
    declarations: [BasicDoc, ImportDoc, StyleDoc, PopupDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class SlideMenuDocModule {}
