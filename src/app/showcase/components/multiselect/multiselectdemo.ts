import {Component} from '@angular/core';
import {SelectItem} from '../../../components/common/api';

@Component({
    templateUrl: './multiselectdemo.html'
})
export class MultiSelectDemo {

    cars: SelectItem[];

    selectedCars: string[] = [];

    cities: SelectItem[];

    selectedCity = [];

    constructor() {
        this.cars = [];
        this.cars.push({label: 'Audi', value: 'Audi'});
        this.cars.push({label: 'BMW', value: 'BMW'});
        this.cars.push({label: 'Fiat', value: 'Fiat'});
        this.cars.push({label: 'Ford', value: 'Ford'});
        this.cars.push({label: 'Honda', value: 'Honda'});
        this.cars.push({label: 'Jaguar', value: 'Jaguar'});
        this.cars.push({label: 'Mercedes', value: 'Mercedes'});
        this.cars.push({label: 'Renault', value: 'Renault'});
        this.cars.push({label: 'VW', value: 'VW'});
        this.cars.push({label: 'Volvo', value: 'Volvo'});

        this.cities = [];
        this.cities.push({label:'New York', value:{id:1, name: 'New York', code: 'NY', country: 'United States', timezone: 'UTC-5'}});
        this.cities.push({label:'Rome', value:{id:2, name: 'Rome', code: 'RM', country: 'Italia', timezone: 'UTC+1'}});
        this.cities.push({label:'London', value:{id:3, name: 'London', code: 'LDN', country: 'England', timezone: 'UTC'}});
        this.cities.push({label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST', country: 'Turkey', timezone: 'UTC+3'}});
        this.cities.push({label:'Paris', value:{id:5, name: 'Paris', code: 'PRS',  country: 'France', timezone: 'UTC+1'}});

    }
}