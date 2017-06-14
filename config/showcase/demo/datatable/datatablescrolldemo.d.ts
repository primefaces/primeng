import { OnInit } from '@angular/core';
import { Car } from '../domain/car';
import { CarService } from '../service/carservice';
import { LazyLoadEvent } from '../../../components/common/api';
export declare class DataTableScrollDemo implements OnInit {
    private carService;
    cars: Car[];
    carsLarge: Car[];
    totalRecords: number;
    constructor(carService: CarService);
    ngOnInit(): void;
    loadCarsLazy(event: LazyLoadEvent): void;
}
