import { Component } from '@angular/core';
import { Car } from '@domain/car';
import { Code } from '@domain/code';
import { CarService } from '@service/carservice';

@Component({
    selector: 'data-doc',
    template: `
        <div class="card">
            <p-inplace>
                <ng-template pTemplate="display">
                    <div class="inline-flex items-center">
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
    `
})
export class DataDoc {
    cars: Car[] | undefined;

    constructor(private carService: CarService) {}

    ngOnInit() {
        this.carService.getCarsSmall().then((cars) => (this.cars = cars));
    }

    code: Code = {
        basic: `<p-inplace>
    <ng-template pTemplate="display">
        <div class="inline-flex items-center">
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
        html: `<div class="card">
    <p-inplace>
        <ng-template pTemplate="display">
            <div class="inline-flex items-center">
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
        typescript: `import { Component } from '@angular/core';
import { Car } from '@domain/car';
import { CarService } from '@service/carservice';
import { InplaceModule } from 'primeng/inplace';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'inplace-data-demo',
    templateUrl: './inplace-data-demo.html',
    standalone: true,
    imports: [InplaceModule, TableModule],
    providers: [CarService]
})
export class InplaceDataDemo {
    cars: Car[] | undefined;

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
