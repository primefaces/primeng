import {Component,Input,Output,EventEmitter} from 'angular2/core';

@Component({
    selector: 'p-toggleButton',
    template: `
        <div [ngClass]="{'ui-button ui-togglebutton ui-widget ui-state-default ui-corner-all': true, 'ui-button-text-only': (!onIcon&&!offIcon), 'ui-button-text-icon-left': (onIcon&&offIcon),
                'ui-state-active': checked, 'ui-state-hover': hover&&!disabled, 'ui-state-disabled': disabled}" [attr.style]="style" [attr.class]="styleClass" 
                (click)="toggle($event)" (mouseenter)="hover=true" (mouseleave)="hover=false">
            <input type="checkbox" class="ui-helper-hidden-accessible">
            <span *ngIf="onIcon||offIcon" [attr.class]="getIconClass()"></span>
            <span class="ui-button-text ui-unselectable-text">{{checked ? onLabel : offLabel}}</span>
        </div>
    `
})
export class ToggleButton {

    @Input() onLabel: string = 'Yes';

    @Input() offLabel: string = 'No';

    @Input() onIcon: string;

    @Input() offIcon: string;

    @Input() checked: boolean;

    @Input() disabled: boolean;

    @Input() style: string;

    @Input() styleClass: string;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() checkedChange: EventEmitter<any> = new EventEmitter();
    
    private hover: boolean;

    getIconClass() {
        let baseClass = 'ui-button-icon-left fa fa-fw';
        return baseClass + ' ' + (this.checked ? this.onIcon : this.offIcon);
    }
    
    toggle(event) {
        if(!this.disabled) {
            this.checkedChange.next(!this.checked);
            this.onChange.next({
                originalEvent: event,
                checked: !this.checked
            })
        }
    }
}