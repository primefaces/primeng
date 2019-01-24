import { Component, OnInit } from '@angular/core';
import { Car } from '../../components/domain/car';
import { CarService } from '../../service/carservice';

@Component({
    templateUrl: './tablestickydemo.html',
    styles: [`
        :host ::ng-deep .ui-table .ui-table-thead > tr > th {
            position: -webkit-sticky;
            position: sticky;
            top: 70px;
        }

        @media screen and (max-width: 64em) {
            :host ::ng-deep .ui-table .ui-table-thead > tr > th {
                top: 100px;
            }
        }
`]
})
export class TableStickyDemo implements OnInit {

    cars: Car[];

    cols: any[];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars = cars);

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
    }
}