import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ScrollTopBasicDemo } from './basicdoc';
import { ScrollTopElementDemo } from './elementdoc';
import { ImportDoc } from './importdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, ScrollTopModule],
    declarations: [ScrollTopBasicDemo, ScrollTopElementDemo, ImportDoc, PropsDoc, StyleDoc],
    exports: [AppDocModule]
})
export class ScrollTopDocModule {}
