import {Component} from '@angular/core';

@Component({
    templateUrl: './passworddemo.html',
    styles: [`
        :host ::ng-deep .p-password input {
            width: 15rem
        }
    `]
})
export class PasswordDemo {

    value1: string;
    
    value2: string;

    value3: string;

    value4: string;
}