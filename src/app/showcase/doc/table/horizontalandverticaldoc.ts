import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';

@Component({
    selector: 'horizontal-and-vertical-scroll-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Horizontal and vertical scroll can be used together to enable double axis scrolling.</p>
        </app-docsectiontext>
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
        <app-code [code]="code" selector="table-horizontal-and-vertical-scroll-demo" [extFiles]="extFiles"></app-code>
    </section>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HorizontalAndVerticalScrollDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    customers!: Customer[];

    constructor(private customerService: CustomerService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.customerService.getCustomersMedium().then((data) => {
            this.customers = data;
            this.cd.markForCheck();
        });
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    code: Code = {
        basic: `
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
</p-table>`,
        html: `
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
        typescript: `
import { Component, OnInit } from '@angular/core';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';

@Component({
    selector: 'table-horizontal-and-vertical-scroll-demo',
    templateUrl: 'table-horizontal-and-vertical-scroll-demo.html'
})
export class TableHorizontalAndVerticalScrollDemo implements OnInit{
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
