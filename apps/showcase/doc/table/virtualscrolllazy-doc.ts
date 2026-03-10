import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Car } from '@/domain/car';
import { CarService } from '@/service/carservice';
import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'virtualscrolllazy-doc',
    standalone: true,
    imports: [NgStyle, TableModule, AppDocSectionText, AppCode, DeferredDemo, AppDemoWrapper, SkeletonModule],
    template: ` <app-docsectiontext>
            <p>
                VirtualScroller is a performance-approach to handle huge data efficiently. Setting <i>virtualScroll</i> property as true and providing a <i>virtualScrollItemSize</i> in pixels would be enough to enable this functionality. It is also
                suggested to use the same <i>virtualScrollItemSize</i> value on the tr element inside the body template.
            </p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <app-demo-wrapper>
                <p-table [columns]="cols" [value]="virtualCars" [scrollable]="true" scrollHeight="400px" [rows]="100" [virtualScroll]="true" [virtualScrollItemSize]="46" [lazy]="true" (onLazyLoad)="loadCarsLazy($event)">
                    <ng-template #header let-columns>
                        <tr>
                            @for (col of columns; track col) {
                                <th style="width: 20%;">
                                    {{ col.header }}
                                </th>
                            }
                        </tr>
                    </ng-template>
                    <ng-template #body let-rowData let-columns="columns">
                        <tr style="height:46px">
                            @for (col of columns; track col) {
                                <td>
                                    {{ rowData[col.field] }}
                                </td>
                            }
                        </tr>
                    </ng-template>
                    <ng-template #loadingbody let-columns="columns">
                        <tr style="height:46px">
                            @for (col of columns; track col; let even = $even) {
                                <td>
                                    <p-skeleton [ngStyle]="{ width: even ? (col.field === 'year' ? '30%' : '40%') : '60%' }" />
                                </td>
                            }
                        </tr>
                    </ng-template>
                </p-table>
                <app-code [extFiles]="['Car']"></app-code>
            </app-demo-wrapper>
        </p-deferred-demo>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VirtualScrollLazyDoc {
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

    loadCarsLazy(event: TableLazyLoadEvent) {
        //simulate remote connection with a timeout
        setTimeout(
            () => {
                //load data of required page
                let loadedCars = this.cars.slice(event.first, event.first + event.rows);

                //populate page of virtual cars
                Array.prototype.splice.apply(this.virtualCars, [...[event.first, event.rows], ...loadedCars]);

                //trigger change detection
                event.forceUpdate();
            },
            Math.random() * 1000 + 250
        );
    }
}
