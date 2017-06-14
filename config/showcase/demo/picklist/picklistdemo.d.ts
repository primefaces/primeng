import { Car } from '../domain/car';
import { CarService } from '../service/carservice';
export declare class PickListDemo {
    private carService;
    sourceCars: Car[];
    targetCars: Car[];
    constructor(carService: CarService);
    ngOnInit(): void;
}
