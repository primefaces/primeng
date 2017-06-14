import { OnInit } from '@angular/core';
import { Car } from '../domain/car';
import { CarService } from '../service/carservice';
export declare class DataTableSortDemo implements OnInit {
    private carService;
    cars1: Car[];
    cars2: Car[];
    constructor(carService: CarService);
    ngOnInit(): void;
}
