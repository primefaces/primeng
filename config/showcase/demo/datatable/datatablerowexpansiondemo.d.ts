import { OnInit } from '@angular/core';
import { Car } from '../domain/car';
import { CarService } from '../service/carservice';
export declare class DataTableRowExpansionDemo implements OnInit {
    private carService;
    cars: Car[];
    cols: any[];
    selectedCar: Car;
    dialogVisible: boolean;
    constructor(carService: CarService);
    ngOnInit(): void;
    showCar(car: Car): void;
}
