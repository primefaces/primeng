import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';
import { MenuItemDoc } from './menuitemdoc';
import { MultipleDoc } from './multipledoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, PanelMenuModule, AppDocModule],
    declarations: [BasicDoc, ImportDoc, MultipleDoc, MenuItemDoc, PropsDoc, StyleDoc, AccessibilityDoc, TemplatesDoc],
    exports: [AppDocModule]
})
export class PanelMenuDocModule {}
