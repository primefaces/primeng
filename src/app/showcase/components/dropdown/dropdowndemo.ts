import {Component} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {SelectItemGroup} from 'primeng/api';

interface City {
    name: string,
    code: string
}

@Component({
    templateUrl: './dropdowndemo.html',
    styleUrls: ['./dropdowndemo.scss']
})
export class DropdownDemo {

    cities: City[];

    selectedCity1: City;

    selectedCity2: City;

    selectedCountry: string;

    countries: any[];
    
    selectedCar3: string;

    groupedCars: SelectItemGroup[];

    items: SelectItem[];

    item: string;

    constructor() {
        this.items = [];
        for (let i = 0; i < 10000; i++) {
            this.items.push({label: 'Item ' + i, value: 'Item ' + i});
        }

        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];

        this.groupedCars = [
            {
                label: 'Germany', value: 'germany.png', 
                items: [
                    {label: 'Audi', value: 'Audi'},
                    {label: 'BMW', value: 'BMW'},
                    {label: 'Mercedes', value: 'Mercedes'},
                    {label: 'Murcia', value: 'Murcia'}
                ]
            },
            {
                label: 'USA', value: 'usa.png', 
                items: [
                    {label: 'Cadillac', value: 'Cadillac'},
                    {label: 'Ford', value: 'Ford'},
                    {label: 'GMC', value: 'GMC'}
                ]
            },
            {
                label: 'Japan', value: 'japan.png', 
                items: [
                    {label: 'Honda', value: 'Honda'},
                    {label: 'Mazda', value: 'Mazda'},
                    {label: 'Toyota', value: 'Toyota'}
                ]
            }
        ];

        this.countries = [
            {name: 'Australia', code: 'AU'},
            {name: 'Brazil', code: 'BR'},
            {name: 'China', code: 'CN'},
            {name: 'Egypt', code: 'EG'},
            {name: 'France', code: 'FR'},
            {name: 'Germany', code: 'DE'},
            {name: 'India', code: 'IN'},
            {name: 'Japan', code: 'JP'},
            {name: 'Spain', code: 'ES'},
            {name: 'United States', code: 'US'}
        ];
    }
}
