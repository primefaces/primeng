import { OnInit } from '@angular/core';
import { Car } from '../domain/car';
import { CarService } from '../service/carservice';
import { LazyLoadEvent } from '../../../components/common/api';
export declare class DataTableLazyDemo implements OnInit {
    private carService;
    datasource: Car[];
    cars: Car[];
    totalRecords: number;
    constructor(carService: CarService);
    ngOnInit(): void;
    loadCarsLazy(event: LazyLoadEvent): void;
}
