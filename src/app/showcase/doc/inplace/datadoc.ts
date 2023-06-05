import { Component, Input } from '@angular/core';
import { Car } from '../../domain/car';
import { Code } from '../../domain/code';
import { CarService } from '../../service/carservice';

@Component({
    selector: 'data-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
        <div class="card">
            <p-inplace>
                <ng-template pTemplate="display">
                    <div class="inline-flex align-items-center">
                        <span class="pi pi-table" style="vertical-align: middle"></span>
                        <span class="ml-2">View Data</span>
                    </div>
                </ng-template>
                <ng-template pTemplate="content">
                    <p-table [value]="cars" responsiveLayout="scroll">
                        <ng-template pTemplate="header">
                            <tr>
                                <th>Vin</th>
                                <th>Year</th>
                                <th>Brand</th>
                                <th>Color</th>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-car>
                            <tr>
                                <td>{{ car.vin }}</td>
                                <td>{{ car.year }}</td>
                                <td>{{ car.brand }}</td>
                                <td>{{ car.color }}</td>
                            </tr>
                        </ng-template>
                    </p-table>
                </ng-template>
            </p-inplace>
        </div>
        <app-code [code]="code" selector="inplace-data-demo" [extFiles]="extFiles"></app-code>
    </section>`
})
export class DataDoc {
    @Input() id: string;

    @Input() title: string;

    cars: Car[];

    constructor(private carService: CarService) {}

    ngOnInit() {
        this.carService.getCarsSmall().then((cars) => (this.cars = cars));
    }

    code: Code = {
        basic: `
<p-inplace>
    <ng-template pTemplate="display">
        <div class="inline-flex align-items-center">
            <span class="pi pi-table" style="vertical-align: middle"></span>
            <span class="ml-2">View Data</span>
        </div>
    </ng-template>
    <ng-template pTemplate="content">
        <p-table [value]="cars" responsiveLayout="scroll">
            <ng-template pTemplate="header">
                <tr>
                    <th>Vin</th>
                    <th>Year</th>
                    <th>Brand</th>
                    <th>Color</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-car>
                <tr>
                    <td>{{ car.vin }}</td>
                    <td>{{ car.year }}</td>
                    <td>{{ car.brand }}</td>
                    <td>{{ car.color }}</td>
                </tr>
            </ng-template>
        </p-table>
    </ng-template>
</p-inplace>`,
        html: `
<div class="card">
    <p-inplace>
        <ng-template pTemplate="display">
            <div class="inline-flex align-items-center">
                <span class="pi pi-table" style="vertical-align: middle"></span>
                <span class="ml-2">View Data</span>
            </div>
        </ng-template>
        <ng-template pTemplate="content">
            <p-table [value]="cars" responsiveLayout="scroll">
                <ng-template pTemplate="header">
                    <tr>
                        <th>Vin</th>
                        <th>Year</th>
                        <th>Brand</th>
                        <th>Color</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-car>
                    <tr>
                        <td>{{ car.vin }}</td>
                        <td>{{ car.year }}</td>
                        <td>{{ car.brand }}</td>
                        <td>{{ car.color }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </ng-template>
    </p-inplace>
</div>`,
        typescript: `
import { Component } from '@angular/core';
import { Car } from '../../domain/car';
import { CarService } from '../../service/carservice';

@Component({
    selector: 'inplace-data-demo',
    templateUrl: './inplace-data-demo.html'
})
export class InplaceDataDemo {
    cars: Car[];

    constructor(private carService: CarService) {}

    ngOnInit() {
        this.carService.getCarsSmall().then((cars) => (this.cars = cars));
    } 
}`,
        service: ['CarService']
    };

    extFiles = [
        {
            path: 'src/domain/car.ts',
            content: `
export interface Car {
    id?;
    vin?;
    year?;
    brand?;
    color?;
    price?;
    saleDate?;
}`
        }
    ];
}
