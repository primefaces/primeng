import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuItem, SelectItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { TabMenuModule } from 'primeng/tabmenu';
import { Subscription, debounceTime } from 'rxjs';
import { AppConfigService } from '@service/appconfigservice';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { OverviewApp } from './samples/overviewapp.component';
import { ChatApp } from './samples/chatapp.component';
import { InboxApp } from './samples/inboxapp.component';
import { CardsApp } from './samples/cardsapp.component';
import { MoviesApp } from './samples/moviesapp.component';
import { CustomersApp } from './samples/customersapp.component';

@Component({
    selector: 'hero-section',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        InputNumberModule,
        DropdownModule,
        RadioButtonModule,
        CalendarModule,
        ChartModule,
        ChipModule,
        InputSwitchModule,
        SelectButtonModule,
        SliderModule,
        BadgeModule,
        TabMenuModule,
        FormsModule,
        DividerModule,
        AvatarModule,
        TooltipModule,
        OverviewApp,
        ChatApp,
        InboxApp,
        CardsApp,
        MoviesApp,
        CustomersApp
    ],
    template: `
        <section class="landing-hero py-20 px-8 lg:px-20">
            <div class="flex flex-col items-center">
                <h1 class="text-5xl font-bold text-center xl:text-left leading-tight">The Next-Gen UI Suite for <span class="font-bold text-primary">Angular</span></h1>
                <p class="text-center mt-0 mb-8 text-surface-500 dark:text-surface-400 font-medium text-xl leading-relaxed lg:px-56">
                    Enhance your web applications with PrimeVue's comprehensive suite of customizable, feature-rich UI components. With PrimeVue, turning your development vision into reality has never been easier.
                </p>
                <div class="flex items-center gap-4">
                    <a [routerLink]="'installation'" class="linkbox active">
                        <span>Get Started</span>
                        <i class="pi pi-arrow-right ml-4"></i>
                    </a>
                    <a href="https://github.com/primefaces/primeng" target="_blank" rel="noopener noreferrer" class="linkbox">
                        <span>Give a Star</span>
                        <i class="pi pi-star-fill ml-4 text-yellow-500"></i>
                    </a>
                </div>
                <div class="w-full flex lg:hidden items-center justify-center mt-16 mb-4">
                    <p-selectButton [(ngModel)]="selectedSampleOption" [options]="sampleOptions" optionLabel="title" styleClass="dark:border dark:border-white/20">
                        <ng-template let-item pTemplate>
                            <i [class]="item.icon"></i>
                            <div class="hidden sm:flex flex-1 text-sm font-medium leading-5">{{ item.title }}</div>
                        </ng-template>
                    </p-selectButton>
                </div>
                <div class="bg-surface-0 border border-black/10 dark:border-white/20 dark:bg-surface-950 w-full rounded-3xl p-0 flex lg:hidden items-start gap-6 overflow-hidden">
                    <ng-container *ngFor="let sampleOption of sampleOptions">
                        <!-- <img *ngIf="selectedSampleOption.title === sampleOption.title" [src]="sampleOption.src + (isDark() ? '-dark.jpg' : '.jpg')" class="w-full" /> -->
                        <img *ngIf="selectedSampleOption.title === sampleOption.title" [src]="sampleOption.src + '.jpg'" class="w-full" />
                    </ng-container>
                </div>
                <div class="bg-surface-0 border border-black/10 dark:border-white/20 dark:bg-surface-950 w-full h-[85vh] max-h-[1040px] rounded-3xl p-6 hidden lg:flex lg:mt-20 items-start gap-6 overflow-hidden">
                    <div
                        [ngClass]="{
                            'w-auto': isSlimMenu,
                            'w-72': !isSlimMenu
                        }"
                        class="rounded-2xl p-5 bg-surface-50 dark:bg-surface-900 h-full flex flex-col justify-between"
                    >
                        <div
                            [ngClass]="{
                                'w-12 flex flex-col items-center': isSlimMenu,
                                'w-auto': !isSlimMenu
                            }"
                        >
                            <div class="flex items-center gap-3">
                                <div class="w-11 h-11 border border-primary rounded-xl flex items-center justify-center">
                                    <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.65 11.0645L13.1283 10.7253L14.3119 12.4216V17.6803L18.3698 14.2876V8.52002L16.5099 9.19856L14.65 11.0645Z" fill="var(--p-primary-color)" />
                                        <path d="M5.18078 11.0645L6.70251 10.7253L5.51894 12.4216V17.6803L1.46098 14.2876V8.52002L3.32088 9.19856L5.18078 11.0645Z" fill="var(--p-primary-color)" />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M6.02649 12.7634L7.37914 10.7278L8.22455 11.2367H11.6062L12.4516 10.7278L13.8042 12.7634V20.397L12.7898 21.9237L11.6062 23.1111H8.22455L7.04098 21.9237L6.02649 20.397V12.7634Z"
                                            fill="var(--p-primary-color)"
                                        />
                                        <path d="M14.311 20.9058L16.5091 18.7005V16.4952L14.311 18.3612V20.9058Z" fill="var(--p-primary-color)" />
                                        <path d="M5.51868 20.9058L3.32062 18.7005V16.4952L5.51868 18.3612V20.9058Z" fill="var(--p-primary-color)" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.578 0.888672H7.7177L6.36505 4.11174L8.56311 10.5579H11.4375L13.4665 4.11174L12.1138 0.888672H10.2543V10.5578H9.578V0.888672Z" fill="var(--p-primary-color)" />
                                        <path d="M8.56283 10.5575L1.29232 7.84329L0.277832 3.60242L6.53385 4.11132L8.73191 10.5575H8.56283Z" fill="var(--p-primary-color)" />
                                        <path d="M11.4372 10.5575L18.7077 7.84329L19.7222 3.60242L13.2971 4.11132L11.2681 10.5575H11.4372Z" fill="var(--p-primary-color)" />
                                        <path d="M13.8041 3.60283L17.3548 3.26356L14.9876 0.888672H12.6205L13.8041 3.60283Z" fill="var(--p-primary-color)" />
                                        <path d="M6.02676 3.60283L2.47604 3.26356L4.84318 0.888672H7.21033L6.02676 3.60283Z" fill="var(--p-primary-color)" />
                                    </svg>
                                </div>
                                <div
                                    [ngClass]="{
                                        hidden: isSlimMenu,
                                        block: !isSlimMenu
                                    }"
                                    class="text-surface-950 dark:text-surface-0 font-medium text-3xl"
                                >
                                    Prime
                                </div>
                            </div>
                            <div class="mt-10 flex flex-col gap-2">
                                <div
                                    *ngFor="let navItem of sampleAppsSidebarNavs"
                                    [pTooltip]="isSlimMenu ? navItem.title : null"
                                    (click)="setSelectedSampleAppsSidebarNav(navItem.title)"
                                    class="px-4 py-1 flex items-center gap-1 cursor-pointer text-base rounded-lg transition-all select-none"
                                    [ngClass]="{
                                        'w-12 justify-center py-4': isSlimMenu,
                                        'w-full': !isSlimMenu,
                                        'text-muted-color hover:bg-emphasis bg-transparent': selectedSampleAppsSidebarNav !== navItem.title,
                                        'text-primary-contrast bg-primary hover:bg-primary-emphasis': selectedSampleAppsSidebarNav === navItem.title
                                    }"
                                >
                                    <i [class]="navItem.icon"></i>
                                    <span
                                        [ngClass]="{
                                            hidden: isSlimMenu,
                                            'font-medium leading-8': !isSlimMenu
                                        }"
                                        >・</span
                                    >
                                    <span
                                        [ngClass]="{
                                            hidden: isSlimMenu,
                                            'font-medium leading-none': !isSlimMenu
                                        }"
                                        >{{ navItem.title }}</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div
                            [ngClass]="{
                                'w-12 flex flex-col items-center': isSlimMenu,
                                'w-auto': !isSlimMenu
                            }"
                        >
                            <div class="mt-10 flex flex-col gap-2">
                                <div
                                    *ngIf="false"
                                    [pTooltip]="isSlimMenu ? 'Expanded Mode' : null"
                                    class="px-4 py-1 flex items-center gap-1 cursor-pointer text-base rounded-lg transition-all select-none text-muted-color hover:bg-emphasis"
                                    [ngClass]="{
                                        'w-12 justify-center py-4': isSlimMenu,
                                        'w-full': !isSlimMenu
                                    }"
                                >
                                    <a (click)="toggleSlimMenu()" class="cursor-pointer block p-0 m-0 leading-none">
                                        <i [class]="isSlimMenu ? 'pi pi-window-maximize' : 'pi pi-window-minimize'"></i>
                                        <span [class]="isSlimMenu ? 'hidden' : 'font-medium leading-8'">・</span>
                                        <span [class]="isSlimMenu ? 'hidden' : 'font-medium leading-none'"> Slim Mode</span>
                                    </a>
                                </div>
                                <div
                                    *ngFor="let navItem of sampleAppsSidebarNavsMore"
                                    [pTooltip]="isSlimMenu ? navItem.title : null"
                                    class="px-4 py-1 flex items-center gap-1 cursor-pointer text-base rounded-lg transition-all select-none"
                                    [ngClass]="{
                                        'w-12 justify-center py-4': isSlimMenu,
                                        'w-full': !isSlimMenu,
                                        'text-muted-color hover:bg-emphasis bg-transparent': selectedSampleAppsSidebarNav !== navItem.title,
                                        'text-primary-contrast bg-primary hover:bg-primary-emphasis': selectedSampleAppsSidebarNav === navItem.title
                                    }"
                                >
                                    <i [class]="navItem.icon"></i>
                                    <span [class]="isSlimMenu ? 'hidden' : 'font-medium leading-8'">・</span>
                                    <span [class]="isSlimMenu ? 'hidden' : 'font-medium leading-none'">{{ navItem.title }}</span>
                                </div>
                            </div>
                            <p-divider />
                            <div [class]="isSlimMenu ? 'justify-center' : ' gap-3'" class="flex items-center">
                                <p-avatar image="https://www.primefaces.org/cdn/primevue/images/landing/apps/main-avatar.png" size="large" shape="circle" class="shrink-0" />
                                <div>
                                    <div [class]="isSlimMenu ? 'hidden' : 'text-base font-medium text-color leading-5'">Robin Jonas</div>
                                    <div [class]="isSlimMenu ? 'hidden' : 'text-sm text-muted-color mt-1'">hi&#64;robin.xyz</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <overview-app *ngIf="selectedSampleAppsSidebarNav === 'Overview'" />
                    <chat-app *ngIf="selectedSampleAppsSidebarNav === 'Chat'" />
                    <inbox-app *ngIf="selectedSampleAppsSidebarNav === 'Inbox'" />
                    <cards-app *ngIf="selectedSampleAppsSidebarNav === 'Cards'" />
                    <movies-app *ngIf="selectedSampleAppsSidebarNav === 'Movies'" />
                    <customers-app *ngIf="selectedSampleAppsSidebarNav === 'Customers'" />   
                </div>
            </div>
        </section>
    `
})
export class HeroSectionComponent implements OnInit, OnDestroy {
    selectedSampleOption;

