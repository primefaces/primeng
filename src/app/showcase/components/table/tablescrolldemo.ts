import { Component, OnInit } from '@angular/core';
import { Car } from '../../components/domain/car';
import { CarService } from '../../service/carservice';

@Component({
    templateUrl: './tablescrolldemo.html'
})
export class TableScrollDemo implements OnInit {

    cars1: Car[];

    cars2: Car[];

    cars3: Car[];
    
    cars4: Car[];

    cols: any[];

    frozenCars: Car[];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars1 = cars);
        this.carService.getCarsSmall().then(cars => this.cars2 = cars);
        this.carService.getCarsMedium().then(cars => this.cars3 = cars);
        this.carService.getCarsMedium().then(cars => this.cars4 = cars);

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];

        this.frozenCars = [
            { "brand": "BMW", "year": 2013, "color": "Grey", "vin": "fh2uf23" },
            { "brand": "Chevrolet", "year": 2011, "color": "Black", "vin": "4525g23" }
        ];
    }
}