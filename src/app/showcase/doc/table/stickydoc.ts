import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';

@Component({
    selector: 'sticky-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>This demo uses position: sticky to implement sticky headers relative to body scroll position. Visit <a href="https://caniuse.com/css-sticky">here</a> for more information about the supported browsers.</p>
        </app-docsectiontext>
        <div class="card">
            <p-table [value]="customers">
                <ng-template pTemplate="header">
                    <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Representative</th>
                        <th>Status</th>
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
                    </tr>
                </ng-template>
            </p-table>
        </div>
        <app-code [code]="code" selector="table-sticky-demo" [extFiles]="extFiles"></app-code>
    </section>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StickyDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    customers: Customer[];

    constructor(private customerService: CustomerService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => (this.customers = customers));
    }

    code: Code = {
        basic: `
<p-table [value]="customers">
    <ng-template pTemplate="header">
        <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Representative</th>
            <th>Status</th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-customer>
        <tr>
            <td>
                {{customer.name}}
            </td>
            <td>
                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" width="30">
                <span class="image-text">{{customer.country.name}}</span>
            </td>
            <td>
                <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{customer.representative.image}}" width="32" style="vertical-align: middle" />
                <span class="image-text">{{customer.representative.name}}</span>
            </td>
            <td>
                <span [class]="'customer-badge status-' + customer.status">{{customer.status}}</span>
            </td>
        </tr>
    </ng-template>
</p-table>`,
        html: `
<div class="card">
    <p-table [value]="customers">
        <ng-template pTemplate="header">
            <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Representative</th>
                <th>Status</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-customer>
            <tr>
                <td>
                    {{customer.name}}
                </td>
                <td>
                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" width="30">
                    <span class="image-text">{{customer.country.name}}</span>
                </td>
                <td>
                    <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{customer.representative.image}}" width="32" style="vertical-align: middle" />
                    <span class="image-text">{{customer.representative.name}}</span>
                </td>
                <td>
                    <span [class]="'customer-badge status-' + customer.status">{{customer.status}}</span>
                </td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';

@Component({
    selector: 'table-sticky-demo',
    templateUrl: 'table-sticky-demo.html'
})
export class TableStickyDemo implements OnInit{
    customers: Customer[];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => (this.customers = customers));
    }
}`,
        scss: `
:host ::ng-deep .p-datatable > .p-datatable-wrapper {
    overflow: visible;
}

:host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
    position: -webkit-sticky;
    position: sticky;
    top: 5rem;
}

.layout-news-active :host ::ng-deep .p-datatable tr > th {
    top: 7rem;
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
