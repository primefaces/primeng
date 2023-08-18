import { TemplateRef } from '@angular/core';
import { Calendar } from './calendar';

/**
 * Defines valid templates in Calendar.
 * @group Templates
 */
export interface CalendarTemplates {
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
 * Custom Calendar responsive options metadata.
 * @group Interface
 */
export interface CalendarResponsiveOptions {
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
 * Custom type for the calendar views.
 * @group Types
 */
export type CalendarTypeView = 'date' | 'month' | 'year';
/**
 * Custom type for the calendar navigation state.
 * @group Types
 */
export type NavigationState = { backward?: boolean; button?: boolean };

/**
 * Custom Calendar year change event.
 * @see {@link Calendar.onYearChange}
 * @group Events
 */
export interface CalendarYearChangeEvent {
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
 * Custom Calendar month change event.
 * @see {@link Calendar.onMonthChange}
 * @group Events
 */
export interface CalendarMonthChangeEvent {
    /**
     * New month.
     */
    month?: number;
    /**
     * New year.
     */
    year?: number;
}
