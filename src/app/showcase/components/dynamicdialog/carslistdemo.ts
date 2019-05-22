import {Component} from '@angular/core';
import {Car} from '../../components/domain/car';
import {CarService} from '../../service/carservice';
import {DynamicDialogRef} from '../../../components/common/api';
import {DynamicDialogConfig} from '../../../components/common/api';

@Component({
    template: `
        <p-table [value]="cars" [paginator]="true" [rows]="5" [responsive]="true">
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
                    <td><span class="ui-column-title">Vin</span>{{car.vin}}</td>
                    <td><span class="ui-column-title">Year</span>{{car.year}}</td>
                    <td><span class="ui-column-title">Brand</span>{{car.brand}}</td>
                    <td><span class="ui-column-title">Color</span>{{car.color}}</td>
                    <td>
                        <button pButton icon="pi pi-search" (click)="selectCar(car)"></button>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    `
})
export class CarsListDemo {

    cars: Car[];
            
    constructor(private carService: CarService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);
    }

    selectCar(car: Car) {
        this.ref.close(car);
    }

}