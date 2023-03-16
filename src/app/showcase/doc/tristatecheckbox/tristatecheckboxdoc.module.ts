import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';
import { DisabledDoc } from './disableddoc';
import { PropsDoc } from './propsdoc';
import { EventsDoc } from './eventsdoc';
import { StyleDoc } from './styledoc';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, TriStateCheckboxModule, FormsModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, DisabledDoc, PropsDoc, EventsDoc, StyleDoc]
})
export class TristatecheckboxDocModule {}
