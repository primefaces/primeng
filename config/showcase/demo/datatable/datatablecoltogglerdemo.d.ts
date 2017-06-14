import { OnInit } from '@angular/core';
import { Car } from '../domain/car';
import { CarService } from '../service/carservice';
import { SelectItem } from '../../../components/common/api';
export declare class DataTableColTogglerDemo implements OnInit {
    private carService;
    cars: Car[];
    cols: any[];
    columnOptions: SelectItem[];
    constructor(carService: CarService);
    ngOnInit(): void;
}
