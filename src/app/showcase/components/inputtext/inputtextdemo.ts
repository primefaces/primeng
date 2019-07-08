import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
    templateUrl: './inputtextdemo.html',
    styles:[
        'input.ui-state-filled {background-color:green;}',
        'input:not(.ui-state-filled) {background-color:red;}'
      ],
      changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTextDemo {

    text: string;
    counter: number;

    disabled: boolean = true;

    toggleDisabled() {
        this.disabled = !this.disabled;
    }

    fill(){
        this.counter = 5;
    }
}