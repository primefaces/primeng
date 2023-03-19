import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';

@Component({
    selector: 'table-flexible-scroll-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id" [level]="3">
            <p>
                Flex scroll feature makes the scrollable viewport section dynamic instead of a fixed value so that it can grow or shrink relative to the parent size of the table. Click the button below to display a maximizable Dialog where data
                viewport adjusts itself according to the size changes.
            </p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex justify-content-center">
                <button type="button" (click)="showDialog()" pButton icon="pi pi-external-link" label="View"></button>
            </div>
            <p-dialog header="Header" [resizable]="false" [modal]="true" [maximizable]="true" appendTo="body" [(visible)]="dialogVisible" [style]="{ width: '75vw' }" [contentStyle]="{ height: '300px' }">
                <p-table [value]="customers" [scrollable]="true" scrollHeight="flex" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template pTemplate="header">
                        <tr>
                            <th>Name</th>
                            <th>Country</th>
                            <th>Company</th>
                            <th>Representative</th>
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
                <ng-template pTemplate="footer">
                    <button type="button" pButton pRipple icon="pi pi-times" (click)="dialogVisible = false" label="Dismiss" class="p-button-text"></button>
                </ng-template>
            </p-dialog>
        </div>
        <app-code [code]="code" selector="table-flexible-scroll-demo" [extFiles]="extFiles"></app-code>
    </section>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableFlexibleScrollDemo implements OnInit {
    @Input() id: string;

    @Input() title: string;

    customers: Customer[];

    dialogVisible: boolean;

    constructor(private customerService: CustomerService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.customerService.getCustomersMedium().then((data) => {
            this.customers = data;
        });
    }

    showDialog() {
        this.dialogVisible = true;
    }

    code: Code = {
        basic: `
<div class="flex justify-content-center">
    <button type="button" (click)="showDialog()" pButton icon="pi pi-external-link" label="View"></button>
</div>
<p-dialog header="Header" [resizable]="false" [modal]="true" [maximizable]="true" appendTo="body" [(visible)]="dialogVisible" [style]="{width: '75vw'}" [contentStyle]="{height: '300px'}">
    <p-table [value]="customers" [scrollable]="true" scrollHeight="flex" [tableStyle]="{'min-width': '50rem'}">
        <ng-template pTemplate="header">
            <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Company</th>
                <th>Representative</th>
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
    </p-table>
    <ng-template pTemplate="footer">
        <button type="button" pButton pRipple icon="pi pi-times" (click)="dialogVisible=false" label="Dismiss" class="p-button-text"></button>
    </ng-template>
</p-dialog>`,
        html: `
<div class="card">
    <div class="flex justify-content-center">
        <button type="button" (click)="showDialog()" pButton icon="pi pi-external-link" label="View"></button>
    </div>
    <p-dialog header="Header" [resizable]="false" [modal]="true" [maximizable]="true" appendTo="body" [(visible)]="dialogVisible" [style]="{width: '75vw'}" [contentStyle]="{height: '300px'}">
        <p-table [value]="customers" [scrollable]="true" scrollHeight="flex" [tableStyle]="{'min-width': '50rem'}">
            <ng-template pTemplate="header">
                <tr>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Company</th>
                    <th>Representative</th>
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
        </p-table>
        <ng-template pTemplate="footer">
            <button type="button" pButton pRipple icon="pi pi-times" (click)="dialogVisible=false" label="Dismiss" class="p-button-text"></button>
        </ng-template>
    </p-dialog>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';

@Component({
    selector: 'table-flexible-scroll-demo',
    templateUrl: 'table-flexible-scroll-demo.html'
})
export class TableFlexibleScrollDemo implements OnInit{
    customers: Customer[];

    dialogVisible: boolean;

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersMedium().then((data) => {
            this.customers = data;
        });
    }

    showDialog() {
        this.dialogVisible = true;
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
