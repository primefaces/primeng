import {Component,OnInit} from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';

@Component({
    templateUrl: 'showcase/demo/datascroller/datascrollerinlinedemo.html',
    styles: [`
        .ui-grid-row > div {
            padding: 4px 10px;
            font-size: 20px;
        }
        
        .ui-grid-row .ui-grid-row > div:last-child {
            font-weight: bold;
        }
    `]
})
export class DataScrollerInlineDemo implements OnInit {

    cars: Car[];
    
    selectedCar: Car;
    
    displayDialog: boolean;

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars = cars);
    }
    
    selectCar(car: Car) {
        this.selectedCar = car;
        this.displayDialog = true;
    }
    
    onDialogHide() {
        this.selectedCar = null;
    }
}