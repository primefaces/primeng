import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { ScrollTopModule } from 'primeng/scrolltop';
import { BasicDoc } from './basicdoc';
import { ElementDoc } from './elementdoc';
import { ImportDoc } from './importdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { AccessibilityDoc } from './accessibilitydoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, ScrollTopModule],
    declarations: [BasicDoc, ElementDoc, ImportDoc, PropsDoc, StyleDoc, AccessibilityDoc, TemplatesDoc],
    exports: [AppDocModule]
})
export class ScrollTopDocModule {}
