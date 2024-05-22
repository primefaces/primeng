import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Code } from '@domain/code';
import { Customer } from '@domain/customer';
import { CustomerService } from '@service/customerservice';

@Component({
    selector: 'horizontal-scroll-doc',
    template: ` <app-docsectiontext>
            <p>Horizontal scrollbar is displayed when table width exceeds the parent width.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table [value]="customers" [scrollable]="true" scrollHeight="400px">
                    <ng-template pTemplate="header">
                        <tr>
                            <th style="min-width:100px">Id</th>
                            <th style="min-width:200px">Name</th>
                            <th style="min-width:200px">Country</th>
                            <th style="min-width:200px">Date</th>
                            <th style="min-width:200px">Balance</th>
                            <th style="min-width:200px">Company</th>
                            <th style="min-width:200px">Status</th>
                            <th style="min-width:200px">Activity</th>
                            <th style="min-width:200px">Representative</th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-customer>
                        <tr>
                            <td>{{ customer.id }}</td>
                            <td>{{ customer.name }}</td>
                            <td>{{ customer.country.name }}</td>
                            <td>{{ customer.date }}</td>
                            <td>{{ formatCurrency(customer.balance) }}</td>
                            <td>{{ customer.company }}</td>
                            <td>{{ customer.status }}</td>
                            <td>{{ customer.activity }}</td>
                            <td>{{ customer.representative.name }}</td>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="footer">
                        <tr>
                            <td>Id</td>
                            <td>Name</td>
                            <td>Country</td>
                            <td>Date</td>
                            <td>Balance</td>
                            <td>Company</td>
                            <td>Status</td>
                            <td>Activity</td>
                            <td>Representative</td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="table-horizontal-scroll-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HorizontalScrollDoc {
    customers!: Customer[];

    constructor(private customerService: CustomerService, private cd: ChangeDetectorRef) {}

    loadDemoData() {
        this.customerService.getCustomersMedium().then((data) => {
            this.customers = data;
            this.cd.markForCheck();
        });
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    code: Code = {
        basic: `<p-table [value]="customers" [scrollable]="true" scrollHeight="400px">
    <ng-template pTemplate="header">
        <tr>
            <th style="min-width:100px">Id</th>
            <th style="min-width:200px">Name</th>
            <th style="min-width:200px">Country</th>
            <th style="min-width:200px">Date</th>
            <th style="min-width:200px">Balance</th>
            <th style="min-width:200px">Company</th>
            <th style="min-width:200px">Status</th>
            <th style="min-width:200px">Activity</th>
            <th style="min-width:200px">Representative</th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-customer>
        <tr>
            <td>{{customer.id}}</td>
            <td>{{customer.name}}</td>
            <td>{{customer.country.name}}</td>
            <td>{{customer.date}}</td>
            <td>{{formatCurrency(customer.balance)}}</td>
            <td>{{customer.company}}</td>
            <td>{{customer.status}}</td>
            <td>{{customer.activity}}</td>
            <td>{{customer.representative.name}}</td>
        </tr>
    </ng-template>
    <ng-template pTemplate="footer">
        <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Country</td>
            <td>Date</td>
            <td>Balance</td>
            <td>Company</td>
            <td>Status</td>
            <td>Activity</td>
            <td>Representative</td>
        </tr>
    </ng-template>
</p-table>`,
        html: `<div class="card">
    <p-table [value]="customers" [scrollable]="true" scrollHeight="400px">
        <ng-template pTemplate="header">
            <tr>
                <th style="min-width:100px">Id</th>
                <th style="min-width:200px">Name</th>
                <th style="min-width:200px">Country</th>
                <th style="min-width:200px">Date</th>
                <th style="min-width:200px">Balance</th>
                <th style="min-width:200px">Company</th>
                <th style="min-width:200px">Status</th>
                <th style="min-width:200px">Activity</th>
                <th style="min-width:200px">Representative</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-customer>
            <tr>
                <td>{{customer.id}}</td>
                <td>{{customer.name}}</td>
                <td>{{customer.country.name}}</td>
                <td>{{customer.date}}</td>
                <td>{{formatCurrency(customer.balance)}}</td>
                <td>{{customer.company}}</td>
                <td>{{customer.status}}</td>
                <td>{{customer.activity}}</td>
                <td>{{customer.representative.name}}</td>
            </tr>
        </ng-template>
        <ng-template pTemplate="footer">
            <tr>
                <td>Id</td>
                <td>Name</td>
                <td>Country</td>
                <td>Date</td>
                <td>Balance</td>
                <td>Company</td>
                <td>Status</td>
                <td>Activity</td>
                <td>Representative</td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { Customer } from '@domain/customer';
import { CustomerService } from '@service/customerservice';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'table-horizontal-scroll-demo',
    templateUrl: 'table-horizontal-scroll-demo.html',
    standalone: true,
    imports: [TableModule, HttpClientModule],
    providers: [CustomerService]
})
export class TableHorizontalScrollDemo implements OnInit{
    customers!: Customer[];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersMedium().then((data) => {
            this.customers = data;
        });
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
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
