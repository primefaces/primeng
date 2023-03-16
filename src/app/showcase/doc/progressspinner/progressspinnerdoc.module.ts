import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { ProgressSpinnerBasicDemo } from './basicdoc';
import { ProgressSpinnerTemplateDemo } from './templatedoc';
import { ImportDoc } from './importdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, ProgressSpinnerModule],
    declarations: [ProgressSpinnerBasicDemo, ImportDoc, ProgressSpinnerTemplateDemo, PropsDoc, StyleDoc],
    exports: [AppDocModule]
})
export class ProgressSpinnerDocModule {}
