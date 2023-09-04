import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Code } from '../../domain/code';
import { Customer, Representative } from '../../domain/customer';
import { AppDocSectionTextComponent } from '../../layout/doc/docsectiontext/app.docsectiontext.component';
import { CustomerService } from '../../service/customerservice';

@Component({
    selector: 'customers-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id" [level]="3" #docsectiontext>
            <p>DataTable with selection, pagination, filtering, sorting and templating.</p>
        </app-docsectiontext>
        <div class="card">
            <p-table
                #dt
                [value]="customers"
                [(selection)]="selectedCustomers"
                dataKey="id"
                [rowHover]="true"
                [rows]="10"
                [showCurrentPageReport]="true"
                [rowsPerPageOptions]="[10, 25, 50]"
                [loading]="loading"
                [paginator]="true"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                [filterDelay]="0"
                [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
            >
                <ng-template pTemplate="caption">
                    <div class="table-header">
                        List of Customers
                        <span class="p-input-icon-left">
                            <i class="pi pi-search"></i>
                            <input pInputText type="text" (input)="dt.filterGlobal($event.target.value, 'contains')" placeholder="Global Search" />
                        </span>
                    </div>
                </ng-template>
                <ng-template pTemplate="header">
                    <tr>
                        <th style="width: 4rem">
                            <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
                        </th>
                        <th pSortableColumn="name" style="min-width: 14rem">
                            <div class="flex justify-content-between align-items-center">
                                Name
                                <p-sortIcon field="name"></p-sortIcon>
                                <p-columnFilter type="text" field="name" display="menu" class="ml-auto"></p-columnFilter>
                            </div>
                        </th>
                        <th pSortableColumn="country.name" style="min-width: 14rem">
                            <div class="flex justify-content-between align-items-center">
                                Country
                                <p-sortIcon field="country.name"></p-sortIcon>
                                <p-columnFilter type="text" field="country.name" display="menu" class="ml-auto"></p-columnFilter>
                            </div>
                        </th>
                        <th pSortableColumn="representative.name" style="min-width: 14rem">
                            <div class="flex justify-content-between align-items-center">
                                Agent
                                <p-sortIcon field="representative.name"></p-sortIcon>
                                <p-columnFilter field="representative" matchMode="in" display="menu" [showMatchModes]="false" [showOperator]="false" [showAddButton]="false" class="ml-auto">
                                    <ng-template pTemplate="header">
                                        <div class="px-3 pt-3 pb-0">
                                            <span class="font-bold">Agent Picker</span>
                                        </div>
                                    </ng-template>
                                    <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                                        <p-multiSelect [ngModel]="value" [options]="representatives" placeholder="Any" (onChange)="filter($event.value)" optionLabel="name">
                                            <ng-template let-option pTemplate="item">
                                                <div class="inline-block vertical-align-middle">
                                                    <img [alt]="option.label" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ option.image }}" width="24" class="vertical-align-middle" />
                                                    <span class="ml-1 mt-1">{{ option.name }}</span>
                                                </div>
                                            </ng-template>
                                        </p-multiSelect>
                                    </ng-template>
                                </p-columnFilter>
                            </div>
                        </th>
                        <th pSortableColumn="date" style="min-width: 10rem">
                            <div class="flex justify-content-between align-items-center">
                                Date
                                <p-sortIcon field="date"></p-sortIcon>
                                <p-columnFilter type="date" field="date" display="menu" class="ml-auto"></p-columnFilter>
                            </div>
                        </th>
                        <th pSortableColumn="balance" style="min-width: 10rem">
                            <div class="flex justify-content-between align-items-center">
                                Balance
                                <p-sortIcon field="balance"></p-sortIcon>
                                <p-columnFilter type="numeric" field="balance" display="menu" currency="USD" class="ml-auto"></p-columnFilter>
                            </div>
                        </th>
                        <th pSortableColumn="status" style="min-width: 10rem">
                            <div class="flex justify-content-between align-items-center">
                                Status
                                <p-sortIcon field="status"></p-sortIcon>
                                <p-columnFilter field="status" matchMode="equals" display="menu" class="ml-auto">
                                    <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                                        <p-dropdown [ngModel]="value" [options]="statuses" (onChange)="filter($event.value)" placeholder="Any">
                                            <ng-template let-option pTemplate="item">
                                                <p-tag [value]="option.label" [severity]="getSeverity(option.label)"></p-tag>
                                            </ng-template>
                                        </p-dropdown>
                                    </ng-template>
                                </p-columnFilter>
                            </div>
                        </th>
                        <th pSortableColumn="activity" style="min-width: 10rem">
                            <div class="flex justify-content-between align-items-center">
                                Activity
                                <p-sortIcon field="activity"></p-sortIcon>
                                <p-columnFilter field="activity" matchMode="between" display="menu" [showMatchModes]="false" [showOperator]="false" [showAddButton]="false" class="ml-auto">
                                    <ng-template pTemplate="filter" let-filter="filterCallback">
                                        <p-slider [ngModel]="activityValues" [range]="true" (onSlideEnd)="filter($event.values)" styleClass="m-3"></p-slider>
                                        <div class="flex align-items-center justify-content-between px-2">
                                            <span>{{ activityValues[0] }}</span>
                                            <span>{{ activityValues[1] }}</span>
                                        </div>
                                    </ng-template>
                                </p-columnFilter>
                            </div>
                        </th>
                        <th style="width: 5rem"></th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-customer>
                    <tr class="p-selectable-row">
                        <td>
                            <p-tableCheckbox [value]="customer"></p-tableCheckbox>
                        </td>
                        <td>
                            <span class="p-column-title">Name</span>
                            {{ customer.name }}
                        </td>
                        <td>
                            <span class="p-column-title">Country</span>
                            <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                            <span class="ml-1 vertical-align-middle">{{ customer.country.name }}</span>
                        </td>
                        <td>
                            <span class="p-column-title">Representative</span>
                            <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                            <span class="ml-1 vertical-align-middle">{{ customer.representative.name }}</span>
                        </td>
                        <td>
                            <span class="p-column-title">Date</span>
                            {{ customer.date | date : 'MM/dd/yyyy' }}
                        </td>
                        <td>
                            <span class="p-column-title">Balance</span>
                            {{ customer.balance | currency : 'USD' : 'symbol' }}
                        </td>
                        <td>
                            <span class="p-column-title">Status</span>
                            <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)"></p-tag>
                        </td>
                        <td>
                            <span class="p-column-title">Activity</span>
                            <p-progressBar [value]="customer.activity" [showValue]="false"></p-progressBar>
                        </td>
                        <td style="text-align: center">
                            <button pButton type="button" class="p-button-secondary" icon="pi pi-cog"></button>
                        </td>
                    </tr>
                </ng-template>
                <ng-template pTemplate="emptymessage">
                    <tr>
                        <td colspan="8">No customers found.</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
        <app-code [code]="code" selector="table-customers-demo" [extFiles]="extFiles"></app-code>
    </section>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    @ViewChild('docsectiontext', { static: true }) docsectiontext: AppDocSectionTextComponent;

    customers!: Customer[];

    selectedCustomers!: Customer[];

    representatives!: Representative[];

    statuses!: any[];

    loading: boolean = true;

    activityValues: number[] = [0, 100];

    constructor(private customerService: CustomerService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
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

    getSeverity(status: string) {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warning';

            case 'renewal':
                return null;
        }
    }

    code: Code = {
        basic: `
<p-table
    #dt
    [value]="customers"
    [(selection)]="selectedCustomers"
    dataKey="id"
    [rowHover]="true"
    [rows]="10"
    [showCurrentPageReport]="true"
    [rowsPerPageOptions]="[10, 25, 50]"
    [loading]="loading"
    [paginator]="true"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
    [filterDelay]="0"
    [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
>
    <ng-template pTemplate="caption">
        <div class="table-header">
            List of Customers
            <span class="p-input-icon-left">
                <i class="pi pi-search"></i>
                <input pInputText type="text" (input)="dt.filterGlobal($event.target.value, 'contains')" placeholder="Global Search" />
            </span>
        </div>
    </ng-template>
    <ng-template pTemplate="header">
        <tr>
            <th style="width: 4rem">
                <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
            </th>
            <th pSortableColumn="name" style="min-width: 14rem">
                <div class="flex justify-content-between align-items-center">
                    Name
                    <p-sortIcon field="name"></p-sortIcon>
                    <p-columnFilter type="text" field="name" display="menu" class="ml-auto"></p-columnFilter>
                </div>
            </th>
            <th pSortableColumn="country.name" style="min-width: 14rem">
                <div class="flex justify-content-between align-items-center">
                    Country
                    <p-sortIcon field="country.name"></p-sortIcon>
                    <p-columnFilter type="text" field="country.name" display="menu" class="ml-auto"></p-columnFilter>
                </div>
            </th>
            <th pSortableColumn="representative.name" style="min-width: 14rem">
                <div class="flex justify-content-between align-items-center">
                    Agent
                    <p-sortIcon field="representative.name"></p-sortIcon>
                    <p-columnFilter field="representative" matchMode="in" display="menu" [showMatchModes]="false" [showOperator]="false" [showAddButton]="false" class="ml-auto">
                        <ng-template pTemplate="header">
                            <div class="px-3 pt-3 pb-0">
                                <span class="font-bold">Agent Picker</span>
                            </div>
                        </ng-template>
                        <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                            <p-multiSelect [ngModel]="value" [options]="representatives" placeholder="Any" (onChange)="filter($event.value)" optionLabel="name">
                                <ng-template let-option pTemplate="item">
                                    <div class="inline-block vertical-align-middle">
                                        <img [alt]="option.label" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ option.image }}" width="24" class="vertical-align-middle" />
                                        <span class="ml-1 mt-1">{{ option.name }}</span>
                                    </div>
                                </ng-template>
                            </p-multiSelect>
                        </ng-template>
                    </p-columnFilter>
                </div>
            </th>
            <th pSortableColumn="date" style="min-width: 10rem">
                <div class="flex justify-content-between align-items-center">
                    Date
                    <p-sortIcon field="date"></p-sortIcon>
                    <p-columnFilter type="date" field="date" display="menu" class="ml-auto"></p-columnFilter>
                </div>
            </th>
            <th pSortableColumn="balance" style="min-width: 10rem">
                <div class="flex justify-content-between align-items-center">
                    Balance
                    <p-sortIcon field="balance"></p-sortIcon>
                    <p-columnFilter type="numeric" field="balance" display="menu" currency="USD" class="ml-auto"></p-columnFilter>
                </div>
            </th>
            <th pSortableColumn="status" style="min-width: 10rem">
                <div class="flex justify-content-between align-items-center">
                    Status
                    <p-sortIcon field="status"></p-sortIcon>
                    <p-columnFilter field="status" matchMode="equals" display="menu" class="ml-auto">
                        <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                            <p-dropdown [ngModel]="value" [options]="statuses" (onChange)="filter($event.value)" placeholder="Any">
                                <ng-template let-option pTemplate="item">
                                    <p-tag [value]="option.label" [severity]="getSeverity(option.label)"></p-tag>
                                </ng-template>
                            </p-dropdown>
                        </ng-template>
                    </p-columnFilter>
                </div>
            </th>
            <th pSortableColumn="activity" style="min-width: 10rem">
                <div class="flex justify-content-between align-items-center">
                    Activity
                    <p-sortIcon field="activity"></p-sortIcon>
                    <p-columnFilter field="activity" matchMode="between" display="menu" [showMatchModes]="false" [showOperator]="false" [showAddButton]="false" class="ml-auto">
                        <ng-template pTemplate="filter" let-filter="filterCallback">
                            <p-slider [ngModel]="activityValues" [range]="true" (onSlideEnd)="filter($event.values)" styleClass="m-3"></p-slider>
                            <div class="flex align-items-center justify-content-between px-2">
                                <span>{{ activityValues[0] }}</span>
                                <span>{{ activityValues[1] }}</span>
                            </div>
                        </ng-template>
                    </p-columnFilter>
                </div>
            </th>
            <th style="width: 5rem"></th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-customer>
        <tr class="p-selectable-row">
            <td>
                <p-tableCheckbox [value]="customer"></p-tableCheckbox>
            </td>
            <td>
                <span class="p-column-title">Name</span>
                {{ customer.name }}
            </td>
            <td>
                <span class="p-column-title">Country</span>
                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                <span class="ml-1 vertical-align-middle">{{ customer.country.name }}</span>
            </td>
            <td>
                <span class="p-column-title">Representative</span>
                <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                <span class="ml-1 vertical-align-middle">{{ customer.representative.name }}</span>
            </td>
            <td>
                <span class="p-column-title">Date</span>
                {{ customer.date | date: 'MM/dd/yyyy' }}
            </td>
            <td>
                <span class="p-column-title">Balance</span>
                {{ customer.balance | currency: 'USD':'symbol' }}
            </td>
            <td>
                <span class="p-column-title">Status</span>
                <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)"></p-tag>
            </td>
            <td>
                <span class="p-column-title">Activity</span>
                <p-progressBar [value]="customer.activity" [showValue]="false"></p-progressBar>
            </td>
            <td style="text-align: center">
                <button pButton type="button" class="p-button-secondary" icon="pi pi-cog"></button>
            </td>
        </tr>
    </ng-template>
    <ng-template pTemplate="emptymessage">
        <tr>
            <td colspan="8">No customers found.</td>
        </tr>
    </ng-template>
</p-table>`,
        html: `
<div class="card">
    <p-table
        #dt
        [value]="customers"
        [(selection)]="selectedCustomers"
        dataKey="id"
        [rowHover]="true"
        [rows]="10"
        [showCurrentPageReport]="true"
        [rowsPerPageOptions]="[10, 25, 50]"
        [loading]="loading"
        [paginator]="true"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        [filterDelay]="0"
        [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
    >
        <ng-template pTemplate="caption">
            <div class="table-header">
                List of Customers
                <span class="p-input-icon-left">
                    <i class="pi pi-search"></i>
                    <input pInputText type="text" (input)="dt.filterGlobal($event.target.value, 'contains')" placeholder="Global Search" />
                </span>
            </div>
        </ng-template>
        <ng-template pTemplate="header">
            <tr>
                <th style="width: 4rem">
                    <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
                </th>
                <th pSortableColumn="name" style="min-width: 14rem">
                    <div class="flex justify-content-between align-items-center">
                        Name
                        <p-sortIcon field="name"></p-sortIcon>
                        <p-columnFilter type="text" field="name" display="menu" class="ml-auto"></p-columnFilter>
                    </div>
                </th>
                <th pSortableColumn="country.name" style="min-width: 14rem">
                    <div class="flex justify-content-between align-items-center">
                        Country
                        <p-sortIcon field="country.name"></p-sortIcon>
                        <p-columnFilter type="text" field="country.name" display="menu" class="ml-auto"></p-columnFilter>
                    </div>
                </th>
                <th pSortableColumn="representative.name" style="min-width: 14rem">
                    <div class="flex justify-content-between align-items-center">
                        Agent
                        <p-sortIcon field="representative.name"></p-sortIcon>
                        <p-columnFilter field="representative" matchMode="in" display="menu" [showMatchModes]="false" [showOperator]="false" [showAddButton]="false" class="ml-auto">
                            <ng-template pTemplate="header">
                                <div class="px-3 pt-3 pb-0">
                                    <span class="font-bold">Agent Picker</span>
                                </div>
                            </ng-template>
                            <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                                <p-multiSelect [ngModel]="value" [options]="representatives" placeholder="Any" (onChange)="filter($event.value)" optionLabel="name">
                                    <ng-template let-option pTemplate="item">
                                        <div class="inline-block vertical-align-middle">
                                            <img [alt]="option.label" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ option.image }}" width="24" class="vertical-align-middle" />
                                            <span class="ml-1 mt-1">{{ option.name }}</span>
                                        </div>
                                    </ng-template>
                                </p-multiSelect>
                            </ng-template>
                        </p-columnFilter>
                    </div>
                </th>
                <th pSortableColumn="date" style="min-width: 10rem">
                    <div class="flex justify-content-between align-items-center">
                        Date
                        <p-sortIcon field="date"></p-sortIcon>
                        <p-columnFilter type="date" field="date" display="menu" class="ml-auto"></p-columnFilter>
                    </div>
                </th>
                <th pSortableColumn="balance" style="min-width: 10rem">
                    <div class="flex justify-content-between align-items-center">
                        Balance
                        <p-sortIcon field="balance"></p-sortIcon>
                        <p-columnFilter type="numeric" field="balance" display="menu" currency="USD" class="ml-auto"></p-columnFilter>
                    </div>
                </th>
                <th pSortableColumn="status" style="min-width: 10rem">
                    <div class="flex justify-content-between align-items-center">
                        Status
                        <p-sortIcon field="status"></p-sortIcon>
                        <p-columnFilter field="status" matchMode="equals" display="menu" class="ml-auto">
                            <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                                <p-dropdown [ngModel]="value" [options]="statuses" (onChange)="filter($event.value)" placeholder="Any">
                                    <ng-template let-option pTemplate="item">
                                        <p-tag [value]="option.label" [severity]="getSeverity(option.label)"></p-tag>
                                    </ng-template>
                                </p-dropdown>
                            </ng-template>
                        </p-columnFilter>
                    </div>
                </th>
                <th pSortableColumn="activity" style="min-width: 10rem">
                    <div class="flex justify-content-between align-items-center">
                        Activity
                        <p-sortIcon field="activity"></p-sortIcon>
                        <p-columnFilter field="activity" matchMode="between" display="menu" [showMatchModes]="false" [showOperator]="false" [showAddButton]="false" class="ml-auto">
                            <ng-template pTemplate="filter" let-filter="filterCallback">
                                <p-slider [ngModel]="activityValues" [range]="true" (onSlideEnd)="filter($event.values)" styleClass="m-3"></p-slider>
                                <div class="flex align-items-center justify-content-between px-2">
                                    <span>{{ activityValues[0] }}</span>
                                    <span>{{ activityValues[1] }}</span>
                                </div>
                            </ng-template>
                        </p-columnFilter>
                    </div>
                </th>
                <th style="width: 5rem"></th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-customer>
            <tr class="p-selectable-row">
                <td>
                    <p-tableCheckbox [value]="customer"></p-tableCheckbox>
                </td>
                <td>
                    <span class="p-column-title">Name</span>
                    {{ customer.name }}
                </td>
                <td>
                    <span class="p-column-title">Country</span>
                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                    <span class="ml-1 vertical-align-middle">{{ customer.country.name }}</span>
                </td>
                <td>
                    <span class="p-column-title">Representative</span>
                    <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                    <span class="ml-1 vertical-align-middle">{{ customer.representative.name }}</span>
                </td>
                <td>
                    <span class="p-column-title">Date</span>
                    {{ customer.date | date: 'MM/dd/yyyy' }}
                </td>
                <td>
                    <span class="p-column-title">Balance</span>
                    {{ customer.balance | currency: 'USD':'symbol' }}
                </td>
                <td>
                    <span class="p-column-title">Status</span>
                    <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)"></p-tag>
                </td>
                <td>
                    <span class="p-column-title">Activity</span>
                    <p-progressBar [value]="customer.activity" [showValue]="false"></p-progressBar>
                </td>
                <td style="text-align: center">
                    <button pButton type="button" class="p-button-secondary" icon="pi pi-cog"></button>
                </td>
            </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
            <tr>
                <td colspan="8">No customers found.</td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { Customer, Representative } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';

@Component({
    selector: 'table-customers-demo',
    templateUrl: 'table-customers-demo.html',
    styleUrls: ['table-customers-demo.scss']
})
export class TableCustomersDemo implements OnInit{
    customers!: Customer[];

    selectedCustomers!: Customer[];

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

    getSeverity(status: string) {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warning';

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
        scss: `
:host ::ng-deep {
    .p-paginator {
        .p-paginator-current {
            margin-left: auto;
        }
    }
    
    .p-progressbar {
        height: .5rem;
        background-color: #D8DADC;
    
        .p-progressbar-value {
            background-color: #607D8B;
        }
    }
    
    .table-header {
        display: flex;
        justify-content: space-between;
    }
    
    .p-calendar .p-datepicker {
        min-width: 25rem;
    
        td {
            font-weight: 400;
        }
    }
    
    .p-datatable.p-datatable-customers {
        .p-datatable-header {
            padding: 1rem;
            text-align: left;
            font-size: 1.5rem;
        }
    
        .p-paginator {
            padding: 1rem;
        }
    
        .p-datatable-thead > tr > th {
            text-align: left;
        }
    
        .p-datatable-tbody > tr > td {
            cursor: auto;
        }
    
        .p-dropdown-label:not(.p-placeholder) {
            text-transform: uppercase;
        }
    }

    .p-w-100 {
        width: 100%;
    }
    
    /* Responsive */
    .p-datatable-customers .p-datatable-tbody > tr > td .p-column-title {
        display: none;
    }
}

@media screen and (max-width: 960px) {
    :host ::ng-deep {
        .p-datatable {
            &.p-datatable-customers {
                .p-datatable-thead > tr > th,
                .p-datatable-tfoot > tr > td {
                    display: none !important;
                }
    
                .p-datatable-tbody > tr {
                    border-bottom: 1px solid var(--layer-2);
    
                    > td {
                        text-align: left;
                        width: 100%;
                        display: flex;
                        align-items: center;
                        border: 0 none;
    
                        .p-column-title {
                            min-width: 30%;
                            display: inline-block;
                            font-weight: bold;
                        }
        
                        p-progressbar {
                            width: 100%;
                        }

                        &:last-child {
                            border-bottom: 1px solid var(--surface-d);
                        }
                    }
                }
            }
        }
    } 
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
