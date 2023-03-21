import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';
import { DisabledDoc } from './disableddoc';
import { PreselectionDoc } from './preselectiondoc';
import { PropsDoc } from './propsdoc';
import { EventsDoc } from './eventsdoc';
import { StyleDoc } from './styledoc';
import { AccessibilityDoc } from './accessibilitydoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, FormsModule, InputSwitchModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, PreselectionDoc, DisabledDoc, PropsDoc, EventsDoc, StyleDoc, AccessibilityDoc]
})
export class InputSwitchDocModule {}
