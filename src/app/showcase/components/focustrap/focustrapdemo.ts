import {Component} from '@angular/core';

@Component({
    templateUrl: './focustrapdemo.html'
})
export class FocusTrapDemo {

    selectedCity: string;

    cities = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
    ];
    
}