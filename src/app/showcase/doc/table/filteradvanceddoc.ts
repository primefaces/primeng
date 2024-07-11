import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Table } from 'primeng/table';
import { Code } from '../../domain/code';
import { Customer, Representative } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';

@Component({
    selector: 'filter-advanced-doc',
    template: ` <app-docsectiontext>
            <p>Filters are displayed in an overlay.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table #dt1 [value]="customers" dataKey="id" [rows]="10" [rowsPerPageOptions]="[10, 25, 50]" [loading]="loading" [paginator]="true" [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']">
                    <ng-template pTemplate="caption">
                        <div class="flex">
                            <p-button label="Clear" [outlined]="true" icon="pi pi-filter-slash" (onClick)="clear(dt1)" />
                            <span class="p-input-icon-left ml-auto">
                                <i class="pi pi-search"></i>
                                <input pInputText type="text" [(ngModel)]="searchValue" (input)="dt1.filterGlobal($event.target.value, 'contains')" placeholder="Search keyword" />
                            </span>
                        </div>
                    </ng-template>
                    <ng-template pTemplate="header">
                        <tr>
                            <th style="min-width:15rem">
                                <div class="flex align-items-center">
                                    Name
                                    <p-columnFilter type="text" field="name" display="menu" />
                                </div>
                            </th>
                            <th style="min-width:15rem">
                                <div class="flex align-items-center">
                                    Country
                                    <p-columnFilter type="text" field="country.name" display="menu" />
                                </div>
                            </th>
                            <th style="min-width:15rem">
                                <div class="flex align-items-center">
                                    Agent
                                    <p-columnFilter field="representative" matchMode="in" display="menu" [showMatchModes]="false" [showOperator]="false" [showAddButton]="false">
                                        <ng-template pTemplate="header">
                                            <div class="px-3 pt-3 pb-0">
                                                <span class="font-bold">Agent Picker</span>
                                            </div>
                                        </ng-template>
                                        <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                                            <p-multiSelect [(ngModel)]="value" [options]="representatives" placeholder="Any" (onChange)="filter($event.value)" optionLabel="name">
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
                            <th style="min-width:10rem">
                                <div class="flex align-items-center">
                                    Date
                                    <p-columnFilter type="date" field="date" display="menu" />
                                </div>
                            </th>
                            <th style="min-width:10rem">
                                <div class="flex align-items-center">
                                    Balance
                                    <p-columnFilter type="numeric" field="balance" display="menu" currency="USD" />
                                </div>
                            </th>
                            <th style="min-width:10rem">
                                <div class="flex align-items-center">
                                    Status
                                    <p-columnFilter field="status" matchMode="equals" display="menu">
                                        <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                                            <p-dropdown [(ngModel)]="value" [options]="statuses" (onChange)="filter($event.value)" placeholder="Any">
                                                <ng-template let-option pTemplate="item">
                                                    <p-tag [value]="option.value" [severity]="getSeverity(option.label)"></p-tag>
                                                </ng-template>
                                            </p-dropdown>
                                        </ng-template>
                                    </p-columnFilter>
                                </div>
                            </th>
                            <th style="min-width:10rem">
                                <div class="flex align-items-center">
                                    Activity
                                    <p-columnFilter field="activity" matchMode="between" display="menu" [showMatchModes]="false" [showOperator]="false" [showAddButton]="false">
                                        <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                                            <p-slider [(ngModel)]="value" [range]="true" styleClass="m-3" (onSlideEnd)="filter($event.values)" />
                                            <div class="flex align-items-center px-2">
                                                <span *ngIf="!value">0</span>
                                                <span *ngIf="value">{{ value[0] }} - {{ value[1] }}</span>
                                            </div>
                                        </ng-template>
                                    </p-columnFilter>
                                </div>
                            </th>
                            <th style="width: 3rem">
                                <div class="flex align-items-center">
                                    Verified
                                    <p-columnFilter type="boolean" field="verified" display="menu" />
                                </div>
                            </th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-customer>
                        <tr>
                            <td>
                                {{ customer.name }}
                            </td>
                            <td>
                                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                                <span class="ml-1 vertical-align-middle">{{ customer.country.name }}</span>
                            </td>
                            <td>
                                <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                                <span class="ml-1 vertical-align-middle">{{ customer.representative.name }}</span>
                            </td>
                            <td>
                                {{ customer.date | date : 'MM/dd/yyyy' }}
                            </td>
                            <td>
                                {{ customer.balance | currency : 'USD' : 'symbol' }}
                            </td>
                            <td>
                                <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
                            </td>
                            <td>
                                <p-progressBar [value]="customer.activity" [showValue]="false" />
                            </td>
                            <td class="text-center">
                                <i class="pi" [ngClass]="{ 'text-green-500 pi-check-circle': customer.verified, 'text-red-500 pi-times-circle': !customer.verified }"></i>
                            </td>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="emptymessage">
                        <tr>
                            <td colspan="7">No customers found.</td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="table-filter-advanced-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterAdvancedDoc {
    customers!: Customer[];

    representatives!: Representative[];

    statuses!: any[];

    loading: boolean = true;

    searchValue: string | undefined;

    activityValues: number[] = [0, 100];

    constructor(private customerService: CustomerService, private cd: ChangeDetectorRef) {}

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
        this.searchValue = '';
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
        basic: `<p-table
    #dt1
    [value]="customers"
    dataKey="id"
    [rows]="10"
    [rowsPerPageOptions]="[10, 25, 50]"
    [loading]="loading"
    [paginator]="true"
    [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
>
    <ng-template pTemplate="caption">
        <div class="flex">
            <p-button label="Clear" [outlined]="true" icon="pi pi-filter-slash" (onClick)="clear(dt1)" />
            <span class="p-input-icon-left ml-auto">
                <i class="pi pi-search"></i>
                <input pInputText type="text" [(ngModel)]="searchValue" (input)="dt1.filterGlobal($event.target.value, 'contains')" placeholder="Search keyword" />
            </span>
        </div>
    </ng-template>
    <ng-template pTemplate="header">
        <tr>
            <th style="min-width:15rem">
                <div class="flex align-items-center">
                    Name
                    <p-columnFilter type="text" field="name" display="menu" />
                </div>
            </th>
            <th style="min-width:15rem">
                <div class="flex align-items-center">
                    Country
                    <p-columnFilter type="text" field="country.name" display="menu" />
                </div>
            </th>
            <th style="min-width:15rem">
                <div class="flex align-items-center">
                    Agent
                    <p-columnFilter field="representative" matchMode="in" display="menu" [showMatchModes]="false" [showOperator]="false" [showAddButton]="false">
                        <ng-template pTemplate="header">
                            <div class="px-3 pt-3 pb-0">
                                <span class="font-bold">Agent Picker</span>
                            </div>
                        </ng-template>
                        <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                            <p-multiSelect [(ngModel)]="value" [options]="representatives" placeholder="Any" (onChange)="filter($event.value)" optionLabel="name">
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
            <th style="min-width:10rem">
                <div class="flex align-items-center">
                    Date
                    <p-columnFilter type="date" field="date" display="menu" />
                </div>
            </th>
            <th style="min-width:10rem">
                <div class="flex align-items-center">
                    Balance
                    <p-columnFilter type="numeric" field="balance" display="menu" currency="USD" />
                </div>
            </th>
            <th style="min-width:10rem">
                <div class="flex align-items-center">
                    Status
                    <p-columnFilter field="status" matchMode="equals" display="menu">
                        <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                            <p-dropdown [(ngModel)]="value" [options]="statuses" (onChange)="filter($event.value)" placeholder="Any">
                                <ng-template let-option pTemplate="item">
                                    <p-tag [value]="option.value" [severity]="getSeverity(option.label)" />
                                </ng-template>
                            </p-dropdown>
                        </ng-template>
                    </p-columnFilter>
                </div>
            </th>
            <th style="min-width:10rem">
                <div class="flex align-items-center">
                    Activity
                    <p-columnFilter field="activity" matchMode="between" display="menu" [showMatchModes]="false" [showOperator]="false" [showAddButton]="false">
                        <ng-template pTemplate="filter" let-filter="filterCallback">
                            <p-slider [(ngModel)]="activityValues" [range]="true" (onSlideEnd)="filter($event.values)" styleClass="m-3" />
                            <div class="flex align-items-center px-2">
                                <span>{{ activityValues[0] }}</span>
                                <span>{{ activityValues[1] }}</span>
                            </div>
                        </ng-template>
                    </p-columnFilter>
                </div>
            </th>
            <th style="width: 3rem">
                <div class="flex align-items-center">
                    Verified
                    <p-columnFilter type="boolean" field="verified" display="menu" />
                </div>
            </th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-customer>
        <tr>
            <td>
                {{ customer.name }}
            </td>
            <td>
                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                <span class="ml-1 vertical-align-middle">{{ customer.country.name }}</span>
            </td>
            <td>
                <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                <span class="ml-1 vertical-align-middle">{{ customer.representative.name }}</span>
            </td>
            <td>
                {{ customer.date | date: 'MM/dd/yyyy' }}
            </td>
            <td>
                {{ customer.balance | currency: 'USD':'symbol' }}
            </td>
            <td>
                <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
            </td>
            <td>
                <p-progressBar [value]="customer.activity" [showValue]="false" />
            </td>
            <td class="text-center">
                <i class="pi" [ngClass]="{ 'text-green-500 pi-check-circle': customer.verified, 'text-red-500 pi-times-circle': !customer.verified }"></i>
            </td>
        </tr>
    </ng-template>
    <ng-template pTemplate="emptymessage">
        <tr>
            <td colspan="7">No customers found.</td>
        </tr>
    </ng-template>
</p-table>`,
        html: `<div class="card">
    <p-table
        #dt1
        [value]="customers"
        dataKey="id"
        [rows]="10"
        [rowsPerPageOptions]="[10, 25, 50]"
        [loading]="loading"
        [paginator]="true"
        [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
        >
        <ng-template pTemplate="caption">
            <div class="flex">
                <p-button label="Clear" [outlined]="true" icon="pi pi-filter-slash" (onClick)="clear(dt1)" />
                <span class="p-input-icon-left ml-auto">
                    <i class="pi pi-search"></i>
                    <input pInputText type="text" [(ngModel)]="searchValue" (input)="dt1.filterGlobal($event.target.value, 'contains')" placeholder="Search keyword" />
                </span>
            </div>
        </ng-template>
        <ng-template pTemplate="header">
            <tr>
                <th style="min-width:15rem">
                    <div class="flex align-items-center">
                        Name
                        <p-columnFilter type="text" field="name" display="menu" />
                    </div>
                </th>
                <th style="min-width:15rem">
                    <div class="flex align-items-center">
                        Country
                        <p-columnFilter type="text" field="country.name" display="menu" />
                    </div>
                </th>
                <th style="min-width:15rem">
                    <div class="flex align-items-center">
                        Agent
                        <p-columnFilter field="representative" matchMode="in" display="menu" [showMatchModes]="false" [showOperator]="false" [showAddButton]="false">
                            <ng-template pTemplate="header">
                                <div class="px-3 pt-3 pb-0">
                                    <span class="font-bold">Agent Picker</span>
                                </div>
                            </ng-template>
                            <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                                <p-multiSelect [(ngModel)]="value" [options]="representatives" placeholder="Any" (onChange)="filter($event.value)" optionLabel="name">
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
                <th style="min-width:10rem">
                    <div class="flex align-items-center">
                        Date
                        <p-columnFilter type="date" field="date" display="menu" />
                    </div>
                </th>
                <th style="min-width:10rem">
                    <div class="flex align-items-center">
                        Balance
                        <p-columnFilter type="numeric" field="balance" display="menu" currency="USD" />
                    </div>
                </th>
                <th style="min-width:10rem">
                    <div class="flex align-items-center">
                        Status
                        <p-columnFilter field="status" matchMode="equals" display="menu">
                            <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                                <p-dropdown [(ngModel)]="value" [options]="statuses" (onChange)="filter($event.value)" placeholder="Any">
                                    <ng-template let-option pTemplate="item">
                                        <p-tag [value]="option.value" [severity]="getSeverity(option.label)" />
                                    </ng-template>
                                </p-dropdown>
                            </ng-template>
                        </p-columnFilter>
                    </div>
                </th>
                <th style="min-width:10rem">
                    <div class="flex align-items-center">
                        Activity
                        <p-columnFilter field="activity" matchMode="between" display="menu" [showMatchModes]="false" [showOperator]="false" [showAddButton]="false">
                            <ng-template pTemplate="filter" let-filter="filterCallback">
                                <p-slider [(ngModel)]="activityValues" [range]="true" (onSlideEnd)="filter($event.values)" styleClass="m-3" />
                                <div class="flex align-items-center px-2">
                                    <span>{{ activityValues[0] }}</span>
                                    <span>{{ activityValues[1] }}</span>
                                </div>
                            </ng-template>
                        </p-columnFilter>
                    </div>
                </th>
                <th style="width: 3rem">
                    <div class="flex align-items-center">
                        Verified
                        <p-columnFilter type="boolean" field="verified" display="menu" />
                    </div>
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-customer>
            <tr>
                <td>
                    {{ customer.name }}
                </td>
                <td>
                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                    <span class="ml-1 vertical-align-middle">{{ customer.country.name }}</span>
                </td>
                <td>
                    <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                    <span class="ml-1 vertical-align-middle">{{ customer.representative.name }}</span>
                </td>
                <td>
                    {{ customer.date | date: 'MM/dd/yyyy' }}
                </td>
                <td>
                    {{ customer.balance | currency: 'USD':'symbol' }}
                </td>
                <td>
                    <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
                </td>
                <td>
                    <p-progressBar [value]="customer.activity" [showValue]="false" />
                </td>
                <td class="text-center">
                    <i class="pi" [ngClass]="{ 'text-green-500 pi-check-circle': customer.verified, 'text-red-500 pi-times-circle': !customer.verified }"></i>
                </td>
            </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
            <tr>
                <td colspan="7">No customers found.</td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Customer, Representative } from '../domain/customer';
import { CustomerService } from '../service/customerservice';

@Component({
    selector: 'table-filter-advanced-demo',
    templateUrl: 'table-filter-advanced-demo.html',
    standalone: true,
    imports: [TableModule, HttpClientModule, CommonModule, InputTextModule, TagModule, 
    DropdownModule, MultiSelectModule, ProgressBarModule, ButtonModule ],
    providers: [CustomerService]
})
export class TableFilterAdvancedDemo implements OnInit {
    customers!: Customer[];

    representatives!: Representative[];

    statuses!: any[];

    loading: boolean = true;

    activityValues: number[] = [0, 100];

    searchValue: string | undefined;

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
        this.searchValue = ''
    }

    getSeverity(status: string) {
        switch (status.toLowerCase()) {
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
        scss: `
:host ::ng-deep {
    .p-progressbar {
        height: .5rem;
        background-color: #D8DADC;
    
        .p-progressbar-value {
            background-color: #607D8B;
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
