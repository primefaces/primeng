import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { DisabledDoc } from './disableddoc';
import { IconsDoc } from './iconsdoc';
import { ImportDoc } from './importdoc';
import { NestedDoc } from './nesteddoc';
import { OutlinedDoc } from './outlineddoc';
import { RaisedDoc } from './raiseddoc';
import { RaisedTextDoc } from './raisedtextdoc';
import { RoundedDoc } from './roundeddoc';
import { SeverityDoc } from './severitydoc';
import { SizesDoc } from './sizesdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { TextDoc } from './textdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, SplitButtonModule, ToastModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, IconsDoc, NestedDoc, SeverityDoc, RaisedDoc, RoundedDoc, TextDoc, RaisedTextDoc, OutlinedDoc, SizesDoc, DisabledDoc, TemplateDoc, StyleDoc, AccessibilityDoc]
})
export class SplitButtonDocModule {}
