import {Component, OnInit} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';
import {SelectItem} from "../../../components/common/api";

@Component({
    templateUrl: 'showcase/demo/datatable/datatableintegrationdemo.html'
})
export class DataTableIntegrationDemo implements OnInit {

    cars1: Car[];

    cols1: any[];

    columnOptions1: SelectItem[];

    cars2: Car[];

    cols2: any[];

    cars3: Car[];

    columnOptions2: SelectItem[];

    constructor(private carService: CarService) {
    }

    ngOnInit(): void {
        this.carService.getCarsMedium().then(cars => this.cars1 = cars);
        this.cols1 = [
            {field: 'vin', header: 'Vin'},
            {field: 'year', header: 'Year'},
            {field: 'brand', header: 'Brand'},
            {field: 'color', header: 'Color'}
        ];
        this.columnOptions1 = [];
        this.initTable(this.cars1, this.cols1, this.columnOptions1);

        this.carService.getCarsMedium().then(cars => this.cars2 = cars);
        this.cols2 = [
            {field: 'vin', header: 'Vin'},
            {field: 'year', header: 'Year'},
            {field: 'brand', header: 'Brand'},
            {field: 'color', header: 'Color'}
        ];
        this.columnOptions2 = [];
        this.initTable(this.cars2, this.cols2, this.columnOptions2);

        this.carService.getCarsSmall().then(cars => this.cars3 = cars);
    }

    private initTable(cars: Car[], cols: any[], columnOptions: SelectItem[]): void {
        for(let i = 0; i < cols.length; i++) {
            columnOptions.push({label: cols[i].header, value: cols[i]});
        }
    }
}
