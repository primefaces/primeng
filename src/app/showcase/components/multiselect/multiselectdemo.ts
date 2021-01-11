import {Component} from '@angular/core';
import {CountryService} from '../../service/countryservice';

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
    
    selectedCountries1: Country[];

    selectedCountries2: Country[];

    cities: City[];

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

        this.countryService.getCountries().then(countries => {
            this.virtualCountries = countries;
        });
    }
}