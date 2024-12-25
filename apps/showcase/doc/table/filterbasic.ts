import { Code } from '@/domain/code';
import { Customer, Representative } from '@/domain/customer';
import { CustomerService } from '@/service/customerservice';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
    selector: 'filter-basic-doc',
    standalone: false,
    template: ` <app-docsectiontext>
            <p>
                Data filtering is enabled by defining the <i>filters</i> property referring to a <i>DataTableFilterMeta</i> instance. Each column to filter also requires <i>filter</i> to be enabled. Built-in filter element is a input field and using
                <i>filterElement</i>, it is possible to customize the filtering with your own UI.
            </p>
            <p>The optional global filtering searches the data against a single value that is bound to the <i>global</i> key of the <i>filters</i> object. The fields to search against is defined with the <i>globalFilterFields</i>.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table
                    #dt2
                    [value]="customers"
                    dataKey="id"
                    [rows]="10"
                    [rowsPerPageOptions]="[10, 25, 50]"
                    [loading]="loading"
                    [paginator]="true"
                    [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
                    [tableStyle]="{ 'min-width': '75rem' }"
                >
                    <ng-template #caption>
                        <div class="flex">
                            <p-iconfield iconPosition="left" class="ml-auto">
                                <p-inputicon>
                                    <i class="pi pi-search"></i>
                                </p-inputicon>
                                <input pInputText type="text" (input)="dt2.filterGlobal($event.target.value, 'contains')" placeholder="Search keyword" />
                            </p-iconfield>
                        </div>
                    </ng-template>
                    <ng-template #header>
                        <tr>
                            <th style="width:22%">Name</th>
                            <th style="width:22%">Country</th>
                            <th style="width:22%">Agent</th>
                            <th style="width:22%">Status</th>
                            <th style="width:12%">Verified</th>
                        </tr>
                        <tr>
                            <th>
                                <p-columnFilter type="text" field="name" placeholder="Search by name" ariaLabel="Filter Name"></p-columnFilter>
                            </th>
                            <th>
                                <p-columnFilter type="text" field="country.name" placeholder="Search by country" ariaLabel="Filter Country"></p-columnFilter>
                            </th>
                            <th>
                                <p-columnFilter field="representative" matchMode="in" [showMenu]="false">
                                    <ng-template #filter let-value let-filter="filterCallback">
                                        <p-multiselect [(ngModel)]="value" [options]="representatives" placeholder="Any" (onChange)="filter($event.value)" optionLabel="name" style="min-width: 14rem">
                                            <ng-template let-option #item>
                                                <div class="inline-block align-middle">
                                                    <img [alt]="option.label" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ option.image }}" width="24" class="align-middle" />
                                                    <span class="ml-1 mt-1">{{ option.name }}</span>
                                                </div>
                                            </ng-template>
                                        </p-multiselect>
                                    </ng-template>
                                </p-columnFilter>
                            </th>
                            <th>
                                <p-columnFilter field="status" matchMode="equals" [showMenu]="false">
                                    <ng-template #filter let-value let-filter="filterCallback">
                                        <p-select [(ngModel)]="value" [options]="statuses" (onChange)="filter($event.value)" placeholder="Select One" [showClear]="true" style="min-width: 12rem">
                                            <ng-template let-option #item>
                                                <p-tag [value]="option.value" [severity]="getSeverity(option.value)" />
                                            </ng-template>
                                        </p-select>
                                    </ng-template>
                                </p-columnFilter>
                            </th>
                            <th>
                                <p-columnFilter type="boolean" field="verified"></p-columnFilter>
                            </th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-customer>
                        <tr>
                            <td>
                                {{ customer.name }}
                            </td>
                            <td>
                                <div class="flex items-center gap-2">
                                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                                    <span>{{ customer.country.name }}</span>
                                </div>
                            </td>
                            <td>
                                <div class="flex items-center gap-2">
                                    <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                                    <span>{{ customer.representative.name }}</span>
                                </div>
                            </td>
                            <td>
                                <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
                            </td>
                            <td>
                                <i
                                    class="pi"
                                    [ngClass]="{
                                        'text-green-500 pi-check-circle': customer.verified,
                                        'text-red-500 pi-times-circle': !customer.verified
                                    }"
                                ></i>
                            </td>
                        </tr>
                    </ng-template>
                    <ng-template #emptymessage>
                        <tr>
                            <td colspan="5">No customers found.</td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="table-filter-basic-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterBasicDoc {
    customers!: Customer[];

    representatives!: Representative[];

    statuses!: any[];

    loading: boolean = true;

    activityValues: number[] = [0, 100];

    constructor(
        private customerService: CustomerService,
        private cd: ChangeDetectorRef
    ) {}

    loadDemoData() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers = customers;
            this.loading = false;

            this.customers.forEach((customer) => (customer.date = new Date(<Date>customer.date)));

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
        basic: ` <p-table
    #dt2
    [value]="customers"
    dataKey="id"
    [rows]="10"
    [rowsPerPageOptions]="[10, 25, 50]"
    [loading]="loading"
    [paginator]="true"
    [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
    [tableStyle]="{ 'min-width': '75rem' }"
>
    <ng-template #caption>
        <div class="flex">
            <p-iconfield iconPosition="left" class="ml-auto">
                <p-inputicon>
                    <i class="pi pi-search"></i>
                </p-inputicon>
                <input
                    pInputText
                    type="text"
                    (input)="dt2.filterGlobal($event.target.value, 'contains')"
                    placeholder="Search keyword"
                />
            </p-iconfield>
        </div>
    </ng-template>
    <ng-template #header>
        <tr>
            <th style="width:22%">Name</th>
            <th style="width:22%">Country</th>
            <th style="width:22%">Agent</th>
            <th style="width:22%">Status</th>
            <th style="width:12%">Verified</th>
        </tr>
        <tr>
            <th>
                <p-columnFilter
                    type="text"
                    field="name"
                    placeholder="Search by name"
                    ariaLabel="Filter Name"
                ></p-columnFilter>
            </th>
            <th>
                <p-columnFilter
                    type="text"
                    field="country.name"
                    placeholder="Search by country"
                    ariaLabel="Filter Country"
                ></p-columnFilter>
            </th>
            <th>
                <p-columnFilter field="representative" matchMode="in" [showMenu]="false">
                    <ng-template #filter let-value let-filter="filterCallback">
                        <p-multiselect
                            [(ngModel)]="value"
                            [options]="representatives"
                            placeholder="Any"
                            (onChange)="filter($event.value)"
                            optionLabel="name"
                            style="min-width: 14rem"
                        >
                            <ng-template let-option #item>
                                <div class="inline-block align-middle">
                                    <img
                                        [alt]="option.label"
                                        src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ option.image }}"
                                        width="24"
                                        class="align-middle"
                                    />
                                    <span class="ml-1 mt-1">{{ option.name }}</span>
                                </div>
                            </ng-template>
                        </p-multiselect>
                    </ng-template>
                </p-columnFilter>
            </th>
            <th>
                <p-columnFilter field="status" matchMode="equals" [showMenu]="false">
                    <ng-template #filter let-value let-filter="filterCallback">
                        <p-select
                            [(ngModel)]="value"
                            [options]="statuses"
                            (onChange)="filter($event.value)"
                            placeholder="Select One"
                            [showClear]="true"
                            style="min-width: 12rem"
                        >
                            <ng-template let-option #item>
                                <p-tag [value]="option.value" [severity]="getSeverity(option.value)" />
                            </ng-template>
                        </p-select>
                    </ng-template>
                </p-columnFilter>
            </th>
            <th>
                <p-columnFilter type="boolean" field="verified"></p-columnFilter>
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-customer>
        <tr>
            <td>
                {{ customer.name }}
            </td>
            <td>
                <div class="flex items-center gap-2">
                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                    <span>{{ customer.country.name }}</span>
                </div>
            </td>
            <td>
                <div class="flex items-center gap-2">
                    <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                    <span>{{ customer.representative.name }}</span>
                </div>
            </td>
            <td>
                <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
            </td>
            <td>
                <i
                    class="pi"
                    [ngClass]="{
                        'text-green-500 pi-check-circle': customer.verified,
                        'text-red-500 pi-times-circle': !customer.verified
                    }"
                ></i>
            </td>
        </tr>
    </ng-template>
    <ng-template #emptymessage>
        <tr>
            <td colspan="5">No customers found.</td>
        </tr>
    </ng-template>
