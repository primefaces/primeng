import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { TabViewBasicDemo } from './basicdoc';
import { TabViewControlledDemo } from './controlleddoc';
import { TabViewDisabledDemo } from './disableddoc';
import { TabViewTemplateDemo } from './customtemplatedoc';
import { ImportDoc } from './importdoc';
import { TabViewClosableDemo } from './closabledoc';
import { ScrollableDoc } from './scrollabledoc';
import { StyleDoc } from './styledoc';
import { PropsDoc } from './propsdoc';
import { EventsDoc } from './eventsdoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, TabViewModule, RouterModule, ButtonModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, TabViewBasicDemo, TabViewControlledDemo, TabViewDisabledDemo, TabViewTemplateDemo, TabViewClosableDemo, ScrollableDoc, StyleDoc, PropsDoc, EventsDoc, TemplatesDoc]
})
export class TabViewDocModule {}
