/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Component, ElementRef, OnInit, OnDestroy, OnChanges, SimpleChange, Input, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: 'p-checkbox',
    template: `
        <div class="pui-chkbox ui-widget">
            <div class="ui-helper-hidden-accessible">
                <input #rb type="checkbox" name="{{name}}" value="{{value}}" [checked]="model == value"/>
            </div>
            <div class="pui-chkbox-box ui-widget ui-corner-all ui-state-default" (click)="onchange(rb)"
                        (mouseover)="hover = true" (mouseout)="hover = false" [ngClass]="{'ui-state-hover':hover,'ui-state-active':rb.checked,'ui-state-disabled':disabled}">
                <span class="pui-chkbox-icon pui-c" [ngClass]="{'fa fa-fw fa-check':rb.checked}"></span>
            </div>
        </div>
    `
})
export class CheckboxComponent {

    @Input() value: any;

    @Input() name: string;

    @Input() disabled: boolean;

    @Input() checked: any = true;

    @Input() model: any;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() modelChange: EventEmitter<any> = new EventEmitter();

    hover: boolean;

    onchange(input) {
        input.checked = !input.checked;
        this.onChange.next(null);
        this.modelChange.next(input.value);
    }
}