</p-table>`,
        html: `<div class="card">
   <p-table
    #dt2
    [value]="customers"
    dataKey="id"
    [rows]="10"
    [rowsPerPageOptions]="[10, 25, 50]"
    [loading]="loading"
    [paginator]="true"
    [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
    [tableStyle]="{ 'min-width': '75rem' }"
>
    <ng-template #caption>
        <div class="flex">
            <p-iconfield iconPosition="left" class="ml-auto">
                <p-inputicon>
                    <i class="pi pi-search"></i>
                </p-inputicon>
                <input
                    pInputText
                    type="text"
                    (input)="dt2.filterGlobal($event.target.value, 'contains')"
                    placeholder="Search keyword"
                />
            </p-iconfield>
        </div>
    </ng-template>
    <ng-template #header>
        <tr>
            <th style="width:22%">Name</th>
            <th style="width:22%">Country</th>
            <th style="width:22%">Agent</th>
            <th style="width:22%">Status</th>
            <th style="width:12%">Verified</th>
        </tr>
        <tr>
            <th>
                <p-columnFilter
                    type="text"
                    field="name"
                    placeholder="Search by name"
                    ariaLabel="Filter Name"
                ></p-columnFilter>
            </th>
            <th>
                <p-columnFilter
                    type="text"
                    field="country.name"
                    placeholder="Search by country"
                    ariaLabel="Filter Country"
                ></p-columnFilter>
            </th>
            <th>
                <p-columnFilter field="representative" matchMode="in" [showMenu]="false">
                    <ng-template #filter let-value let-filter="filterCallback">
                        <p-multiselect
                            [(ngModel)]="value"
                            [options]="representatives"
                            placeholder="Any"
                            (onChange)="filter($event.value)"
                            optionLabel="name"
                            style="min-width: 14rem"
                        >
                            <ng-template let-option #item>
                                <div class="inline-block align-middle">
                                    <img
                                        [alt]="option.label"
                                        src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ option.image }}"
                                        width="24"
                                        class="align-middle"
                                    />
                                    <span class="ml-1 mt-1">{{ option.name }}</span>
                                </div>
                            </ng-template>
                        </p-multiselect>
                    </ng-template>
                </p-columnFilter>
            </th>
            <th>
                <p-columnFilter field="status" matchMode="equals" [showMenu]="false">
                    <ng-template #filter let-value let-filter="filterCallback">
                        <p-select
                            [(ngModel)]="value"
                            [options]="statuses"
                            (onChange)="filter($event.value)"
                            placeholder="Select One"
                            [showClear]="true"
                            style="min-width: 12rem"
                        >
                            <ng-template let-option #item>
                                <p-tag [value]="option.value" [severity]="getSeverity(option.value)" />
                            </ng-template>
                        </p-select>
                    </ng-template>
                </p-columnFilter>
            </th>
            <th>
                <p-columnFilter type="boolean" field="verified"></p-columnFilter>
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-customer>
        <tr>
            <td>
                {{ customer.name }}
            </td>
            <td>
                <div class="flex items-center gap-2">
                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                    <span>{{ customer.country.name }}</span>
                </div>
            </td>
            <td>
                <div class="flex items-center gap-2">
                    <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                    <span>{{ customer.representative.name }}</span>
                </div>
            </td>
            <td>
                <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
            </td>
            <td>
                <i
                    class="pi"
                    [ngClass]="{
                        'text-green-500 pi-check-circle': customer.verified,
                        'text-red-500 pi-times-circle': !customer.verified
                    }"
                ></i>
            </td>
        </tr>
    </ng-template>
    <ng-template #emptymessage>
        <tr>
            <td colspan="5">No customers found.</td>
        </tr>
    </ng-template>
