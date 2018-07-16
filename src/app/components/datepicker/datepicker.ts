import {animate, state, style, transition, trigger} from '@angular/animations';
import {CommonModule, DOCUMENT} from '@angular/common';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    ModuleWithProviders,
    NgModule,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    Pipe,
    PipeTransform,
    Provider,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild
} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

import {DateTime, Zone} from 'luxon';
import {fromEvent, Subscription} from 'rxjs';

import {ButtonModule} from '../button/button';
import {PrimeTemplate, SharedModule} from '../common/shared';

import {DomHandler} from '../dom/domhandler';
import {InputMask, InputMaskModule} from '../inputmask/inputmask';


type DatePickerValue = Date | DateTime | number;

interface GenericEntry {
    label?: string | number;
    selectable: boolean;
}

interface YearEntry extends GenericEntry {
    year: number;
}

interface MonthEntry extends YearEntry {
    month: number;
}

interface DayEntry extends MonthEntry {
    day: number;
    today: boolean;
    otherMonth: boolean;
}

interface HourEntry extends MonthEntry {
    day: number,
    hour: number
}

interface MinuteEntry extends HourEntry {
    minute: number;
}

interface SecondEntry extends MinuteEntry {
    second: number;
}

export interface DatePickerLocaleData {
    dayNames: [string, string, string, string, string, string, string];
    dayNamesShort: [string, string, string, string, string, string, string];
    dayNamesMin: [string, string, string, string, string, string, string];
    monthNames: [string, string, string, string, string, string, string, string, string, string, string, string];
    monthNamesShort: [string, string, string, string, string, string, string, string, string, string, string, string];
    clear: string;
    today: string;
    pm: string;
    am: string;
    year: string;
    month: string;
    hour: string;
    minute: string;
    second: string;
    fromHour: string;
    fromMinute: string;
    fromSecond: string;
    toHour: string;
    toMinute: string;
    toSecond: string;
}

export const DATEPICKER_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePicker),
    multi: true
};

@Pipe({name: 'pPad'})
export class DatePickerPadPipe implements PipeTransform {
    public transform(value: string | number, lenght: number, padChar: string = '0'): string {
        return String(value).padStart(lenght, padChar[0]);
    }
}

