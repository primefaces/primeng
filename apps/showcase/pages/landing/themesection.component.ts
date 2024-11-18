import { AppComponent } from '@/components/layout/app.component';
import { Customer } from '@/domain/customer';
import { AppConfigService } from '@/service/appconfigservice';
import { CustomerService } from '@/service/customerservice';
import { CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBar } from 'primeng/progressbar';
import { Table } from 'primeng/table';
import { Tag } from 'primeng/tag';

@Component({
    selector: 'theme-section',
    standalone: true,
    imports: [CommonModule, Table, ButtonModule, Tag, ProgressBar, InputTextModule, IconField, InputIcon],
    template: `
        <section class="landing-themes py-20">
            <div class="section-header">Components</div>
            <p class="section-detail">The most complete UI component library for Angular based on a design-agnostic infrastructure.</p>
            <div class="themes-main flex mt-16 justify-center px-8 lg:px-20">
                <div class="box overflow-hidden z-10 p-8 table-container">
                    <p-table #dt [value]="customers" [(selection)]="selectedCustomers" dataKey="id" [rowHover]="true" [rows]="5" [loading]="loading" [paginator]="true" [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']">
                        <ng-template #caption>
                            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <span class="text-xl font-bold">Customers</span>
                                <p-iconfield class="mt-4 sm:mt-0 w-full sm:w-auto">
                                    <p-inputicon>
                                        <i class="pi pi-search"></i>
                                    </p-inputicon>
                                    <input class="w-full" pInputText type="text" (input)="dt.filterGlobal($event.target.value, 'contains')" placeholder="Search" />
                                </p-iconfield>
                            </div>
                        </ng-template>
                        <ng-template #header>
                            <tr>
                                <th style="width: 3rem">
                                    <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
                                </th>
                                <th pSortableColumn="name">
                                    <div class="flex justify-content-between align-items-center gap-2">
                                        Name
                                        <p-sortIcon field="name"></p-sortIcon>
                                    </div>
                                </th>
                                <th pSortableColumn="country.name">
                                    <div class="flex justify-content-between align-items-center gap-2">
                                        Country
                                        <p-sortIcon field="country.name"></p-sortIcon>
                                    </div>
                                </th>
                                <th pSortableColumn="representative.name">
                                    <div class="flex justify-content-between align-items-center gap-2">
                                        Agent
                                        <p-sortIcon field="representative.name"></p-sortIcon>
                                    </div>
                                </th>
                                <th pSortableColumn="date">
                                    <div class="flex justify-content-between align-items-center gap-2">
                                        Date
                                        <p-sortIcon field="date"></p-sortIcon>
                                    </div>
                                </th>
                                <th pSortableColumn="balance">
                                    <div class="flex justify-content-between align-items-center gap-2">
                                        Balance
                                        <p-sortIcon field="balance"></p-sortIcon>
                                    </div>
                                </th>
                                <th pSortableColumn="status">
                                    <div class="flex justify-content-between align-items-center gap-2">
                                        Status
                                        <p-sortIcon field="status"></p-sortIcon>
                                    </div>
                                </th>
                                <th pSortableColumn="activity">
                                    <div class="flex justify-content-between align-items-center gap-2">
                                        Activity
                                        <p-sortIcon field="activity"></p-sortIcon>
                                    </div>
                                </th>
                                <th style="width: 8rem"></th>
                            </tr>
                        </ng-template>
                        <ng-template #body let-customer>
                            <tr class="p-selectable-row">
                                <td>
                                    <p-tableCheckbox [value]="customer"></p-tableCheckbox>
                                </td>
                                <td style="width: 14%; min-width: 14rem">
                                    {{ customer.name }}
                                </td>
                                <td style="width: 14%; min-width: 14rem">
                                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" width="30" height="20" alt="country flag" />
                                    <span class="ml-2 image-text">{{ customer.country.name }}</span>
                                </td>
                                <td style="width: 14%; min-width: 14rem">
                                    <div class="flex items-center gap-2">
                                        <img
                                            [alt]="customer.representative.name"
                                            src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}"
                                            width="32"
                                            height="32"
                                            style="vertical-align: middle"
                                            alt="representative"
                                        />
                                        <span class="ml-2 image-text">{{ customer.representative.name }}</span>
                                    </div>
                                </td>
                                <td style="width: 14%; min-width: 8rem">
                                    {{ customer.date | date: 'MM/dd/yyyy' }}
                                </td>
                                <td style="width: 14%; min-width: 8rem">
                                    {{ customer.balance | currency: 'USD' : 'symbol' }}
                                </td>
                                <td style="width: 14%; min-width: 10rem">
                                    <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" styleClass="text-sm font-bold"></p-tag>
                                </td>
                                <td style="width: 14%; min-width: 6rem">
                                    <p-progressbar [value]="customer.activity" [showValue]="false" [style]="{ height: '6px' }"></p-progressbar>
                                </td>
                                <td style="text-align: center">
                                    <button pButton type="button" class="p-button-text p-button-icon-only" icon="pi pi-cog"></button>
                                </td>
                            </tr>
                        </ng-template>
                        <ng-template #emptymessage>
                            <tr>
                                <td colspan="8">No customers found.</td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div>
            </div>
        </section>
    `
})
export class ThemeSectionComponent {
    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private customerService: CustomerService,
        private configService: AppConfigService,
        public app: AppComponent
    ) {}

    @ViewChild('dt') table: Table;

    customers: Customer[];

    selectedCustomers: Customer[];

    loading: boolean = true;

    get isDarkMode() {
        return this.configService.appState().darkTheme;
    }

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers = customers;
            this.loading = false;
        });
    }

    getSeverity(status) {
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
}
