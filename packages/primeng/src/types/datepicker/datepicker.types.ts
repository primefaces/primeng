import { TemplateRef } from '@angular/core';
import type { MotionOptions } from '@primeuix/motion';
import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { ButtonPassThrough } from 'primeng/types/button';
import type { InputTextPassThrough } from 'primeng/types/inputtext';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 * @see {@link DatePicker.pt}
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
    /**
     * Used to pass options to the motion component/directive.
     */
    motion?: MotionOptions;
}

/**
 * Defines valid pass-through options in DatePicker.
 * @see {@link DatePickerPassThroughOptions}
 * @template I Type of instance.
 */
export type DatePickerPassThrough<I = unknown> = PassThrough<I, DatePickerPassThroughOptions<I>>;

/**
 * Represents metadata for a single date cell in the DatePicker.
 * @group Interface
 */
export interface DatePickerDateMeta {
    /**
     * Day of the month (1-31).
     */
    day: number;
    /**
     * Month (0-11).
     */
    month: number;
    /**
     * Year.
     */
    year: number;
    /**
     * Whether this date belongs to a different month than the displayed month.
     */
    otherMonth?: boolean;
    /**
     * Whether this date is today.
     */
    today?: boolean;
    /**
     * Whether this date is selectable.
     */
    selectable?: boolean;
}

/**
 * Custom date template context.
 * @group Interface
 */
export interface DatePickerDateTemplateContext {
    /**
     * Date metadata object.
     */
    $implicit: DatePickerDateMeta;
}

/**
 * Custom disabled date template context.
 * @group Interface
 */
export interface DatePickerDisabledDateTemplateContext {
    /**
     * Disabled date metadata object.
     */
    $implicit: DatePickerDateMeta;
}

/**
 * Custom decade template context.
 * @group Interface
 */
export interface DatePickerDecadeTemplateContext {
    /**
     * Function that returns an array of years for the decade.
     */
    $implicit: () => number[];
}

/**
 * Custom input icon template context.
 * @group Interface
 */
export interface DatePickerInputIconTemplateContext {
    /**
     * Click callback function to open the DatePicker.
     */
    clickCallBack: (event: Event) => void;
}

/**
 * Custom button bar template context.
 * @group Interface
 */
export interface DatePickerButtonBarTemplateContext {
    /**
     * Today button click callback.
     */
    todayCallback: (event: Event) => void;
    /**
     * Clear button click callback.
     */
    clearCallback: (event: Event) => void;
}

/**
 * Defines valid templates in DatePicker.
 * @group Templates
 */
export interface DatePickerTemplates {
    /**
     * Custom date template.
     * @param {Object} context - date metadata.
     */
    date(context: DatePickerDateTemplateContext): TemplateRef<DatePickerDateTemplateContext>;
    /**
     * Custom decade template.
     * @param {Object} context - decade years function.
     */
    decade(context: DatePickerDecadeTemplateContext): TemplateRef<DatePickerDecadeTemplateContext>;
    /**
     * Custom disabled date template.
     * @param {Object} context - disabled date metadata.
     */
    disabledDate(context: DatePickerDisabledDateTemplateContext): TemplateRef<DatePickerDisabledDateTemplateContext>;
    /**
     * Custom header template.
     */
    header(): TemplateRef<void>;
    /**
     * Custom input icon template.
     * @param {Object} context - input icon template params.
     */
    inputicon(context: DatePickerInputIconTemplateContext): TemplateRef<DatePickerInputIconTemplateContext>;
    /**
     * Custom previous icon template.
     */
    previousicon(): TemplateRef<void>;
    /**
     * Custom next icon template.
     */
    nexticon(): TemplateRef<void>;
    /**
     * Custom dropdown trigger icon template.
     */
    triggericon(): TemplateRef<void>;
    /**
     * Custom clear icon template.
     */
    clearicon(): TemplateRef<void>;
    /**
     * Custom decrement icon template.
     */
    decrementicon(): TemplateRef<void>;
    /**
     * Custom increment icon template.
     */
    incrementicon(): TemplateRef<void>;
    /**
     * Custom footer template.
     */
    footer(): TemplateRef<void>;
    /**
     * Custom button bar template.
     * @param {Object} context - button bar template params.
     */
    buttonbar(context: DatePickerButtonBarTemplateContext): TemplateRef<DatePickerButtonBarTemplateContext>;
}
/**
 * Locale settings options.
 * @group Interface
 */
export interface LocaleSettings {
    /**
     * Day value.
     */
    firstDayOfWeek?: number;
    /**
     * Day names.
     */
    dayNames?: string[];
    /**
     * Shortened day names.
     */
    dayNamesShort?: string[];
    /**
     * Minimum days names.
     */
    dayNamesMin?: string[];
    /**
     * Month names.
     */
    monthNames?: string[];
    /**
     * Shortened month names.
     */
    monthNamesShort?: string[];
    /**
     * Value of today date string.
     */
    today?: string;
    /**
     * Clear.
     */
    clear?: string;
    /**
     * Date format.
     */
    dateFormat?: string;
    /**
     * Week header.
     */
    weekHeader?: string;
}
/**
 * Month interface.
 * @group Interface
 */
export interface Month {
    /**
     * Mont value.
     */
    month?: number;
    /**
     * Year value.
     */
    year?: number;
    /**
     * Array of dates.
     */
    dates?: Date[];
    /**
     * Array of week numbers.
     */
    weekNumbers?: number[];
}
/**
 * Custom DatePicker responsive options metadata.
 * @group Interface
 */
export interface DatePickerResponsiveOptions {
    /**
     * Breakpoint for responsive mode. Exp; @media screen and (max-width: ${breakpoint}) {...}
     */
    breakpoint?: string;
    /**
     * The number of visible months on breakpoint.
     */
    numMonths?: number;
}
/**
 * Custom type for the DatePicker views.
 * @group Types
 */
export type DatePickerTypeView = 'date' | 'month' | 'year';
/**
 * Custom type for the DatePicker navigation state.
 * @group Types
 */
export type NavigationState = { backward?: boolean; button?: boolean };

/**
 * Custom DatePicker year change event.
 * @see {@link DatePicker.onYearChange}
 * @group Events
 */
export interface DatePickerYearChangeEvent {
    /**
     * New month.
     */
    month?: number;
    /**
     * New year.
     */
    year?: number;
}
/**
 * Custom DatePicker month change event.
 * @see {@link DatePicker.onMonthChange}
 * @group Events
 */
export interface DatePickerMonthChangeEvent {
    /**
     * New month.
     */
    month?: number;
    /**
     * New year.
     */
    year?: number;
}
