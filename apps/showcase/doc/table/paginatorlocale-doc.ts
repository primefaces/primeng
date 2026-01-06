import { Customer } from '@/domain/customer';
import { CustomerService } from '@/service/customerservice';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { DeferredDemo } from '@/components/demo/deferreddemo';

@Component({
    selector: 'paginatorlocale-doc',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, AppDocSectionText, AppCode, DeferredDemo],
    template: ` <app-docsectiontext>
            <p>
                paginator localization information such as page numbers and rows per page options are defined with the
                <i>paginatorLocale</i> property which defaults to the user locale.
            </p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table
                    [value]="customers"
                    [paginator]="true"
                    [rows]="5"
                    [showCurrentPageReport]="true"
                    [tableStyle]="{ 'min-width': '50rem' }"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    [rowsPerPageOptions]="[10, 25, 50]"
                    paginatorLocale="fa-IR"
                >
                    <ng-template pTemplate="header">
                        <tr>
                            <th style="width:25%">Name</th>
                            <th style="width:25%">Country</th>
                            <th style="width:25%">Company</th>
                            <th style="width:25%">Representative</th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-customer>
                        <tr>
                            <td>{{ customer.name }}</td>
                            <td>{{ customer.country.name }}</td>
                            <td>{{ customer.company }}</td>
                            <td>{{ customer.representative.name }}</td>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="paginatorleft">
                        <p-button type="button" icon="pi pi-plus" text></p-button>
                    </ng-template>
                    <ng-template pTemplate="paginatorright">
                        <p-button type="button" icon="pi pi-cloud" text></p-button>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorLocaleDoc {
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
