/// <reference path="../../../typedefinition/primeui.d.ts" />

import {Component, ElementRef, OnInit, OnDestroy, OnChanges, SimpleChange, Input, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: 'p-checkbox',
    template: `
        <div class="pui-chkbox ui-widget">
            <div class="ui-helper-hidden-accessible">
                <input #cb type="checkbox" name="{{name}}" value="{{value}}" [checked]="isChecked(cb.value)"/>
            </div>
            <div class="pui-chkbox-box ui-widget ui-corner-all ui-state-default" (click)="onClick(cb)"
                        (mouseover)="hover = true" (mouseout)="hover = false" [ngClass]="{'ui-state-hover':hover,'ui-state-active':cb.checked,'ui-state-disabled':disabled}">
                <span class="pui-chkbox-icon pui-c" [ngClass]="{'fa fa-fw fa-check':cb.checked}"></span>
            </div>
        </div>
    `
})
export class CheckboxComponent {

    @Input() value: any;

    @Input() name: string;

    @Input() disabled: boolean;

    @Input() model: any;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() modelChange: EventEmitter<any> = new EventEmitter();

    hover: boolean;

    onClick(input) {
        input.checked = !input.checked;
        this.onChange.next(input.checked);

        if (input.checked)
            this.addValue(input.value);
        else
            this.removeValue(input.value);

        this.modelChange.next(this.model);
    }

    isChecked(value) {
        return this.findValueIndex(value) !== -1;
    }

    removeValue(value) {
        var index = this.findValueIndex(value);
        if(index >= 0) {
            this.model.splice(index, 1);
        }
    }

    addValue(value) {
        this.model.push(value);
    }

    findValueIndex(value) {
        var index: number = -1;
        if(this.model) {
            for (var i = 0; i < this.model.length; i++) {
                if(this.model[i] == value) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }
}