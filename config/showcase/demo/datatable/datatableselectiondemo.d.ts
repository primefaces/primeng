import { OnInit } from '@angular/core';
import { Car } from '../domain/car';
import { CarService } from '../service/carservice';
import { Message } from '../../../components/common/api';
export declare class DataTableSelectionDemo implements OnInit {
    private carService;
    msgs: Message[];
    cars: Car[];
    selectedCar1: Car;
    selectedCar2: Car;
    selectedCar3: Car;
    selectedCars1: Car[];
    selectedCars2: Car[];
    constructor(carService: CarService);
    ngOnInit(): void;
    onRowSelect(event: any): void;
    onRowUnselect(event: any): void;
}
