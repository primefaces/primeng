import { OnInit } from '@angular/core';
import { Car } from '../domain/car';
import { CarService } from '../service/carservice';
import { SelectItem } from '../../../components/common/api';
export declare class DataTableEditableDemo implements OnInit {
    private carService;
    cars: Car[];
    brands: SelectItem[];
    constructor(carService: CarService);
    ngOnInit(): void;
}
