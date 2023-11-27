import { CommonModule, DOCUMENT, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import docsearch from '@docsearch/js';
import { MenuItem, SelectItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import Versions from '../../data/versions.json';
import { Customer } from '../../domain/customer';
import { AppComponent } from '../../layout/app.component';
import { AppNewsComponent } from '../../layout/news/app.news.component';
import { AppTopBarComponent } from '../../layout/topbar/app.topbar.component';
import { AppConfigService } from '../../service/appconfigservice';
import { CustomerService } from '../../service/customerservice';
import { DropdownModule } from 'primeng/dropdown';
@Component({
    selector: 'landing',
    standalone: true,
    templateUrl: './landing.component.html',
    imports: [
        CommonModule,
        NgOptimizedImage,
        FormsModule,
        InputSwitchModule,
        ButtonModule,
        RadioButtonModule,
        InputNumberModule,
        TabMenuModule,
        ChartModule,
        ProgressBarModule,
        ChipModule,
        SelectButtonModule,
        SliderModule,
        BadgeModule,
        CalendarModule,
        TableModule,
        RouterModule,
        CheckboxModule,
        DropdownModule,
        AppNewsComponent,
        AppTopBarComponent
    ]
})
export class LandingComponent implements OnInit {
    @ViewChild('containerElement') containerElement: ElementRef;

    @ViewChild('dt') table: Table;

    @ViewChild('editor') editor: ElementRef;

    versions: any[] = Versions;

    scrollListener: any;

    chartData: any;

    chartOptions: any;

    items: MenuItem[];

    selectButtonValue: SelectItem;

    selectButtonOptions: SelectItem[];

    value1: number = 24;

    value2: number = 356;

    radioValue: string = 'S';

    switchValue: boolean = true;

    selectedVal: number = 1;

    rangeValues = [20, 80];

    dateValue: Date;

    customers: Customer[];

    selectedCustomers: Customer[];

    loading: boolean = true;

    tableTheme: string = 'lara-light-blue';

    isNpmCopied: boolean = false;

    user : any = null

    users : any[]

    usersData = [
        { name: 'fox', width: '51', height: '22' },
        { name: 'airbus', width: '87', height: '16' },
        { name: 'mercedes', width: '34', height: '34' },
        { name: 'ford', width: '64', height: '26' },
        { name: 'vw', width: '35', height: '34' },
        { name: 'intel', width: '53', height: '34' },
        { name: 'unicredit', width: '79', height: '18' },
        { name: 'lufthansa', width: '97', height: '18' },
        { name: 'nvidia', width: '86', height: '16' },
        { name: 'verizon', width: '102', height: '18' },
        { name: 'amex', width: '81', height: '30' }
    ];

    private window: Window;

    get landingClass() {
        return {
            'layout-dark': this.isDarkMode,
            'layout-light': !this.isDarkMode,
            'layout-news-active': this.isNewsActive
        };
    }

    get isDarkMode() {
        return this.configService.config.darkMode;
    }

    get isNewsActive() {
        return this.configService.state.newsActive;
    }

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: any,
        private customerService: CustomerService,
        private configService: AppConfigService,
        private cd: ChangeDetectorRef,
        public app: AppComponent,
        private metaService: Meta,
        private titleService: Title
    ) {
        this.window = this.document.defaultView as Window;
    }

    ngOnInit() {
        this.titleService.setTitle('PrimeNG - Angular UI Component Library');
        this.metaService.updateTag({ name: 'description', content: 'The ultimate collection of design-agnostic, flexible and accessible Angular UI Components.' });
        this.changeTableTheme(this.configService.config.darkMode ? 'lara-dark-blue' : 'lara-light-blue');

        this.chartData = {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [
                {
                    label: 'Annual Income',
                    data: [40, 59, 40, 50, 56],
                    fill: true,
                    borderColor: '#3b82f6',
                    tension: 0.4,
                    backgroundColor: 'rgba(59, 130, 246, .2)'
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,

                    min: 0,
                    max: 100
                }
            }
        };

        (this.selectButtonValue = { label: 'Styled', value: 1 }),
            (this.selectButtonOptions = [
                { label: 'Styled', value: 1 },
                { label: 'Unstyled', value: 2 }
            ]);

        this.items = [
            { label: 'Home', icon: 'pi pi-fw pi-home' },
            { label: 'Calendar', icon: 'pi pi-fw pi-calendar' }
        ];

        this.customerService.getCustomersLarge().then((customers) => {
            this.customers = customers;
            this.loading = false;
        });
        
        this.users = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' }
        ]

        if (isPlatformBrowser(this.platformId)) {
            this.initDocSearch();
        }
    }

    initDocSearch() {
        docsearch({
            appId: 'XG1L2MUWT9',
            apiKey: '6057fe1af77fee4e7e41907b0b3ec79d',
            indexName: 'primeng',
            container: '#docsearch',
            transformItems: this.handleDocSearchTransformItems.bind(this)
        });
    }

    handleDocSearchTransformItems(results) {
        const valid = process.env.NODE_ENV !== 'production';
        return results.map((result) => {
            if (valid) {
                const url = new URL(result.url);

                url.protocol = this.window.location.protocol;
                url.hostname = this.window.location.hostname;
                url.port = this.window.location.port;
                result.url = url.toString();
            }

            return result;
        });
    }

    copyNpm() {
        navigator.clipboard.writeText('npm i primeng');
        this.isNpmCopied = true;
        setTimeout(() => {
            this.isNpmCopied = false;
        }, 2000);
    }

    ngAfterViewInit() {
        this.cd.detectChanges();
    }

    toggleDarkMode() {
        const theme = this.isDarkMode ? 'lara-light-blue' : 'lara-dark-blue';
        const newTableTheme = this.isDarkMode ? this.tableTheme.replace('dark', 'light') : this.tableTheme.replace('light', 'dark');

        this.configService.changeTheme({ name: theme, dark: !this.isDarkMode });
        this.replaceTableTheme(newTableTheme);
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
