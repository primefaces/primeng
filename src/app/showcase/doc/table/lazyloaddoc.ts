import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Code } from '../../domain/code';
import { Customer, Representative } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';

@Component({
    selector: 'lazy-load-doc',
    template: ` <app-docsectiontext>
            <p>
                Lazy mode is handy to deal with large datasets, instead of loading the entire data, small chunks of data is loaded by invoking onLazyLoad callback everytime <i>paging</i>, <i>sorting</i> and <i>filtering</i> happens. Sample here loads
                the data from remote datasource efficiently using lazy loading. Also, the implementation of <i>checkbox selection</i> in lazy tables is left entirely to the user. Since the table component does not know what will happen to the data on
                the next page or whether there are instant data changes, the selection array can be implemented in several ways. One of them is as in the example below.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-table
                [value]="customers"
                [lazy]="true"
                (onLazyLoad)="loadCustomers($event)"
                dataKey="id"
                [tableStyle]="{ 'min-width': '75rem' }"
                [selection]="selectedCustomers"
                (selectionChange)="onSelectionChange($event)"
                [selectAll]="selectAll"
                (selectAllChange)="onSelectAllChange($event)"
                [paginator]="true"
                [rows]="10"
                [totalRecords]="totalRecords"
                [loading]="loading"
                [globalFilterFields]="['name', 'country.name', 'company', 'representative.name']"
            >
                <ng-template pTemplate="header">
                    <tr>
                        <th style="width: 4rem"></th>
                        <th pSortableColumn="name">Name <p-sortIcon field="name"></p-sortIcon></th>
                        <th pSortableColumn="country.name">Country <p-sortIcon field="country.name"></p-sortIcon></th>
                        <th pSortableColumn="company">Company <p-sortIcon field="company"></p-sortIcon></th>
                        <th pSortableColumn="representative.name">Representative <p-sortIcon field="representative.name"></p-sortIcon></th>
                    </tr>
                    <tr>
                        <th style="width: 4rem">
                            <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
                        </th>
                        <th>
                            <p-columnFilter type="text" field="name"></p-columnFilter>
                        </th>
                        <th>
                            <p-columnFilter type="text" field="country.name"></p-columnFilter>
                        </th>
                        <th>
                            <p-columnFilter type="text" field="company"></p-columnFilter>
                        </th>
                        <th>
                            <p-columnFilter field="representative" matchMode="in" [showMenu]="false">
                                <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                                    <p-multiSelect [ngModel]="value" appendTo="body" [options]="representatives" placeholder="Any" (onChange)="filter($event.value)" optionLabel="name" [maxSelectedLabels]="1" [selectedItemsLabel]="'{0} items'">
                                        <ng-template let-option pTemplate="item">
                                            <div class="inline-block vertical-align-middle">
                                                <img [alt]="option.label" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ option.image }}" width="24" class="vertical-align-middle" />
                                                <span class="ml-1 mt-1">{{ option.name }}</span>
                                            </div>
                                        </ng-template>
                                    </p-multiSelect>
                                </ng-template>
                            </p-columnFilter>
                        </th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-customer>
                    <tr>
                        <td>
                            <p-tableCheckbox [value]="customer"></p-tableCheckbox>
                        </td>
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.country.name }}</td>
                        <td>{{ customer.company }}</td>
                        <td>{{ customer.representative.name }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
        <app-code [code]="code" selector="table-lazy-load-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyLoadDoc implements OnInit {
    customers!: Customer[];

    totalRecords!: number;

    loading: boolean = false;

    representatives!: Representative[];

    selectAll: boolean = false;

    selectedCustomers!: Customer[];

    constructor(private customerService: CustomerService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
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

        this.loading = true;
    }

    loadCustomers(event: LazyLoadEvent) {
        this.loading = true;

        setTimeout(() => {
            this.customerService.getCustomers({ lazyEvent: JSON.stringify(event) }).then((res) => {
                this.customers = res.customers;
                this.totalRecords = res.totalRecords;
                this.loading = false;
                this.cd.markForCheck();
            });
        }, 1000);
    }

    onSelectionChange(value = []) {
        this.selectAll = value.length === this.totalRecords;
        this.selectedCustomers = value;
    }

    onSelectAllChange(event: any) {
        const checked = event.checked;

        if (checked) {
            this.customerService.getCustomers().then((res) => {
                this.selectedCustomers = res.customers;
                this.selectAll = true;
            });
        } else {
            this.selectedCustomers = [];
            this.selectAll = false;
        }
    }

    code: Code = {
        basic: `
<p-table
    [value]="customers"
    [lazy]="true"
    (onLazyLoad)="loadCustomers($event)"
    dataKey="id"
    [tableStyle]="{ 'min-width': '75rem' }"
    [selection]="selectedCustomers"
    (selectionChange)="onSelectionChange($event)"
    [selectAll]="selectAll"
    (selectAllChange)="onSelectAllChange($event)"
    [paginator]="true"
    [rows]="10"
    [totalRecords]="totalRecords"
    [loading]="loading"
    [globalFilterFields]="['name', 'country.name', 'company', 'representative.name']"
>
    <ng-template pTemplate="header">
        <tr>
            <th style="width: 4rem"></th>
            <th pSortableColumn="name">Name <p-sortIcon field="name"></p-sortIcon></th>
            <th pSortableColumn="country.name">Country <p-sortIcon field="country.name"></p-sortIcon></th>
            <th pSortableColumn="company">Company <p-sortIcon field="company"></p-sortIcon></th>
            <th pSortableColumn="representative.name">Representative <p-sortIcon field="representative.name"></p-sortIcon></th>
        </tr>
        <tr>
            <th style="width: 4rem">
                <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
            </th>
            <th>
                <p-columnFilter type="text" field="name"></p-columnFilter>
            </th>
            <th>
                <p-columnFilter type="text" field="country.name"></p-columnFilter>
            </th>
            <th>
                <p-columnFilter type="text" field="company"></p-columnFilter>
            </th>
            <th>
                <p-columnFilter field="representative" matchMode="in" [showMenu]="false">
                    <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                        <p-multiSelect [ngModel]="value" appendTo="body" [options]="representatives" placeholder="Any" (onChange)="filter($event.value)" optionLabel="name" [maxSelectedLabels]="1" [selectedItemsLabel]="'{0} items'">
                            <ng-template let-option pTemplate="item">
                                <div class="inline-block vertical-align-middle">
                                    <img [alt]="option.label" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ option.image }}" width="24" class="vertical-align-middle" />
                                    <span class="ml-1 mt-1">{{ option.name }}</span>
                                </div>
                            </ng-template>
                        </p-multiSelect>
                    </ng-template>
                </p-columnFilter>
            </th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-customer>
        <tr>
            <td>
                <p-tableCheckbox [value]="customer"></p-tableCheckbox>
            </td>
            <td>{{ customer.name }}</td>
            <td>{{ customer.country.name }}</td>
            <td>{{ customer.company }}</td>
            <td>{{ customer.representative.name }}</td>
        </tr>
    </ng-template>
