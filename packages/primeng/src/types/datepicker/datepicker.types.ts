import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { ButtonPassThrough } from 'primeng/types/button';
import type { InputTextPassThrough } from 'primeng/types/inputtext';
import type { DatePicker } from '../../datepicker/datepicker';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 * @see {@link DatePickerProps.pt}
 * @group Interface
 */
export interface DatePickerPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the InputText component.
     * @see {@link InputTextPassThrough}
     */
    pcInputText?: InputTextPassThrough;
    /**
     * Used to pass attributes to the dropdown button's DOM element.
     */
    dropdown?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the dropdown icon's DOM element.
     */
    dropdownIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the input icon container's DOM element.
     */
    inputIconContainer?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the input icon's DOM element.
     */
    inputIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the panel's DOM element.
     */
    panel?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the calendar container's DOM element.
     */
    calendarContainer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the calendar's DOM element.
     */
    calendar?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the header's DOM element.
     */
    header?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the previous button component.
     * @see {@link ButtonPassThrough}
     */
    pcPrevButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the title's DOM element.
     */
    title?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the select month's DOM element.
     */
    selectMonth?: PassThroughOption<HTMLSelectElement, I>;
    /**
     * Used to pass attributes to the select year's DOM element.
     */
    selectYear?: PassThroughOption<HTMLSelectElement, I>;
    /**
     * Used to pass attributes to the decade's DOM element.
     */
    decade?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the next button component.
     * @see {@link ButtonPassThrough}
     */
    pcNextButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the day view's DOM element.
     */
    dayView?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the table's DOM element.
     */
    table?: PassThroughOption<HTMLTableElement, I>;
    /**
     * Used to pass attributes to the table header's DOM element.
     */
    tableHeader?: PassThroughOption<HTMLTableSectionElement, I>;
    /**
     * Used to pass attributes to the table header row's DOM element.
     */
    tableHeaderRow?: PassThroughOption<HTMLTableRowElement, I>;
    /**
     * Used to pass attributes to the week header's DOM element.
     */
    weekHeader?: PassThroughOption<HTMLTableCellElement, I>;
    /**
     * Used to pass attributes to the week header label's DOM element.
     */
    weekHeaderLabel?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the table header cell's DOM element.
     */
    tableHeaderCell?: PassThroughOption<HTMLTableCellElement, I>;
    /**
     * Used to pass attributes to the week day cell's DOM element.
     */
    weekDayCell?: PassThroughOption<HTMLTableCellElement, I>;
    /**
     * Used to pass attributes to the week day's DOM element.
     */
    weekDay?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the table body's DOM element.
     */
    tableBody?: PassThroughOption<HTMLTableSectionElement, I>;
    /**
     * Used to pass attributes to the table body row's DOM element.
     */
    tableBodyRow?: PassThroughOption<HTMLTableRowElement, I>;
    /**
     * Used to pass attributes to the week number's DOM element.
     */
    weekNumber?: PassThroughOption<HTMLTableCellElement, I>;
    /**
     * Used to pass attributes to the week label container's DOM element.
     */
    weekLabelContainer?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the day cell's DOM element.
     */
    dayCell?: PassThroughOption<HTMLTableCellElement, I>;
    /**
     * Used to pass attributes to the day's DOM element.
     */
    day?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the month view's DOM element.
     */
    monthView?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the month's DOM element.
     */
    month?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the year view's DOM element.
     */
    yearView?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the year's DOM element.
     */
    year?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the time picker's DOM element.
     */
    timePicker?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the hour picker's DOM element.
     */
    hourPicker?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the hour's DOM element.
     */
    hour?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the separator container's DOM element.
     */
    separatorContainer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the separator's DOM element.
     */
    separator?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the minute picker's DOM element.
     */
    minutePicker?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the minute's DOM element.
     */
    minute?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the second picker's DOM element.
     */
    secondPicker?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the second's DOM element.
     */
    second?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the ampm picker's DOM element.
     */
    ampmPicker?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the ampm's DOM element.
     */
    ampm?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the buttonbar's DOM element.
     */
    buttonbar?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the increment button component.
     * @see {@link ButtonPassThrough}
     */
    pcIncrementButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the decrement button component.
     * @see {@link ButtonPassThrough}
     */
    pcDecrementButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the today button component.
     * @see {@link ButtonPassThrough}
     */
    pcTodayButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the clear button component.
     * @see {@link ButtonPassThrough}
     */
    pcClearButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the hidden selected day's DOM element.
     */
    hiddenSelectedDay?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the hidden month's DOM element.
     */
    hiddenMonth?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the hidden year's DOM element.
     */
    hiddenYear?: PassThroughOption<HTMLSpanElement, I>;
}

/**
 * Defines valid pass-through options in DatePicker.
 * @see {@link DatePickerPassThroughOptions}
 * @template I Type of instance.
 */
export type DatePickerPassThrough<I = unknown> = PassThrough<I, DatePickerPassThroughOptions<I>>;

/**
 * Defines valid templates in DatePicker.
 * @group Templates
 */
export interface DatePickerTemplates {
    /**
     * Custom header template.
     */
    header(): TemplateRef<any>;
    /**
     * Custom date template.
     * @param {Object} context - date data.
     */
    date(context: {
        /**
         * Date value.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
    /**
     * Custom decade template.
     * @param {Object} context - decade data.
     */
    decade(context: {
        /**
         * Years array.
         */
        $implicit: string[];
    }): TemplateRef<{ $implicit: string[] }>;
    /**
     * Custom footer template.
     */
    footer(): TemplateRef<any>;
    /**
     * Custom input icon template.
     */
    inputicon(): TemplateRef<any>;
    /**
     * Custom dropdown icon template.
     */
    dropdownicon(): TemplateRef<any>;
    /**
     * Custom previous icon template.
     */
    previcon(): TemplateRef<any>;
    /**
     * Custom next icon template.
     */
    nexticon(): TemplateRef<any>;
    /**
     * Custom increment icon template.
     */
    incrementicon(): TemplateRef<any>;
    /**
     * Custom decrement icon template.
     */
    decrementicon(): TemplateRef<any>;
}
