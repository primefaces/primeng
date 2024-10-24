import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primengrtl/button';
import { DividerModule } from 'primengrtl/divider';
import { DropdownModule } from 'primengrtl/dropdown';
import { PaginatorModule } from 'primengrtl/paginator';
import { SliderModule } from 'primengrtl/slider';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { ImagesDoc } from './imagesdoc';
import { ImportDoc } from './importdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { LocaleDoc } from './localedoc';
import { CurrentPageReportDoc } from './currentpagereportdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, PaginatorModule, ButtonModule, DividerModule, SliderModule, RouterModule, DropdownModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, TemplateDoc, ImagesDoc, StyleDoc, AccessibilityDoc, LocaleDoc, CurrentPageReportDoc]
})
export class PaginatorDocModule {}
