import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { OpenDoc } from './opendoc';
import { ImportDoc } from './importdoc';
import { StyleDoc } from './styledoc';
import { ProductListDemo } from './productlistdemo';
import { ExampleDoc } from './exampledoc';
import { UsageDoc } from './usagedoc';
import { PassingDataDoc } from './passingdatadoc';
import { CloseDoc } from './closedoc';
import { TagModule } from 'primeng/tag';
import { InfoDemo } from './infodemo';
import { CustomizationDoc } from './customizationdoc';
import { Footer } from './footer';
@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, FormsModule, TagModule, DialogModule, ButtonModule, AppDocModule, ToastModule, TableModule],
    declarations: [OpenDoc, Footer, ImportDoc, StyleDoc, ExampleDoc, ProductListDemo, UsageDoc, PassingDataDoc, CloseDoc, StyleDoc, InfoDemo, CustomizationDoc],
    exports: [AppDocModule]
})
export class DynamicDialogDocModule {}
