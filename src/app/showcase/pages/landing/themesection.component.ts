import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';
import { AppConfigService } from '../../service/appconfigservice';
import { AppComponent } from '../../layout/app.component';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
@Component({
    selector: 'template-theme',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, TagModule],
    template: `
        <section class="landing-themes py-8">
            <div class="section-header">Themes</div>
            <p class="section-detail">Crafted on a design-agnostic infrastructure, choose from a vast amount of themes such as Material, Bootstrap, Tailwind, PrimeOne or develop your own.</p>
            <div class="flex flex-wrap justify-content-center">
                <button type="button" class="font-medium linkbox mr-3 mt-4" [ngClass]="{ active: tableTheme.startsWith('lara') }" (click)="changeTableTheme(isDarkMode ? 'lara-dark-blue' : 'lara-light-blue')">PrimeOne</button>
                <button type="button" class="font-medium linkbox mr-3 mt-4" [ngClass]="{ active: tableTheme.startsWith('md') }" (click)="changeTableTheme(isDarkMode ? 'md-dark-indigo' : 'md-light-indigo')">Material</button>
                <button type="button" class="font-medium linkbox mr-3 mt-4" [ngClass]="{ active: tableTheme.startsWith('bootstrap') }" (click)="changeTableTheme(isDarkMode ? 'bootstrap4-dark-blue' : 'bootstrap4-light-blue')">Bootstrap</button>
                <a type="button" class="font-medium p-link linkbox mt-4" href="https://designer.primeng.org" target="_blank">more...</a>
            </div>
            <div
                class="themes-main flex mt-7 justify-content-center px-5 lg:px-8"
                [style]="{ 'background-size': 'cover' }"
                [ngStyle]="{ 'background-image': isDarkMode ? 'url(https://primefaces.org/cdn/primeng/images/landing/wave-dark-alt.svg)' : 'url(https://primefaces.org/cdn/primeng/images/landing/wave-light-alt.svg)' }"
            >
                <div class="box overflow-hidden z-1 p-5 table-container">
                    <p-table
                        #dt
                        [value]="customers"
                        [(selection)]="selectedCustomers"
                        dataKey="id"
                        styleClass="p-datatable-customers"
                        [rowHover]="true"
                        [rows]="5"
                        [showCurrentPageReport]="true"
                        [rowsPerPageOptions]="[5, 10, 15]"
                        [loading]="loading"
                        responsiveLayout="scroll"
                        [paginator]="true"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
                        paginatorDropdownAppendTo="body"
                        [totalRecords]="5"
                    >
                        <ng-template pTemplate="caption">
                            <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                                <h5 class="m-0">Customers</h5>
                                <span class="block mt-2 md:mt-0 p-input-icon-left">
                                    <i class="pi pi-search"></i>
                                    <input class="p-inputtext" type="text" (input)="dt.filterGlobal($event.target.value, 'contains')" placeholder="Search..." />
                                </span>
                            </div>
                        </ng-template>
                        <ng-template pTemplate="header">
                            <tr>
                                <th style="width: 3rem">
                                    <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
                                </th>
                                <th pSortableColumn="name">
                                    <div class="flex justify-content-between align-items-center">
                                        Name
                                        <p-sortIcon field="name"></p-sortIcon>
                                    </div>
                                </th>
                                <th pSortableColumn="country.name">
                                    <div class="flex justify-content-between align-items-center">
                                        Country
                                        <p-sortIcon field="country.name"></p-sortIcon>
                                    </div>
                                </th>
                                <th pSortableColumn="representative.name">
                                    <div class="flex justify-content-between align-items-center">
                                        Agent
                                        <p-sortIcon field="representative.name"></p-sortIcon>
                                    </div>
                                </th>
                                <th pSortableColumn="date">
                                    <div class="flex justify-content-between align-items-center">
                                        Date
                                        <p-sortIcon field="date"></p-sortIcon>
                                    </div>
                                </th>
                                <th pSortableColumn="balance">
                                    <div class="flex justify-content-between align-items-center">
                                        Balance
                                        <p-sortIcon field="balance"></p-sortIcon>
                                    </div>
                                </th>
                                <th pSortableColumn="status">
                                    <div class="flex justify-content-between align-items-center">
                                        Status
                                        <p-sortIcon field="status"></p-sortIcon>
                                    </div>
                                </th>
                                <th pSortableColumn="activity">
                                    <div class="flex justify-content-between align-items-center">
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
                                    <span class="p-column-title">Name</span>
                                    {{ customer.name }}
                                </td>
                                <td style="width: 14%; min-width: 14rem">
                                    <span class="p-column-title">Country</span>
                                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" width="30" height="20" alt="country flag" />
                                    <span class="ml-2 image-text">{{ customer.country.name }}</span>
                                </td>
                                <td style="width: 14%; min-width: 14rem">
                                    <span class="p-column-title">Representative</span>
                                    <img
                                        [alt]="customer.representative.name"
                                        src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}"
                                        width="32"
                                        height="32"
                                        style="vertical-align: middle"
                                        alt="representative"
                                    />
                                    <span class="ml-2 image-text">{{ customer.representative.name }}</span>
                                </td>
                                <td style="width: 14%; min-width: 8rem">
                                    <span class="p-column-title">Date</span>
                                    {{ customer.date | date : 'MM/dd/yyyy' }}
                                </td>
                                <td style="width: 14%; min-width: 8rem">
                                    <span class="p-column-title">Balance</span>
                                    {{ customer.balance | currency : 'USD' : 'symbol' }}
                                </td>
                                <td style="width: 14%; min-width: 10rem">
                                    <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" styleClass="text-sm font-bold" ></p-tag>
                                </td>
                                <td style="width: 14%; min-width: 6rem">
                                    <span class="p-column-title">Activity</span>
                                    <p-progressBar [value]="customer.activity" [showValue]="false" [style]="{ height: '6px' }"></p-progressBar>
                                </td>
                                <td style="text-align: center">
                                    <button pButton type="button" class="p-button-text p-button-icon-only" icon="pi pi-cog"></button>
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
    `
})
export class ThemeSectionComponent {
    constructor( @Inject(PLATFORM_ID) private platformId: any, private customerService: CustomerService, private configService: AppConfigService, public app: AppComponent) {
   
    }

