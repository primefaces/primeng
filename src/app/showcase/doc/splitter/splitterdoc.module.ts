import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SplitterModule } from 'primeng/splitter';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { HorizontalDoc } from './horizontaldoc';
import { ImportDoc } from './importdoc';
import { NestedDoc } from './nesteddoc';
import { SizeDoc } from './sizedoc';
import { StyleDoc } from './styledoc';
import { VerticalDoc } from './verticaldoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, SplitterModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, HorizontalDoc, SizeDoc, VerticalDoc, NestedDoc, StyleDoc, AccessibilityDoc]
})
export class SplitterDocModule {}
