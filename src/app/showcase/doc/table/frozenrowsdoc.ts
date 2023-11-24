import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';

@Component({
    selector: 'frozen-rows-doc',
    template: `
        <app-docsectiontext>
            <p>Frozen rows are used to fix certain rows while scrolling, this data is defined with the <i>frozenValue</i> property.</p>
        </app-docsectiontext>
        <div class="card">
            <p-table [value]="unlockedCustomers" [frozenValue]="lockedCustomers" [scrollable]="true" scrollHeight="400px" [tableStyle]="{ 'min-width': '60rem' }">
                <ng-template pTemplate="header">
                    <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Company</th>
                        <th>Representative</th>
                        <th style="width:5rem"></th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="frozenbody" let-customer let-index="rowIndex">
                    <tr>
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.country.name }}</td>
                        <td>{{ customer.company }}</td>
                        <td>{{ customer.representative.name }}</td>
                        <td>
                            <button pButton pRipple type="button" [icon]="'pi pi-lock-open'" (click)="toggleLock(customer, true, index)" class="p-button-sm p-button-text"></button>
                        </td>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-customer let-index="rowIndex">
                    <tr>
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.country.name }}</td>
                        <td>{{ customer.company }}</td>
                        <td>{{ customer.representative.name }}</td>
                        <td>
                            <button pButton pRipple type="button" [icon]="'pi pi-lock'" [disabled]="lockedCustomers.length >= 2" (click)="toggleLock(customer, false, index)" class="p-button-sm p-button-text"></button>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
        <app-code [code]="code" selector="table-frozen-rows-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FrozenRowsDoc implements OnInit {
    unlockedCustomers!: Customer[];

    lockedCustomers!: Customer[];

    constructor(private customerService: CustomerService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.customerService.getCustomersMedium().then((data) => {
            this.unlockedCustomers = data;
            this.cd.markForCheck();
        });

        this.lockedCustomers = [
            {
                id: 5135,
                name: 'Geraldine Bisset',
                country: {
                    name: 'France',
                    code: 'fr'
                },
                company: 'Bisset Group',
                status: 'proposal',
                date: '2019-05-05',
                activity: 0,
                representative: {
                    name: 'Amy Elsner',
                    image: 'amyelsner.png'
                }
            }
        ];
    }

    toggleLock(data: Customer, frozen: boolean, index: number) {
        if (frozen) {
            this.lockedCustomers = this.lockedCustomers.filter((c, i) => i !== index);
            this.unlockedCustomers.push(data);
        } else {
            this.unlockedCustomers = this.unlockedCustomers.filter((c, i) => i !== index);
            this.lockedCustomers.push(data);
        }

        this.unlockedCustomers.sort((val1, val2) => {
            return val1.id < val2.id ? -1 : 1;
        });
    }

    code: Code = {
        basic: `
<p-table [value]="unlockedCustomers" [frozenValue]="lockedCustomers" [scrollable]="true" scrollHeight="400px" [tableStyle]="{'min-width': '60rem'}">
    <ng-template pTemplate="header">
        <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Company</th>
            <th>Representative</th>
            <th style="width:5rem"></th>
        </tr>
    </ng-template>
    <ng-template pTemplate="frozenbody" let-customer let-index="rowIndex">
        <tr>
            <td>{{customer.name}}</td>
            <td>{{customer.country.name}}</td>
            <td>{{customer.company}}</td>
            <td>{{customer.representative.name}}</td>
            <td>
                <button pButton pRipple type="button" [icon]="'pi pi-lock-open'" (click)="toggleLock(customer,true,index)" class="p-button-sm p-button-text"></button>
            </td>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-customer let-index="rowIndex">
        <tr>
            <td>{{customer.name}}</td>
            <td>{{customer.country.name}}</td>
            <td>{{customer.company}}</td>
            <td>{{customer.representative.name}}</td>
            <td>
                <button pButton pRipple type="button" [icon]="'pi pi-lock'" [disabled]="lockedCustomers.length >= 2" (click)="toggleLock(customer,false,index)" class="p-button-sm p-button-text"></button>
            </td>
        </tr>
    </ng-template>
</p-table>`,
        html: `
<div class="card">
    <p-table [value]="unlockedCustomers" [frozenValue]="lockedCustomers" [scrollable]="true" scrollHeight="400px" [tableStyle]="{'min-width': '60rem'}">
        <ng-template pTemplate="header">
            <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Company</th>
                <th>Representative</th>
                <th style="width:5rem"></th>
            </tr>
        </ng-template>
        <ng-template pTemplate="frozenbody" let-customer let-index="rowIndex">
            <tr>
                <td>{{customer.name}}</td>
                <td>{{customer.country.name}}</td>
                <td>{{customer.company}}</td>
                <td>{{customer.representative.name}}</td>
                <td>
                    <button pButton pRipple type="button" [icon]="'pi pi-lock-open'" (click)="toggleLock(customer,true,index)" class="p-button-sm p-button-text"></button>
                </td>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-customer let-index="rowIndex">
            <tr>
                <td>{{customer.name}}</td>
                <td>{{customer.country.name}}</td>
                <td>{{customer.company}}</td>
                <td>{{customer.representative.name}}</td>
                <td>
                    <button pButton pRipple type="button" [icon]="'pi pi-lock'" [disabled]="lockedCustomers.length >= 2" (click)="toggleLock(customer,false,index)" class="p-button-sm p-button-text"></button>
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
    selector: 'table-frozen-rows-demo',
    templateUrl: 'table-frozen-rows-demo.html'
})
export class TableFrozenRowsDemo implements OnInit{
    unlockedCustomers!: Customer[];

    lockedCustomers!: Customer[];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersMedium().then((data) => (this.unlockedCustomers = data));

        this.lockedCustomers = [
            {
                id: 5135,
                name: 'Geraldine Bisset',
                country: {
                    name: 'France',
                    code: 'fr'
                },
                company: 'Bisset Group',
                status: 'proposal',
                date: '2019-05-05',
                activity: 0,
                representative: {
                    name: 'Amy Elsner',
                    image: 'amyelsner.png'
                }
            }
        ];
    }

    toggleLock(data: Customer, frozen: boolean, index: number) {
        if (frozen) {
            this.lockedCustomers = this.lockedCustomers.filter((c, i) => i !== index);
            this.unlockedCustomers.push(data);
        } else {
            this.unlockedCustomers = this.unlockedCustomers.filter((c, i) => i !== index);
            this.lockedCustomers.push(data);
        }

        this.unlockedCustomers.sort((val1, val2) => {
            return val1.id < val2.id ? -1 : 1;
        });
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