@Component({
    selector: 'p-datepicker',
    template: `
        <span class="ui-date-picker {{styleClass}}" [class.ui-date-picker-w-btn]="showIcon" [ngStyle]="style">
            <ng-container *ngIf="!inline">
                <p-inputMask *ngIf="!readonlyInput; else readonlyInputTemplate" [(ngModel)]="maskBinding"
                             [inputId]="inputId" [required]="required" [tabindex]="tabindex"
                             [mask]="maskFormat" [placeholder]="placeholder || maskPlaceholder || ''"
                             (onFocus)="onMaskFocus($event)" (onBlur)="onMaskBlur($event)"
                             (onClick)="onMaskClick()" (onComplete)="onMaskComplete()">
                </p-inputMask>
                <ng-template #readonlyInputTemplate>
                    <input #inputField type="text" autocomplete="off" [ngStyle]="inputStyle"
                           class="ui-inputtext ui-widget ui-state-default ui-corner-all {{inputStyleClass}}"
                           [attr.id]="inputId" (click)="onInputClick()"
                           [value]="maskBinding" [placeholder]="placeholder || ''"
                           [readonly]="readonlyInput" [disabled]="disabled">
                </ng-template>
                
                <button *ngIf="showIcon" type="button" pButton
                        class="ui-date-picker-trigger ui-date-picker-button"
                        [class.ui-state-disabled]="disabled"
                        [icon]="icon" (click)="onButtonClick()"
                        [disabled]="disabled" tabindex="-1"></button>
            </ng-container>
            <div #datePicker
                 class="ui-date-picker-panel ui-widget ui-widget-content ui-helper-clearfix ui-corner-all {{panelStyleClass}}}"
                 [class.ui-date-picker-panel-inline]="inline"
                 [class.ui-shadow]="!inline"
                 [class.ui-state-disabled]="disabled"
                 [class.ui-date-picker-panel-timeonly]="timeOnly"
                 [style.display]="inline ? 'inline-block' : (overlayVisible ? 'block' : 'none')"
                 [@overlayState]="inline ? 'visible' : (overlayVisible ? 'visible' : 'hidden')"
                 (click)="onDatePickerClick()">
                
                <ng-content select="p-header"></ng-content>
                <!-- Headings -->
                <div *ngIf="!timeOnly && (overlayVisible || inline)" [ngSwitch]="currentPicking"
                     class="ui-date-picker-panel-header ui-widget-header ui-helper-clearfix ui-corner-all">
                    <ng-container *ngSwitchCase="'year'">
                        <a class="ui-date-picker-panel-prev ui-corner-all ui-date-picker-interactable"
                           (click)="onYear(-18)">
                            <span class="pi pi-chevron-left"></span>
                        </a>
                        <a class="ui-date-picker-panel-next ui-corner-all ui-date-picker-interactable"
                           (click)="onYear(18)">
                            <span class="pi pi-chevron-right"></span>
                        </a>
                        <div class="ui-date-picker-panel-title">
                            <span class="ui-date-picker-panel-year">
                                {{tableViewYear[0][0].label || tableViewYear[0][0].value}} - {{(tableViewYear[0][0].value || tableViewYear[0][0].value) + 17}}
                            </span>
                        </div>
                    </ng-container>
                    <ng-container *ngSwitchCase="'month'">
                        <a class="ui-date-picker-panel-prev ui-corner-all ui-date-picker-interactable"
                           (click)="onYear(-1)">
                            <span class="pi pi-chevron-left"></span>
                        </a>
                        <a class="ui-date-picker-panel-next ui-corner-all ui-date-picker-interactable"
                           (click)="onYear(1)">
                            <span class="pi pi-chevron-right"></span>
                        </a>
                        <div class="ui-date-picker-panel-title">
                            <span class="ui-date-picker-panel-year"
                                  [class.ui-date-picker-interactable]="yearNavigator"
                                  (click)="onYearNavigatorClick()">
                                {{currentYearLabel()}}
                            </span>
                        </div>
                    </ng-container>
                    <ng-container *ngSwitchDefault>
                        <a class="ui-date-picker-panel-prev ui-corner-all ui-date-picker-interactable"
                           (click)="onMonth(-1)">
                            <span class="pi pi-chevron-left"></span>
                        </a>
                        <a class="ui-date-picker-panel-next ui-corner-all ui-date-picker-interactable"
                           (click)="onMonth(1)">
                            <span class="pi pi-chevron-right"></span>
                        </a>
                        
                        <div class="ui-date-picker-panel-title">
                            <span class="ui-date-picker-panel-month"
                                  [class.ui-date-picker-interactable]="monthNavigator"
                                  (click)="onMonthNavigatorClick()">
                                {{currentMonthLabel()}}
                            </span>
                            <span class="ui-date-picker-panel-year"
                                  [class.ui-date-picker-interactable]="yearNavigator"
                                  (click)="onYearNavigatorClick()">
                                {{currentYearLabel()}}
                            </span>
                        </div>
                    </ng-container>
                </div>

                <!-- Contents -->
                <ng-container *ngIf="overlayVisible || inline" [ngSwitch]="currentPicking">
                    <ng-container *ngSwitchCase="'year'">
                        <table class="ui-date-picker-panel-calendar ui-date-picker-panel-calendar-year">
                            <thead>
                            <tr>
                                <th scope="col" colspan="3">
                                     <span>{{locale.year}}</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr *ngFor="let yearRow of tableViewYear">
                                <td *ngFor="let year of yearRow"
                                    [class.ui-date-picker-panel-current-year]="isYearSelected(year)">
                                    
                                    <a class="ui-state-default"
                                       [class.ui-state-active]="isYearSelected(year)"
                                       [class.ui-state-disabled]="!year.selectable"
                                       (click)="onYearSelect(year)">
                                        <ng-container *ngIf="!templateYear">{{year.label || year.year}}</ng-container>
                                        <ng-container *ngTemplateOutlet="templateYear; context: {$implicit: year}">
                                        </ng-container>
                                    </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </ng-container>
                    <ng-container *ngSwitchCase="'month'">
                        <table class="ui-date-picker-panel-calendar ui-date-picker-panel-calendar-month">
                            <thead>
                            <tr>
                                <th scope="col" colspan="2">
                                     <span>{{locale.month}}</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr *ngFor="let monthRow of tableViewMonth">
                                <td *ngFor="let month of monthRow"
                                    [class.ui-date-picker-panel-current-month]="isMonthSelected(month)">
                                    
                                    <a class="ui-state-default"
                                       [class.ui-state-active]="isMonthSelected(month)"
                                       [class.ui-state-disabled]="!month.selectable"
                                       (click)="onMonthSelect(month)">
                                        <ng-container *ngIf="!templateMonth">
                                            {{locale.monthNames[month.month - 1]}}
                                        </ng-container>
                                        <ng-container *ngTemplateOutlet="templateMonth; context: {$implicit: month}">
                                        </ng-container>
                                    </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </ng-container>
                    <ng-container *ngSwitchCase="'day'">
                        <table class="ui-date-picker-panel-calendar ui-date-picker-panel-calendar-day">
                            <thead>
                            <tr>
                                <th scope="col" *ngFor="let weekDay of weekDays">
                                    <span>{{weekDay}}</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr *ngFor="let week of tableViewDay">
                                <td *ngFor="let date of week"
                                    [class.ui-date-picker-panel-other-month]="date.otherMonth"
                                    [class.ui-state-disabled]="date.otherMonth"
                                    [class.ui-date-picker-panel-current-day]="isDaySelected(date)"
                                    [class.ui-date-picker-panel-today]="date.today">
                                    
                                    <a class="ui-state-default" *ngIf="!date.otherMonth || showOtherMonths"
                                       [class.ui-state-active]="isDaySelected(date)"
                                       [class.ui-state-highlight]="date.today"
                                       [class.ui-state-disabled]="!date.selectable"
                                       (click)="onDateSelect(date)" draggable="false">
                                        <ng-container *ngIf="!templateDate">{{date.day}}</ng-container>
                                        <ng-container *ngTemplateOutlet="templateDate; context: {$implicit: date}">
                                        </ng-container>
                                    </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </ng-container>
                    <ng-container *ngSwitchCase="'hour'"> 
                        <table class="ui-date-picker-panel-calendar ui-date-picker-panel-calendar-hour">
                            <thead>
                            <tr>
                                <th scope="col" [attr.colspan]="hourFormat === '12' ? 2 : 4">
                                    <span>{{!isRangeSelection() ? locale.hour : (isSourceFrom() ? locale.fromHour : locale.toHour)}}</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr *ngFor="let hourRow of tableViewHour">
                                <td *ngFor="let hour of hourRow"
                                    [class.ui-state-disabled]="!hour.selectable"
                                    [class.ui-date-picker-panel-current-hour]="isHourSelected(hour)">
                                    
                                    <a class="ui-state-default"
                                       [class.ui-state-active]="isHourSelected(hour)"
                                       (click)="onHourSelect(hour)" draggable="false">
                                        <ng-container
                                            *ngIf="!templateHour">{{(hour.label || hour.hour) | pPad:2}}</ng-container>
                                        <ng-container *ngTemplateOutlet="templateHour; context: {$implicit: hour}">
                                        </ng-container>
                                    </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </ng-container>
                    <ng-container *ngSwitchCase="'minute'">
                         <table class="ui-date-picker-panel-calendar ui-date-picker-panel-calendar-minute">
                            <thead>
                            <tr>
                                <th scope="col" colspan="10">
                                    <span>{{!isRangeSelection() ? locale.minute : (isSourceFrom() ? locale.fromMinute : locale.toMinute)}}</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr *ngFor="let minuteRow of tableViewMinute">
                                <td *ngFor="let minute of minuteRow"
                                    [class.ui-state-disabled]="!minute.selectable"
                                    [class.ui-date-picker-panel-current-hour]="isMinuteSelected(minute)">
                                    
                                    <a class="ui-state-default"
                                       [class.ui-state-active]="isMinuteSelected(minute)"
                                       (click)="onMinuteSelect(minute)" draggable="false">
                                        <ng-container *ngIf="!templateMinute">{{(minute.label || minute.minute) | pPad:2}}</ng-container>
                                        <ng-container *ngTemplateOutlet="templateMinute; context: {$implicit: minute}">
                                        </ng-container>
                                    </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </ng-container>
                    <ng-container *ngSwitchCase="'second'">
                        <table class="ui-date-picker-panel-calendar ui-date-picker-panel-calendar-minute">
                            <thead>
                            <tr>
                                <th scope="col" colspan="10">
                                    <span>{{!isRangeSelection() ? locale.second : (isSourceFrom() ? locale.fromSecond : locale.toSecond)}}</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr *ngFor="let secondRow of tableViewSecond">
                                <td *ngFor="let second of secondRow"
                                    [class.ui-state-disabled]="!second.selectable"
                                    [class.ui-date-picker-panel-current-hour]="isSecondSelected(second)">
                                    
                                    <a class="ui-state-default"
                                       [class.ui-state-active]="isSecondSelected(second)"
                                       (click)="onSecondSelect(second)" draggable="false">
                                        <ng-container *ngIf="!templateSecond">{{(second.label || second.second) | pPad:2}}</ng-container>
                                        <ng-container *ngTemplateOutlet="templateSecond; context: {$implicit: second}">
                                        </ng-container>
                                    </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </ng-container>
                </ng-container>
                
                <ng-container *ngIf="showHours()">
                    <div class="ui-time-picker ui-widget-header ui-corner-all">
                        <div class="ui-hour-picker ui-date-picker-interactable"
                             (click)="onHourNavigatorClick('from')">
                            <span>{{(currentHourLabel('from') || 0) | pPad:2}}</span>
                        </div>
                        <div class="ui-separator">
                            <span>:</span>
                        </div>
                        <div class="ui-minute-picker" [class.ui-date-picker-interactable]="showMinutes()"
                             (click)="onMinuteNavigatorClick('from')">
                            <span>{{(showMinutes() ? (selectedFromMinute || 0) : 0) | pPad:2}}</span>
                        </div>
                        <ng-container *ngIf="showSeconds()">
                            <div class="ui-separator">
                                <span>:</span>
                            </div>
                            <div class="ui-second-picker ui-date-picker-interactable"
                                 (click)="onSecondNavigatorClick('from')">
                                <span>{{(selectedFromSecond || 0) | pPad:2}}</span>
                            </div>
                        </ng-container>
                        <div class="ui-ampm-picker ui-date-picker-interactable" *ngIf="hourFormat === '12'"
                             (click)="toggleAMPM('from')">
                            <span>{{pmFrom ? labelPM() : labelAM()}}</span>
                        </div>
                    </div>
                    
                    <div *ngIf="isRangeSelection()" class="ui-time-picker ui-widget-header ui-corner-all">
                        <div class="ui-hour-picker ui-date-picker-interactable"
                             (click)="onHourNavigatorClick('to')">
                            <span>{{(currentHourLabel('to') || 0) | pPad:2}}</span>
                        </div>
                        <div class="ui-separator">
                            <span>:</span>
                        </div>
                        <div class="ui-minute-picker" [class.ui-date-picker-interactable]="showMinutes()"
                             (click)="onMinuteNavigatorClick('to')">
                            <span>{{(showMinutes() ? (selectedToMinute || 0) : 0) | pPad:2}}</span>
                        </div>
                        <ng-container *ngIf="showSeconds()">
                            <div class="ui-separator">
                                <span>:</span>
                            </div>
                            <div class="ui-second-picker ui-date-picker-interactable"
                                 (click)="onSecondNavigatorClick('to')">
                                <span>{{(selectedToSecond || 0) | pPad:2}}</span>
                            </div>
                        </ng-container>
                        <div class="ui-ampm-picker ui-date-picker-interactable" *ngIf="hourFormat === '12'"
                             (click)="toggleAMPM('to')">
                            <span>{{pmTo ? labelPM() : labelAM()}}</span>
                        </div>
                    </div>
                </ng-container>
                
                <div class="ui-date-picker-panel-buttonbar ui-widget-header" *ngIf="showButtonBar">
                    <div class="ui-g">
                        <div class="ui-g-6">
                            <button type="button" [label]="locale.today" (click)="onTodayButtonClick($event)" pButton
                                    [ngClass]="[todayButtonStyleClass]"></button>
                        </div>
                        <div class="ui-g-6">
                            <button type="button" [label]="locale.clear" (click)="onClearButtonClick($event)" pButton
                                    [ngClass]="[clearButtonStyleClass]"></button>
                        </div>
                    </div>
                </div>
                <ng-content select="p-footer"></ng-content>
            </div>
        </span>
    `,
    animations: [
        trigger('overlayState', [
            state('hidden', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })),
            transition('visible => hidden', animate('400ms ease-in')),
            transition('hidden => visible', animate('400ms ease-out'))
        ])
    ],
    host: {
        '[class.ui-inputwrapper-filled]': 'controlFilled',
        '[class.ui-inputwrapper-focus]': 'controlFocused'
    },
    providers: [
        DomHandler,
        DATEPICKER_VALUE_ACCESSOR
    ]
})
export class DatePicker implements AfterContentInit, AfterViewInit, OnInit, OnChanges, OnDestroy, ControlValueAccessor {
    // region Defaults
    public static defaultFirstDayOfWeek: number = 0;
    public static defaultLocale: DatePickerLocaleData = {
        dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        dayNamesMin: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear',
        pm: 'PM',
        am: 'AM',
        year: 'Year',
        month: 'Month',
        hour: 'Hour',
        minute: 'Minute',
        second: 'Second',
        fromHour: 'From Hour',
        fromMinute: 'From Minute',
        fromSecond: 'From Second',
        toHour: 'To Hour',
        toMinute: 'To Minute',
        toSecond: 'To Second'
    };
    // endregion

    // region Template Children
    @ViewChild(InputMask) public inputMaskVC: InputMask;
    @ViewChild('inputField') public inputFieldVC: ElementRef;
    @ViewChild('datePicker') public datePickerVC: ElementRef;
    @ContentChildren(PrimeTemplate) public templates: QueryList<PrimeTemplate>;
    // endregion

    // region Inputs
    @Input() public firstDayOfWeek: number = DatePicker.defaultFirstDayOfWeek;
    @Input() public locale: Partial<DatePickerLocaleData> = DatePicker.defaultLocale;

    @Input() public name: string;
    @Input() public inputId: string;
    @Input() public tabindex: string;
    @Input() public placeholder: string;

