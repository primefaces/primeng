import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { ImportDoc } from './importdoc';
import { BasicDoc } from './basicdoc';
import { ButtonModule } from 'primeng/button';
import { MeterGroupModule } from 'primeng/metergroup';
import { MultipleDoc } from './multipledoc';
import { IconDoc } from './icondoc';
import { LabelDoc } from './labeldoc';
import { VerticalDoc } from './verticaldoc';
@NgModule({
    imports: [CommonModule, AppCodeModule, FormsModule, RouterModule, ButtonModule, AppDocModule, MeterGroupModule],
    declarations: [BasicDoc, ImportDoc, MultipleDoc,IconDoc,LabelDoc,VerticalDoc],
    exports: [AppDocModule]
})
export class MeterGroupDocModule {}
