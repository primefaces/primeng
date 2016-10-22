import {NgModule,Component,ElementRef,AfterViewInit,OnDestroy,OnInit,Input,Output,SimpleChange,EventEmitter,forwardRef,Renderer,trigger,state,style,transition,animate} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from '../button/button';
import {InputTextModule} from '../inputtext/inputtext';
import {DomHandler} from '../dom/domhandler';
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
        <span [ngClass]="{'ui-calendar':true,'ui-calendar-w-btn':showIcon}" [ngStyle]="style" [class]="styleClass">
            <input type="text" pInputText *ngIf="!inline" (focus)="onInputFocus($event)" (keydown)="onInputKeydown($event)" (click)="closeOverlay=false" (blur)="onInputBlur($event)"
                    [readonly]="readonlyInput" (input)="onInput($event)" [ngStyle]="inputStyle" [class]="inputStyleClass" [placeholder]="placeholder||''" [disabled]="disabled"
                    ><button type="button" [icon]="icon" pButton *ngIf="showIcon" (click)="onButtonClick($event)"
                    [ngClass]="{'ui-datepicker-trigger':true,'ui-state-disabled':disabled}" [disabled]="disabled"></button>
            <div class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" [ngClass]="{'ui-datepicker-inline':inline,'ui-shadow':!inline,'ui-state-disabled':disabled}" 
                [ngStyle]="{'display': inline ? true : (overlayVisible ? 'block' : 'none')}" (click)="onDatePickerClick($event)" [@overlayState]="inline ? 'visible' : (overlayVisible ? 'visible' : 'hidden')">
                <div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">
                    <a class="ui-datepicker-prev ui-corner-all" href="#" (click)="prevMonth($event)" (mouseenter)="hoverPrev=true" (mouseleave)="hoverPrev=false"
                            [ngClass]="{'ui-state-hover ui-datepicker-prev-hover':hoverPrev&&!disabled}">
                        <span class="fa fa-angle-left"></span>
                    </a>
                    <a class="ui-datepicker-next ui-corner-all" href="#" (click)="nextMonth($event)" (mouseenter)="hoverNext=true" (mouseleave)="hoverNext=false"
                            [ngClass]="{'ui-state-hover ui-datepicker-next-hover':hoverNext&&!disabled}">
                        <span class="fa fa-angle-right"></span>
                    </a>
                    <div class="ui-datepicker-title">
                        <span class="ui-datepicker-month" *ngIf="!monthNavigator">{{currentMonthText}}</span>
                        <select class="ui-datepicker-month" *ngIf="monthNavigator" (change)="onMonthDropdownChange($event.target.value)">
                            <option [value]="i" *ngFor="let month of locale.monthNames;let i = index" [selected]="i == currentMonth">{{month}}</option>
                        </select>
                        <select class="ui-datepicker-year" *ngIf="yearNavigator" (change)="onYearDropdownChange($event.target.value)">
                            <option [value]="year" *ngFor="let year of yearOptions" [selected]="year == currentYear">{{year}}</option>
                        </select>
                        <span class="ui-datepicker-year" *ngIf="!yearNavigator">{{currentYear}}</span>
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
                            <td *ngFor="let date of week" [ngClass]="{'ui-datepicker-other-month ui-state-disabled':date.otherMonth,
                                'ui-datepicker-current-day':date.isSelected,'ui-datepicker-today':date.isToday}">
                                <a #cell class="ui-state-default" href="#" *ngIf="date.otherMonth ? showOtherMonths : true" 
                                        [ngClass]="{'ui-state-active':date.isSelected,'ui-state-hover':(hoverCell == cell && !disabled && date.selectable),
                                            'ui-state-highlight':date.isToday,'ui-state-disabled':!date.selectable}"
                                        (click)="onDateSelect($event,date)" (mouseenter)="hoverCell=cell" (mouseleave)="hoverCell=null">{{date.day}}</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="ui-timepicker ui-widget-header" *ngIf="showTime">
                    <div class="ui-hour-picker">
                        <a href="#" (click)="incrementHour($event)">
                            <span class="fa fa-angle-up"></span>
                        </a>
                        <span [ngStyle]="{'display': currentHour < 10 ? 'inline': 'none'}">0</span><span>{{currentHour}}</span>
                        <a href="#" (click)="decrementHour($event)">
                            <span class="fa fa-angle-down"></span>
                        </a>
                    </div>
                    <div class="ui-separator">
                        <a href="#">
                            <span class="fa fa-angle-up"></span>
                        </a>
                        <span>:</span>
                        <a href="#">
                            <span class="fa fa-angle-down"></span>
                        </a>
                    </div>
                    <div class="ui-minute-picker">
                        <a href="#" (click)="incrementMinute($event)">
                            <span class="fa fa-angle-up"></span>
                        </a>
                        <span [ngStyle]="{'display': currentMinute < 10 ? 'inline': 'none'}">0</span><span>{{currentMinute}}</span>
                        <a href="#" (click)="decrementMinute($event)">
                            <span class="fa fa-angle-down"></span>
                        </a>
                    </div>
                    <div class="ui-ampm-picker" *ngIf="hourFormat=='12'">
                        <a href="#" (click)="toggleAMPM($event)">
                            <span class="fa fa-angle-up"></span>
                        </a>
                        <span>{{pm ? 'PM' : 'AM'}}</span>
                        <a href="#" (click)="toggleAMPM($event)">
                            <span class="fa fa-angle-down"></span>
                        </a>
                    </div>
                </div>
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
    providers: [DomHandler,CALENDAR_VALUE_ACCESSOR]
})
export class Calendar implements AfterViewInit,OnInit,OnDestroy,ControlValueAccessor {
    
