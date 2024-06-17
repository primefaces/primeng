import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'column-group-doc',
    template: ` <app-docsectiontext>
            <p>Columns can be grouped using rowspan and <i>colspan</i> properties.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table [value]="sales" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template pTemplate="header">
                        <tr>
                            <th rowspan="3">Product</th>
                            <th colspan="4">Sale Rate</th>
                        </tr>
                        <tr>
                            <th colspan="2">Sales</th>
                            <th colspan="2">Profits</th>
                        </tr>
                        <tr>
                            <th>Last Year</th>
                            <th>This Year</th>
                            <th>Last Year</th>
                            <th>This Year</th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-sale>
                        <tr>
                            <td>{{ sale.product }}</td>
                            <td>{{ sale.lastYearSale }}%</td>
                            <td>{{ sale.thisYearSale }}%</td>
                            <td>{{ sale.lastYearProfit | currency: 'USD' }}</td>
                            <td>{{ sale.thisYearProfit | currency: 'USD' }}</td>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="footer">
                        <tr>
                            <td colspan="3" class="text-right">Totals</td>
                            <td>{{ lastYearTotal | currency: 'USD' }}</td>
                            <td>{{ thisYearTotal | currency: 'USD' }}</td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="table-column-group-demo"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnGroupDoc {
    sales!: any[];

    lastYearTotal!: number;

    thisYearTotal!: number;

    constructor(private cd: ChangeDetectorRef) {}

    loadDemoData() {
        this.sales = [
            { product: 'Bamboo Watch', lastYearSale: 51, thisYearSale: 40, lastYearProfit: 54406, thisYearProfit: 43342 },
            { product: 'Black Watch', lastYearSale: 83, thisYearSale: 9, lastYearProfit: 423132, thisYearProfit: 312122 },
            { product: 'Blue Band', lastYearSale: 38, thisYearSale: 5, lastYearProfit: 12321, thisYearProfit: 8500 },
            { product: 'Blue T-Shirt', lastYearSale: 49, thisYearSale: 22, lastYearProfit: 745232, thisYearProfit: 65323 },
            { product: 'Brown Purse', lastYearSale: 17, thisYearSale: 79, lastYearProfit: 643242, thisYearProfit: 500332 },
            { product: 'Chakra Bracelet', lastYearSale: 52, thisYearSale: 65, lastYearProfit: 421132, thisYearProfit: 150005 },
            { product: 'Galaxy Earrings', lastYearSale: 82, thisYearSale: 12, lastYearProfit: 131211, thisYearProfit: 100214 },
            { product: 'Game Controller', lastYearSale: 44, thisYearSale: 45, lastYearProfit: 66442, thisYearProfit: 53322 },
            { product: 'Gaming Set', lastYearSale: 90, thisYearSale: 56, lastYearProfit: 765442, thisYearProfit: 296232 },
            { product: 'Gold Phone Case', lastYearSale: 75, thisYearSale: 54, lastYearProfit: 21212, thisYearProfit: 12533 }
        ];

        this.calculateLastYearTotal();
        this.calculateThisYearTotal();

        this.cd.markForCheck();
    }

    calculateLastYearTotal() {
        let total = 0;
        for (let sale of this.sales) {
            total += sale.lastYearProfit;
        }

        this.lastYearTotal = total;
    }

    calculateThisYearTotal() {
        let total = 0;
        for (let sale of this.sales) {
            total += sale.thisYearProfit;
        }

        this.thisYearTotal = total;
    }

    code: Code = {
        basic: `<p-table [value]="sales" [tableStyle]="{'min-width': '50rem'}">
    <ng-template pTemplate="header">
        <tr>
            <th rowspan="3">Product</th>
            <th colspan="4">Sale Rate</th>
        </tr>
        <tr>
            <th colspan="2">Sales</th>
            <th colspan="2">Profits</th>
        </tr>
        <tr>
            <th>Last Year</th>
            <th>This Year</th>
            <th>Last Year</th>
            <th>This Year</th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-sale>
        <tr>
            <td>{{sale.product}}</td>
            <td>{{sale.lastYearSale}}%</td>
            <td>{{sale.thisYearSale}}%</td>
            <td>{{sale.lastYearProfit | currency: 'USD'}}</td>
            <td>{{sale.thisYearProfit | currency: 'USD'}}</td>
        </tr>
    </ng-template>
    <ng-template pTemplate="footer">
        <tr>
            <td colspan="3" class="text-right">Totals</td>
            <td>{{lastYearTotal | currency: 'USD'}}</td>
            <td>{{thisYearTotal | currency: 'USD'}}</td>
        </tr>
    </ng-template>
