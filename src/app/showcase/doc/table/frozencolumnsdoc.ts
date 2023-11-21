import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { Customer } from '../../domain/customer';
import { AppDocSectionTextComponent } from '../../layout/doc/app.docsectiontext.component';
import { CustomerService } from '../../service/customerservice';

@Component({
    selector: 'frozen-columns-doc',
    template: `
        <app-docsectiontext>
            <p>Certain columns can be frozen by using the <i>pFrozenColumn</i> directive of the table component. In addition, <i>alignFrozen</i> is available to define whether the column should be fixed on the left or right.</p>
        </app-docsectiontext>
        <div class="card">
            <p-toggleButton [(ngModel)]="balanceFrozen" [onIcon]="'pi pi-lock'" offIcon="pi pi-lock-open" [onLabel]="'Balance'" offLabel="Balance"></p-toggleButton>

            <p-table [value]="customers" [scrollable]="true" scrollHeight="400px" styleClass="mt-3">
                <ng-template pTemplate="header">
                    <tr>
                        <th style="min-width:200px" pFrozenColumn>Name</th>
                        <th style="min-width:100px">Id</th>
                        <th style="min-width:200px">Country</th>
                        <th style="min-width:200px">Date</th>
                        <th style="min-width:200px">Company</th>
                        <th style="min-width:200px">Status</th>
                        <th style="min-width:200px">Activity</th>
                        <th style="min-width:200px">Representative</th>
                        <th style="min-width:200px" alignFrozen="right" pFrozenColumn [frozen]="balanceFrozen">Balance</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-customer>
                    <tr>
                        <td pFrozenColumn>{{ customer.name }}</td>
                        <td style="min-width:100px">{{ customer.id }}</td>
                        <td>{{ customer.country.name }}</td>
                        <td>{{ customer.date }}</td>
                        <td>{{ customer.company }}</td>
                        <td>{{ customer.status }}</td>
                        <td>{{ customer.activity }}</td>
                        <td>{{ customer.representative.name }}</td>
                        <td alignFrozen="right" pFrozenColumn [frozen]="balanceFrozen">{{ formatCurrency(customer.balance) }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
        <app-code [code]="code" selector="table-frozen-columns-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FrozenColumnsDoc implements OnInit {
    balanceFrozen: boolean = false;

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
<p-toggleButton [(ngModel)]="balanceFrozen" [onIcon]="'pi pi-lock'" offIcon="pi pi-lock-open" [onLabel]="'Balance'" offLabel="Balance"></p-toggleButton>

<p-table [value]="customers" [scrollable]="true" scrollHeight="400px" styleClass="mt-3">
    <ng-template pTemplate="header">
        <tr>
            <th style="min-width:200px" pFrozenColumn>Name</th>
            <th style="min-width:100px">Id</th>
            <th style="min-width:200px">Country</th>
            <th style="min-width:200px">Date</th>
            <th style="min-width:200px">Company</th>
            <th style="min-width:200px">Status</th>
            <th style="min-width:200px">Activity</th>
            <th style="min-width:200px">Representative</th>
            <th style="min-width:200px" alignFrozen="right" pFrozenColumn [frozen]="balanceFrozen">Balance</th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-customer>
        <tr>
            <td pFrozenColumn>{{customer.name}}</td>
            <td style="min-width:100px">{{customer.id}}</td>
            <td>{{customer.country.name}}</td>
            <td>{{customer.date}}</td>
            <td>{{customer.company}}</td>
            <td>{{customer.status}}</td>
            <td>{{customer.activity}}</td>
            <td >{{customer.representative.name}}</td>
            <td alignFrozen="right" pFrozenColumn [frozen]="balanceFrozen">{{formatCurrency(customer.balance)}}</td>
        </tr>
    </ng-template>
</p-table>`,
        html: `
<div class="card">
    <p-toggleButton [(ngModel)]="balanceFrozen" [onIcon]="'pi pi-lock'" offIcon="pi pi-lock-open" [onLabel]="'Balance'" offLabel="Balance"></p-toggleButton>

    <p-table [value]="customers" [scrollable]="true" scrollHeight="400px" styleClass="mt-3">
        <ng-template pTemplate="header">
            <tr>
                <th style="min-width:200px" pFrozenColumn>Name</th>
                <th style="min-width:100px">Id</th>
                <th style="min-width:200px">Country</th>
                <th style="min-width:200px">Date</th>
                <th style="min-width:200px">Company</th>
                <th style="min-width:200px">Status</th>
                <th style="min-width:200px">Activity</th>
                <th style="min-width:200px">Representative</th>
                <th style="min-width:200px" alignFrozen="right" pFrozenColumn [frozen]="balanceFrozen">Balance</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-customer>
            <tr>
                <td pFrozenColumn>{{customer.name}}</td>
                <td style="min-width:100px">{{customer.id}}</td>
                <td>{{customer.country.name}}</td>
                <td>{{customer.date}}</td>
                <td>{{customer.company}}</td>
                <td>{{customer.status}}</td>
                <td>{{customer.activity}}</td>
                <td >{{customer.representative.name}}</td>
                <td alignFrozen="right" pFrozenColumn [frozen]="balanceFrozen">{{formatCurrency(customer.balance)}}</td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';

@Component({
    selector: 'table-frozen-columns-demo',
    templateUrl: 'table-frozen-columns-demo.html'
})
export class TableFrozenColumnsDemo implements OnInit{
    balanceFrozen: boolean = false;

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
        scss: `
:host ::ng-deep  .p-frozen-column {
    font-weight: bold;
}
:host ::ng-deep .p-datatable-frozen-tbody {
    font-weight: bold;
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
