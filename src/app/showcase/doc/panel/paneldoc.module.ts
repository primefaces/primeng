import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { StyleDoc } from './styledoc';
import { PanelBasicDemo } from './basicdoc';
import { ImportDoc } from './importdoc';
import { PanelTemplateDemo } from './templatedoc';
import { PanelToggleableDemo } from './toggleabledoc';
import { PropsDoc } from './propsdoc';
import { EventsDoc } from './eventsdoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, PanelModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, PanelBasicDemo, PanelToggleableDemo, PanelTemplateDemo, StyleDoc, PropsDoc, EventsDoc, TemplatesDoc]
})
export class PanelDocModule {}
