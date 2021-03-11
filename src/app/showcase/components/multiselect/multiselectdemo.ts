import {Component} from '@angular/core';
import {CountryService} from '../../service/countryservice';
import {SelectItemGroup} from 'primeng/api';

interface City {
    name: string,
    code: string
}

interface Country {
    name: string,
    code: string
}

@Component({
    templateUrl: './multiselectdemo.html',
    styleUrls: ['./multiselectdemo.scss']
})
export class MultiSelectDemo {

    selectedCities1: City[];

    selectedCities2: City[];

    selectedCities3: any[];

    selectedCities4: any[];
    
    selectedCountries1: Country[];

    selectedCountries2: Country[];

    cities: City[];

    groupedCities: SelectItemGroup[];

    countries: City[];

    virtualCountries: Country[];

    constructor(private countryService: CountryService) {
        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
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

        this.countryService.getCountries().then(countries => {
            this.virtualCountries = countries;
        });
    }
}