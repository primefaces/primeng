import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/datepicker';
import { BaseStyle } from 'primeng/base';

const theme = /*css*/ `
    ${style}

    /* For PrimeNG */
    .p-datepicker.ng-invalid.ng-dirty .p-inputtext {
        border-color: dt('inputtext.invalid.border.color');
    }
`;

const inlineStyles = {
    root: () => ({ position: 'relative' })
};

const classes = {
    root: ({ instance }) => [
        'p-datepicker p-component p-inputwrapper',
        {
            'p-invalid': instance.invalid(),
            'p-datepicker-fluid': instance.hasFluid,
            'p-inputwrapper-filled': instance.$filled(),
            'p-variant-filled': instance.$variant() === 'filled',
            'p-inputwrapper-focus': instance.focus || instance.overlayVisible,
            'p-focus': instance.focus || instance.overlayVisible
        }
    ],
    pcInputText: 'p-datepicker-input',
    dropdown: 'p-datepicker-dropdown',
    inputIconContainer: 'p-datepicker-input-icon-container',
    inputIcon: 'p-datepicker-input-icon',
    panel: ({ instance }) => [
        'p-datepicker-panel p-component',
        {
            'p-datepicker-panel p-component': true,
            'p-datepicker-panel-inline': instance.inline,
            'p-disabled': instance.$disabled(),
            'p-datepicker-timeonly': instance.timeOnly
        }
    ],
    calendarContainer: 'p-datepicker-calendar-container',
    calendar: 'p-datepicker-calendar',
    header: 'p-datepicker-header',
    pcPrevButton: 'p-datepicker-prev-button',
    title: 'p-datepicker-title',
    selectMonth: 'p-datepicker-select-month',
    selectYear: 'p-datepicker-select-year',
    decade: 'p-datepicker-decade',
    pcNextButton: 'p-datepicker-next-button',
    dayView: 'p-datepicker-day-view',
    weekHeader: 'p-datepicker-weekheader p-disabled',
    weekNumber: 'p-datepicker-weeknumber',
    weekLabelContainer: 'p-datepicker-weeklabel-container p-disabled',
    weekDayCell: 'p-datepicker-weekday-cell',
    weekDay: 'p-datepicker-weekday',
    dayCell: ({ date }) => [
        'p-datepicker-day-cell',
        {
            'p-datepicker-other-month': date.otherMonth,
            'p-datepicker-today': date.today
        }
    ],
    day: ({ instance, date }) => {
        let selectedDayClass = '';

        if (instance.isRangeSelection() && instance.isSelected(date) && date.selectable) {
            const startDate = instance.value[0];
            const endDate = instance.value[1];

            const isStart = startDate && date.year === startDate.getFullYear() && date.month === startDate.getMonth() && date.day === startDate.getDate();
            const isEnd = endDate && date.year === endDate.getFullYear() && date.month === endDate.getMonth() && date.day === endDate.getDate();

            selectedDayClass = isStart || isEnd ? 'p-datepicker-day-selected' : 'p-datepicker-day-selected-range';
        }

        return {
            'p-datepicker-day': true,
            'p-datepicker-day-selected': !instance.isRangeSelection() && instance.isSelected(date) && date.selectable,
            'p-disabled': instance.$disabled() || !date.selectable,
            [selectedDayClass]: true
        };
    },
    monthView: 'p-datepicker-month-view',
    month: ({ instance, index }) => [
        'p-datepicker-month',
        {
            'p-datepicker-month-selected': instance.isMonthSelected(index),
            'p-disabled': instance.isMonthDisabled(index)
        }
    ],
    yearView: 'p-datepicker-year-view',
    year: ({ instance, year }) => [
        'p-datepicker-year',
        {
            'p-datepicker-year-selected': instance.isYearSelected(year),
            'p-disabled': instance.isYearDisabled(year)
        }
    ],
    timePicker: 'p-datepicker-time-picker',
    hourPicker: 'p-datepicker-hour-picker',
    pcIncrementButton: 'p-datepicker-increment-button',
    pcDecrementButton: 'p-datepicker-decrement-button',
    separator: 'p-datepicker-separator',
    minutePicker: 'p-datepicker-minute-picker',
    secondPicker: 'p-datepicker-second-picker',
    ampmPicker: 'p-datepicker-ampm-picker',
    buttonbar: 'p-datepicker-buttonbar',
    pcTodayButton: 'p-datepicker-today-button',
    pcClearButton: 'p-datepicker-clear-button',
    clearIcon: 'p-datepicker-clear-icon'
};

