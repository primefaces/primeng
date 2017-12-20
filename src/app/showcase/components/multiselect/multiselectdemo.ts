import {Component} from '@angular/core';
import {SelectItem} from '../../../components/common/api';

@Component({
    templateUrl: './multiselectdemo.html'
})
export class MultiSelectDemo {

    cars: SelectItem[];

    selectedCars1: string[] = [];
    
    selectedCars2: string[] = [];

    constructor() {
        this.cars = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'},
        ];
    }
}