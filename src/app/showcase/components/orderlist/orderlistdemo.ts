import {Component} from '@angular/core';
import {Car} from '../../components/domain/car';
import {CarService} from '../../service/carservice';

@Component({
    templateUrl: './orderlistdemo.html'
})
export class OrderListDemo {

    cars: Car[];
    
    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);
    }
}