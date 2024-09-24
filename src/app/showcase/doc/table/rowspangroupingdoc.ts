import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Code } from '@domain/code';
import { Customer } from '@domain/customer';
import { CustomerService } from '@service/customerservice';

@Component({
    selector: 'rowspan-grouping-doc',
    template: ` <app-docsectiontext>
            <p>When <i>rowGroupMode</i> is configured to be <i>rowspan</i>, the grouping column spans multiple rows.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table [value]="customers" rowGroupMode="rowspan" groupRowsBy="representative.name" sortField="representative.name" sortMode="single" [tableStyle]="{ 'min-width': '75rem' }">
                    <ng-template pTemplate="header">
                        <tr>
                            <th style="width:3rem">#</th>
                            <th>Representative</th>
                            <th>Name</th>
                            <th>Country</th>
                            <th>Company</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-customer let-rowIndex="rowIndex" let-rowgroup="rowgroup" let-rowspan="rowspan">
                        <tr>
                            <td>{{ rowIndex }}</td>
                            <td *ngIf="rowgroup" [attr.rowspan]="rowspan">
                                <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                                <span class="font-bold ml-2">{{ customer.representative.name }}</span>
                            </td>
                            <td>
                                {{ customer.name }}
                            </td>
                            <td>
                                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                                <span class="ml-1 vertical-align-middle">{{ customer.country.name }}</span>
                            </td>
                            <td>
                                {{ customer.company }}
                            </td>
                            <td>
                                <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
                            </td>
                            <td>
                                {{ customer.date }}
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="table-rowspan-grouping-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowspanGroupingDoc {
    customers!: Customer[];

    constructor(
        private customerService: CustomerService,
        private cd: ChangeDetectorRef
    ) {}

    loadDemoData() {
        this.customerService.getCustomersMedium().then((data) => {
            this.customers = data;
            this.cd.markForCheck();
        });
    }

    calculateCustomerTotal(name: string) {
        let total = 0;

        if (this.customers) {
            for (let customer of this.customers) {
                if (customer.representative?.name === name) {
                    total++;
                }
            }
        }

        return total;
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
    [value]="customers" 
    rowGroupMode="rowspan" 
    groupRowsBy="representative.name" 
    sortField="representative.name" 
    sortMode="single"  
    [tableStyle]="{'min-width': '75rem'}">
        <ng-template pTemplate="header">
            <tr>
                <th style="width:3rem">#</th>
                <th>Representative</th>
                <th>Name</th>
                <th>Country</th>
                <th>Company</th>
                <th>Status</th>
                <th>Date</th>
            </tr>
        </ng-template>
        <ng-template 
            pTemplate="body"
            let-customer 
            let-rowIndex="rowIndex" 
            let-rowgroup="rowgroup" 
            let-rowspan="rowspan">
                <tr>
                    <td>{{rowIndex}}</td>
                    <td *ngIf="rowgroup" [attr.rowspan]="rowspan">
                        <img 
                            [alt]="customer.representative.name"
                            src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{customer.representative.image}}" 
                            width="32" 
                            style="vertical-align: middle" />
                        <span class="font-bold ml-2">{{customer.representative.name}}</span>
                    </td>
                    <td>
                        {{customer.name}}
                    </td>
                    <td>
                        <img 
                            src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" 
                            [class]="'flag flag-' + customer.country.code" 
                            style="width: 20px" />
                        <span class="ml-1 vertical-align-middle">{{customer.country.name}}</span>
                    </td>
                    <td>
                        {{customer.company}}
                    </td>
                    <td>
                        <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
                    </td>
                    <td>
                        {{customer.date}}
                    </td>
                </tr>
        </ng-template>
</p-table>`,
        html: `<div class="card">
    <p-table 
        [value]="customers" 
        rowGroupMode="rowspan" 
        groupRowsBy="representative.name" 
        sortField="representative.name" 
        sortMode="single" 
        [tableStyle]="{'min-width': '75rem'}">
            <ng-template pTemplate="header">
                <tr>
                    <th style="width:3rem">#</th>
                    <th>Representative</th>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th>Date</th>
                </tr>
            </ng-template>
            <ng-template 
                pTemplate="body" 
                let-customer 
                let-rowIndex="rowIndex" 
                let-rowgroup="rowgroup" 
                let-rowspan="rowspan">
                    <tr>
                        <td>{{rowIndex}}</td>
                        <td *ngIf="rowgroup" [attr.rowspan]="rowspan">
                            <img 
                                [alt]="customer.representative.name" 
                                src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{customer.representative.image}}" 
                                width="32" style="vertical-align: middle" />
                            <span class="font-bold ml-2">{{customer.representative.name}}</span>
                        </td>
                        <td>
                            {{customer.name}}
                        </td>
                        <td>
                            <img 
                                src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" 
                                [class]="'flag flag-' + customer.country.code" 
                                style="width: 20px" />
                            <span class="ml-1 vertical-align-middle">{{customer.country.name}}</span>
                        </td>
                        <td>
                            {{customer.company}}
                        </td>
                        <td>
                            <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
                        </td>
                        <td>
                            {{customer.date}}
                        </td>
                    </tr>
            </ng-template>
    </p-table>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { Customer } from '@domain/customer';
import { CustomerService } from '@service/customerservice';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'table-rowspan-grouping-demo',
    templateUrl: 'table-rowspan-grouping-demo.html',
    standalone: true,
    imports: [TableModule, HttpClientModule, TagModule, CommonModule],
    providers: [CustomerService]
})
export class TableRowspanGroupingDemo implements OnInit{
    customers!: Customer[];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersMedium().then((data) => {
            this.customers = data;
        });
    }

    calculateCustomerTotal(name: string) {
        let total = 0;

        if (this.customers) {
            for (let customer of this.customers) {
                if (customer.representative?.name === name) {
                    total++;
                }
            }
        }

        return total;
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
