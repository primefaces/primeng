import { Customer } from '@/domain/customer';
import { CustomerService } from '@/service/customerservice';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { DeferredDemo } from '@/components/demo/deferreddemo';

@Component({
    selector: 'frozencolumns-doc',
    standalone: true,
    imports: [CommonModule, FormsModule, TableModule, ToggleButtonModule, AppDocSectionText, AppCode, DeferredDemo],
    template: ` <app-docsectiontext>
            <p>Certain columns can be frozen by using the <i>pFrozenColumn</i> directive of the table component. In addition, <i>alignFrozen</i> is available to define whether the column should be fixed on the left or right.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-togglebutton [(ngModel)]="balanceFrozen" [onIcon]="'pi pi-lock'" offIcon="pi pi-lock-open" [onLabel]="'Balance'" offLabel="Balance" />

                <p-table [value]="customers" [scrollable]="true" scrollHeight="400px" class="mt-4">
                    <ng-template #header>
                        <tr>
                            <th style="min-width:200px" pFrozenColumn class="font-bold">Name</th>
                            <th style="min-width:100px">Id</th>
                            <th style="min-width:200px">Country</th>
                            <th style="min-width:200px">Date</th>
                            <th style="min-width:200px">Company</th>
                            <th style="min-width:200px">Status</th>
                            <th style="min-width:200px">Activity</th>
                            <th style="min-width:200px">Representative</th>
                            <th style="min-width:200px" alignFrozen="right" pFrozenColumn [frozen]="balanceFrozen" [ngClass]="{ 'font-bold': balanceFrozen }">Balance</th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-customer>
                        <tr>
                            <td pFrozenColumn class="font-bold">{{ customer.name }}</td>
                            <td style="min-width:100px">{{ customer.id }}</td>
                            <td>{{ customer.country.name }}</td>
                            <td>{{ customer.date }}</td>
                            <td>{{ customer.company }}</td>
                            <td>{{ customer.status }}</td>
                            <td>{{ customer.activity }}</td>
                            <td>{{ customer.representative.name }}</td>
                            <td alignFrozen="right" pFrozenColumn [frozen]="balanceFrozen" [ngClass]="{ 'font-bold': balanceFrozen }">
                                {{ formatCurrency(customer.balance) }}
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FrozenColumnsDoc {
    balanceFrozen: boolean = false;

    customers!: Customer[];

    constructor(
        private customerService: CustomerService,
        private cd: ChangeDetectorRef
    ) {}

    loadDemoData() {
        this.customerService.getCustomersMedium().then((data) => {
            this.customers = data;
            this.cd.markForCheck();
        });
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    extFiles = [
        {
            path: 'src/domain/customer.ts',
            content: `
export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: number;
    name?: string;
    country?: Country;
    company?: string;
    date?: string | Date;
    status?: string;
    activity?: number;
    representative?: Representative;
    verified?: boolean;
    balance?: number;
}`
        }
    ];
}
