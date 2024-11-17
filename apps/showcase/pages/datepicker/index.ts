import { AccessibilityDoc } from '@/doc/datepicker/accessibilitydoc';
import { BasicDoc } from '@/doc/datepicker/basicdoc';
import { ButtonBarDoc } from '@/doc/datepicker/buttonbardoc';
import { DatePickerDocModule } from '@/doc/datepicker/datepickerdoc.module';
import { DateTemplateDoc } from '@/doc/datepicker/datetemplatedoc';
import { DisabledDoc } from '@/doc/datepicker/disableddoc';
import { FilledDoc } from '@/doc/datepicker/filleddoc';
import { FloatLabelDoc } from '@/doc/datepicker/floatlabeldoc';
import { FormatDoc } from '@/doc/datepicker/formatdoc';
import { IconDoc } from '@/doc/datepicker/icondoc';
import { IftaLabelDoc } from '@/doc/datepicker/iftalabeldoc';
import { ImportDoc } from '@/doc/datepicker/importdoc';
import { InlineDoc } from '@/doc/datepicker/inlinedoc';
import { InvalidDoc } from '@/doc/datepicker/invaliddoc';
import { LocaleDoc } from '@/doc/datepicker/localedoc';
import { MinMaxDoc } from '@/doc/datepicker/minmaxdox';
import { MonthDoc } from '@/doc/datepicker/monthdoc';
import { MultipleDoc } from '@/doc/datepicker/multipledoc';
import { MultipleMonthDoc } from '@/doc/datepicker/multiplemonths.doc';
import { RangeDoc } from '@/doc/datepicker/rangedoc';
import { ReactiveFormsDoc } from '@/doc/datepicker/reactiveformsdoc';
import { SizesDoc } from '@/doc/datepicker/sizesdoc';
import { TimeDoc } from '@/doc/datepicker/timedoc';
import { YearDoc } from '@/doc/datepicker/yeardoc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [DatePickerDocModule],
    template: ` <app-doc docTitle="Angular DatePicker Component" header="DatePicker" description="DatePicker is an input component to select a date." [docs]="docs" [apiDocs]="['DatePicker']" themeDocs="datepicker"></app-doc> `
})
export class DatePickerDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc
        },
        {
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc
        },
        {
            id: 'format',
            label: 'Format',
            component: FormatDoc
        },
        {
            id: 'locale',
            label: 'Locale',
            component: LocaleDoc
        },
        {
            id: 'icon',
            label: 'Icon',
            component: IconDoc
        },
        {
            id: 'minmax',
            label: 'Min / Max',
            component: MinMaxDoc
        },
        {
            id: 'multiple',
            label: 'Multiple',
            component: MultipleDoc
        },
        {
            id: 'range',
            label: 'Range',
            component: RangeDoc
        },
        {
            id: 'buttonbar',
            label: 'Button Bar',
            component: ButtonBarDoc
        },
        {
            id: 'time',
            label: 'Time',
            component: TimeDoc
        },
        {
            id: 'monthpicker',
            label: 'Month Picker',
            component: MonthDoc
        },
        {
            id: 'yearpicker',
            label: 'Year Picker',
            component: YearDoc
        },
        {
            id: 'multiplemonths',
            label: 'Multiple Months',
            component: MultipleMonthDoc
        },
        {
            id: 'datetemplate',
            label: 'Date Template',
            component: DateTemplateDoc
        },
        {
            id: 'inline',
            label: 'Inline',
            component: InlineDoc
        },
        {
            id: 'floatlabel',
            label: 'Float Label',
            component: FloatLabelDoc
        },
        {
            id: 'iftalabel',
            label: 'Ifta Label',
            component: IftaLabelDoc
        },
        {
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc
        },
        {
            id: 'filled',
            label: 'Filled',
            component: FilledDoc
        },
        {
            id: 'invalid',
            label: 'Invalid',
            component: InvalidDoc
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
