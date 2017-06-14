import { Car } from '../domain/car';
import { CarService } from '../service/carservice';
export declare class DragDropDemo {
    private carService;
    availableCars: Car[];
    selectedCars: Car[];
    draggedCar: Car;
    constructor(carService: CarService);
    ngOnInit(): void;
    dragStart(event: any, car: Car): void;
    drop(event: any): void;
    dragEnd(event: any): void;
    findIndex(car: Car): number;
}