</p-table>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Customer, Representative } from '@/domain/customer';
import { CustomerService } from '@/service/customerservice';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'table-filter-basic-demo',
    templateUrl: 'table-filter-basic-demo.html',
    standalone: true,
    imports: [TableModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, HttpClientModule, CommonModule],
    providers: [CustomerService]
})
@Component({
    selector: 'table-filter-basic-demo',
    templateUrl: 'table-filter-basic-demo.html'
})
export class TableFilterBasicDemo implements OnInit {
    customers!: Customer[];

    representatives!: Representative[];

    statuses!: any[];

    loading: boolean = true;

    activityValues: number[] = [0, 100];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers = customers;
            this.loading = false;

            this.customers.forEach((customer) => (customer.date = new Date(<Date>customer.date)));
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

    getSeverity(status: string) {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warn';

            case 'renewal':
                return null;
        }
    }
}`,
        data: `{
    id: 1000,
    name: 'James Butt',
    country: {
        name: 'Algeria',
        code: 'dz'
    },
    company: 'Benton, John B Jr',
    date: '2015-09-13',
    status: 'unqualified',
    verified: true,
    activity: 17,
    representative: {
        name: 'Ioni Bowcher',
        image: 'ionibowcher.png'
    },
    balance: 70663
},
...`,
        service: ['CustomerService']
    };

    getSeverity(status: string) {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warn';

            case 'renewal':
                return null;
        }
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