    @Input() public style: string;
    @Input() public styleClass: string;
    @Input() public inputStyle: string;
    @Input() public inputStyleClass: string;

    @Input() public disabled: boolean = false;
    @Input() public readonlyInput: boolean;

    @Input() public icon: string = 'pi pi-calendar';
    @Input() public showIcon: boolean = false;
    @Input() public inline: boolean = false;
    @Input() public timeOnly: boolean;
    @Input() public precision: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' = 'day';
    @Input() public hourFormat: '24' | '12' = '24';
    @Input() public showOtherMonths: boolean = true;

    @Input() public appendTo: any;
    @Input() public zone: 'utc' | 'local' | string | Zone = 'local';
    @Input() public dataType: 'date' | 'luxon' | 'timestamp' = 'date';
    @Input() public selectionMode: 'single' | 'multiple' | 'range' = 'single';

    @Input() public dateFormat: string = 'dd/MM/yyyy';
    @Input() public minDate: DatePickerValue;
    @Input() public maxDate: DatePickerValue;
    @Input() public maxDateCount: number;
    @Input() public defaultDate: DatePickerValue;

    @Input() public disabledDates: DatePickerValue[];
    @Input() public disabledDays: number[];

    @Input() public monthNavigator: boolean = true;
    @Input() public yearNavigator: boolean = true;

    @Input() public required: boolean;
    @Input() public showOnFocus: boolean = true;
    @Input() public showButtonBar: boolean;

    @Input() public keepInvalid: boolean = false;

    @Input() public baseZIndex: number = 0;
    @Input() public autoZIndex: boolean = true;

    @Input() public panelStyleClass: string;
    @Input() public todayButtonStyleClass: string = 'ui-button-secondary';
    @Input() public clearButtonStyleClass: string = 'ui-button-secondary';

    @Input() public hideOnDateTimeSelect: boolean = false;
    // endregion

    // region Outputs
    @Output() public onFocus: EventEmitter<Event> = new EventEmitter();
    @Output() public onBlur: EventEmitter<Event> = new EventEmitter();
    @Output() public onClose: EventEmitter<Event> = new EventEmitter();
    @Output() public onTodayClick: EventEmitter<Event> = new EventEmitter();
    @Output() public onClearClick: EventEmitter<Event> = new EventEmitter();
    // endregion


    public tableViewYear: YearEntry[][];
    public tableViewMonth: MonthEntry[][];
    public tableViewDay: DayEntry[][];
    public tableViewHour: HourEntry[][];
    public tableViewMinute: MinuteEntry[][];
    public tableViewSecond: SecondEntry[][];

    public currentTimePickSource: 'from' | 'to';
    public currentPicking: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' = 'day';

    public weekDays: string[];

    public overlayShown: boolean;
    public overlayVisible: boolean;

    public controlFilled: boolean;
    public controlFocused: boolean;

    public currentView: DateTime;

    public get pmFrom(): boolean {
        return this.selectedFromHour >= 12;
    }

    public get pmTo(): boolean {
        return this.selectedToHour >= 12;
    }

    public selectedFromHour: number;
    public selectedFromMinute: number;
    public selectedFromSecond: number;
    public selectedToHour: number;
    public selectedToMinute: number;
    public selectedToSecond: number;

    public templateYear: TemplateRef<PrimeTemplate>;
    public templateMonth: TemplateRef<PrimeTemplate>;
    public templateDate: TemplateRef<PrimeTemplate>;
    public templateHour: TemplateRef<PrimeTemplate>;
    public templateMinute: TemplateRef<PrimeTemplate>;
    public templateSecond: TemplateRef<PrimeTemplate>;

    public maskBinding: string = '';
    public maskFormat: string = '';
    public maskPlaceholder: string = '';
    public outputFormat: string = '';

    private datePickerClick: boolean;

    private currentValue: DateTime[];

    private onChangeFn: () => void;
    private onTouchFn: () => void;

    private isPicking: boolean;

    private documentClickListener: Subscription;

    constructor(private el: ElementRef,
                @Inject(DOCUMENT) private dom: Document,
                private changeDetector: ChangeDetectorRef,
                private domHandler: DomHandler) {
        this.onChangeFn = () => void 0;
        this.onTouchFn = () => void 0;

        this.currentValue = [];
    }

