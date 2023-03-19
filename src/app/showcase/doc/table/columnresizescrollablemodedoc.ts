import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';

@Component({
    selector: 'table-column-resize-scrollable-mode-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id" [level]="3"></app-docsectiontext>
        <div class="card">
            <p-table [value]="customers" [scrollable]="true" scrollHeight="400px" [resizableColumns]="true" styleClass="p-datatable-gridlines" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template pTemplate="header">
                    <tr>
                        <th pResizableColumn>Name</th>
                        <th pResizableColumn>Country</th>
                        <th pResizableColumn>Company</th>
                        <th pResizableColumn>Representative</th>
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
            </p-table>
        </div>
        <app-code [code]="code" selector="table-column-resize-scrollable-mode-demo" [extFiles]="extFiles"></app-code>
    </section>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableColumnResizeScrollableModeDemo implements OnInit {
    @Input() id: string;

    @Input() title: string;

    customers: Customer[];

    constructor(private customerService: CustomerService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers = customers;
            this.cd.markForCheck();
        });
    }

    code: Code = {
        basic: `
<p-table [value]="customers" [scrollable]="true" scrollHeight="400px" [resizableColumns]="true" styleClass="p-datatable-gridlines" [tableStyle]="{'min-width': '50rem'}">
    <ng-template pTemplate="header">
        <tr>
            <th pResizableColumn>Name</th>
            <th pResizableColumn>Country</th>
            <th pResizableColumn>Company</th>
            <th pResizableColumn>Representative</th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-customer>
        <tr>
            <td>{{customer.name}}</td>
            <td>{{customer.country.name}}</td>
            <td>{{customer.company}}</td>
            <td>{{customer.representative.name}}</td>
        </tr>
    </ng-template>
</p-table>`,
        html: `
<p-table [value]="customers" [scrollable]="true" scrollHeight="400px" [resizableColumns]="true" styleClass="p-datatable-gridlines" [tableStyle]="{'min-width': '50rem'}">
    <ng-template pTemplate="header">
        <tr>
            <th pResizableColumn>Name</th>
            <th pResizableColumn>Country</th>
            <th pResizableColumn>Company</th>
            <th pResizableColumn>Representative</th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-customer>
        <tr>
            <td>{{customer.name}}</td>
            <td>{{customer.country.name}}</td>
            <td>{{customer.company}}</td>
            <td>{{customer.representative.name}}</td>
        </tr>
    </ng-template>
</p-table>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';

@Component({
    selector: 'table-column-resize-scrollable-mode-demo',
    templateUrl: 'table-column-resize-scrollable-mode-demo.html'
})
export class TableColumnResizeScrollableModeDemo implements OnInit{
    customers: Customer[];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => (this.customers = customers));
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