</p-table>`,
        html: `<div class="card">
    <p-table [value]="sales" [tableStyle]="{'min-width': '50rem'}">
        <ng-template pTemplate="header">
            <tr>
                <th rowspan="3">Product</th>
                <th colspan="4">Sale Rate</th>
            </tr>
            <tr>
                <th colspan="2">Sales</th>
                <th colspan="2">Profits</th>
            </tr>
            <tr>
                <th>Last Year</th>
                <th>This Year</th>
                <th>Last Year</th>
                <th>This Year</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-sale>
            <tr>
                <td>{{sale.product}}</td>
                <td>{{sale.lastYearSale}}%</td>
                <td>{{sale.thisYearSale}}%</td>
                <td>{{sale.lastYearProfit | currency: 'USD'}}</td>
                <td>{{sale.thisYearProfit | currency: 'USD'}}</td>
            </tr>
        </ng-template>
        <ng-template pTemplate="footer">
            <tr>
                <td colspan="3" class="text-right">Totals</td>
                <td>{{lastYearTotal | currency: 'USD'}}</td>
                <td>{{thisYearTotal | currency: 'USD'}}</td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'table-column-group-demo',
    templateUrl: 'table-column-group-demo.html',
    standalone: true,
    imports: [TableModule, CommonModule]
})
export class TableColumnGroupDemo implements OnInit {
    sales!: any[];

    lastYearTotal!: number;

    thisYearTotal!: number;

    ngOnInit() {
        this.sales = [
            { product: 'Bamboo Watch', lastYearSale: 51, thisYearSale: 40, lastYearProfit: 54406, thisYearProfit: 43342 },
            { product: 'Black Watch', lastYearSale: 83, thisYearSale: 9, lastYearProfit: 423132, thisYearProfit: 312122 },
            { product: 'Blue Band', lastYearSale: 38, thisYearSale: 5, lastYearProfit: 12321, thisYearProfit: 8500 },
            { product: 'Blue T-Shirt', lastYearSale: 49, thisYearSale: 22, lastYearProfit: 745232, thisYearProfit: 65323 },
            { product: 'Brown Purse', lastYearSale: 17, thisYearSale: 79, lastYearProfit: 643242, thisYearProfit: 500332 },
            { product: 'Chakra Bracelet', lastYearSale: 52, thisYearSale: 65, lastYearProfit: 421132, thisYearProfit: 150005 },
            { product: 'Galaxy Earrings', lastYearSale: 82, thisYearSale: 12, lastYearProfit: 131211, thisYearProfit: 100214 },
            { product: 'Game Controller', lastYearSale: 44, thisYearSale: 45, lastYearProfit: 66442, thisYearProfit: 53322 },
            { product: 'Gaming Set', lastYearSale: 90, thisYearSale: 56, lastYearProfit: 765442, thisYearProfit: 296232 },
            { product: 'Gold Phone Case', lastYearSale: 75, thisYearSale: 54, lastYearProfit: 21212, thisYearProfit: 12533 }
        ];

        this.calculateLastYearTotal();
        this.calculateThisYearTotal();
    }

    calculateLastYearTotal() {
        let total = 0;
        for (let sale of this.sales) {
            total += sale.lastYearProfit;
        }

        this.lastYearTotal = total;
    }

    calculateThisYearTotal() {
        let total = 0;
        for (let sale of this.sales) {
            total += sale.thisYearProfit;
        }

        this.thisYearTotal = total;
    }
}`,
        data: `{
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
},
...`
    };
}
