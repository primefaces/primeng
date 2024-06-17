import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { DisabledDoc } from './disableddoc';
import { FloatLabelDoc } from './floatlabeldoc';
import { HelpTextDoc } from './helptextdoc';
import { IconsDoc } from './iconsdoc';
import { ImportDoc } from './importdoc';
import { InvalidDoc } from './invaliddoc';
import { KeyFilterDoc } from './keyfilterdoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { SizesDoc } from './sizesdoc';
import { StyleDoc } from './styledoc';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FilledDoc } from './filleddoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, InputTextModule, FormsModule, ReactiveFormsModule, AppDocModule, KeyFilterModule, FloatLabelModule],
    declarations: [BasicDoc, DisabledDoc, FloatLabelDoc, HelpTextDoc, IconsDoc, InvalidDoc, KeyFilterDoc, SizesDoc, ImportDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, FilledDoc],
    exports: [AppDocModule]
})
export class InputtextDocModule {}
