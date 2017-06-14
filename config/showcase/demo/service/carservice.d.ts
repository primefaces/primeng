import { Http } from '@angular/http';
import { Car } from '../domain/car';
export declare class CarService {
    private http;
    constructor(http: Http);
    getCarsSmall(): Promise<Car[]>;
    getCarsMedium(): Promise<Car[]>;
    getCarsLarge(): Promise<Car[]>;
}
