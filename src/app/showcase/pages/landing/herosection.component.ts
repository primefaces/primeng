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
import { AppConfigService } from '../../service/appconfigservice';

@Component({
    selector: 'hero-section',
    standalone: true,
    imports: [CommonModule, RouterModule, InputNumberModule, DropdownModule, RadioButtonModule, CalendarModule, ChartModule, ChipModule, InputSwitchModule, SelectButtonModule, SliderModule, BadgeModule, TabMenuModule, FormsModule],
    template: `
        <section class="landing-hero py-8 px-5 lg:px-8">
            <div class="flex flex-wrap">
                <div class="w-full xl:w-6 flex flex-column justify-content-center lg:pr-8 align-items-center xl:align-items-stretch">
                    <h1 class="text-6xl font-bold text-center xl:text-left">The Most Complete UI Suite for <span class="font-bold text-primary">Angular</span></h1>
                    <p class="section-detail xl:text-left text-center px-0 mt-0 mb-5">
                        Elevate your web applications with PrimeNG's comprehensive suite of customizable, feature-rich UI components. With PrimeNG, turning your development vision into reality has never been easier.
                    </p>
                    <div class="flex align-items-center gap-3">
                        <a [routerLink]="'installation'" class="linkbox active font-semibold py-3 px-4">
                            <span>Get Started</span>
                            <i class="pi pi-arrow-right ml-3"></i>
                        </a>
                        <a href="https://github.com/primefaces/primeng" target="_blank" rel="noopener noreferrer" class="linkbox font-semibold py-3 px-4">
                            <span>Give a Star</span>
                            <i class="pi pi-star-fill ml-3 text-yellow-500"></i>
                        </a>
                    </div>
                </div>
                <div class="w-full xl:w-6 pt-7 xl:pt-0 hidden md:block">
                    <div class="flex">
                        <div class="flex flex-column w-6 gap-5 pt-8 pr-3">
                            <div class="box p-4 fadein animation-duration-500">
                                <div class="flex gap-2">
                                    <div class="w-6rem flex-shrink-0">
                                        <span class="text-secondary font-medium block mb-3">Amount</span>
                                        <p-inputNumber [(ngModel)]="value1" mode="currency" currency="USD" locale="en-US" inputStyleClass="lg:w-6 w-full" />
                                    </div>
                                    <div class="flex-auto" style="width: 1%">
                                        <span class="text-secondary font-semibold block mb-3">Beneficiary</span>
                                        <p-dropdown [(ngModel)]="user" [options]="users" optionLabel="name" placeholder="Select a User" styleClass="w-full">
                                            <ng-template pTemplate="content" let-slotProps>
                                                <div class="flex align-items-center gap-2">
                                                    <img [alt]="slotProps.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ slotProps.image }}" width="28" />
                                                    <span>{{ slotProps.name }}</span>
                                                </div>
                                            </ng-template>
                                        </p-dropdown>
                                    </div>
                                </div>
                                <span class="text-secondary font-medium block mt-5 mb-3">Account</span>
                                <div class="flex flex-wrap gap-3">
                                    <div class="flex align-items-center">
                                        <p-radioButton id="category1" [(ngModel)]="radioValue" value="S" name="radiovalue" />
                                        <label for="category1" class="ml-2 font-medium">Savings</label>
                                    </div>
                                    <div class="flex align-items-center">
                                        <p-radioButton id="category2" [(ngModel)]="radioValue" value="C" name="radiovalue" />
                                        <label for="category2" class="ml-2 font-medium">Checking</label>
                                    </div>
                                </div>
                                <span class="text-secondary font-medium block mt-5 mb-3">Date</span>
                                <p-calendar [(ngModel)]="dateValue" [showWeek]="true" styleClass="w-full" />
                            </div>
                            <div class="box p-4 fadein animation-duration-500 z-0">
                                <p-chart type="line" [data]="chartData" [options]="chartOptions" />
                            </div>
                            <div class="box p-4 fadein animation-duration-500 z-0">
                                <div class="flex align-items-center">
                                    <p-chip label="Angular" class="mr-2 font-medium" />
                                    <p-chip label="Typescript" class="mr-2 font-medium" />
                                    <p-inputSwitch [(ngModel)]="switchValue" class="ml-auto"></p-inputSwitch>
                                </div>
                                <div class="mt-5 flex justify-content-center">
                                    <p-selectButton [(ngModel)]="selectButtonValue" [options]="selectButtonOptions" optionLabel="label" />
                                </div>
                                <div class="mt-5">
                                    <p-slider [(ngModel)]="rangeValues" range="true" class="w-full" />
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-column w-6 gap-5 pl-3">
                            <div class="box p-4 fadein animation-duration-500">
                                <div class="surface-card mb-4 w-full text-center p-5" style="border-radius: '10px'">
                                    <img src="https://primefaces.org/cdn/primeng/images/landing/air-jordan.png" alt="Watch" class="w-14rem" />
                                </div>
                                <div class="flex align-items-center mb-4">
                                    <div class="flex flex-column">
                                        <span class="block font-semibold mb-1">Sneaker</span>
                                        <span class="text-secondary text-sm">Premium Quality</span>
                                    </div>
                                    <span class="font-medium text-xl ml-auto">$990</span>
                                </div>
                                <p-button label="Add to Cart" icon="pi pi-shopping-cart" outlined="true" styleClass="w-full"></p-button>
                            </div>
                            <div class="box p-4 fadein animation-duration-500">
                                <ul class="list-none p-0 m-0">
                                    <li class="flex align-items-center mb-3">
                                        <span class="mr-3">
                                            <img src="https://primefaces.org/cdn/primeng/images/landing/avatar.png" alt="Avatar" class="w-3rem h-3rem" />
                                        </span>
                                        <div class="flex flex-column">
                                            <span class="font-bold mb-1">Amanda Williams</span>
                                            <span class="text-secondary">Administrator</span>
                                        </div>
                                    </li>
                                    <li class="flex">
                                        <a class="flex align-items-center p-3 border-round w-full hover:surface-hover transition-colors transition-duration-150 cursor-pointer" style="border-radius: '10px'">
                                            <i class="pi pi-home text-xl mr-3"></i>
                                            <span class="flex flex-column">
                                                <span class="font-bold mb-1">Dashboard</span>
                                                <span class="m-0 text-secondary">Control Panel</span>
                                            </span>
                                        </a>
                                    </li>
                                    <li class="flex">
                                        <a class="flex align-items-center p-3 border-round w-full hover:surface-hover transition-colors transition-duration-150 cursor-pointer" style="border-radius: '10px'">
                                            <i class="pi pi-envelope text-xl mr-3"></i>
                                            <span class="flex flex-column">
                                                <span class="font-bold mb-1">Inbox</span>
                                                <span class="m-0 text-secondary">View Messages</span>
                                            </span>
                                            <p-badge value="3" class="ml-auto"></p-badge>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="box p-4 fadein animation-duration-500">
                                <p-tabMenu [model]="items" [activeItem]="items[0]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
})
export class HeroSectionComponent implements OnInit, OnDestroy {
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

    constructor(private configService: AppConfigService, @Inject(PLATFORM_ID) private platformId: any, private cd: ChangeDetectorRef) {
        this.subscription = this.configService.configUpdate$.pipe(debounceTime(25)).subscribe((config) => {
            this.setChartOptions();
            this.cd.markForCheck();
        });
    }

    ngOnInit() {
        this.initChartData();
        this.setChartOptions();

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

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }
}
