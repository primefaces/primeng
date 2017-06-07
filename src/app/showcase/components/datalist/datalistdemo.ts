import {Component,OnInit} from '@angular/core';
import {Car} from '../../components/domain/car';
import {CarService} from '../../service/carservice';

@Component({
    templateUrl: './datalistdemo.html',
    styles: [`
        .ui-grid-row > div {
            padding: 4px 10px;
            font-size: 16px;
        }
        
        .ui-grid-row .ui-grid-row > div:last-child {
            font-weight: bold;
        }
    `]
})
export class DataListDemo implements OnInit {

    cars: Car[];
    
    selectedCar: Car;
    
    displayDialog: boolean;

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsLarge().then(cars => this.cars = cars);
    }
    
    selectCar(car: Car) {
        this.selectedCar = car;
        this.displayDialog = true;
    }
    
    onDialogHide() {
        this.selectedCar = null;
    }
}