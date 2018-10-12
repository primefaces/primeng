import { Component, OnInit } from '@angular/core';
import { Car } from '../../components/domain/car';
import { CarService } from '../../service/carservice';

@Component({
    templateUrl: './tablecoltoggledemo.html'
})
export class TableColToggleDemo implements OnInit {

    cars: Car[];

    cols: any[];

    selectedColumns: any[];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);

        this.cols = [
            { field: "vin", header: "Vin", index: 0 },
            { field: "year", header: "Year", index: 1 },
            { field: "brand", header: "Brand", index: 2 },
            { field: "color", header: "Color", index: 3 }
        ];

        this.selectedColumns = this.cols;
    }
}
