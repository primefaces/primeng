import {Component} from '@angular/core';

@Component({
    templateUrl: 'showcase/demo/inputtext/inputtextdemo.html'
})
export class InputTextDemo {

    text: string;

    disabled: boolean = true;

    toggleDisabled() {
        this.disabled = !this.disabled;
    }
}