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

    selectedCity3: string;

    selectedCountry: string;

    countries: any[];

    groupedCities: SelectItemGroup[];

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

        this.groupedCities = [
            {
                label: 'Germany', value: 'de', 
                items: [
                    {label: 'Berlin', value: 'Berlin'},
                    {label: 'Frankfurt', value: 'Frankfurt'},
                    {label: 'Hamburg', value: 'Hamburg'},
                    {label: 'Munich', value: 'Munich'}
                ]
            },
            {
                label: 'USA', value: 'us', 
                items: [
                    {label: 'Chicago', value: 'Chicago'},
                    {label: 'Los Angeles', value: 'Los Angeles'},
                    {label: 'New York', value: 'New York'},
                    {label: 'San Francisco', value: 'San Francisco'}
                ]
            },
            {
                label: 'Japan', value: 'jp', 
                items: [
                    {label: 'Kyoto', value: 'Kyoto'},
                    {label: 'Osaka', value: 'Osaka'},
                    {label: 'Tokyo', value: 'Tokyo'},
                    {label: 'Yokohama', value: 'Yokohama'}
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
