import {Component,OnInit} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';

@Component({
    templateUrl: 'showcase/demo/inplace/inplacedemo.html'
})
export class InplaceDemo implements OnInit {

    cars: Car[];
        
    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);
    }
}