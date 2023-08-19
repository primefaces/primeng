import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BasicDoc } from '../../doc/defer/basicdoc';
import { ImportDoc } from '../../doc/defer/importdoc';
import { DataTableDoc } from '../../doc/defer/datatabledoc';
import { CarService } from '../../service/carservice';
import { Car } from '../domain/car';

@Component({
    templateUrl: './deferdemo.html',
    providers: [MessageService]
})
export class DeferDemo {
    cars: Car[];

    constructor(private carService: CarService, private messageService: MessageService) {}

    initData() {
        this.messageService.add({ severity: 'success', summary: 'Data Initialized', detail: 'Render Completed' });
        this.carService.getCarsSmall().then((cars) => (this.cars = cars));
    }

    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc
        },
        {
            id: 'datatable',
            label: 'DataTable',
            component: DataTableDoc
        }
    ];
}
