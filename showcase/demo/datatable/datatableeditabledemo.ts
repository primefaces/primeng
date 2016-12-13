import {Component,OnInit} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';
import {Column} from "../../../components/common/shared";

@Component({
    templateUrl: 'showcase/demo/datatable/datatableeditabledemo.html'
})
export class DataTableEditableDemo implements OnInit {

    cars: Car[];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);
    }
	
	cellIsEditable(column: Column, rowData: any) {		
		return rowData.color != 'Black' || column.field == 'color';
	}
}