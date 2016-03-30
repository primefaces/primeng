import {Component, ElementRef, OnInit, OnDestroy, OnChanges, SimpleChange, Input, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: 'p-radio',
    template: `
        <div class="ui-radiobutton ui-widget">
            <div class="ui-helper-hidden-accessible">
                <input type="radio" [attr.name]="name" [attr.value]="value" [checked]="isChecked()"/>
            </div>
            <div class="ui-radiobutton-box ui-widget ui-radiobutton-relative ui-state-default" (click)="onclick()"
                        (mouseover)="hover=true" (mouseout)="hover=false" [ngClass]="{'ui-state-hover':hover,'ui-state-active':isChecked(),'ui-state-disabled':disabled}">
                <span class="ui-radiobutton-icon" [ngClass]="{'fa fa-fw fa-circle':isChecked()}"></span>
            </div>
        </div>
    `
})
export class RadioButton {

    @Input() value: any;

    @Input() name: string;

    @Input() disabled: boolean;

    @Input() model: any;

    @Output() click: EventEmitter<any> = new EventEmitter();

    @Output() modelChange: EventEmitter<any> = new EventEmitter();

    hover: boolean;

    onclick() {
        this.click.emit(null);
        this.modelChange.emit(this.value);
    }
    
    isChecked() {
        return this.value == this.model;
    }
}