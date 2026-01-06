import { Car } from '@/domain/car';
import { CarService } from '@/service/carservice';
import { Component } from '@angular/core';
import { InplaceModule } from 'primeng/inplace';
import { TableModule } from 'primeng/table';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'data-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCodeModule, InplaceModule, TableModule],
    template: `
        <div class="card">
            <p-inplace>
                <ng-template #display>
                    <div class="inline-flex items-center">
                        <span class="pi pi-table" style="vertical-align: middle"></span>
                        <span class="ml-2">View Data</span>
                    </div>
                </ng-template>
                <ng-template #content>
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
        <app-code [extFiles]="extFiles"></app-code>
    `
})
export class DataDoc {
    cars: Car[] | undefined;

    constructor(private carService: CarService) {}

    ngOnInit() {
        this.carService.getCarsSmall().then((cars) => (this.cars = cars));
    }

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
