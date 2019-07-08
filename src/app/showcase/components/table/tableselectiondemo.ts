import { Component, OnInit } from '@angular/core';
import { Car } from '../../components/domain/car';
import { CarService } from '../../service/carservice';
import {MessageService} from '../../../components/common/messageservice';
import { LazyLoadEvent } from 'components/common/api';

@Component({
    templateUrl: './tableselectiondemo.html',
    providers: [MessageService]
})
export class TableSelectionDemo implements OnInit {

    cars: Car[];

    datasource: Car[];

    cols: any[];

    selectedCar1: Car;

    selectedCar2: Car;

    selectedCar3: Car;

    selectedCar4: Car;

    selectedCars1: Car[];

    selectedCars2: Car[];

    selectedCars3: Car[];

    selectedCars4: Car[];

    loading: boolean;

    totalRecords: number;

    constructor(private carService: CarService, private messageService: MessageService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);

        this.carService.getCarsLarge().then(cars => {
            this.datasource = cars;
            this.totalRecords = this.datasource.length;
        });

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];

        this.loading = true;
    }

    selectCarWithButton(car: Car) {
        this.selectedCar2 = car;
        this.messageService.add({severity:'info', summary:'Car Selected', detail:'Vin: ' + car.vin});
    }

    onRowSelect(event) {
        this.messageService.add({severity:'info', summary:'Car Selected', detail:'Vin: ' + event.data.vin});
    }

    onRowUnselect(event) {
        this.messageService.add({severity:'info', summary:'Car Unselected', detail:'Vin: ' + event.data.vin});
    }

    loadCarsLazy(event: LazyLoadEvent) {
        this.loading = true;

        //in a real application, make a remote request to load data using state metadata from event
        //event.first = First row offset
        //event.rows = Number of rows per page
        //event.sortField = Field name to sort with
        //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
        //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

        //imitate db connection over a network
        setTimeout(() => {
            if (this.datasource) {
                this.cars = this.datasource.slice(event.first, (event.first + event.rows));
                this.loading = false;
            }
        }, 1000);
    }
}
