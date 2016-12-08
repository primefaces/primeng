import {Component,OnInit} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';
import {SelectItem} from '../../../components/common/api';

@Component({
    templateUrl: 'showcase/demo/datatable/datatablerowgroupdemo.html'
})
export class DataTableRowGroupDemo implements OnInit {

    cars: Car[];
        
    constructor(private carService: CarService) {}

    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars = cars);
    }
}