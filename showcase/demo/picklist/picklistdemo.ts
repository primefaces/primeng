import {Component} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';

@Component({
    templateUrl: 'showcase/demo/picklist/picklistdemo.html'
})
export class PickListDemo {

    sourceCars: Car[];
    
    targetCars: Car[];
    
    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.sourceCars = cars);
        this.targetCars = [];
    }
}