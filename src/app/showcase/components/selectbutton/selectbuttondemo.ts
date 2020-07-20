import {Component} from '@angular/core';
import {SelectItem} from 'primeng/api';

@Component({
    templateUrl: './selectbuttondemo.html'
})
export class SelectButtonDemo {

    types: SelectItem[];

    selectedType: string;

    selectedTypes: string[] = ['Apartment','Studio'];

    selectedModes: string[];

    countries: any[];

    selectedCountry: any;

    constructor() {
        this.types = [
            {label: 'Apartment', value: 'Apartment'},
            {label: 'House', value: 'House'},
            {label: 'Studio', value: 'Studio'}
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