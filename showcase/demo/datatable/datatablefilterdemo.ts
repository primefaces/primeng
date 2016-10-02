import {Component,OnInit} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';

@Component({
    templateUrl: './datatablefilterdemo.html'
})
export class DataTableFilterDemo implements OnInit {

    cars: Car[];

    constructor(private carService: CarService) {}

    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars = cars);
    }
}