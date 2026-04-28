import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { DeferredDemo } from '@/components/demo/deferreddemo';

@Component({
    selector: 'columngroup-doc',
    standalone: true,
    imports: [CommonModule, TableModule, AppDocSectionText, AppCode, DeferredDemo],
    template: ` <app-docsectiontext>
            <p>Columns can be grouped using rowspan and <i>colspan</i> properties.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table [value]="sales" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #header>
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
                    <ng-template #body let-sale>
                        <tr>
                            <td>{{ sale.product }}</td>
                            <td>{{ sale.lastYearSale }}%</td>
                            <td>{{ sale.thisYearSale }}%</td>
                            <td>{{ sale.lastYearProfit | currency: 'USD' }}</td>
                            <td>{{ sale.thisYearProfit | currency: 'USD' }}</td>
                        </tr>
                    </ng-template>
                    <ng-template #footer>
                        <tr>
                            <td colspan="3" class="text-right font-bold p-3 pb-0">Totals</td>
                            <td class="font-bold p-3 pb-0">{{ lastYearTotal | currency: 'USD' }}</td>
                            <td class="font-bold p-3 pb-0">{{ thisYearTotal | currency: 'USD' }}</td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnGroupDoc {
    sales!: any[];

    lastYearTotal!: number;

    thisYearTotal!: number;

    constructor(private cd: ChangeDetectorRef) {}

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

    loadDemoData() {
        this.sales = [
            {
                product: 'Bamboo Watch',
                lastYearSale: 51,
                thisYearSale: 40,
                lastYearProfit: 54406,
                thisYearProfit: 43342
            },
            {
                product: 'Black Watch',
                lastYearSale: 83,
                thisYearSale: 9,
                lastYearProfit: 423132,
                thisYearProfit: 312122
            },
            { product: 'Blue Band', lastYearSale: 38, thisYearSale: 5, lastYearProfit: 12321, thisYearProfit: 8500 },
            {
                product: 'Blue T-Shirt',
                lastYearSale: 49,
                thisYearSale: 22,
                lastYearProfit: 745232,
                thisYearProfit: 65323
            },
            {
                product: 'Brown Purse',
                lastYearSale: 17,
                thisYearSale: 79,
                lastYearProfit: 643242,
                thisYearProfit: 500332
            },
            {
                product: 'Chakra Bracelet',
                lastYearSale: 52,
                thisYearSale: 65,
                lastYearProfit: 421132,
                thisYearProfit: 150005
            },
            {
                product: 'Galaxy Earrings',
                lastYearSale: 82,
                thisYearSale: 12,
                lastYearProfit: 131211,
                thisYearProfit: 100214
            },
            {
                product: 'Game Controller',
                lastYearSale: 44,
                thisYearSale: 45,
                lastYearProfit: 66442,
                thisYearProfit: 53322
            },
            {
                product: 'Gaming Set',
                lastYearSale: 90,
                thisYearSale: 56,
                lastYearProfit: 765442,
                thisYearProfit: 296232
            },
            {
                product: 'Gold Phone Case',
                lastYearSale: 75,
                thisYearSale: 54,
                lastYearProfit: 21212,
                thisYearProfit: 12533
            }
        ];

        this.calculateLastYearTotal();
        this.calculateThisYearTotal();

        this.cd.markForCheck();
    }
}
