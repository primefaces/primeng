import {NgModule,Component,ElementRef,AfterViewInit,OnDestroy,OnInit,Input,Output,SimpleChange,EventEmitter,forwardRef,NgZone} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from '../button/button';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const CALENDAR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Calendar),
  multi: true
};

export interface LocaleSettings {
    firstDayOfWeek?: number;
    dayNames: string[];
	dayNamesShort: string[];
	dayNamesMin: string[];
    monthNames: string[];
    monthNamesShort: string[];
}

@Component({
    selector: 'p-calendar',
    template:  `
        <div class="ui-datepicker-inline ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" style="display:block">
            <div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">
                <a class="ui-datepicker-prev ui-corner-all" href="#" (click)="prevMonth($event)">
                    <span class="fa fa-angle-left"></span>
                </a>
                <a class="ui-datepicker-next ui-corner-all" href="#" (click)="nextMonth($event)">
                    <span class="fa fa-angle-right"></span>
                </a>
                <div class="ui-datepicker-title">
                    <span class="ui-datepicker-month">{{currentMonthText}}</span>&nbsp;<span class="ui-datepicker-year">{{currentYear}}</span>
                </div>
            </div>
            <table class="ui-datepicker-calendar">
                <thead>
                    <tr>
                        <th scope="col" *ngFor="let weekDay of weekDays;let begin = first; let end = last">
                            <span>{{weekDay}}</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let week of dates">
                        <td *ngFor="let date of week" [ngClass]="{'ui-datepicker-other-month ui-state-disabled':date.otherMonth,'ui-datepicker-current-day':isSelected(date)}">
                            <a class="ui-state-default" href="#" *ngIf="date.otherMonth ? showOtherMonths : true" [ngClass]="{'ui-state-active':isSelected(date)}"
                                    (click)="onDateSelect($event,date)">{{date.day}}</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    providers: [CALENDAR_VALUE_ACCESSOR]
})
export class Calendar implements AfterViewInit,OnInit,OnDestroy,ControlValueAccessor {

    /*@Input() readonlyInput: boolean;

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() inputStyle: any;

    @Input() inputStyleClass: string;

    @Input() placeholder: string;

    @Input() showAnim: string;

    @Input() dateFormat: string;

    @Input() showButtonPanel: boolean;

    @Input() monthNavigator: boolean;

    @Input() yearNavigator: boolean;

    @Input() numberOfMonths: number;

    @Input() showWeek: boolean;

    @Input() defaultDate: Date;

    @Input() minDate: any;

    @Input() maxDate: any;

    @Input() disabled: any;
    
    @Input() showIcon: boolean;
    
    @Input() timeFormat: string;
    
    @Input() timeOnly: boolean;
    
    @Input() stepHour: number = 1;
    
    @Input() stepMinute: number = 1;
    
    @Input() stepSecond: number = 1;
    
    @Input() hourMin: number = 0;
        
    @Input() hourMax: number = 23;
        
    @Input() minuteMin: number = 0;
    
    @Input() minuteMax: number = 59;
    
    @Input() secondMin: number = 0;
    
    @Input() secondMax: number = 59;
    
    @Input() hourGrid: number = 0;
    
    @Input() minuteGrid: number = 0;
    
    @Input() secondGrid: number = 0;

    @Input() timeControlType: string;
    
    @Input() horizontalTimeControls: boolean;
    
    @Input() minTime: string;
    
    @Input() maxTime: string;
    
    @Input() timezoneList: string[];
    
    @Input() locale: any;
    
    @Input() icon: string = 'fa-calendar';

    @Input() yearRange: string;
    
    @Output() onBlur: EventEmitter<any> = new EventEmitter();
    
    @Output() onSelect: EventEmitter<any> = new EventEmitter();*/
    
    @Input() defaultDate: Date;
    
    @Input() disabled: any;
    
    @Input() locale: LocaleSettings = {
        firstDayOfWeek: 0,
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
        monthNames: [ "January","February","March","April","May","June","July","August","September","October","November","December" ],
        monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
    };
    
    @Input() inline: boolean = false;
    
    @Input() showOtherMonths: boolean = true;

    @Input() selectOtherMonths: boolean;
    
    value: Date;
    
    dates: any[];
    
    weekDays: string[] = [];
    
    currentMonthText: string;
    
    currentMonth: number;
    
    currentYear: number;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
    
    calendarElement: any;

    constructor(protected el: ElementRef, protected zone:NgZone) {
        
    }

    ngOnInit() {
        let today = new Date();
        let date = this.defaultDate||new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        
        let dayIndex = this.locale.firstDayOfWeek;
        for(let i = 0; i < 7; i++) {
            this.weekDays.push(this.locale.dayNamesMin[dayIndex]);
            dayIndex = (dayIndex == 6) ? 0 : ++dayIndex;
        }
                
        this.currentMonth = month;
        this.currentYear = year;
        this.createMonth(this.currentMonth, this.currentYear);
    }
    
    createMonth(month: number, year: number) {
        this.dates = [];
        this.currentMonthText = this.locale.monthNames[month];
        let firstDay = this.getFirstDayOfMonthIndex(month, year);
        let daysLength = this.getDaysCountInMonth(month, year);
        let prevMonthDaysLength = this.getDaysCountInPrevMonth(month, year);
        let sundayIndex = this.getSundayIndex();
        let dayNo = 1;
                
        for(let i = 0; i < 6; i++) {
            let week = [];
            
            if(i == 0) {
                for(let j = (prevMonthDaysLength - firstDay + 1); j <= prevMonthDaysLength; j++) {
                    let prev = this.getPreviousMonthAndYear(month, year);
                    week.push({day: j, month: prev.month, year: prev.year, otherMonth: true});
                }
                
                let remainingDaysLength = 7 - week.length;
                for(let j = 0; j < remainingDaysLength; j++) {
                    week.push({day: dayNo, month: month, year: year});
                    dayNo++;
                }
            }
            else {
                for (var j = 0; j < 7; j++) {
                    if(dayNo > daysLength) {
                        let next = this.getPreviousMonthAndYear(month, year);
                        week.push({day: dayNo - daysLength, month: next.month, year: next.year, otherMonth:true});
                    }
                    else {
                        week.push({day: dayNo, month: month, year: year});
                    }
                    
                    dayNo++;
                }
            }
            
            this.dates.push(week);
        }
    }
    
    prevMonth(event) {
        if(this.currentMonth === 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        else {
            this.currentMonth--;
        }
        
        this.createMonth(this.currentMonth, this.currentYear);
        event.preventDefault();
    }
    
    nextMonth(event) {
        if(this.currentMonth === 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        else {
            this.currentMonth++;
        }
        
        this.createMonth(this.currentMonth, this.currentYear);
        event.preventDefault();
    }
    
    onDateSelect(event,dateMeta) {
        if(dateMeta.otherMonth) {
            if(this.selectOtherMonths)
                this.selectDate(dateMeta);
        }
        else {
             this.selectDate(dateMeta);
        }
        
        event.preventDefault();
    }
    
    selectDate(dateMeta) {
        this.value = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
        this.onModelChange(this.value);
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
        return 32 - (new Date(year, month, 32).getDate()); 
    }
    
    getDaysCountInPrevMonth(month: number, year: number) {
        let prev = this.getPreviousMonthAndYear(month, year);
        return this.getDaysCountInMonth(prev.month, prev.year); 
    }
    
    getPreviousMonthAndYear(month: number, year: number) {
        let m, y;
        
        if(month === 0) {
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
        
        if(month === 11) {
            m = 0;
            y = year + 1;
        }
        else {
            m = month + 1;
        }
        
        return {'month':m,'year':y};
    }
    
    getSundayIndex() {
        return this.locale.firstDayOfWeek > 0 ? 7 - this.locale.firstDayOfWeek : 0;
    }
    
    isSelected(dateMeta): boolean {        
        if(this.value)
            return this.value.getDate() === dateMeta.day && this.value.getMonth() === dateMeta.month && this.value.getFullYear() === dateMeta.year;
        else
            return false;
    }
    
    ngAfterViewInit() {
        
    }
    
    writeValue(value: any) : void {
        this.value = value;
    }
    
    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
    
    setDisabledState(val: boolean): void {
        this.disabled = val;
    }

    ngOnDestroy() {
        
    }
}

@NgModule({
    imports: [CommonModule,ButtonModule],
    exports: [Calendar],
    declarations: [Calendar]
})
export class CalendarModule { }