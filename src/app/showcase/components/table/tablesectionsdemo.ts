import { Component, OnInit } from '@angular/core';
import { Car } from '../../components/domain/car';
import { CarService } from '../../service/carservice';

@Component({
    templateUrl: './tablesectionsdemo.html'
})
export class TableSectionsDemo implements OnInit {

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