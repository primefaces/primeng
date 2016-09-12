import {NgModule,Component,ElementRef,AfterViewInit,OnDestroy,OnChanges,Input,Output,SimpleChange,EventEmitter,forwardRef,NgZone} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from '../button/button';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const CALENDAR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Calendar),
  multi: true
};

@Component({
    selector: 'p-calendar',
    template:  `
        <span [ngStyle]="style" [class]="styleClass" [ngClass]="'ui-calendar'" *ngIf="!inline">
        <input #in type="text" [attr.placeholder]="placeholder" [ngStyle]="inputStyle" [class]="inputStyleClass"
                [value]="value||''" (input)="onInput($event)" [readonly]="readonlyInput"
                [disabled]="disabled" (mouseenter)="hovered=true" (mouseleave)="hovered=false" (focus)="focused=true" (blur)="handleBlur($event)"
                [ngClass]="{'ui-inputtext ui-widget ui-state-default': true, 'ui-corner-all': !showIcon, 'ui-corner-left': showIcon,
                    'ui-state-hover':hovered,'ui-state-focus':focused,'ui-state-disabled':disabled}"
        ><button type="button" [icon]="icon" pButton *ngIf="showIcon" (click)="onButtonClick($event,in)" 
                [ngClass]="{'ui-datepicker-trigger':true,'ui-state-disabled':disabled}" [disabled]="disabled"></button></span>
        <div *ngIf="inline"></div>
    `,
    providers: [CALENDAR_VALUE_ACCESSOR]
})
export class Calendar implements AfterViewInit,OnChanges,OnDestroy,ControlValueAccessor {

    @Input() readonlyInput: boolean;

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() inputStyle: any;

    @Input() inputStyleClass: string;

    @Input() placeholder: string;

    @Input() inline: boolean = false;

    @Input() showAnim: string;

    @Input() dateFormat: string;

    @Input() showButtonPanel: boolean;

    @Input() monthNavigator: boolean;

    @Input() yearNavigator: boolean;

    @Input() numberOfMonths: number;

    @Input() showWeek: boolean;

    @Input() showOtherMonths: boolean;

    @Input() selectOtherMonths: boolean;

    @Input() defaultDate: any;

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
    
    @Output() onSelect: EventEmitter<any> = new EventEmitter();
    
    value: string;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};

    hovered: boolean;

    focused: boolean;

    initialized: boolean;
    
    calendarElement: any;

    constructor(protected el: ElementRef, protected zone:NgZone) {
        this.initialized = false;
    }

    ngAfterViewInit() {
        this.calendarElement = this.inline ? jQuery(this.el.nativeElement.children[0]) : jQuery(this.el.nativeElement.children[0].children[0]);
        let options = {
            showAnim: this.showAnim,
            dateFormat: this.dateFormat,
            showButtonPanel: this.showButtonPanel,
            changeMonth: this.monthNavigator,
            changeYear: this.yearNavigator,
            numberOfMonths: this.numberOfMonths,
            showWeek: this.showWeek,
            showOtherMonths: this.showOtherMonths,
            selectOtherMonths: this.selectOtherMonths,
            defaultDate: this.defaultDate,
            minDate: this.minDate,
            maxDate: this.maxDate,
            yearRange: this.yearRange,
            onSelect: (dateText: string) => {
                this.zone.run(() => {
                    this.value = dateText;
                    this.onModelChange(this.value);
                    this.onSelect.emit(this.value);
                });
            }
        };
        
        if(this.locale) {
            for(var prop in this.locale) {
                options[prop] = this.locale[prop];
            }
        }
        
        if(this.timeFormat||this.timeOnly) {
            options['timeFormat'] = this.timeFormat;
            options['timeOnly'] = this.timeOnly;
            options['stepHour'] = this.stepHour;
            options['stepMinute'] = this.stepMinute;
            options['stepSecond'] = this.stepSecond;
            options['hourMin'] = this.hourMin;
            options['hourMax'] = this.hourMax;
            options['minuteMin'] = this.minuteMin;
            options['minuteMax'] = this.minuteMax;
            options['secondMin'] = this.secondMin;
            options['secondMax'] = this.secondMax;
            options['hourGrid'] = this.hourGrid;
            options['minuteGrid'] = this.minuteGrid;
            options['secondGrid'] = this.secondGrid;
            options['controlType'] = this.timeControlType;
            options['oneLine'] = this.horizontalTimeControls;
            options['minTime'] = this.minTime;
            options['maxTime'] = this.maxTime;
            options['timezoneList'] = this.timezoneList;
            this.calendarElement.datetimepicker(options);
        }
        else
            this.calendarElement.datepicker(options);
        
        this.initialized = true;
    }
    
    onInput(event) {
        this.onModelChange(event.target.value);
    }
    
    handleBlur(event) {
        this.value = event.target.value;
        this.onModelTouched();
        this.focused=false;
        this.onBlur.emit(event);
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

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (this.initialized) {
            for (var key in changes) {
                this.calendarElement.datepicker('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        this.calendarElement.datepicker('destroy');
        this.calendarElement = null;
        this.initialized = false;
    }
    
    onButtonClick(event,input) {
        input.focus();
    }
}

@NgModule({
    imports: [CommonModule,ButtonModule],
    exports: [Calendar],
    declarations: [Calendar]
})
export class CalendarModule { }