import { OverlayPanel } from '../../../components/overlaypanel/overlaypanel';
import { Car } from '../domain/car';
import { CarService } from '../service/carservice';
export declare class OverlayPanelDemo {
    private carService;
    cars1: Car[];
    cars2: Car[];
    selectedCar: Car;
    constructor(carService: CarService);
    ngOnInit(): void;
    selectCar(event: any, car: Car, overlaypanel: OverlayPanel): void;
}
