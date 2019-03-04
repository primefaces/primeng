import { Component, OnInit } from '@angular/core';
import { Car } from '../../components/domain/car';
import { CarService } from '../../service/carservice';
import { SelectItem } from '../../../components/common/api';

@Component({
    templateUrl: './tableeditdemo.html'
})
export class TableEditDemo implements OnInit {

    cars1: Car[];

    cars2: Car[];

    brands: SelectItem[];

    clonedCars: { [s: string]: Car; } = {};

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars1 = cars);
        this.carService.getCarsSmall().then(cars => this.cars2 = cars);

        this.brands = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
    }

    onRowEditInit(car: Car) {
        this.clonedCars[car.vin] = {...car};
    }

    onRowEditSave(car: Car) {
        delete this.clonedCars[car.vin];
    }

    onRowEditCancel(car: Car, index: number) {
        this.cars2[index] = this.clonedCars[car.vin];
        delete this.clonedCars[car.vin];
    }

}