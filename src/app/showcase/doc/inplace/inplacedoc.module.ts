import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { DataDoc } from './datadoc';
import { EventsDoc } from './eventsdoc';
import { ImageDoc } from './imagedoc';
import { ImportDoc } from './importdoc';
import { InputDoc } from './inputdoc';
import { MethodsDoc } from './methodsdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, InplaceModule, InputTextModule, TableModule],
    declarations: [BasicDoc, DataDoc, EventsDoc, ImageDoc, ImportDoc, InputDoc, MethodsDoc, PropsDoc, StyleDoc, AccessibilityDoc, TemplatesDoc],
    exports: [AppDocModule]
})
export class InplaceDocModule {}
