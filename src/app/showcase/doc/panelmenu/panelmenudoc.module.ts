import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { PanelMenuBasicDemo } from './basicdoc';
import { ImportDoc } from './importdoc';
import { MenuItemDoc } from './menuitemdoc';
import { PanelMenuMultipleDemo } from './multipledoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, PanelMenuModule, AppDocModule],
    declarations: [PanelMenuBasicDemo, ImportDoc, PanelMenuMultipleDemo, MenuItemDoc, PropsDoc, StyleDoc],
    exports: [AppDocModule]
})
export class PanelMenuDocModule {}
