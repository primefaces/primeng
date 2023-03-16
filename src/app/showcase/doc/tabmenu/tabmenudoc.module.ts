import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { TabMenuActiveDemo } from './activedoc';
import { TabMenuBasicDemo } from './basicdoc';
import { TabMenuControlledDemo } from './controlleddoc';
import { EventsDoc } from './eventsdoc';
import { ImportDoc } from './importdoc';
import { MenuItemDoc } from './menuitemdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { TabMenuScrollableDemo } from './scrollabledoc';
import { TabMenuTemplateDemo } from './templatedoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, TabMenuModule, ButtonModule, RippleModule, AppDocModule],
    declarations: [TabMenuBasicDemo, TemplatesDoc, EventsDoc, TabMenuScrollableDemo, ImportDoc, MenuItemDoc, PropsDoc, StyleDoc, TabMenuControlledDemo, TabMenuActiveDemo, TabMenuTemplateDemo, TemplatesDoc],
    exports: [AppDocModule]
})
export class TabMenuDocModule {}
