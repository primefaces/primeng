import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Car } from '@/domain/car';
import { CarService } from '@/service/carservice';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FilterMatchMode, FilterService, SelectItem } from 'primeng/api';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'table-integration-doc',
    standalone: true,
    imports: [AppCode, AppDemoWrapper, AppDocSectionText, TableModule],
    template: `
        <app-docsectiontext>
            <p>A custom equals filter that checks for exact case sensitive value is registered and defined as a match mode of a column filter.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-table #dt [columns]="cols" [value]="cars" [paginator]="true" [rows]="10" [tableStyle]="{ 'min-width': '75rem' }">
                <ng-template #header let-columns>
                    <tr>
                        @for (col of columns; track col.field) {
                            <th [style.width]="'25%'">{{ col.header }}</th>
                        }
                    </tr>
                    <tr>
                        @for (col of columns; track col.field) {
                            <th>
                                <p-column-filter type="text" [field]="col.field" [matchModeOptions]="matchModeOptions" [matchMode]="'custom-equals'" />
                            </th>
                        }
                    </tr>
                </ng-template>
                <ng-template #body let-rowData let-columns="columns">
                    <tr [pSelectableRow]="rowData">
                        @for (col of columns; track col.field) {
                            <td>{{ rowData[col.field] }}</td>
                        }
                    </tr>
                </ng-template>
            </p-table>
            <app-code [extFiles]="['Product', 'Car']"></app-code>
        </app-demo-wrapper>
    `,
    providers: [FilterService]
})
export class TableIntegrationDoc implements OnInit {
    cars: Car[];

    cols: any[];

    matchModeOptions: SelectItem[];

    constructor(
        private carService: CarService,
        private filterService: FilterService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit() {
        const customFilterName = 'custom-equals';

        this.filterService.register(customFilterName, (value, filter): boolean => {
            if (filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }

            if (value === undefined || value === null) {
                return false;
            }

            return value.toString() === filter.toString();
        });

        this.cols = [
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' },
            { field: 'vin', header: 'Vin' }
        ];

        this.matchModeOptions = [
            { label: 'Custom Equals', value: customFilterName },
            { label: 'Starts With', value: FilterMatchMode.STARTS_WITH },
            { label: 'Contains', value: FilterMatchMode.CONTAINS }
        ];

        this.carService.getCarsMedium().then((cars) => {
            this.cars = cars;

            this.cd.markForCheck();
        });
    }
}
