import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { InplaceBasicDemo } from './basicdoc';
import { InplaceDataDemo } from './datadoc';
import { EventsDoc } from './eventsdoc';
import { InplaceImageDemo } from './imagedoc';
import { ImportDoc } from './importdoc';
import { InplaceInputDemo } from './inputdoc';
import { MethodsDoc } from './methodsdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, InplaceModule, InputTextModule, TableModule],
    declarations: [InplaceBasicDemo, InplaceDataDemo, EventsDoc, InplaceImageDemo, ImportDoc, InplaceInputDemo, MethodsDoc, PropsDoc, StyleDoc],
    exports: [AppDocModule]
})
export class InplaceDocModule {}
