import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Customer } from '@domain/customer';
import { AppComponent } from '../../layout/app.component';
import { AppConfigService } from '@service/appconfigservice';
import { CustomerService } from '@service/customerservice';
import { Subscription } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
    selector: 'theme-section',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        TagModule,
        ProgressBarModule,
        InputTextModule,
        IconFieldModule,
        InputIconModule,
    ],
    template: `
        <section class="landing-themes py-20">
            <div class="section-header">Components</div>
            <p class="section-detail">
                The most complete UI component library for Angular based on a design-agnostic infrastructure.
            </p>
            <div
                class="themes-main flex mt-16 justify-center px-20 lg:px-20"
                [style]="{ 'background-size': 'cover' }"
                [ngStyle]="{
                    'background-image': isDarkMode
                        ? 'url(https://primefaces.org/cdn/primeng/images/landing/wave-dark-alt-gray.svg)'
                        : 'url(https://primefaces.org/cdn/primeng/images/landing/wave-light-alt-gray.svg)'
                }"
            >
                <div class="box overflow-hidden z-10 p-20 table-container">
                    <p-table
                        #dt
                        [value]="customers"
                        [(selection)]="selectedCustomers"
                        dataKey="id"
                        [rowHover]="true"
                        [rows]="5"
                        [loading]="loading"
                        [paginator]="true"
                        [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
                    >
                        <ng-template pTemplate="caption">
                            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <span class="text-xl font-bold">Customers</span>
                                <p-iconField class="mt-6 sm:mt-0 w-full sm:w-auto">
                                    <p-inputIcon>
                                        <i class="pi pi-search"></i>
                                    </p-inputIcon>
                                    <input
                                        class="w-full"
                                        pInputText
                                        type="text"
                                        (input)="dt.filterGlobal($event.target.value, 'contains')"
                                        placeholder="Search"
                                    />
                                </p-iconField>
                            </div>
                        </ng-template>
                        <ng-template pTemplate="header">
                            <tr>
                                <th style="width: 3rem">
                                    <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
                                </th>
                                <th pSortableColumn="name">
                                    <div class="flex justify-between items-center">
                                        Name
                                        <p-sortIcon field="name"></p-sortIcon>
                                    </div>
                                </th>
                                <th pSortableColumn="country.name">
                                    <div class="flex justify-between items-center">
                                        Country
                                        <p-sortIcon field="country.name"></p-sortIcon>
                                    </div>
                                </th>
                                <th pSortableColumn="representative.name">
                                    <div class="flex justify-between items-center">
                                        Agent
                                        <p-sortIcon field="representative.name"></p-sortIcon>
                                    </div>
                                </th>
                                <th pSortableColumn="date">
                                    <div class="flex justify-between items-center">
                                        Date
                                        <p-sortIcon field="date"></p-sortIcon>
                                    </div>
                                </th>
                                <th pSortableColumn="balance">
                                    <div class="flex justify-between items-center">
                                        Balance
                                        <p-sortIcon field="balance"></p-sortIcon>
                                    </div>
                                </th>
                                <th pSortableColumn="status">
                                    <div class="flex justify-between items-center">
                                        Status
                                        <p-sortIcon field="status"></p-sortIcon>
                                    </div>
                                </th>
                                <th pSortableColumn="activity">
                                    <div class="flex justify-between items-center">
                                        Activity
                                        <p-sortIcon field="activity"></p-sortIcon>
                                    </div>
                                </th>
                                <th style="width: 8rem"></th>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-customer>
                            <tr class="p-selectable-row">
                                <td>
                                    <p-tableCheckbox [value]="customer"></p-tableCheckbox>
                                </td>
                                <td style="width: 14%; min-width: 14rem">
                                    {{ customer.name }}
                                </td>
                                <td style="width: 14%; min-width: 14rem">
                                    <img
                                        src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png"
                                        [class]="'flag flag-' + customer.country.code"
                                        width="30"
                                        height="20"
                                        alt="country flag"
                                    />
                                    <span class="ml-2 image-text">{{ customer.country.name }}</span>
                                </td>
                                <td style="width: 14%; min-width: 14rem">
                                    <div class="flex items-center gap-2">
                                        <img
                                            [alt]="customer.representative.name"
                                            src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{
                                                customer.representative.image
                                            }}"
                                            width="32"
                                            height="32"
                                            style="vertical-align: middle"
                                            alt="representative"
                                        />
                                        <span class="ml-2 image-text">{{ customer.representative.name }}</span>
                                    </div>
                                </td>
                                <td style="width: 14%; min-width: 8rem">
                                    {{ customer.date | date : 'MM/dd/yyyy' }}
                                </td>
                                <td style="width: 14%; min-width: 8rem">
                                    {{ customer.balance | currency : 'USD' : 'symbol' }}
                                </td>
                                <td style="width: 14%; min-width: 10rem">
                                    <p-tag
                                        [value]="customer.status"
                                        [severity]="getSeverity(customer.status)"
                                        styleClass="text-sm font-bold"
                                    ></p-tag>
                                </td>
                                <td style="width: 14%; min-width: 6rem">
                                    <p-progressBar
                                        [value]="customer.activity"
                                        [showValue]="false"
                                        [style]="{ height: '6px' }"
                                    ></p-progressBar>
                                </td>
                                <td style="text-align: center">
                                    <button
                                        pButton
                                        type="button"
                                        class="p-button-text p-button-icon-only"
                                        icon="pi pi-cog"
                                    ></button>
                                </td>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="emptymessage">
                            <tr>
                                <td colspan="8">No customers found.</td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div>
            </div>
        </section>
    `,
})
export class ThemeSectionComponent {
    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private customerService: CustomerService,
        private configService: AppConfigService,
        public app: AppComponent,
    ) {}

    @ViewChild('dt') table: Table;

    get tableTheme() {
        return this.configService.config().tableTheme;
    }
    set tableTheme(value: string) {
        this.configService.config.update((config) => ({ ...config, tableTheme: value }));
    }

    customers: Customer[];

    selectedCustomers: Customer[];

    loading: boolean = true;

    get isDarkMode() {
        return this.configService.config().darkMode;
    }

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers = customers;
            this.loading = false;
        });
    }

    changeTableTheme(value: string) {
        this.tableTheme = value;
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
