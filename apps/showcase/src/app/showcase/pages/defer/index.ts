import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BasicDoc } from '@doc/defer/basicdoc';
import { ImportDoc } from '@doc/defer/importdoc';
import { DataTableDoc } from '@doc/defer/datatabledoc';
import { CarService } from '@service/carservice';
import { Car } from '../domain/car';
import { DeferDocModule } from '@doc/defer/deferdoc.module';

@Component({
    standalone: true,
    imports: [DeferDocModule],
    template: ` <app-doc
        docTitle="Angular Defer Component"
        header="Defer"
        description="Defer postpones the loading the content that is initially not in the viewport until it becomes visible on scroll."
        [docs]="docs"
        [apiDocs]="['Defer']"
    ></app-doc>`,
    providers: [MessageService],
})
export class DeferDemo {
    cars: Car[];

    carService = inject(CarService);

    messageService = inject(MessageService);
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc,
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc,
        },
        {
            id: 'datatable',
            label: 'DataTable',
            component: DataTableDoc,
        },
    ];

    initData() {
        this.messageService.add({ severity: 'success', summary: 'Data Initialized', detail: 'Render Completed' });
        this.carService.getCarsSmall().then((cars) => (this.cars = cars));
    }
}
