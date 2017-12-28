import { Component, OnInit } from '@angular/core';
import { Car } from '../../components/domain/car';
import { CarService } from '../../service/carservice';

@Component({
    templateUrl: './tablestyledemo.html',
    styles: [`
        .old-car {
            background-color: rgb(92, 184, 92);
            color: #ffffff;
        }

         .very-old-car {
            background-color: #20272a;
            color: #ffffff;
        }
    `
    ]
})
export class TableStyleDemo implements OnInit {

    cars: Car[];

    columns: any[];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);

        this.columns = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
    }
}