import { NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    effect,
    ElementRef,
    forwardRef,
    inject,
    InjectionToken,
    input,
    NgModule,
    numberAttribute,
    output,
    signal,
    TemplateRef,
    untracked,
    viewChild,
    ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MotionEvent, MotionOptions } from '@primeuix/motion';
import { absolutePosition, addClass, addStyle, appendChild, find, findSingle, getFocusableElements, getIndex, getOuterWidth, hasClass, isDate, isNotEmpty, isTouchDevice, relativePosition, setAttribute, uuid } from '@primeuix/utils';
import { OverlayService, SharedModule, TranslationKeys } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { BaseInput } from 'primeng/baseinput';
import { Bind, BindModule } from 'primeng/bind';
import { Button } from 'primeng/button';
import { blockBodyScroll, ConnectedOverlayScrollHandler, unblockBodyScroll } from 'primeng/dom';
import { CalendarIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, TimesIcon } from 'primeng/icons';
import { InputText } from 'primeng/inputtext';
import { MotionModule } from 'primeng/motion';
import { Ripple } from 'primeng/ripple';
import type { AppendTo, CSSProperties } from 'primeng/types/shared';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import {
    DatePickerButtonBarTemplateContext,
    DatePickerDateTemplateContext,
    DatePickerDecadeTemplateContext,
    DatePickerDisabledDateTemplateContext,
    DatePickerIconDisplay,
    DatePickerInputIconTemplateContext,
    DatePickerMonthChangeEvent,
    DatePickerPassThrough,
    DatePickerResponsiveOptions,
    DatePickerSelectionMode,
    DatePickerViewType,
    DatePickerYearChangeEvent,
    LocaleSettings,
    Month,
    NavigationState
} from 'primeng/types/datepicker';
import { ZIndexUtils } from 'primeng/utils';
import { Subscription } from 'rxjs';
import { DatePickerStyle } from './style/datepickerstyle';

export const DATEPICKER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePicker),
    multi: true
};

const DATEPICKER_INSTANCE = new InjectionToken<DatePicker>('DATEPICKER_INSTANCE');

/**
 * DatePicker is a form component to work with dates.
 * @group Components
 */
