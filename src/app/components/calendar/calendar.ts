import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    inject,
    Inject,
    Input,
    NgModule,
    NgZone,
    numberAttribute,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayService, PrimeNGConfig, PrimeTemplate, SharedModule, TranslationKeys } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConnectedOverlayScrollHandler, DomHandler } from 'primeng/dom';
import { RippleModule } from 'primeng/ripple';
import { ObjectUtils, UniqueComponentId, ZIndexUtils } from 'primeng/utils';
import { Subscription } from 'rxjs';
import { ChevronLeftIcon } from 'primeng/icons/chevronleft';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { ChevronUpIcon } from 'primeng/icons/chevronup';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { TimesIcon } from 'primeng/icons/times';
import { CalendarIcon } from 'primeng/icons/calendar';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { NavigationState, CalendarResponsiveOptions, CalendarTypeView, LocaleSettings, Month, CalendarMonthChangeEvent, CalendarYearChangeEvent } from './calendar.interface';
import { AutoFocusModule } from 'primeng/autofocus';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerStyle } from './style/datepickerstyle';
import { BaseComponent } from 'primeng/basecomponent';

export const CALENDAR_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Calendar),
    multi: true
};
/**
 * Calendar also known as DatePicker, is a form component to work with dates.
 * @group Components
 */
