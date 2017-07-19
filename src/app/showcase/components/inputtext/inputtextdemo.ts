import {Component} from '@angular/core';
import {SelectItem} from '../../../components/common/api';

@Component({
    templateUrl: './inputtextdemo.html'
})
export class InputTextDemo {

    text: string;

    disabled: boolean = true;
    
    cities: SelectItem[];

    selectedCity: any;
    
    constructor() {
        this.cities = [];
        this.cities.push({label:'New York', value:{id:1, name: 'New York', code: 'NY'}});
        this.cities.push({label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}});
        this.cities.push({label:'London', value:{id:3, name: 'London', code: 'LDN'}});
        this.cities.push({label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}});
        this.cities.push({label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}});
    }

    toggleDisabled() {
        this.disabled = !this.disabled;
    }
}