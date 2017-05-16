import {Component} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';
import {Message} from '../../../components/common/api';

@Component({
    templateUrl: 'showcase/demo/defer/deferdemo.html'
})
export class DeferDemo {

    cars: Car[];
    
    msgs: Message[] = [];
            
    constructor(private carService: CarService) { }
    
    initData() {
        this.msgs = [{severity:'success', summary:'Data Initialized', detail:'Render Completed'}];
        this.carService.getCarsSmall().then(cars => this.cars = cars);
    }
}