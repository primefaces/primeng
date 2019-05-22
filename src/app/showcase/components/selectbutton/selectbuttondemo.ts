import {Component} from '@angular/core';
import {SelectItem} from '../../../components/common/api';

@Component({
    templateUrl: './selectbuttondemo.html'
})
export class SelectButtonDemo {

    types: SelectItem[];

    selectedType: string;

    selectedTypes: string[] = ['PayPal','MasterCard'];

    selectedModes: string[];

    modes: SelectItem[];

    countries: any[];

    selectedCountry: any;

    constructor() {
        this.types = [
            {label: 'Paypal', value: 'PayPal', icon: 'fa fa-fw fa-cc-paypal'},
            {label: 'Visa', value: 'Visa', icon: 'fa fa-fw fa-cc-visa'},
            {label: 'MasterCard', value: 'MasterCard', icon: 'fa fa-fw fa-cc-mastercard'}
        ];

        this.modes = [
            {value: 'Bold', title: 'Bold', icon: 'fa fa-fw fa-bold'},
            {value: 'Italic', title: 'Italic', icon: 'fa fa-fw fa-italic'},
            {value: 'Underline', title: 'Underline', icon: 'fa fa-fw fa-underline'}
        ];

        this.countries = [
            {name: 'USA', flag: 'usa.png'},
            {name: 'Germany', flag: 'germany.png'},
            {name: 'Japan', flag: 'japan.png'}
        ];
    }

    clear() {
        this.selectedType = null;
        this.selectedTypes = [];
        this.selectedModes = [];
        this.selectedCountry = null;
    }
}