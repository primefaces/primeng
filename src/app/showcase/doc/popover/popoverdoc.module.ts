import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';
import { StyleDoc } from './styledoc';
import { DataTableDoc } from './datatabledoc';
import { TemplateDoc } from './templatedoc';
import { TargetDoc } from './targetdoc';
import { AccessibilityDoc } from './accessibilitydoc';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PopoverModule } from 'primeng/popover';
import { TagModule } from 'primeng/tag';
import { SelectDataDoc } from './selectdatadoc';

@NgModule({
    imports: [
        CommonModule,
        AppCodeModule,
        RouterModule,
        PopoverModule,
        ButtonModule,
        TableModule,
        ToastModule,
        AppDocModule,
        InputGroupModule,
        InputGroupAddonModule,
        InputTextModule,
        TagModule
    ],
    declarations: [BasicDoc, ImportDoc, StyleDoc, DataTableDoc, TemplateDoc, TargetDoc, SelectDataDoc, AccessibilityDoc],
    exports: [AppDocModule],
})
export class PopoverDocModule {}
