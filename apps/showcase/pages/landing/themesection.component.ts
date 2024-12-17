import { AppComponent } from '@/components/layout/app.component';
import { Customer } from '@/domain/customer';
import { AppConfigService } from '@/service/appconfigservice';
import { CustomerService } from '@/service/customerservice';
import { CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBar } from 'primeng/progressbar';
import { Table, TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';

@Component({
    selector: 'theme-section',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, Tag, ProgressBar, InputTextModule, IconField, InputIcon, MultiSelectModule, DialogModule],
    template: `
        <section class="landing-themes py-20">
            <div class="section-header">Components</div>
            <p class="section-detail">The most complete UI component library for Angular based on a design-agnostic infrastructure.</p>
            <div class="themes-main flex mt-16 justify-center px-8 lg:px-20">
                <div class="box overflow-hidden z-10 p-8 table-container">
                    <p-multiselect></p-multiselect>
                    <p-button (onClick)="this.visible1.set(true)" label="open1" />
                    <p-button (onClick)="this.visible2.set(true)" label="open2" />

                    <p-dialog [style]="{ width: '250px', height: '250px' }" #dialog [closeOnEscape]="true" [visible]="visible1()" (visibleChange)="hide1()">
                        <div [style]="{ width: '100%', height: '100%' }"><p-multiselect> </p-multiselect> <br /><br /></div>
                    </p-dialog>
                    <p-dialog [style]="{ width: '250px', height: '250px' }" #dialog [closeOnEscape]="true" [visible]="visible2()" (visibleChange)="hide2()">
                        <div [style]="{ width: '100%', height: '100%' }"><p-multiselect> </p-multiselect> <br /><br /></div>
                    </p-dialog>
                </div>
            </div>
        </section>
    `,
    styles: '::ng-deep .p-dialog-content { height: 100%; }'
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

    protected readonly visible1 = signal(true);

    public hide1() {
        this.visible1.set(false);
    }
    protected readonly visible2 = signal(true);

    public hide2() {
        this.visible2.set(false);
    }

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
