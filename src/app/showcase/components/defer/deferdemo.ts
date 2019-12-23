import {Component} from '@angular/core';
import {Car} from '../../components/domain/car';
import {CarService} from '../../service/carservice';
import {MessageService} from 'primeng/api';
import { AppComponent } from '../../app.component';

@Component({
    templateUrl: './deferdemo.html',
    providers: [MessageService]
})
export class DeferDemo {

    cars: Car[];
    
    constructor(private carService: CarService, private messageService: MessageService, private app: AppComponent) { }
    
    initData() {
        this.messageService.add({severity:'success', summary:'Data Initialized', detail:'Render Completed'});
        this.carService.getCarsSmall().then(cars => this.cars = cars);
    }

    getTop() {
        return this.app.newsActive ? '150px' : '80px';
    }
}
