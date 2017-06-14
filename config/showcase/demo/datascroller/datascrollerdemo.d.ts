import { OnInit } from '@angular/core';
import { Car } from '../domain/car';
import { CarService } from '../service/carservice';
export declare class DataScrollerDemo implements OnInit {
    private carService;
    cars: Car[];
    selectedCar: Car;
    displayDialog: boolean;
    constructor(carService: CarService);
    ngOnInit(): void;
    selectCar(car: Car): void;
    onDialogHide(): void;
}
