import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { BasicDoc } from './basicdoc';
import { CustomContentDoc } from './customdoc';
import { CommandDoc } from './commanddoc';
import { GroupDoc } from './groupdoc';
import { ImportDoc } from './importdoc';
import { NavigationDoc } from './navigationdoc';
import { PopupDoc } from './popupdoc';
import { StyleDoc } from './styledoc';
import { AccessibilityDoc } from './accessibilitydoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, MenuModule, ToastModule, ButtonModule, AppDocModule],
    declarations: [BasicDoc, CommandDoc, CustomContentDoc, GroupDoc, ImportDoc, NavigationDoc, PopupDoc, StyleDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class MenuDocModule {}
