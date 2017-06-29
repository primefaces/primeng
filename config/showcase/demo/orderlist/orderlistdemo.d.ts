import { Car } from '../domain/car';
import { CarService } from '../service/carservice';
export declare class OrderListDemo {
    private carService;
    cars: Car[];
    constructor(carService: CarService);
    ngOnInit(): void;
}
