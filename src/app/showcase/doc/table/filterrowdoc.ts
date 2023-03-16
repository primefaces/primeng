import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Code } from '../../domain/code';
import { Customer, Representative } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';

@Component({
    selector: 'table-filter-row-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id" [level]="3">
            <p>Filters are displayed inline within a separate row.</p>
        </app-docsectiontext>
        <div class="card">
            <p-table
                #dt2
                [value]="customers"
                dataKey="id"
                [rows]="10"
                [showCurrentPageReport]="true"
                [rowsPerPageOptions]="[10, 25, 50]"
                [loading]="loading"
                [paginator]="true"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
                [tableStyle]="{ 'min-width': '75rem' }"
            >
                <ng-template pTemplate="caption">
                    <div class="flex">
                        <span class="p-input-icon-left ml-auto">
                            <i class="pi pi-search"></i>
                            <input pInputText type="text" (input)="dt2.filterGlobal($event.target.value, 'contains')" placeholder="Search keyword" />
                        </span>
                    </div>
                </ng-template>
                <ng-template pTemplate="header">
                    <tr>
                        <th style="width:22%">Name</th>
                        <th style="width:22%">Country</th>
                        <th style="width:22%">Agent</th>
                        <th style="width:22%">Status</th>
                        <th style="width:12%">Verified</th>
                    </tr>
                    <tr>
                        <th>
                            <p-columnFilter type="text" field="name"></p-columnFilter>
                        </th>
                        <th>
                            <p-columnFilter type="text" field="country.name"></p-columnFilter>
                        </th>
                        <th>
                            <p-columnFilter field="representative" matchMode="in" [showMenu]="false">
                                <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                                    <p-multiSelect [ngModel]="value" [options]="representatives" placeholder="Any" (onChange)="filter($event.value)" optionLabel="name">
                                        <ng-template let-option pTemplate="item">
                                            <div class="p-multiselect-representative-option">
                                                <img [alt]="option.label" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ option.image }}" width="32" style="vertical-align: middle" />
                                                <span class="ml-1">{{ option.name }}</span>
                                            </div>
                                        </ng-template>
                                    </p-multiSelect>
                                </ng-template>
                            </p-columnFilter>
                        </th>
                        <th>
                            <p-columnFilter field="status" matchMode="equals" [showMenu]="false">
                                <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                                    <p-dropdown [ngModel]="value" [options]="statuses" (onChange)="filter($event.value)" placeholder="Any" [showClear]="true">
                                        <ng-template let-option pTemplate="item">
                                            <span [class]="'customer-badge status-' + option.value">{{ option.label }}</span>
                                        </ng-template>
                                    </p-dropdown>
                                </ng-template>
                            </p-columnFilter>
                        </th>
                        <th>
                            <p-columnFilter type="boolean" field="verified"></p-columnFilter>
                        </th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-customer>
                    <tr>
                        <td>
                            {{ customer.name }}
                        </td>
                        <td>
                            <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" width="30" />
                            <span class="image-text">{{ customer.country.name }}</span>
                        </td>
                        <td>
                            <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                            <span class="image-text">{{ customer.representative.name }}</span>
                        </td>
                        <td>
                            <span [class]="'customer-badge status-' + customer.status">{{ customer.status }}</span>
                        </td>
                        <td>
                            <i class="pi" [ngClass]="{ 'true-icon pi-check-circle': customer.verified, 'false-icon pi-times-circle': !customer.verified }"></i>
                        </td>
                    </tr>
                </ng-template>
                <ng-template pTemplate="emptymessage">
                    <tr>
                        <td colspan="5">No customers found.</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
        <app-code [code]="code" selector="table-filter-row-demo" [extFiles]="extFiles"></app-code>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableFilterRowDemo implements OnInit {
    @Input() id: string;

    @Input() title: string;

    customers: Customer[];

    representatives: Representative[];

    statuses: any[];

    loading: boolean = true;

    activityValues: number[] = [0, 100];

    constructor(private customerService: CustomerService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers = customers;
            this.loading = false;

            this.customers.forEach((customer) => (customer.date = new Date(customer.date)));

            this.cd.markForCheck();
        });

        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
        ];

        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];
    }

    clear(table: Table) {
        table.clear();
    }

    code: Code = {
        basic: `
<p-table
    #dt2
    [value]="customers"
    dataKey="id"
    [rows]="10"
    [showCurrentPageReport]="true"
    [rowsPerPageOptions]="[10, 25, 50]"
    [loading]="loading"
    [paginator]="true"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
    [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
    [tableStyle]="{ 'min-width': '75rem' }"
    >
    <ng-template pTemplate="caption">
        <div class="flex">
            <span class="p-input-icon-left ml-auto">
                <i class="pi pi-search"></i>
                <input pInputText type="text" (input)="dt2.filterGlobal($event.target.value, 'contains')" placeholder="Search keyword" />
            </span>
        </div>
    </ng-template>
    <ng-template pTemplate="header">
        <tr>
            <th style="width:22%">Name</th>
            <th style="width:22%">Country</th>
            <th style="width:22%">Agent</th>
            <th style="width:22%">Status</th>
            <th style="width:12%">Verified</th>
        </tr>
        <tr>
            <th>
                <p-columnFilter type="text" field="name"></p-columnFilter>
            </th>
            <th>
                <p-columnFilter type="text" field="country.name"></p-columnFilter>
            </th>
            <th>
                <p-columnFilter field="representative" matchMode="in" [showMenu]="false">
                    <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                        <p-multiSelect [ngModel]="value" [options]="representatives" placeholder="Any" (onChange)="filter($event.value)" optionLabel="name">
                            <ng-template let-option pTemplate="item">
                                <div class="p-multiselect-representative-option">
                                    <img [alt]="option.label" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ option.image }}" width="32" style="vertical-align: middle" />
                                    <span class="ml-1">{{ option.name }}</span>
                                </div>
                            </ng-template>
                        </p-multiSelect>
                    </ng-template>
                </p-columnFilter>
            </th>
            <th>
                <p-columnFilter field="status" matchMode="equals" [showMenu]="false">
                    <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                        <p-dropdown [ngModel]="value" [options]="statuses" (onChange)="filter($event.value)" placeholder="Any" [showClear]="true">
                            <ng-template let-option pTemplate="item">
                                <span [class]="'customer-badge status-' + option.value">{{ option.label }}</span>
                            </ng-template>
                        </p-dropdown>
                    </ng-template>
                </p-columnFilter>
            </th>
            <th>
                <p-columnFilter type="boolean" field="verified"></p-columnFilter>
            </th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-customer>
        <tr>
            <td>
                {{ customer.name }}
            </td>
            <td>
                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" width="30" />
                <span class="image-text">{{ customer.country.name }}</span>
            </td>
            <td>
                <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                <span class="image-text">{{ customer.representative.name }}</span>
            </td>
            <td>
                <span [class]="'customer-badge status-' + customer.status">{{ customer.status }}</span>
            </td>
            <td>
                <i class="pi" [ngClass]="{ 'true-icon pi-check-circle': customer.verified, 'false-icon pi-times-circle': !customer.verified }"></i>
            </td>
        </tr>
    </ng-template>
    <ng-template pTemplate="emptymessage">
        <tr>
            <td colspan="5">No customers found.</td>
        </tr>
    </ng-template>
</p-table>`,
        html: `
<div class="card">
    <p-table
        #dt2
        [value]="customers"
        dataKey="id"
        [rows]="10"
        [showCurrentPageReport]="true"
        [rowsPerPageOptions]="[10, 25, 50]"
        [loading]="loading"
        [paginator]="true"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
        [tableStyle]="{ 'min-width': '75rem' }"
        >
        <ng-template pTemplate="caption">
            <div class="flex">
                <span class="p-input-icon-left ml-auto">
                    <i class="pi pi-search"></i>
                    <input pInputText type="text" (input)="dt2.filterGlobal($event.target.value, 'contains')" placeholder="Search keyword" />
                </span>
            </div>
        </ng-template>
        <ng-template pTemplate="header">
            <tr>
                <th style="width:22%">Name</th>
                <th style="width:22%">Country</th>
                <th style="width:22%">Agent</th>
                <th style="width:22%">Status</th>
                <th style="width:12%">Verified</th>
            </tr>
            <tr>
                <th>
                    <p-columnFilter type="text" field="name"></p-columnFilter>
                </th>
                <th>
                    <p-columnFilter type="text" field="country.name"></p-columnFilter>
                </th>
                <th>
                    <p-columnFilter field="representative" matchMode="in" [showMenu]="false">
                        <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                            <p-multiSelect [ngModel]="value" [options]="representatives" placeholder="Any" (onChange)="filter($event.value)" optionLabel="name">
                                <ng-template let-option pTemplate="item">
                                    <div class="p-multiselect-representative-option">
                                        <img [alt]="option.label" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ option.image }}" width="32" style="vertical-align: middle" />
                                        <span class="ml-1">{{ option.name }}</span>
                                    </div>
                                </ng-template>
                            </p-multiSelect>
                        </ng-template>
                    </p-columnFilter>
                </th>
                <th>
                    <p-columnFilter field="status" matchMode="equals" [showMenu]="false">
                        <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                            <p-dropdown [ngModel]="value" [options]="statuses" (onChange)="filter($event.value)" placeholder="Any" [showClear]="true">
                                <ng-template let-option pTemplate="item">
                                    <span [class]="'customer-badge status-' + option.value">{{ option.label }}</span>
                                </ng-template>
                            </p-dropdown>
                        </ng-template>
                    </p-columnFilter>
                </th>
                <th>
                    <p-columnFilter type="boolean" field="verified"></p-columnFilter>
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-customer>
            <tr>
                <td>
                    {{ customer.name }}
                </td>
                <td>
                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" width="30" />
                    <span class="image-text">{{ customer.country.name }}</span>
                </td>
                <td>
                    <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                    <span class="image-text">{{ customer.representative.name }}</span>
                </td>
                <td>
                    <span [class]="'customer-badge status-' + customer.status">{{ customer.status }}</span>
                </td>
                <td>
                    <i class="pi" [ngClass]="{ 'true-icon pi-check-circle': customer.verified, 'false-icon pi-times-circle': !customer.verified }"></i>
                </td>
            </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
            <tr>
                <td colspan="5">No customers found.</td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Customer, Representative } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';

@Component({
    selector: 'table-filter-row-demo',
    templateUrl: 'table-filter-row-demo.html',
    styleUrls: ['table-filter-row-demo.scss']
})
export class TableFilterRowDemo implements OnInit {
    customers: Customer[];

    representatives: Representative[];

    statuses: any[];

    loading: boolean = true;

    activityValues: number[] = [0, 100];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers = customers;
            this.loading = false;

            this.customers.forEach((customer) => (customer.date = new Date(customer.date)));
        });

        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
        ];

        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];
    }

    clear(table: Table) {
        table.clear();
    }

}`,
        scss: `
.customer-badge {
    border-radius: 2px;
    padding: .25em .5rem;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: .3px;

    &.status-qualified {
        background-color: #C8E6C9;
        color: #256029;
    }

    &.status-unqualified {
        background-color: #FFCDD2;
        color: #C63737;
    }

    &.status-negotiation {
        background-color: #FEEDAF;
        color: #8A5340;
    }

    &.status-new {
        background-color: #B3E5FC;
        color: #23547B;
    }

    &.status-renewal {
        background-color: #ECCFFF;
        color: #694382;
    }

    &.status-proposal {
        background-color: #FFD8B2;
        color: #805B36;
    }
}

.true-icon {
    color: #256029;
}

.false-icon {
    color: #C63737;
}`,
        service: ['CustomerService']
    };

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
