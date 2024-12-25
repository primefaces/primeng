import { TemplateRef } from '@angular/core';
import { DatePicker } from './datepicker';

/**
 * Defines valid templates in DatePicker.
 * @group Templates
 */
export interface DatePickerTemplates {
    /**
     * Custom header template.
     * @param {Object} context - date value instance.
     */
    date(context: {
        /**
         * Date value of the component.
         */
        $implicit: Date;
    }): TemplateRef<{ $implicit: Date }>;
    /**
     * Custom decade template
     * @param {Object} context - date value instance.
     */
    decade(context: {
        /**
         * An array containing the start and and year of a decade to display at header of the year picker.
         */
        $implicit: Date;
    }): TemplateRef<{ $implicit: Date }>;
    /**
     * Custom disabled date template.
     */
    disabledDate(): TemplateRef<any>;
    /**
     * Custom header template.
     */
    header(): TemplateRef<any>;
    /**
     * Custom input icon template.
     * @param {Object} context - input icon template params.
     */
    inputIconTemplate(context: {
        /**
         * Click callback
         */
        clickCallBack: () => void;
    }): TemplateRef<{ clickCallBack: Function }>;
    /**
     * Custom previous icon template.
     */
    previousicon(): TemplateRef<any>;
    /**
     * Custom next icon template.
     */
    nexticon(): TemplateRef<any>;
    /**
     * Custom dropdown trigger icon template.
     */
    triggericon(): TemplateRef<any>;
    /**
     * Custom clear icon template.
     */
    clearicon(): TemplateRef<any>;
    /**
     * Custom decrement icon template.
     */
    decrementicon(): TemplateRef<any>;
    /**
     * Custom increment icon template.
     */
    incrementicon(): TemplateRef<any>;
    /**
     * Custom footer template.
     */
    footer(): TemplateRef<any>;
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
