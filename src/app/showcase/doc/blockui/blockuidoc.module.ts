import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { BlockUiBasicDemo } from './basicdoc';
import { BlockUiDocumentDemo } from './documentdoc';
import { ImportDoc } from './importdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, PanelModule, ButtonModule, BlockUIModule],
    declarations: [ImportDoc, BlockUiBasicDemo, BlockUiDocumentDemo, StyleDoc, PropsDoc],
    exports: [AppDocModule]
})
export class BlockUIDocModule {}
