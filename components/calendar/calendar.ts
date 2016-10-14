import {NgModule,Component,ElementRef,AfterViewInit,OnDestroy,OnInit,Input,Output,SimpleChange,EventEmitter,forwardRef,Renderer} from '@angular/core';
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
        <span class="ui-calendar">
            <input type="text" pInputText *ngIf="!inline" (focus)="onInputFocus($event)" (keydown)="onInputKeydown($event)" (click)="closeOverlay=false"
                ><button type="button" [icon]="icon" pButton *ngIf="showIcon" (click)="onButtonClick($event)"
                    [ngClass]="{'ui-datepicker-trigger':true,'ui-state-disabled':disabled}" [disabled]="disabled"></button>
            <div class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" [ngClass]="{'ui-datepicker-inline':inline}" 
                [ngStyle]="{'display': overlayVisible ? 'block' : 'none'}" (click)="onDatePickerClick($event)">
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
        </span>
    `,
    providers: [DomHandler,CALENDAR_VALUE_ACCESSOR]
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
    
    @Input() dateFormat: string = 'mm/dd/yy';
    
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
    
    @Input() showIcon: boolean;
    
    @Input() icon: string = 'fa-calendar';
    
    @Input() appendTo: any;
    
    value: Date;
    
    dates: any[];
    
    weekDays: string[] = [];
    
    currentMonthText: string;
    
    currentMonth: number;
    
    currentYear: number;
    
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

    constructor(protected el: ElementRef, protected domHandler: DomHandler,protected renderer: Renderer) {}

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
        
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
            if(this.closeOverlay) {
                this.overlayVisible = false;
            }
            
            this.closeOverlay = true;
            this.dateClick = false;
        });
        
        this.ticksTo1970 = ( ( ( 1970 - 1 ) * 365 + Math.floor( 1970 / 4 ) - Math.floor( 1970 / 100 ) +
    		Math.floor( 1970 / 400 ) ) * 24 * 60 * 60 * 10000000 );
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
        
        this.dateClick = true;
        if(this.inputfield) {
            this.inputfield.value = this.formatDate(this.value, this.dateFormat);
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
        this.domHandler.fadeIn(this.overlay, 250);
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
    
    formatDate(date, format) {
		if (!date ) {
			return '';
		}

        let formatIndex = {
            i: 0
        };
        let output = "";
        let literal = false;

		if(date) {
			for(0; formatIndex.i < format.length; formatIndex.i++) {
				if(literal) {
					if(format.charAt(formatIndex.i) === "'" && !this.lookAhead("'",format,formatIndex) ) {
						literal = false;
					} else {
						output += format.charAt(formatIndex.i);
					}
				} else {
					switch (format.charAt(formatIndex.i) ) {
						case "d":
							output += this.formatNumber("d", date.getDate(), 2, format, formatIndex);
							break;
						case "D":
							output += this.formatName("D", date.getDay(), this.locale.dayNamesShort, this.locale.dayNames,format, formatIndex);
							break;
						case "o":
							output += this.formatNumber("o",
								Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate() ).getTime() - new Date(date.getFullYear(), 0, 0 ).getTime() ) / 86400000), 3, format, formatIndex);
							break;
						case "m":
							output += this.formatNumber("m", date.getMonth() + 1, 2, format, formatIndex);
							break;
						case "M":
							output += this.formatName("M", date.getMonth(), this.locale.monthNamesShort, this.locale.monthNames, format, formatIndex);
							break;
						case "y":
							output += (this.lookAhead("y",format,formatIndex) ? date.getFullYear() :
								(date.getFullYear() % 100 < 10 ? "0" : "" ) + date.getFullYear() % 100 );
							break;
						case "@":
							output += date.getTime();
							break;
						case "!":
							output += date.getTime() * 10000 + this.ticksTo1970;
							break;
						case "'":
							if (this.lookAhead("'",format,formatIndex)) {
								output += "'";
							} else {
								literal = true;
							}
							break;
						default:
							output += format.charAt(formatIndex.i);
					}
				}
			}
		}
		return output;
	}
    
    lookAhead(match,format,formatIndex) {
        var matches = (formatIndex.i + 1 < format.length && format.charAt(formatIndex.i + 1 ) === match );
        if (matches ) {
            formatIndex.i++;
        }
        return matches;
    }

    formatNumber(match,value,len,format,formatIndex) {
        var num = '' + value;
        if(this.lookAhead(match,format,formatIndex)) {
            while (num.length < len ) {
                num = '0' + num;
            }
        }
        return num;
    }
    
    formatName(match,value,shortNames,longNames,format,formatIndex) {
        return (this.lookAhead(match,format,formatIndex) ? longNames[ value ] : shortNames[ value ] );
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