@Component({
    selector: 'p-datepicker, p-date-picker',
    standalone: true,
    imports: [NgTemplateOutlet, Button, Ripple, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon, TimesIcon, CalendarIcon, AutoFocus, InputText, SharedModule, BindModule, MotionModule],
    hostDirectives: [Bind],
    template: `
        @if (!inline()) {
            <input
                #inputfield
                pInputText
                data-p-maskable
                [pSize]="size()"
                [attr.size]="inputSize()"
                type="text"
                role="combobox"
                [attr.id]="inputId()"
                [attr.name]="name()"
                [attr.aria-required]="required()"
                aria-autocomplete="none"
                aria-haspopup="dialog"
                [attr.aria-expanded]="overlayVisible()"
                [attr.aria-controls]="ariaControlsAttr()"
                [attr.aria-labelledby]="ariaLabelledBy()"
                [attr.aria-label]="ariaLabel()"
                [value]="inputFieldValue()"
                (focus)="onInputFocus($event)"
                (keydown)="onInputKeydown($event)"
                (click)="onInputClick()"
                (blur)="onInputBlur($event)"
                [attr.required]="requiredAttr()"
                [attr.readonly]="readonlyAttr()"
                [attr.disabled]="disabledAttr()"
                (input)="onUserInput($event)"
                [style]="inputStyle()"
                [class]="cn(cx('pcInputText'), inputStyleClass())"
                [attr.placeholder]="placeholder()"
                [attr.tabindex]="tabindex()"
                [attr.inputmode]="inputModeAttr()"
                autocomplete="off"
                [pAutoFocus]="autofocus()"
                [variant]="$variant()"
                [fluid]="hasFluid"
                [invalid]="invalid()"
                [pt]="ptm('pcInputText')"
                [unstyled]="unstyled()"
            />
            @if (showClearIcon()) {
                @if (!clearIconTemplate()) {
                    <svg data-p-icon="times" [class]="cx('clearIcon')" [pBind]="ptm('inputIcon')" (click)="clear()" />
                } @else {
                    <span [class]="cx('clearIcon')" [pBind]="ptm('inputIcon')" (click)="clear()">
                        <ng-template *ngTemplateOutlet="clearIconTemplate()"></ng-template>
                    </span>
                }
            }
            @if (showIconButton()) {
                <button
                    type="button"
                    [attr.aria-label]="iconButtonAriaLabel"
                    aria-haspopup="dialog"
                    [attr.aria-expanded]="overlayVisible()"
                    [attr.aria-controls]="ariaControlsAttr()"
                    (click)="onButtonClick($event, inputfield)"
                    [class]="cx('dropdown')"
                    [disabled]="$disabled()"
                    tabindex="0"
                    [pBind]="ptm('dropdown')"
                >
                    @if (icon()) {
                        <span [class]="icon()" [pBind]="ptm('dropdownIcon')"></span>
                    } @else {
                        @if (!triggerIconTemplate()) {
                            <svg data-p-icon="calendar" [pBind]="ptm('dropdownIcon')" />
                        }
                        <ng-template *ngTemplateOutlet="triggerIconTemplate()"></ng-template>
                    }
                </button>
            }
            @if (showInputIcon()) {
                <span [class]="cx('inputIconContainer')" [pBind]="ptm('inputIconContainer')" [attr.data-p]="inputIconDataP">
                    @if (!inputIconTemplate()) {
                        <svg data-p-icon="calendar" (click)="onButtonClick($event)" [class]="cx('inputIcon')" [pBind]="ptm('inputIcon')" />
                    }
                    <ng-container *ngTemplateOutlet="inputIconTemplate(); context: { clickCallBack: onButtonClick.bind(this) }"></ng-container>
                </span>
            }
        }
        <p-motion [visible]="isOverlayVisible()" name="p-anchored-overlay" [appear]="!inline()" [options]="computedMotionOptions()" (onBeforeEnter)="onOverlayBeforeEnter($event)" (onAfterLeave)="onOverlayAfterLeave($event)">
            <div
                #contentWrapper
                [attr.id]="panelId"
                [style]="panelStyle()"
                [class]="cn(cx('panel'), panelStyleClass())"
                [attr.aria-label]="translate('chooseDate')"
                [attr.role]="roleAttr()"
                [attr.aria-modal]="ariaModalAttr()"
                (click)="onOverlayClick($event)"
                [pBind]="ptm('panel')"
            >
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate()"></ng-container>
                @if (!timeOnly()) {
                    <div [class]="cx('calendarContainer')" [pBind]="ptm('calendarContainer')">
                        @for (month of months(); track $index; let i = $index) {
                            <div [class]="cx('calendar')" [pBind]="ptm('calendar')">
                                <div [class]="cx('header')" [pBind]="ptm('header')">
                                    <p-button
                                        rounded
                                        variant="text"
                                        severity="secondary"
                                        (keydown)="onContainerButtonKeydown($event)"
                                        [styleClass]="cx('pcPrevButton')"
                                        (onClick)="onPrevButtonClick($event)"
                                        [style]="getPrevButtonStyle(i)"
                                        type="button"
                                        [ariaLabel]="prevIconAriaLabel"
                                        [pt]="ptm('pcPrevButton')"
                                        [attr.data-pc-group-section]="'navigator'"
                                    >
                                        <ng-template #icon>
                                            @if (!previousIconTemplate()) {
                                                <svg data-p-icon="chevron-left" />
                                            } @else {
                                                <span>
                                                    <ng-template *ngTemplateOutlet="previousIconTemplate()"></ng-template>
                                                </span>
                                            }
                                        </ng-template>
                                    </p-button>
                                    <div [class]="cx('title')" [pBind]="ptm('title')">
                                        @if (currentView() === 'date') {
                                            <button
                                                type="button"
                                                (click)="switchToMonthView($event)"
                                                (keydown)="onContainerButtonKeydown($event)"
                                                [class]="cx('selectMonth')"
                                                [attr.disabled]="switchViewButtonDisabledAttr()"
                                                [attr.aria-label]="this.translate('chooseMonth')"
                                                pRipple
                                                [pBind]="ptm('selectMonth')"
                                                [attr.data-pc-group-section]="'navigator'"
                                            >
                                                {{ getMonthName(month.month) }}
                                            </button>
                                        }
                                        @if (currentView() !== 'year') {
                                            <button
                                                type="button"
                                                (click)="switchToYearView($event)"
                                                (keydown)="onContainerButtonKeydown($event)"
                                                [class]="cx('selectYear')"
                                                [attr.disabled]="switchViewButtonDisabledAttr()"
                                                [attr.aria-label]="translate('chooseYear')"
                                                pRipple
                                                [pBind]="ptm('selectYear')"
                                                [attr.data-pc-group-section]="'navigator'"
                                            >
                                                {{ getYear(month) }}
                                            </button>
                                        }
                                        @if (currentView() === 'year') {
                                            <span [class]="cx('decade')" [pBind]="ptm('decade')">
                                                @if (!decadeTemplate()) {
                                                    {{ yearPickerValues()[0] }} - {{ yearPickerValues()[yearPickerValues().length - 1] }}
                                                }
                                                <ng-container *ngTemplateOutlet="decadeTemplate(); context: { $implicit: yearPickerValues }"></ng-container>
                                            </span>
                                        }
                                    </div>
                                    <p-button
                                        rounded
                                        variant="text"
                                        severity="secondary"
                                        (keydown)="onContainerButtonKeydown($event)"
                                        [styleClass]="cx('pcNextButton')"
                                        (onClick)="onNextButtonClick($event)"
                                        [style]="getNextButtonStyle(i)"
                                        [ariaLabel]="nextIconAriaLabel"
                                        [pt]="ptm('pcNextButton')"
                                        [attr.data-pc-group-section]="'navigator'"
                                    >
                                        <ng-template #icon>
                                            @if (!nextIconTemplate()) {
                                                <svg data-p-icon="chevron-right" />
                                            } @else {
                                                <ng-template *ngTemplateOutlet="nextIconTemplate()"></ng-template>
                                            }
                                        </ng-template>
                                    </p-button>
                                </div>
                                @if (currentView() === 'date') {
                                    <table [class]="cx('dayView')" role="grid" [pBind]="ptm('table')">
                                        <thead [pBind]="ptm('tableHeader')">
                                            <tr [pBind]="ptm('tableHeaderRow')">
                                                @if (showWeek()) {
                                                    <th [class]="cx('weekHeader')" [pBind]="ptm('weekHeader')">
                                                        <span [pBind]="ptm('weekHeaderLabel')">{{ translate('weekHeader') }}</span>
                                                    </th>
                                                }
                                                @for (weekDay of weekDays(); track weekDay; let begin = $first; let end = $last) {
                                                    <th [class]="cx('weekDayCell')" scope="col" [pBind]="ptm('weekDayCell')">
                                                        <span [class]="cx('weekDay')" [pBind]="ptm('weekDay')">{{ weekDay }}</span>
                                                    </th>
                                                }
                                            </tr>
                                        </thead>
                                        <tbody [pBind]="ptm('tableBody')">
                                            @for (week of month.dates; track $index; let j = $index) {
                                                <tr [pBind]="ptm('tableBodyRow')">
                                                    @if (showWeek()) {
                                                        <td [class]="cx('weekNumber')" [pBind]="ptm('weekNumber')">
                                                            <span [class]="cx('weekLabelContainer')" [pBind]="ptm('weekLabelContainer')">
                                                                {{ month.weekNumbers[j] }}
                                                            </span>
                                                        </td>
                                                    }
                                                    @for (date of week; track date.day) {
                                                        <td [attr.aria-label]="date.day" [class]="cx('dayCell', { date })" [pBind]="ptm('dayCell')">
                                                            @if (date.otherMonth ? showOtherMonths() : true) {
                                                                <span
                                                                    [class]="dayClass(date)"
                                                                    (click)="onDateSelect($event, date)"
                                                                    draggable="false"
                                                                    [attr.data-date]="formatDateKey(formatDateMetaToDate(date))"
                                                                    (keydown)="onDateCellKeydown($event, date, i)"
                                                                    pRipple
                                                                    [pBind]="ptm('day')"
                                                                >
                                                                    @if (!dateTemplate() && (date.selectable || !disabledDateTemplate())) {
                                                                        {{ date.day }}
                                                                    }
                                                                    @if (date.selectable || !disabledDateTemplate()) {
                                                                        <ng-container *ngTemplateOutlet="dateTemplate(); context: { $implicit: date }"></ng-container>
                                                                    }
                                                                    @if (!date.selectable) {
                                                                        <ng-container *ngTemplateOutlet="disabledDateTemplate(); context: { $implicit: date }"></ng-container>
                                                                    }
                                                                </span>
                                                                @if (isSelected(date)) {
                                                                    <div class="p-hidden-accessible" aria-live="polite">
                                                                        {{ date.day }}
                                                                    </div>
                                                                }
                                                            }
                                                        </td>
                                                    }
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                }
                            </div>
                        }
                    </div>
                    @if (currentView() === 'month') {
                        <div [class]="cx('monthView')" [pBind]="ptm('monthView')">
                            @for (m of monthPickerValues(); track m; let i = $index) {
                                <span (click)="onMonthSelect($event, i)" (keydown)="onMonthCellKeydown($event, i)" [class]="cx('month', { month: m, index: i })" pRipple [pBind]="ptm('month')">
                                    {{ m }}
                                    @if (isMonthSelected(i)) {
                                        <div class="p-hidden-accessible" aria-live="polite">
                                            {{ m }}
                                        </div>
                                    }
                                </span>
                            }
                        </div>
                    }
                    @if (currentView() === 'year') {
                        <div [class]="cx('yearView')" [pBind]="ptm('yearView')">
                            @for (y of yearPickerValues(); track y) {
                                <span (click)="onYearSelect($event, y)" (keydown)="onYearCellKeydown($event, y)" [class]="cx('year', { year: y })" pRipple [pBind]="ptm('year')">
                                    {{ y }}
                                    @if (isYearSelected(y)) {
                                        <div class="p-hidden-accessible" aria-live="polite">
                                            {{ y }}
                                        </div>
                                    }
                                </span>
                            }
                        </div>
                    }
                }
                @if (showTimePicker()) {
                    <div [class]="cx('timePicker')" [pBind]="ptm('timePicker')">
                        <div [class]="cx('hourPicker')" [pBind]="ptm('hourPicker')">
                            <p-button
                                rounded
                                variant="text"
                                severity="secondary"
                                [styleClass]="cx('pcIncrementButton')"
                                (keydown)="onContainerButtonKeydown($event)"
                                (keydown.enter)="incrementHour($event)"
                                (keydown.space)="incrementHour($event)"
                                (mousedown)="onTimePickerElementMouseDown($event, 0, 1)"
                                (mouseup)="onTimePickerElementMouseUp($event)"
                                (keyup.enter)="onTimePickerElementMouseUp($event)"
                                (keyup.space)="onTimePickerElementMouseUp($event)"
                                (mouseleave)="onTimePickerElementMouseLeave()"
                                [attr.aria-label]="translate('nextHour')"
                                [pt]="ptm('pcIncrementButton')"
                                [attr.data-pc-group-section]="'timepickerbutton'"
                            >
                                <ng-template #icon>
                                    @if (!incrementIconTemplate()) {
                                        <svg data-p-icon="chevron-up" [pBind]="ptm('pcIncrementButton')['icon']" />
                                    }
                                    <ng-template *ngTemplateOutlet="incrementIconTemplate()"></ng-template>
                                </ng-template>
                            </p-button>
                            <span [pBind]="ptm('hour')">{{ formattedHour() }}</span>
                            <p-button
                                rounded
                                variant="text"
                                severity="secondary"
                                [styleClass]="cx('pcDecrementButton')"
                                (keydown)="onContainerButtonKeydown($event)"
                                (keydown.enter)="decrementHour($event)"
                                (keydown.space)="decrementHour($event)"
                                (mousedown)="onTimePickerElementMouseDown($event, 0, -1)"
                                (mouseup)="onTimePickerElementMouseUp($event)"
                                (keyup.enter)="onTimePickerElementMouseUp($event)"
                                (keyup.space)="onTimePickerElementMouseUp($event)"
                                (mouseleave)="onTimePickerElementMouseLeave()"
                                [attr.aria-label]="translate('prevHour')"
                                [pt]="ptm('pcDecrementButton')"
                                [attr.data-pc-group-section]="'timepickerbutton'"
                            >
                                <ng-template #icon>
                                    @if (!decrementIconTemplate()) {
                                        <svg data-p-icon="chevron-down" [pBind]="ptm('pcDecrementButton')['icon']" />
                                    }
                                    <ng-template *ngTemplateOutlet="decrementIconTemplate()"></ng-template>
                                </ng-template>
                            </p-button>
                        </div>
                        <div class="p-datepicker-separator" [pBind]="ptm('separatorContainer')">
                            <span [pBind]="ptm('separator')">{{ timeSeparator() }}</span>
                        </div>
                        <div [class]="cx('minutePicker')" [pBind]="ptm('minutePicker')">
                            <p-button
                                rounded
                                variant="text"
                                severity="secondary"
                                [styleClass]="cx('pcIncrementButton')"
                                (keydown)="onContainerButtonKeydown($event)"
                                (keydown.enter)="incrementMinute($event)"
                                (keydown.space)="incrementMinute($event)"
                                (mousedown)="onTimePickerElementMouseDown($event, 1, 1)"
                                (mouseup)="onTimePickerElementMouseUp($event)"
                                (keyup.enter)="onTimePickerElementMouseUp($event)"
                                (keyup.space)="onTimePickerElementMouseUp($event)"
                                (mouseleave)="onTimePickerElementMouseLeave()"
                                [attr.aria-label]="translate('nextMinute')"
                                [pt]="ptm('pcIncrementButton')"
                                [attr.data-pc-group-section]="'timepickerbutton'"
                            >
                                <ng-template #icon>
                                    @if (!incrementIconTemplate()) {
                                        <svg data-p-icon="chevron-up" [pBind]="ptm('pcIncrementButton')['icon']" />
                                    }
                                    <ng-template *ngTemplateOutlet="incrementIconTemplate()"></ng-template>
                                </ng-template>
                            </p-button>
                            <span [pBind]="ptm('minute')">{{ formattedMinute() }}</span>
                            <p-button
                                rounded
                                variant="text"
                                severity="secondary"
                                [styleClass]="cx('pcDecrementButton')"
                                (keydown)="onContainerButtonKeydown($event)"
                                (keydown.enter)="decrementMinute($event)"
                                (keydown.space)="decrementMinute($event)"
                                (mousedown)="onTimePickerElementMouseDown($event, 1, -1)"
                                (mouseup)="onTimePickerElementMouseUp($event)"
                                (keyup.enter)="onTimePickerElementMouseUp($event)"
                                (keyup.space)="onTimePickerElementMouseUp($event)"
                                (mouseleave)="onTimePickerElementMouseLeave()"
                                [attr.aria-label]="translate('prevMinute')"
                                [pt]="ptm('pcDecrementButton')"
                                [attr.data-pc-group-section]="'timepickerbutton'"
                            >
                                <ng-template #icon>
                                    @if (!decrementIconTemplate()) {
                                        <svg data-p-icon="chevron-down" [pBind]="ptm('pcDecrementButton')['icon']" />
                                    }
                                    <ng-template *ngTemplateOutlet="decrementIconTemplate()"></ng-template>
                                </ng-template>
                            </p-button>
                        </div>
                        @if (showSeconds()) {
                            <div [class]="cx('separator')" [pBind]="ptm('separatorContainer')">
                                <span [pBind]="ptm('separator')">{{ timeSeparator() }}</span>
                            </div>
                        }
                        @if (showSeconds()) {
                            <div [class]="cx('secondPicker')" [pBind]="ptm('secondPicker')">
                                <p-button
                                    rounded
                                    variant="text"
                                    severity="secondary"
                                    [styleClass]="cx('pcIncrementButton')"
                                    (keydown)="onContainerButtonKeydown($event)"
                                    (keydown.enter)="incrementSecond($event)"
                                    (keydown.space)="incrementSecond($event)"
                                    (mousedown)="onTimePickerElementMouseDown($event, 2, 1)"
                                    (mouseup)="onTimePickerElementMouseUp($event)"
                                    (keyup.enter)="onTimePickerElementMouseUp($event)"
                                    (keyup.space)="onTimePickerElementMouseUp($event)"
                                    (mouseleave)="onTimePickerElementMouseLeave()"
                                    [attr.aria-label]="translate('nextSecond')"
                                    [pt]="ptm('pcIncrementButton')"
                                    [attr.data-pc-group-section]="'timepickerbutton'"
                                >
                                    <ng-template #icon>
                                        @if (!incrementIconTemplate()) {
                                            <svg data-p-icon="chevron-up" [pBind]="ptm('pcIncrementButton')['icon']" />
                                        }
                                        <ng-template *ngTemplateOutlet="incrementIconTemplate()"></ng-template>
                                    </ng-template>
                                </p-button>
                                <span [pBind]="ptm('second')">{{ formattedSecond() }}</span>
                                <p-button
                                    rounded
                                    variant="text"
                                    severity="secondary"
                                    [styleClass]="cx('pcDecrementButton')"
                                    (keydown)="onContainerButtonKeydown($event)"
                                    (keydown.enter)="decrementSecond($event)"
                                    (keydown.space)="decrementSecond($event)"
                                    (mousedown)="onTimePickerElementMouseDown($event, 2, -1)"
                                    (mouseup)="onTimePickerElementMouseUp($event)"
                                    (keyup.enter)="onTimePickerElementMouseUp($event)"
                                    (keyup.space)="onTimePickerElementMouseUp($event)"
                                    (mouseleave)="onTimePickerElementMouseLeave()"
                                    [attr.aria-label]="translate('prevSecond')"
                                    [pt]="ptm('pcDecrementButton')"
                                    [attr.data-pc-group-section]="'timepickerbutton'"
                                >
                                    <ng-template #icon>
                                        @if (!decrementIconTemplate()) {
                                            <svg data-p-icon="chevron-down" [pBind]="ptm('pcDecrementButton')['icon']" />
                                        }
                                        <ng-template *ngTemplateOutlet="decrementIconTemplate()"></ng-template>
                                    </ng-template>
                                </p-button>
                            </div>
                        }
                        @if (isHourFormat12()) {
                            <div [class]="cx('separator')" [pBind]="ptm('separatorContainer')">
                                <span [pBind]="ptm('separator')">{{ timeSeparator() }}</span>
                            </div>
                        }
                        @if (isHourFormat12()) {
                            <div [class]="cx('ampmPicker')" [pBind]="ptm('ampmPicker')">
                                <p-button
                                    text
                                    rounded
                                    severity="secondary"
                                    [styleClass]="cx('pcIncrementButton')"
                                    (keydown)="onContainerButtonKeydown($event)"
                                    (onClick)="toggleAMPM($event)"
                                    (keydown.enter)="toggleAMPM($event)"
                                    [attr.aria-label]="translate('am')"
                                    [pt]="ptm('pcIncrementButton')"
                                    [attr.data-pc-group-section]="'timepickerbutton'"
                                >
                                    <ng-template #icon>
                                        @if (!incrementIconTemplate()) {
                                            <svg data-p-icon="chevron-up" [pBind]="ptm('pcIncrementButton')['icon']" />
                                        }
                                        <ng-template *ngTemplateOutlet="incrementIconTemplate()"></ng-template>
                                    </ng-template>
                                </p-button>
                                <span [pBind]="ptm('ampm')">{{ ampmLabel() }}</span>
                                <p-button
                                    text
                                    rounded
                                    severity="secondary"
                                    [styleClass]="cx('pcDecrementButton')"
                                    (keydown)="onContainerButtonKeydown($event)"
                                    (click)="toggleAMPM($event)"
                                    (keydown.enter)="toggleAMPM($event)"
                                    [attr.aria-label]="translate('pm')"
                                    [pt]="ptm('pcDecrementButton')"
                                    [attr.data-pc-group-section]="'timepickerbutton'"
                                >
                                    <ng-template #icon>
                                        @if (!decrementIconTemplate()) {
                                            <svg data-p-icon="chevron-down" [pBind]="ptm('pcDecrementButton')['icon']" />
                                        }
                                        <ng-template *ngTemplateOutlet="decrementIconTemplate()"></ng-template>
                                    </ng-template>
                                </p-button>
                            </div>
                        }
                    </div>
                }
                @if (showButtonBar()) {
                    <div [class]="cx('buttonbar')" [pBind]="ptm('buttonbar')">
                        @if (buttonBarTemplate()) {
                            <ng-container *ngTemplateOutlet="buttonBarTemplate(); context: { todayCallback: onTodayButtonClick.bind(this), clearCallback: onClearButtonClick.bind(this) }"></ng-container>
                        } @else {
                            <p-button
                                size="small"
                                [styleClass]="cx('pcTodayButton')"
                                [label]="translate('today')"
                                (keydown)="onContainerButtonKeydown($event)"
                                (onClick)="onTodayButtonClick($event)"
                                [class]="todayButtonStyleClass()"
                                severity="secondary"
                                variant="text"
                                size="small"
                                [pt]="ptm('pcTodayButton')"
                                [attr.data-pc-group-section]="'button'"
                            />
                            <p-button
                                size="small"
                                [styleClass]="cx('pcClearButton')"
                                [label]="translate('clear')"
                                (keydown)="onContainerButtonKeydown($event)"
                                (onClick)="onClearButtonClick($event)"
                                [class]="clearButtonStyleClass()"
                                severity="secondary"
                                variant="text"
                                size="small"
                                [pt]="ptm('pcClearButton')"
                                [attr.data-pc-group-section]="'button'"
                            />
                        }
                    </div>
                }
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate()"></ng-container>
            </div>
        </p-motion>
    `,
    providers: [DATEPICKER_VALUE_ACCESSOR, DatePickerStyle, { provide: DATEPICKER_INSTANCE, useExisting: DatePicker }, { provide: PARENT_INSTANCE, useExisting: DatePicker }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cx('root')",
        '[style]': "sx('root')"
    }
})
export class DatePicker extends BaseInput<DatePickerPassThrough> {
    componentName = 'DatePicker';

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcDatePicker: DatePicker | undefined = inject(DATEPICKER_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    /**
     * Icon display mode.
     * @group Props
     */
    iconDisplay = input<DatePickerIconDisplay>('button');
    /**
     * Inline style of the input field.
     * @group Props
     */
    inputStyle = input<CSSProperties>();
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    inputId = input<string>();
    /**
     * Style class of the input field.
     * @group Props
     */
    inputStyleClass = input<string>();
    /**
     * Placeholder text for the input.
     * @group Props
     */
    placeholder = input<string>();
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy = input<string>();
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    ariaLabel = input<string>();

    /**
     * Defines a string that labels the icon button for accessibility.
     * @group Props
     */
    iconAriaLabel = input<string>();
    /**
     * Format of the date which can also be defined at locale settings.
     * @group Props
     */
    dateFormat = input<string>();
    /**
     * Separator for multiple selection mode.
     * @group Props
     */
    multipleSeparator = input<string>(',');
    /**
     * Separator for joining start and end dates on range selection mode.
     * @group Props
     */
    rangeSeparator = input<string>('-');
    /**
     * When enabled, displays the datepicker as inline. Default is false for popup mode.
     * @group Props
     */
    inline = input(false, { transform: booleanAttribute });
    /**
     * Whether to display dates in other months (non-selectable) at the start or end of the current month. To make these days selectable use the selectOtherMonths option.
     * @group Props
     */
    showOtherMonths = input(true, { transform: booleanAttribute });
    /**
     * Whether days in other months shown before or after the current month are selectable. This only applies if the showOtherMonths option is set to true.
     * @group Props
     */
    selectOtherMonths = input(undefined, { transform: booleanAttribute });
    /**
     * When enabled, displays a button with icon next to input.
     * @group Props
     */
    showIcon = input(undefined, { transform: booleanAttribute });
    /**
     * Icon of the datepicker button.
     * @group Props
     */
    icon = input<string>();
    /**
     * When specified, prevents entering the date manually with keyboard.
     * @group Props
     */
    readonlyInput = input(undefined, { transform: booleanAttribute });
    /**
     * The cutoff year for determining the century for a date.
     * @group Props
     */
    shortYearCutoff = input<any>('+10');
    /**
     * Specifies 12 or 24 hour format.
     * @group Props
     */
    hourFormat = input<string>('24');
    /**
     * Whether to display timepicker only.
     * @group Props
     */
    timeOnly = input(undefined, { transform: booleanAttribute });
    /**
     * Hours to change per step.
     * @group Props
     */
    stepHour = input(1, { transform: numberAttribute });
    /**
     * Minutes to change per step.
     * @group Props
     */
    stepMinute = input(1, { transform: numberAttribute });
    /**
     * Seconds to change per step.
     * @group Props
     */
    stepSecond = input(1, { transform: numberAttribute });
    /**
     * Whether to show the seconds in time picker.
     * @group Props
     */
    showSeconds = input(false, { transform: booleanAttribute });
    /**
     * When disabled, datepicker will not be visible with input focus.
     * @group Props
     */
    showOnFocus = input(true, { transform: booleanAttribute });
    /**
     * When enabled, datepicker will show week numbers.
     * @group Props
     */
    showWeek = input(false, { transform: booleanAttribute });
    /**
     * When enabled, datepicker will start week numbers from first day of the year.
     * @group Props
     */
    startWeekFromFirstDayOfYear = input(false, { transform: booleanAttribute });
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    showClear = input(false, { transform: booleanAttribute });
    /**
     * Type of the value to write back to ngModel, default is date and alternative is string.
     * @group Props
     */
    dataType = input<string>('date');
    /**
     * Defines the quantity of the selection, valid values are "single", "multiple" and "range".
     * @group Props
     */
    selectionMode = input<DatePickerSelectionMode>('single');
    /**
     * Maximum number of selectable dates in multiple mode.
     * @group Props
     */
    maxDateCount = input(undefined, { transform: numberAttribute });
    /**
     * Whether to display today and clear buttons at the footer
     * @group Props
     */
    showButtonBar = input(undefined, { transform: booleanAttribute });
    /**
     * Style class of the today button.
     * @group Props
     */
    todayButtonStyleClass = input<string>();
    /**
     * Style class of the clear button.
     * @group Props
     */
    clearButtonStyleClass = input<string>();
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus = input(undefined, { transform: booleanAttribute });
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    autoZIndex = input(true, { transform: booleanAttribute });
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    baseZIndex = input(0, { transform: numberAttribute });
    /**
     * Style class of the datetimepicker container element.
     * @group Props
     */
    panelStyleClass = input<string>();
    /**
     * Inline style of the datetimepicker container element.
     * @group Props
     */
    panelStyle = input<any>();
    /**
     * Keep invalid value when input blur.
     * @group Props
     */
    keepInvalid = input(false, { transform: booleanAttribute });
    /**
     * Whether to hide the overlay on date selection.
     * @group Props
     */
    hideOnDateTimeSelect = input(true, { transform: booleanAttribute });
    /**
     * When enabled, datepicker overlay is displayed as optimized for touch devices.
     * @group Props
     */
    touchUI = input(undefined, { transform: booleanAttribute });
    /**
     * Separator of time selector.
     * @group Props
     */
    timeSeparator = input<string>(':');
    /**
     * When enabled, can only focus on elements inside the datepicker.
     * @group Props
     */
    focusTrap = input(true, { transform: booleanAttribute });
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = input(undefined, { transform: numberAttribute });
    /**
     * The minimum selectable date.
     * @group Props
     */
    minDate = input<Date | null>();
    /**
     * The maximum selectable date.
     * @group Props
     */
    maxDate = input<Date | null>();
    /**
     * Array with dates that should be disabled (not selectable).
     * @group Props
     */
    disabledDates = input<Date[]>();
    /**
     * Array with weekday numbers that should be disabled (not selectable).
     * @group Props
     */
    disabledDays = input<number[]>();
    /**
     * Whether to display timepicker.
     * @group Props
     */
    showTime = input(false, { transform: booleanAttribute });
    /**
     * An array of options for responsive design.
     * @group Props
     */
    responsiveOptions = input<DatePickerResponsiveOptions[]>();
    /**
     * Number of months to display.
     * @group Props
     */
    numberOfMonths = input(1, { transform: numberAttribute });
    /**
     * Defines the first of the week for various date calculations.
     * @group Props
     */
    firstDayOfWeek = input(undefined, { transform: numberAttribute });
    /**
     * Type of view to display, valid values are "date" for datepicker and "month" for month picker.
     * @group Props
     */
    view = input<DatePickerViewType>('date');
    /**
     * Set the date to highlight on first opening if the field is blank.
     * @group Props
     */
    defaultDate = input<Date | null>();
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @defaultValue 'self'
     * @group Props
     */
    appendTo = input<AppendTo>(undefined);
    /**
     * The motion options.
     * @group Props
     */
    motionOptions = input<MotionOptions | undefined>(undefined);

    computedMotionOptions = computed<MotionOptions>(() => {
        return {
            ...this.ptm('motion'),
            ...this.motionOptions()
        };
    });
    /**
     * Callback to invoke on focus of input field.
     * @param {Event} event - browser event.
     * @group Emits
     */
    onFocus = output<Event>();
    /**
     * Callback to invoke on blur of input field.
     * @param {Event} event - browser event.
     * @group Emits
     */
    onBlur = output<Event>();
    /**
     * Callback to invoke when date panel closed.
     * @param {HTMLDivElement} element - The element being transitioned/animated.
     * @group Emits
     */
    onClose = output<HTMLElement>();
    /**
     * Callback to invoke on date select.
     * @param {Date} date - date value.
     * @group Emits
     */
    onSelect = output<Date>();
    /**
     * Callback to invoke when input field cleared.
     * @group Emits
     */
    onClear = output<any>();
    /**
     * Callback to invoke when input field is being typed.
     * @param {Event} event - browser event
     * @group Emits
     */
    onInput = output<any>();
    /**
     * Callback to invoke when today button is clicked.
     * @param {Date} date - today as a date instance.
     * @group Emits
     */
    onTodayClick = output<Date>();
    /**
     * Callback to invoke when clear button is clicked.
     * @param {Event} event - browser event.
     * @group Emits
     */
    onClearClick = output<any>();
    /**
     * Callback to invoke when a month is changed using the navigators.
     * @param {DatePickerMonthChangeEvent} event - custom month change event.
     * @group Emits
     */
    onMonthChange = output<DatePickerMonthChangeEvent>();
    /**
     * Callback to invoke when a year is changed using the navigators.
     * @param {DatePickerYearChangeEvent} event - custom year change event.
     * @group Emits
     */
    onYearChange = output<DatePickerYearChangeEvent>();
    /**
     * Callback to invoke when clicked outside of the date panel.
     * @group Emits
     */
    onClickOutside = output<any>();
    /**
     * Callback to invoke when datepicker panel is shown.
     * @param {HTMLDivElement} element - The element being transitioned/animated.
     * @group Emits
     */
    onShow = output<HTMLElement>();

    inputfieldViewChild = viewChild<ElementRef>('inputfield');

    contentWrapperViewChild = viewChild<ElementRef>('contentWrapper');

    _componentStyle = inject(DatePickerStyle);

    contentViewChild = computed(() => this.contentWrapperViewChild());

    value: any;

    dates: Nullable<Date[]>;

    months = signal<Month[]>([]);

    weekDays = signal<string[]>([]);

    currentMonth!: number;

    currentYear!: number;

    currentHour = signal<number | null>(null);

    currentMinute = signal<number | null>(null);

    currentSecond = signal<number | null>(null);

    formattedHour = computed(() => String(this.currentHour() ?? 0).padStart(2, '0'));

    formattedMinute = computed(() => String(this.currentMinute() ?? 0).padStart(2, '0'));

    formattedSecond = computed(() => String(this.currentSecond() ?? 0).padStart(2, '0'));

    pm = signal<boolean | null>(null);

    mask: Nullable<HTMLDivElement>;

    maskClickListener: VoidListener;

    overlay: Nullable<HTMLElement>;

    responsiveStyleElement: HTMLStyleElement | undefined | null;

    overlayVisible = signal<boolean>(false);

    overlayMinWidth: Nullable<number>;

    $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo());