    @ViewChild('dt') table: Table;

    tableTheme: string = 'lara-light-blue';

    customers: Customer[];

    selectedCustomers: Customer[];

    loading: boolean = true;



    get isDarkMode() {
        return this.configService.config.darkMode;
    }

    changeTableTheme(value: string) {
        if (isPlatformBrowser(this.platformId)) {
            this.replaceTableTheme(value);
        }
    }
    replaceTableTheme(newTheme: string) {
        const elementId = 'home-table-link';
        const linkElement = <HTMLLinkElement>document.getElementById(elementId);
        const tableThemeTokens = linkElement?.getAttribute('href').split('/') || null;
        const currentTableTheme = tableThemeTokens ? tableThemeTokens[tableThemeTokens.length - 2] : null;

        if (currentTableTheme !== newTheme && tableThemeTokens) {
            const newThemeUrl = linkElement.getAttribute('href').replace(currentTableTheme, newTheme);

            const cloneLinkElement = <HTMLLinkElement>linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('id', elementId + '-clone');
            cloneLinkElement.setAttribute('href', newThemeUrl);
            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', elementId);
            });
            linkElement.parentNode?.insertBefore(cloneLinkElement, linkElement.nextSibling);

            this.tableTheme = newTheme;
        }
    }

    ngOnInit() {
        this.changeTableTheme(this.configService.config.darkMode ? 'lara-dark-blue' : 'lara-light-blue');

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
