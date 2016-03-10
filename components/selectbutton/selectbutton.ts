import {Component,Input,Output,EventEmitter} from 'angular2/core';
import {SelectItem} from '../api/selectitem';

@Component({
    selector: 'p-selectButton',
    template: `
        <div class="ui-selectbutton ui-buttonset ui-widget ui-corner-all" (mouseleave)="hoveredItem=null">
            <div *ngFor="#option of options;" class="ui-button ui-widget ui-state-default ui-button-text-only"
                [ngClass]="{'ui-state-hover': hoveredItem == option,'ui-state-active':isSelected(option)}"
                (mouseenter)="hoveredItem=option" (click)="onItemClick($event,option)">
                <span class="ui-button-text ui-c">{{option.label}}</span>
            </div>
        </div>
    `
})
export class SelectButton {

    @Input() options: SelectItem[];

    @Input() tabindex: number;

    @Input() multiple: boolean;

    @Input() value: any;

    @Output() valueChange: EventEmitter<any> = new EventEmitter();

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    private hoveredItem: any;
    
    onItemClick(event, option: SelectItem) {
        if(this.multiple) {
            let itemIndex = this.findItemIndex(option);
            let values = this.value ? this.value.slice() : [];
            if(itemIndex != -1)
                values.splice(itemIndex, 1);
            else
                values.push(option.value);

            this.valueChange.next(values);
        }
        else {
            this.valueChange.next(option.value);
        }
        
        this.onChange.next({
            originalEvent: event,
            value: this.value
        });
    }
    
    isSelected(option: SelectItem) {
        if(this.multiple)
            return this.findItemIndex(option) != -1;
        else
            return option.value == this.value;
    }
    
    findItemIndex(option: SelectItem) {
        let index = -1;
        if(this.value) {
            for(let i = 0; i < this.value.length; i++) {
                if(this.value[i] == option.value) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
}