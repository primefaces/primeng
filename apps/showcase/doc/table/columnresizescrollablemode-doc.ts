import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { Customer } from '@/domain/customer';
import { CustomerService } from '@/service/customerservice';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'column-resize-scrollable-mode-doc',
    standalone: true,
    imports: [CommonModule, TableModule, AppCode, DeferredDemo, AppDemoWrapper],
    template: ` <app-demo-wrapper>
        <p-deferred-demo (load)="loadDemoData()">
            <p-table [value]="customers" showGridlines [scrollable]="true" scrollHeight="400px" [resizableColumns]="true" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template #header>
                    <tr>
                        <th pResizableColumn>Name</th>
                        <th pResizableColumn>Country</th>
                        <th pResizableColumn>Company</th>
                        <th pResizableColumn>Representative</th>
                    </tr>
                </ng-template>
                <ng-template #body let-customer>
                    <tr>
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.country.name }}</td>
                        <td>{{ customer.company }}</td>
                        <td>{{ customer.representative.name }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </p-deferred-demo>
        <app-code></app-code>
    </app-demo-wrapper>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnResizeScrollableModeDoc {
    customers!: Customer[];

    constructor(
        private customerService: CustomerService,
        private cd: ChangeDetectorRef
    ) {}

    loadDemoData() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers = customers;
            this.cd.markForCheck();
        });
    }
}
