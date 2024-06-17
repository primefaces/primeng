import { Component } from '@angular/core';
import { IconDoc } from '@doc/calendar/icondoc';
import { BasicDoc } from '@doc/calendar/basicdoc';
import { FormatDoc } from '@doc/calendar/formatdoc';
import { ImportDoc } from '@doc/calendar/importdoc';
import { LocaleDoc } from '@doc/calendar/localedoc';
import { MinMaxDoc } from '@doc/calendar/minmaxdox';
import { MultipleDoc } from '@doc/calendar/multipledoc';
import { RangeDoc } from '@doc/calendar/rangedoc';
import { ButtonBarDoc } from '@doc/calendar/buttonbardoc';
import { TimeDoc } from '@doc/calendar/timedoc';
import { MonthDoc } from '@doc/calendar/monthdoc';
import { YearDoc } from '@doc/calendar/yeardoc';
import { MultipleMonthDoc } from '@doc/calendar/multiplemonths.doc';
import { InlineDoc } from '@doc/calendar/inlinedoc';
import { TouchUIDoc } from '@doc/calendar/touchuidoc';
import { DateTemplateDoc } from '@doc/calendar/datetemplatedoc';
import { StyleDoc } from '@doc/calendar/styledoc';
import { AccessibilityDoc } from '@doc/calendar/accessibilitydoc';
import { ReactiveFormsDoc } from '@doc/calendar/reactiveformsdoc';
import { FloatLabelDoc } from '@doc/calendar/floatlabeldoc';
import { InvalidDoc } from '@doc/calendar/invaliddoc';
import { DisabledDoc } from '@doc/calendar/disableddoc';
import { FilledDoc } from '@doc/calendar/filleddoc';
@Component({
    templateUrl: './calendardemo.html'
})
export class CalendarDemo {
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
            label: 'ButtonBar',
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
            id: 'touchui',
            label: 'TouchUI',
            component: TouchUIDoc
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
            id: 'style',
            label: 'Style',
            component: StyleDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
