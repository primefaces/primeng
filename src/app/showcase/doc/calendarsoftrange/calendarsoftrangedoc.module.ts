import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { BasicDoc } from './basicdoc';
import {AppCodeModule} from "@layout/doc/app.code.component";
import {CalendarSoftRangeModule} from "primeng/calendarsoftrange";
import {ImportDoc} from "@doc/calendarsoftrange/importdoc";
import {FormsModule} from "@angular/forms";
@NgModule({
    imports: [CommonModule, RouterModule, AppDocModule, AppCodeModule, CalendarSoftRangeModule, FormsModule],
    declarations: [BasicDoc, ImportDoc],
    exports: [AppDocModule]
})
export class CalendarSoftRangeDocModule {}
