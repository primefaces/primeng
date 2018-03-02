import {Component,OnInit} from '@angular/core';
import {Car} from '../../components/domain/car';
import {CarService} from '../../service/carservice';
import {SelectItem} from '../../../components/common/api';

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

    sortOptions: SelectItem[];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsLarge().then(cars => this.cars = cars);

        this.sortOptions = [
            {label: 'Newest First', value: '!year'},
            {label: 'Oldest First', value: 'year'},
            {label: 'Brand', value: 'brand'}
        ];
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