import { OnInit } from '@angular/core';
import { Car } from '../domain/car';
import { CarService } from '../service/carservice';
import { Message } from '../../../components/common/api';
export declare class DataTableTemplatingDemo implements OnInit {
    private carService;
    cars: Car[];
    msgs: Message[];
    constructor(carService: CarService);
    ngOnInit(): void;
    selectCar(car: Car): void;
}