    sampleOptions;

    sampleAppsSidebarNavs;

    sampleAppsSidebarNavsMore;

    selectedSampleAppsSidebarNav;

    isSlimMenu: boolean = true;

    // -------------------------

    value1: number = 24;

    radioValue: string = 'S';

    dateValue: Date;

    switchValue: boolean = true;

    chartData: any;

    chartOptions: any;

    selectButtonValue: SelectItem;

    selectButtonOptions: SelectItem[];

    user: any = null;

    users: any[];

    items: MenuItem[];

    rangeValues = [20, 80];

    subscription!: Subscription;

    constructor(
        private configService: AppConfigService,
        @Inject(PLATFORM_ID) private platformId: any,
        private cd: ChangeDetectorRef
    ) {
        this.subscription = this.configService.configUpdate$.pipe(debounceTime(25)).subscribe((config) => {
            this.setChartOptions();
            this.cd.markForCheck();
        });
    }

    ngOnInit() {
        (this.sampleOptions = [
            { icon: 'pi pi-home', title: 'Overview', src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/sampleshots/overview' },
            { icon: 'pi pi-comment', title: 'Chat', src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/sampleshots/chat' },
            { icon: 'pi pi-inbox', title: 'Inbox', src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/sampleshots/mail' },
            { icon: 'pi pi-th-large', title: 'Cards', src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/sampleshots/cards' },
            { icon: 'pi pi-user', title: 'Customers', src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/sampleshots/customers' },
            { icon: 'pi pi-video', title: 'Movies', src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/sampleshots/movies' }
        ]),
            (this.selectedSampleOption = this.sampleOptions[0]);

        (this.sampleAppsSidebarNavs = [
            { icon: 'pi pi-home', title: 'Overview' },
            { icon: 'pi pi-comment', title: 'Chat' },
            { icon: 'pi pi-inbox', title: 'Inbox' },
            { icon: 'pi pi-th-large', title: 'Cards' },
            { icon: 'pi pi-user', title: 'Customers' },
            { icon: 'pi pi-video', title: 'Movies' }
        ]),
            (this.sampleAppsSidebarNavsMore = [
                { icon: 'pi pi-flag', title: 'Support' },
                { icon: 'pi pi-cog', title: 'Settings' }
            ]),
            this.initChartData();
        this.setChartOptions();
        this.selectedSampleAppsSidebarNav = 'Overview';
        this.selectButtonValue = { label: 'Styled', value: 1 };

        this.selectButtonOptions = [
            { label: 'Styled', value: 1 },
            { label: 'Unstyled', value: 2 }
        ];

        this.items = [
            { label: 'Home', icon: 'pi pi-fw pi-home' },
            { label: 'Calendar', icon: 'pi pi-fw pi-calendar' }
        ];

        this.users = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' }
        ];
    }

    initChartData(): void {
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
    }

    setChartOptions(): void {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            this.chartOptions = {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: textColorSecondary
                        },
                        min: 0,
                        max: 100,
                        grid: {
                            color: surfaceBorder
                        }
                    }
                }
            };
        }
    }

    setSelectedSampleAppsSidebarNav(title) {
        this.selectedSampleAppsSidebarNav = title;
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }
}
