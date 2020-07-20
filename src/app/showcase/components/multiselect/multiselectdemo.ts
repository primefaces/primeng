import {Component} from '@angular/core';
import {SelectItem} from 'primeng/api';
import { CountryService } from '../../service/countryservice';

@Component({
    templateUrl: './multiselectdemo.html',
    styleUrls: ['./multiselectdemo.scss']
})
export class MultiSelectDemo {

    selectedCities: string[] = [];
    
    selectedCountries1: string[] = [];

    selectedCountries2: string[] = [];

    items: SelectItem[];

    item: string;

    cities: any[];

    countries: any[];

    constructor(private countryService: CountryService) {
        
        this.items = [];

        this.countryService.getCountries().then(countries => {
            this.items = countries;
        });

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

        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];
    }
}