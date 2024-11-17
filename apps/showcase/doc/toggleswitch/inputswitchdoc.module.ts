import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { DisabledDoc } from './disableddoc';
import { ImportDoc } from './importdoc';
import { InvalidDoc } from './invaliddoc';
import { PreselectionDoc } from './preselectiondoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, FormsModule, ReactiveFormsModule, ToggleSwitch],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, PreselectionDoc, DisabledDoc, InvalidDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc]
})
export class InputSwitchDocModule {}
