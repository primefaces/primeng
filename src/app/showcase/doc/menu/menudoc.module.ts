import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { MenuBasicDemo } from './basicdoc';
import { MenuCustomContentDemo } from './customdoc';
import { MenuCommandDemo } from './commanddoc';
import { EventsDoc } from './eventsdoc';
import { MethodsDoc } from './methodsdoc';
import { MenuGroupDemo } from './groupdoc';
import { ImportDoc } from './importdoc';
import { MenuItemDoc } from './menuitemdoc';
import { MenuNavigationDemo } from './navigationdoc';
import { MenuPopupDemo } from './popupdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, MenuModule, ToastModule, ButtonModule, AppDocModule],
    declarations: [MenuBasicDemo, MenuCommandDemo, MenuCustomContentDemo, EventsDoc, MenuGroupDemo, ImportDoc, MenuItemDoc, MethodsDoc, MenuNavigationDemo, MenuPopupDemo, PropsDoc, StyleDoc],
    exports: [AppDocModule]
})
export class MenuDocModule {}
