import {Component,OnInit} from '@angular/core';
import {Car} from '../../components/domain/car';
import {CarService} from '../../service/carservice';
import {MessageService} from '../../../components/common/messageservice';

@Component({
    templateUrl: './datascrollerinfinitedemo.html',
    providers: [MessageService],
    styles: [`
        .car-item {
            border-bottom: 1px solid #D5D5D5;
        }

        .car-item .ui-md-3 {
            text-align: center;
        }
        
        .car-item .ui-g-10 {
            font-weight: bold;
        }

        @media (max-width: 40em) {
            .car-item {
                text-align: center;
            }
        }
    `]
})
export class DataScrollerInfiniteDemo {

    cars: Car[];

    totalRecords: number;
    
    constructor(private carService: CarService, private messageService: MessageService) {
        this.totalRecords = 50;
     }
    
    loadData(event) {
        //initialize
        if(!this.cars) {
            this.carService.getCarsSmall().then(cars => this.cars = cars);
        }
        //in real application, newArray should be loaded from a remote datasource
        else {
            let newArray = this.cars.slice(0);
            for(let i = 0; i < newArray.length; i++) {
                this.cars.push(newArray[i]);
            }
            
            this.messageService.add({severity:'info', summary:'Data Loaded', detail:'Between ' + event.first + ' and ' + (event.first + event.rows)});
        }
    }
}
