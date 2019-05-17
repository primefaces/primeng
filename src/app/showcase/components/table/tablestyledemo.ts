import { Component, OnInit } from '@angular/core';
import { Car } from '../../components/domain/car';
import { CarService } from '../../service/carservice';

@Component({
    templateUrl: './tablestyledemo.html',
    styles: [`
        .new-car {
            background-color: #1CA979 !important;
            color: #ffffff !important;
        }

        .old-car {
            background-color: #2CA8B1 !important;
            color: #ffffff !important;
        }
    `
    ]
})
export class TableStyleDemo implements OnInit {

    cars: Car[];

    cols: any[];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
    }
}