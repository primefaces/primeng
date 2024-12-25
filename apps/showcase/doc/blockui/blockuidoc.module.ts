import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlockUI } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { DocumentDoc } from './documentdoc';
import { ImportDoc } from './importdoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, PanelModule, ButtonModule, BlockUI],
    declarations: [ImportDoc, BasicDoc, DocumentDoc, StyleDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class BlockUIDocModule {}
