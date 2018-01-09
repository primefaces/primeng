import { Component, OnInit } from '@angular/core';
import { Car } from '../../components/domain/car';
import { CarService } from '../../service/carservice';
import { Message, MenuItem } from '../../../components/common/api';

@Component({
    templateUrl: './tablecontextmenudemo.html'
})
export class TableContextMenuDemo implements OnInit {

    msgs: Message[];

    cars: Car[];

    cols: any[];

    selectedCar: Car;

    selectCars: Car[];

    items: MenuItem[];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];

        this.items = [
            { label: 'View', icon: 'fa-search', command: (event) => this.viewCar(this.selectedCar) },
            { label: 'Delete', icon: 'fa-close', command: (event) => this.deleteCar(this.selectedCar) }
        ];
    }

    viewCar(car: Car) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Car Selected', detail: car.vin + ' - ' + car.brand });
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

        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Car Deleted', detail: car.vin + ' - ' + car.brand });
    }
}