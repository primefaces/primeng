import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { CalendarModule } from 'primeng/calendar';
import { ImportDoc } from './importdoc';
import { BasicDoc } from './basicdoc';
import { FormatDoc } from './formatdoc';
import { LocaleDoc } from './localedoc';
import { IconDoc } from './icondoc';
import { MinMaxDoc } from './minmaxdox';
import { MultipleDoc } from './multipledoc';
import { RangeDoc } from './rangedoc';
import { ButtonBarDoc } from './buttonbardoc';
import { TimeDoc } from './timedoc';
import { MonthDoc } from './monthdoc';
import { YearDoc } from './yeardoc';
import { MultipleMonthDoc } from './multiplemonths.doc';
import { TemplateDoc } from './templatedoc';
import { InlineDoc } from './inlinedoc';
import { TouchUIDoc } from './touchuidoc';
import { DateTemplateDoc } from './datetemplatedoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { EventsDoc } from './eventsdoc';
import { MethodsDoc } from './methodsdoc';
import { AccessibilityDoc } from './accessibilitydoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, FormsModule, CalendarModule, ReactiveFormsModule],
    exports: [AppDocModule],
    declarations: [
        ImportDoc,
        BasicDoc,
        FormatDoc,
        LocaleDoc,
        IconDoc,
        MinMaxDoc,
        MultipleDoc,
        RangeDoc,
        ButtonBarDoc,
        TimeDoc,
        MonthDoc,
        YearDoc,
        MultipleMonthDoc,
        TemplateDoc,
        InlineDoc,
        TouchUIDoc,
        DateTemplateDoc,
        PropsDoc,
        StyleDoc,
        EventsDoc,
        MethodsDoc,
        TemplatesDoc,
        AccessibilityDoc,
        ReactiveFormsDoc
    ]
})
export class CalendarDocModule {}
