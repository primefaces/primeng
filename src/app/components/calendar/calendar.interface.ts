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
    }): TemplateRef<{ $implicit: Date }> | null;
    /**
     * Custom decade template
     * @param {Object} context - date value instance.
     */
    decade(context: {
        /**
         * An array containing the start and and year of a decade to display at header of the year picker.
         */
        $implicit: Date;
    }): TemplateRef<{ $implicit: Date }> | null;
    /**
     * Custom disabled date template.
     */
    disabledDate: TemplateRef<any> | null;
    /**
     * Custom header template.
     */
    header: TemplateRef<any> | null;
    /**
     * Custom previous icon template.
     */
    previousicon: TemplateRef<any> | null;
    /**
     * Custom next icon template.
     */
    nexticon: TemplateRef<any> | null;
    /**
     * Custom dropdown trigger icon template.
     */
    triggericon: TemplateRef<any> | null;
    /**
     * Custom clear icon template.
     */
    clearicon: TemplateRef<any> | null;
    /**
     * Custom decrement icon template.
     */
    decrementicon: TemplateRef<any> | null;
    /**
     * Custom increment icon template.
     */
    incrementicon: TemplateRef<any> | null;
    /**
     * Custom footer template.
     */
    footer: TemplateRef<any> | null;
}
/**
 * Locale settings options.
 */
export interface LocaleSettings {
    firstDayOfWeek?: number;
    dayNames?: string[];
    dayNamesShort?: string[];
    dayNamesMin?: string[];
    monthNames?: string[];
    monthNamesShort?: string[];
    today?: string;
    clear?: string;
    dateFormat?: string;
    weekHeader?: string;
}

export interface Month {
    month?: number;
    year?: number;
    dates?: Array<Date>;
    weekNumbers?: number[];
}
/**
 * Custom Calendar responsive options metadata.
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

export type CalendarTypeView = 'date' | 'month' | 'year';

export type NavigationState = { backward?: boolean; button?: boolean };

/**
 * Custom Calendar year change event.
 * @see {@link Calendar.onYearChange}
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
