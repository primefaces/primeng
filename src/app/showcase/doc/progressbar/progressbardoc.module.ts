import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { ProgressBarBasicDemo } from './basicdoc';
import { ProgressBarDynamicDemo } from './dynamicdoc';
import { ImportDoc } from './importdoc';
import { ProgressBarIndeterminateDemo } from './indeterminatedoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, ProgressBarModule, ToastModule],
    declarations: [ProgressBarBasicDemo, ProgressBarDynamicDemo, ImportDoc, ProgressBarIndeterminateDemo, PropsDoc, StyleDoc],
    exports: [AppDocModule]
})
export class ProgressBarDocModule {}
