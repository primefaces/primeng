import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { Code } from '../../domain/code';
import { Customer } from '../../domain/customer';
import { AppDocSectionTextComponent } from '../../layout/doc/docsectiontext/app.docsectiontext.component';
import { CustomerService } from '../../service/customerservice';

@Component({
    selector: 'paginator-basic-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id" [level]="3" #docsectiontext>
            <p>
                Pagination is enabled by setting <i>paginator</i> property to <i>true</i> and defining a rows property to specify the number of rows per page. For server side pagination, see the
                <a [routerLink]="['/table#lazy']">lazy loading</a> example.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-table
                [value]="customers"
                [paginator]="true"
                [rows]="5"
                [showCurrentPageReport]="true"
                [tableStyle]="{ 'min-width': '50rem' }"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                [rowsPerPageOptions]="[10, 25, 50]"
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
                    <p-button type="button" icon="pi pi-plus" styleClass="p-button-text"></p-button>
                </ng-template>
                <ng-template pTemplate="paginatorright">
                    <p-button type="button" icon="pi pi-cloud" styleClass="p-button-text"></p-button>
                </ng-template>
            </p-table>
        </div>
        <app-code [code]="code" selector="table-paginator-basic-demo" [extFiles]="extFiles"></app-code>
    </section>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorBasicDoc {
    @Input() id: string;

    @Input() title: string;

    @ViewChild('docsectiontext', { static: true }) docsectiontext: AppDocSectionTextComponent;

    customers!: Customer[];

    constructor(private customerService: CustomerService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers = customers;
            this.cd.markForCheck();
        });
    }

    code: Code = {
        basic: `
<p-table
    [value]="customers"
    [paginator]="true"
    [rows]="5"
    [showCurrentPageReport]="true"
    [tableStyle]="{ 'min-width': '50rem' }"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
    [rowsPerPageOptions]="[10, 25, 50]"
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
        <p-button type="button" icon="pi pi-plus" styleClass="p-button-text"></p-button>
    </ng-template>
    <ng-template pTemplate="paginatorright">
        <p-button type="button" icon="pi pi-cloud" styleClass="p-button-text"></p-button>
    </ng-template>
</p-table>`,
        html: `
<div class="card">
    <p-table
        [value]="customers"
        [paginator]="true"
        [rows]="5"
        [showCurrentPageReport]="true"
        [tableStyle]="{ 'min-width': '50rem' }"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        [rowsPerPageOptions]="[10, 25, 50]"
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
            <p-button type="button" icon="pi pi-plus" styleClass="p-button-text"></p-button>
        </ng-template>
        <ng-template pTemplate="paginatorright">
            <p-button type="button" icon="pi pi-cloud" styleClass="p-button-text"></p-button>
        </ng-template>
    </p-table>
</div>`,
        typescript: `
import { Component } from '@angular/core';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';

@Component({
    selector: 'table-paginator-basic-demo',
    templateUrl: 'table-paginator-basic-demo.html'
})
export class TablePaginatorBasicDemo {
    customers!: Customer[];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => (this.customers = customers));
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
