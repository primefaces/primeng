import { OnInit } from '@angular/core';
import { Car } from '../domain/car';
import { CarService } from '../service/carservice';
export declare class DataTableCrudDemo implements OnInit {
    private carService;
    displayDialog: boolean;
    car: Car;
    selectedCar: Car;
    newCar: boolean;
    cars: Car[];
    constructor(carService: CarService);
    ngOnInit(): void;
    showDialogToAdd(): void;
    save(): void;
    delete(): void;
    onRowSelect(event: any): void;
    cloneCar(c: Car): Car;
    findSelectedCarIndex(): number;
}
