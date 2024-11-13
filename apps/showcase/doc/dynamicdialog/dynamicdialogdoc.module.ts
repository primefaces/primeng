import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { CloseDoc } from './closedoc';
import { CustomizationDoc } from './customizationdoc';
import { ExampleDoc } from './exampledoc';
import { Footer } from './footer';
import { ImportDoc } from './importdoc';
import { InfoDemo } from './infodemo';
import { OpenDoc } from './opendoc';
import { PassingDataDoc } from './passingdatadoc';
import { ProductListDemo } from './productlistdemo';
import { StyleDoc } from './styledoc';
import { UsageDoc } from './usagedoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, FormsModule, Tag, Dialog, ButtonModule, AppDocModule, ToastModule, TableModule],
    declarations: [OpenDoc, Footer, ImportDoc, StyleDoc, ExampleDoc, ProductListDemo, UsageDoc, PassingDataDoc, CloseDoc, StyleDoc, InfoDemo, CustomizationDoc],
    exports: [AppDocModule]
})
export class DynamicDialogDocModule {}
