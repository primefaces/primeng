import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { DisabledDoc } from './disableddoc';
import { FilledDoc } from './filleddoc';
import { FloatLabelDoc } from './floatlabeldoc';
import { HelpTextDoc } from './helptextdoc';
import { IconsDoc } from './iconsdoc';
import { IftaLabelDoc } from './iftalabeldoc';
import { ImportDoc } from './importdoc';
import { InvalidDoc } from './invaliddoc';
import { KeyFilterDoc } from './keyfilterdoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { SizesDoc } from './sizesdoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, InputTextModule, FormsModule, ReactiveFormsModule, AppDocModule, KeyFilterModule, FloatLabelModule, IftaLabelModule, RouterModule],
    declarations: [BasicDoc, DisabledDoc, FloatLabelDoc, IftaLabelDoc, HelpTextDoc, IconsDoc, InvalidDoc, KeyFilterDoc, SizesDoc, ImportDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, FilledDoc],
    exports: [AppDocModule]
})
export class InputtextDocModule {}
