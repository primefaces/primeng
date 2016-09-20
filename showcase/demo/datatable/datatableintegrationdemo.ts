import {Component, OnInit} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';
import {SelectItem} from "../../../components/common/api";

@Component({
    templateUrl: 'showcase/demo/datatable/datatableintegrationdemo.html'
})
export class DataTableIntegrationDemo implements OnInit {

    cars1: Car[];

    cars2: Car[];

    cols: any[];

    columnOptions: SelectItem[];

    constructor(private carService: CarService) {
    }

    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars1 = cars);
        this.carService.getCarsMedium().then(cars => this.cars2 = cars);

        this.cols = [
            {field: 'vin', header: 'Vin'},
            {field: 'year', header: 'Year'},
            {field: 'brand', header: 'Brand'},
            {field: 'color', header: 'Color'}
        ];

        this.columnOptions = [];
        for(let i = 0; i < this.cols.length; i++) {
            this.columnOptions.push({label: this.cols[i].header, value: this.cols[i]});
        }
    }
}