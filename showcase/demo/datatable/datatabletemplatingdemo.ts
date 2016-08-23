import {Component,OnInit} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';
import {Message} from '../../../components/common/api';

@Component({
    templateUrl: 'showcase/demo/datatable/datatabletemplatingdemo.html',
})
export class DataTableTemplatingDemo implements OnInit {

    cars: Car[];
    
    msgs: Message[] = [];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);
    }
    
    selectCar(car: Car) {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Car Select', detail:'Vin: ' + car.vin});
    }
}