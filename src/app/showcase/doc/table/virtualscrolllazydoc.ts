import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Car } from '../../domain/car';
import { Code } from '../../domain/code';
import { AppDocSectionTextComponent } from '../../layout/doc/docsectiontext/app.docsectiontext.component';
import { CarService } from '../../service/carservice';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'virtual-scroll-lazy-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id" [level]="3" #docsectiontext>
            <p>
                VirtualScroller is a performance-approach to handle huge data efficiently. Setting <i>virtualScroll</i> property as true and providing a <i>virtualScrollItemSize</i> in pixels would be enough to enable this functionality. It is also
                suggested to use the same <i>virtualScrollItemSize</i> value on the tr element inside the body template.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-table [columns]="cols" [value]="virtualCars" [scrollable]="true" scrollHeight="250px" [rows]="100" [virtualScroll]="true" [virtualScrollItemSize]="46" [lazy]="true" (onLazyLoad)="loadCarsLazy($event)">
                <ng-template pTemplate="header" let-columns>
                    <tr>
                        <th *ngFor="let col of columns" style="width: 20%;">
                            {{ col.header }}
                        </th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-rowData let-columns="columns">
                    <tr style="height:46px">
                        <td *ngFor="let col of columns">
                            {{ rowData[col.field] }}
                        </td>
                    </tr>
                </ng-template>
                <ng-template pTemplate="loadingbody" let-columns="columns">
                    <tr style="height:46px">
                        <td *ngFor="let col of columns; let even = even">
                            <p-skeleton [ngStyle]="{ width: even ? (col.field === 'year' ? '30%' : '40%') : '60%' }"></p-skeleton>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
        <app-code [code]="code" selector="table-virtual-scroll-lazy-demo" [extFiles]="extFiles"></app-code>
    </section>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VirtualScrollLazyDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    @ViewChild('docsectiontext', { static: true }) docsectiontext: AppDocSectionTextComponent;

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

    loadCarsLazy(event: LazyLoadEvent) {
        //simulate remote connection with a timeout
        setTimeout(() => {
            //load data of required page
            let loadedCars = this.cars.slice(event.first, event.first + event.rows);

            //populate page of virtual cars
            Array.prototype.splice.apply(this.virtualCars, [...[event.first, event.rows], ...loadedCars]);

            //trigger change detection
            event.forceUpdate();
        }, Math.random() * 1000 + 250);
    }

    code: Code = {
        basic: `
<p-table [columns]="cols" [value]="virtualCars" [scrollable]="true" scrollHeight="250px" [rows]="100"
    [virtualScroll]="true" [virtualScrollItemSize]="46" [lazy]="true" (onLazyLoad)="loadCarsLazy($event)">
    <ng-template pTemplate="header" let-columns>
        <tr>
            <th *ngFor="let col of columns" style="width: 20%;">
                {{col.header}}
            </th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-rowData let-columns="columns">
        <tr style="height:46px">
            <td *ngFor="let col of columns">
                {{rowData[col.field]}}
            </td>
        </tr>
    </ng-template>
    <ng-template pTemplate="loadingbody" let-columns="columns">
        <tr style="height:46px">
            <td *ngFor="let col of columns; let even = even">
                <p-skeleton [ngStyle]="{'width': even ? (col.field === 'year' ? '30%' : '40%') : '60%'}"></p-skeleton>
            </td>
        </tr>
    </ng-template>
</p-table>`,
        html: `
<div class="card">
    <p-table [columns]="cols" [value]="virtualCars" [scrollable]="true" scrollHeight="250px" [rows]="100"
    [virtualScroll]="true" [virtualScrollItemSize]="46" [lazy]="true" (onLazyLoad)="loadCarsLazy($event)">
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th *ngFor="let col of columns" style="width: 20%;">
                    {{col.header}}
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowData let-columns="columns">
            <tr style="height:46px">
                <td *ngFor="let col of columns">
                    {{rowData[col.field]}}
                </td>
            </tr>
        </ng-template>
        <ng-template pTemplate="loadingbody" let-columns="columns">
            <tr style="height:46px">
                <td *ngFor="let col of columns; let even = even">
                    <p-skeleton [ngStyle]="{'width': even ? (col.field === 'year' ? '30%' : '40%') : '60%'}"></p-skeleton>
                </td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Car } from '../../domain/car';
import { CarService } from '../../service/carservice';

@Component({
    selector: 'table-virtual-scroll-lazy-demo',
    templateUrl: 'table-virtual-scroll-lazy-demo.html'
})
export class TableVirtualScrollLazyDemo implements OnInit{
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

    loadCarsLazy(event: LazyLoadEvent) {
        //simulate remote connection with a timeout
        setTimeout(() => {
            //load data of required page
            let loadedCars = this.cars.slice(event.first, event.first + event.rows);

            //populate page of virtual cars
            Array.prototype.splice.apply(this.virtualCars, [...[event.first, event.rows], ...loadedCars]);

            //trigger change detection
            event.forceUpdate();
        }, Math.random() * 1000 + 250);
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
