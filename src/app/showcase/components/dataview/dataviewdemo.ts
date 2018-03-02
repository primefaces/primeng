import {Component,OnInit} from '@angular/core';
import {Car} from '../../components/domain/car';
import {CarService} from '../../service/carservice';

@Component({
    templateUrl: './dataviewdemo.html',
    styles: [`      
        .search-icon { 
            margin-top: 3em;
        }  

        @media (max-width: 40em) {
            .car-details, .search-icon {
                text-align: center;
                margin-top: 0;
            }
        }
    `]
})
export class DataViewDemo implements OnInit {

    cars: Car[];
    
    selectedCar: Car;
    
    displayDialog: boolean;

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsLarge().then(cars => this.cars = cars);
    }
    
    selectCar(event: Event, car: Car) {
        this.selectedCar = car;
        this.displayDialog = true;
        event.preventDefault();
    }
    
    onDialogHide() {
        this.selectedCar = null;
    }
}