@Component({
    selector: 'p-calendar',
    template: `
        <span #container [ngClass]="rootClass" [ngStyle]="style" [class]="styleClass">
            <ng-template [ngIf]="!inline">
                <input
                    #inputfield
                    pInputText
                    type="text"
                    role="combobox"
                    [attr.id]="inputId"
                    [attr.name]="name"
                    [attr.required]="required"
                    [attr.aria-required]="required"
                    aria-autocomplete="none"
                    aria-haspopup="dialog"
                    [attr.aria-expanded]="overlayVisible ?? false"
                    [attr.aria-controls]="overlayVisible ? panelId : null"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.aria-label]="ariaLabel"
                    [value]="inputFieldValue"
                    (focus)="onInputFocus($event)"
                    (keydown)="onInputKeydown($event)"
                    (click)="onInputClick()"
                    (blur)="onInputBlur($event)"
                    [readonly]="readonlyInput"
                    (input)="onUserInput($event)"
                    [ngStyle]="inputStyle"
                    [class]="inputStyleClass"
                    ngClass="p-datepicker-input"
                    [placeholder]="placeholder || ''"
                    [disabled]="disabled"
                    [attr.tabindex]="tabindex"
                    [attr.inputmode]="touchUI ? 'off' : null"
                    autocomplete="off"
                    pAutoFocus
                    [autofocus]="autofocus"
                    [variant]="variant"
                />
                <ng-container *ngIf="showClear && !disabled && value != null">
                    <TimesIcon *ngIf="!clearIconTemplate" [class]="'p-datepicker-clear-icon'" (click)="clear()" />
                    <span *ngIf="clearIconTemplate" class="p-datepicker-clear-icon" (click)="clear()">
                        <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                    </span>
                </ng-container>
                <button
                    type="button"
                    [attr.aria-label]="iconButtonAriaLabel"
                    aria-haspopup="dialog"
                    [attr.aria-expanded]="overlayVisible ?? false"
                    [attr.aria-controls]="overlayVisible ? panelId : null"
                    *ngIf="showIcon && iconDisplay === 'button'"
                    (click)="onButtonClick($event, inputfield)"
                    class="p-datepicker-dropdown"
                    [disabled]="disabled"
                    tabindex="0"
                >
                    <span *ngIf="icon" [ngClass]="icon"></span>
                    <ng-container *ngIf="!icon">
                        <CalendarIcon *ngIf="!triggerIconTemplate" />
                        <ng-template *ngTemplateOutlet="triggerIconTemplate"></ng-template>
                    </ng-container>
                </button>
                <ng-container *ngIf="iconDisplay === 'input' && showIcon">
                    <span class="p-datepicker-input-icon-container">
                        <CalendarIcon
                            (click)="onButtonClick($event)"
                            *ngIf="!inputIconTemplate"
                            [ngClass]="{
                                'p-datepicker-input-icon': showOnFocus
                            }"
                        />

                        <ng-container *ngTemplateOutlet="inputIconTemplate; context: { clickCallBack: onButtonClick.bind(this) }"></ng-container>
                    </span>
                </ng-container>
            </ng-template>
            <div
                #contentWrapper
                [attr.id]="panelId"
                [class]="panelStyleClass"
                [ngStyle]="panelStyle"
                [ngClass]="panelClass"
                [@overlayAnimation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
                [attr.aria-label]="getTranslation('chooseDate')"
                [attr.role]="inline ? null : 'dialog'"
                [attr.aria-modal]="inline ? null : 'true'"
                [@.disabled]="inline === true"
                (@overlayAnimation.start)="onOverlayAnimationStart($event)"
                (@overlayAnimation.done)="onOverlayAnimationDone($event)"
                (click)="onOverlayClick($event)"
                *ngIf="inline || overlayVisible"
            >
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                <ng-container *ngIf="!timeOnly">
                    <div class="p-datepicker-calendar-container">
                        <div class="p-datepicker-calendar" *ngFor="let month of months; let i = index">
                            <div class="p-datepicker-header">
                                <p-button
                                    size="small"
                                    rounded
                                    text
                                    (keydown)="onContainerButtonKeydown($event)"
                                    styleClass="p-datepicker-prev-button p-button-icon-only"
                                    (onClick)="onPrevButtonClick($event)"
                                    [ngStyle]="{ visibility: i === 0 ? 'visible' : 'hidden' }"
                                    type="button"
                                    [attr.aria-label]="prevIconAriaLabel"
                                >
                                    <ChevronLeftIcon *ngIf="!previousIconTemplate" />
                                    <span *ngIf="previousIconTemplate">
                                        <ng-template *ngTemplateOutlet="previousIconTemplate"></ng-template>
                                    </span>
                                </p-button>
                                <div class="p-datepicker-title">
                                    <button
                                        *ngIf="currentView === 'date'"
                                        type="button"
                                        (click)="switchToMonthView($event)"
                                        (keydown)="onContainerButtonKeydown($event)"
                                        class="p-datepicker-select-month"
                                        [disabled]="switchViewButtonDisabled()"
                                        [attr.aria-label]="this.getTranslation('chooseMonth')"
                                        pRipple
                                    >
                                        {{ getMonthName(month.month) }}
                                    </button>
                                    <button
                                        *ngIf="currentView !== 'year'"
                                        type="button"
                                        (click)="switchToYearView($event)"
                                        (keydown)="onContainerButtonKeydown($event)"
                                        class="p-datepicker-select-year"
                                        [disabled]="switchViewButtonDisabled()"
                                        [attr.aria-label]="getTranslation('chooseYear')"
                                        pRipple
                                    >
                                        {{ getYear(month) }}
                                    </button>
                                    <span class="p-datepicker-decade" *ngIf="currentView === 'year'">
                                        <ng-container *ngIf="!decadeTemplate">{{ yearPickerValues()[0] }} - {{ yearPickerValues()[yearPickerValues().length - 1] }}</ng-container>
                                        <ng-container *ngTemplateOutlet="decadeTemplate; context: { $implicit: yearPickerValues }"></ng-container>
                                    </span>
                                </div>
                                <p-button
                                    rounded
                                    text
                                    size="small"
                                    (keydown)="onContainerButtonKeydown($event)"
                                    styleClass="p-datepicker-next-button p-button-icon-only"
                                    (onClick)="onNextButtonClick($event)"
                                    [ngStyle]="{ visibility: i === months.length - 1 ? 'visible' : 'hidden' }"
                                    [attr.aria-label]="nextIconAriaLabel"
                                >
                                    <ChevronRightIcon *ngIf="!nextIconTemplate" />

                                    <span *ngIf="nextIconTemplate">
                                        <ng-template *ngTemplateOutlet="nextIconTemplate"></ng-template>
                                    </span>
                                </p-button>
                            </div>
                            <table class="p-datepicker-day-view" role="grid" *ngIf="currentView === 'date'">
                                <thead>
                                    <tr>
                                        <th *ngIf="showWeek" class="p-datepicker-weekheader p-disabled">
                                            <span>{{ getTranslation('weekHeader') }}</span>
                                        </th>
                                        <th class="p-datepicker-weekday-cell" scope="col" *ngFor="let weekDay of weekDays; let begin = first; let end = last">
                                            <span class="p-datepicker-weekday">{{ weekDay }}</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr *ngFor="let week of month.dates; let j = index">
                                        <td *ngIf="showWeek" class="p-datepicker-weeknumber">
                                            <span class="p-datepicker-weeklabel-container p-disabled">
                                                {{ month.weekNumbers[j] }}
                                            </span>
                                        </td>
                                        <td *ngFor="let date of week" [attr.aria-label]="date.day" [ngClass]="{ 'p-datepicker-day-cell': true, 'p-datepicker-other-month': date.otherMonth, 'p-datepicker-today': date.today }">
                                            <ng-container *ngIf="date.otherMonth ? showOtherMonths : true">
                                                <span
                                                    [ngClass]="dayClass(date)"
                                                    (click)="onDateSelect($event, date)"
                                                    draggable="false"
                                                    [attr.data-date]="formatDateKey(formatDateMetaToDate(date))"
                                                    (keydown)="onDateCellKeydown($event, date, i)"
                                                    pRipple
                                                >
                                                    <ng-container *ngIf="!dateTemplate && (date.selectable || !disabledDateTemplate)">{{ date.day }}</ng-container>
                                                    <ng-container *ngIf="date.selectable || !disabledDateTemplate">
                                                        <ng-container *ngTemplateOutlet="dateTemplate; context: { $implicit: date }"></ng-container>
                                                    </ng-container>
                                                    <ng-container *ngIf="!date.selectable">
                                                        <ng-container *ngTemplateOutlet="disabledDateTemplate; context: { $implicit: date }"></ng-container>
                                                    </ng-container>
                                                </span>
                                                <div *ngIf="isSelected(date)" class="p-hidden-accessible" aria-live="polite">
                                                    {{ date.day }}
                                                </div>
                                            </ng-container>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="p-datepicker-month-view" *ngIf="currentView === 'month'">
                        <span
                            *ngFor="let m of monthPickerValues(); let i = index"
                            (click)="onMonthSelect($event, i)"
                            (keydown)="onMonthCellKeydown($event, i)"
                            [ngClass]="{ 'p-datepicker-month': true, 'p-datepicker-month-selected': isMonthSelected(i), 'p-disabled': isMonthDisabled(i) }"
                            pRipple
                        >
                            {{ m }}
                            <div *ngIf="isMonthSelected(i)" class="p-hidden-accessible" aria-live="polite">
                                {{ m }}
                            </div>
                        </span>
                    </div>
                    <div class="p-datepicker-year-view" *ngIf="currentView === 'year'">
                        <span
                            *ngFor="let y of yearPickerValues()"
                            (click)="onYearSelect($event, y)"
                            (keydown)="onYearCellKeydown($event, y)"
                            [ngClass]="{ 'p-datepicker-year': true, 'p-datepicker-year-selected': isYearSelected(y), 'p-disabled': isYearDisabled(y) }"
                            pRipple
                        >
                            {{ y }}
                            <div *ngIf="isYearSelected(y)" class="p-hidden-accessible" aria-live="polite">
                                {{ y }}
                            </div>
                        </span>
                    </div>
                </ng-container>
                <div class="p-datepicker-time-picker" *ngIf="(showTime || timeOnly) && currentView === 'date'">
                    <div class="p-datepicker-hour-picker">
                        <p-button
                            rounded
                            text
                            size="small"
                            styleClass="p-datepicker-increment-button p-button-icon-only"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="incrementHour($event)"
                            (keydown.space)="incrementHour($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 0, 1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('nextHour')"
                        >
                            <ChevronUpIcon *ngIf="!incrementIconTemplate" />

                            <ng-template *ngTemplateOutlet="incrementIconTemplate"></ng-template>
                        </p-button>
                        <span><ng-container *ngIf="currentHour < 10">0</ng-container>{{ currentHour }}</span>
                        <p-button
                            rounded
                            text
                            size="small"
                            styleClass="p-datepicker-increment-button p-button-icon-only"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="decrementHour($event)"
                            (keydown.space)="decrementHour($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 0, -1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('prevHour')"
                        >
                            <ChevronDownIcon *ngIf="!decrementIconTemplate" />

                            <ng-template *ngTemplateOutlet="decrementIconTemplate"></ng-template>
                        </p-button>
                    </div>
                    <div class="p-datepicker-separator">
                        <span>{{ timeSeparator }}</span>
                    </div>
                    <div class="p-datepicker-minute-picker">
                        <p-button
                            rounded
                            text
                            size="small"
                            styleClass="p-datepicker-increment-button p-button-icon-only"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="incrementMinute($event)"
                            (keydown.space)="incrementMinute($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 1, 1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('nextMinute')"
                        >
                            <ChevronUpIcon *ngIf="!incrementIconTemplate" />

                            <ng-template *ngTemplateOutlet="incrementIconTemplate"></ng-template>
                        </p-button>
                        <span><ng-container *ngIf="currentMinute < 10">0</ng-container>{{ currentMinute }}</span>
                        <p-button
                            rounded
                            text
                            size="small"
                            styleClass="p-datepicker-increment-button p-button-icon-only"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="decrementMinute($event)"
                            (keydown.space)="decrementMinute($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 1, -1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('prevMinute')"
                        >
                            <ChevronDownIcon *ngIf="!decrementIconTemplate" />
                            <ng-container *ngIf="decrementIconTemplate">
                                <ng-template *ngTemplateOutlet="decrementIconTemplate"></ng-template>
                            </ng-container>
                        </p-button>
                    </div>
                    <div class="p-datepicker-separator" *ngIf="showSeconds">
                        <span>{{ timeSeparator }}</span>
                    </div>
                    <div class="p-datepicker-second-picker" *ngIf="showSeconds">
                        <p-button
                            rounded
                            text
                            size="small"
                            styleClass="p-datepicker-increment-button p-button-icon-only"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="incrementSecond($event)"
                            (keydown.space)="incrementSecond($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 2, 1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('nextSecond')"
                        >
                            <ChevronUpIcon *ngIf="!incrementIconTemplate" />

                            <ng-template *ngTemplateOutlet="incrementIconTemplate"></ng-template>
                        </p-button>
                        <span><ng-container *ngIf="currentSecond < 10">0</ng-container>{{ currentSecond }}</span>
                        <p-button
                            rounded
                            text
                            size="small"
                            styleClass="p-datepicker-increment-button p-button-icon-only"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="decrementSecond($event)"
                            (keydown.space)="decrementSecond($event)"
                            (mousedown)="onTimePickerElementMouseDown($event, 2, -1)"
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (keyup.enter)="onTimePickerElementMouseUp($event)"
                            (keyup.space)="onTimePickerElementMouseUp($event)"
                            (mouseleave)="onTimePickerElementMouseLeave()"
                            [attr.aria-label]="getTranslation('prevSecond')"
                        >
                            <ChevronDownIcon *ngIf="!decrementIconTemplate" />

                            <ng-template *ngTemplateOutlet="decrementIconTemplate"></ng-template>
                        </p-button>
                    </div>
                    <div class="p-datepicker-separator" *ngIf="hourFormat == '12'">
                        <span>{{ timeSeparator }}</span>
                    </div>
                    <div class="p-datepicker-ampm-picker" *ngIf="hourFormat == '12'">
                        <p-button
                            size="small"
                            text
                            rounded
                            styleClass="p-datepicker-increment-button p-button-icon-only"
                            (keydown)="onContainerButtonKeydown($event)"
                            (onClick)="toggleAMPM($event)"
                            (keydown.enter)="toggleAMPM($event)"
                            [attr.aria-label]="getTranslation('am')"
                        >
                            <ChevronUpIcon *ngIf="!incrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="incrementIconTemplate"></ng-template>
                        </p-button>
                        <span>{{ pm ? 'PM' : 'AM' }}</span>
                        <p-button
                            size="small"
                            text
                            rounded
                            styleClass="p-datepicker-increment-button p-button-icon-only"
                            (keydown)="onContainerButtonKeydown($event)"
                            (click)="toggleAMPM($event)"
                            (keydown.enter)="toggleAMPM($event)"
                            [attr.aria-label]="getTranslation('pm')"
                        >
                            <ChevronDownIcon *ngIf="!decrementIconTemplate" />
                            <ng-template *ngTemplateOutlet="decrementIconTemplate"></ng-template>
                        </p-button>
                    </div>
                </div>
                <div class="p-datepicker-buttonbar" *ngIf="showButtonBar">
                    <p-button size="small" styleClass="p-datepicker-today-button" [label]="getTranslation('today')" (keydown)="onContainerButtonKeydown($event)" (onClick)="onTodayButtonClick($event)" [ngClass]="[todayButtonStyleClass]" />
                    <p-button size="small" styleClass="p-datepicker-clear-button" [label]="getTranslation('clear')" (keydown)="onContainerButtonKeydown($event)" (onClick)="onClearButtonClick($event)" [ngClass]="[clearButtonStyleClass]" />
                </div>
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </span>
    `,
    animations: [
        trigger('overlayAnimation', [
            state(
                'visibleTouchUI',
                style({
                    transform: 'translate(-50%,-50%)',
                    opacity: 1
                })
            ),
            transition('void => visible', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate('{{showTransitionParams}}', style({ opacity: 1, transform: '*' }))]),
            transition('visible => void', [animate('{{hideTransitionParams}}', style({ opacity: 0 }))]),
            transition('void => visibleTouchUI', [style({ opacity: 0, transform: 'translate3d(-50%, -40%, 0) scale(0.9)' }), animate('{{showTransitionParams}}')]),
            transition('visibleTouchUI => void', [
                animate(
                    '{{hideTransitionParams}}',
                    style({
                        opacity: 0,
                        transform: 'translate3d(-50%, -40%, 0) scale(0.9)'
                    })
                )
            ])
        ])
    ],
    providers: [CALENDAR_VALUE_ACCESSOR, DatePickerStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class Calendar extends BaseComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @Input() iconDisplay: 'input' | 'button' = 'button';
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Inline style of the input field.
     * @group Props
     */
    @Input() inputStyle: { [klass: string]: any } | null | undefined;
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    @Input() inputId: string | undefined;
    /**
     * Name of the input element.
     * @group Props
     */
    @Input() name: string | undefined;
    /**
     * Style class of the input field.
     * @group Props
     */
    @Input() inputStyleClass: string | undefined;
    /**
     * Placeholder text for the input.
     * @group Props
     */
    @Input() placeholder: string | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    @Input() ariaLabelledBy: string | undefined;
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;

    /**
     * Defines a string that labels the icon button for accessibility.
     * @group Props
     */
    @Input() iconAriaLabel: string | undefined;
    /**
     * When specified, disables the component.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) disabled: boolean | undefined;
    /**
     * Format of the date which can also be defined at locale settings.
     * @group Props
     */
    @Input() dateFormat: string | undefined;
    /**
     * Separator for multiple selection mode.
     * @group Props
     */
    @Input() multipleSeparator: string = ',';
    /**
     * Separator for joining start and end dates on range selection mode.
     * @group Props
     */
    @Input() rangeSeparator: string = '-';
    /**
     * When enabled, displays the calendar as inline. Default is false for popup mode.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) inline: boolean = false;
    /**
     * Whether to display dates in other months (non-selectable) at the start or end of the current month. To make these days selectable use the selectOtherMonths option.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showOtherMonths: boolean = true;
    /**
     * Whether days in other months shown before or after the current month are selectable. This only applies if the showOtherMonths option is set to true.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) selectOtherMonths: boolean | undefined;
    /**
     * When enabled, displays a button with icon next to input.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showIcon: boolean | undefined;
    /**
     * Whether the component should span the full width of its parent.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) fluid: boolean | undefined;
    /**
     * Icon of the calendar button.
     * @group Props
     */
    @Input() icon: string | undefined;
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having#mydiv as variable name).
     * @group Props
     */
    @Input() appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
    /**
     * When specified, prevents entering the date manually with keyboard.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) readonlyInput: boolean | undefined;
    /**
     * The cutoff year for determining the century for a date.
     * @group Props
     */
    @Input() shortYearCutoff: any = '+10';
    /**
     * Whether the month should be rendered as a dropdown instead of text.
     * @group Props
     * @deprecated Navigator is always on.
     */
    @Input({ transform: booleanAttribute }) monthNavigator: boolean | undefined;
    /**
     * Whether the year should be rendered as a dropdown instead of text.
     * @group Props
     * @deprecated  Navigator is always on.
     */
    @Input({ transform: booleanAttribute }) yearNavigator: boolean | undefined;
    /**
     * Specifies 12 or 24 hour format.
     * @group Props
     */
    @Input() hourFormat: string = '24';
    /**
     * Whether to display timepicker only.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) timeOnly: boolean | undefined;
    /**
     * Hours to change per step.
     * @group Props
     */
    @Input({ transform: numberAttribute }) stepHour: number = 1;
    /**
     * Minutes to change per step.
     * @group Props
     */
    @Input({ transform: numberAttribute }) stepMinute: number = 1;
    /**
     * Seconds to change per step.
     * @group Props
     */
    @Input({ transform: numberAttribute }) stepSecond: number = 1;
    /**
     * Whether to show the seconds in time picker.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showSeconds: boolean = false;
    /**
     * When present, it specifies that an input field must be filled out before submitting the form.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) required: boolean | undefined;
    /**
     * When disabled, datepicker will not be visible with input focus.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showOnFocus: boolean = true;
    /**
     * When enabled, calendar will show week numbers.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showWeek: boolean = false;
    /**
     * When enabled, calendar will start week numbers from first day of the year.
     * @group Props
     */
    @Input() startWeekFromFirstDayOfYear: boolean = false;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showClear: boolean = false;
    /**
     * Type of the value to write back to ngModel, default is date and alternative is string.
     * @group Props
     */
    @Input() dataType: string = 'date';
    /**
     * Defines the quantity of the selection, valid values are "single", "multiple" and "range".
     * @group Props
     */
    @Input() selectionMode: 'single' | 'multiple' | 'range' | undefined = 'single';
    /**
     * Maximum number of selectable dates in multiple mode.
     * @group Props
     */
    @Input({ transform: numberAttribute }) maxDateCount: number | undefined;
    /**
     * Whether to display today and clear buttons at the footer
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showButtonBar: boolean | undefined;
    /**
     * Style class of the today button.
     * @group Props
     */
    @Input() todayButtonStyleClass: string | undefined;
    /**
     * Style class of the clear button.
     * @group Props
     */
    @Input() clearButtonStyleClass: string | undefined;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autofocus: boolean | undefined;
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autoZIndex: boolean = true;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    @Input({ transform: numberAttribute }) baseZIndex: number = 0;
    /**
     * Style class of the datetimepicker container element.
     * @group Props
     */
    @Input() panelStyleClass: string | undefined;
    /**
     * Inline style of the datetimepicker container element.
     * @group Props
     */
    @Input() panelStyle: any;
    /**
     * Keep invalid value when input blur.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) keepInvalid: boolean = false;
    /**
     * Whether to hide the overlay on date selection.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) hideOnDateTimeSelect: boolean = true;
    /**
     * When enabled, calendar overlay is displayed as optimized for touch devices.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) touchUI: boolean | undefined;
    /**
     * Separator of time selector.
     * @group Props
     */
    @Input() timeSeparator: string = ':';
    /**
     * When enabled, can only focus on elements inside the calendar.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) focusTrap: boolean = true;
    /**
     * Transition options of the show animation.
     * @group Props
     */
    @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Transition options of the hide animation.
     * @group Props
     */
    @Input() hideTransitionOptions: string = '.1s linear';
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    @Input({ transform: numberAttribute }) tabindex: number | undefined;
    /**
     * Specifies the input variant of the component.
     * @group Props
     */
    @Input() variant: 'filled' | 'outlined';
    /**
     * The minimum selectable date.
     * @group Props
     */
    @Input() get minDate(): Date | undefined | null {
        return this._minDate;
    }
    set minDate(date: Date | undefined | null) {
        this._minDate = date;

        if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    /**
     * The maximum selectable date.
     * @group Props
     */
    @Input() get maxDate(): Date | undefined | null {
        return this._maxDate;
    }
    set maxDate(date: Date | undefined | null) {
        this._maxDate = date;

        if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    /**
     * Array with dates that should be disabled (not selectable).
     * @group Props
     */
    @Input() get disabledDates(): Date[] {
        return this._disabledDates;
    }
    set disabledDates(disabledDates: Date[]) {
        this._disabledDates = disabledDates;
        if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    /**
     * Array with weekday numbers that should be disabled (not selectable).
     * @group Props
     */
    @Input() get disabledDays(): number[] {
        return this._disabledDays;
    }
    set disabledDays(disabledDays: number[]) {
        this._disabledDays = disabledDays;

        if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    /**
     * The range of years displayed in the year drop-down in (nnnn:nnnn) format such as (2000:2020).
     * @group Props
     * @deprecated Years are based on decades by default.
     */
    @Input() get yearRange(): string {
        return this._yearRange;
    }
    set yearRange(yearRange: string) {
        this._yearRange = yearRange;

        if (yearRange) {
            const years = yearRange.split(':');
            const yearStart = parseInt(years[0]);
            const yearEnd = parseInt(years[1]);

            this.populateYearOptions(yearStart, yearEnd);
        }
    }
    /**
     * Whether to display timepicker.
     * @group Props
     */
    @Input() get showTime(): boolean {
        return this._showTime;
    }
    set showTime(showTime: boolean) {
        this._showTime = showTime;

        if (this.currentHour === undefined) {
            this.initTime(this.value || new Date());
        }
        this.updateInputfield();
    }
    /**
     * An array of options for responsive design.
     * @group Props
     */
    @Input() get responsiveOptions(): CalendarResponsiveOptions[] {
        return this._responsiveOptions;
    }
    set responsiveOptions(responsiveOptions: CalendarResponsiveOptions[]) {
        this._responsiveOptions = responsiveOptions;

        this.destroyResponsiveStyleElement();
        this.createResponsiveStyle();
    }
    /**
     * Number of months to display.
     * @group Props
     */
    @Input() get numberOfMonths(): number {
        return this._numberOfMonths;
    }
    set numberOfMonths(numberOfMonths: number) {
        this._numberOfMonths = numberOfMonths;

        this.destroyResponsiveStyleElement();
        this.createResponsiveStyle();
    }
    /**
     * Defines the first of the week for various date calculations.
     * @group Props
     */
    @Input() get firstDayOfWeek(): number {
        return this._firstDayOfWeek;
    }
    set firstDayOfWeek(firstDayOfWeek: number) {
        this._firstDayOfWeek = firstDayOfWeek;

        this.createWeekDays();
    }
    /**
     * Option to set calendar locale.
     * @group Props
     * @deprecated Locale property has no effect, use new i18n API instead.
     */
    @Input() set locale(newLocale: LocaleSettings) {
        console.warn('Locale property has no effect, use new i18n API instead.');
    }
    /**
     * Type of view to display, valid values are "date" for datepicker and "month" for month picker.
     * @group Props
     */
    @Input() get view(): CalendarTypeView {
        return this._view;
    }
    set view(view: CalendarTypeView) {
        this._view = view;
        this.currentView = this._view;
    }
    /**
     * Set the date to highlight on first opening if the field is blank.
     * @group Props
     */
    @Input() get defaultDate(): Date {
        return this._defaultDate;
    }
    set defaultDate(defaultDate: Date) {
        this._defaultDate = defaultDate;

        if (this.initialized) {
            const date = defaultDate || new Date();
            this.currentMonth = date.getMonth();
            this.currentYear = date.getFullYear();
            this.initTime(date);
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }

    /**
     * Callback to invoke on focus of input field.
     * @param {Event} event - browser event.
     * @group Emits
     */
    @Output() onFocus: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Callback to invoke on blur of input field.
     * @param {Event} event - browser event.
     * @group Emits
     */
    @Output() onBlur: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Callback to invoke when date panel closed.
     * @param {Event} event - Mouse event
     * @group Emits
     */
    @Output() onClose: EventEmitter<AnimationEvent> = new EventEmitter<AnimationEvent>();
    /**
     * Callback to invoke on date select.
     * @param {Date} date - date value.
     * @group Emits
     */
    @Output() onSelect: EventEmitter<Date> = new EventEmitter<Date>();
    /**
     * Callback to invoke when input field cleared.
     * @group Emits
     */
    @Output() onClear: EventEmitter<any> = new EventEmitter<any>();
    /**
     * Callback to invoke when input field is being typed.
     * @param {Event} event - browser event
     * @group Emits
     */
    @Output() onInput: EventEmitter<any> = new EventEmitter<any>();
    /**
     * Callback to invoke when today button is clicked.
     * @param {Date} date - today as a date instance.
     * @group Emits
     */
    @Output() onTodayClick: EventEmitter<Date> = new EventEmitter<Date>();
    /**
     * Callback to invoke when clear button is clicked.
     * @param {Event} event - browser event.
     * @group Emits
     */
    @Output() onClearClick: EventEmitter<any> = new EventEmitter<any>();
    /**
     * Callback to invoke when a month is changed using the navigators.
     * @param {CalendarMonthChangeEvent} event - custom month change event.
     * @group Emits
     */
    @Output() onMonthChange: EventEmitter<CalendarMonthChangeEvent> = new EventEmitter<CalendarMonthChangeEvent>();
    /**
     * Callback to invoke when a year is changed using the navigators.
     * @param {CalendarYearChangeEvent} event - custom year change event.
     * @group Emits
     */
    @Output() onYearChange: EventEmitter<CalendarYearChangeEvent> = new EventEmitter<CalendarYearChangeEvent>();
    /**
     * Callback to invoke when clicked outside of the date panel.
     * @group Emits
     */
    @Output() onClickOutside: EventEmitter<any> = new EventEmitter<any>();
    /**
     * Callback to invoke when datepicker panel is shown.
     * @group Emits
     */
    @Output() onShow: EventEmitter<any> = new EventEmitter<any>();

    @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

    @ViewChild('container', { static: false }) containerViewChild: Nullable<ElementRef>;

    @ViewChild('inputfield', { static: false }) inputfieldViewChild: Nullable<ElementRef>;

    @ViewChild('contentWrapper', { static: false }) set content(content: ElementRef) {
        this.contentViewChild = content;

        if (this.contentViewChild) {
            if (this.isMonthNavigate) {
                Promise.resolve(null).then(() => this.updateFocus());
                this.isMonthNavigate = false;
            } else {
                if (!this.focus && !this.inline) {
                    this.initFocusableCell();
                }
            }
        }
    }

    _componentStyle = inject(DatePickerStyle);

    contentViewChild!: ElementRef;

    value: any;

    dates: Nullable<Date[]>;

    months!: Month[];

    weekDays: Nullable<string[]>;

    currentMonth!: number;

    currentYear!: number;

    currentHour: Nullable<number>;

    currentMinute: Nullable<number>;

    currentSecond: Nullable<number>;

    pm: Nullable<boolean>;

    mask: Nullable<HTMLDivElement>;

    maskClickListener: VoidListener;

    overlay: Nullable<HTMLDivElement>;

    responsiveStyleElement: HTMLStyleElement | undefined | null;

    overlayVisible: Nullable<boolean>;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    calendarElement: Nullable<HTMLElement | ElementRef>;

    timePickerTimer: any;

    documentClickListener: VoidListener;

    animationEndListener: VoidListener;

    ticksTo1970: Nullable<number>;

    yearOptions: Nullable<number[]>;

    focus: Nullable<boolean>;

    isKeydown: Nullable<boolean>;

    filled: Nullable<boolean>;

    inputFieldValue: Nullable<string> = null;

    _minDate?: Date | null;

    _maxDate?: Date | null;

    _showTime!: boolean;

    _yearRange!: string;

    preventDocumentListener: Nullable<boolean>;

    dayClass(date) {
        return this._componentStyle.classes.day({ instance: this, date: date });
    }

    dateTemplate: Nullable<TemplateRef<any>>;

    headerTemplate: Nullable<TemplateRef<any>>;

    footerTemplate: Nullable<TemplateRef<any>>;

    disabledDateTemplate: Nullable<TemplateRef<any>>;

    decadeTemplate: Nullable<TemplateRef<any>>;

    previousIconTemplate: Nullable<TemplateRef<any>>;

    nextIconTemplate: Nullable<TemplateRef<any>>;

    triggerIconTemplate: Nullable<TemplateRef<any>>;

    clearIconTemplate: Nullable<TemplateRef<any>>;

    decrementIconTemplate: Nullable<TemplateRef<any>>;

    incrementIconTemplate: Nullable<TemplateRef<any>>;

    inputIconTemplate: Nullable<TemplateRef<any>>;

    _disabledDates!: Array<Date>;

    _disabledDays!: Array<number>;

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

    _responsiveOptions!: CalendarResponsiveOptions[];

    currentView: Nullable<string>;

    attributeSelector: Nullable<string>;

    panelId: Nullable<string>;

    _numberOfMonths: number = 1;

    _firstDayOfWeek!: number;

    _view: CalendarTypeView = 'date';

    preventFocus: Nullable<boolean>;

    _defaultDate!: Date;

    _focusKey: Nullable<string> = null;

    private window: Window;

    get locale() {
        return this._locale;
    }

    get iconButtonAriaLabel() {
        return this.iconAriaLabel ? this.iconAriaLabel : this.getTranslation('chooseDate');
    }

    get prevIconAriaLabel() {
        return this.currentView === 'year' ? this.getTranslation('prevDecade') : this.currentView === 'month' ? this.getTranslation('prevYear') : this.getTranslation('prevMonth');
    }

    get nextIconAriaLabel() {
        return this.currentView === 'year' ? this.getTranslation('nextDecade') : this.currentView === 'month' ? this.getTranslation('nextYear') : this.getTranslation('nextMonth');
    }

    get rootClass() {
        return this._componentStyle.classes.root({ instance: this });
    }

    get panelClass() {
        return this._componentStyle.classes.panel({ instance: this });
    }

    constructor(private zone: NgZone, public overlayService: OverlayService) {
        super();
    }

    ngOnInit() {
        console.warn('Calendar component is deprecated as of v18, use DatePicker component instead.');
        super.ngOnInit();
        this.attributeSelector = UniqueComponentId();
        this.panelId = this.attributeSelector + '_panel';
        const date = this.defaultDate || new Date();
        this.createResponsiveStyle();
        this.currentMonth = date.getMonth();
        this.currentYear = date.getFullYear();
        this.yearOptions = [];
        this.currentView = this.view;

        if (this.view === 'date') {
            this.createWeekDays();
            this.initTime(date);
            this.createMonths(this.currentMonth, this.currentYear);
            this.ticksTo1970 = ((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000;
        }

        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.createWeekDays();
            this.cd.markForCheck();
        });

        this.initialized = true;
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'date':
                    this.dateTemplate = item.template;
                    break;

                case 'decade':
                    this.decadeTemplate = item.template;
                    break;

                case 'disabledDate':
                    this.disabledDateTemplate = item.template;
                    break;

                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'inputicon':
                    this.inputIconTemplate = item.template;
                    break;

                case 'previousicon':
                    this.previousIconTemplate = item.template;
                    break;

                case 'nexticon':
                    this.nextIconTemplate = item.template;
                    break;

                case 'triggericon':
                    this.triggerIconTemplate = item.template;
                    break;

                case 'clearicon':
                    this.clearIconTemplate = item.template;
                    break;

                case 'decrementicon':
                    this.decrementIconTemplate = item.template;
                    break;

                case 'incrementicon':
                    this.incrementIconTemplate = item.template;
                    break;

                case 'footer':
                    this.footerTemplate = item.template;
                    break;

                default:
                    this.dateTemplate = item.template;
                    break;
            }
        });
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.inline) {
            this.contentViewChild && this.contentViewChild.nativeElement.setAttribute(this.attributeSelector, '');

            if (!this.disabled && !this.inline) {
                this.initFocusableCell();
                if (this.numberOfMonths === 1) {
                    if (this.contentViewChild && this.contentViewChild.nativeElement) {
                        this.contentViewChild.nativeElement.style.width = DomHandler.getOuterWidth(this.containerViewChild?.nativeElement) + 'px';
                    }
                }
            }
        }
    }

    getTranslation(option: string) {
        return this.config.getTranslation(option);
    }

    populateYearOptions(start: number, end: number) {
        this.yearOptions = [];

        for (let i = start; i <= end; i++) {
            this.yearOptions.push(i);
        }
    }

    createWeekDays() {
        this.weekDays = [];
        let dayIndex = this.getFirstDateOfWeek();
        let dayLabels = this.getTranslation(TranslationKeys.DAY_NAMES_MIN);
        for (let i = 0; i < 7; i++) {
            this.weekDays.push(dayLabels[dayIndex]);
            dayIndex = dayIndex == 6 ? 0 : ++dayIndex;
        }
    }

    monthPickerValues() {
        let monthPickerValues = [];
        for (let i = 0; i <= 11; i++) {
            monthPickerValues.push(this.config.getTranslation('monthNamesShort')[i]);
        }

        return monthPickerValues;
    }

    yearPickerValues() {
        let yearPickerValues = [];
        let base = <number>this.currentYear - (<number>this.currentYear % 10);
        for (let i = 0; i < 10; i++) {
            yearPickerValues.push(base + i);
        }

        return yearPickerValues;
    }

    createMonths(month: number, year: number) {
        this.months = this.months = [];
        for (let i = 0; i < this.numberOfMonths; i++) {
            let m = month + i;
            let y = year;
            if (m > 11) {
                m = (m % 11) - 1;
                y = year + 1;
            }

            this.months.push(this.createMonth(m, y));
        }
    }

    getWeekNumber(date: Date) {
        let checkDate = new Date(date.getTime());
        if (this.startWeekFromFirstDayOfYear) {
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
            let week = [];

            if (i == 0) {
                for (let j = prevMonthDaysLength - firstDay + 1; j <= prevMonthDaysLength; j++) {
                    let prev = this.getPreviousMonthAndYear(month, year);
                    week.push({ day: j, month: prev.month, year: prev.year, otherMonth: true, today: this.isToday(today, j, prev.month, prev.year), selectable: this.isSelectable(j, prev.month, prev.year, true) });
                }

                let remainingDaysLength = 7 - week.length;
                for (let j = 0; j < remainingDaysLength; j++) {
                    week.push({ day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year), selectable: this.isSelectable(dayNo, month, year, false) });
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
                        week.push({ day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year), selectable: this.isSelectable(dayNo, month, year, false) });
                    }

                    dayNo++;
                }
            }

            if (this.showWeek) {
                weekNumbers.push(this.getWeekNumber(new Date(week[0].year, week[0].month, week[0].day)));
            }

            dates.push(week);
        }

        return {
            month: month,
            year: year,
            dates: <any>dates,
            weekNumbers: weekNumbers
        };
    }

    initTime(date: Date) {
        this.pm = date.getHours() > 11;

        if (this.showTime) {
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
            this.setCurrentHourPM(date.getHours());
        } else if (this.timeOnly) {
            this.currentMinute = 0;
            this.currentHour = 0;
            this.currentSecond = 0;
        }
    }

    navBackward(event: any) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }

        this.isMonthNavigate = true;

        if (this.currentView === 'month') {
            this.decrementYear();
            setTimeout(() => {
                this.updateFocus();
            }, 1);
        } else if (this.currentView === 'year') {
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
        if (this.disabled) {
            event.preventDefault();
            return;
        }

        this.isMonthNavigate = true;

        if (this.currentView === 'month') {
            this.incrementYear();
            setTimeout(() => {
                this.updateFocus();
            }, 1);
        } else if (this.currentView === 'year') {
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

        if (this.yearNavigator && this.currentYear < _yearOptions[0]) {
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

        if (this.yearNavigator && this.currentYear > _yearOptions[_yearOptions.length - 1]) {
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
        if (this.disabled || !dateMeta.selectable) {
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

        if ((this.isSingleSelection() && this.hideOnDateTimeSelect) || (this.isRangeSelection() && this.value[1])) {
            setTimeout(() => {
                event.preventDefault();
                this.hideOverlay();

                if (this.mask) {
                    this.disableModality();
                }

                this.cd.markForCheck();
            }, 150);
        }

        this.updateInputfield();
        event.preventDefault();
    }

    shouldSelectDate(dateMeta: any) {
        if (this.isMultipleSelection()) return this.maxDateCount != null ? this.maxDateCount > (this.value ? this.value.length : 0) : true;
        else return true;
    }

    onMonthSelect(event: Event, index: number) {
        if (this.view === 'month') {
            this.onDateSelect(event, { year: this.currentYear, month: index, day: 1, selectable: true });
        } else {
            this.currentMonth = index;
            this.createMonths(this.currentMonth, this.currentYear);
            this.setCurrentView('date');
            this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
        }
    }

    onYearSelect(event: Event, year: number) {
        if (this.view === 'year') {
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
                        formattedValue += this.multipleSeparator + ' ';
                    }
                }
            } else if (this.isRangeSelection()) {
                if (this.value && this.value.length) {
                    let startDate = this.value[0];
                    let endDate = this.value[1];

                    formattedValue = this.formatDateTime(startDate);
                    if (endDate) {
                        formattedValue += ' ' + this.rangeSeparator + ' ' + this.formatDateTime(endDate);
                    }
                }
            }
        }

        this.inputFieldValue = formattedValue;
        this.updateFilledState();
        if (this.inputfieldViewChild && this.inputfieldViewChild.nativeElement) {
            this.inputfieldViewChild.nativeElement.value = this.inputFieldValue;
        }
    }

    formatDateTime(date: any) {
        let formattedValue = this.keepInvalid ? date : null;
        const isDateValid = this.isValidDateForTimeConstraints(date);

        if (this.isValidDate(date)) {
            if (this.timeOnly) {
                formattedValue = this.formatTime(date);
            } else {
                formattedValue = this.formatDate(date, this.getDateFormat());
                if (this.showTime) {
                    formattedValue += ' ' + this.formatTime(date);
                }
            }
        } else if (this.dataType === 'string') {
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
        if (this.hourFormat == '12') {
            this.pm = hours > 11;
            if (hours >= 12) {
                this.currentHour = hours == 12 ? 12 : hours - 12;
            } else {
                this.currentHour = hours == 0 ? 12 : hours;
            }
        } else {
            this.currentHour = hours;
        }
    }

    setCurrentView(currentView: CalendarTypeView) {
        this.currentView = currentView;
        this.cd.detectChanges();
        this.alignOverlay();
    }

    selectDate(dateMeta: any) {
        let date = this.formatDateMetaToDate(dateMeta);

        if (this.showTime) {
            if (this.hourFormat == '12') {
                if (this.currentHour === 12) date.setHours(this.pm ? 12 : 0);
                else date.setHours(this.pm ? <number>this.currentHour + 12 : <number>this.currentHour);
            } else {
                date.setHours(<number>this.currentHour);
            }

            date.setMinutes(<number>this.currentMinute);
            date.setSeconds(<number>this.currentSecond);
        }

        if (this.minDate && this.minDate > date) {
            date = this.minDate;
            this.setCurrentHourPM(date.getHours());
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
        }

        if (this.maxDate && this.maxDate < date) {
            date = this.maxDate;
            this.setCurrentHourPM(date.getHours());
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
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

        if (this.dataType == 'date') {
            this.onModelChange(this.value);
        } else if (this.dataType == 'string') {
            if (this.isSingleSelection()) {
                this.onModelChange(this.formatDateTime(this.value));
            } else {
                let stringArrValue = null;
                if (Array.isArray(this.value)) {
                    stringArrValue = this.value.map((date: Date) => this.formatDateTime(date));
                }
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

    isMonthSelected(month: number) {
        if (this.isComparable() && !this.isMultipleSelection()) {
            const [start, end] = this.isRangeSelection() ? this.value : [this.value, this.value];
            const selected = new Date(this.currentYear, month, 1);
            return selected >= start && selected <= (end ?? start);
        }
        return false;
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
        if (value && ObjectUtils.isDate(value)) return value.getDate() === dateMeta.day && value.getMonth() === dateMeta.month && value.getFullYear() === dateMeta.year;
        else return false;
    }

    isDateBetween(start: Date, end: Date, dateMeta: any) {
        let between: boolean = false;
        if (ObjectUtils.isDate(start) && ObjectUtils.isDate(end)) {
            let date: Date = this.formatDateMetaToDate(dateMeta);
            return start.getTime() <= date.getTime() && end.getTime() >= date.getTime();
        }

        return between;
    }

    isSingleSelection(): boolean {
        return this.selectionMode === 'single';
    }

    isRangeSelection(): boolean {
        return this.selectionMode === 'range';
    }

    isMultipleSelection(): boolean {
        return this.selectionMode === 'multiple';
    }

    isToday(today: Date, day: number, month: number, year: number): boolean {
        return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    }

    isSelectable(day: any, month: any, year: any, otherMonth: any): boolean {
        let validMin = true;
        let validMax = true;
        let validDate = true;
        let validDay = true;

        if (otherMonth && !this.selectOtherMonths) {
            return false;
        }

        if (this.minDate) {
            if (this.minDate.getFullYear() > year) {
                validMin = false;
            } else if (this.minDate.getFullYear() === year && this.currentView != 'year') {
                if (this.minDate.getMonth() > month) {
                    validMin = false;
                } else if (this.minDate.getMonth() === month) {
                    if (this.minDate.getDate() > day) {
                        validMin = false;
                    }
                }
            }
        }

        if (this.maxDate) {
            if (this.maxDate.getFullYear() < year) {
                validMax = false;
            } else if (this.maxDate.getFullYear() === year) {
                if (this.maxDate.getMonth() < month) {
                    validMax = false;
                } else if (this.maxDate.getMonth() === month) {
                    if (this.maxDate.getDate() < day) {
                        validMax = false;
                    }
                }
            }
        }

        if (this.disabledDates) {
            validDate = !this.isDateDisabled(day, month, year);
        }

        if (this.disabledDays) {
            validDay = !this.isDayDisabled(day, month, year);
        }

        return validMin && validMax && validDate && validDay;
    }

    isDateDisabled(day: number, month: number, year: number): boolean {
        if (this.disabledDates) {
            for (let disabledDate of this.disabledDates) {
                if (disabledDate.getFullYear() === year && disabledDate.getMonth() === month && disabledDate.getDate() === day) {
                    return true;
                }
            }
        }

        return false;
    }

    isDayDisabled(day: number, month: number, year: number): boolean {
        if (this.disabledDays) {
            let weekday = new Date(year, month, day);
            let weekdayNumber = weekday.getDay();
            return this.disabledDays.indexOf(weekdayNumber) !== -1;
        }
        return false;
    }

    onInputFocus(event: Event) {
        this.focus = true;
        if (this.showOnFocus) {
            this.showOverlay();
        }
        this.onFocus.emit(event);
    }

    onInputClick() {
        if (this.showOnFocus && !this.overlayVisible) {
            this.showOverlay();
        }
    }

    onInputBlur(event: Event) {
        this.focus = false;
        this.onBlur.emit(event);
        if (!this.keepInvalid) {
            this.updateInputfield();
        }
        this.onModelTouched();
    }

    onButtonClick(event: Event, inputfield: any = this.inputfieldViewChild?.nativeElement) {
        if (!this.overlayVisible) {
            inputfield.focus();
            this.showOverlay();
        } else {
            this.hideOverlay();
        }
    }

    clear() {
        this.inputFieldValue = null;
        this.value = null;
        this.onModelChange(this.value);
        this.onClear.emit();
    }

    onOverlayClick(event: Event) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });
    }

    getMonthName(index: number) {
        return this.config.getTranslation('monthNames')[index];
    }

    getYear(month: any) {
        return this.currentView === 'month' ? this.currentYear : month.year;
    }

    switchViewButtonDisabled() {
        return this.numberOfMonths > 1 || this.disabled;
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
                if (!this.inline) {
                    this.trapFocus(event);
                }
                if (this.inline) {
                    const headerElements = DomHandler.findSingle(this.containerViewChild?.nativeElement, '.p-datepicker-header');
                    const element = event.target;
                    if (this.timeOnly) {
                        return;
                    } else {
                        if (element == headerElements.children[headerElements?.children?.length - 1]) {
                            this.initFocusableCell();
                        }
                    }
                }
                break;

            //escape
            case 27:
                this.inputfieldViewChild?.nativeElement.focus();
                this.overlayVisible = false;
                event.preventDefault();
                break;

            default:
                //Noop
                break;
        }
    }

    onInputKeydown(event: any) {
        this.isKeydown = true;
        if (event.keyCode === 40 && this.contentViewChild) {
            this.trapFocus(event);
        } else if (event.keyCode === 27) {
            if (this.overlayVisible) {
                this.inputfieldViewChild?.nativeElement.focus();
                this.overlayVisible = false;
                event.preventDefault();
            }
        } else if (event.keyCode === 13) {
            if (this.overlayVisible) {
                this.overlayVisible = false;
                event.preventDefault();
            }
        } else if (event.keyCode === 9 && this.contentViewChild) {
            DomHandler.getFocusableElements(this.contentViewChild.nativeElement).forEach((el) => (el.tabIndex = '-1'));
            if (this.overlayVisible) {
                this.overlayVisible = false;
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
                let cellIndex = DomHandler.index(cell);
                let nextRow = cell.parentElement.nextElementSibling;
                if (nextRow) {
                    let focusCell = nextRow.children[cellIndex].children[0];
                    if (DomHandler.hasClass(focusCell, 'p-disabled')) {
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
                let cellIndex = DomHandler.index(cell);
                let prevRow = cell.parentElement.previousElementSibling;
                if (prevRow) {
                    let focusCell = prevRow.children[cellIndex].children[0];
                    if (DomHandler.hasClass(focusCell, 'p-disabled')) {
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
                    if (DomHandler.hasClass(focusCell, 'p-disabled') || DomHandler.hasClass(focusCell.parentElement, 'p-datepicker-weeknumber')) {
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
                    if (DomHandler.hasClass(focusCell, 'p-disabled')) {
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
                this.inputfieldViewChild?.nativeElement.focus();
                this.overlayVisible = false;
                event.preventDefault();
                break;
            }

            //tab
            case 9: {
                if (!this.inline) {
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
                const firstDayCell = DomHandler.findSingle(cellContent.offsetParent, `span[data-date='${firstDayDateKey}']:not(.p-disabled):not(.p-ink)`);
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
                const lastDayCell = DomHandler.findSingle(cellContent.offsetParent, `span[data-date='${lastDayDateKey}']:not(.p-disabled):not(.p-ink)`);
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
                var cellIndex = DomHandler.index(cell);
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
                this.inputfieldViewChild?.nativeElement.focus();
                this.overlayVisible = false;
                event.preventDefault();
                break;
            }

            //tab
            case 9: {
                if (!this.inline) {
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
                var cellIndex = DomHandler.index(cell);
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
                this.inputfieldViewChild?.nativeElement.focus();
                this.overlayVisible = false;
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
            if (this.numberOfMonths === 1 || groupIndex === 0) {
                this.navigationState = { backward: true };
                this._focusKey = focusKey;
                this.navBackward(event);
            } else {
                let prevMonthContainer = this.contentViewChild.nativeElement.children[groupIndex - 1];
                if (focusKey) {
                    const firstDayCell = DomHandler.findSingle(prevMonthContainer, focusKey);
                    firstDayCell.tabIndex = '0';
                    firstDayCell.focus();
                } else {
                    let cells = DomHandler.find(prevMonthContainer, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                    let focusCell = cells[cells.length - 1];
                    focusCell.tabIndex = '0';
                    focusCell.focus();
                }
            }
        } else {
            if (this.numberOfMonths === 1 || groupIndex === this.numberOfMonths - 1) {
                this.navigationState = { backward: false };
                this._focusKey = focusKey;
                this.navForward(event);
            } else {
                let nextMonthContainer = this.contentViewChild.nativeElement.children[groupIndex + 1];
                if (focusKey) {
                    const firstDayCell = DomHandler.findSingle(nextMonthContainer, focusKey);
                    firstDayCell.tabIndex = '0';
                    firstDayCell.focus();
                } else {
                    let focusCell = DomHandler.findSingle(nextMonthContainer, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
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

                if (this.navigationState.backward) DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-prev').focus();
                else DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-next').focus();
            } else {
                if (this.navigationState.backward) {
                    let cells;

                    if (this.currentView === 'month') {
                        cells = DomHandler.find(this.contentViewChild.nativeElement, '.p-monthpicker .p-monthpicker-month:not(.p-disabled)');
                    } else if (this.currentView === 'year') {
                        cells = DomHandler.find(this.contentViewChild.nativeElement, '.p-yearpicker .p-yearpicker-year:not(.p-disabled)');
                    } else {
                        cells = DomHandler.find(this.contentViewChild.nativeElement, this._focusKey || '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                    }

                    if (cells && cells.length > 0) {
                        cell = cells[cells.length - 1];
                    }
                } else {
                    if (this.currentView === 'month') {
                        cell = DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-monthpicker .p-monthpicker-month:not(.p-disabled)');
                    } else if (this.currentView === 'year') {
                        cell = DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-yearpicker .p-yearpicker-year:not(.p-disabled)');
                    } else {
                        cell = DomHandler.findSingle(this.contentViewChild.nativeElement, this._focusKey || '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
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
        const contentEl = this.contentViewChild?.nativeElement;
        let cell!: any;

        if (this.currentView === 'month') {
            let cells = DomHandler.find(contentEl, '.p-monthpicker .p-monthpicker-month:not(.p-disabled)');
            let selectedCell = DomHandler.findSingle(contentEl, '.p-monthpicker .p-monthpicker-month.p-highlight');
            cells.forEach((cell) => (cell.tabIndex = -1));
            cell = selectedCell || cells[0];

            if (cells.length === 0) {
                let disabledCells = DomHandler.find(contentEl, '.p-monthpicker .p-monthpicker-month.p-disabled[tabindex = "0"]');
                disabledCells.forEach((cell) => (cell.tabIndex = -1));
            }
        } else if (this.currentView === 'year') {
            let cells = DomHandler.find(contentEl, '.p-yearpicker .p-yearpicker-year:not(.p-disabled)');
            let selectedCell = DomHandler.findSingle(contentEl, '.p-yearpicker .p-yearpicker-year.p-highlight');
            cells.forEach((cell) => (cell.tabIndex = -1));
            cell = selectedCell || cells[0];

            if (cells.length === 0) {
                let disabledCells = DomHandler.find(contentEl, '.p-yearpicker .p-yearpicker-year.p-disabled[tabindex = "0"]');
                disabledCells.forEach((cell) => (cell.tabIndex = -1));
            }
        } else {
            cell = DomHandler.findSingle(contentEl, 'span.p-highlight');
            if (!cell) {
                let todayCell = DomHandler.findSingle(contentEl, 'td.p-datepicker-today span:not(.p-disabled):not(.p-ink)');
                if (todayCell) cell = todayCell;
                else cell = DomHandler.findSingle(contentEl, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
            }
        }

        if (cell) {
            cell.tabIndex = '0';

            if (!this.preventFocus && (!this.navigationState || !this.navigationState.button)) {
                setTimeout(() => {
                    if (!this.disabled) {
                        cell.focus();
                    }
                }, 1);
            }

            this.preventFocus = false;
        }
    }

    trapFocus(event: any) {
        let focusableElements = DomHandler.getFocusableElements(this.contentViewChild.nativeElement);

        if (focusableElements && focusableElements.length > 0) {
            if (!focusableElements[0].ownerDocument.activeElement) {
                focusableElements[0].focus();
            } else {
                let focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);

                if (event.shiftKey) {
                    if (focusedIndex == -1 || focusedIndex === 0) {
                        if (this.focusTrap) {
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
                        if (this.timeOnly) {
                            focusableElements[0].focus();
                        } else {
                            let spanIndex = 0;

                            for (let i = 0; i < focusableElements.length; i++) {
                                if (focusableElements[i].tagName === 'SPAN') spanIndex = i;
                            }

                            focusableElements[spanIndex].focus();
                        }
                    } else if (focusedIndex === focusableElements.length - 1) {
                        if (!this.focusTrap && focusedIndex != -1) return this.hideOverlay();

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
        if (this.hourFormat == '12') {
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
        let minHoursExceeds12: boolean;
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
        let isMinDate = this.minDate && valueDateString && this.minDate.toDateString() === valueDateString;
        let isMaxDate = this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString;

        if (isMinDate) {
            minHoursExceeds12 = this.minDate.getHours() >= 12;
        }

        switch (
            true // intentional fall through
        ) {
            case isMinDate && minHoursExceeds12 && this.minDate.getHours() === 12 && this.minDate.getHours() > convertedHour:
                returnTimeTriple[0] = 11;
            case isMinDate && this.minDate.getHours() === convertedHour && this.minDate.getMinutes() > minute:
                returnTimeTriple[1] = this.minDate.getMinutes();
            case isMinDate && this.minDate.getHours() === convertedHour && this.minDate.getMinutes() === minute && this.minDate.getSeconds() > second:
                returnTimeTriple[2] = this.minDate.getSeconds();
                break;
            case isMinDate && !minHoursExceeds12 && this.minDate.getHours() - 1 === convertedHour && this.minDate.getHours() > convertedHour:
                returnTimeTriple[0] = 11;
                this.pm = true;
            case isMinDate && this.minDate.getHours() === convertedHour && this.minDate.getMinutes() > minute:
                returnTimeTriple[1] = this.minDate.getMinutes();
            case isMinDate && this.minDate.getHours() === convertedHour && this.minDate.getMinutes() === minute && this.minDate.getSeconds() > second:
                returnTimeTriple[2] = this.minDate.getSeconds();
                break;

            case isMinDate && minHoursExceeds12 && this.minDate.getHours() > convertedHour && convertedHour !== 12:
                this.setCurrentHourPM(this.minDate.getHours());
                returnTimeTriple[0] = this.currentHour;
            case isMinDate && this.minDate.getHours() === convertedHour && this.minDate.getMinutes() > minute:
                returnTimeTriple[1] = this.minDate.getMinutes();
            case isMinDate && this.minDate.getHours() === convertedHour && this.minDate.getMinutes() === minute && this.minDate.getSeconds() > second:
                returnTimeTriple[2] = this.minDate.getSeconds();
                break;
            case isMinDate && this.minDate.getHours() > convertedHour:
                returnTimeTriple[0] = this.minDate.getHours();
            case isMinDate && this.minDate.getHours() === convertedHour && this.minDate.getMinutes() > minute:
                returnTimeTriple[1] = this.minDate.getMinutes();
            case isMinDate && this.minDate.getHours() === convertedHour && this.minDate.getMinutes() === minute && this.minDate.getSeconds() > second:
                returnTimeTriple[2] = this.minDate.getSeconds();
                break;
            case isMaxDate && this.maxDate.getHours() < convertedHour:
                returnTimeTriple[0] = this.maxDate.getHours();
            case isMaxDate && this.maxDate.getHours() === convertedHour && this.maxDate.getMinutes() < minute:
                returnTimeTriple[1] = this.maxDate.getMinutes();
            case isMaxDate && this.maxDate.getHours() === convertedHour && this.maxDate.getMinutes() === minute && this.maxDate.getSeconds() < second:
                returnTimeTriple[2] = this.maxDate.getSeconds();
                break;
        }

        return returnTimeTriple;
    }

    incrementHour(event: any) {
        const prevHour = this.currentHour ?? 0;
        let newHour = (this.currentHour ?? 0) + this.stepHour;
        let newPM = this.pm;
        if (this.hourFormat == '24') newHour = newHour >= 24 ? newHour - 24 : newHour;
        else if (this.hourFormat == '12') {
            // Before the AM/PM break, now after
            if (prevHour < 12 && newHour > 11) {
                newPM = !this.pm;
            }
            newHour = newHour >= 13 ? newHour - 12 : newHour;
        }
        this.toggleAMPMIfNotMinDate(newPM);
        [this.currentHour, this.currentMinute, this.currentSecond] = this.constrainTime(newHour, this.currentMinute!, this.currentSecond!, newPM!);
        event.preventDefault();
    }

    toggleAMPMIfNotMinDate(newPM: boolean) {
        let value = this.value;
        const valueDateString = value ? value.toDateString() : null;
        let isMinDate = this.minDate && valueDateString && this.minDate.toDateString() === valueDateString;
        if (isMinDate && this.minDate.getHours() >= 12) {
            this.pm = true;
        } else {
            this.pm = newPM;
        }
    }

    onTimePickerElementMouseDown(event: Event, type: number, direction: number) {
        if (!this.disabled) {
            this.repeat(event, null, type, direction);
            event.preventDefault();
        }
    }

    onTimePickerElementMouseUp(event: Event) {
        if (!this.disabled) {
            this.clearTimePickerTimer();
            this.updateTime();
        }
    }

    onTimePickerElementMouseLeave() {
        if (!this.disabled && this.timePickerTimer) {
            this.clearTimePickerTimer();
            this.updateTime();
        }
    }

    repeat(event: Event | null, interval: number | null, type: number | null, direction: number | null) {
        let i = interval || 500;

        this.clearTimePickerTimer();
        this.timePickerTimer = setTimeout(() => {
            this.repeat(event, 100, type, direction);
            this.cd.markForCheck();
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
        let newHour = (this.currentHour ?? 0) - this.stepHour;
        let newPM = this.pm;
        if (this.hourFormat == '24') newHour = newHour < 0 ? 24 + newHour : newHour;
        else if (this.hourFormat == '12') {
            // If we were at noon/midnight, then switch
            if (this.currentHour === 12) {
                newPM = !this.pm;
            }
            newHour = newHour <= 0 ? 12 + newHour : newHour;
        }
        this.toggleAMPMIfNotMinDate(newPM);
        [this.currentHour, this.currentMinute, this.currentSecond] = this.constrainTime(newHour, this.currentMinute!, this.currentSecond!, newPM!);
        event.preventDefault();
    }

    incrementMinute(event: any) {
        let newMinute = (this.currentMinute ?? 0) + this.stepMinute;
        newMinute = newMinute > 59 ? newMinute - 60 : newMinute;
        [this.currentHour, this.currentMinute, this.currentSecond] = this.constrainTime(this.currentHour, newMinute, this.currentSecond!, this.pm!);
        event.preventDefault();
    }

    decrementMinute(event: any) {
        let newMinute = (this.currentMinute ?? 0) - this.stepMinute;
        newMinute = newMinute < 0 ? 60 + newMinute : newMinute;
        [this.currentHour, this.currentMinute, this.currentSecond] = this.constrainTime(this.currentHour, newMinute, this.currentSecond, this.pm);
        event.preventDefault();
    }

    incrementSecond(event: any) {
        let newSecond = <any>this.currentSecond + this.stepSecond;
        newSecond = newSecond > 59 ? newSecond - 60 : newSecond;
        [this.currentHour, this.currentMinute, this.currentSecond] = this.constrainTime(this.currentHour, this.currentMinute, newSecond, this.pm);
        event.preventDefault();
    }

    decrementSecond(event: any) {
        let newSecond = <any>this.currentSecond - this.stepSecond;
        newSecond = newSecond < 0 ? 60 + newSecond : newSecond;
        [this.currentHour, this.currentMinute, this.currentSecond] = this.constrainTime(this.currentHour, this.currentMinute, newSecond, this.pm);
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

        if (this.hourFormat == '12') {
            if (this.currentHour === 12) value.setHours(this.pm ? 12 : 0);
            else value.setHours(this.pm ? <number>this.currentHour + 12 : this.currentHour);
        } else {
            value.setHours(this.currentHour);
        }

        value.setMinutes(this.currentMinute);
        value.setSeconds(this.currentSecond);
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
        const newPM = !this.pm;
        this.pm = newPM;
        [this.currentHour, this.currentMinute, this.currentSecond] = this.constrainTime(this.currentHour, this.currentMinute, this.currentSecond, newPM);
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
            } else if (this.keepInvalid) {
                this.updateModel(value);
            }
        } catch (err) {
            //invalid date
            let value = this.keepInvalid ? val : null;
            this.updateModel(value);
        }

        this.filled = (val != null && val.length) as any;
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
            let tokens = text.split(this.multipleSeparator);
            value = [];
            for (let token of tokens) {
                value.push(this.parseDateTime(token.trim()));
            }
        } else if (this.isRangeSelection()) {
            let tokens = text.split(' ' + this.rangeSeparator + ' ');
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

        if (this.timeOnly) {
            date = new Date();
            this.populateTime(date, parts[0], parts[1]);
        } else {
            const dateFormat = this.getDateFormat();
            if (this.showTime) {
                let ampm = this.hourFormat == '12' ? parts.pop() : null;
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
        if (this.hourFormat == '12' && !ampm) {
            throw 'Invalid Time';
        }

        this.pm = ampm === 'PM' || ampm === 'pm';
        let time = this.parseTime(timeString);
        value.setHours(time.hour);
        value.setMinutes(time.minute);
        value.setSeconds(time.second);
    }

    isValidDate(date: any) {
        return ObjectUtils.isDate(date) && ObjectUtils.isNotEmpty(date);
    }

    updateUI() {
        let propValue = this.value;
        if (Array.isArray(propValue)) {
            propValue = propValue.length === 2 ? propValue[1] : propValue[0];
        }

        let val = this.defaultDate && this.isValidDate(this.defaultDate) && !this.value ? this.defaultDate : propValue && this.isValidDate(propValue) ? propValue : new Date();

        this.currentMonth = val.getMonth();
        this.currentYear = val.getFullYear();
        this.createMonths(this.currentMonth, this.currentYear);

        if (this.showTime || this.timeOnly) {
            this.setCurrentHourPM(val.getHours());
            this.currentMinute = val.getMinutes();
            this.currentSecond = val.getSeconds();
        }
    }

    showOverlay() {
        if (!this.overlayVisible) {
            this.updateUI();

            if (!this.touchUI) {
                this.preventFocus = true;
            }

            this.overlayVisible = true;
        }
    }

    hideOverlay() {
        this.inputfieldViewChild?.nativeElement.focus();
        this.overlayVisible = false;
        this.clearTimePickerTimer();

        if (this.touchUI) {
            this.disableModality();
        }

        this.cd.markForCheck();
    }

    toggle() {
        if (!this.inline) {
            if (!this.overlayVisible) {
                this.showOverlay();
                this.inputfieldViewChild?.nativeElement.focus();
            } else {
                this.hideOverlay();
            }
        }
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
            case 'visibleTouchUI':
                if (!this.inline) {
                    this.overlay = event.element;
                    this.overlay?.setAttribute(this.attributeSelector as string, '');
                    this.appendOverlay();
                    this.updateFocus();
                    if (this.autoZIndex) {
                        if (this.touchUI) ZIndexUtils.set('modal', this.overlay, this.baseZIndex || this.config.zIndex.modal);
                        else ZIndexUtils.set('overlay', this.overlay, this.baseZIndex || this.config.zIndex.overlay);
                    }

                    this.alignOverlay();
                    this.onShow.emit(event);
                }
                break;

            case 'void':
                this.onOverlayHide();
                this.onClose.emit(event);
                break;
        }
    }

    onOverlayAnimationDone(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
            case 'visibleTouchUI':
                if (!this.inline) {
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                    this.bindScrollListener();
                }
                break;

            case 'void':
                if (this.autoZIndex) {
                    ZIndexUtils.clear(event.element);
                }
                break;
        }
    }

    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body') this.document.body.appendChild(<HTMLElement>this.overlay);
            else DomHandler.appendChild(this.overlay, this.appendTo);
        }
    }

    restoreOverlayAppend() {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    }

    alignOverlay() {
        if (this.touchUI) {
            this.enableModality(this.overlay);
        } else if (this.overlay) {
            if (this.appendTo) {
                if (this.view === 'date') {
                    this.overlay.style.width = DomHandler.getOuterWidth(this.overlay) + 'px';
                    this.overlay.style.minWidth = DomHandler.getOuterWidth(this.inputfieldViewChild?.nativeElement) + 'px';
                } else {
                    this.overlay.style.width = DomHandler.getOuterWidth(this.inputfieldViewChild?.nativeElement) + 'px';
                }

                DomHandler.absolutePosition(this.overlay, this.inputfieldViewChild?.nativeElement);
            } else {
                DomHandler.relativePosition(this.overlay, this.inputfieldViewChild?.nativeElement);
            }
        }
    }

    enableModality(element: any) {
        if (!this.mask && this.touchUI) {
            this.mask = this.renderer.createElement('div');
            this.renderer.setStyle(this.mask, 'zIndex', String(parseInt(element.style.zIndex) - 1));
            let maskStyleClass = 'p-component-overlay p-datepicker-mask p-datepicker-mask-scrollblocker p-component-overlay p-component-overlay-enter';
            DomHandler.addMultipleClasses(this.mask, maskStyleClass);

            this.maskClickListener = this.renderer.listen(this.mask, 'click', (event: any) => {
                this.disableModality();
                this.overlayVisible = false;
            });
            this.renderer.appendChild(this.document.body, this.mask);
            DomHandler.blockBodyScroll();
        }
    }

    disableModality() {
        if (this.mask) {
            DomHandler.addClass(this.mask, 'p-component-overlay-leave');
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
            if (DomHandler.hasClass(bodyChild, 'p-datepicker-mask-scrollblocker')) {
                hasBlockerMasks = true;
                break;
            }
        }

        if (!hasBlockerMasks) {
            DomHandler.unblockBodyScroll();
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

    writeValue(value: any): void {
        this.value = value;
        if (this.value && typeof this.value === 'string') {
            try {
                this.value = this.parseValueFromString(this.value);
            } catch {
                if (this.keepInvalid) {
                    this.value = value;
                }
            }
        }

        this.updateInputfield();
        this.updateUI();
        this.cd.markForCheck();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(val: boolean): void {
        this.disabled = val;
        this.cd.markForCheck();
    }

    getDateFormat() {
        return this.dateFormat || this.getTranslation('dateFormat');
    }

    getFirstDateOfWeek() {
        return this._firstDayOfWeek || this.getTranslation(TranslationKeys.FIRST_DAY_OF_WEEK);
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
                            output += formatName('D', date.getDay(), this.getTranslation(TranslationKeys.DAY_NAMES_SHORT), this.getTranslation(TranslationKeys.DAY_NAMES));
                            break;
                        case 'o':
                            output += formatNumber('o', Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                            break;
                        case 'm':
                            output += formatNumber('m', date.getMonth() + 1, 2);
                            break;
                        case 'M':
                            output += formatName('M', date.getMonth(), this.getTranslation(TranslationKeys.MONTH_NAMES_SHORT), this.getTranslation(TranslationKeys.MONTH_NAMES));
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

        if (this.hourFormat == '12' && hours > 11 && hours != 12) {
            hours -= 12;
        }

        if (this.hourFormat == '12') {
            output += hours === 0 ? 12 : hours < 10 ? '0' + hours : hours;
        } else {
            output += hours < 10 ? '0' + hours : hours;
        }
        output += ':';
        output += minutes < 10 ? '0' + minutes : minutes;

        if (this.showSeconds) {
            output += ':';
            output += seconds < 10 ? '0' + seconds : seconds;
        }

        if (this.hourFormat == '12') {
            output += date.getHours() > 11 ? ' PM' : ' AM';
        }

        return output;
    }

    parseTime(value: any) {
        let tokens: string[] = value.split(':');
        let validTokenLength = this.showSeconds ? 3 : 2;

        if (tokens.length !== validTokenLength) {
            throw 'Invalid time';
        }

        let h = parseInt(tokens[0]);
        let m = parseInt(tokens[1]);
        let s = this.showSeconds ? parseInt(tokens[2]) : null;

        if (isNaN(h) || isNaN(m) || h > 23 || m > 59 || (this.hourFormat == '12' && h > 12) || (this.showSeconds && (isNaN(<any>s) || <any>s > 59))) {
            throw 'Invalid time';
        } else {
            if (this.hourFormat == '12') {
                if (h !== 12 && this.pm) {
                    h += 12;
                } else if (!this.pm && h === 12) {
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
            shortYearCutoff = typeof this.shortYearCutoff !== 'string' ? this.shortYearCutoff : (new Date().getFullYear() % 100) + parseInt(this.shortYearCutoff, 10),
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
                    names.push([i, arr[i]]);
                }
                names.sort((a, b) => {
                    return -(a[1].length - b[1].length);
                });

                for (let i = 0; i < names.length; i++) {
                    let name = names[i][1];
                    if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
                        index = names[i][0];
                        iValue += name.length;
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

        if (this.view === 'month') {
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
                        getName('D', this.getTranslation(TranslationKeys.DAY_NAMES_SHORT), this.getTranslation(TranslationKeys.DAY_NAMES));
                        break;
                    case 'o':
                        doy = getNumber('o');
                        break;
                    case 'm':
                        month = getNumber('m');
                        break;
                    case 'M':
                        month = getName('M', this.getTranslation(TranslationKeys.MONTH_NAMES_SHORT), this.getTranslation(TranslationKeys.MONTH_NAMES));
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

        if (this.view === 'year') {
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

    updateFilledState() {
        this.filled = (this.inputFieldValue && this.inputFieldValue != '') as boolean;
    }

    isValidDateForTimeConstraints(selectedDate: Date) {
        if (this.keepInvalid) {
            return true; // If we are keeping invalid dates, we don't need to check for time constraints
        }
        return (!this.minDate || selectedDate >= this.minDate) && (!this.maxDate || selectedDate <= this.maxDate);
    }

    onTodayButtonClick(event: any) {
        const date: Date = new Date();
        const dateMeta = { day: date.getDate(), month: date.getMonth(), year: date.getFullYear(), otherMonth: date.getMonth() !== this.currentMonth || date.getFullYear() !== this.currentYear, today: true, selectable: true };

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
        if (this.numberOfMonths > 1 && this.responsiveOptions) {
            if (!this.responsiveStyleElement) {
                this.responsiveStyleElement = this.renderer.createElement('style');
                (<HTMLStyleElement>this.responsiveStyleElement).type = 'text/css';
                this.renderer.appendChild(this.document.body, this.responsiveStyleElement);
            }

            let innerHTML = '';
            if (this.responsiveOptions) {
                let responsiveOptions = [...this.responsiveOptions].filter((o) => !!(o.breakpoint && o.numMonths)).sort((o1: any, o2: any) => -1 * o1.breakpoint.localeCompare(o2.breakpoint, undefined, { numeric: true }));

                for (let i = 0; i < responsiveOptions.length; i++) {
                    let { breakpoint, numMonths } = responsiveOptions[i];
                    let styles = `
                        .p-datepicker[${this.attributeSelector}] .p-datepicker-group:nth-child(${numMonths}) .p-datepicker-next {
                            display: inline-flex !important;
                        }
                    `;

                    for (let j: number = <number>numMonths; j < this.numberOfMonths; j++) {
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
            DomHandler.setAttribute(this.responsiveStyleElement, 'nonce', this.config?.csp()?.nonce);
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
            this.zone.runOutsideAngular(() => {
                const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : this.document;

                this.documentClickListener = this.renderer.listen(documentTarget, 'mousedown', (event) => {
                    if (this.isOutsideClicked(event) && this.overlayVisible) {
                        this.zone.run(() => {
                            this.hideOverlay();
                            this.onClickOutside.emit(event);

                            this.cd.markForCheck();
                        });
                    }
                });
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
        if (!this.documentResizeListener && !this.touchUI) {
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
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.containerViewChild?.nativeElement, () => {
                if (this.overlayVisible) {
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

    isNavIconClicked(event: Event) {
        return (
            DomHandler.hasClass(event.target, 'p-datepicker-prev') || DomHandler.hasClass(event.target, 'p-datepicker-prev-icon') || DomHandler.hasClass(event.target, 'p-datepicker-next') || DomHandler.hasClass(event.target, 'p-datepicker-next-icon')
        );
    }

    onWindowResize() {
        if (this.overlayVisible && !DomHandler.isTouchDevice()) {
            this.hideOverlay();
        }
    }

    onOverlayHide() {
        this.currentView = this.view;

        if (this.mask) {
            this.destroyMask();
        }

        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
        this.overlay = null;
    }

    ngOnDestroy() {
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }

        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe();
        }

        if (this.overlay && this.autoZIndex) {
            ZIndexUtils.clear(this.overlay);
        }

        this.destroyResponsiveStyleElement();
        this.clearTimePickerTimer();
        this.restoreOverlayAppend();
        this.onOverlayHide();

        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [CommonModule, ButtonModule, SharedModule, RippleModule, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon, TimesIcon, CalendarIcon, AutoFocusModule, InputTextModule],
    exports: [Calendar, ButtonModule, SharedModule],
    declarations: [Calendar]
})
export class CalendarModule {}
