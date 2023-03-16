import { Component, Input } from '@angular/core';
import { MessageService } from 'src/app/components/api/messageservice';
import { Car } from '../../domain/car';
import { Code } from '../../domain/code';
import { CarService } from '../../service/carservice';

@Component({
    selector: 'datatable-doc',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Defer is applied to a container element with pDefer directive where content needs to be placed inside an ng-template.</p>
        </app-docsectiontext>
        <div class="card">
            <p style="margin-bottom: 70rem;">Table is not loaded yet, scroll down to initialize it.</p>

            <p-toast></p-toast>
            <div pDefer (onLoad)="initData()">
                <ng-template>
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
            </div>
        </div>
        <app-code [code]="code"></app-code>
    </div>`,
    providers: [MessageService, CarService]
})
export class DataTableDoc {
    @Input() id: string;

    @Input() title: string;

    cars: Car[];

    constructor(private carService: CarService, private messageService: MessageService) {}

    initData() {
        this.messageService.add({ severity: 'success', summary: 'Data Initialized', detail: 'Render Completed' });
        this.carService.getCarsSmall().then((cars) => (this.cars = cars));
    }

    code: Code = {
        basic: `
<div pDefer (onLoad)="initData()">
    <ng-template>
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
                    <td>{{car.vin}}</td>
                    <td>{{car.year}}</td>
                    <td>{{car.brand}}</td>
                    <td>{{car.color}}</td>
                </tr>
            </ng-template>
        </p-table>
    </ng-template>
</div>`,
        html: `
<div class="card">
    <p style="margin-bottom: 70rem;">
        Table is not loaded yet, scroll down to initialize it.
    </p>

    <p-toast></p-toast>
    <div pDefer (onLoad)="initData()">
        <ng-template>
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
                        <td>{{car.vin}}</td>
                        <td>{{car.year}}</td>
                        <td>{{car.brand}}</td>
                        <td>{{car.color}}</td>
                    </tr>
                </ng-template>
            </p-table>
        </ng-template>
    </div>
</div>`,
        typescript: `
import { Component, Input } from '@angular/core';
import { MessageService } from 'src/app/components/api/messageservice';
import { Car } from '../../domain/car';
import { Code } from '../../domain/code';
import { CarService } from '../../service/carservice';

@Component({
    templateUrl: './deferdemo.html',
    providers: [MessageService, CarService]
})
export class DeferDemo {
    cars: Car[];

    constructor(private carService: CarService, private messageService: MessageService) {}

    initData() {
        this.messageService.add({ severity: 'success', summary: 'Data Initialized', detail: 'Render Completed' });
        this.carService.getCarsSmall().then((cars) => (this.cars = cars));
    }
}`,

        module: `
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DeferModule } from 'primeng/defer';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule, DeferModule, TableModule, ToastModule],
    declarations: [DeferDemo]
})
export class DeferDemoModule {}`
    };
}
