import {Component} from '@angular/core';
import {Car} from '../../components/domain/car';
import {CarService} from '../../service/carservice';
import {DynamicDialogRef} from '../../../components/common/api';

@Component({
    template: `
        <p-table [value]="cars" [paginator]="true" [rows]="5">
            <ng-template pTemplate="header">
                <tr>
                    <th pSortableColumn="vin">Vin <p-sortIcon field="vin"></p-sortIcon></th>
                    <th pSortableColumn="year">Year <p-sortIcon field="year"></p-sortIcon></th>
                    <th pSortableColumn="brand">Brand <p-sortIcon field="brand"></p-sortIcon></th>
                    <th pSortableColumn="color">Color <p-sortIcon field="color"></p-sortIcon></th>
                    <th style="width:4em"></th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-car>
                <tr>
                    <td>{{car.vin}}</td>
                    <td>{{car.year}}</td>
                    <td>{{car.brand}}</td>
                    <td>{{car.color}}</td>
                    <td>
                        <button pButton icon="pi pi-check" (click)="selectCar(car)"></button>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    `
})
export class CarsListDemo {

    cars: Car[];
            
    constructor(private carService: CarService, public ref: DynamicDialogRef) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);
    }

    selectCar(car: Car) {
        this.ref.close(car);
    }

}