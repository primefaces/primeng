import {Component,ElementRef,AfterViewInit,OnDestroy,OnChanges,Input,Output,SimpleChange,EventEmitter} from 'angular2/core';
import {Button} from '../button/button';

@Component({
    selector: 'p-calendar',
    template:  `
        <span [attr.style]="style" [attr.class]="styleClass" [ngClass]="'ui-calendar'" *ngIf="!inline">
        <input #in type="text" [attr.placeholder]="placeholder" [attr.style]="inputStyle" [attr.class]="inputStyleClass"
                [value]="value||''" (input)="valueChange.emit($event.target.value)" [readonly]="readonlyInput"
                [disabled]="disabled" (mouseenter)="hovered=true" (mouseleave)="hovered=false" (focus)="focused=true" (blur)="focused=false"
                [ngClass]="{'ui-inputfield ui-inputtext ui-widget ui-state-default': true, 'ui-corner-all': !showIcon, 'ui-corner-left': showIcon,
                    'ui-state-hover':hovered,'ui-state-focus':focused,'ui-state-disabled':disabled}"
        ><button type="button" icon="fa-calendar" pButton *ngIf="showIcon" (click)="onButtonClick($event,in)" class="ui-datepicker-trigger"></button></span>
        <div *ngIf="inline"></div>
    `,
    directives: [Button]
})
export class Calendar implements AfterViewInit,OnChanges,OnDestroy {

    @Input() value: string;

    @Output() valueChange: EventEmitter<any> = new EventEmitter();

    @Input() readonlyInput: boolean;

    @Input() style: string;

    @Input() styleClass: string;
    
    @Input() inputStyle: string;

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

    @Output() onSelect: EventEmitter<any> = new EventEmitter();

    hovered: boolean;

    focused: boolean;

    initialized: boolean;

    stopNgOnChangesPropagation: boolean;
    
    calendarElement: any;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngAfterViewInit() {
        this.calendarElement = this.inline ? jQuery(this.el.nativeElement.children[0]) : jQuery(this.el.nativeElement.children[0].children[0]);
        this.calendarElement.datepicker({
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
            onSelect: (dateText: string) => {
                this.stopNgOnChangesPropagation = true;
                this.onSelect.emit(dateText);
                this.valueChange.emit(dateText);
            }
        });
        this.initialized = true;
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (this.initialized) {
            for (var key in changes) {
                if(key == 'value' && this.stopNgOnChangesPropagation) {
                    continue;
                }

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