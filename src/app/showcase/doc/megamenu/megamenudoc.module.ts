import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { ImportDoc } from './importdoc';
import { MegaMenuBasicDemo } from './basicdoc';
import { EventsDoc } from './eventsdoc';
import { MegaMenuItemDoc } from './megamenuitemdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { MegaMenuTemplateDemo } from './templatedoc';
import { TemplatesDoc } from './templatesdoc';
import { MegaMenuVerticalDemo } from './verticaldoc';
import { MegaMenuModule } from 'primeng/megamenu';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, MegaMenuModule, InputTextModule, ButtonModule, AppDocModule],
    declarations: [MegaMenuBasicDemo, EventsDoc, ImportDoc, MegaMenuItemDoc, PropsDoc, StyleDoc, MegaMenuTemplateDemo, TemplatesDoc, MegaMenuVerticalDemo],
    exports: [AppDocModule]
})
export class MegaMenuDocModule {}