    calendarElement: Nullable<HTMLElement | ElementRef>;

    timePickerTimer: any;

    documentClickListener: VoidListener;

    animationEndListener: VoidListener;

    ticksTo1970: Nullable<number>;

    yearOptions: Nullable<number[]>;

    focus = signal<boolean>(false);

    isKeydown: Nullable<boolean>;

    preventDocumentListener: Nullable<boolean>;

    requiredAttr = computed(() => (this.required() ? '' : undefined));

    readonlyAttr = computed(() => (this.readonlyInput() ? '' : undefined));

    disabledAttr = computed(() => (this.$disabled() ? '' : undefined));

    switchViewButtonDisabledAttr = computed(() => (this.switchViewButtonDisabled() ? '' : undefined));

    inputModeAttr = computed(() => (this.touchUI() ? 'off' : null));

    showClearIcon = computed(() => this.showClear() && !this.$disabled() && !!this.inputFieldValue());

    showIconButton = computed(() => this.showIcon() && this.iconDisplay() === 'button');

    showInputIcon = computed(() => this.iconDisplay() === 'input' && this.showIcon());

    showTimePicker = computed(() => (this.showTime() || this.timeOnly()) && this.currentView() === 'date');

    isHourFormat12 = computed(() => this.hourFormat() == '12');

    ariaControlsAttr = computed(() => (this.overlayVisible() ? this.panelId : null));

    isOverlayVisible = computed(() => this.inline() || this.overlayVisible());

    roleAttr = computed(() => (this.inline() ? null : 'dialog'));

    ariaModalAttr = computed(() => (this.inline() ? null : 'true'));

    ampmLabel = computed(() => (this.pm() ? 'PM' : 'AM'));

    dayClass(date) {
        return this._componentStyle.classes.day({ instance: this, date: date });
    }

    getPrevButtonStyle(index: number) {
        return { visibility: index === 0 ? 'visible' : 'hidden' };
    }

    getNextButtonStyle(index: number) {
        return { visibility: index === this.months().length - 1 ? 'visible' : 'hidden' };
    }

    /**
     * Custom template for date cells.
     * @param {DatePickerDateTemplateContext} context - date template context.
     * @group Templates
     */
    dateTemplate = contentChild<TemplateRef<DatePickerDateTemplateContext>>('date', { descendants: false });

    /**
     * Custom template for header section.
     * @group Templates
     */
    headerTemplate = contentChild<TemplateRef<void>>('header', { descendants: false });

    /**
     * Custom template for footer section.
     * @group Templates
     */
    footerTemplate = contentChild<TemplateRef<void>>('footer', { descendants: false });

    /**
     * Custom template for disabled date cells.
     * @param {DatePickerDisabledDateTemplateContext} context - disabled date template context.
     * @group Templates
     */
    disabledDateTemplate = contentChild<TemplateRef<DatePickerDisabledDateTemplateContext>>('disabledDate', { descendants: false });

    /**
     * Custom template for decade view.
     * @param {DatePickerDecadeTemplateContext} context - decade template context.
     * @group Templates
     */
    decadeTemplate = contentChild<TemplateRef<DatePickerDecadeTemplateContext>>('decade', { descendants: false });

    /**
     * Custom template for previous month icon.
     * @group Templates
     */
    previousIconTemplate = contentChild<TemplateRef<void>>('previousicon', { descendants: false });

    /**
     * Custom template for next month icon.
     * @group Templates
     */
    nextIconTemplate = contentChild<TemplateRef<void>>('nexticon', { descendants: false });

    /**
     * Custom template for trigger icon.
     * @group Templates
     */
    triggerIconTemplate = contentChild<TemplateRef<void>>('triggericon', { descendants: false });

    /**
     * Custom template for clear icon.
     * @group Templates
     */
    clearIconTemplate = contentChild<TemplateRef<void>>('clearicon', { descendants: false });

    /**
     * Custom template for decrement icon.
     * @group Templates
     */
    decrementIconTemplate = contentChild<TemplateRef<void>>('decrementicon', { descendants: false });

    /**
     * Custom template for increment icon.
     * @group Templates
     */
    incrementIconTemplate = contentChild<TemplateRef<void>>('incrementicon', { descendants: false });

    /**
     * Custom template for input icon.
     * @param {DatePickerInputIconTemplateContext} context - input icon template context.
     * @group Templates
     */
    inputIconTemplate = contentChild<TemplateRef<DatePickerInputIconTemplateContext>>('inputicon', { descendants: false });

    /**
     * Custom template for button bar.
     * @param {DatePickerButtonBarTemplateContext} context - button bar template context.
     * @group Templates
     */
    buttonBarTemplate = contentChild<TemplateRef<DatePickerButtonBarTemplateContext>>('buttonbar', { descendants: false });

    selectElement: Nullable;

    todayElement: Nullable;

    focusElement: Nullable;

    scrollHandler: Nullable<ConnectedOverlayScrollHandler>;

    documentResizeListener: VoidListener;

    navigationState: Nullable<NavigationState> = null;

    isMonthNavigate: Nullable<boolean>;

    initialized: Nullable<boolean>;

    translationSubscription: Nullable<Subscription>;

    _locale!: LocaleSettings;

    currentView = signal<string | null>(null);

    attributeSelector: Nullable<string>;

    panelId: Nullable<string>;

    preventFocus: Nullable<boolean>;

    _focusKey: Nullable<string> = null;

    private window: Window;

    get locale() {
        return this._locale;
    }

    get iconButtonAriaLabel() {
        return this.iconAriaLabel() ? this.iconAriaLabel() : this.translate('chooseDate');
    }

    get prevIconAriaLabel() {
        return this.currentView() === 'year' ? this.translate('prevDecade') : this.currentView() === 'month' ? this.translate('prevYear') : this.translate('prevMonth');
    }

    get nextIconAriaLabel() {
        return this.currentView() === 'year' ? this.translate('nextDecade') : this.currentView() === 'month' ? this.translate('nextYear') : this.translate('nextMonth');
    }

    overlayService = inject(OverlayService);

    constructor() {
        super();
        this.window = this.document.defaultView as Window;

        // Effect for dateFormat changes
        effect(() => {
            this.dateFormat();
            if (this.initialized) {
                this.updateInputfield();
            }
        });

        // Effect for hourFormat changes
        effect(() => {
            this.hourFormat();
            if (this.initialized) {
                this.updateInputfield();
            }
        });

        // Effect for minDate/maxDate/disabledDates/disabledDays changes
        effect(() => {
            this.minDate();
            this.maxDate();
            this.disabledDates();
            this.disabledDays();
            if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
                this.createMonths(this.currentMonth, this.currentYear);
            }
        });

        // Effect for showTime changes
        effect(() => {
            const showTime = this.showTime();
            if (showTime) {
                if (untracked(() => this.currentHour()) === null) {
                    this.initTime(this.value || new Date());
                }
                this.updateInputfield();
            }
        });

        // Effect for responsiveOptions/numberOfMonths changes
        effect(() => {
            this.responsiveOptions();
            this.numberOfMonths();
            this.destroyResponsiveStyleElement();
            this.createResponsiveStyle();
        });

        // Effect for firstDayOfWeek changes
        effect(() => {
            this.firstDayOfWeek();
            if (this.initialized) {
                this.createWeekDays();
            }
        });

