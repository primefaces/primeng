import { Customer } from '@/domain/customer';
import { CustomerService } from '@/service/customerservice';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { DeferredDemo } from '@/components/demo/deferreddemo';

@Component({
    selector: 'paginatorprogrammatic-doc',
    standalone: true,
    imports: [TableModule, ButtonModule, AppDocSectionText, AppCode, DeferredDemo],
    template: `
        <app-docsectiontext>
            <p>Paginator can also be controlled via model using a binding to the <i>first</i> property where changes trigger a pagination.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <div class="mb-4 flex gap-1">
                    <p-button type="button" icon="pi pi-chevron-left" (click)="prev()" [disabled]="isFirstPage()" text />
                    <p-button type="button" icon="pi pi-refresh" (click)="reset()" text />
                    <p-button type="button" icon="pi pi-chevron-right" (click)="next()" [disabled]="isLastPage()" text />
                </div>
                <p-table
                    [value]="customers"
                    [paginator]="true"
                    [rows]="rows"
                    [showCurrentPageReport]="true"
                    [first]="first"
                    [tableStyle]="{ 'min-width': '50rem' }"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    (onPage)="pageChange($event)"
                    [rowsPerPageOptions]="[10, 25, 50]"
                >
                    <ng-template #header>
                        <tr>
                            <th style="width:25%">Name</th>
                            <th style="width:25%">Country</th>
                            <th style="width:25%">Company</th>
                            <th style="width:25%">Representative</th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-customer>
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
        <app-code [extFiles]="extFiles"></app-code>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorProgrammaticDoc {
    customers!: Customer[];

    first = 0;

    rows = 10;

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

    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    pageChange(event) {
        this.first = event.first;
        this.rows = event.rows;
    }

    isLastPage(): boolean {
        return this.customers ? this.first + this.rows >= this.customers.length : true;
    }

    isFirstPage(): boolean {
        return this.customers ? this.first === 0 : true;
    }

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
