import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Code } from '@domain/code';
import { Customer } from '@domain/customer';
import { CustomerService } from '@service/customerservice';

@Component({
    selector: 'column-resize-scrollable-mode-doc',
    template: ` <p-deferred-demo (load)="loadDemoData()">
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
        </p-deferred-demo>
        <app-code [code]="code" selector="table-column-resize-scrollable-mode-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnResizeScrollableModeDoc {
    customers!: Customer[];

    constructor(
        private customerService: CustomerService,
        private cd: ChangeDetectorRef
    ) {}

    loadDemoData() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers = customers;
            this.cd.markForCheck();
        });
    }

    code: Code = {
        basic: `<p-table 
    [value]="customers" 
    [scrollable]="true" 
    scrollHeight="400px" 
    [resizableColumns]="true" 
    styleClass="p-datatable-gridlines" 
    [tableStyle]="{'min-width': '50rem'}">
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
        html: `<p-table 
    [value]="customers" 
    [scrollable]="true" 
    scrollHeight="400px" 
    [resizableColumns]="true" 
    styleClass="p-datatable-gridlines" 
    [tableStyle]="{'min-width': '50rem'}">
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
        typescript: `import { Component, OnInit } from '@angular/core';
import { Customer } from '@domain/customer';
import { CustomerService } from '@service/customerservice';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'table-column-resize-scrollable-mode-demo',
    templateUrl: 'table-column-resize-scrollable-mode-demo.html',
    standalone: true,
    imports: [TableModule, HttpClientModule],
    providers: [CustomerService]
})
export class TableColumnResizeScrollableModeDemo implements OnInit{
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
