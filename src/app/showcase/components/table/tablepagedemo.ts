import { Component, OnInit } from '@angular/core';
import { Car } from '../../components/domain/car';
import { CarService } from '../../service/carservice';

@Component({
    templateUrl: './tablepagedemo.html',
    styles: [`
        :host ::ng-deep .ui-paginator-current {
            float: left;
        }
    `]
})
export class TablePageDemo implements OnInit {

    cars: Car[] = [];

    cols: any[];

    first = 0;

    rows = 10;

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

    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    isLastPage(): boolean {
        return this.first === (this.cars.length - this.rows);
    }

    isFirstPage(): boolean {
        return this.first === 0;
    }
}