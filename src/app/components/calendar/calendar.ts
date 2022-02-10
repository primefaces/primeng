import {NgModule,Component,ElementRef,OnDestroy,OnInit,Input,Output,EventEmitter,forwardRef,Renderer2,
        ViewChild,ChangeDetectorRef,TemplateRef,ContentChildren,QueryList,NgZone,ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {trigger,state,style,transition,animate,AnimationEvent} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {DomHandler, ConnectedOverlayScrollHandler} from 'primeng/dom';
import {SharedModule,PrimeTemplate,PrimeNGConfig,TranslationKeys, OverlayService} from 'primeng/api';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {Subscription} from 'rxjs';
import {UniqueComponentId, ZIndexUtils, ObjectUtils} from 'primeng/utils';

export const CALENDAR_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Calendar),
    multi: true
};

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

@Component({
    selector: 'p-calendar',
    template:  `
        <span #container [ngClass]="{'p-calendar':true, 'p-calendar-w-btn': showIcon, 'p-calendar-timeonly': timeOnly, 'p-calendar-disabled':disabled, 'p-focus': focus}" [ngStyle]="style" [class]="styleClass">
            <ng-template [ngIf]="!inline">
                <input #inputfield type="text" [attr.id]="inputId" [attr.name]="name" [attr.required]="required" [attr.aria-required]="required" [value]="inputFieldValue" (focus)="onInputFocus($event)" (keydown)="onInputKeydown($event)" (click)="onInputClick()" (blur)="onInputBlur($event)"
                    [readonly]="readonlyInput" (input)="onUserInput($event)" [ngStyle]="inputStyle" [class]="inputStyleClass" [placeholder]="placeholder||''" [disabled]="disabled" [attr.tabindex]="tabindex" [attr.inputmode]="touchUI ? 'off' : null"
                    [ngClass]="'p-inputtext p-component'" autocomplete="off" [attr.aria-labelledby]="ariaLabelledBy"
                    ><button type="button" [attr.aria-label]="iconAriaLabel" [icon]="icon" pButton pRipple *ngIf="showIcon" (click)="onButtonClick($event,inputfield)" class="p-datepicker-trigger"
                    [disabled]="disabled" tabindex="0"></button>
            </ng-template>
            <div #contentWrapper [class]="panelStyleClass" [ngStyle]="panelStyle" [ngClass]="{'p-datepicker p-component': true, 'p-datepicker-inline':inline,
                'p-disabled':disabled,'p-datepicker-timeonly':timeOnly,'p-datepicker-multiple-month': this.numberOfMonths > 1, 'p-datepicker-monthpicker': (view === 'month'), 'p-datepicker-touch-ui': touchUI}"
                [@overlayAnimation]="touchUI ? {value: 'visibleTouchUI', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}:
                                            {value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}"
                                            [@.disabled]="inline === true" (@overlayAnimation.start)="onOverlayAnimationStart($event)" (@overlayAnimation.done)="onOverlayAnimationDone($event)" (click)="onOverlayClick($event)" *ngIf="inline || overlayVisible">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                <ng-container *ngIf="!timeOnly">
                    <div class="p-datepicker-group-container">
                        <div class="p-datepicker-group" *ngFor="let month of months; let i = index;">
                            <div class="p-datepicker-header">
                                <button (keydown)="onContainerButtonKeydown($event)" class="p-datepicker-prev p-link" (click)="onPrevButtonClick($event)" *ngIf="i === 0" type="button" pRipple>
                                    <span class="p-datepicker-prev-icon pi pi-chevron-left"></span>
                                </button>
                                <div class="p-datepicker-title">
                                    <button type="button" (click)="switchToMonthView($event)" (keydown)="onContainerButtonKeydown($event)" *ngIf="currentView === 'date'" class="p-datepicker-month p-link" [disabled]="switchViewButtonDisabled()">
                                        {{getMonthName(month.month)}}
                                    </button>
                                    <button type="button" (click)="switchToYearView($event)" (keydown)="onContainerButtonKeydown($event)" *ngIf="currentView !== 'year'" class="p-datepicker-year p-link" [disabled]="switchViewButtonDisabled()">
                                        {{getYear(month)}}
                                    </button>
                                    <span class="p-datepicker-decade" *ngIf="currentView === 'year'">
                                        <ng-container *ngIf="!decadeTemplate">{{yearPickerValues()[0]}} - {{yearPickerValues()[yearPickerValues().length - 1]}}</ng-container>
                                        <ng-container *ngTemplateOutlet="decadeTemplate; context: {$implicit: yearPickerValues}"></ng-container>
                                    </span>
                                </div>
                                <button (keydown)="onContainerButtonKeydown($event)" class="p-datepicker-next p-link" (click)="onNextButtonClick($event)" [style.display]="numberOfMonths === 1 ? 'inline-flex' : (i === numberOfMonths -1) ? 'inline-flex' : 'none'" type="button" pRipple>
                                    <span class="p-datepicker-next-icon pi pi-chevron-right"></span>
                                </button>
                            </div>
                            <div class="p-datepicker-calendar-container" *ngIf="currentView ==='date'">
                                <table class="p-datepicker-calendar">
                                    <thead>
                                        <tr>
                                            <th *ngIf="showWeek" class="p-datepicker-weekheader p-disabled">
                                                <span>{{getTranslation('weekHeader')}}</span>
                                            </th>
                                            <th scope="col" *ngFor="let weekDay of weekDays;let begin = first; let end = last">
                                                <span>{{weekDay}}</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr *ngFor="let week of month.dates; let j = index;">
                                            <td *ngIf="showWeek" class="p-datepicker-weeknumber">
                                                <span class="p-disabled">
                                                    {{month.weekNumbers[j]}}
                                                </span>
                                            </td>
                                            <td *ngFor="let date of week" [ngClass]="{'p-datepicker-other-month': date.otherMonth,'p-datepicker-today':date.today}">
                                                <ng-container *ngIf="date.otherMonth ? showOtherMonths : true">
                                                    <span [ngClass]="{'p-highlight':isSelected(date), 'p-disabled': !date.selectable}"
                                                        (click)="onDateSelect($event,date)" draggable="false" (keydown)="onDateCellKeydown($event,date,i)" pRipple>
                                                        <ng-container *ngIf="!dateTemplate">{{date.day}}</ng-container>
                                                        <ng-container *ngTemplateOutlet="dateTemplate; context: {$implicit: date}"></ng-container>
                                                    </span>
                                                </ng-container>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="p-monthpicker" *ngIf="currentView === 'month'">
                        <span *ngFor="let m of monthPickerValues(); let i = index" (click)="onMonthSelect($event, i)" (keydown)="onMonthCellKeydown($event,i)" class="p-monthpicker-month" [ngClass]="{'p-highlight': isMonthSelected(i)}" pRipple>
                            {{m}}
                        </span>
                    </div>
                    <div class="p-yearpicker" *ngIf="currentView === 'year'">
                        <span *ngFor="let y of yearPickerValues()" (click)="onYearSelect($event, y)" (keydown)="onYearCellKeydown($event,y)" class="p-yearpicker-year" [ngClass]="{'p-highlight': isYearSelected(y)}" pRipple>
                            {{y}}
                        </span>
                    </div>
                </ng-container>
                <div class="p-timepicker" *ngIf="showTime||timeOnly">
                    <div class="p-hour-picker">
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="incrementHour($event)" (keydown.space)="incrementHour($event)" (mousedown)="onTimePickerElementMouseDown($event, 0, 1)" (mouseup)="onTimePickerElementMouseUp($event)" (keyup.enter)="onTimePickerElementMouseUp($event)" (keyup.space)="onTimePickerElementMouseUp($event)" (mouseleave)="onTimePickerElementMouseLeave()" pRipple>
                            <span class="pi pi-chevron-up"></span>
                        </button>
                        <span><ng-container *ngIf="currentHour < 10">0</ng-container>{{currentHour}}</span>
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="decrementHour($event)" (keydown.space)="decrementHour($event)" (mousedown)="onTimePickerElementMouseDown($event, 0, -1)" (mouseup)="onTimePickerElementMouseUp($event)" (keyup.enter)="onTimePickerElementMouseUp($event)" (keyup.space)="onTimePickerElementMouseUp($event)" (mouseleave)="onTimePickerElementMouseLeave()" pRipple>
                            <span class="pi pi-chevron-down"></span>
                        </button>
                    </div>
                    <div class="p-separator">
                        <span>{{timeSeparator}}</span>
                    </div>
                    <div class="p-minute-picker">
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="incrementMinute($event)" (keydown.space)="incrementMinute($event)" (mousedown)="onTimePickerElementMouseDown($event, 1, 1)" (mouseup)="onTimePickerElementMouseUp($event)" (keyup.enter)="onTimePickerElementMouseUp($event)" (keyup.space)="onTimePickerElementMouseUp($event)" (mouseleave)="onTimePickerElementMouseLeave()" pRipple>
                            <span class="pi pi-chevron-up"></span>
                        </button>
                        <span><ng-container *ngIf="currentMinute < 10">0</ng-container>{{currentMinute}}</span>
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="decrementMinute($event)" (keydown.space)="decrementMinute($event)" (mousedown)="onTimePickerElementMouseDown($event, 1, -1)" (mouseup)="onTimePickerElementMouseUp($event)" (keyup.enter)="onTimePickerElementMouseUp($event)" (keyup.space)="onTimePickerElementMouseUp($event)" (mouseleave)="onTimePickerElementMouseLeave()" pRipple>
                            <span class="pi pi-chevron-down"></span>
                        </button>
                    </div>
                    <div class="p-separator" *ngIf="showSeconds">
                        <span>{{timeSeparator}}</span>
                    </div>
                    <div class="p-second-picker" *ngIf="showSeconds">
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="incrementSecond($event)" (keydown.space)="incrementSecond($event)" (mousedown)="onTimePickerElementMouseDown($event, 2, 1)" (mouseup)="onTimePickerElementMouseUp($event)" (keyup.enter)="onTimePickerElementMouseUp($event)" (keyup.space)="onTimePickerElementMouseUp($event)" (mouseleave)="onTimePickerElementMouseLeave()" pRipple>
                            <span class="pi pi-chevron-up"></span>
                        </button>
                        <span><ng-container *ngIf="currentSecond < 10">0</ng-container>{{currentSecond}}</span>
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="decrementSecond($event)" (keydown.space)="decrementSecond($event)" (mousedown)="onTimePickerElementMouseDown($event, 2, -1)" (mouseup)="onTimePickerElementMouseUp($event)" (keyup.enter)="onTimePickerElementMouseUp($event)" (keyup.space)="onTimePickerElementMouseUp($event)" (mouseleave)="onTimePickerElementMouseLeave()" pRipple>
                            <span class="pi pi-chevron-down"></span>
                        </button>
                    </div>
                    <div class="p-ampm-picker" *ngIf="hourFormat=='12'">
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (click)="toggleAMPM($event)" (keydown.enter)="toggleAMPM($event)" pRipple>
                            <span class="pi pi-chevron-up"></span>
                        </button>
                        <span>{{pm ? 'PM' : 'AM'}}</span>
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (click)="toggleAMPM($event)" (keydown.enter)="toggleAMPM($event)" pRipple>
                            <span class="pi pi-chevron-down"></span>
                        </button>
                    </div>
                </div>
                <div class="p-datepicker-buttonbar" *ngIf="showButtonBar">
                    <button type="button" [label]="getTranslation('today')" (keydown)="onContainerButtonKeydown($event)" (click)="onTodayButtonClick($event)" pButton pRipple [ngClass]="[todayButtonStyleClass]"></button>
                    <button type="button" [label]="getTranslation('clear')" (keydown)="onContainerButtonKeydown($event)" (click)="onClearButtonClick($event)" pButton pRipple [ngClass]="[clearButtonStyleClass]"></button>
                </div>
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </span>
    `,
    animations: [
        trigger('overlayAnimation', [
            state('visibleTouchUI', style({
                transform: 'translate(-50%,-50%)',
                opacity: 1
            })),
            transition('void => visible', [
                style({opacity: 0, transform: 'scaleY(0.8)'}),
                animate('{{showTransitionParams}}', style({ opacity: 1, transform: '*' }))
            ]),
            transition('visible => void', [
                animate('{{hideTransitionParams}}', style({ opacity: 0 }))
            ]),
            transition('void => visibleTouchUI', [
                style({opacity: 0, transform: 'translate3d(-50%, -40%, 0) scale(0.9)'}),
                animate('{{showTransitionParams}}')
            ]),
            transition('visibleTouchUI => void', [
                animate(('{{hideTransitionParams}}'),
                style({
                    opacity: 0,
                    transform: 'translate3d(-50%, -40%, 0) scale(0.9)'
                }))
            ])
        ])
    ],
    host: {
        'class': 'p-element p-inputwrapper',
        '[class.p-inputwrapper-filled]': 'filled',
        '[class.p-inputwrapper-focus]': 'focus'
    },
    providers: [CALENDAR_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./calendar.css']
})
export class Calendar implements OnInit,OnDestroy,ControlValueAccessor {

    @Input() style: any;

    @Input() styleClass: string;

    @Input() inputStyle: any;

    @Input() inputId: string;

    @Input() name: string;

    @Input() inputStyleClass: string;

    @Input() placeholder: string;

    @Input() ariaLabelledBy: string;

    @Input() iconAriaLabel: string;

    @Input() disabled: any;

    @Input() dateFormat: string;

    @Input() multipleSeparator: string = ',';

    @Input() rangeSeparator: string = '-';

    @Input() inline: boolean = false;

    @Input() showOtherMonths: boolean = true;

    @Input() selectOtherMonths: boolean;

    @Input() showIcon: boolean;

    @Input() icon: string = 'pi pi-calendar';

    @Input() appendTo: any;

    @Input() readonlyInput: boolean;

    @Input() shortYearCutoff: any = '+10';

    @Input() monthNavigator: boolean;

    @Input() yearNavigator: boolean;

    @Input() hourFormat: string = '24';

    @Input() timeOnly: boolean;

    @Input() stepHour: number = 1;

    @Input() stepMinute: number = 1;

    @Input() stepSecond: number = 1;

    @Input() showSeconds: boolean = false;

    @Input() required: boolean;

    @Input() showOnFocus: boolean = true;

    @Input() showWeek: boolean = false;

    @Input() dataType: string = 'date';

    @Input() selectionMode: string = 'single';

    @Input() maxDateCount: number;

    @Input() showButtonBar: boolean;

    @Input() todayButtonStyleClass: string = 'p-button-text';

    @Input() clearButtonStyleClass: string = 'p-button-text';

    @Input() autoZIndex: boolean = true;

    @Input() baseZIndex: number = 0;

    @Input() panelStyleClass: string;

    @Input() panelStyle: any;

    @Input() keepInvalid: boolean = false;

    @Input() hideOnDateTimeSelect: boolean = true;

    @Input() touchUI: boolean;

    @Input() timeSeparator: string = ":";

    @Input() focusTrap: boolean = true;

    @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';

    @Input() hideTransitionOptions: string = '.1s linear';

    @Output() onFocus: EventEmitter<any> = new EventEmitter();

    @Output() onBlur: EventEmitter<any> = new EventEmitter();

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    @Output() onSelect: EventEmitter<any> = new EventEmitter();

    @Output() onInput: EventEmitter<any> = new EventEmitter();

    @Output() onTodayClick: EventEmitter<any> = new EventEmitter();

    @Output() onClearClick: EventEmitter<any> = new EventEmitter();

    @Output() onMonthChange: EventEmitter<any> = new EventEmitter();

    @Output() onYearChange: EventEmitter<any> = new EventEmitter();

    @Output() onClickOutside: EventEmitter<any> = new EventEmitter();

    @Output() onShow: EventEmitter<any> = new EventEmitter();

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @Input() tabindex: number;

    @ViewChild('container', { static: false }) containerViewChild: ElementRef;

    @ViewChild('inputfield', { static: false }) inputfieldViewChild: ElementRef;

    @ViewChild('contentWrapper', { static: false }) set content (content: ElementRef) {
        this.contentViewChild = content;

        if (this.contentViewChild) {
            if (this.isMonthNavigate) {
                Promise.resolve(null).then(() => this.updateFocus());
                this.isMonthNavigate = false;
            }
            else {
                if (!this.focus) {
                    this.initFocusableCell();
                }
            }
        }
    };

    contentViewChild: ElementRef;

    value: any;

    dates: any[];

    months: any[];

    weekDays: string[];

    currentMonth: number;

    currentYear: number;

    currentHour: number;

    currentMinute: number;

    currentSecond: number;

    pm: boolean;

    mask: HTMLDivElement;

    maskClickListener: Function;

    overlay: HTMLDivElement;

    responsiveStyleElement: any;

    overlayVisible: boolean;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    calendarElement: any;

    timePickerTimer:any;

    documentClickListener: any;

    animationEndListener: any;

    ticksTo1970: number;

    yearOptions: number[];

    focus: boolean;

    isKeydown: boolean;

    filled: boolean;

    inputFieldValue: string = null;

    _minDate: Date;

    _maxDate: Date;

    _showTime: boolean;

    _yearRange: string;

    preventDocumentListener: boolean;

    dateTemplate: TemplateRef<any>;

    headerTemplate: TemplateRef<any>;

    footerTemplate: TemplateRef<any>;

    disabledDateTemplate: TemplateRef<any>;

    decadeTemplate: TemplateRef<any>;

    _disabledDates: Array<Date>;

    _disabledDays: Array<number>;

    selectElement: any;

    todayElement: any;

    focusElement: any;

    scrollHandler: any;

    documentResizeListener: any;

    navigationState: any = null;

    isMonthNavigate: boolean;

    initialized: boolean;

    translationSubscription: Subscription;

    _locale: LocaleSettings;

    _responsiveOptions: any[];

    currentView: string;

    attributeSelector: string;

    _numberOfMonths: number = 1;

    _firstDayOfWeek: number;

    _view: string = 'date';

    preventFocus: boolean;

    @Input() get view(): string {
        return this._view;
    };

    set view(view: string) {
        this._view = view;
        this.currentView = this._view;
    }


    @Input() get defaultDate(): Date {
        return this._defaultDate;
    };

    set defaultDate(defaultDate: Date) {
        this._defaultDate = defaultDate;

        if (this.initialized) {
            const date = defaultDate||new Date();
            this.currentMonth = date.getMonth();
            this.currentYear = date.getFullYear();
            this.initTime(date);
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }

    _defaultDate: Date;

    @Input() get minDate(): Date {
        return this._minDate;
    }

    set minDate(date: Date) {
        this._minDate = date;

        if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }

    @Input() get maxDate(): Date {
        return this._maxDate;
    }

    set maxDate(date: Date) {
        this._maxDate = date;

        if (this.currentMonth != undefined && this.currentMonth != null  && this.currentYear) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }

    @Input() get disabledDates(): Date[] {
        return this._disabledDates;
    }

    set disabledDates(disabledDates: Date[]) {
        this._disabledDates = disabledDates;
        if (this.currentMonth != undefined && this.currentMonth != null  && this.currentYear) {

            this.createMonths(this.currentMonth, this.currentYear);
        }
    }

    @Input() get disabledDays(): number[] {
        return this._disabledDays;
    }

    set disabledDays(disabledDays: number[]) {
        this._disabledDays = disabledDays;

        if (this.currentMonth != undefined && this.currentMonth != null  && this.currentYear) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }

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

    @Input() get showTime(): boolean {
        return this._showTime;
    }

    set showTime(showTime: boolean) {
        this._showTime = showTime;

        if (this.currentHour === undefined) {
            this.initTime(this.value||new Date());
        }
        this.updateInputfield();
    }

    get locale() {
       return this._locale;
    }

    @Input() get responsiveOptions(): any[] {
        return this._responsiveOptions;
    };

    set responsiveOptions(responsiveOptions: any[]) {
        this._responsiveOptions = responsiveOptions;

        this.destroyResponsiveStyleElement();
        this.createResponsiveStyle();
    }


    @Input() get numberOfMonths(): number {
        return this._numberOfMonths;
    }

    set numberOfMonths(numberOfMonths: number) {
        this._numberOfMonths = numberOfMonths;

        this.destroyResponsiveStyleElement();
        this.createResponsiveStyle();
    }

    @Input() get firstDayOfWeek(): number {
        return this._firstDayOfWeek;
    }

    set firstDayOfWeek(firstDayOfWeek: number) {
        this._firstDayOfWeek = firstDayOfWeek;

        this.createWeekDays();
    }

    @Input()
    set locale(newLocale: LocaleSettings) {
        console.warn("Locale property has no effect, use new i18n API instead.");
    }

    constructor(public el: ElementRef, public renderer: Renderer2, public cd: ChangeDetectorRef, private zone: NgZone, private config: PrimeNGConfig, public overlayService: OverlayService) {}

    ngOnInit() {
        this.attributeSelector = UniqueComponentId();
        const date = this.defaultDate||new Date();
        this.createResponsiveStyle();
        this.currentMonth = date.getMonth();
        this.currentYear = date.getFullYear();
        this.currentView = this.view;

        if (this.view === 'date') {
            this.createWeekDays();
            this.initTime(date);
            this.createMonths(this.currentMonth, this.currentYear);
            this.ticksTo1970 = (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000);
        }

        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.createWeekDays();
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
        if (this.inline) {
            this.contentViewChild && this.contentViewChild.nativeElement.setAttribute(this.attributeSelector, '');

            if (!this.disabled) {
                this.initFocusableCell();
                if (this.numberOfMonths === 1) {
                    this.contentViewChild.nativeElement.style.width = DomHandler.getOuterWidth(this.containerViewChild.nativeElement) + 'px';
                }
            }
        }
    }

    getTranslation(option: string) {
        return this.config.getTranslation(option);
    }

    populateYearOptions(start, end) {
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
            dayIndex = (dayIndex == 6) ? 0 : ++dayIndex;
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
        let base = this.currentYear -  (this.currentYear % 10);
        for (let i = 0; i < 10; i++) {
            yearPickerValues.push(base + i);
        }

        return yearPickerValues;
    }

    createMonths(month: number, year: number) {
        this.months = this.months = [];
        for (let i = 0 ; i < this.numberOfMonths; i++) {
            let m = month + i;
            let y = year;
            if (m > 11) {
                m = m % 11 - 1;
                y = year + 1;
            }

            this.months.push(this.createMonth(m, y));
        }
    }

    getWeekNumber(date: Date) {
        let checkDate = new Date(date.getTime());
		checkDate.setDate(checkDate.getDate() + 4 - ( checkDate.getDay() || 7 ));
		let time = checkDate.getTime();
		checkDate.setMonth( 0 );
		checkDate.setDate( 1 );
		return Math.floor( Math.round((time - checkDate.getTime()) / 86400000 ) / 7 ) + 1;
    }

    createMonth(month: number, year: number) {
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
                for (let j = (prevMonthDaysLength - firstDay + 1); j <= prevMonthDaysLength; j++) {
                    let prev = this.getPreviousMonthAndYear(month, year);
                    week.push({day: j, month: prev.month, year: prev.year, otherMonth: true,
                            today: this.isToday(today, j, prev.month, prev.year), selectable: this.isSelectable(j, prev.month, prev.year, true)});
                }

                let remainingDaysLength = 7 - week.length;
                for (let j = 0; j < remainingDaysLength; j++) {
                    week.push({day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
                            selectable: this.isSelectable(dayNo, month, year, false)});
                    dayNo++;
                }
            }
            else {
                for (let j = 0; j < 7; j++) {
                    if (dayNo > daysLength) {
                        let next = this.getNextMonthAndYear(month, year);
                        week.push({day: dayNo - daysLength, month: next.month, year: next.year, otherMonth: true,
                                    today: this.isToday(today, dayNo - daysLength, next.month, next.year),
                                    selectable: this.isSelectable((dayNo - daysLength), next.month, next.year, true)});
                    }
                    else {
                        week.push({day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
                            selectable: this.isSelectable(dayNo, month, year, false)});
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
            dates: dates,
            weekNumbers: weekNumbers
        };
    }

    initTime(date: Date) {
        this.pm = date.getHours() > 11;

        if (this.showTime) {
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
            this.setCurrentHourPM(date.getHours());
        }
        else if (this.timeOnly) {
            this.currentMinute = 0;
            this.currentHour = 0;
            this.currentSecond = 0;
        }
    }

    navBackward(event) {
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
        }
        else if (this.currentView === 'year') {
            this.decrementDecade();
            setTimeout(() => {
                this.updateFocus();
            }, 1);
        }
        else {
            if (this.currentMonth === 0) {
                this.currentMonth = 11;
                this.decrementYear();
            }
            else {
                this.currentMonth--;
            }

            this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }

    navForward(event) {
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
        }
        else if (this.currentView === 'year') {
            this.incrementDecade();
            setTimeout(() => {
                this.updateFocus();
            }, 1);
        }
        else {
            if (this.currentMonth === 11) {
                this.currentMonth = 0;
                this.incrementYear();
            }
            else {
                this.currentMonth++;
            }

            this.onMonthChange.emit({month: this.currentMonth + 1, year: this.currentYear});
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }

    decrementYear() {
        this.currentYear--;

        if (this.yearNavigator && this.currentYear < this.yearOptions[0]) {
            let difference = this.yearOptions[this.yearOptions.length - 1] - this.yearOptions[0];
            this.populateYearOptions(this.yearOptions[0] - difference, this.yearOptions[this.yearOptions.length - 1] - difference);
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

        if (this.yearNavigator && this.currentYear > this.yearOptions[this.yearOptions.length - 1]) {
            let difference = this.yearOptions[this.yearOptions.length - 1] - this.yearOptions[0];
            this.populateYearOptions(this.yearOptions[0] + difference, this.yearOptions[this.yearOptions.length - 1] + difference);
        }
    }

    switchToMonthView(event) {
        this.currentView = 'month';
        this.cd.detectChanges();
        this.alignOverlay();
        event.preventDefault();
    }

    switchToYearView(event) {
        this.currentView = 'year';
        this.cd.detectChanges();
        this.alignOverlay();
        event.preventDefault();
    }

    onDateSelect(event, dateMeta) {
        if (this.disabled || !dateMeta.selectable) {
            event.preventDefault();
            return;
        }

        if (this.isMultipleSelection() && this.isSelected(dateMeta)) {
            this.value = this.value.filter((date, i) => {
                return !this.isDateEquals(date, dateMeta);
            });
            if (this.value.length === 0) {
                this.value = null;
            }
            this.updateModel(this.value);
        }
        else {
            if (this.shouldSelectDate(dateMeta)) {
                this.selectDate(dateMeta);
            }
        }

        if (this.isSingleSelection() && this.hideOnDateTimeSelect) {
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

    shouldSelectDate(dateMeta) {
        if (this.isMultipleSelection())
            return this.maxDateCount != null ? this.maxDateCount > (this.value ? this.value.length : 0) : true;
        else
            return true;
    }

    onMonthSelect(event, index) {
        if (this.view === 'month') {
            this.onDateSelect(event, {year: this.currentYear, month: index, day: 1, selectable: true});
        }
        else {
            this.currentMonth = index;
            this.currentView = 'date';
            this.createMonths(this.currentMonth, this.currentYear);
            this.cd.markForCheck();
            this.onMonthChange.emit({month: this.currentMonth + 1, year: this.currentYear});
        }
    }

    onYearSelect(event, year) {
        if (this.view === 'year') {
            this.onDateSelect(event, {year: year, month: 0, day: 1, selectable: true});
        }
        else {
            this.currentYear = year;
            this.currentView = 'month';
            this.onYearChange.emit({month: this.currentMonth + 1, year: this.currentYear});
        }
    }

    updateInputfield() {
        let formattedValue = '';

        if (this.value) {
            if (this.isSingleSelection()) {
                formattedValue = this.formatDateTime(this.value);
            }
            else if (this.isMultipleSelection()) {
                for (let i = 0; i < this.value.length; i++) {
                    let dateAsString = this.formatDateTime(this.value[i]);
                    formattedValue += dateAsString;
                    if (i !== (this.value.length - 1)) {
                        formattedValue += this.multipleSeparator+' ';
                    }
                }
            }
            else if (this.isRangeSelection()) {
                if (this.value && this.value.length) {
                    let startDate = this.value[0];
                    let endDate = this.value[1];

                    formattedValue = this.formatDateTime(startDate);
                    if (endDate) {
                        formattedValue += ' '+this.rangeSeparator +' ' + this.formatDateTime(endDate);
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

    formatDateTime(date) {
        let formattedValue = this.keepInvalid ? date : null;

        if (this.isValidDate(date)) {
            if (this.timeOnly) {
                formattedValue = this.formatTime(date);
            }
            else {
                formattedValue = this.formatDate(date, this.getDateFormat());
                if (this.showTime) {
                    formattedValue += ' ' + this.formatTime(date);
                }
            }
        }

        return formattedValue;
    }

    setCurrentHourPM(hours: number) {
        if (this.hourFormat == '12') {
            this.pm = hours > 11;
            if (hours >= 12) {
                this.currentHour = (hours == 12) ? 12 : hours - 12;
            }
            else {
                this.currentHour = (hours == 0) ? 12 : hours;
            }
        }
        else {
            this.currentHour = hours;
        }
    }

    selectDate(dateMeta) {
        let date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);

        if (this.showTime) {
            if (this.hourFormat == '12') {
                if (this.currentHour === 12)
                    date.setHours(this.pm ? 12 : 0);
                else
                    date.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
            }
            else {
                date.setHours(this.currentHour);
            }

            date.setMinutes(this.currentMinute);
            date.setSeconds(this.currentSecond);
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
        }
        else if (this.isMultipleSelection()) {
            this.updateModel(this.value ? [...this.value, date] : [date]);
        }
        else if (this.isRangeSelection()) {
            if (this.value && this.value.length) {
                let startDate = this.value[0];
                let endDate = this.value[1];

                if (!endDate && date.getTime() >= startDate.getTime()) {
                    endDate = date;
                }
                else {
                    startDate = date;
                    endDate = null;
                }

                this.updateModel([startDate, endDate]);
            }
            else {
                this.updateModel([date, null]);
            }
        }

        this.onSelect.emit(date);
    }

    updateModel(value) {
        this.value = value;

        if (this.dataType == 'date') {
            this.onModelChange(this.value);
        }
        else if (this.dataType == 'string') {
            if (this.isSingleSelection()) {
                this.onModelChange(this.formatDateTime(this.value));
            }
            else {
                let stringArrValue = null;
                if (this.value) {
                    stringArrValue = this.value.map(date => this.formatDateTime(date));
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
        }
        else {
            m = month - 1;
            y = year;
        }

        return {'month':m,'year':y};
    }

    getNextMonthAndYear(month: number, year: number) {
        let m, y;

        if (month === 11) {
            m = 0;
            y = year + 1;
        }
        else {
            m = month + 1;
            y = year;
        }

        return {'month':m,'year':y};
    }

    getSundayIndex() {
        let firstDayOfWeek = this.getFirstDateOfWeek();

        return firstDayOfWeek > 0 ? 7 - firstDayOfWeek : 0;
    }

    isSelected(dateMeta): boolean {
        if (this.value) {
            if (this.isSingleSelection()) {
                return this.isDateEquals(this.value, dateMeta);
            }
            else if (this.isMultipleSelection()) {
                let selected = false;
                for (let date of this.value) {
                    selected = this.isDateEquals(date, dateMeta);
                    if (selected) {
                        break;
                    }
                }

                return selected;
            }
            else if (this.isRangeSelection()) {
                if (this.value[1])
                    return this.isDateEquals(this.value[0], dateMeta) || this.isDateEquals(this.value[1], dateMeta) || this.isDateBetween(this.value[0], this.value[1], dateMeta);
                else
                    return this.isDateEquals(this.value[0], dateMeta)
            }
        }
        else {
            return false;
        }
    }

    isComparable() {
        return this.value != null && typeof this.value !== 'string';
    }

    isMonthSelected(month) {
        if (this.isComparable()) {
            let value = this.isRangeSelection() ? this.value[0] : this.value;

            return !this.isMultipleSelection() ? (value.getMonth() === month && value.getFullYear() === this.currentYear) : false;
        }

        return false;
    }

    isYearSelected(year) {
        if (this.isComparable()) {
            let value = this.isRangeSelection() ? this.value[0] : this.value;

            return !this.isMultipleSelection() ? (value.getFullYear() === year) : false;
        }

        return false;
    }

    isDateEquals(value, dateMeta) {
        if (value && value instanceof Date)
            return value.getDate() === dateMeta.day && value.getMonth() === dateMeta.month && value.getFullYear() === dateMeta.year;
        else
            return false;
    }

    isDateBetween(start, end, dateMeta) {
        let between : boolean = false;
        if (start && end) {
            let date: Date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
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

    isToday(today, day, month, year): boolean {
        return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    }

    isSelectable(day, month, year, otherMonth): boolean {
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
             }
             else if (this.minDate.getFullYear() === year) {
                 if (this.minDate.getMonth() > month) {
                     validMin = false;
                 }
                 else if (this.minDate.getMonth() === month) {
                     if (this.minDate.getDate() > day) {
                         validMin = false;
                     }
                 }
             }
        }

        if (this.maxDate) {
             if (this.maxDate.getFullYear() < year) {
                 validMax = false;
             }
             else if (this.maxDate.getFullYear() === year) {
                 if (this.maxDate.getMonth() < month) {
                     validMax = false;
                 }
                 else if (this.maxDate.getMonth() === month) {
                     if (this.maxDate.getDate() < day) {
                         validMax = false;
                     }
                 }
             }
        }

        if (this.disabledDates) {
           validDate = !this.isDateDisabled(day,month,year);
        }

        if (this.disabledDays) {
           validDay = !this.isDayDisabled(day,month,year)
        }

        return validMin && validMax && validDate && validDay;
    }

    isDateDisabled(day:number, month:number, year:number):boolean {
        if (this.disabledDates) {
            for (let disabledDate of this.disabledDates) {
                if (disabledDate.getFullYear() === year && disabledDate.getMonth() === month && disabledDate.getDate() === day) {
                    return true;
                }
            }
        }

        return false;
    }

    isDayDisabled(day:number, month:number, year:number):boolean {
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

    onButtonClick(event, inputfield) {
        if (!this.overlayVisible) {
            inputfield.focus();
            this.showOverlay();
        }
        else {
            this.hideOverlay();
        }
    }

    onOverlayClick(event) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });
    }

    getMonthName(index) {
        return this.config.getTranslation('monthNames')[index];
    }

    getYear(month) {
        return this.currentView === 'month' ? this.currentYear : month.year;
     }

    switchViewButtonDisabled() {
        return this.numberOfMonths > 1 || this.disabled;
    }

    onPrevButtonClick(event) {
        this.navigationState = {backward: true, button: true};
        this.navBackward(event);
    }

    onNextButtonClick(event) {
        this.navigationState = {backward: false, button: true};
        this.navForward(event);
    }

    onContainerButtonKeydown(event) {
        switch (event.which) {
           //tab
           case 9:
                if (!this.inline) {
                    this.trapFocus(event);
                }
           break;

           //escape
           case 27:
               this.overlayVisible = false;
               event.preventDefault();
           break;

           default:
               //Noop
           break;
        }
   }

    onInputKeydown(event) {
        this.isKeydown = true;
        if (event.keyCode === 40 && this.contentViewChild) {
            this.trapFocus(event);
        }
        else if (event.keyCode === 27) {
            if (this.overlayVisible) {
                this.overlayVisible = false;
                event.preventDefault();
            }
        }
        else if (event.keyCode === 13) {
            if (this.overlayVisible) {
                this.overlayVisible = false;
                event.preventDefault();
            }
        }
        else if (event.keyCode === 9 && this.contentViewChild) {
            DomHandler.getFocusableElements(this.contentViewChild.nativeElement).forEach(el => el.tabIndex = '-1');
            if (this.overlayVisible) {
                this.overlayVisible = false;
            }
        }
    }

    onDateCellKeydown(event, date, groupIndex) {
        const cellContent = event.currentTarget;
        const cell = cellContent.parentElement;

        switch (event.which) {
            //down arrow
            case 40: {
                cellContent.tabIndex = '-1';
                let cellIndex = DomHandler.index(cell);
                let nextRow = cell.parentElement.nextElementSibling;
                if (nextRow) {
                    let focusCell = nextRow.children[cellIndex].children[0];
                    if (DomHandler.hasClass(focusCell, 'p-disabled')) {
                        this.navigationState = {backward: false};
                        this.navForward(event);
                    }
                    else {
                        nextRow.children[cellIndex].children[0].tabIndex = '0';
                        nextRow.children[cellIndex].children[0].focus();
                    }
                }
                else {
                    this.navigationState = {backward: false};
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
                        this.navigationState = {backward: true};
                        this.navBackward(event);
                    }
                    else {
                        focusCell.tabIndex = '0';
                        focusCell.focus();
                    }
                }
                else {
                    this.navigationState = {backward: true};
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
                    }
                    else {
                        focusCell.tabIndex = '0';
                        focusCell.focus();
                    }
                }
                else {
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
                    }
                    else {
                        focusCell.tabIndex = '0';
                        focusCell.focus();
                    }
                }
                else {
                    this.navigateToMonth(false, groupIndex);
                }
                event.preventDefault();
                break;
            }

            //enter
            //space
            case 13:
            case 32: {
                this.onDateSelect(event, date);
                event.preventDefault();
                break;
            }

            //escape
            case 27: {
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

    onMonthCellKeydown(event, index) {
        const cell = event.currentTarget;
        switch (event.which) {
            //arrows
            case 38:
            case 40: {
                cell.tabIndex = '-1';
                var cells = cell.parentElement.children;
                var cellIndex = DomHandler.index(cell);
                let nextCell = cells[event.which === 40 ? cellIndex + 3 : cellIndex -3];
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
                }
                else {
                    this.navigationState = {backward: true};
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
                }
                else {
                    this.navigationState = {backward: false};
                    this.navForward(event);
                }

                event.preventDefault();
                break;
            }

            //enter
            case 13: {
                this.onMonthSelect(event, index);
                event.preventDefault();
                break;
            }

            //enter
            //space
            case 13:
            case 32: {
                this.overlayVisible = false;
                event.preventDefault();
                break;
            }

            //escape
            case 27: {
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


    onYearCellKeydown(event, index) {
        const cell = event.currentTarget;

        switch (event.which) {
            //arrows
            case 38:
            case 40: {
                cell.tabIndex = '-1';
                var cells = cell.parentElement.children;
                var cellIndex = DomHandler.index(cell);
                let nextCell = cells[event.which === 40 ? cellIndex + 2 : cellIndex -2];
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
                }
                else {
                    this.navigationState = {backward: true};
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
                }
                else {
                    this.navigationState = {backward: false};
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

    navigateToMonth(prev, groupIndex) {
        if (prev) {
            if (this.numberOfMonths === 1 || (groupIndex === 0)) {
                this.navigationState = {backward: true};
                this.navBackward(event);
            }
            else {
                let prevMonthContainer = this.contentViewChild.nativeElement.children[groupIndex - 1];
                let cells = DomHandler.find(prevMonthContainer, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                let focusCell = cells[cells.length - 1];
                focusCell.tabIndex = '0';
                focusCell.focus();
            }
        }
        else {
            if (this.numberOfMonths === 1 || (groupIndex === this.numberOfMonths - 1)) {
                this.navigationState = {backward: false};
                this.navForward(event);
            }
            else {
                let nextMonthContainer = this.contentViewChild.nativeElement.children[groupIndex + 1];
                let focusCell = DomHandler.findSingle(nextMonthContainer, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                focusCell.tabIndex = '0';
                focusCell.focus();
            }
        }
    }

    updateFocus() {
        let cell;

        if (this.navigationState) {
            if (this.navigationState.button) {
                this.initFocusableCell();

                if (this.navigationState.backward)
                    DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-prev').focus();
                else
                    DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-next').focus();
            }
            else {
                if (this.navigationState.backward) {
                    let cells;

                    if (this.currentView === 'month') {
                        cells = DomHandler.find(this.contentViewChild.nativeElement, '.p-monthpicker .p-monthpicker-month:not(.p-disabled)');
                    }
                    else if (this.currentView === 'year') {
                        cells = DomHandler.find(this.contentViewChild.nativeElement, '.p-yearpicker .p-yearpicker-year:not(.p-disabled)');
                    }
                    else {
                        cells = DomHandler.find(this.contentViewChild.nativeElement, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                    }

                    if (cells && cells.length > 0) {
                        cell = cells[cells.length - 1];
                    }
                }
                else {
                    if (this.currentView === 'month') {
                        cell = DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-monthpicker .p-monthpicker-month:not(.p-disabled)');
                    }
                    else if (this.currentView === 'year') {
                        cell = DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-yearpicker .p-yearpicker-year:not(.p-disabled)');
                    }
                    else {
                        cell = DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                    }
                }

                if (cell) {
                    cell.tabIndex = '0';
                    cell.focus();
                }
            }

            this.navigationState = null;
        }
        else {
            this.initFocusableCell();
        }
    }

    initFocusableCell() {
        let cell;

        if (this.currentView === 'month') {
            let cells = DomHandler.find(this.contentViewChild.nativeElement, '.p-monthpicker .p-monthpicker-month:not(.p-disabled)');
            let selectedCell= DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-monthpicker .p-monthpicker-month.p-highlight');
            cells.forEach(cell => cell.tabIndex = -1);
            cell = selectedCell || cells[0];

            if (cells.length === 0) {
                let disabledCells = DomHandler.find(this.contentViewChild.nativeElement, '.p-monthpicker .p-monthpicker-month.p-disabled[tabindex = "0"]');
                disabledCells.forEach(cell => cell.tabIndex = -1);
            }
        }
        else if (this.currentView === 'year') {
            let cells = DomHandler.find(this.contentViewChild.nativeElement, '.p-yearpicker .p-yearpicker-year:not(.p-disabled)');
            let selectedCell= DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-yearpicker .p-yearpicker-year.p-highlight');
            cells.forEach(cell => cell.tabIndex = -1);
            cell = selectedCell || cells[0];

            if (cells.length === 0) {
                let disabledCells = DomHandler.find(this.contentViewChild.nativeElement, '.p-yearpicker .p-yearpicker-year.p-disabled[tabindex = "0"]');
                disabledCells.forEach(cell => cell.tabIndex = -1);
            }
        }
        else {
            cell = DomHandler.findSingle(this.contentViewChild.nativeElement, 'span.p-highlight');
            if (!cell) {
                let todayCell = DomHandler.findSingle(this.contentViewChild.nativeElement, 'td.p-datepicker-today span:not(.p-disabled):not(.p-ink)');
                if (todayCell)
                    cell = todayCell;
                else
                    cell = DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
            }
        }

        if (cell) {
            cell.tabIndex = '0';

            if (!this.preventFocus && (!this.navigationState || !this.navigationState.button)) {
                setTimeout(() => {
                    cell.focus();
                }, 1);
            }

            this.preventFocus = false;
        }
    }

    trapFocus(event) {
        let focusableElements = DomHandler.getFocusableElements(this.contentViewChild.nativeElement);

        if (focusableElements && focusableElements.length > 0) {
            if (!focusableElements[0].ownerDocument.activeElement) {
                focusableElements[0].focus();
            }
            else {
                let focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);

                if (event.shiftKey) {
                    if (focusedIndex == -1 || focusedIndex === 0) {
                        if (this.focusTrap){
                            focusableElements[focusableElements.length - 1].focus();
                        }
                        else {
                            if (focusedIndex === -1)
                                return this.hideOverlay();
                            else if (focusedIndex === 0)
                                return;
                        }
                    }
                    else {
                        focusableElements[focusedIndex - 1].focus();
                    }
                }
                else {
                    if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1)) {
                        if (!this.focusTrap && focusedIndex != -1)
                            return this.hideOverlay();
                        else
                            focusableElements[0].focus();
                    }
                    else {
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

    convertTo24Hour = function (hours: number, pm: boolean) {
        if (this.hourFormat == '12') {
            if (hours === 12) {
                return (pm ? 12 : 0);
            } else {
                return (pm ? hours + 12 : hours);
            }
        }
        return hours;
    }

    validateTime(hour: number, minute: number, second: number, pm: boolean) {
        let value = this.value;
        const convertedHour = this.convertTo24Hour(hour, pm);
        if (this.isRangeSelection()) {
            value = this.value[1] || this.value[0];
        }
        if (this.isMultipleSelection()) {
            value = this.value[this.value.length - 1];
        }
        const valueDateString = value ? value.toDateString() : null;
        if (this.minDate && valueDateString && this.minDate.toDateString() === valueDateString) {
            if (this.minDate.getHours() > convertedHour) {
                return false;
            }
            if (this.minDate.getHours() === convertedHour) {
                if (this.minDate.getMinutes() > minute) {
                    return false;
                }
                if (this.minDate.getMinutes() === minute) {
                    if (this.minDate.getSeconds() > second) {
                        return false;
                    }
                }
            }
        }

      if (this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString) {
            if (this.maxDate.getHours() < convertedHour) {
                return false;
            }
            if (this.maxDate.getHours() === convertedHour) {
                if (this.maxDate.getMinutes() < minute) {
                    return false;
                }
                if (this.maxDate.getMinutes() === minute) {
                  if (this.maxDate.getSeconds() < second) {
                      return false;
                  }
                }
            }
        }
        return true;
    }


    incrementHour(event) {
        const prevHour = this.currentHour;
        let newHour = this.currentHour + this.stepHour;
        let newPM = this.pm;

        if (this.hourFormat == '24')
            newHour = (newHour >= 24) ? (newHour - 24) : newHour;
        else if (this.hourFormat == '12') {
            // Before the AM/PM break, now after
            if (prevHour < 12 && newHour > 11) {
                newPM= !this.pm;
            }
            newHour = (newHour >= 13) ? (newHour - 12) : newHour;
        }

        if (this.validateTime(newHour, this.currentMinute, this.currentSecond, newPM)) {
          this.currentHour = newHour;
          this.pm = newPM;
        }
        event.preventDefault();
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

    repeat(event: Event, interval: number, type: number, direction: number) {
        let i = interval||500;

        this.clearTimePickerTimer();
        this.timePickerTimer = setTimeout(() => {
            this.repeat(event, 100, type, direction);
            this.cd.markForCheck();
        }, i);

        switch(type) {
            case 0:
                if (direction === 1)
                    this.incrementHour(event);
                else
                    this.decrementHour(event);
            break;

            case 1:
                if (direction === 1)
                    this.incrementMinute(event);
                else
                    this.decrementMinute(event);
            break;

            case 2:
                if (direction === 1)
                    this.incrementSecond(event);
                else
                    this.decrementSecond(event);
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

    decrementHour(event) {
        let newHour = this.currentHour - this.stepHour;
        let newPM = this.pm

        if (this.hourFormat == '24')
            newHour = (newHour < 0) ? (24 + newHour) : newHour;
        else if (this.hourFormat == '12') {
            // If we were at noon/midnight, then switch
            if (this.currentHour === 12) {
                newPM = !this.pm;
            }
            newHour = (newHour <= 0) ? (12 + newHour) : newHour;
        }

        if (this.validateTime(newHour, this.currentMinute, this.currentSecond, newPM)) {
          this.currentHour = newHour;
          this.pm = newPM;
        }

        event.preventDefault();
    }

    incrementMinute(event) {
        let newMinute = this.currentMinute + this.stepMinute;
        newMinute = (newMinute > 59) ? newMinute - 60 : newMinute;
        if (this.validateTime(this.currentHour, newMinute, this.currentSecond, this.pm)) {
            this.currentMinute = newMinute;
        }

        event.preventDefault();
    }

    decrementMinute(event) {
        let newMinute = this.currentMinute - this.stepMinute;
        newMinute = (newMinute < 0) ? 60 + newMinute : newMinute;
        if (this.validateTime(this.currentHour, newMinute, this.currentSecond, this.pm)) {
            this.currentMinute = newMinute;
        }

        event.preventDefault();
    }

    incrementSecond(event) {
        let newSecond = this.currentSecond + this.stepSecond;
        newSecond = (newSecond > 59) ? newSecond - 60 : newSecond;
        if (this.validateTime(this.currentHour, this.currentMinute, newSecond, this.pm)) {
            this.currentSecond = newSecond;
        }

        event.preventDefault();
    }

    decrementSecond(event) {
        let newSecond = this.currentSecond - this.stepSecond;
        newSecond = (newSecond < 0) ? 60 + newSecond : newSecond;
        if (this.validateTime(this.currentHour, this.currentMinute, newSecond, this.pm)) {
            this.currentSecond = newSecond;
        }

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
            if (this.currentHour === 12)
                value.setHours(this.pm ? 12 : 0);
            else
                value.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
        }
        else {
            value.setHours(this.currentHour);
        }

        value.setMinutes(this.currentMinute);
        value.setSeconds(this.currentSecond);
        if (this.isRangeSelection()) {
            if (this.value[1])
                value = [this.value[0], value];
            else
                value = [value, null];
        }

        if (this.isMultipleSelection()){
            value = [...this.value.slice(0, -1), value];
        }

        this.updateModel(value);
        this.onSelect.emit(value);
        this.updateInputfield();
    }

    toggleAMPM(event) {
        const newPM = !this.pm;
        if (this.validateTime(this.currentHour, this.currentMinute, this.currentSecond, newPM)) {
          this.pm = newPM;
          this.updateTime();
        }
        event.preventDefault();
    }

    onUserInput(event) {
        // IE 11 Workaround for input placeholder : https://github.com/primefaces/primeng/issues/2026
        if (!this.isKeydown) {
            return;
        }
        this.isKeydown = false;

        let val = event.target.value;
        try {
            let value = this.parseValueFromString(val);
            if (this.isValidSelection(value)) {
                this.updateModel(value);
                this.updateUI();
            }
        }
        catch(err) {
            //invalid date
            let value = this.keepInvalid ? val : null;
            this.updateModel(value);
        }

        this.filled = val != null && val.length;
        this.onInput.emit(event);
    }

    isValidSelection(value): boolean {
        let isValid = true;
        if (this.isSingleSelection()) {
            if (!this.isSelectable(value.getDate(), value.getMonth(), value.getFullYear(), false)) {
                isValid = false;
            }
        } else if (value.every(v => this.isSelectable(v.getDate(), v.getMonth(), v.getFullYear(), false))) {
            if (this.isRangeSelection()) {
                isValid = value.length > 1 && value[1] > value[0] ? true : false;
            }
        }
        return isValid;
    }

    parseValueFromString(text: string): Date | Date[]{
        if (!text || text.trim().length === 0) {
            return null;
        }

        let value: any;

        if (this.isSingleSelection()) {
            value = this.parseDateTime(text);
        }
        else if (this.isMultipleSelection()) {
            let tokens = text.split(this.multipleSeparator);
            value = [];
            for (let token of tokens) {
                value.push(this.parseDateTime(token.trim()));
            }
        }
        else if (this.isRangeSelection()) {
            let tokens = text.split(' '+this.rangeSeparator +' ');
            value = [];
            for (let i = 0; i < tokens.length; i++) {
                value[i] = this.parseDateTime(tokens[i].trim());
            }
        }

        return value;
    }

    parseDateTime(text): Date {
        let date: Date;
        let parts: string[] = text.split(' ');

        if (this.timeOnly) {
            date = new Date();
            this.populateTime(date, parts[0], parts[1]);
        }
        else {
            const dateFormat = this.getDateFormat();
            if (this.showTime) {
                let ampm = this.hourFormat == '12' ? parts.pop() : null;
                let timeString = parts.pop();

                date = this.parseDate(parts.join(' '), dateFormat);
                this.populateTime(date, timeString, ampm);
            }
            else {
                 date = this.parseDate(text, dateFormat);
            }
        }

        return date;
    }

    populateTime(value, timeString, ampm) {
        if (this.hourFormat == '12' && !ampm) {
            throw 'Invalid Time';
        }

        this.pm = (ampm === 'PM' || ampm === 'pm');
        let time = this.parseTime(timeString);
        value.setHours(time.hour);
        value.setMinutes(time.minute);
        value.setSeconds(time.second);
    }

    isValidDate(date) {
        return date instanceof Date && ObjectUtils.isNotEmpty(date);
    }

    updateUI() {
        let propValue = this.value;
        if (Array.isArray(propValue)) {
            propValue = propValue[0];
        }

        let val = this.defaultDate && this.isValidDate(this.defaultDate) && !this.value ? this.defaultDate : (propValue && this.isValidDate(propValue) ? propValue : new Date());
        
        this.currentMonth = val.getMonth();
        this.currentYear = val.getFullYear();
        this.createMonths(this.currentMonth, this.currentYear);

        if (this.showTime||this.timeOnly) {
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
        this.overlayVisible = false;
        this.clearTimePickerTimer();

        if (this.touchUI) {
            this.disableModality();
        }

        this.cd.markForCheck();
    }

    toggle() {
        if (!this.inline){
            if (!this.overlayVisible) {
                this.showOverlay();
                this.inputfieldViewChild.nativeElement.focus();
            }
            else {
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
                    this.overlay.setAttribute(this.attributeSelector, '');
                    this.appendOverlay();
                    this.updateFocus();
                    if (this.autoZIndex) {
                        if (this.touchUI)
                            ZIndexUtils.set('modal', this.overlay, this.baseZIndex || this.config.zIndex.modal);
                        else
                            ZIndexUtils.set('overlay', this.overlay, this.baseZIndex || this.config.zIndex.overlay);
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
            break
        }
    }

    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                DomHandler.appendChild(this.overlay, this.appendTo);
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
        }
        else if(this.overlay) {
            if (this.appendTo) {
                if (this.view === 'date') {
                    this.overlay.style.width = DomHandler.getOuterWidth(this.overlay) + 'px';
                    this.overlay.style.minWidth = DomHandler.getOuterWidth(this.inputfieldViewChild.nativeElement) + 'px';
                }
                else {
                    this.overlay.style.width = DomHandler.getOuterWidth(this.inputfieldViewChild.nativeElement) + 'px';
                }

                DomHandler.absolutePosition(this.overlay, this.inputfieldViewChild.nativeElement);
            }
            else{
                DomHandler.relativePosition(this.overlay, this.inputfieldViewChild.nativeElement);
            }
        }
    }

    enableModality(element) {
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(element.style.zIndex) - 1);
            let maskStyleClass = 'p-component-overlay p-datepicker-mask p-datepicker-mask-scrollblocker p-component-overlay p-component-overlay-enter';
            DomHandler.addMultipleClasses(this.mask, maskStyleClass);

			this.maskClickListener = this.renderer.listen(this.mask, 'click', (event: any) => {
                this.disableModality();
            });
            document.body.appendChild(this.mask);
            DomHandler.addClass(document.body, 'p-overflow-hidden');
        }
    }

    disableModality() {
        if (this.mask) {
            DomHandler.addClass(this.mask, 'p-component-overlay-leave');
            this.animationEndListener = this.destroyMask.bind(this);
            this.mask.addEventListener('animationend', this.animationEndListener);
        }
    }

    destroyMask() {
        document.body.removeChild(this.mask);
        let bodyChildren = document.body.children;
        let hasBlockerMasks: boolean;
        for (let i = 0; i < bodyChildren.length; i++) {
            let bodyChild = bodyChildren[i];
            if (DomHandler.hasClass(bodyChild, 'p-datepicker-mask-scrollblocker')) {
                hasBlockerMasks = true;
                break;
            }
        }

        if (!hasBlockerMasks) {
            DomHandler.removeClass(document.body, 'p-overflow-hidden');
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
            this.mask.removeEventListener('animationend', this.animationEndListener);
            this.animationEndListener = null;
        }
    }

    writeValue(value: any) : void {
        this.value = value;
        if (this.value && typeof this.value === 'string') {
            try {
                this.value = this.parseValueFromString(this.value);
            }
            catch{
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
        return this.dateFormat||this.getTranslation('dateFormat');
    }

    getFirstDateOfWeek() {
        return this._firstDayOfWeek||this.getTranslation(TranslationKeys.FIRST_DAY_OF_WEEK);
    }

    // Ported from jquery-ui datepicker formatDate
    formatDate(date, format) {
        if (!date) {
            return '';
        }

        let iFormat;
        const lookAhead = (match) => {
            const matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
            if (matches) {
                iFormat++;
            }
            return matches;
        },
            formatNumber = (match, value, len) => {
                let num = '' + value;
                if (lookAhead(match)) {
                    while (num.length < len) {
                        num = '0' + num;
                    }
                }
                return num;
            },
            formatName = (match, value, shortNames, longNames) => {
                return (lookAhead(match) ? longNames[value] : shortNames[value]);
            };
        let output = '';
        let literal = false;

        if (date) {
            for (iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) === '\'' && !lookAhead('\'')) {
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
                            output += formatNumber('o',
                            Math.round((
                                new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() -
                                new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                            break;
                        case 'm':
                            output += formatNumber('m', date.getMonth() + 1, 2);
                            break;
                        case 'M':
                            output += formatName('M',date.getMonth(), this.getTranslation(TranslationKeys.MONTH_NAMES_SHORT), this.getTranslation(TranslationKeys.MONTH_NAMES));
                            break;
                        case 'y':
                            output += lookAhead('y') ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? '0' : '') + (date.getFullYear() % 100);
                            break;
                        case '@':
                            output += date.getTime();
                            break;
                        case '!':
                            output += date.getTime() * 10000 + this.ticksTo1970;
                            break;
                        case '\'':
                            if (lookAhead('\'')) {
                                output += '\'';
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

    formatTime(date) {
        if (!date) {
            return '';
        }

        let output = '';
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        if (this.hourFormat == '12' && hours > 11 && hours != 12) {
            hours-=12;
        }

        if (this.hourFormat == '12') {
            output += hours === 0 ? 12 : (hours < 10) ? '0' + hours : hours;
        } else {
            output += (hours < 10) ? '0' + hours : hours;
        }
        output += ':';
        output += (minutes < 10) ? '0' + minutes : minutes;

        if (this.showSeconds) {
            output += ':';
            output += (seconds < 10) ? '0' + seconds : seconds;
        }

        if (this.hourFormat == '12') {
            output += date.getHours() > 11 ? ' PM' : ' AM';
        }

        return output;
    }

    parseTime(value) {
        let tokens: string[] = value.split(':');
        let validTokenLength = this.showSeconds ? 3 : 2;

        if (tokens.length !== validTokenLength) {
            throw "Invalid time";
        }

        let h = parseInt(tokens[0]);
        let m = parseInt(tokens[1]);
        let s = this.showSeconds ? parseInt(tokens[2]) : null;

        if (isNaN(h) || isNaN(m) || h > 23 || m > 59 || (this.hourFormat == '12' && h > 12) || (this.showSeconds && (isNaN(s) || s > 59))) {
            throw "Invalid time";
        }
        else {
            if (this.hourFormat == '12') {
                if (h !== 12 && this.pm) {
                    h += 12;
                }
                else if (!this.pm && h === 12) {
                    h -= 12;
                }
            }

            return {hour: h, minute: m, second: s};
        }
    }

    // Ported from jquery-ui datepicker parseDate
    parseDate(value, format) {
        if (format == null || value == null) {
            throw "Invalid arguments";
        }

        value = (typeof value === "object" ? value.toString() : value + "");
        if (value === "") {
            return null;
        }

        let iFormat, dim, extra,
        iValue = 0,
        shortYearCutoff = (typeof this.shortYearCutoff !== "string" ? this.shortYearCutoff : new Date().getFullYear() % 100 + parseInt(this.shortYearCutoff, 10)),
        year = -1,
        month = -1,
        day = -1,
        doy = -1,
        literal = false,
        date,
        lookAhead = (match) => {
            let matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
            if (matches) {
                iFormat++;
            }
            return matches;
        },
        getNumber = (match) => {
            let isDoubled = lookAhead(match),
                size = (match === "@" ? 14 : (match === "!" ? 20 :
                (match === "y" && isDoubled ? 4 : (match === "o" ? 3 : 2)))),
                minSize = (match === "y" ? size : 1),
                digits = new RegExp("^\\d{" + minSize + "," + size + "}"),
                num = value.substring(iValue).match(digits);
            if (!num) {
                throw "Missing number at position " + iValue;
            }
            iValue += num[ 0 ].length;
            return parseInt(num[ 0 ], 10);
        },
        getName = (match, shortNames, longNames) => {
            let index = -1;
            let arr = lookAhead(match) ? longNames : shortNames;
            let names = [];

            for (let i = 0; i < arr.length; i++) {
                names.push([i,arr[i]]);
            }
            names.sort((a,b) => {
                return -(a[ 1 ].length - b[ 1 ].length);
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
                throw "Unknown name at position " + iValue;
            }
        },
        checkLiteral = () => {
            if (value.charAt(iValue) !== format.charAt(iFormat)) {
                throw "Unexpected literal at position " + iValue;
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
                    case "d":
                        day = getNumber("d");
                        break;
                    case "D":
                        getName("D", this.getTranslation(TranslationKeys.DAY_NAMES_SHORT), this.getTranslation(TranslationKeys.DAY_NAMES));
                        break;
                    case "o":
                        doy = getNumber("o");
                        break;
                    case "m":
                        month = getNumber("m");
                        break;
                    case "M":
                        month = getName("M", this.getTranslation(TranslationKeys.MONTH_NAMES_SHORT), this.getTranslation(TranslationKeys.MONTH_NAMES));
                        break;
                    case "y":
                        year = getNumber("y");
                        break;
                    case "@":
                        date = new Date(getNumber("@"));
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "!":
                        date = new Date((getNumber("!") - this.ticksTo1970) / 10000);
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
                throw "Extra/unparsed characters found in date: " + extra;
            }
        }

        if (year === -1) {
            year = new Date().getFullYear();
        } else if (year < 100) {
            year += new Date().getFullYear() - new Date().getFullYear() % 100 +
                (year <= shortYearCutoff ? 0 : -100);
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

        date = this.daylightSavingAdjust(new Date(year, month - 1, day));
                if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
                    throw "Invalid date"; // E.g. 31/02/00
                }

        return date;
    }

    daylightSavingAdjust(date) {
        if (!date) {
            return null;
        }

        date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);

        return date;
    }

    updateFilledState() {
        this.filled = this.inputFieldValue && this.inputFieldValue != '';
    }

    onTodayButtonClick(event) {
        let date: Date = new Date();
        let dateMeta = {day: date.getDate(), month: date.getMonth(), year: date.getFullYear(), otherMonth: date.getMonth() !== this.currentMonth || date.getFullYear() !== this.currentYear, today: true, selectable: true};

        this.onDateSelect(event, dateMeta);
        this.onTodayClick.emit(event);
    }

    onClearButtonClick(event) {
        this.updateModel(null);
        this.updateInputfield();
        this.hideOverlay();
        this.onClearClick.emit(event);
    }

    createResponsiveStyle() {
        if (this.numberOfMonths > 1 && this.responsiveOptions) {
            if (!this.responsiveStyleElement) {
                this.responsiveStyleElement = document.createElement('style');
                this.responsiveStyleElement.type = 'text/css';
                document.body.appendChild(this.responsiveStyleElement);
            }

            let innerHTML = '';
            if (this.responsiveOptions) {
                let responsiveOptions = [...this.responsiveOptions]
                    .filter(o => !!(o.breakpoint && o.numMonths))
                    .sort((o1, o2) => -1 * o1.breakpoint.localeCompare(o2.breakpoint, undefined, { numeric: true }));

                for (let i = 0; i < responsiveOptions.length; i++) {
                    let { breakpoint, numMonths } = responsiveOptions[i];
                    let styles = `
                        .p-datepicker[${this.attributeSelector}] .p-datepicker-group:nth-child(${numMonths}) .p-datepicker-next {
                            display: inline-flex !important;
                        }
                    `;

                    for (let j = numMonths; j < this.numberOfMonths; j++) {
                        styles += `
                            .p-datepicker[${this.attributeSelector}] .p-datepicker-group:nth-child(${j + 1}) {
                                display: none !important;
                            }
                        `
                    }

                    innerHTML += `
                        @media screen and (max-width: ${breakpoint}) {
                            ${styles}
                        }
                    `
                }
            }

            this.responsiveStyleElement.innerHTML = innerHTML;
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
                const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

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
            this.documentResizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResizeListener);
        }
    }

    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }

    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.containerViewChild.nativeElement, () => {
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
        return !(this.el.nativeElement.isSameNode(event.target) || this.isNavIconClicked(event) || 
                this.el.nativeElement.contains(event.target) || (this.overlay && this.overlay.contains(<Node> event.target)));
    }

    isNavIconClicked(event: Event) {
        return (DomHandler.hasClass(event.target, 'p-datepicker-prev') || DomHandler.hasClass(event.target, 'p-datepicker-prev-icon')
                || DomHandler.hasClass(event.target, 'p-datepicker-next') || DomHandler.hasClass(event.target, 'p-datepicker-next-icon'));
    }

    onWindowResize() {
        if (this.overlayVisible && !DomHandler.isAndroid()) {
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
    }
}

@NgModule({
    imports: [CommonModule,ButtonModule,SharedModule,RippleModule],
    exports: [Calendar,ButtonModule,SharedModule],
    declarations: [Calendar]
})
export class CalendarModule { }
