import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Car } from '@/domain/car';
import { CarService } from '@/service/carservice';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableModule } from 'primeng/table';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'virtualscroll-doc',
    standalone: true,
    imports: [CommonModule, TableModule, AppDocSectionText, AppCode, DeferredDemo],
    template: ` <app-docsectiontext>
            <p>
                Virtual Scrolling is an efficient way to render large amount data. Usage is similar to regular scrolling with the addition of <i>virtualScrollerOptions</i> property to define a fixed <i>itemSize</i>. Internally, VirtualScroller
                component is utilized so refer to the API of <a routerLink="/virtualscroller">VirtualScroller</a> for more information about the available options.
            </p>
            <p>In this example, <b>10000</b> preloaded records are rendered by the Table.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table [columns]="cols" [value]="cars" [scrollable]="true" scrollHeight="400px" [virtualScroll]="true" [virtualScrollItemSize]="46">
                    <ng-template #header let-columns>
                        <tr>
                            <th *ngFor="let col of columns" style="width: 20%;">
                                {{ col.header }}
                            </th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-rowData let-rowIndex="rowIndex" let-columns="columns">
                        <tr style="height:46px">
                            <td *ngFor="let col of columns">
                                {{ rowData[col.field] }}
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [extFiles]="['Car']"></app-code>`,
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
}