    @Input() defaultDate: Date;
    
    @Input() style: string;
    
    @Input() styleClass: string;
    
    @Input() inputStyle: string;
    
    @Input() inputStyleClass: string;
    
    @Input() placeholder: string;
    
    @Input() disabled: any;
    
    @Input() dateFormat: string = 'mm/dd/yy';
        
    @Input() inline: boolean = false;
    
    @Input() showOtherMonths: boolean = true;

    @Input() selectOtherMonths: boolean;
    
    @Input() showIcon: boolean;
    
    @Input() icon: string = 'fa-calendar';
    
    @Input() appendTo: any;
    
    @Input() readonlyInput: boolean;
    
    @Input() shortYearCutoff: any = '+10';
    
    @Input() minDate: Date;

    @Input() maxDate: Date;
    
    @Input() monthNavigator: boolean;

    @Input() yearNavigator: boolean;

    @Input() yearRange: string;
    
    @Input() showTime: boolean;
    
    @Input() hourFormat: string = '24';
    
    @Output() onBlur: EventEmitter<any> = new EventEmitter();
    
    @Output() onSelect: EventEmitter<any> = new EventEmitter();
    
    @Input() locale: LocaleSettings = {
        firstDayOfWeek: 0,
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
        monthNames: [ "January","February","March","April","May","June","July","August","September","October","November","December" ],
        monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
    };
    
    value: Date;
    
    dates: any[];
    
    weekDays: string[] = [];
    
    currentMonthText: string;
    
    currentMonth: number;
    
    currentYear: number;
    
    currentHour: number;
    
    currentMinute: number;
    
    pm: boolean;
    
    overlay: HTMLDivElement;
    
    inputfield: HTMLInputElement;
    
    overlayVisible: boolean;
    
    closeOverlay: boolean = true;
    
    dateClick: boolean;
        
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
    
    calendarElement: any;
    
    documentClickListener: any;
    
    ticksTo1970: number;
    
    yearOptions: number[];

    constructor(protected el: ElementRef, protected domHandler: DomHandler,protected renderer: Renderer) {}

