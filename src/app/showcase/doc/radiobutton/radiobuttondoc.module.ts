import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { DisabledDoc } from './disableddoc';
import { DynamicDoc } from './dynamicdoc';
import { EventsDoc } from './eventsdoc';
import { GroupDoc } from './groupdoc';
import { ImportDoc } from './importdoc';
import { InvalidDoc } from './invaliddoc';
import { MethodsDoc } from './methodsdoc';
import { PropsDoc } from './propsdoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, RadioButtonModule, FormsModule, ReactiveFormsModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, GroupDoc, DynamicDoc, InvalidDoc, DisabledDoc, PropsDoc, EventsDoc, MethodsDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc]
})
export class RadioButtonDocModule {}