    // region LifeCycle Hooks
    public ngAfterContentInit(): void {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'year':
                    this.templateYear = item.template;
                    break;
                case 'month':
                    this.templateMonth = item.template;
                    break;
                case 'date':
                    this.templateDate = item.template;
                    break;
                case 'hour':
                    this.templateHour = item.template;
                    break;
                case 'minute':
                    this.templateMinute = item.template;
                    break;
                case 'second':
                    this.templateSecond = item.template;
                    break;
            }
        });
    }

    public ngAfterViewInit(): void {
        if (!this.inline && this.appendTo) {
            if (this.appendTo === 'body') {
                this.dom.body.appendChild(this.datePickerVC.nativeElement);
            } else {
                this.domHandler.appendChild(this.datePickerVC.nativeElement, this.appendTo);
            }
        }
    }

    public ngAfterViewChecked() {
        if (this.overlayShown) {
            const el = this.readonlyInput ? this.inputFieldVC : this.inputMaskVC.inputViewChild;

            if (this.appendTo) {
                this.domHandler.absolutePosition(this.datePickerVC.nativeElement, el.nativeElement);
            } else {
                this.domHandler.relativePosition(this.datePickerVC.nativeElement, el.nativeElement);
            }
            this.overlayShown = false;
        }
    }

    public ngOnInit(): void {
        this.currentView = this.toDateTime(this.defaultDate);
        if (!this.currentView) {
            this.currentView = DateTime.utc().setZone(this.zone);
        }

        this.selectedFromHour = this.selectedToHour = this.currentView.hour;
        this.selectedFromMinute = this.selectedToMinute = this.currentView.minute;
        this.selectedFromSecond = this.selectedToSecond = this.currentView.second;

        if (this.inline) {
            this.currentTimePickSource = 'from';
            this.currentPicking = this.timeOnly ? 'hour' : 'day';
            this.createAppropriateView();
        }

        this.prepareMaskProperties();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if ('locale' in changes && this.locale !== DatePicker.defaultLocale) {
            this.locale = Object.assign({}, DatePicker.defaultLocale, this.locale);
        }

        // The only valid selection mode when picking 'timeOnly' is 'single'.
        if (this.timeOnly) {
            this.selectionMode = 'single';

            if (!this.showHours()) {
                this.precision = 'hour';
            }
        }

        // Show time not available with 'multiple' selection mode.
        if (this.showHours() && this.selectionMode === 'multiple') {
            this.precision = 'day';
        }

        // Input is active only with 'single' selection mode.
        this.readonlyInput = this.readonlyInput || this.selectionMode !== 'single';

        if ('selectionMode' in changes) {
            switch (this.selectionMode) {
                case 'single':
                    if (this.currentValue.length > 1) {
                        this.currentValue = [this.currentValue[0]];
                    }
                    break;
                case 'range':
                    if (this.currentValue.length !== 2) {
                        this.currentValue = [null, null];
                    }
                    break;
            }
        }

        this.createAppropriateView();
        this.prepareMaskProperties();

        if (!this.isPrecisionValid()) {
            console.warn(`<p-datepicker>: Invalid precision: ${this.precision}`);
        }
    }

    public ngOnDestroy(): void {
        this.unbindDocumentClickListener();
        this.el.nativeElement.appendChild(this.datePickerVC.nativeElement);
    }

    // endregion

    // region ControlValueAccessor
    public registerOnChange(fn: any): void {
        this.onChangeFn = () => {
            let fireValue: DatePickerValue | DatePickerValue[] = null;
            this.maskBinding = '';

            switch (this.selectionMode) {
                case 'single':
                    if (this.currentValue.length === 1 && this.currentValue[0]) {
                        fireValue = this.toFireValue(this.currentValue[0]);
                        this.maskBinding = this.currentValue[0].toFormat(this.outputFormat);
                    }
                    break;
                case 'multiple':
                    const values = this.currentValue
                        .filter(v => v != null)
                        .map(v => v.startOf('day'));

                    fireValue = values.map(v => this.toFireValue(v));
                    this.maskBinding = values.map(v => v.toFormat(this.outputFormat)).join(', ');
                    break;
                case 'range':
                    fireValue = [null, null];
                    if (this.currentValue.length === 2 && this.currentValue.every(v => v != null)) {
                        fireValue[0] = this.toFireValue(this.currentValue[0]);
                        fireValue[1] = this.toFireValue(this.currentValue[1]);

                        this.maskBinding = this.currentValue[0].toFormat(this.outputFormat) + ' - ' +
                            this.currentValue[1].toFormat(this.outputFormat);
                    }
                    break;
            }

            fn(fireValue);
        };
    }

    public registerOnTouched(fn: any): void {
        this.onTouchFn = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public writeValue(obj: DatePickerValue | DatePickerValue[]): void {
        this.currentValue = [];

        switch (this.selectionMode) {
            case 'single':
                const value = this.toDateTime(obj as DatePickerValue);
                if (value) {
                    this.currentValue[0] = value;
                    this.selectedFromHour = value.hour;
                    this.selectedFromMinute = value.minute;
                    this.selectedFromSecond = value.second;
                }
                break;
            case 'multiple':
                if (obj instanceof Array) {
                    this.currentValue = obj
                        .map(v => this.toDateTime(v))
                        .filter(v => !!v);
                }
                break;
            case 'range':
                if (obj instanceof Array && obj.length === 2 && obj.every(Number.isFinite)) {
                    this.currentValue.length = 2;
                    this.currentValue[0] = this.toDateTime(obj[0]);
                    this.currentValue[1] = this.toDateTime(obj[1]);

                    if (this.currentValue[0]) {
                        this.selectedFromHour = this.currentValue[0].hour;
                        this.selectedFromMinute = this.currentValue[0].minute;
                        this.selectedFromSecond = this.currentValue[0].second;
                    }
                    if (this.currentValue[1]) {
                        this.selectedToHour = this.currentValue[1].hour;
                        this.selectedToMinute = this.currentValue[1].minute;
                        this.selectedToSecond = this.currentValue[1].second;
                    }
                }
                break;
        }

        this.createAppropriateView();
    }

    // endregion

    // region Event Hooks
    public onMaskFocus(evt: Event): void {
        this.controlFocused = true;
        if (this.showOnFocus) {
            this.showOverlay();
        }
        this.onFocus.emit(evt);
    }

    public onMaskClick(): void {
        this.datePickerClick = true;
        if (this.autoZIndex) {
            this.datePickerVC.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    }

    public onMaskBlur(evt: Event): void {
        this.controlFocused = false;
        this.onBlur.emit(evt);
        if (!this.keepInvalid) {
            const input = DateTime.fromFormat(this.maskBinding, this.outputFormat);

            if (!input || !input.isValid) {
                this.updateInputView();
                this.changeDetector.detectChanges();
            }
        }
        this.onTouchFn();
    }

    public onMaskComplete(): void {
        const input = DateTime.fromFormat(this.maskBinding, this.outputFormat);

        if (input && input.isValid) {
            let current = this.currentValue[0] || DateTime.utc().setZone(this.zone);

            this.currentView = this.currentValue[0] = current = current.set({
                year: input.year,
                month: this.showMonth() ? input.month : 1,
                day: this.showDay() ? input.day : 1,
                hour: this.showHours() ? input.hour : 0,
                minute: this.showMinutes() ? input.minute : 0,
                second: this.showSeconds() ? input.second : 0,
                millisecond: 0
            });

            this.selectedFromHour = current.hour;
            this.selectedFromMinute = current.minute;
            this.selectedFromSecond = current.second;

            this.createAppropriateView();

            this.onChangeFn();
        }
    }

    public onInputClick(): void {
        this.datePickerClick = true;

        if (this.showOnFocus) {
            this.showOverlay();
        }
    }

    public onButtonClick(): void {
        this.datePickerClick = true;

        if (!this.datePickerVC.nativeElement.offsetParent || this.datePickerVC.nativeElement.style.display === 'none') {
            if (this.inputMaskVC) {
                this.inputMaskVC.inputViewChild.nativeElement.focus();
            }
            this.showOverlay();
        } else {
            this.hideOverlay();
        }
    }

    public onTodayButtonClick(evt: Event): void {
        if (this.selectionMode === 'single') {
            const now = DateTime.utc().setZone(this.zone);
            if (this.currentValue[0]) {
                this.currentValue[0] = this.currentValue[0].set({
                    year: now.year,
                    month: now.month,
                    day: now.day
                });
            } else {
                this.currentValue[0] = now.set({
                    hour: 0,
                    minute: 0,
                    second: 0,
                    millisecond: 0
                });
            }

            this.onChangeFn();
        }

        this.onTodayClick.emit(evt);
    }

    public onClearButtonClick(evt: Event): void {
        this.currentValue = [];

        this.onChangeFn();
        this.onClearClick.emit(evt);
    }

    public onDatePickerClick(): void {
        this.datePickerClick = true;
    }

    public onYearNavigatorClick(): void {
        if (!this.yearNavigator) {
            return;
        }

        this.currentPicking = 'year';
        this.createAppropriateView();
    }

    public onMonthNavigatorClick(): void {
        if (!this.monthNavigator) {
            return;
        }

        this.currentPicking = 'month';
        this.createAppropriateView();
    }

    public onHourNavigatorClick(source: 'from' | 'to'): void {
        if (this.showHours()) {
            this.currentPicking = 'hour';
            this.currentView = this.currentView.set({hour: (source === 'from') ? this.selectedFromHour : this.selectedToHour});

            this.currentTimePickSource = source;
            this.createAppropriateView();
        }
    }

    public onMinuteNavigatorClick(source: 'from' | 'to'): void {
        if (this.showMinutes()) {
            this.currentPicking = 'minute';
            this.currentView = this.currentView.set({minute: (source === 'from') ? this.selectedFromMinute : this.selectedToMinute});

            this.currentTimePickSource = source;
            this.createAppropriateView();
        }
    }

    public onSecondNavigatorClick(source: 'from' | 'to'): void {
        if (this.showSeconds()) {
            this.currentPicking = 'second';
            this.currentView = this.currentView.set({second: (source === 'from') ? this.selectedFromSecond : this.selectedToSecond});

            this.currentTimePickSource = source;
            this.createAppropriateView();
        }
    }

    public onYear(direction: number): void {
        this.currentView = this.currentView.plus({years: direction});
        this.createAppropriateView();
    }

    public onMonth(direction: number): void {
        this.currentView = this.currentView.plus({months: direction});
        this.createAppropriateView();
    }

    public onYearSelect(year: YearEntry): void {
        if (!year.selectable) {
            return;
        }

        const sYear = year.year;

        this.currentView = this.currentView.set({year: sYear});

        if (this.showMonth() && this.monthNavigator) {
            this.currentPicking = 'month';
        } else if (this.showDay()) {
            this.currentPicking = 'day';
        } else {
            switch (this.selectionMode) {
                case 'single':
                    const v = this.currentValue[0];

                    if (v) {
                        this.currentValue[0] = v.set({
                            year: sYear, month: 1, day: 1,
                            hour: 0, minute: 0, second: 0, millisecond: 0
                        });
                    } else {
                        this.currentValue[0] = DateTime.utc(sYear, 1, 1)
                            .setZone(this.zone, {keepLocalTime: true});
                    }

                    this.autoClose();
                    break;
                case 'multiple':
                    const found = this.currentValue.some(v => v.year === sYear);
                    if (found) {
                        this.currentValue = this.currentValue.filter(v => v.year !== sYear);
                    }


                    if (!found && this.canPickOtherDates()) {
                        this.currentValue.push(DateTime.utc(sYear, 1, 1)
                            .setZone(this.zone, {keepLocalTime: true}));
                        this.currentValue.sort();
                    }
                    break;
                case 'range':
                    if (!this.isPicking) {
                        const v = this.currentValue[0];

                        if (v) {
                            this.currentValue[0] = v.set({
                                year: sYear, month: 1, day: 1,
                                hour: 0, minute: 0, second: 0, millisecond: 0
                            });
                        } else {
                            this.currentValue[0] = DateTime.utc(sYear, 1, 1)
                                .setZone(this.zone, {keepLocalTime: true});
                        }

                        this.isPicking = true;
                        this.currentValue[1] = null;
                    } else {
                        let v = this.currentValue[1];

                        if (v) {
                            v = v.set({
                                year: sYear, month: 1, day: 1,
                                hour: 0, minute: 0, second: 0, millisecond: 0
                            });
                        } else {
                            v = DateTime.utc(sYear, 1, 1)
                                .setZone(this.zone, {keepLocalTime: true});
                        }

                        if (v <= this.currentValue[0]) {
                            this.currentValue[0] = v;
                            this.currentValue[1] = null;
                        } else {
                            this.currentValue[1] = v;
                            this.isPicking = false;

                            this.autoClose();
                        }
                    }
                    break;
            }

            this.onChangeFn();
        }

        this.createAppropriateView();
    }

    public onMonthSelect(month: MonthEntry): void {
        if (!month.selectable) {
            return;
        }

        const sMonth = month.month;

        this.currentView = this.currentView.set({month: sMonth});

        if (this.showDay()) {
            this.currentPicking = 'day';
        } else {
            switch (this.selectionMode) {
                case 'single':
                    const v = this.currentValue[0];

                    if (v) {
                        this.currentValue[0] = v.set({
                            year: this.currentView.year,
                            month: sMonth,
                            day: 1,
                            hour: 0, minute: 0, second: 0, millisecond: 0
                        });
                    } else {
                        this.currentValue[0] = DateTime.utc(this.currentView.year, sMonth, 1)
                            .setZone(this.zone, {keepLocalTime: true});
                    }

                    this.autoClose();
                    break;
                case 'multiple':
                    const found = this.currentValue
                        .some(v => v.year === this.currentView.year && v.month === sMonth);
                    if (found) {
                        this.currentValue = this.currentValue
                            .filter(v => !(v.year === this.currentView.year && v.month === sMonth));
                    }

                    if (!found && this.canPickOtherDates()) {
                        this.currentValue.push(DateTime.utc(this.currentView.year, sMonth, 1)
                            .setZone(this.zone, {keepLocalTime: true}));
                        this.currentValue.sort();
                    }
                    break;
                case 'range':
                    if (!this.isPicking) {
                        const v = this.currentValue[0];

                        if (v) {
                            this.currentValue[0] = v.set({
                                year: this.currentView.year,
                                month: sMonth,
                                day: 1,
                                hour: 0, minute: 0, second: 0, millisecond: 0
                            });
                        } else {
                            this.currentValue[0] = DateTime.utc(this.currentView.year, sMonth, 1)
                                .setZone(this.zone, {keepLocalTime: true});
                        }

                        this.isPicking = true;
                        this.currentValue[1] = null;
                    } else {
                        let v = this.currentValue[1];

                        if (v) {
                            v = v.set({
                                year: this.currentView.year,
                                month: sMonth,
                                day: 1,
                                hour: 0, minute: 0, second: 0, millisecond: 0
                            });
                        } else {
                            v = DateTime.utc(this.currentView.year, sMonth, 1)
                                .setZone(this.zone, {keepLocalTime: true});
                        }

                        if (v <= this.currentValue[0]) {
                            this.currentValue[0] = v;
                            this.currentValue[1] = null;
                        } else {
                            this.currentValue[1] = v;
                            this.isPicking = false;

                            this.autoClose();
                        }
                    }
                    break;
            }

            this.onChangeFn();
        }
        this.createAppropriateView();
    }

    public onDateSelect(date: DayEntry): void {
        if (!date.selectable) {
            return;
        }

        switch (this.selectionMode) {
            case 'single':
                const v = this.currentValue[0];
                this.validateHourSelection('from', DateTime
                    .utc(date.year, date.month, date.day, this.selectedFromHour)
                    .setZone(this.zone, {keepLocalTime: true}));

                if (v) {
                    this.currentValue[0] = v.set({
                        year: date.year,
                        month: date.month,
                        day: date.day,
                        hour: this.showHours() ? this.selectedFromHour : 0,
                        minute: this.showMinutes() ? this.selectedFromMinute : 0,
                        second: this.showSeconds() ? this.selectedFromSecond : 0,
                        millisecond: 0
                    })
                } else {
                    this.currentValue[0] = DateTime.utc(
                        date.year,
                        date.month,
                        date.day,
                        this.showHours() ? this.selectedFromHour : 0,
                        this.showMinutes() ? this.selectedFromMinute : 0,
                        this.showSeconds() ? this.selectedFromSecond : 0
                    ).setZone(this.zone, {keepLocalTime: true});
                }

                this.autoClose();
                break;
            case 'multiple':
                const found = this.currentValue.some(v => (
                    v.year === date.year &&
                    v.month === date.month &&
                    v.day === date.day
                ));
                if (found) {
                    this.currentValue = this.currentValue
                        .filter(v => !(
                            v.year === date.year &&
                            v.month === date.month &&
                            v.day === date.day
                        ));
                }

                if (!found && this.canPickOtherDates()) {
                    this.currentValue.push(DateTime.utc(date.year, date.month, date.day).setZone(this.zone, {keepLocalTime: true}));
                    this.currentValue.sort();
                }
                break;
            case 'range':
                if (!this.isPicking) {
                    const v = this.currentValue[0];

                    this.validateHourSelection('from', DateTime
                        .utc(date.year, date.month, date.day, this.selectedFromHour)
                        .setZone(this.zone, {keepLocalTime: true}));

                    if (v) {
                        this.currentValue[0] = v.set({
                            year: date.year,
                            month: date.month,
                            day: date.day,
                            hour: this.showHours() ? this.selectedFromHour : 0,
                            minute: this.showMinutes() ? this.selectedFromMinute : 0,
                            second: this.showSeconds() ? this.selectedFromSecond : 0,
                            millisecond: 0
                        })
                    } else {
                        this.currentValue[0] = DateTime.utc(
                            date.year,
                            date.month,
                            date.day,
                            this.showHours() ? this.selectedFromHour : 0,
                            this.showMinutes() ? this.selectedFromMinute : 0,
                            this.showSeconds() ? this.selectedFromSecond : 0
                        ).setZone(this.zone, {keepLocalTime: true});
                    }
                    this.isPicking = true;
                    this.currentValue[1] = null;
                } else {
                    let v = this.currentValue[1];
                    if (v) {
                        v = v.set({
                            year: date.year,
                            month: date.month,
                            day: date.day,
                            hour: this.showHours() ? this.selectedFromHour : 0,
                            minute: this.showMinutes() ? this.selectedFromMinute : 0,
                            second: this.showSeconds() ? this.selectedFromSecond : 0,
                            millisecond: 0
                        })
                    } else {
                        v = DateTime.utc(
                            date.year,
                            date.month,
                            date.day,
                            this.showHours() ? this.selectedFromHour : 0,
                            this.showMinutes() ? this.selectedFromMinute : 0,
                            this.showSeconds() ? this.selectedFromSecond : 0
                        ).setZone(this.zone, {keepLocalTime: true});
                    }

                    if (v <= this.currentValue[0]) {
                        this.validateHourSelection('from', DateTime
                            .utc(date.year, date.month, date.day, this.selectedFromHour)
                            .setZone(this.zone, {keepLocalTime: true}));

                        this.currentValue[0] = v.set({
                            hour: this.showHours() ? this.selectedFromHour : 0,
                            minute: this.showMinutes() ? this.selectedFromMinute : 0,
                            second: this.showSeconds() ? this.selectedFromSecond : 0
                        });
                        this.currentValue[1] = null;
                    } else {
                        this.validateHourSelection('to', DateTime
                            .utc(date.year, date.month, date.day, this.selectedToHour)
                            .setZone(this.zone, {keepLocalTime: true}));

                        this.currentValue[1] = v.set({
                            hour: this.showHours() ? this.selectedToHour : 0,
                            minute: this.showMinutes() ? this.selectedToMinute : 0,
                            second: this.showSeconds() ? this.selectedToSecond : 0
                        });
                        this.isPicking = false;
                        this.autoClose();
                    }
                }
                break;
        }

        this.onChangeFn();
    }

    public onHourSelect(hour: HourEntry): void {
        if (!hour.selectable) {
            return;
        }

        const sHour = hour.hour;

        let pmDiff = (this.currentTimePickSource === 'from' ? this.pmFrom : this.pmTo) ? 12 : 0;
        if (this.hourFormat !== '12') {
            pmDiff = 0;
        }

        this.currentView = this.currentView.set({hour: sHour + pmDiff});
        if (this.currentTimePickSource === 'from') {
            this.selectedFromHour = this.currentView.hour;

            if (this.timeOnly && !this.currentValue[0]) {
                this.currentValue[0] = DateTime.fromMillis(0).setZone(this.zone, {keepLocalTime: true});
            }

            this.validateMinuteSelection('from', DateTime
                .utc(this.currentView.year, this.currentView.month, this.currentView.day,
                    this.currentView.hour, this.currentView.minute)
                .setZone(this.zone, {keepLocalTime: true}));

            if (this.currentValue[0]) {
                this.currentValue[0] = this.currentValue[0].set({
                    hour: this.currentView.hour,
                    minute: this.showMinutes() ? this.selectedFromMinute : 0,
                    second: this.showSeconds() ? this.selectedFromSecond : 0,
                    millisecond: 0
                });
            }
        } else if (this.currentTimePickSource === 'to') {
            this.selectedToHour = this.currentView.hour;

            this.validateMinuteSelection('to', DateTime
                .utc(this.currentView.year, this.currentView.month, this.currentView.day,
                    this.currentView.hour, this.currentView.minute)
                .setZone(this.zone, {keepLocalTime: true}));

            if (this.currentValue[1]) {
                this.currentValue[1] = this.currentValue[1].set({
                    hour: this.currentView.hour,
                    minute: this.showMinutes() ? this.selectedToMinute : 0,
                    second: this.showSeconds() ? this.selectedToSecond : 0,
                    millisecond: 0
                });
            }
        }

        if (!this.showSeconds()) {
            this.selectedFromSecond = 0;
            this.selectedToSecond = 0;

            for (let i = 0; i < this.currentValue.length; ++i) {
                this.currentValue[i] = this.currentValue[i].set({
                    second: 0
                })
            }
        }
        if (!this.showMinutes()) {
            this.selectedFromMinute = 0;
            this.selectedToMinute = 0;

            for (let i = 0; i < this.currentValue.length; ++i) {
                this.currentValue[i] = this.currentValue[i].set({
                    minute: 0
                })
            }
        }

        if (!this.timeOnly) {
            this.currentPicking = 'day';
        }
        this.createAppropriateView();

        this.onChangeFn();
    }

    public onMinuteSelect(minute: MinuteEntry): void {
        if (!minute.selectable) {
            return;
        }

        const sMinute = minute.minute;

        this.currentView = this.currentView.set({minute: sMinute});
        if (this.currentTimePickSource === 'from') {
            this.selectedFromMinute = this.currentView.minute;

            this.validateSecondSelection('from', DateTime
                .utc(this.currentView.year, this.currentView.month, this.currentView.day,
                    this.currentView.hour, this.currentView.minute, this.currentView.second)
                .setZone(this.zone, {keepLocalTime: true}));

            if (this.currentValue[0]) {
                this.currentValue[0] = this.currentValue[0].set({
                    minute: sMinute,
                    second: this.showSeconds() ? this.selectedFromSecond : 0,
                    millisecond: 0
                });
            }
        } else if (this.currentTimePickSource === 'to') {
            this.selectedToMinute = this.currentView.minute;

            this.validateSecondSelection('to', DateTime
                .utc(this.currentView.year, this.currentView.month, this.currentView.day,
                    this.currentView.hour, this.currentView.minute, this.currentView.second)
                .setZone(this.zone, {keepLocalTime: true}));

            if (this.currentValue[1]) {
                this.currentValue[1] = this.currentValue[1].set({
                    minute: sMinute,
                    second: this.showSeconds() ? this.selectedToSecond : 0,
                    millisecond: 0
                });
            }
        }

        if (!this.showSeconds()) {
            this.selectedFromSecond = 0;
            this.selectedToSecond = 0;

            for (let i = 0; i < this.currentValue.length; ++i) {
                this.currentValue[i] = this.currentValue[i].set({
                    second: 0
                })
            }
        }

        if (!this.timeOnly) {
            this.currentPicking = 'day';
        } else {
            this.currentPicking = 'hour';
        }
        this.createAppropriateView();

        this.onChangeFn();
    }

    public onSecondSelect(second: SecondEntry): void {
        if (!second.selectable) {
            return;
        }

        const sSecond = second.second;

        this.currentView = this.currentView.set({second: sSecond});
        if (this.currentTimePickSource === 'from') {
            this.selectedFromSecond = this.currentView.second;

            if (this.currentValue[0]) {
                this.currentValue[0] = this.currentValue[0].set({
                    second: sSecond,
                    millisecond: 0
                });
            }
        } else if (this.currentTimePickSource === 'to') {
            this.selectedToSecond = this.currentView.second;

            if (this.currentValue[1]) {
                this.currentValue[1] = this.currentValue[1].set({
                    second: sSecond,
                    millisecond: 0
                });
            }
        }

        if (!this.timeOnly) {
            this.currentPicking = 'day';
        } else {
            this.currentPicking = 'hour';
        }
        this.createAppropriateView();

        this.onChangeFn();
    }

    public toggleAMPM(reference: 'from' | 'to'): void {
        if (reference === 'from') {
            this.selectedFromHour += 12 * (this.pmFrom ? -1 : 1);

            if (this.currentValue[0]) {
                this.currentValue[0] = this.currentValue[0].set({
                    hour: this.selectedFromHour
                });
            }
        } else if (reference === 'to') {
            this.selectedToHour += 12 * (this.pmTo ? -1 : 1);

            if (this.currentValue[1]) {
                this.currentValue[1] = this.currentValue[1].set({
                    hour: this.selectedToHour
                });
            }
        }

        if (reference === this.currentTimePickSource) {
            this.createAppropriateView();
        }

        this.onChangeFn();
    }

    // endregion

    // region Template Out
    public isPrecisionValid(): boolean {
        return this.precision === 'year' || this.showMonth();
    }

    public showMonth(): boolean {
        return this.precision === 'month' || this.showDay();
    }

    public showDay(): boolean {
        return this.precision === 'day' || this.showHours();
    }

    public showHours(): boolean {
        return this.precision === 'hour' || this.showMinutes();
    }

    public showMinutes(): boolean {
        return this.precision === 'minute' || this.showSeconds();
    }

    public showSeconds(): boolean {
        return this.precision === 'second';
    }

    public isSourceFrom(): boolean {
        return this.currentTimePickSource === 'from';
    }

    public isRangeSelection(): boolean {
        return this.selectionMode === 'range';
    }

    public labelPM(): string {
        return this.locale.pm;
    }

    public labelAM(): string {
        return this.locale.am;
    }

    public currentMonthLabel(): string {
        return this.currentView ? this.locale.monthNames[this.currentView.month - 1] : '--';
    }

    public currentYearLabel(): string {
        return this.currentView ? `${this.currentView.year}` : '--';
    }

    public currentHourLabel(source: 'from' | 'to'): number {
        const h24 = this.hourFormat !== '12';
        let hour = source === 'from' ? this.selectedFromHour : this.selectedToHour;

        if (!h24) {
            const pm = hour >= 12;

            if (pm) {
                hour -= 12;
            }

            if (hour === 0) {
                hour = 12;
            }
        }

        return hour;
    }

    public isYearSelected(year: YearEntry): boolean {
        const sYear = year.year;

        switch (this.selectionMode) {
            case 'single':
                return (
                    this.currentValue[0] &&
                    this.currentValue[0].year === sYear
                );
            case 'multiple':
                return this.currentValue
                    .some(v => (
                        v.year === sYear
                    ));
            case 'range': {
                const d = DateTime.utc(sYear, 1, 1).setZone(this.zone, {keepLocalTime: true});

                if (this.currentValue[0]) {
                    if (d.hasSame(this.currentValue[0], 'year')) {
                        return true;
                    }
                }

                return this.currentValue[0] && this.currentValue[1] && (
                    this.currentValue[0].startOf('year') <= d &&
                    this.currentValue[1].endOf('year') >= d
                );
            }
        }
        return false;
    }

    public isMonthSelected(month: MonthEntry): boolean {
        const sMonth = month.month;

        switch (this.selectionMode) {
            case 'single':
                return (
                    this.currentValue[0] &&
                    this.currentValue[0].year === this.currentView.year &&
                    this.currentValue[0].month === sMonth
                );
            case 'multiple':
                return this.currentValue
                    .some(v => (
                        v.year === this.currentView.year &&
                        v.month === sMonth
                    ));
            case 'range': {
                const d = DateTime.utc(this.currentView.year, sMonth, 1).setZone(this.zone, {keepLocalTime: true});

                if (this.currentValue[0]) {
                    if (d.hasSame(this.currentValue[0], 'month')) {
                        return true;
                    }
                }

                return this.currentValue[0] && this.currentValue[1] && (
                    this.currentValue[0].startOf('month') <= d &&
                    this.currentValue[1].endOf('month') >= d
                );
            }
        }
        return false;
    }

    public isDaySelected(date: DayEntry): boolean {
        switch (this.selectionMode) {
            case 'single':
                return (
                    this.currentValue[0] &&
                    this.currentValue[0].year === date.year &&
                    this.currentValue[0].month === date.month &&
                    this.currentValue[0].day === date.day
                );
            case 'multiple':
                return this.currentValue
                    .some(v => (
                        v.year === date.year &&
                        v.month === date.month &&
                        v.day === date.day
                    ));
            case 'range': {
                const d = DateTime.utc(date.year, date.month, date.day).setZone(this.zone, {keepLocalTime: true});

                if (this.currentValue[0]) {
                    if (d.hasSame(this.currentValue[0], 'day')) {
                        return true;
                    }
                }

                return this.currentValue[0] && this.currentValue[1] && (
                    this.currentValue[0].startOf('day') <= d &&
                    this.currentValue[1].endOf('day') >= d
                );
            }
        }

        return false;
    }

    public isHourSelected(hour: HourEntry): boolean {
        return hour.hour === this.currentView.hour;
    }

    public isMinuteSelected(minute: MinuteEntry): boolean {
        return minute.minute === this.currentView.minute;
    }

    public isSecondSelected(second: SecondEntry): boolean {
        return second.second === this.currentView.second;
    }

    // endregion

    // region Table views
    private createWeekDays(): void {
        this.weekDays = [];
        this.weekDays.length = 7;

        let dayIdx = this.firstDayOfWeek;
        for (let i = 0; i < 7; ++i) {
            this.weekDays[i] = this.locale.dayNamesMin[dayIdx];
            dayIdx = (dayIdx === 6) ? 0 : ++dayIdx;
        }
    }

    private createAppropriateView(): void {
        if (!this.currentView) {
            return;
        }

        switch (this.currentPicking) {
            case 'year':
                this.createYearView();
                break;
            case 'month':
                this.createMonthView();
                break;
            case 'day':
                this.createDayView();
                break;
            case 'hour':
                this.createHourView();
                break;
            case 'minute':
                this.createMinuteView();
                break;
            case 'second':
                this.createSecondView();
                break;
        }
    }

    private createYearView(): void {
        this.tableViewYear = [];

        let year = this.currentView.year;
        year -= year % 18;

        for (let i = 0; i < 6; ++i) {
            const yRow: YearEntry[] = [];
            for (let j = 0; j < 3; ++j) {
                yRow.push({
                    year: year,
                    selectable: this.isYearSelectable(year)
                });

                year++;
            }
            this.tableViewYear.push(yRow);
        }
    }

    private createMonthView(): void {
        this.tableViewMonth = [];

        let month: number = 1;
        for (let i = 0; i < 6; ++i) {
            const mRow: MonthEntry[] = [];
            for (let j = 0; j < 2; ++j) {
                mRow.push({
                    year: this.currentView.year,
                    month: month,
                    selectable: this.isMonthSelectable(month)
                });

                month++;
            }
            this.tableViewMonth.push(mRow);
        }
    }

    private createDayView(): void {
        this.createWeekDays();

        this.tableViewDay = [];

        const monthThis = this.currentView.startOf('month');
        const monthPrev = monthThis.minus({months: 1});
        const monthNext = monthThis.plus({months: 1});

        const firstDay = this.getWeekdayIndex(monthThis);
        const daysLength = monthThis.daysInMonth;
        const prevMonthDaysLength = monthPrev.daysInMonth;

        let dayNo = 1;
        const today = DateTime.utc();
        const isToday = (day, month, year) => today.day === day && today.month === month && today.year === year;

        for (let i = 0; i < 6; ++i) {
            const week: DayEntry[] = [];

            if (i === 0) {
                for (let j = (prevMonthDaysLength - firstDay + 1); j <= prevMonthDaysLength; ++j) {
                    week.push({
                        day: j,
                        month: monthPrev.month,
                        year: monthPrev.year,
                        otherMonth: true,
                        today: isToday(j, monthPrev.month, monthPrev.year),
                        selectable: false
                    });
                }

                let remainingDaysLength = 7 - week.length;
                for (let j = 0; j < remainingDaysLength; ++j) {
                    week.push({
                        day: dayNo,
                        month: monthThis.month,
                        year: monthThis.year,
                        today: isToday(dayNo, monthThis.month, monthThis.year),
                        selectable: this.isDaySelectable(dayNo),
                        otherMonth: false
                    });
                    dayNo++;
                }
            } else {
                for (let j = 0; j < 7; ++j) {
                    if (dayNo > daysLength) {
                        week.push({
                            day: dayNo - daysLength,
                            month: monthNext.month,
                            year: monthNext.year,
                            otherMonth: true,
                            today: isToday(dayNo - daysLength, monthNext.month, monthNext.year),
                            selectable: false
                        });
                    } else {
                        week.push({
                            day: dayNo,
                            month: monthThis.month,
                            year: monthThis.year,
                            today: isToday(dayNo, monthThis.month, monthThis.year),
                            selectable: this.isDaySelectable(dayNo),
                            otherMonth: false
                        });
                    }

                    dayNo++;
                }
            }

            this.tableViewDay.push(week);
        }
    }

    private createHourView(): void {
        const date = (this.currentTimePickSource === 'from' ? this.currentValue[0] : this.currentValue[1]) || this.currentView;
        this.tableViewHour = [];

        let hour = 0;
        const h24 = this.hourFormat !== '12';
        const isPm = this.currentTimePickSource === 'from' ? this.pmFrom : this.pmTo;

        for (let i = 0; i < 6; ++i) {
            const hRow: HourEntry[] = [];
            for (let j = 0; j < (h24 ? 4 : 2); ++j) {
                const realHour = hour + (!h24 && isPm ? 12 : 0);

                hRow.push({
                    year: date.year,
                    month: date.month,
                    day: date.day,
                    hour: realHour,
                    label: (!h24 && hour === 0) ? 12 : hour,
                    selectable: this.isHourSelectable(realHour)
                });

                hour++;
            }
            this.tableViewHour.push(hRow);
        }
    }

    private createMinuteView(): void {
        const date = (this.currentTimePickSource === 'from' ? this.currentValue[0] : this.currentValue[1]) || this.currentView;
        this.tableViewMinute = [];

        let minute = 0;

        for (let i = 0; i < 6; ++i) {
            const mRow: MinuteEntry[] = [];
            for (let j = 0; j < 10; ++j) {
                mRow.push({
                    year: date.year,
                    month: date.month,
                    day: date.day,
                    hour: date.hour,
                    minute: minute,
                    selectable: this.isMinuteSelectable(minute)
                });

                minute++;
            }
            this.tableViewMinute.push(mRow);
        }
    }

    private createSecondView(): void {
        const date = (this.currentTimePickSource === 'from' ? this.currentValue[0] : this.currentValue[1]) || this.currentView;
        this.tableViewSecond = [];

        let second = 0;

        for (let i = 0; i < 6; ++i) {
            const sRow: SecondEntry[] = [];
            for (let j = 0; j < 10; ++j) {
                sRow.push({
                    year: date.year,
                    month: date.month,
                    day: date.day,
                    hour: date.hour,
                    minute: date.minute,
                    second: second,
                    selectable: this.isSecondSelectable(second)
                });

                second++;
            }
            this.tableViewSecond.push(sRow);
        }
    }

    // endregion

    private showOverlay(): void {
        if (!this.overlayVisible) {
            this.currentTimePickSource = 'from';
            this.currentPicking = this.timeOnly ? 'hour' : (this.showHours() ? 'day' : this.precision);
            this.createAppropriateView();
        }

        this.isPicking = false;
        this.overlayVisible = true;
        this.overlayShown = true;
        if (this.autoZIndex) {
            this.datePickerVC.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }

        this.bindDocumentClickListener();
    }

    private autoClose(): void {
        if (this.inline) {
            return;
        }

        if (this.hideOnDateTimeSelect || !this.showHours()) {
            this.hideOverlay();
        }
    }

    private hideOverlay(): void {
        this.isPicking = false;
        this.overlayVisible = false;
        this.onTouchFn();
    }

    private prepareMaskProperties(): void {
        const availableTokens = [
            'd', 'dd',
            'M', 'MM',
            'y', 'yy', 'yyyy'
        ];

        const h24 = this.hourFormat !== '12';
        const min = this.showMinutes();
        const sec = this.showSeconds();

        const timeMaskFormat = `99:${min ? '99' : '00'}${sec ? ':99' : ''}${!h24 ? ' aa' : ''}`;
        const timeOutputFormat = `${h24 ? 'HH' : 'hh'}:${min ? 'mm' : '00'}${sec ? ':ss' : ''}${!h24 ? ' a' : ''}`;
        const timePlaceholderFormat = `${h24 ? 'HH' : 'hh'}:${min ? 'mm' : '00'}${sec ? ':ss' : ''}${!h24 ? ' #' : ''}`;

        if (this.readonlyInput) {
            this.maskFormat = '';
            this.maskPlaceholder = '';

            if (this.timeOnly) {
                this.outputFormat = timeOutputFormat;
            } else {
                let newDateFormat = '';

                let compoundString = this.dateFormat[0];
                for (let i = 1; i < this.dateFormat.length; ++i) {
                    const char = this.dateFormat[i];

                    let shouldProcess = true;

                    if (compoundString[0] === char) {
                        compoundString += char;
                        shouldProcess = false;
                    }

                    if (i >= this.dateFormat.length - 1) {
                        shouldProcess = true;
                    }

                    if (shouldProcess) {
                        // Process lastChar
                        if (availableTokens.some(t => t === compoundString)) {

                            switch (compoundString) {
                                case 'd':
                                case 'dd':
                                    if (this.showDay()) {
                                        newDateFormat += compoundString;
                                    }
                                    break;
                                case 'M':
                                case 'MM':
                                    if (this.showMonth()) {
                                        newDateFormat += compoundString;
                                    }
                                    break;
                                case 'y':
                                case 'yy':
                                case 'yyyy':
                                    newDateFormat += compoundString;
                                    break;
                            }
                        } else {
                            newDateFormat += compoundString;
                        }

                        compoundString = char;
                    }
                }

                this.outputFormat = newDateFormat;
                if (this.showHours()) {
                    this.outputFormat += ` ${timeOutputFormat}`;
                }
            }
        } else {
            if (this.timeOnly) {
                this.maskFormat = timeMaskFormat;
                this.outputFormat = timeOutputFormat;
                this.maskPlaceholder = timePlaceholderFormat;
            } else {
                let mask = '';
                let newDateFormat = '';

                let compoundString = this.dateFormat[0];
                for (let i = 1; i < this.dateFormat.length; ++i) {
                    const char = this.dateFormat[i];

                    let shouldProcess = true;

                    if (compoundString[0] === char) {
                        compoundString += char;
                        shouldProcess = false;
                    }

                    if (i >= this.dateFormat.length - 1) {
                        shouldProcess = true;
                    }

                    if (shouldProcess) {
                        // Process lastChar
                        if (availableTokens.some(t => t === compoundString)) {
                            if (compoundString === 'd') {
                                compoundString = 'dd';
                            } else if (compoundString === 'M') {
                                compoundString = 'MM';
                            } else if (compoundString === 'y') {
                                compoundString = 'yyyy';
                            }

                            switch (compoundString) {
                                case 'dd':
                                    if (this.showDay()) {
                                        mask += '99';
                                        newDateFormat += compoundString;
                                    }
                                    break;
                                case 'MM':
                                    if (this.showMonth()) {
                                        mask += '99';
                                        newDateFormat += compoundString;
                                    }
                                    break;
                                case 'yy':
                                    mask += '99';
                                    newDateFormat += compoundString;
                                    break;
                                case 'yyyy':
                                    mask += '9999';
                                    newDateFormat += compoundString;
                                    break;
                            }
                        } else {
                            mask += compoundString;
                            newDateFormat += compoundString;
                        }

                        compoundString = char;
                    }
                }

                this.maskFormat = mask;
                this.maskPlaceholder = newDateFormat;
                this.outputFormat = newDateFormat;

                if (this.showHours()) {
                    this.maskFormat += ` ${timeMaskFormat}`;
                    this.outputFormat += ` ${timeOutputFormat}`;
                    this.maskPlaceholder += ` ${timePlaceholderFormat}`;
                }
            }
        }

        this.changeDetector.detectChanges();
    }

    private getWeekdayIndex(date: DateTime): number {
        const tmp = date.weekday + this.getMondayIndex() - 1;
        return tmp >= 7 ? tmp - 7 : tmp;
    }

    private getMondayIndex() {
        return this.firstDayOfWeek > 0 ? 7 - this.firstDayOfWeek : 0;
    }

    private canPickOtherDates(): boolean {
        return !Number.isFinite(this.maxDateCount) || this.maxDateCount <= 0 || this.maxDateCount > this.currentValue.length;
    }

    private validateHourSelection(source: 'from' | 'to', date: DateTime): void {
        if (!this.showHours()) {
            return;
        }

        const minDate = this.toDateTime(this.minDate);
        if (minDate && minDate.hasSame(date, 'day') && minDate.hour > date.hour) {
            date = date.set({hour: minDate.hour});
        }

        const maxDate = this.toDateTime(this.maxDate);
        if (maxDate && maxDate.hasSame(date, 'day') && maxDate.hour < date.hour) {
            date = date.set({hour: maxDate.hour});
        }

        if (source === 'from') {
            this.selectedFromHour = date.hour;
        } else {
            this.selectedToHour = date.hour;
        }

        this.validateMinuteSelection(source, date.set({
            minute: source === 'from' ? this.selectedFromMinute : this.selectedToMinute
        }));
    }

    private validateMinuteSelection(source: 'from' | 'to', date: DateTime): void {
        if (!this.showMinutes()) {
            return;
        }

        const minDate = this.toDateTime(this.minDate);
        if (minDate && minDate.hasSame(date, 'hour') && minDate.minute > date.minute) {
            date = date.set({minute: minDate.minute});
        }

        const maxDate = this.toDateTime(this.maxDate);
        if (maxDate && maxDate.hasSame(date, 'hour') && maxDate.minute < date.minute) {
            date = date.set({minute: maxDate.minute});
        }

        if (source === 'from') {
            this.selectedFromMinute = date.minute;
        } else {
            this.selectedToMinute = date.minute;
        }

        this.validateSecondSelection(source, date.set({
            second: source === 'from' ? this.selectedFromSecond : this.selectedToSecond
        }));
    }

    private validateSecondSelection(source: 'from' | 'to', date: DateTime): void {
        if (!this.showSeconds()) {
            return;
        }

        const minDate = this.toDateTime(this.minDate);
        if (minDate && minDate.hasSame(date, 'minute') && minDate.second > date.second) {
            date = date.set({second: minDate.second});
        }

        const maxDate = this.toDateTime(this.maxDate);
        if (maxDate && maxDate.hasSame(date, 'minute') && maxDate.second < date.second) {
            date = date.set({second: maxDate.second});
        }

        if (source === 'from') {
            this.selectedFromSecond = date.second;
        } else {
            this.selectedToSecond = date.second;
        }
    }

    // region Selection Availability
    private isYearSelectable(year: number,
                             minDate: DateTime = this.toDateTime(this.minDate),
                             maxDate: DateTime = this.toDateTime(this.maxDate)): boolean {

        return (!minDate || minDate.year <= year) && (!maxDate || maxDate.year >= year);
    }

    private isMonthSelectable(month: number,
                              minDate: DateTime = this.toDateTime(this.minDate),
                              maxDate: DateTime = this.toDateTime(this.maxDate)): boolean {
        const cYear = this.currentView.year;

        return this.isYearSelectable(cYear, minDate, maxDate) && (
            (!minDate || (minDate.year < cYear || minDate.month <= month)) &&
            (!maxDate || (maxDate.year > cYear || maxDate.month >= month))
        );
    }

    private isDaySelectable(day: number,
                            minDate: DateTime = this.toDateTime(this.minDate),
                            maxDate: DateTime = this.toDateTime(this.maxDate)): boolean {
        const cYear = this.currentView.year;
        const cMonth = this.currentView.month;

        const date = DateTime.utc(cYear, cMonth, day);

        if (this.disabledDays && this.disabledDays.indexOf(date.weekday - 1) >= 0) {
            return false;
        }

        if (this.disabledDates) {
            const notSelectable = this.disabledDates
                .map(d => this.toDateTime(d))
                .filter(d => d != null)
                .some(d => d.hasSame(date, 'day'));

            if (notSelectable) {
                return false;
            }
        }

        return this.isMonthSelectable(cMonth, minDate, maxDate) && (
            (!minDate || (minDate.year < cYear || minDate.month < cMonth || minDate.day <= day)) &&
            (!maxDate || (maxDate.year > cYear || maxDate.month > cMonth || maxDate.day >= day))
        );
    }

    private isHourSelectable(hour: number,
                             minDate: DateTime = this.toDateTime(this.minDate),
                             maxDate: DateTime = this.toDateTime(this.maxDate)): boolean {
        const date = (this.currentTimePickSource === 'from' ? this.currentValue[0] : this.currentValue[1]) || this.currentView;

        const cYear = date.year;
        const cMonth = date.month;
        const cDay = date.day;

        return this.isDaySelectable(cDay, minDate, maxDate) && (
            (!minDate || (minDate.year < cYear || minDate.month < cMonth || minDate.day < cDay || minDate.hour <= hour)) &&
            (!maxDate || (maxDate.year > cYear || maxDate.month > cMonth || maxDate.day > cDay || maxDate.hour >= hour))
        );
    }

    private isMinuteSelectable(minute: number,
                               minDate: DateTime = this.toDateTime(this.minDate),
                               maxDate: DateTime = this.toDateTime(this.maxDate)): boolean {
        const date = (this.currentTimePickSource === 'from' ? this.currentValue[0] : this.currentValue[1]) || this.currentView;

        const cYear = date.year;
        const cMonth = date.month;
        const cDay = date.day;
        const cHour = date.hour;

        return this.isHourSelectable(cHour, minDate, maxDate) && (
            (!minDate || (minDate.year < cYear || minDate.month < cMonth || minDate.day < cDay || minDate.hour < cHour || minDate.minute <= minute)) &&
            (!maxDate || (maxDate.year > cYear || maxDate.month > cMonth || maxDate.day > cDay || maxDate.hour > cHour || maxDate.minute >= minute))
        );
    }

    private isSecondSelectable(second: number,
                               minDate: DateTime = this.toDateTime(this.minDate),
                               maxDate: DateTime = this.toDateTime(this.maxDate)): boolean {
        const date = (this.currentTimePickSource === 'from' ? this.currentValue[0] : this.currentValue[1]) || this.currentView;

        const cYear = date.year;
        const cMonth = date.month;
        const cDay = date.day;
        const cHour = date.hour;
        const cMinute = date.minute;

        return this.isMinuteSelectable(cMinute, minDate, maxDate) && (
            (!minDate || (minDate.year < cYear || minDate.month < cMonth || minDate.day < cDay || minDate.hour < cHour || minDate.minute < cMinute || minDate.second <= second)) &&
            (!maxDate || (maxDate.year > cYear || maxDate.month > cMonth || maxDate.day > cDay || maxDate.hour > cHour || maxDate.minute > cMinute || maxDate.second >= second))
        );
    }

    // endregion

    private updateInputView(): void {
        this.maskBinding = '';

        switch (this.selectionMode) {
            case 'single':
                if (this.currentValue.length === 1 && this.currentValue[0]) {
                    this.maskBinding = this.currentValue[0].toFormat(this.outputFormat);
                }
                break;
            case 'multiple':
                this.maskBinding = this.currentValue
                    .filter(v => v != null)
                    .map(v => v.startOf('day').toFormat(this.outputFormat)).join(', ');
                break;
            case 'range':
                if (this.currentValue.length === 2 && this.currentValue.every(v => v != null)) {
                    this.maskBinding = this.currentValue[0].toFormat(this.outputFormat) + ' - ' +
                        this.currentValue[1].toFormat(this.outputFormat);
                }
                break;
        }

    }

    // region Conversion utils
    private toDateTime(value: DatePickerValue): DateTime {
        switch (this.dataType) {
            case 'timestamp':
                if (typeof value === 'number' && Number.isFinite(value)) {
                    return DateTime.fromMillis(value).setZone(this.zone);
                }
                break;
            case 'luxon':
                if (value instanceof DateTime) {
                    return value.setZone(this.zone);
                }
                break;
            case 'date':
                if (value instanceof Date) {
                    return DateTime.fromJSDate(value).setZone(this.zone);
                }
                break;
        }
        return null;
    }

    private toFireValue(value: DateTime): DatePickerValue {
        switch (this.dataType) {
            case 'timestamp':
                return value.toMillis();
            case 'luxon':
                return value;
            case 'date':
            default:
                return value.toJSDate();
        }
    }

    // endregion

    // region Document Events
    private bindDocumentClickListener(): void {
        if (!this.documentClickListener) {
            this.documentClickListener = fromEvent(this.dom, 'click')
                .subscribe((evt: Event) => {
                    if (!this.datePickerClick && this.overlayVisible) {
                        this.hideOverlay();
                        this.onClose.emit(evt);
                    }

                    this.datePickerClick = false;
                    this.changeDetector.detectChanges();
                });
        }
    }

    private unbindDocumentClickListener(): void {
        if (this.documentClickListener) {
            this.documentClickListener.unsubscribe();
            this.documentClickListener = null;
        }
    }

    // endregion
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,

        ButtonModule,
        InputMaskModule,
        SharedModule
    ],
    exports: [
        DatePicker,
        ButtonModule,
        InputMaskModule,
        SharedModule
    ],
    declarations: [
        DatePicker,
        DatePickerPadPipe
    ]
})
export class DatePickerModule {
    public static configure(options: {
        defaultFirstDayOfWeek: number,
        defaultLocale: DatePickerLocaleData
    }): ModuleWithProviders {
        if (options) {
            if (options.defaultFirstDayOfWeek != null) {
                DatePicker.defaultFirstDayOfWeek = options.defaultFirstDayOfWeek;
            }
            if (options.defaultLocale != null) {
                DatePicker.defaultLocale = options.defaultLocale;
            }
        }

        return {
            ngModule: DatePickerModule,
            providers: []
        };
    }
}
