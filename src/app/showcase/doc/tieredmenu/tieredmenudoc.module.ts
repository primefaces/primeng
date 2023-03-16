import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { TieredMenuBasicDemo } from './basicdoc';
import { EventsDoc } from './eventsdoc';
import { ImportDoc } from './importdoc';
import { MenuItemDoc } from './menuitemdoc';
import { TieredMenuPopupDemo } from './popupdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { MethodsDoc } from './methodsdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, TieredMenuModule, ButtonModule, AppDocModule],
    declarations: [TieredMenuBasicDemo, EventsDoc, ImportDoc, MenuItemDoc, TieredMenuPopupDemo, PropsDoc, StyleDoc, MethodsDoc],
    exports: [AppDocModule]
})
export class TieredMenuDocModule {}