@Injectable()
export class DatePickerStyle extends BaseStyle {
    name = 'datepicker';

    theme = theme;

    classes = classes;

    inlineStyles = inlineStyles;
}

/**
 *
 * DatePicker is a form component to work with dates.
 *
 * [Live Demo](https://www.primeng.org/datepicker/)
 *
 * @module datepickerstyle
 *
 */
export enum DatePickerClasses {
    /**
     * Class name of the root element
     */
    root = 'p-datepicker',
    /**
     * Class name of the input element
     */
    pcInputText = 'p-datepicker-input',
    /**
     * Class name of the dropdown element
     */
    dropdown = 'p-datepicker-dropdown',
    /**
     * Class name of the input icon container element
     */
    inputIconContainer = 'p-datepicker-input-icon-container',
    /**
     * Class name of the input icon element
     */
    inputIcon = 'p-datepicker-input-icon',
    /**
     * Class name of the panel element
     */
    panel = 'p-datepicker-panel',
    /**
     * Class name of the calendar container element
     */
    calendarContainer = 'p-datepicker-calendar-container',
    /**
     * Class name of the calendar element
     */
    calendar = 'p-datepicker-calendar',
    /**
     * Class name of the header element
     */
    header = 'p-datepicker-header',
    /**
     * Class name of the previous button element
     */
    pcPrevButton = 'p-datepicker-prev-button',
    /**
     * Class name of the title element
     */
    title = 'p-datepicker-title',
    /**
     * Class name of the select month element
     */
    selectMonth = 'p-datepicker-select-month',
    /**
     * Class name of the select year element
     */
    selectYear = 'p-datepicker-select-year',
    /**
     * Class name of the decade element
     */
    decade = 'p-datepicker-decade',
    /**
     * Class name of the next button element
     */
    pcNextButton = 'p-datepicker-next-button',
    /**
     * Class name of the day view element
     */
    dayView = 'p-datepicker-day-view',
    /**
     * Class name of the week header element
     */
    weekHeader = 'p-datepicker-weekheader',
    /**
     * Class name of the week number element
     */
    weekNumber = 'p-datepicker-weeknumber',
    /**
     * Class name of the week label container element
     */
    weekLabelContainer = 'p-datepicker-weeklabel-container',
    /**
     * Class name of the week day cell element
     */
    weekDayCell = 'p-datepicker-weekday-cell',
    /**
     * Class name of the week day element
     */
    weekDay = 'p-datepicker-weekday',
    /**
     * Class name of the day cell element
     */
    dayCell = 'p-datepicker-day-cell',
    /**
     * Class name of the day element
     */
    day = 'p-datepicker-day',
    /**
     * Class name of the month view element
     */
    monthView = 'p-datepicker-month-view',
    /**
     * Class name of the month element
     */
    month = 'p-datepicker-month',
    /**
     * Class name of the year view element
     */
    yearView = 'p-datepicker-year-view',
    /**
     * Class name of the year element
     */
    year = 'p-datepicker-year',
    /**
     * Class name of the time picker element
     */
    timePicker = 'p-datepicker-time-picker',
    /**
     * Class name of the hour picker element
     */
    hourPicker = 'p-datepicker-hour-picker',
    /**
     * Class name of the increment button element
     */
    pcIncrementButton = 'p-datepicker-increment-button',
    /**
     * Class name of the decrement button element
     */
    pcDecrementButton = 'p-datepicker-decrement-button',
    /**
     * Class name of the separator element
     */
    separator = 'p-datepicker-separator',
    /**
     * Class name of the minute picker element
     */
    minutePicker = 'p-datepicker-minute-picker',
    /**
     * Class name of the second picker element
     */
    secondPicker = 'p-datepicker-second-picker',
    /**
     * Class name of the ampm picker element
     */
    ampmPicker = 'p-datepicker-ampm-picker',
    /**
     * Class name of the buttonbar element
     */
    buttonbar = 'p-datepicker-buttonbar',
    /**
     * Class name of the today button element
     */
    pcTodayButton = 'p-datepicker-today-button',
    /**
     * Class name of the clear button element
     */
    pcClearButton = 'p-datepicker-clear-button',
    /**
     * Class name of the clear icon
     */
    clearIcon = 'p-datepicker-clear-icon'
}

export interface DatePickerStyle extends BaseStyle {}
