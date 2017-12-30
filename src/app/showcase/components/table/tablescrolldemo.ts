import { Component, OnInit } from '@angular/core';
import { Car } from '../../components/domain/car';
import { CarService } from '../../service/carservice';

@Component({
    templateUrl: './tablescrolldemo.html'
})
export class TableScrollDemo implements OnInit {

    cars1: Car[];

    columns: any[];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars1 = cars);

        this.columns = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
    }
}