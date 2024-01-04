import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Car } from '../../domain/car';
import { Code } from '../../domain/code';
import { CarService } from '../../service/carservice';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'virtual-scroll-doc',
    template: ` <app-docsectiontext>
            <p>
                VirtualScroller is a performance-approach to handle huge data efficiently. Setting <i>virtualScroll</i> property as true and providing a <i>virtualScrollItemSize</i> in pixels would be enough to enable this functionality. It is also
                suggested to use the same <i>virtualScrollItemSize</i> value on the tr element inside the body template.
            </p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table [columns]="cols" [value]="cars" [scrollable]="true" scrollHeight="250px" [virtualScroll]="true" [virtualScrollItemSize]="46">
                    <ng-template pTemplate="header" let-columns>
                        <tr>
                            <th *ngFor="let col of columns" style="width: 20%;">
                                {{ col.header }}
                            </th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-rowData let-rowIndex="rowIndex" let-columns="columns">
                        <tr style="height:46px">
                            <td *ngFor="let col of columns">
                                {{ rowData[col.field] }}
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="table-virtual-scroll-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VirtualScrollDoc {
    cars!: Car[];

    virtualCars!: Car[];

    cols!: Column[];

    constructor(private carService: CarService) {}

    loadDemoData() {
        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];

        this.cars = Array.from({ length: 10000 }).map((_, i) => this.carService.generateCar(i + 1));
        this.virtualCars = Array.from({ length: 10000 });
    }

    code: Code = {
        basic: `<p-table [columns]="cols" [value]="cars" [scrollable]="true" scrollHeight="250px" [virtualScroll]="true" [virtualScrollItemSize]="46">
    <ng-template pTemplate="header" let-columns>
        <tr>
            <th *ngFor="let col of columns" style="width: 20%;">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-rowData let-rowIndex="rowIndex" let-columns="columns">
        <tr style="height:46px">
            <td *ngFor="let col of columns">
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-table>`,
        html: `
<div class="card">
    <p-table [columns]="cols" [value]="cars" [scrollable]="true" scrollHeight="250px" [virtualScroll]="true" [virtualScrollItemSize]="46">
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th *ngFor="let col of columns" style="width: 20%;">
                    {{ col.header }}
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowData let-rowIndex="rowIndex" let-columns="columns">
            <tr style="height:46px">
                <td *ngFor="let col of columns">
                    {{ rowData[col.field] }}
                </td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { Car } from '../../domain/car';
import { CarService } from '../../service/carservice';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'table-virtual-scroll-demo',
    templateUrl: 'table-virtual-scroll-demo.html'
})
export class TableVirtualScrollDemo implements OnInit{
    cars!: Car[];

    virtualCars!: Car[];

    cols!: Column[];

    constructor(private carService: CarService) {}

    ngOnInit() {
        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];

        this.cars = Array.from({ length: 10000 }).map((_, i) => this.carService.generateCar(i + 1));
        this.virtualCars = Array.from({ length: 10000 });
    }
}`,
        data: `{
    id: 1
    vin: tvACo,
    brand: Norma,
    color: Black,
    year: 2002
}
...`,
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
