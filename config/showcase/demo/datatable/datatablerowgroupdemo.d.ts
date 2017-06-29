import { OnInit } from '@angular/core';
import { Car } from '../domain/car';
import { CarService } from '../service/carservice';
export declare class DataTableRowGroupDemo implements OnInit {
    private carService;
    cars1: Car[];
    cars2: Car[];
    cars3: Car[];
    constructor(carService: CarService);
    ngOnInit(): void;
    calculateGroupTotal(brand: string): number;
}