</p-table>`,
        html: `
<div class="card">
    <p-table
        [value]="customers"
        [lazy]="true"
        (onLazyLoad)="loadCustomers($event)"
        dataKey="id"
        [tableStyle]="{ 'min-width': '75rem' }"
        [selection]="selectedCustomers"
        (selectionChange)="onSelectionChange($event)"
        [selectAll]="selectAll"
        (selectAllChange)="onSelectAllChange($event)"
        [paginator]="true"
        [rows]="10"
        [totalRecords]="totalRecords"
        [loading]="loading"
        [globalFilterFields]="['name', 'country.name', 'company', 'representative.name']"
    >
        <ng-template pTemplate="header">
            <tr>
                <th style="width: 4rem"></th>
                <th pSortableColumn="name">Name <p-sortIcon field="name"></p-sortIcon></th>
                <th pSortableColumn="country.name">Country <p-sortIcon field="country.name"></p-sortIcon></th>
                <th pSortableColumn="company">Company <p-sortIcon field="company"></p-sortIcon></th>
                <th pSortableColumn="representative.name">Representative <p-sortIcon field="representative.name"></p-sortIcon></th>
            </tr>
            <tr>
                <th style="width: 4rem">
                    <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
                </th>
                <th>
                    <p-columnFilter type="text" field="name"></p-columnFilter>
                </th>
                <th>
                    <p-columnFilter type="text" field="country.name"></p-columnFilter>
                </th>
                <th>
                    <p-columnFilter type="text" field="company"></p-columnFilter>
                </th>
                <th>
                    <p-columnFilter field="representative" matchMode="in" [showMenu]="false">
                        <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                            <p-multiSelect [ngModel]="value" appendTo="body" [options]="representatives" placeholder="Any" (onChange)="filter($event.value)" optionLabel="name" [maxSelectedLabels]="1" [selectedItemsLabel]="'{0} items'">
                                <ng-template let-option pTemplate="item">
                                    <div class="inline-block vertical-align-middle">
                                        <img [alt]="option.label" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ option.image }}" width="24" class="vertical-align-middle" />
                                        <span class="ml-1 mt-1">{{ option.name }}</span>
                                    </div>
                                </ng-template>
                            </p-multiSelect>
                        </ng-template>
                    </p-columnFilter>
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-customer>
            <tr>
                <td>
                    <p-tableCheckbox [value]="customer"></p-tableCheckbox>
                </td>
                <td>{{ customer.name }}</td>
                <td>{{ customer.country.name }}</td>
                <td>{{ customer.company }}</td>
                <td>{{ customer.representative.name }}</td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Customer, Representative } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';

@Component({
    selector: 'table-lazy-load-demo',
    templateUrl: 'table-lazy-load-demo.html'
})
export class TableLazyLoadDemo implements OnInit{
    customers!: Customer[];

    totalRecords!: number;

    loading: boolean = false;

    representatives!: Representative[];

    selectAll: boolean = false;

    selectedCustomers!: Customer[];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
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

        this.loading = true;
    }

    loadCustomers(event: LazyLoadEvent) {
        this.loading = true;

        setTimeout(() => {
            this.customerService.getCustomers({ lazyEvent: JSON.stringify(event) }).then((res) => {
                this.customers = res.customers;
                this.totalRecords = res.totalRecords;
                this.loading = false;
            });
        }, 1000);
    }

    onSelectionChange(value = []) {
        this.selectAll = value.length === this.totalRecords;
        this.selectedCustomers = value;
    }

    onSelectAllChange(event: any) {
        const checked = event.checked;

        if (checked) {
            this.customerService.getCustomers().then((res) => {
                this.selectedCustomers = res.customers;
                this.selectAll = true;
            });
        } else {
            this.selectedCustomers = [];
            this.selectAll = false;
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
