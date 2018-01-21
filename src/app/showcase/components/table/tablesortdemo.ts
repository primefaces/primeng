import { Component, OnInit } from '@angular/core';
import { Car } from '../../components/domain/car';
import { CarService } from '../../service/carservice';

@Component({
    templateUrl: './tablesortdemo.html'
})
export class TableSortDemo implements OnInit {

    cars1: Car[];

    cars2: Car[];

    cols: any[];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars1 = cars);
        this.carService.getCarsSmall().then(cars => this.cars2 = cars);

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color', compareFunction: compareColors }
        ];
    }

}

function compareColors(color1, color2) {
    const colorOrder = [ 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'White', 'Gray', 'Black' ];
    return colorOrder.indexOf(color1) - colorOrder.indexOf(color2);
}
