import {Component,OnInit} from '@angular/core';
import {Car} from '../../components/domain/car';
import {CarService} from '../../service/carservice';
import {SelectItem} from 'primeng/api';

@Component({
    templateUrl: './dataviewdemo.html',
    styles: [`      
        .filter-container {
            text-align: center;
        }

        .car-details {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2em;
            border-bottom: 1px solid #d9dad9;
        }

        .car-details > div {
            display: flex;
            align-items: center;
        }

        .car-details > div img {
            margin-right: 14px;
        }

        .car-detail {
            padding: 0 1em 1em 1em;
            border-bottom: 1px solid #d9dad9;
            margin: 1em;
        }

        .ui-panel-content {
            padding: 1em;
        }

        .dark-theme :host ::ng-deep .car-details,
        .dark-theme :host ::ng-deep .car-detail {
            border-bottom: 1px solid #191919;
        }
        
        @media (max-width: 1024px) {
            .car-details img {
                 width: 75px;
            }

            .filter-container {
                text-align: left;
            }
        }
    `]
})
export class DataViewDemo implements OnInit {

    cars: Car[];
    
    selectedCar: Car;
    
    displayDialog: boolean;

    sortOptions: SelectItem[];

    sortKey: string;

    sortField: string;

    sortOrder: number;

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

    onSortChange(event) {
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        }
        else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }
    
    onDialogHide() {
        this.selectedCar = null;
    }
}