    ngOnInit() {
        let dayIndex = this.locale.firstDayOfWeek;
        for(let i = 0; i < 7; i++) {
            this.weekDays.push(this.locale.dayNamesMin[dayIndex]);
            dayIndex = (dayIndex == 6) ? 0 : ++dayIndex;
        }
                
        let date = this.defaultDate || new Date();
        this.updateInternalState(date);

        
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
            if(this.closeOverlay) {
                this.overlayVisible = false;
            }
            
            this.closeOverlay = true;
            this.dateClick = false;
        });
        
        this.ticksTo1970 = (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
    		Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000);
            
        if(this.yearNavigator && this.yearRange) {
            this.yearOptions = [];
            let years = this.yearRange.split(':'),
            yearStart = parseInt(years[0]),
            yearEnd = parseInt(years[1]);
            
            for(let i = yearStart; i <= yearEnd; i++) {
                this.yearOptions.push(i);
            }
        }
    }
    
    ngAfterViewInit() {
        this.overlay = this.domHandler.findSingle(this.el.nativeElement, '.ui-datepicker');
        
        if(!this.inline) {
            this.inputfield = this.el.nativeElement.children[0].children[0];
        }
        
        if(!this.inline && this.appendTo) {
            if(this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                this.appendTo.appendChild(this.overlay);
        }

        if (this.value) {
            this.updateInternalState(this.value);
            this.updateInputfield();
        }
    }

    updateInternalState(date: Date) {
        if (date) {
            this.currentMonth = date.getMonth();
            this.currentYear = date.getFullYear();
            if (this.showTime) {
                this.currentMinute = date.getMinutes();
                this.pm = date.getHours() > 11;

                if (this.hourFormat == '12')
                    this.currentHour = date.getHours() == 0 ? 12 : date.getHours() % 12;
                else
                    this.currentHour = date.getHours();
            }

            this.createMonth(this.currentMonth, this.currentYear);
        }
    }
    
    createMonth(month: number, year: number) {
        this.dates = [];
        this.currentMonthText = this.locale.monthNames[month];
        this.currentYear = year;
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
                    let date = {
                        day: j,
                        month: prev.month,
                        year: prev.year,
                        otherMonth: true,
                        selectable: this.isSelectable(j, prev.month, prev.year),
                        isSelected: false,
                        isToday: false
                    };
                    date.isSelected = this.isSelected(date);
                    date.isToday = this.isToday(date);
                    week.push(date);
                }
                
                let remainingDaysLength = 7 - week.length;
                for(let j = 0; j < remainingDaysLength; j++) {
                    let date = {
                        day: dayNo,
                        month: month,
                        year: year,
                        selectable: this.isSelectable(dayNo, month, year),
                        isSelected: false,
                        isToday: false
                    };
                    date.isSelected = this.isSelected(date);
                    date.isToday = this.isToday(date);
                    week.push(date);
                    dayNo++;
                }
            }
            else {
                for (let j = 0; j < 7; j++) {
                    if(dayNo > daysLength) {
                        let next = this.getPreviousMonthAndYear(month, year);
                        let date = {
                            day: dayNo - daysLength,
                            month: next.month,
                            year: next.year,
                            otherMonth: true,
                            selectable: this.isSelectable((dayNo - daysLength), next.month, next.year),
                            isSelected: false,
                            isToday: false
                        };
                        date.isSelected = this.isSelected(date);
                        date.isToday = this.isToday(date);
                        week.push(date);
                    } else {
                        let date = {
                            day: dayNo,
                            month: month,
                            year: year,
                            selectable: this.isSelectable(dayNo, month, year),
                            isSelected: false,
                            isToday: false
                        };
                        date.isSelected = this.isSelected(date);
                        date.isToday = this.isToday(date);
                        week.push(date);
                    }
                    
                    dayNo++;
                }
            }
            
            this.dates.push(week);
        }
    }
    
    prevMonth(event) {
        if(this.disabled) {
            event.preventDefault();
            return;
        }
        
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
        if(this.disabled) {
            event.preventDefault();
            return;
        }
        
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
        if(this.disabled || !dateMeta.selectable) {
            event.preventDefault();
            return;
        }
        
        if(dateMeta.otherMonth) {
            if(this.selectOtherMonths)
                this.selectDate(dateMeta);
        }
        else {
             this.selectDate(dateMeta);
        }
        
        this.dateClick = true;
        this.updateInternalState(this.value);
        this.updateInputfield();
        event.preventDefault();
    }
    
    updateInputfield() {
        if(this.inputfield) {
            let formattedValue = this.formatDate(this.value, this.dateFormat);
            if(this.showTime) {
                formattedValue += ' ' + this.formatTime(this.value);
            }
            this.inputfield.value = formattedValue;
        }
    }
    
    selectDate(dateMeta) {
        this.value = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
        if(this.showTime) {
            if(this.hourFormat === '12' && this.pm && this.currentHour != 12)
                this.value.setHours(this.currentHour + 12);
            else
                this.value.setHours(this.currentHour);

            this.value.setMinutes(this.currentMinute);
        }
        this.onModelChange(this.value);
        this.onSelect.emit(this.value);
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
    
    isToday(dateMeta): boolean {     
        let today = new Date();
        
        return today.getDate() === dateMeta.day && today.getMonth() === dateMeta.month && today.getFullYear() === dateMeta.year;
    }
    
    isSelectable(day, month, year): boolean {
        let validMin = true;
        let validMax = true;
        
        if(this.minDate) {
             if(this.minDate.getFullYear() > year) {
                 validMin = false;
             }
             else if(this.minDate.getFullYear() === year) {
                 if(this.minDate.getMonth() > month) {
                     validMin = false;
                 }
                 else if(this.minDate.getMonth() === month) {
                     if(this.minDate.getDate() > day) {
                         validMin = false;
                     }
                 }
             }  
        }
        
        if(this.maxDate) {
             if(this.maxDate.getFullYear() < year) {
                 validMax = false;
             }
             else if(this.maxDate.getFullYear() === year) {
                 if(this.maxDate.getMonth() < month) {
                     validMax = false;
                 }
                 else if(this.maxDate.getMonth() === month) {
                     if(this.maxDate.getDate() < day) {
                         validMax = false;
                     }
                 }
             }  
        }
        
        return validMin && validMax;
    }
    
    onInputFocus(event) {
        this.showOverlay();
    }
    
    onButtonClick(event) {
        this.closeOverlay = false;
        
        if(!this.overlay.offsetParent) {
            this.inputfield.focus();
        }
        else {
            this.closeOverlay = true;
        }
    }
    
    onInputKeydown(event) {
        if(event.keyCode === 9) {
            this.overlayVisible = false;
        }
    }
    
    onInputBlur(event) {
        this.onBlur.emit(event);
        this.onModelTouched();
    }
    
    onMonthDropdownChange(m: string) {
        this.currentMonth = parseInt(m);
        this.createMonth(this.currentMonth, this.currentYear);
    }
    
    onYearDropdownChange(y: string) {
        this.currentYear = parseInt(y);
        this.createMonth(this.currentMonth, this.currentYear);
    }
    
    incrementHour(event) {
        if(this.hourFormat == '24') {
            if(this.currentHour === 23)
                this.currentHour = 0;
            else
                this.currentHour++;            
        }
        else if(this.hourFormat == '12') {
            if(this.currentHour === 12)
                this.currentHour = 0;
            else
                this.currentHour++;
        }
        
        this.updateTime();
                
        event.preventDefault();
    }
    
    decrementHour(event) {
        if(this.hourFormat == '24') {
            if(this.currentHour === 0)
                this.currentHour = 23;
            else
                this.currentHour--;
        }
        else if(this.hourFormat == '12') {
            if(this.currentHour === 0)
                this.currentHour = 12;
            else
                this.currentHour--;
        }
        
        this.updateTime();

        event.preventDefault();
    }
    
    incrementMinute(event) {
        if(this.currentMinute === 59)
            this.currentMinute = 0;
        else
            this.currentMinute++;
            
        this.updateTime();
                
        event.preventDefault();
    }
    
    decrementMinute(event) {
        if(this.currentMinute === 0)
            this.currentMinute = 59;
        else
            this.currentMinute--;
            
        this.updateTime();
            
        event.preventDefault();
    }
    
    updateTime() {
        this.value = this.value||new Date();
        if(this.hourFormat === '12' && this.pm && this.currentHour != 12)
            this.value.setHours(this.currentHour + 12);
        else
            this.value.setHours(this.currentHour);
        
        this.value.setMinutes(this.currentMinute);
        this.onModelChange(this.value);
        this.updateInputfield();
    }
    
    toggleAMPM(event) {
        this.pm = !this.pm;
        this.updateTime();
        event.preventDefault();
    }
    
    onInput(event) {
        try {
            let rawValue = event.target.value;
            let parsedValue;
            if(this.showTime) {
                let parts: string[] = rawValue.split(' ');
                parsedValue = this.parseDate(parts[0], this.dateFormat);
                let time = this.parseTime(parts[1]);
                
                if(this.hourFormat == '12') {
                    if(!parts[2])
                        throw 'Invalid Time';
                    else if(parts[2].toLowerCase() === 'PM' && time.hour != 12)
                        parsedValue.setHours(time.hour + 12);
                }
                else {
                    parsedValue.setHours(time.hour);
                }

                parsedValue.setMinutes(time.minute);
            }
            else {
                 parsedValue = this.parseDate(event.target.value, this.dateFormat);
            }
            
            this.value = parsedValue;

            //update ui
            this.createMonth(this.value.getMonth(), this.value.getFullYear());
            if(this.showTime) {
                this.currentHour = this.value.getHours();
                this.currentMinute = this.value.getMinutes();
            }
        } 
        catch(err) {
            //invalid date
            this.value = null;
        }
        
        this.onModelChange(this.value);
    }
    
    onDatePickerClick(event) {
        this.closeOverlay = this.dateClick;
    }
    
    showOverlay() {
        if(this.appendTo)
            this.domHandler.absolutePosition(this.overlay, event.target);
        else
            this.domHandler.relativePosition(this.overlay, event.target);
        
        this.overlayVisible = true;
        this.overlay.style.zIndex = String(++DomHandler.zindex);
    }

    writeValue(value: any) : void {
        this.value = value;
        this.updateInternalState(this.value);
        this.updateInputfield();
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
    
    // Ported from jquery-ui datepicker formatDate    
    formatDate(date, format) {
        if(!date) {
            return "";
        }

        let iFormat,
        lookAhead = (match) => {
            let matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
            if(matches) {
                iFormat++;
            }
            return matches;
        },
        formatNumber = (match, value, len) => {
            let num = "" + value;
            if(lookAhead(match)) {
                while (num.length < len) {
                    num = "0" + num;
                }
            }
            return num;
        },
        formatName = (match, value, shortNames, longNames) => {
            return (lookAhead(match) ? longNames[ value ] : shortNames[ value ]);
        },
        output = "",
        literal = false;

        if(date) {
            for(iFormat = 0; iFormat < format.length; iFormat++) {
                if(literal) {
                    if(format.charAt(iFormat) === "'" && !lookAhead("'"))
                        literal = false;
                    else
                        output += format.charAt(iFormat);
                }
                else {
                    switch (format.charAt(iFormat)) {
                        case "d":
                            output += formatNumber("d", date.getDate(), 2);
                            break;
                        case "D":
                            output += formatName("D", date.getDay(), this.locale.dayNamesShort, this.locale.dayNames);
                            break;
                        case "o":
                            output += formatNumber("o",
                                Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                            break;
                        case "m":
                            output += formatNumber("m", date.getMonth() + 1, 2);
                            break;
                        case "M":
                            output += formatName("M", date.getMonth(), this.locale.monthNamesShort, this.locale.monthNames);
                            break;
                        case "y":
                            output += (lookAhead("y") ? date.getFullYear() :
                                (date.getFullYear() % 100 < 10 ? "0" : "") + date.getFullYear() % 100);
                            break;
                        case "@":
                            output += date.getTime();
                            break;
                        case "!":
                            output += date.getTime() * 10000 + this.ticksTo1970;
                            break;
                        case "'":
                            if(lookAhead("'"))
                                output += "'";
                            else
                                literal = true;

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
        if(!date) {
            return '';
        }
        
        let output = '';
        let hours = date.getHours();
        let minutes = date.getMinutes();
        
        if(this.hourFormat == '12' && this.pm && hours != 12) {
            hours-=12;
        }
        
        output += (hours < 10) ? '0' + hours : hours;
        output += ':';
        output += (minutes < 10) ? '0' + minutes : minutes;
        
        if(this.hourFormat == '12') {
            output += this.pm ? ' PM' : ' AM';
        }
        
        return output;
    }
    
    parseTime(value) {
        let tokens: string[] = value.split(':');
        if(tokens.length !== 2) {
            throw "Invalid time";
        }
        
        let h = parseInt(tokens[0]);
        let m = parseInt(tokens[1]);
        if(isNaN(h) || isNaN(m) || h > 23 || m > 59 || (this.hourFormat == '12' && h > 12)) {
            throw "Invalid time";
        }
        else {
            if(this.hourFormat == '12' && h !== 12) {
                h+= 12;
            }

            return {hour: parseInt(tokens[0]), minute: parseInt(tokens[1])};
        }
    }
    
    // Ported from jquery-ui datepicker parseDate 
    parseDate(value, format) {
		if(format == null || value == null) {
			throw "Invalid arguments";
		}

		value = (typeof value === "object" ? value.toString() : value + "");
		if(value === "") {
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
			if(matches) {
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
			if(!num) {
				throw "Missing number at position " + iValue;
			}
			iValue += num[ 0 ].length;
			return parseInt(num[ 0 ], 10);
		},
		getName = (match, shortNames, longNames) => {
            let index = -1;
            let arr = lookAhead(match) ? longNames : shortNames;
            let names = [];
            
            for(let i = 0; i < arr.length; i++) {
                names.push([i,arr[i]]);
            }
            names.sort((a,b) => {
                return -(a[ 1 ].length - b[ 1 ].length);
            });
            
            for(let i = 0; i < names.length; i++) {
                let name = names[i][1];
                if(value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
    				index = names[i][0];
    				iValue += name.length;
    				break;
    			}
            }

			if(index !== -1) {
				return index + 1;
			} else {
				throw "Unknown name at position " + iValue;
			}
		},
		checkLiteral = () => {
			if(value.charAt(iValue) !== format.charAt(iFormat)) {
				throw "Unexpected literal at position " + iValue;
			}
			iValue++;
		};

		for (iFormat = 0; iFormat < format.length; iFormat++) {
			if(literal) {
				if(format.charAt(iFormat) === "'" && !lookAhead("'")) {
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
						getName("D", this.locale.dayNamesShort, this.locale.dayNames);
						break;
					case "o":
						doy = getNumber("o");
						break;
					case "m":
						month = getNumber("m");
						break;
					case "M":
						month = getName("M", this.locale.monthNamesShort, this.locale.monthNames);
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
						if(lookAhead("'")) {
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

		if(iValue < value.length) {
			extra = value.substr(iValue);
			if(!/^\s+/.test(extra)) {
				throw "Extra/unparsed characters found in date: " + extra;
			}
		}

		if(year === -1) {
			year = new Date().getFullYear();
		} else if(year < 100) {
			year += new Date().getFullYear() - new Date().getFullYear() % 100 +
				(year <= shortYearCutoff ? 0 : -100);
		}

		if(doy > -1) {
			month = 1;
			day = doy;
			do {
				dim = this.getDaysCountInMonth(year, month - 1);
				if(day <= dim) {
					break;
				}
				month++;
				day -= dim;
			} while (true);
		}

		date = this.daylightSavingAdjust(new Date(year, month - 1, day));
		if(date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
			throw "Invalid date"; // E.g. 31/02/00
		}
		return date;
	}
    
    daylightSavingAdjust(date) {
        if(!date) {
            return null;
        }
        date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
        return date;
    }
        
    ngOnDestroy() {
        if(!this.inline && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    }
}

@NgModule({
    imports: [CommonModule,ButtonModule,InputTextModule],
    exports: [Calendar,ButtonModule,InputTextModule],
    declarations: [Calendar]
})
export class CalendarModule { }