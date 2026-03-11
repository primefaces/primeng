import { AccessibilityDoc } from '@/doc/datepicker/accessibility-doc';
import { BasicDoc } from '@/doc/datepicker/basic-doc';
import { ButtonBarDoc } from '@/doc/datepicker/buttonbar-doc';
import { DateTemplateDoc } from '@/doc/datepicker/datetemplate-doc';
import { DisabledDoc } from '@/doc/datepicker/disabled-doc';
import { FilledDoc } from '@/doc/datepicker/filled-doc';
import { FloatLabelDoc } from '@/doc/datepicker/floatlabel-doc';
import { FormatDoc } from '@/doc/datepicker/format-doc';
import { IconDoc } from '@/doc/datepicker/icon-doc';
import { IftaLabelDoc } from '@/doc/datepicker/iftalabel-doc';
import { ImportDoc } from '@/doc/datepicker/import-doc';
import { InlineDoc } from '@/doc/datepicker/inline-doc';
import { InvalidDoc } from '@/doc/datepicker/invalid-doc';
import { LocaleDoc } from '@/doc/datepicker/locale-doc';
import { MaskDoc } from '@/doc/datepicker/mask-doc';
import { MinMaxDoc } from '@/doc/datepicker/minmax-doc';
import { MonthDoc } from '@/doc/datepicker/month-doc';
import { MultipleDoc } from '@/doc/datepicker/multiple-doc';
import { MultipleMonthDoc } from '@/doc/datepicker/multiplemonths-doc';
import { RangeDoc } from '@/doc/datepicker/range-doc';
import { ReactiveFormsDoc } from '@/doc/datepicker/reactiveforms-doc';
import { SizesDoc } from '@/doc/datepicker/sizes-doc';
import { TemplateDrivenFormsDoc } from '@/doc/datepicker/templatedrivenforms-doc';
import { TimeDoc } from '@/doc/datepicker/time-doc';
import { YearDoc } from '@/doc/datepicker/year-doc';
import { FluidDoc } from '@/doc/datepicker/fluid-doc';
import { ClearIconDoc } from '@/doc/datepicker/clearicon-doc';
import { PTComponent } from '@/doc/datepicker/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular DatePicker Component" header="DatePicker" description="DatePicker is an input component to select a date." [docs]="docs" [apiDocs]="['DatePicker']" [ptDocs]="ptComponent" themeDocs="datepicker"></app-doc> `
})
export class DatePickerDemo {
    ptComponent = PTComponent;

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
            id: 'format',
            label: 'Format',
            component: FormatDoc
        },
        {
            id: 'mask',
            label: 'Mask',
            component: MaskDoc
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
            id: 'clearicon',
            label: 'Clear Icon',
            component: ClearIconDoc
        },
        {
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc
        },
        {
            id: 'fluid',
            label: 'Fluid',
            component: FluidDoc
        },
        {
            id: 'filled',
            label: 'Filled',
            component: FilledDoc
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
        },
        {
            id: 'invalid',
            label: 'Invalid',
            component: InvalidDoc
        },
        {
            id: 'forms',
            label: 'Forms',
            children: [
                { id: 'templatedriven', label: 'Template Driven', component: TemplateDrivenFormsDoc },
                { id: 'reactive', label: 'Reactive Forms', component: ReactiveFormsDoc }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
