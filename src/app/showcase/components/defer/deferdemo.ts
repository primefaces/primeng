import {Component} from '@angular/core';
import {Car} from '../../components/domain/car';
import {CarService} from '../../service/carservice';
import {MessageService} from '../../../components/common/messageservice';

@Component({
    templateUrl: './deferdemo.html',
    providers: [MessageService]
})
export class DeferDemo {

    cars: Car[];
    
    constructor(private carService: CarService, private messageService: MessageService) { }
    
    initData() {
        this.messageService.add({severity:'success', summary:'Data Initialized', detail:'Render Completed'});
        this.carService.getCarsSmall().then(cars => this.cars = cars);
    }
}
