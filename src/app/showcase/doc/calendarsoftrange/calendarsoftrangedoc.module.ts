import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { BasicDoc } from './basicdoc';
import {AppCodeModule} from "@layout/doc/app.code.component";
import {CalendarSoftRangeModule} from "primeng/calendarsoftrange";
import {ImportDoc} from "@doc/calendarsoftrange/importdoc";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ReactiveFormsDoc} from "@doc/calendarsoftrange/reactiveformsdoc";
import {FilledDoc} from "@doc/calendarsoftrange/filleddoc";
import {DisabledDoc} from "@doc/calendarsoftrange/disableddoc";
@NgModule({
    imports: [CommonModule, RouterModule, AppDocModule, AppCodeModule, CalendarSoftRangeModule, FormsModule, ReactiveFormsModule],
    declarations: [BasicDoc, ImportDoc, ReactiveFormsDoc, FilledDoc, DisabledDoc],
    exports: [AppDocModule]
})
export class CalendarSoftRangeDocModule {}