        // Effect for view changes
        effect(() => {
            const view = this.view();
            this.currentView.set(view);
        });

        // Effect for defaultDate changes
        effect(() => {
            const defaultDate = this.defaultDate();
            if (this.initialized && defaultDate !== undefined) {
                const date = defaultDate || new Date();
                this.currentMonth = date.getMonth();
                this.currentYear = date.getFullYear();
                this.initTime(date);
                this.createMonths(this.currentMonth, this.currentYear);
            }
        });

        // Effect for contentViewChild changes
        effect(() => {
            const content = this.contentWrapperViewChild();
            if (content && this.overlay) {
                if (this.isMonthNavigate) {
                    Promise.resolve(null).then(() => this.updateFocus());
                    this.isMonthNavigate = false;
                } else {
                    if (!untracked(() => this.focus()) && !untracked(() => this.inline())) {
                        this.initFocusableCell();
                    }
                }
            }
        });
    }

    onInit() {
        this.attributeSelector = uuid('pn_id_');
        this.panelId = this.attributeSelector + '_panel';
        const date = this.defaultDate() || new Date();
        this.createResponsiveStyle();
        this.currentMonth = date.getMonth();
        this.currentYear = date.getFullYear();
        this.yearOptions = [];
        this.currentView.set(this.view());

        if (this.view() === 'date') {
            this.createWeekDays();
            this.initTime(date);
            this.createMonths(this.currentMonth, this.currentYear);
            this.ticksTo1970 = ((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000;
        }

        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.createWeekDays();
        });

        this.initialized = true;
    }

    onAfterViewInit() {
        if (this.inline()) {
            this.contentViewChild() && this.contentViewChild()!.nativeElement.setAttribute(this.attributeSelector, '');
        } else {
            if (!this.$disabled() && this.overlay) {
                this.initFocusableCell();
                if (this.numberOfMonths() === 1) {
                    if (this.contentViewChild() && this.contentViewChild()!.nativeElement) {
                        this.contentViewChild()!.nativeElement.style.width = getOuterWidth(this.el?.nativeElement) + 'px';
                    }
                }
            }
        }
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    populateYearOptions(start: number, end: number) {
        this.yearOptions = [];

        for (let i = start; i <= end; i++) {
            this.yearOptions.push(i);
        }
    }

    createWeekDays() {
        const days: string[] = [];
        let dayIndex = this.getFirstDateOfWeek();
        let dayLabels = this.translate(TranslationKeys.DAY_NAMES_MIN);
        for (let i = 0; i < 7; i++) {
            days.push(dayLabels[dayIndex]);
            dayIndex = dayIndex == 6 ? 0 : ++dayIndex;
        }
        this.weekDays.set(days);
    }

    monthPickerValues() {
        let monthPickerValues: any[] = [];
        for (let i = 0; i <= 11; i++) {
            monthPickerValues.push(this.translate('monthNamesShort')[i]);
        }

        return monthPickerValues;
    }

    yearPickerValues() {
        let yearPickerValues: any[] = [];
        let base = <number>this.currentYear - (<number>this.currentYear % 10);
        for (let i = 0; i < 10; i++) {
            yearPickerValues.push(base + i);
        }

        return yearPickerValues;
    }

    createMonths(month: number, year: number) {
        const newMonths: Month[] = [];
        for (let i = 0; i < this.numberOfMonths(); i++) {
            let m = month + i;
            let y = year;
            if (m > 11) {
                m = m % 12;
                y = year + Math.floor((month + i) / 12);
            }

            newMonths.push(this.createMonth(m, y));
        }
        this.months.set(newMonths);
    }

    getWeekNumber(date: Date) {
        let checkDate = new Date(date.getTime());
        if (this.startWeekFromFirstDayOfYear()) {
            let firstDayOfWeek: number = +this.getFirstDateOfWeek();
            checkDate.setDate(checkDate.getDate() + 6 + firstDayOfWeek - checkDate.getDay());
        } else {
            checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
        }
        let time = checkDate.getTime();
        checkDate.setMonth(0);
        checkDate.setDate(1);
        return Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1;
    }

    createMonth(month: number, year: number): Month {
        let dates = [];
        let firstDay = this.getFirstDayOfMonthIndex(month, year);
        let daysLength = this.getDaysCountInMonth(month, year);
        let prevMonthDaysLength = this.getDaysCountInPrevMonth(month, year);
        let dayNo = 1;
        let today = new Date();
        let weekNumbers = [];
        let monthRows = Math.ceil((daysLength + firstDay) / 7);

        for (let i = 0; i < monthRows; i++) {
            let week: any[] = [];

            if (i == 0) {
                for (let j = prevMonthDaysLength - firstDay + 1; j <= prevMonthDaysLength; j++) {
                    let prev = this.getPreviousMonthAndYear(month, year);
                    week.push({
                        day: j,
                        month: prev.month,
                        year: prev.year,
                        otherMonth: true,
                        today: this.isToday(today, j, prev.month, prev.year),
                        selectable: this.isSelectable(j, prev.month, prev.year, true)
                    });
                }

                let remainingDaysLength = 7 - week.length;
                for (let j = 0; j < remainingDaysLength; j++) {
                    week.push({
                        day: dayNo,
                        month: month,
                        year: year,
                        today: this.isToday(today, dayNo, month, year),
                        selectable: this.isSelectable(dayNo, month, year, false)
                    });
                    dayNo++;
                }
            } else {
                for (let j = 0; j < 7; j++) {
                    if (dayNo > daysLength) {
                        let next = this.getNextMonthAndYear(month, year);
                        week.push({
                            day: dayNo - daysLength,
                            month: next.month,
                            year: next.year,
                            otherMonth: true,
                            today: this.isToday(today, dayNo - daysLength, next.month, next.year),
                            selectable: this.isSelectable(dayNo - daysLength, next.month, next.year, true)
                        });
                    } else {
                        week.push({
                            day: dayNo,
                            month: month,
                            year: year,
                            today: this.isToday(today, dayNo, month, year),
                            selectable: this.isSelectable(dayNo, month, year, false)
                        });
                    }

                    dayNo++;
                }
            }

            if (this.showWeek()) {
                (weekNumbers as any[]).push(this.getWeekNumber(new Date(week[0].year, week[0].month, week[0].day)));
            }

            (dates as any[]).push(week);
        }

        return {
            month: month,
            year: year,
            dates: <any>dates,
            weekNumbers: weekNumbers
        };
    }

    initTime(date: Date) {
        this.pm.set(date.getHours() > 11);

        if (this.showTime()) {
            this.currentMinute.set(date.getMinutes());
            this.currentSecond.set(this.showSeconds() ? date.getSeconds() : 0);
            this.setCurrentHourPM(date.getHours());
        } else if (this.timeOnly()) {
            this.currentMinute.set(0);
            this.currentHour.set(0);
            this.currentSecond.set(0);
        }
    }

    navBackward(event: any) {
        if (this.$disabled()) {
            event.preventDefault();
            return;
        }

        this.isMonthNavigate = true;

        if (this.currentView() === 'month') {
            this.decrementYear();
            setTimeout(() => {
                this.updateFocus();
            }, 1);
        } else if (this.currentView() === 'year') {
            this.decrementDecade();
            setTimeout(() => {
                this.updateFocus();
            }, 1);
        } else {
            if (this.currentMonth === 0) {
                this.currentMonth = 11;
                this.decrementYear();
            } else {
                this.currentMonth--;
            }

            this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }

    navForward(event: any) {
        if (this.$disabled()) {
            event.preventDefault();
            return;
        }

        this.isMonthNavigate = true;

        if (this.currentView() === 'month') {
            this.incrementYear();
            setTimeout(() => {
                this.updateFocus();
            }, 1);
        } else if (this.currentView() === 'year') {
            this.incrementDecade();
            setTimeout(() => {
                this.updateFocus();
            }, 1);
        } else {
            if (this.currentMonth === 11) {
                this.currentMonth = 0;
                this.incrementYear();
            } else {
                this.currentMonth++;
            }

            this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }

    decrementYear() {
        this.currentYear--;
        let _yearOptions = <number[]>this.yearOptions;

        if (this.currentYear < _yearOptions[0]) {
            let difference = _yearOptions[_yearOptions.length - 1] - _yearOptions[0];
            this.populateYearOptions(_yearOptions[0] - difference, _yearOptions[_yearOptions.length - 1] - difference);
        }
    }

    decrementDecade() {
        this.currentYear = this.currentYear - 10;
    }

    incrementDecade() {
        this.currentYear = this.currentYear + 10;
    }

    incrementYear() {
        this.currentYear++;
        let _yearOptions = <number[]>this.yearOptions;

        if (this.currentYear > _yearOptions[_yearOptions.length - 1]) {
            let difference = _yearOptions[_yearOptions.length - 1] - _yearOptions[0];
            this.populateYearOptions(_yearOptions[0] + difference, _yearOptions[_yearOptions.length - 1] + difference);
        }
    }

    switchToMonthView(event: Event) {
        this.setCurrentView('month');
        event.preventDefault();
    }

    switchToYearView(event: Event) {
        this.setCurrentView('year');
        event.preventDefault();
    }

    onDateSelect(event: Event, dateMeta: any) {
        if (this.$disabled() || !dateMeta.selectable) {
            event.preventDefault();
            return;
        }

        if (this.isMultipleSelection() && this.isSelected(dateMeta)) {
            this.value = this.value.filter((date: Date, i: number) => {
                return !this.isDateEquals(date, dateMeta);
            });
            if (this.value.length === 0) {
                this.value = null;
            }
            this.updateModel(this.value);
        } else {
            if (this.shouldSelectDate(dateMeta)) {
                this.selectDate(dateMeta);
            }
        }

        if (this.hideOnDateTimeSelect() && (this.isSingleSelection() || (this.isRangeSelection() && this.value[1]))) {
            setTimeout(() => {
                event.preventDefault();
                this.hideOverlay();

                if (this.mask) {
                    this.disableModality();
                }
            }, 150);
        }

        this.updateInputfield();
        event.preventDefault();
    }

    shouldSelectDate(dateMeta: any) {
        if (this.isMultipleSelection()) return this.maxDateCount() != null ? this.maxDateCount()! > (this.value ? this.value.length : 0) : true;
        else return true;
    }

    onMonthSelect(event: Event, index: number) {
        if (this.view() === 'month') {
            this.onDateSelect(event, { year: this.currentYear, month: index, day: 1, selectable: true });
        } else {
            this.currentMonth = index;
            this.createMonths(this.currentMonth, this.currentYear);
            this.setCurrentView('date');
            this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
        }
    }

    onYearSelect(event: Event, year: number) {
        if (this.view() === 'year') {
            this.onDateSelect(event, { year: year, month: 0, day: 1, selectable: true });
        } else {
            this.currentYear = year;
            this.setCurrentView('month');
            this.onYearChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
        }
    }

    updateInputfield() {
        let formattedValue = '';

        if (this.value) {
            if (this.isSingleSelection()) {
                formattedValue = this.formatDateTime(this.value);
            } else if (this.isMultipleSelection()) {
                for (let i = 0; i < this.value.length; i++) {
                    let dateAsString = this.formatDateTime(this.value[i]);
                    formattedValue += dateAsString;
                    if (i !== this.value.length - 1) {
                        formattedValue += this.multipleSeparator() + ' ';
                    }
                }
            } else if (this.isRangeSelection()) {
                if (this.value && this.value.length) {
                    let startDate = this.value[0];
                    let endDate = this.value[1];

                    formattedValue = this.formatDateTime(startDate);
                    if (endDate) {
                        formattedValue += ' ' + this.rangeSeparator() + ' ' + this.formatDateTime(endDate);
                    }
                }
            }
        }

        this.writeModelValue(formattedValue);

        this.inputFieldValue.set(formattedValue);

        const inputfield = this.inputfieldViewChild();
        if (inputfield?.nativeElement) {
            inputfield.nativeElement.value = this.inputFieldValue();
        }
    }

    inputFieldValue = signal<string | null>(null);

    formatDateTime(date: any) {
        let formattedValue = this.keepInvalid() ? date : null;
        const isDateValid = this.isValidDateForTimeConstraints(date);

        if (this.isValidDate(date)) {
            if (this.timeOnly()) {
                formattedValue = this.formatTime(date);
            } else {
                formattedValue = this.formatDate(date, this.getDateFormat());
                if (this.showTime()) {
                    formattedValue += ' ' + this.formatTime(date);
                }
            }
        } else if (this.dataType() === 'string') {
            formattedValue = date;
        }
        formattedValue = isDateValid ? formattedValue : '';
        return formattedValue;
    }

    formatDateMetaToDate(dateMeta: any): Date {
        return new Date(dateMeta.year, dateMeta.month, dateMeta.day);
    }

    formatDateKey(date: Date): string {
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }

    setCurrentHourPM(hours: number) {
        if (this.hourFormat() == '12') {
            this.pm.set(hours > 11);
            if (hours >= 12) {
                this.currentHour.set(hours == 12 ? 12 : hours - 12);
            } else {
                this.currentHour.set(hours == 0 ? 12 : hours);
            }
        } else {
            this.currentHour.set(hours);
        }
    }

    setCurrentView(currentView: DatePickerViewType) {
        this.currentView.set(currentView);
        this.alignOverlay();
    }

    selectDate(dateMeta: any) {
        let date = this.formatDateMetaToDate(dateMeta);

        if (this.showTime()) {
            if (this.hourFormat() == '12') {
                if (this.currentHour() === 12) date.setHours(this.pm() ? 12 : 0);
                else date.setHours(this.pm() ? <number>this.currentHour()! + 12 : <number>this.currentHour());
            } else {
                date.setHours(<number>this.currentHour());
            }

            date.setMinutes(<number>this.currentMinute());
            date.setSeconds(<number>this.currentSecond());
        }

        if (this.minDate() && this.minDate()! > date) {
            date = this.minDate()!;
            this.setCurrentHourPM(date.getHours());
            this.currentMinute.set(date.getMinutes());
            this.currentSecond.set(date.getSeconds());
        }

        if (this.maxDate() && this.maxDate()! < date) {
            date = this.maxDate()!;
            this.setCurrentHourPM(date.getHours());
            this.currentMinute.set(date.getMinutes());
            this.currentSecond.set(date.getSeconds());
        }

        if (this.isSingleSelection()) {
            this.updateModel(date);
        } else if (this.isMultipleSelection()) {
            this.updateModel(this.value ? [...this.value, date] : [date]);
        } else if (this.isRangeSelection()) {
            if (this.value && this.value.length) {
                let startDate = this.value[0];
                let endDate = this.value[1];

                if (!endDate && date.getTime() >= startDate.getTime()) {
                    endDate = date;
                } else {
                    startDate = date;
                    endDate = null;
                }

                this.updateModel([startDate, endDate]);
            } else {
                this.updateModel([date, null]);
            }
        }

        this.onSelect.emit(date);
    }

    updateModel(value: any) {
        this.value = value;

        if (this.dataType() == 'date') {
            this.writeModelValue(this.value);
            this.onModelChange(this.value);
        } else if (this.dataType() == 'string') {
            if (this.isSingleSelection()) {
                this.onModelChange(this.formatDateTime(this.value));
            } else {
                let stringArrValue: any[] | null = null;
                if (Array.isArray(this.value)) {
                    stringArrValue = this.value.map((date: Date) => this.formatDateTime(date));
                }
                this.writeModelValue(stringArrValue);
                this.onModelChange(stringArrValue);
            }
        }
    }

    getFirstDayOfMonthIndex(month: number, year: number) {
        let day = new Date();
        day.setDate(1);
        day.setMonth(month);
        day.setFullYear(year);

        let dayIndex = day.getDay() + this.getSundayIndex();
        return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
    }

    getDaysCountInMonth(month: number, year: number) {
        return 32 - this.daylightSavingAdjust(new Date(year, month, 32)).getDate();
    }

    getDaysCountInPrevMonth(month: number, year: number) {
        let prev = this.getPreviousMonthAndYear(month, year);
        return this.getDaysCountInMonth(prev.month, prev.year);
    }

    getPreviousMonthAndYear(month: number, year: number) {
        let m, y;

        if (month === 0) {
            m = 11;
            y = year - 1;
        } else {
            m = month - 1;
            y = year;
        }

        return { month: m, year: y };
    }

    getNextMonthAndYear(month: number, year: number) {
        let m, y;

        if (month === 11) {
            m = 0;
            y = year + 1;
        } else {
            m = month + 1;
            y = year;
        }

        return { month: m, year: y };
    }

    getSundayIndex() {
        let firstDayOfWeek = this.getFirstDateOfWeek();

        return firstDayOfWeek > 0 ? 7 - firstDayOfWeek : 0;
    }

    isSelected(dateMeta: any): boolean | undefined {
        if (this.value) {
            if (this.isSingleSelection()) {
                return this.isDateEquals(this.value, dateMeta);
            } else if (this.isMultipleSelection()) {
                let selected = false;
                for (let date of this.value) {
                    selected = this.isDateEquals(date, dateMeta);
                    if (selected) {
                        break;
                    }
                }

                return selected;
            } else if (this.isRangeSelection()) {
                if (this.value[1]) return this.isDateEquals(this.value[0], dateMeta) || this.isDateEquals(this.value[1], dateMeta) || this.isDateBetween(this.value[0], this.value[1], dateMeta);
                else return this.isDateEquals(this.value[0], dateMeta);
            }
        } else {
            return false;
        }
    }

    isComparable() {
        return this.value != null && typeof this.value !== 'string';
    }

    isMonthSelected(month) {
        if (!this.isComparable()) return false;

        if (this.isMultipleSelection()) {
            return this.value.some((currentValue) => currentValue.getMonth() === month && currentValue.getFullYear() === this.currentYear);
        } else if (this.isRangeSelection()) {
            if (!this.value[1]) {
                return this.value[0]?.getFullYear() === this.currentYear && this.value[0]?.getMonth() === month;
            } else {
                const currentDate = new Date(this.currentYear, month, 1);
                const startDate = new Date(this.value[0].getFullYear(), this.value[0].getMonth(), 1);
                const endDate = new Date(this.value[1].getFullYear(), this.value[1].getMonth(), 1);

                return currentDate >= startDate && currentDate <= endDate;
            }
        } else {
            return this.value.getMonth() === month && this.value.getFullYear() === this.currentYear;
        }
    }

    isMonthDisabled(month: number, year?: number) {
        const yearToCheck = year ?? this.currentYear;

        for (let day = 1; day < this.getDaysCountInMonth(month, yearToCheck) + 1; day++) {
            if (this.isSelectable(day, month, yearToCheck, false)) {
                return false;
            }
        }
        return true;
    }

    isYearDisabled(year: number) {
        return Array(12)
            .fill(0)
            .every((v, month) => this.isMonthDisabled(month, year));
    }

    isYearSelected(year: number) {
        if (this.isComparable()) {
            let value = this.isRangeSelection() ? this.value[0] : this.value;

            return !this.isMultipleSelection() ? value.getFullYear() === year : false;
        }

        return false;
    }

    isDateEquals(value: any, dateMeta: any) {
        if (value && isDate(value)) return value.getDate() === dateMeta.day && value.getMonth() === dateMeta.month && value.getFullYear() === dateMeta.year;
        else return false;
    }

    isDateBetween(start: Date, end: Date, dateMeta: any) {
        let between: boolean = false;
        if (isDate(start) && isDate(end)) {
            let date: Date = this.formatDateMetaToDate(dateMeta);
            return start.getTime() <= date.getTime() && end.getTime() >= date.getTime();
        }

        return between;
    }

    isSingleSelection(): boolean {
        return this.selectionMode() === 'single';
    }

    isRangeSelection(): boolean {
        return this.selectionMode() === 'range';
    }

    isMultipleSelection(): boolean {
        return this.selectionMode() === 'multiple';
    }

    isToday(today: Date, day: number, month: number, year: number): boolean {
        return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    }

    isSelectable(day: any, month: any, year: any, otherMonth: any): boolean {
        let validMin = true;
        let validMax = true;
        let validDate = true;
        let validDay = true;

        if (otherMonth && !this.selectOtherMonths()) {
            return false;
        }

        const minDate = this.minDate();
        if (minDate) {
            if (minDate.getFullYear() > year) {
                validMin = false;
            } else if (minDate.getFullYear() === year && this.currentView() != 'year') {
                if (minDate.getMonth() > month) {
                    validMin = false;
                } else if (minDate.getMonth() === month) {
                    if (minDate.getDate() > day) {
                        validMin = false;
                    }
                }
            }
        }

        const maxDate = this.maxDate();
        if (maxDate) {
            if (maxDate.getFullYear() < year) {
                validMax = false;
            } else if (maxDate.getFullYear() === year) {
                if (maxDate.getMonth() < month) {
                    validMax = false;
                } else if (maxDate.getMonth() === month) {
                    if (maxDate.getDate() < day) {
                        validMax = false;
                    }
                }
            }
        }

        if (this.disabledDates()) {
            validDate = !this.isDateDisabled(day, month, year);
        }

        if (this.disabledDays()) {
            validDay = !this.isDayDisabled(day, month, year);
        }

        return validMin && validMax && validDate && validDay;
    }

    isDateDisabled(day: number, month: number, year: number): boolean {
        const disabledDates = this.disabledDates();
        if (disabledDates) {
            for (let disabledDate of disabledDates) {
                if (disabledDate.getFullYear() === year && disabledDate.getMonth() === month && disabledDate.getDate() === day) {
                    return true;
                }
            }
        }

        return false;
    }

    isDayDisabled(day: number, month: number, year: number): boolean {
        const disabledDays = this.disabledDays();
        if (disabledDays) {
            let weekday = new Date(year, month, day);
            let weekdayNumber = weekday.getDay();
            return disabledDays.indexOf(weekdayNumber) !== -1;
        }
        return false;
    }

    onInputFocus(event: Event) {
        this.focus.set(true);
        if (this.showOnFocus()) {
            this.showOverlay();
        }
        this.onFocus.emit(event);
    }

    onInputClick() {
        if (this.showOnFocus() && !this.overlayVisible()) {
            this.showOverlay();
        }
    }

    onInputBlur(event: Event) {
        this.focus.set(false);
        this.onBlur.emit(event);
        if (!this.keepInvalid()) {
            this.updateInputfield();
        }
        this.onModelTouched();
    }

    onButtonClick(event: Event, inputfield: any = this.inputfieldViewChild()?.nativeElement) {
        if (this.$disabled()) {
            return;
        }

        if (!this.overlayVisible()) {
            inputfield.focus();
            this.showOverlay();
        } else {
            this.hideOverlay();
        }
    }

    clear() {
        this.value = null;
        this.inputFieldValue.set(null);
        this.writeModelValue(this.value);
        this.onModelChange(this.value);
        this.updateInputfield();
        this.onClear.emit(null);
    }

    onOverlayClick(event: Event) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });
    }

    getMonthName(index: number) {
        return this.translate('monthNames')[index];
    }

    getYear(month: any) {
        return this.currentView() === 'month' ? this.currentYear : month.year;
    }

    switchViewButtonDisabled() {
        return this.numberOfMonths() > 1 || this.$disabled();
    }

    onPrevButtonClick(event: Event) {
        this.navigationState = { backward: true, button: true };
        this.navBackward(event);
    }

    onNextButtonClick(event: Event) {
        this.navigationState = { backward: false, button: true };
        this.navForward(event);
    }

    onContainerButtonKeydown(event: KeyboardEvent) {
        switch (event.which) {
            //tab
            case 9:
                if (!this.inline()) {
                    this.trapFocus(event);
                }
                if (this.inline()) {
                    const headerElements = findSingle(this.el?.nativeElement, '.p-datepicker-header');
                    const element = event.target;
                    if (this.timeOnly()) {
                        return;
                    } else {
                        if (element == headerElements?.children[headerElements?.children?.length! - 1]) {
                            this.initFocusableCell();
                        }
                    }
                }
                break;

            //escape
            case 27:
                this.inputfieldViewChild()?.nativeElement.focus();
                this.overlayVisible.set(false);
                event.preventDefault();
                break;

            default:
                //Noop
                break;
        }
    }

    onInputKeydown(event: any) {
        this.isKeydown = true;
        if (event.keyCode === 40 && this.contentViewChild()) {
            this.trapFocus(event);
        } else if (event.keyCode === 27) {
            if (this.overlayVisible()) {
                this.inputfieldViewChild()?.nativeElement.focus();
                this.overlayVisible.set(false);
                event.preventDefault();
            }
        } else if (event.keyCode === 13) {
            if (this.overlayVisible()) {
                this.overlayVisible.set(false);
                event.preventDefault();
            }
        } else if (event.keyCode === 9 && this.contentViewChild()) {
            getFocusableElements(this.contentViewChild()!.nativeElement).forEach((el: any) => (el.tabIndex = '-1'));
            if (this.overlayVisible()) {
                this.overlayVisible.set(false);
            }
        }
    }

    onDateCellKeydown(event: any, dateMeta: any, groupIndex: number) {
        const cellContent = event.currentTarget;
        const cell = cellContent.parentElement;
        const currentDate = this.formatDateMetaToDate(dateMeta);
        switch (event.which) {
            //down arrow
            case 40: {
                cellContent.tabIndex = '-1';
                let cellIndex = getIndex(cell);
                let nextRow = cell.parentElement.nextElementSibling;
                if (nextRow) {
                    let focusCell = nextRow.children[cellIndex].children[0];
                    if (hasClass(focusCell, 'p-disabled')) {
                        this.navigationState = { backward: false };
                        this.navForward(event);
                    } else {
                        nextRow.children[cellIndex].children[0].tabIndex = '0';
                        nextRow.children[cellIndex].children[0].focus();
                    }
                } else {
                    this.navigationState = { backward: false };
                    this.navForward(event);
                }
                event.preventDefault();
                break;
            }

            //up arrow
            case 38: {
                cellContent.tabIndex = '-1';
                let cellIndex = getIndex(cell);
                let prevRow = cell.parentElement.previousElementSibling;
                if (prevRow) {
                    let focusCell = prevRow.children[cellIndex].children[0];
                    if (hasClass(focusCell, 'p-disabled')) {
                        this.navigationState = { backward: true };
                        this.navBackward(event);
                    } else {
                        focusCell.tabIndex = '0';
                        focusCell.focus();
                    }
                } else {
                    this.navigationState = { backward: true };
                    this.navBackward(event);
                }
                event.preventDefault();
                break;
            }

            //left arrow
            case 37: {
                cellContent.tabIndex = '-1';
                let prevCell = cell.previousElementSibling;
                if (prevCell) {
                    let focusCell = prevCell.children[0];
                    if (hasClass(focusCell, 'p-disabled') || hasClass(focusCell.parentElement, 'p-datepicker-weeknumber')) {
                        this.navigateToMonth(true, groupIndex);
                    } else {
                        focusCell.tabIndex = '0';
                        focusCell.focus();
                    }
                } else {
                    this.navigateToMonth(true, groupIndex);
                }
                event.preventDefault();
                break;
            }

            //right arrow
            case 39: {
                cellContent.tabIndex = '-1';
                let nextCell = cell.nextElementSibling;
                if (nextCell) {
                    let focusCell = nextCell.children[0];
                    if (hasClass(focusCell, 'p-disabled')) {
                        this.navigateToMonth(false, groupIndex);
                    } else {
                        focusCell.tabIndex = '0';
                        focusCell.focus();
                    }
                } else {
                    this.navigateToMonth(false, groupIndex);
                }
                event.preventDefault();
                break;
            }

            //enter
            //space
            case 13:
            case 32: {
                this.onDateSelect(event, dateMeta);
                event.preventDefault();
                break;
            }

            //escape
            case 27: {
                this.inputfieldViewChild()?.nativeElement.focus();
                this.overlayVisible.set(false);
                event.preventDefault();
                break;
            }

            //tab
            case 9: {
                if (!this.inline()) {
                    this.trapFocus(event);
                }
                break;
            }

            // page up
            case 33: {
                cellContent.tabIndex = '-1';
                const dateToFocus = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
                const focusKey = this.formatDateKey(dateToFocus);
                this.navigateToMonth(true, groupIndex, `span[data-date='${focusKey}']:not(.p-disabled):not(.p-ink)`);
                event.preventDefault();
                break;
            }

            // page down
            case 34: {
                cellContent.tabIndex = '-1';
                const dateToFocus = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
                const focusKey = this.formatDateKey(dateToFocus);
                this.navigateToMonth(false, groupIndex, `span[data-date='${focusKey}']:not(.p-disabled):not(.p-ink)`);
                event.preventDefault();
                break;
            }

            //home
            case 36:
                cellContent.tabIndex = '-1';
                const firstDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                const firstDayDateKey = this.formatDateKey(firstDayDate);
                const firstDayCell = <any>findSingle(cellContent.offsetParent, `span[data-date='${firstDayDateKey}']:not(.p-disabled):not(.p-ink)`);
                if (firstDayCell) {
                    firstDayCell.tabIndex = '0';
                    firstDayCell.focus();
                }
                event.preventDefault();
                break;

            //end
            case 35:
                cellContent.tabIndex = '-1';
                const lastDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
                const lastDayDateKey = this.formatDateKey(lastDayDate);
                const lastDayCell = <any>findSingle(cellContent.offsetParent, `span[data-date='${lastDayDateKey}']:not(.p-disabled):not(.p-ink)`);
                if (lastDayDate) {
                    lastDayCell.tabIndex = '0';
                    lastDayCell.focus();
                }
                event.preventDefault();
                break;

            default:
                //no op
                break;
        }
    }

    onMonthCellKeydown(event: any, index: number) {
        const cell = event.currentTarget;
        switch (event.which) {
            //arrows
            case 38:
            case 40: {
                cell.tabIndex = '-1';
                var cells = cell.parentElement.children;
                var cellIndex = getIndex(cell);
                let nextCell = cells[event.which === 40 ? cellIndex + 3 : cellIndex - 3];
                if (nextCell) {
                    nextCell.tabIndex = '0';
                    nextCell.focus();
                }
                event.preventDefault();
                break;
            }

            //left arrow
            case 37: {
                cell.tabIndex = '-1';
                let prevCell = cell.previousElementSibling;
                if (prevCell) {
                    prevCell.tabIndex = '0';
                    prevCell.focus();
                } else {
                    this.navigationState = { backward: true };
                    this.navBackward(event);
                }

                event.preventDefault();
                break;
            }

            //right arrow
            case 39: {
                cell.tabIndex = '-1';
                let nextCell = cell.nextElementSibling;
                if (nextCell) {
                    nextCell.tabIndex = '0';
                    nextCell.focus();
                } else {
                    this.navigationState = { backward: false };
                    this.navForward(event);
                }

                event.preventDefault();
                break;
            }

            //enter
            //space
            case 13:
            case 32: {
                this.onMonthSelect(event, index);
                event.preventDefault();
                break;
            }

            //escape
            case 27: {
                this.inputfieldViewChild()?.nativeElement.focus();
                this.overlayVisible.set(false);
                event.preventDefault();
                break;
            }

            //tab
            case 9: {
                if (!this.inline()) {
                    this.trapFocus(event);
                }
                break;
            }

            default:
                //no op
                break;
        }
    }

    onYearCellKeydown(event: any, index: number) {
        const cell = event.currentTarget;

        switch (event.which) {
            //arrows
            case 38:
            case 40: {
                cell.tabIndex = '-1';
                var cells = cell.parentElement.children;
                var cellIndex = getIndex(cell);
                let nextCell = cells[event.which === 40 ? cellIndex + 2 : cellIndex - 2];
                if (nextCell) {
                    nextCell.tabIndex = '0';
                    nextCell.focus();
                }
                event.preventDefault();
                break;
            }

            //left arrow
            case 37: {
                cell.tabIndex = '-1';
                let prevCell = cell.previousElementSibling;
                if (prevCell) {
                    prevCell.tabIndex = '0';
                    prevCell.focus();
                } else {
                    this.navigationState = { backward: true };
                    this.navBackward(event);
                }

                event.preventDefault();
                break;
            }

            //right arrow
            case 39: {
                cell.tabIndex = '-1';
                let nextCell = cell.nextElementSibling;
                if (nextCell) {
                    nextCell.tabIndex = '0';
                    nextCell.focus();
                } else {
                    this.navigationState = { backward: false };
                    this.navForward(event);
                }

                event.preventDefault();
                break;
            }

            //enter
            //space
            case 13:
            case 32: {
                this.onYearSelect(event, index);
                event.preventDefault();
                break;
            }

            //escape
            case 27: {
                this.inputfieldViewChild()?.nativeElement.focus();
                this.overlayVisible.set(false);
                event.preventDefault();
                break;
            }

            //tab
            case 9: {
                this.trapFocus(event);
                break;
            }

            default:
                //no op
                break;
        }
    }

    navigateToMonth(prev: boolean, groupIndex: number, focusKey?: string) {
        if (prev) {
            if (this.numberOfMonths() === 1 || groupIndex === 0) {
                this.navigationState = { backward: true };
                this._focusKey = focusKey;
                this.navBackward(event);
            } else {
                let prevMonthContainer = this.contentViewChild()!.nativeElement.children[groupIndex - 1];
                if (focusKey) {
                    const firstDayCell = <any>findSingle(prevMonthContainer, focusKey);
                    firstDayCell.tabIndex = '0';
                    firstDayCell.focus();
                } else {
                    let cells = <any>find(prevMonthContainer, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                    let focusCell = cells[cells.length - 1];
                    focusCell.tabIndex = '0';
                    focusCell.focus();
                }
            }
        } else {
            if (this.numberOfMonths() === 1 || groupIndex === this.numberOfMonths() - 1) {
                this.navigationState = { backward: false };
                this._focusKey = focusKey;
                this.navForward(event);
            } else {
                let nextMonthContainer = this.contentViewChild()!.nativeElement.children[groupIndex + 1];
                if (focusKey) {
                    const firstDayCell = <any>findSingle(nextMonthContainer, focusKey);
                    firstDayCell.tabIndex = '0';
                    firstDayCell.focus();
                } else {
                    let focusCell = <any>findSingle(nextMonthContainer, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                    focusCell.tabIndex = '0';
                    focusCell.focus();
                }
            }
        }
    }

    updateFocus() {
        let cell;

        if (this.navigationState) {
            if (this.navigationState.button) {
                this.initFocusableCell();

                if (this.navigationState.backward) (findSingle(this.contentViewChild()!.nativeElement, '.p-datepicker-prev-button') as any).focus();
                else (findSingle(this.contentViewChild()!.nativeElement, '.p-datepicker-next-button') as any).focus();
            } else {
                if (this.navigationState.backward) {
                    let cells;

                    if (this.currentView() === 'month') {
                        cells = find(this.contentViewChild()!.nativeElement, '.p-datepicker-month-view .p-datepicker-month:not(.p-disabled)');
                    } else if (this.currentView() === 'year') {
                        cells = find(this.contentViewChild()!.nativeElement, '.p-datepicker-year-view .p-datepicker-year:not(.p-disabled)');
                    } else {
                        cells = find(this.contentViewChild()!.nativeElement, this._focusKey || '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                    }

                    if (cells && cells.length > 0) {
                        cell = cells[cells.length - 1];
                    }
                } else {
                    if (this.currentView() === 'month') {
                        cell = findSingle(this.contentViewChild()!.nativeElement, '.p-datepicker-month-view .p-datepicker-month:not(.p-disabled)');
                    } else if (this.currentView() === 'year') {
                        cell = findSingle(this.contentViewChild()!.nativeElement, '.p-datepicker-year-view .p-datepicker-year:not(.p-disabled)');
                    } else {
                        cell = findSingle(this.contentViewChild()!.nativeElement, this._focusKey || '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                    }
                }

                if (cell) {
                    cell.tabIndex = '0';
                    cell.focus();
                }
            }

            this.navigationState = null;
            this._focusKey = null;
        } else {
            this.initFocusableCell();
        }
    }

    initFocusableCell() {
        const contentEl = this.contentViewChild()?.nativeElement;
        let cell!: any;

        if (this.currentView() === 'month') {
            let cells = find(contentEl, '.p-datepicker-month-view .p-datepicker-month:not(.p-disabled)');
            let selectedCell = <any>findSingle(contentEl, '.p-datepicker-month-view .p-datepicker-month.p-highlight');
            cells.forEach((cell: any) => (cell.tabIndex = -1));
            cell = selectedCell || cells[0];

            if (cells.length === 0) {
                let disabledCells = find(contentEl, '.p-datepicker-month-view .p-datepicker-month.p-disabled[tabindex = "0"]');
                disabledCells.forEach((cell: any) => (cell.tabIndex = -1));
            }
        } else if (this.currentView() === 'year') {
            let cells = find(contentEl, '.p-datepicker-year-view .p-datepicker-year:not(.p-disabled)');
            let selectedCell = findSingle(contentEl, '.p-datepicker-year-view .p-datepicker-year.p-highlight');
            cells.forEach((cell: any) => (cell.tabIndex = -1));
            cell = selectedCell || cells[0];

            if (cells.length === 0) {
                let disabledCells = find(contentEl, '.p-datepicker-year-view .p-datepicker-year.p-disabled[tabindex = "0"]');
                disabledCells.forEach((cell: any) => (cell.tabIndex = -1));
            }
        } else {
            cell = findSingle(contentEl, 'span.p-highlight');
            if (!cell) {
                let todayCell = findSingle(contentEl, 'td.p-datepicker-today span:not(.p-disabled):not(.p-ink)');
                if (todayCell) cell = todayCell;
                else cell = findSingle(contentEl, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
            }
        }

        if (cell) {
            cell.tabIndex = '0';

            if (!this.preventFocus && (!this.navigationState || !this.navigationState.button)) {
                setTimeout(() => {
                    if (!this.$disabled()) {
                        cell.focus();
                    }
                }, 1);
            }

            this.preventFocus = false;
        }
    }

    trapFocus(event: any) {
        let focusableElements = <any>getFocusableElements(this.contentViewChild()!.nativeElement);

        if (focusableElements && focusableElements.length > 0) {
            if (!focusableElements[0].ownerDocument.activeElement) {
                focusableElements[0].focus();
            } else {
                let focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);

                if (event.shiftKey) {
                    if (focusedIndex == -1 || focusedIndex === 0) {
                        if (this.focusTrap()) {
                            focusableElements[focusableElements.length - 1].focus();
                        } else {
                            if (focusedIndex === -1) return this.hideOverlay();
                            else if (focusedIndex === 0) return;
                        }
                    } else {
                        focusableElements[focusedIndex - 1].focus();
                    }
                } else {
                    if (focusedIndex == -1) {
                        if (this.timeOnly()) {
                            focusableElements[0].focus();
                        } else {
                            let spanIndex = 0;

                            for (let i = 0; i < focusableElements.length; i++) {
                                if (focusableElements[i].tagName === 'SPAN') spanIndex = i;
                            }

                            focusableElements[spanIndex].focus();
                        }
                    } else if (focusedIndex === focusableElements.length - 1) {
                        if (!this.focusTrap() && focusedIndex != -1) return this.hideOverlay();

                        focusableElements[0].focus();
                    } else {
                        focusableElements[focusedIndex + 1].focus();
                    }
                }
            }
        }

        event.preventDefault();
    }

    onMonthDropdownChange(m: string) {
        this.currentMonth = parseInt(m);
        this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
        this.createMonths(this.currentMonth, this.currentYear);
    }

    onYearDropdownChange(y: string) {
        this.currentYear = parseInt(y);
        this.onYearChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
        this.createMonths(this.currentMonth, this.currentYear);
    }

    convertTo24Hour(hours: number, pm: boolean) {
        //@ts-ignore
        if (this.hourFormat() == '12') {
            if (hours === 12) {
                return pm ? 12 : 0;
            } else {
                return pm ? hours + 12 : hours;
            }
        }
        return hours;
    }

    constrainTime(hour: number, minute: number, second: number, pm: boolean) {
        let returnTimeTriple: number[] = [hour, minute, second];
        let minHoursExceeds12: boolean = false;
        let value = this.value;
        const convertedHour = this.convertTo24Hour(hour, pm);
        const isRange = this.isRangeSelection(),
            isMultiple = this.isMultipleSelection(),
            isMultiValue = isRange || isMultiple;

        if (isMultiValue) {
            if (!this.value) {
                this.value = [new Date(), new Date()];
            }
            if (isRange) {
                value = this.value[1] || this.value[0];
            }
            if (isMultiple) {
                value = this.value[this.value.length - 1];
            }
        }
        const valueDateString = value ? value.toDateString() : null;
        let isMinDate = this.minDate() && valueDateString && this.minDate()!.toDateString() === valueDateString;
        let isMaxDate = this.maxDate() && valueDateString && this.maxDate()!.toDateString() === valueDateString;

        if (isMinDate) {
            minHoursExceeds12 = this.minDate()!.getHours() >= 12;
        }

        switch (
            true // intentional fall through
        ) {
            case isMinDate && minHoursExceeds12 && this.minDate()!.getHours() === 12 && this.minDate()!.getHours() > convertedHour:
                returnTimeTriple[0] = 11;
            case isMinDate && this.minDate()!.getHours() === convertedHour && this.minDate()!.getMinutes() > minute:
                returnTimeTriple[1] = this.minDate()!.getMinutes();
            case isMinDate && this.minDate()!.getHours() === convertedHour && this.minDate()!.getMinutes() === minute && this.minDate()!.getSeconds() > second:
                returnTimeTriple[2] = this.minDate()!.getSeconds();
                break;
            case isMinDate && !minHoursExceeds12 && this.minDate()!.getHours() - 1 === convertedHour && this.minDate()!.getHours() > convertedHour:
                returnTimeTriple[0] = 11;
                this.pm.set(true);
            case isMinDate && this.minDate()!.getHours() === convertedHour && this.minDate()!.getMinutes() > minute:
                returnTimeTriple[1] = this.minDate()!.getMinutes();
            case isMinDate && this.minDate()!.getHours() === convertedHour && this.minDate()!.getMinutes() === minute && this.minDate()!.getSeconds() > second:
                returnTimeTriple[2] = this.minDate()!.getSeconds();
                break;

            case isMinDate && minHoursExceeds12 && this.minDate()!.getHours() > convertedHour && convertedHour !== 12:
                this.setCurrentHourPM(this.minDate()!.getHours());
                returnTimeTriple[0] = this.currentHour() || 0;
            case isMinDate && this.minDate()!.getHours() === convertedHour && this.minDate()!.getMinutes() > minute:
                returnTimeTriple[1] = this.minDate()!.getMinutes();
            case isMinDate && this.minDate()!.getHours() === convertedHour && this.minDate()!.getMinutes() === minute && this.minDate()!.getSeconds() > second:
                returnTimeTriple[2] = this.minDate()!.getSeconds();
                break;
            case isMinDate && this.minDate()!.getHours() > convertedHour:
                returnTimeTriple[0] = this.minDate()!.getHours();
            case isMinDate && this.minDate()!.getHours() === convertedHour && this.minDate()!.getMinutes() > minute:
                returnTimeTriple[1] = this.minDate()!.getMinutes();
            case isMinDate && this.minDate()!.getHours() === convertedHour && this.minDate()!.getMinutes() === minute && this.minDate()!.getSeconds() > second:
                returnTimeTriple[2] = this.minDate()!.getSeconds();
                break;
            case isMaxDate && this.maxDate()!.getHours() < convertedHour:
                returnTimeTriple[0] = this.maxDate()!.getHours();
            case isMaxDate && this.maxDate()!.getHours() === convertedHour && this.maxDate()!.getMinutes() < minute:
                returnTimeTriple[1] = this.maxDate()!.getMinutes();
            case isMaxDate && this.maxDate()!.getHours() === convertedHour && this.maxDate()!.getMinutes() === minute && this.maxDate()!.getSeconds() < second:
                returnTimeTriple[2] = this.maxDate()!.getSeconds();
                break;
        }

        return returnTimeTriple;
    }

    incrementHour(event: any) {
        const prevHour = this.currentHour() ?? 0;
        let newHour = (this.currentHour() ?? 0) + this.stepHour();
        let newPM = this.pm();
        if (this.hourFormat() == '24') newHour = newHour >= 24 ? newHour - 24 : newHour;
        else if (this.hourFormat() == '12') {
            // Before the AM/PM break, now after
            if (prevHour < 12 && newHour > 11) {
                newPM = !this.pm();
            }
            newHour = newHour >= 13 ? newHour - 12 : newHour;
        }
        this.toggleAMPMIfNotMinDate(newPM!);
        const [hour, minute, second] = this.constrainTime(newHour, this.currentMinute()!, this.currentSecond()!, newPM!);
        this.currentHour.set(hour);
        this.currentMinute.set(minute);
        this.currentSecond.set(second);
        event.preventDefault();
    }

    toggleAMPMIfNotMinDate(newPM: boolean) {
        let value = this.value;
        const valueDateString = value ? value.toDateString() : null;
        let isMinDate = this.minDate() && valueDateString && this.minDate()!.toDateString() === valueDateString;
        if (isMinDate && this.minDate()!.getHours() >= 12) {
            this.pm.set(true);
        } else {
            this.pm.set(newPM);
        }
    }

    onTimePickerElementMouseDown(event: Event, type: number, direction: number) {
        if (!this.$disabled()) {
            this.repeat(event, null, type, direction);
            event.preventDefault();
        }
    }

    onTimePickerElementMouseUp(event: Event) {
        if (!this.$disabled()) {
            this.clearTimePickerTimer();
            this.updateTime();
        }
    }

    onTimePickerElementMouseLeave() {
        if (!this.$disabled() && this.timePickerTimer) {
            this.clearTimePickerTimer();
            this.updateTime();
        }
    }

    repeat(event: Event | null, interval: number | null, type: number | null, direction: number | null) {
        let i = interval || 500;

        this.clearTimePickerTimer();
        this.timePickerTimer = setTimeout(() => {
            this.repeat(event, 100, type, direction);
        }, i);

        switch (type) {
            case 0:
                if (direction === 1) this.incrementHour(event);
                else this.decrementHour(event);
                break;

            case 1:
                if (direction === 1) this.incrementMinute(event);
                else this.decrementMinute(event);
                break;

            case 2:
                if (direction === 1) this.incrementSecond(event);
                else this.decrementSecond(event);
                break;
        }

        this.updateInputfield();
    }

    clearTimePickerTimer() {
        if (this.timePickerTimer) {
            clearTimeout(this.timePickerTimer);
            this.timePickerTimer = null;
        }
    }

    decrementHour(event: any) {
        let newHour = (this.currentHour() ?? 0) - this.stepHour();
        let newPM = this.pm();
        if (this.hourFormat() == '24') newHour = newHour < 0 ? 24 + newHour : newHour;
        else if (this.hourFormat() == '12') {
            // If we were at noon/midnight, then switch
            if (this.currentHour() === 12) {
                newPM = !this.pm();
            }
            newHour = newHour <= 0 ? 12 + newHour : newHour;
        }
        this.toggleAMPMIfNotMinDate(newPM!);
        const [hour, minute, second] = this.constrainTime(newHour, this.currentMinute()!, this.currentSecond()!, newPM!);
        this.currentHour.set(hour);
        this.currentMinute.set(minute);
        this.currentSecond.set(second);
        event.preventDefault();
    }

    incrementMinute(event: any) {
        let newMinute = (this.currentMinute() ?? 0) + this.stepMinute();
        newMinute = newMinute > 59 ? newMinute - 60 : newMinute;
        const [hour, minute, second] = this.constrainTime(this.currentHour() || 0, newMinute, this.currentSecond()!, this.pm()!);
        this.currentHour.set(hour);
        this.currentMinute.set(minute);
        this.currentSecond.set(second);
        event.preventDefault();
    }

    decrementMinute(event: any) {
        let newMinute = (this.currentMinute() ?? 0) - this.stepMinute();
        newMinute = newMinute < 0 ? 60 + newMinute : newMinute;
        const [hour, minute, second] = this.constrainTime(this.currentHour() || 0, newMinute, this.currentSecond() || 0, this.pm()!);
        this.currentHour.set(hour);
        this.currentMinute.set(minute);
        this.currentSecond.set(second);
        event.preventDefault();
    }

    incrementSecond(event: any) {
        let newSecond = <any>this.currentSecond() + this.stepSecond();
        newSecond = newSecond > 59 ? newSecond - 60 : newSecond;
        const [hour, minute, second] = this.constrainTime(this.currentHour() || 0, this.currentMinute() || 0, newSecond, this.pm()!);
        this.currentHour.set(hour);
        this.currentMinute.set(minute);
        this.currentSecond.set(second);
        event.preventDefault();
    }

    decrementSecond(event: any) {
        let newSecond = <any>this.currentSecond() - this.stepSecond();
        newSecond = newSecond < 0 ? 60 + newSecond : newSecond;
        const [hour, minute, second] = this.constrainTime(this.currentHour() || 0, this.currentMinute() || 0, newSecond, this.pm()!);
        this.currentHour.set(hour);
        this.currentMinute.set(minute);
        this.currentSecond.set(second);
        event.preventDefault();
    }

    updateTime() {
        let value = this.value;
        if (this.isRangeSelection()) {
            value = this.value[1] || this.value[0];
        }
        if (this.isMultipleSelection()) {
            value = this.value[this.value.length - 1];
        }
        value = value ? new Date(value.getTime()) : new Date();

        if (this.hourFormat() == '12') {
            if (this.currentHour() === 12) value.setHours(this.pm() ? 12 : 0);
            else value.setHours(this.pm() ? <number>this.currentHour()! + 12 : this.currentHour()!);
        } else {
            value.setHours(this.currentHour()!);
        }

        value.setMinutes(this.currentMinute()!);
        value.setSeconds(this.currentSecond()!);
        if (this.isRangeSelection()) {
            if (this.value[1]) value = [this.value[0], value];
            else value = [value, null];
        }

        if (this.isMultipleSelection()) {
            value = [...this.value.slice(0, -1), value];
        }

        this.updateModel(value);
        this.onSelect.emit(value);
        this.updateInputfield();
    }

    toggleAMPM(event: any) {
        const newPM = !this.pm();
        this.pm.set(newPM);
        const [hour, minute, second] = this.constrainTime(this.currentHour() || 0, this.currentMinute() || 0, this.currentSecond() || 0, newPM);
        this.currentHour.set(hour);
        this.currentMinute.set(minute);
        this.currentSecond.set(second);
        this.updateTime();
        event.preventDefault();
    }

    onUserInput(event: KeyboardEvent | any) {
        // IE 11 Workaround for input placeholder : https://github.com/primefaces/primeng/issues/2026

        if (!this.isKeydown) {
            return;
        }
        this.isKeydown = false;

        let val = (<HTMLInputElement>event.target).value;
        try {
            let value = this.parseValueFromString(val);
            if (this.isValidSelection(value)) {
                this.updateModel(value);
                this.updateUI();
            } else if (this.keepInvalid()) {
                this.updateModel(value);
            }
        } catch (err) {
            //invalid date
            let value = this.keepInvalid() ? val : null;
            this.updateModel(value);
        }

        this.onInput.emit(event);
    }

    isValidSelection(value: any): boolean {
        if (this.isSingleSelection()) {
            return this.isSelectable(value.getDate(), value.getMonth(), value.getFullYear(), false);
        }
        let isValid = value.every((v: any) => this.isSelectable(v.getDate(), v.getMonth(), v.getFullYear(), false));
        if (isValid && this.isRangeSelection()) {
            isValid = value.length === 1 || (value.length > 1 && value[1] >= value[0]);
        }
        return isValid;
    }

    parseValueFromString(text: string): Date | Date[] | null {
        if (!text || text.trim().length === 0) {
            return null;
        }

        let value: any;

        if (this.isSingleSelection()) {
            value = this.parseDateTime(text);
        } else if (this.isMultipleSelection()) {
            let tokens = text.split(this.multipleSeparator());
            value = [];
            for (let token of tokens) {
                value.push(this.parseDateTime(token.trim()));
            }
        } else if (this.isRangeSelection()) {
            let tokens = text.split(' ' + this.rangeSeparator() + ' ');
            value = [];
            for (let i = 0; i < tokens.length; i++) {
                value[i] = this.parseDateTime(tokens[i].trim());
            }
        }

        return value;
    }

    parseDateTime(text: any): Date {
        let date: Date;
        let parts: string[] = text.split(' ');

        if (this.timeOnly()) {
            date = new Date();
            this.populateTime(date, parts[0], parts[1]);
        } else {
            const dateFormat = this.getDateFormat();
            if (this.showTime()) {
                let ampm = this.hourFormat() == '12' ? parts.pop() : null;
                let timeString = parts.pop();

                date = this.parseDate(parts.join(' '), dateFormat);
                this.populateTime(date, timeString, ampm);
            } else {
                date = this.parseDate(text, dateFormat);
            }
        }

        return date;
    }

    populateTime(value: any, timeString: any, ampm: any) {
        if (this.hourFormat() == '12' && !ampm) {
            throw 'Invalid Time';
        }

        this.pm.set(ampm === 'PM' || ampm === 'pm');
        let time = this.parseTime(timeString);
        value.setHours(time.hour);
        value.setMinutes(time.minute);
        value.setSeconds(time.second);
    }

    isValidDate(date: any) {
        return isDate(date) && isNotEmpty(date);
    }

    updateUI() {
        let propValue = this.value;
        if (Array.isArray(propValue)) {
            propValue = propValue.length === 2 ? propValue[1] : propValue[0];
        }

        let val = this.defaultDate() && this.isValidDate(this.defaultDate()) && !this.value ? this.defaultDate() : propValue && this.isValidDate(propValue) ? propValue : new Date();

        this.currentMonth = val.getMonth();
        this.currentYear = val.getFullYear();
        this.createMonths(this.currentMonth, this.currentYear);

        if (this.showTime() || this.timeOnly()) {
            this.setCurrentHourPM(val.getHours());
            this.currentMinute.set(val.getMinutes());
            this.currentSecond.set(this.showSeconds() ? val.getSeconds() : 0);
        }
    }

    showOverlay() {
        if (!this.overlayVisible()) {
            this.updateUI();

            if (!this.touchUI()) {
                this.preventFocus = true;
            }

            this.overlayMinWidth = this.el.nativeElement.offsetWidth;
            this.overlayVisible.set(true);
        }
    }

    hideOverlay() {
        this.inputfieldViewChild()?.nativeElement.focus();
        this.overlayVisible.set(false);
        this.clearTimePickerTimer();

        if (this.touchUI()) {
            this.disableModality();
        }
    }

    toggle() {
        if (!this.inline()) {
            if (!this.overlayVisible()) {
                this.showOverlay();
                this.inputfieldViewChild()?.nativeElement.focus();
            } else {
                this.hideOverlay();
            }
        }
    }

    onOverlayBeforeEnter(event: MotionEvent) {
        this.overlay = event.element as HTMLElement;
        this.$attrSelector && this.overlay!.setAttribute(this.$attrSelector, '');
        const styles = !this.inline() ? { position: 'absolute', top: '0', minWidth: `${this.overlayMinWidth}px` } : undefined;
        addStyle(this.overlay!, styles || {});
        this.appendOverlay();
        this.alignOverlay();
        this.setZIndex();
        this.updateFocus();
        this.bindListeners();
        this.onShow.emit(event.element as HTMLElement);
    }

    onOverlayAfterLeave(event: MotionEvent) {
        if (this.autoZIndex()) {
            ZIndexUtils.clear(event.element as HTMLElement);
        }
        this.restoreOverlayAppend();
        this.onOverlayHide();

        this.onClose.emit(event.element as HTMLElement);
    }

    appendOverlay() {
        if (this.$appendTo() && this.$appendTo() !== 'self') {
            if (this.$appendTo() === 'body') this.document.body.appendChild(<HTMLElement>this.overlay);
            else appendChild(this.$appendTo(), this.overlay!);
        }
    }

    restoreOverlayAppend() {
        if (this.overlay && this.$appendTo() !== 'self') {
            this.el.nativeElement.appendChild(this.overlay!);
        }
    }

    alignOverlay() {
        if (this.touchUI()) {
            this.enableModality(this.overlay);
        } else if (this.overlay) {
            if (this.$appendTo() && this.$appendTo() !== 'self') {
                absolutePosition(this.overlay, this.inputfieldViewChild()?.nativeElement);
            } else {
                relativePosition(this.overlay, this.inputfieldViewChild()?.nativeElement);
            }
        }
    }

    bindListeners() {
        this.bindDocumentClickListener();
        this.bindDocumentResizeListener();
        this.bindScrollListener();
    }

    setZIndex() {
        if (this.autoZIndex()) {
            if (this.touchUI()) ZIndexUtils.set('modal', this.overlay, this.baseZIndex() || this.config.zIndex.modal);
            else ZIndexUtils.set('overlay', this.overlay, this.baseZIndex() || this.config.zIndex.overlay);
        }
    }

    enableModality(element: any) {
        if (!this.mask && this.touchUI()) {
            this.mask = this.renderer.createElement('div');
            this.renderer.setStyle(this.mask, 'zIndex', String(parseInt(element.style.zIndex) - 1));
            let maskStyleClass = 'p-overlay-mask p-datepicker-mask p-datepicker-mask-scrollblocker p-overlay-mask p-overlay-mask-enter-active';
            addClass(this.mask!, maskStyleClass);

            this.maskClickListener = this.renderer.listen(this.mask, 'click', (event: any) => {
                this.disableModality();
                this.overlayVisible.set(false);
            });
            this.renderer.appendChild(this.document.body, this.mask);
            blockBodyScroll();
        }
    }

    disableModality() {
        if (this.mask) {
            addClass(this.mask, 'p-overlay-mask-leave');
            if (!this.animationEndListener) {
                this.animationEndListener = this.renderer.listen(this.mask, 'animationend', this.destroyMask.bind(this));
            }
        }
    }

    destroyMask() {
        if (!this.mask) {
            return;
        }
        this.renderer.removeChild(this.document.body, this.mask);
        let bodyChildren = this.document.body.children;
        let hasBlockerMasks!: boolean;
        for (let i = 0; i < bodyChildren.length; i++) {
            let bodyChild = bodyChildren[i];
            if (hasClass(bodyChild, 'p-datepicker-mask-scrollblocker')) {
                hasBlockerMasks = true;
                break;
            }
        }

        if (!hasBlockerMasks) {
            unblockBodyScroll();
        }

        this.unbindAnimationEndListener();
        this.unbindMaskClickListener();
        this.mask = null;
    }

    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }

    unbindAnimationEndListener() {
        if (this.animationEndListener && this.mask) {
            this.animationEndListener();
            this.animationEndListener = null;
        }
    }

    getDateFormat() {
        return this.dateFormat() || this.translate('dateFormat');
    }

    getFirstDateOfWeek() {
        return this.firstDayOfWeek() ?? this.translate(TranslationKeys.FIRST_DAY_OF_WEEK);
    }

    // Ported from jquery-ui datepicker formatDate
    formatDate(date: any, format: any) {
        if (!date) {
            return '';
        }

        let iFormat!: any;
        const lookAhead = (match: string) => {
                const matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                if (matches) {
                    iFormat++;
                }
                return matches;
            },
            formatNumber = (match: string, value: any, len: any) => {
                let num = '' + value;
                if (lookAhead(match)) {
                    while (num.length < len) {
                        num = '0' + num;
                    }
                }
                return num;
            },
            formatName = (match: string, value: any, shortNames: any, longNames: any) => {
                return lookAhead(match) ? longNames[value] : shortNames[value];
            };
        let output = '';
        let literal = false;

        if (date) {
            for (iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                        literal = false;
                    } else {
                        output += format.charAt(iFormat);
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                        case 'd':
                            output += formatNumber('d', date.getDate(), 2);
                            break;
                        case 'D':
                            output += formatName('D', date.getDay(), this.translate(TranslationKeys.DAY_NAMES_SHORT), this.translate(TranslationKeys.DAY_NAMES));
                            break;
                        case 'o':
                            output += formatNumber('o', Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                            break;
                        case 'm':
                            output += formatNumber('m', date.getMonth() + 1, 2);
                            break;
                        case 'M':
                            output += formatName('M', date.getMonth(), this.translate(TranslationKeys.MONTH_NAMES_SHORT), this.translate(TranslationKeys.MONTH_NAMES));
                            break;
                        case 'y':
                            output += lookAhead('y') ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? '0' : '') + (date.getFullYear() % 100);
                            break;
                        case '@':
                            output += date.getTime();
                            break;
                        case '!':
                            output += date.getTime() * 10000 + <number>this.ticksTo1970;
                            break;
                        case "'":
                            if (lookAhead("'")) {
                                output += "'";
                            } else {
                                literal = true;
                            }
                            break;
                        default:
                            output += format.charAt(iFormat);
                    }
                }
            }
        }
        return output;
    }

    formatTime(date: any) {
        if (!date) {
            return '';
        }

        let output = '';
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        if (this.hourFormat() == '12' && hours > 11 && hours != 12) {
            hours -= 12;
        }

        if (this.hourFormat() == '12') {
            output += hours === 0 ? 12 : hours < 10 ? '0' + hours : hours;
        } else {
            output += hours < 10 ? '0' + hours : hours;
        }
        output += ':';
        output += minutes < 10 ? '0' + minutes : minutes;

        if (this.showSeconds()) {
            output += ':';
            output += seconds < 10 ? '0' + seconds : seconds;
        }

        if (this.hourFormat() == '12') {
            output += date.getHours() > 11 ? ' PM' : ' AM';
        }

        return output;
    }

    parseTime(value: any) {
        let tokens: string[] = value.split(':');
        let validTokenLength = this.showSeconds() ? 3 : 2;

        if (tokens.length !== validTokenLength) {
            throw 'Invalid time';
        }

        let h = parseInt(tokens[0]);
        let m = parseInt(tokens[1]);
        let s = this.showSeconds() ? parseInt(tokens[2]) : null;

        if (isNaN(h) || isNaN(m) || h > 23 || m > 59 || (this.hourFormat() == '12' && h > 12) || (this.showSeconds() && (isNaN(<any>s) || <any>s > 59))) {
            throw 'Invalid time';
        } else {
            if (this.hourFormat() == '12') {
                if (h !== 12 && this.pm()) {
                    h += 12;
                } else if (!this.pm() && h === 12) {
                    h -= 12;
                }
            }

            return { hour: h, minute: m, second: s };
        }
    }

    // Ported from jquery-ui datepicker parseDate
    parseDate(value: any, format: any) {
        if (format == null || value == null) {
            throw 'Invalid arguments';
        }

        value = typeof value === 'object' ? value.toString() : value + '';
        if (value === '') {
            return null;
        }

        let iFormat!: any,
            dim,
            extra,
            iValue = 0,
            shortYearCutoff = typeof this.shortYearCutoff() !== 'string' ? this.shortYearCutoff() : (new Date().getFullYear() % 100) + parseInt(this.shortYearCutoff(), 10),
            year = -1,
            month = -1,
            day = -1,
            doy = -1,
            literal = false,
            date,
            lookAhead = (match: any) => {
                let matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                if (matches) {
                    iFormat++;
                }
                return matches;
            },
            getNumber = (match: any) => {
                let isDoubled = lookAhead(match),
                    size = match === '@' ? 14 : match === '!' ? 20 : match === 'y' && isDoubled ? 4 : match === 'o' ? 3 : 2,
                    minSize = match === 'y' ? size : 1,
                    digits = new RegExp('^\\d{' + minSize + ',' + size + '}'),
                    num = value.substring(iValue).match(digits);
                if (!num) {
                    throw 'Missing number at position ' + iValue;
                }
                iValue += num[0].length;
                return parseInt(num[0], 10);
            },
            getName = (match: any, shortNames: any, longNames: any) => {
                let index = -1;
                let arr = lookAhead(match) ? longNames : shortNames;
                let names = [];

                for (let i = 0; i < arr.length; i++) {
                    (names as any[]).push([i, arr[i]]);
                }
                (names as any[]).sort((a, b) => {
                    return -((a as any)[1].length - (b as any)[1].length);
                });

                for (let i = 0; i < (names as any[]).length; i++) {
                    let name = (names as any[])[i][1];
                    if (value.substr(iValue, (name as string).length).toLowerCase() === (name as string).toLowerCase()) {
                        index = (names as any[])[i][0];
                        iValue += (name as string).length;
                        break;
                    }
                }

                if (index !== -1) {
                    return index + 1;
                } else {
                    throw 'Unknown name at position ' + iValue;
                }
            },
            checkLiteral = () => {
                if (value.charAt(iValue) !== format.charAt(iFormat)) {
                    throw 'Unexpected literal at position ' + iValue;
                }
                iValue++;
            };

        if (this.view() === 'month') {
            day = 1;
        }

        for (iFormat = 0; iFormat < format.length; iFormat++) {
            if (literal) {
                if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                    literal = false;
                } else {
                    checkLiteral();
                }
            } else {
                switch (format.charAt(iFormat)) {
                    case 'd':
                        day = getNumber('d');
                        break;
                    case 'D':
                        getName('D', this.translate(TranslationKeys.DAY_NAMES_SHORT), this.translate(TranslationKeys.DAY_NAMES));
                        break;
                    case 'o':
                        doy = getNumber('o');
                        break;
                    case 'm':
                        month = getNumber('m');
                        break;
                    case 'M':
                        month = getName('M', this.translate(TranslationKeys.MONTH_NAMES_SHORT), this.translate(TranslationKeys.MONTH_NAMES));
                        break;
                    case 'y':
                        year = getNumber('y');
                        break;
                    case '@':
                        date = new Date(getNumber('@'));
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case '!':
                        date = new Date((getNumber('!') - <number>this.ticksTo1970) / 10000);
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "'":
                        if (lookAhead("'")) {
                            checkLiteral();
                        } else {
                            literal = true;
                        }
                        break;
                    default:
                        checkLiteral();
                }
            }
        }

        if (iValue < value.length) {
            extra = value.substr(iValue);
            if (!/^\s+/.test(extra)) {
                throw 'Extra/unparsed characters found in date: ' + extra;
            }
        }

        if (year === -1) {
            year = new Date().getFullYear();
        } else if (year < 100) {
            year += new Date().getFullYear() - (new Date().getFullYear() % 100) + (year <= shortYearCutoff ? 0 : -100);
        }

        if (doy > -1) {
            month = 1;
            day = doy;
            do {
                dim = this.getDaysCountInMonth(year, month - 1);
                if (day <= dim) {
                    break;
                }
                month++;
                day -= dim;
            } while (true);
        }

        if (this.view() === 'year') {
            month = month === -1 ? 1 : month;
            day = day === -1 ? 1 : day;
        }

        date = this.daylightSavingAdjust(new Date(year, month - 1, day));

        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
            throw 'Invalid date'; // E.g. 31/02/00
        }

        return date;
    }

    daylightSavingAdjust(date: any) {
        if (!date) {
            return null;
        }

        date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);

        return date;
    }

    isValidDateForTimeConstraints(selectedDate: Date) {
        if (this.keepInvalid()) {
            return true; // If we are keeping invalid dates, we don't need to check for time constraints
        }
        return (!this.minDate() || selectedDate >= this.minDate()!) && (!this.maxDate() || selectedDate <= this.maxDate()!);
    }

    onTodayButtonClick(event: any) {
        const date: Date = new Date();
        const dateMeta = {
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            otherMonth: date.getMonth() !== this.currentMonth || date.getFullYear() !== this.currentYear,
            today: true,
            selectable: true
        };

        this.createMonths(date.getMonth(), date.getFullYear());
        this.onDateSelect(event, dateMeta);
        this.onTodayClick.emit(date);
    }

    onClearButtonClick(event: any) {
        this.updateModel(null);
        this.updateInputfield();
        this.hideOverlay();
        this.onClearClick.emit(event);
    }

    createResponsiveStyle() {
        if (this.numberOfMonths() > 1 && this.responsiveOptions()) {
            if (!this.responsiveStyleElement) {
                this.responsiveStyleElement = this.renderer.createElement('style');
                (<HTMLStyleElement>this.responsiveStyleElement).type = 'text/css';
                setAttribute(this.responsiveStyleElement!, 'nonce', this.config?.csp()?.nonce);
                this.renderer.appendChild(this.document.body, this.responsiveStyleElement);
            }

            let innerHTML = '';
            if (this.responsiveOptions()) {
                let responsiveOptions = [...(this.responsiveOptions() || [])].filter((o) => !!(o.breakpoint && o.numMonths)).sort((o1: any, o2: any) => -1 * o1.breakpoint.localeCompare(o2.breakpoint, undefined, { numeric: true }));

                for (let i = 0; i < responsiveOptions.length; i++) {
                    let { breakpoint, numMonths } = responsiveOptions[i];
                    let styles = `
                        .p-datepicker[${this.attributeSelector}] .p-datepicker-group:nth-child(${numMonths}) .p-datepicker-next {
                            display: inline-flex !important;
                        }
                    `;

                    for (let j: number = <number>numMonths; j < this.numberOfMonths(); j++) {
                        styles += `
                            .p-datepicker[${this.attributeSelector}] .p-datepicker-group:nth-child(${j + 1}) {
                                display: none !important;
                            }
                        `;
                    }

                    innerHTML += `
                        @media screen and (max-width: ${breakpoint}) {
                            ${styles}
                        }
                    `;
                }
            }

            (<HTMLStyleElement>this.responsiveStyleElement).innerHTML = innerHTML;
            setAttribute(this.responsiveStyleElement!, 'nonce', this.config?.csp()?.nonce);
        }
    }

    destroyResponsiveStyleElement() {
        if (this.responsiveStyleElement) {
            this.responsiveStyleElement.remove();
            this.responsiveStyleElement = null;
        }
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : this.document;

            this.documentClickListener = this.renderer.listen(documentTarget, 'mousedown', (event) => {
                if (this.isOutsideClicked(event) && this.overlayVisible()) {
                    this.hideOverlay();
                    this.onClickOutside.emit(event);
                }
            });
        }
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }

    bindDocumentResizeListener() {
        if (!this.documentResizeListener && !this.touchUI()) {
            this.documentResizeListener = this.renderer.listen(this.window, 'resize', this.onWindowResize.bind(this));
        }
    }

    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }

    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.el?.nativeElement, () => {
                if (this.overlayVisible()) {
                    this.hideOverlay();
                }
            });
        }

        this.scrollHandler.bindScrollListener();
    }

    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }

    isOutsideClicked(event: Event) {
        return !(this.el.nativeElement.isSameNode(event.target) || this.isNavIconClicked(event) || this.el.nativeElement.contains(event.target) || (this.overlay && this.overlay.contains(<Node>event.target)));
    }

    isNavIconClicked(event: any) {
        return hasClass(event.target, 'p-datepicker-prev-button') || hasClass(event.target, 'p-datepicker-prev-icon') || hasClass(event.target, 'p-datepicker-next-button') || hasClass(event.target, 'p-datepicker-next-icon');
    }

    onWindowResize() {
        if (this.overlayVisible() && !isTouchDevice()) {
            this.hideOverlay();
        }
    }

    onOverlayHide() {
        this.currentView.set(this.view());

        if (this.mask) {
            this.destroyMask();
        }

        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
        this.overlay = null;
    }

    /**
     * @override
     *
     * @see {@link BaseEditableHolder.writeControlValue}
     * Writes the value to the control.
     */
    writeControlValue(value: any): void {
        this.value = value;
        if (this.value && typeof this.value === 'string') {
            try {
                this.value = this.parseValueFromString(this.value);
            } catch {
                if (this.keepInvalid()) {
                    this.value = value;
                }
            }
        }

        this.updateInputfield();
        this.updateUI();
    }

    onDestroy() {
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }

        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe();
        }

        if (this.overlay && this.autoZIndex()) {
            ZIndexUtils.clear(this.overlay);
        }

        this.destroyResponsiveStyleElement();
        this.clearTimePickerTimer();
        this.restoreOverlayAppend();
        this.onOverlayHide();
    }
}

@NgModule({
    imports: [DatePicker, SharedModule],
    exports: [DatePicker, SharedModule]
})
export class DatePickerModule {}
