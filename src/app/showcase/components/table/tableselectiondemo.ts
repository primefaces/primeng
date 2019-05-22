import { Component, OnInit } from '@angular/core';
import { Car } from '../../components/domain/car';
import { CarService } from '../../service/carservice';
import {MessageService} from '../../../components/common/messageservice';

@Component({
    templateUrl: './tableselectiondemo.html',
    providers: [MessageService]
})
export class TableSelectionDemo implements OnInit {

    cars: Car[];

    cols: any[];

    selectedCar1: Car;

    selectedCar2: Car;

    selectedCar3: Car;

    selectedCar4: Car;

    selectedCars1: Car[];

    selectedCars2: Car[];

    selectedCars3: Car[];

    constructor(private carService: CarService, private messageService: MessageService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
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
}
