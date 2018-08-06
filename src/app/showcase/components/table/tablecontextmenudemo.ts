import { Component, OnInit } from '@angular/core';
import { Car } from '../../components/domain/car';
import { CarService } from '../../service/carservice';
import { MenuItem } from '../../../components/common/api';
import {MessageService} from '../../../components/common/messageservice';

@Component({
    templateUrl: './tablecontextmenudemo.html',
    providers: [MessageService]
})
export class TableContextMenuDemo implements OnInit {

    cars: Car[];

    cols: any[];

    selectedCar: Car;

    selectCars: Car[];

    items: MenuItem[];

    constructor(private carService: CarService, private messageService: MessageService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];

        this.items = [
            { label: 'View', icon: 'pi pi-search', command: (event) => this.viewCar(this.selectedCar) },
            { label: 'Delete', icon: 'pi pi-times', command: (event) => this.deleteCar(this.selectedCar) }
        ];
    }

    viewCar(car: Car) {
        this.messageService.add({ severity: 'info', summary: 'Car Selected', detail: car.vin + ' - ' + car.brand });
    }

    deleteCar(car: Car) {
        let index = -1;
        for (let i = 0; i < this.cars.length; i++) {
            if (this.cars[i].vin == car.vin) {
                index = i;
                break;
            }
        }
        this.cars.splice(index, 1);
        
        this.messageService.add({ severity: 'info', summary: 'Car Deleted', detail: car.vin + ' - ' + car.brand });
    }
}
