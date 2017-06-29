import { OnInit } from '@angular/core';
import { Car } from '../domain/car';
import { CarService } from '../service/carservice';
export declare class DataTableDemo implements OnInit {
    private carService;
    cars: Car[];
    cols: any[];
    constructor(carService: CarService);
    ngOnInit(): void;
}
