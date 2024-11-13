import { AppConfigService } from '@/service/appconfigservice';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuItem, SelectItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { Chip } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { DrawerModule } from 'primeng/drawer';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumber } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { KnobModule } from 'primeng/knob';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { RadioButton } from 'primeng/radiobutton';
import { SelectButton } from 'primeng/selectbutton';
import { Slider } from 'primeng/slider';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TooltipModule } from 'primeng/tooltip';
import { Subscription } from 'rxjs';
import { CardsApp } from './samples/cardsapp.component';
import { ChatApp } from './samples/chatapp.component';
import { CustomersApp } from './samples/customersapp.component';
import { InboxApp } from './samples/inboxapp.component';
import { MoviesApp } from './samples/moviesapp.component';
import { OverviewApp } from './samples/overviewapp.component';

@Component({
    selector: 'hero-section',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        InputNumber,
        DropdownModule,
        RadioButton,
        CalendarModule,
        ChartModule,
        Chip,
        InputSwitchModule,
        SelectButton,
        Slider,
        ToggleSwitchModule,
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
        CustomersApp,
        DrawerModule,
        OverlayBadgeModule,
        KnobModule
    ],
    template: `
        <section class="landing-hero py-20 px-8 lg:px-20">
            <div class="flex flex-col items-center">
                <h1 class="text-5xl font-bold text-center xl:text-left leading-tight">The Next-Gen UI Suite for <span class="font-bold text-primary">Angular</span></h1>
                <p class="text-center mt-0 mb-8 text-surface-500 dark:text-surface-400 font-medium text-xl leading-relaxed lg:px-56">
                    Enhance your web applications with PrimeNG's comprehensive suite of customizable, feature-rich UI components. With PrimeNG, turning your development vision into reality has never been easier.
                </p>
                <div class="flex items-center gap-4">
                    <a [routerLink]="'installation'" class="linkbox linkbox-primary">
                        <span>Get Started</span>
                        <i class="pi pi-arrow-right ml-4"></i>
                    </a>
                    <a href="https://github.com/primefaces/primeng" target="_blank" rel="noopener noreferrer" class="linkbox">
                        <span>Give a Star</span>
                        <i class="pi pi-star-fill ml-4 text-yellow-500"></i>
                    </a>
                </div>
                <div class="w-full flex lg:hidden items-center justify-center mt-16 mb-4">
                    <p-selectbutton [(ngModel)]="selectedSampleOption" [options]="sampleOptions" optionLabel="title" styleClass="dark:border dark:border-white/20">
                        <ng-template let-item pTemplate="item">
                            <i [class]="item.icon"></i>
                            <div class="hidden sm:flex flex-1 text-sm font-medium leading-5">{{ item.title }}</div>
                        </ng-template>
                    </p-selectbutton>
                </div>
                <div class="bg-surface-0 border border-black/10 dark:border-white/20 dark:bg-surface-950 w-full rounded-3xl p-0 flex lg:hidden items-start gap-6 overflow-hidden">
                    <ng-container *ngFor="let sampleOption of sampleOptions">
                        <img *ngIf="selectedSampleOption.title === sampleOption.title" [src]="sampleOption.src + (isDarkMode ? '-dark.jpg' : '.jpg')" class="w-full" />
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
                                    <a class="cursor-pointer block p-0 m-0 leading-none">
                                        <a class="cursor-pointer block p-0 m-0 leading-none">
                                            <i [class]="isSlimMenu ? 'pi pi-window-maximize' : 'pi pi-window-minimize'"></i>
                                            <span [class]="isSlimMenu ? 'hidden' : 'font-medium leading-8'">・</span>
                                            <span [class]="isSlimMenu ? 'hidden' : 'font-medium leading-none'"> Slim Mode</span>
                                        </a>
                                    </a>
                                </div>
                                <div
                                    *ngFor="let navItem of sampleAppsSidebarNavsMore"
                                    [pTooltip]="isSlimMenu ? navItem.title : null"
                                    (click)="visibleRight = true"
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
                    <p-drawer [(visible)]="visibleRight" position="right" closeIcon="pi pi-sign-out" styleClass="!max-w-2xl !w-full !h-screen rounded-l-2xl">
                        <ng-template pTemplate="headless">
                            <div class="flex flex-col h-screen overflow-auto">
                                <div class="">
                                    <div class="flex align-items-center gap-3 p-6">
                                        <p-avatar image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg" size="large" class="rounded-xl overflow-hidden" />
                                        <div class="flex-1">
                                            <div class="leading-6 text-color font-medium">Brook Simmons</div>
                                            <div class="mt-1 leading-5 text-muted-color text-sm">Sales Executive</div>
                                        </div>
                                        <p-button (onClick)="visibleRight = false" icon="pi pi-sign-out" text rounded severity="secondary" />
                                    </div>
                                    <p-selectbutton [(ngModel)]="selectedSidebarOption" [options]="sidebarOptions" class="w-full px-6 py-3" styleClass="flex-1 py-2.5">
                                        <ng-template pTemplate="item" let-item>
                                            <span class="text-sm">{{ item }}</span>
                                        </ng-template>
                                    </p-selectbutton>
                                </div>
                                <div *ngIf="selectedSidebarOption === 'Interaction Logs'" class="h-[calc(100%-172px)] flex flex-col gap-4 p-6">
                                    <div class="h-1/3 flex flex-col p-3 rounded-xl bg-emphasis">
                                        <div class="flex items-start justify-between">
                                            <div class="leading-6 font-medium text-color">Call Logs</div>
                                            <p-button icon="pi pi-download text-sm" styleClass="w-8 h-8 !border-surface !bg-surface-0 dark:!bg-surface-900 hover:opacity-75 transition-all" severity="secondary" text />
                                        </div>
                                        <div class="overflow-y-auto flex-1 bg-surface-0 dark:bg-surface-900 mt-2 flex flex-col rounded-lg overflow-hidden divide-y divide-surface-200 dark:divide-surface-800">
                                            <div *ngFor="let data of callLogs" class="flex items-center gap-3 p-2">
                                                <p-overlayBadge severity="success" styleClass="w-fit">
                                                    <p-avatar [image]="data.image" size="normal" styleClass="rounded-md w-10 h-10 overflow-hidden flex" />
                                                </p-overlayBadge>

                                                <div class="flex-1">
                                                    <div class="text-sm leading-5 font-medium text-color">{{ data.name }}</div>
                                                    <div class="mt-1 text-sm leading-5 text-muted-color">{{ data.time }}</div>
                                                </div>
                                                <p-button icon="pi pi-phone text-sm" text styleClass="bg-primary/10 dark:bg-primary/20 w-8 h-8" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="h-1/3 flex flex-col p-3 rounded-xl bg-emphasis">
                                        <div class="flex items-start justify-between">
                                            <div class="leading-6 font-medium text-color">Email Records</div>
                                            <p-button icon="pi pi-download text-sm" styleClass="w-8 h-8 !border-surface !bg-surface-0 dark:!bg-surface-900 hover:opacity-75 transition-all" severity="secondary" text />
                                        </div>
                                        <div class="overflow-y-auto flex-1 bg-surface-0 dark:bg-surface-900 mt-2 flex flex-col rounded-lg overflow-hidden divide-y divide-surface-200 dark:divide-surface-800">
                                            <div *ngFor="let data of emailRecords" class="flex items-center gap-3 p-2">
                                                <p-overlayBadge severity="danger" styleClass="w-fit">
                                                    <p-avatar [image]="data.image" size="normal" styleClass="rounded-md overflow-hidden w-10 h-10 flex" />
                                                </p-overlayBadge>

                                                <div class="w-1/5 text-sm leading-5 font-medium text-color">{{ data.name }}</div>
                                                <div class="flex-1">
                                                    <div class="text-sm leading-5 font-medium text-color line-clamp-2">
                                                        {{ data.title }}
                                                        <span class="text-muted-color">
                                                            {{ data.text }}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="w-1/6 text-sm leading-5 text-muted-color text-right">
                                                    {{ data.time }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="h-1/3 flex flex-col p-3 rounded-xl bg-emphasis">
                                        <div class="flex items-start justify-between">
                                            <div class="leading-6 font-medium text-color">Meeting Notes</div>
                                            <p-button icon="pi pi-download text-sm" styleClass="w-8 h-8 !border-surface !bg-surface-0 dark:!bg-surface-900 hover:opacity-75 transition-all leading-none" severity="secondary" text />
                                        </div>
                                        <div class="overflow-y-auto flex-1 bg-surface-0 dark:bg-surface-900 mt-2 p-4 flex flex-col rounded-lg overflow-hidden">
                                            <div class="flex items-start justify-between gap-1">
                                                <div class="text-sm text-color font-medium max-w-60">Subject: Meeting Wrap-up & Action Items: Jacob Jones</div>
                                                <div class="text-sm text-muted-color">February 14, 2024 / 2:00 PM</div>
                                            </div>
                                            <div class="text-sm text-muted-color mt-6">
                                                Here's a quick review of our meeting with Brook Simmons and next steps. Summary:
                                                <br />
                                                <br />
                                                <ul class="list-disc pl-5">
                                                    <li>Reviewed our SaaS solution and its features.</li>
                                                    <li>Arlene McCoy intrigued by user experience potential.</li>
                                                    <li>Voiced concerns on integration with current system.Action Items:</li>
                                                </ul>
                                                <br />
                                                Demo: Schedule product demo with Arlene McCoy. (Assigned to: Jerome Bell)<br /><br />
                                                Integration Blueprint: Draft and deliver technical blueprint. (Assigned to: Cameron Williamson)<br /><br />
                                                Follow-up Meeting: Arrange to discuss any queries post-demo. (Assigned to: Dianne Russell)
                                                <br /><br />
                                                Please act on these items promptly.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div *ngIf="selectedSidebarOption === 'Preferences'" class="h-[calc(100%-72px)] flex flex-col gap-4 p-6">
                                    <div *ngFor="let data of preferences" class="h-1/4 flex flex-col p-3 rounded-xl bg-emphasis">
                                        <div class="leading-6 font-medium text-color p-2">{{ data.title }}</div>
                                        <div class="overflow-y-auto flex-1 bg-surface-0 dark:bg-surface-900 mt-2 p-4 flex flex-col gap-3 rounded-lg">
                                            <div *ngFor="let pref of data.prefs" class="flex items-center gap-2">
                                                <i class="text-lg text-color" [class]="pref.icon"></i>
                                                <div class="font-medium text-color flex-1">{{ pref.title }}</div>
                                                <p-toggleswitch [(ngModel)]="pref.checked" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div *ngIf="selectedSidebarOption === 'Opportunities'" class="grid grid-cols-2 gap-6 p-6">
                                    <div *ngFor="let data of opportunities" class="flex flex-col p-3 rounded-xl bg-emphasis">
                                        <div class="flex items-start justify-between gap-2">
                                            <div class="font-medium text-color mt-0.5">{{ data.title }}</div>
                                            <a [routerLink]="data.link" target="_blank" rel="noopener">
                                                <p-button icon="pi pi-arrow-up-right text-sm !leading-none" styleClass="w-8 h-8 !border-surface !bg-surface-0 dark:!bg-surface-900" severity="secondary" text />
                                            </a>
                                        </div>
                                        <img class="w-full rounded-lg mt-2 block" [src]="data.image" alt="Opportunutiy Image" />
                                        <div class="flex-1 mt-2 p-2 rounded-lg bg-surface-0 dark:bg-surface-900 text-xs text-color">
                                            {{ data.text }}
                                        </div>
                                    </div>
                                </div>
                                <div *ngIf="selectedSidebarOption === 'Statistics'" class="h-[calc(100%-160px)] p-6">
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="w-full h-full flex flex-col p-3 rounded-xl bg-emphasis">
                                            <div class="flex items-center justify-between gap-2">
                                                <div class="font-medium text-color p-2">Customer Satisfaction Score</div>
                                            </div>
                                            <div class="flex-1 py-4 mt-2 flex items-center justify-center rounded-lg bg-surface-0 dark:bg-surface-900 shadow-sm">
                                                <p-knob [(ngModel)]="customerSatisfaction" [size]="150" [strokeWidth]="8" valueTemplate="{value}%" styleClass="pointer-events-none" />
                                            </div>
                                        </div>
                                        <div class="w-full h-full flex flex-col p-3 rounded-xl bg-emphasis">
                                            <div class="flex items-center justify-between gap-2">
                                                <div class="font-medium text-color p-2">Estimated Lifetime Value</div>
                                            </div>
                                            <div class="flex-1 flex items-center gap-2 justify-center mt-2 p-2 rounded-lg bg-surface-0 dark:bg-surface-900 shadow-sm">
                                                <div class="font-semibold text-lg leading-none text-color border border-surface py-3.5 px-2 rounded-lg">$</div>
                                                <div class="font-semibold text-lg leading-none text-color border border-surface py-3.5 px-2 rounded-lg">272</div>
                                                <div class="font-semibold text-lg leading-none text-color border border-surface py-3.5 px-2 rounded-lg">123</div>
                                                <div class="font-semibold text-lg leading-none text-color border border-surface py-3.5 px-2 rounded-lg">000</div>
                                            </div>
                                        </div>
                                        <div class="w-full h-full flex flex-col p-3 rounded-xl bg-emphasis">
                                            <div class="flex items-center justify-between gap-2">
                                                <div class="font-medium text-color p-2">Product Usage</div>
                                            </div>
                                            <div class="flex-1 mt-2 py-4 rounded-lg bg-surface-0 dark:bg-surface-900 shadow-sm">
                                                <p-chart type="line" [data]="lineChartData" [options]="lineChartOptions" styleClass="min-h-44 w-full" width="100%" height="11rem" />
                                            </div>
                                        </div>
                                        <div class="w-full h-full flex flex-col p-3 rounded-xl bg-emphasis">
                                            <div class="font-medium text-color p-2">Churn Risk</div>
                                            <div class="flex-1 py-4 mt-2 flex items-center justify-center rounded-lg bg-surface-0 dark:bg-surface-900 shadow-sm">
                                                <p-knob [(ngModel)]="churnRisk" [size]="150" [strokeWidth]="8" valueTemplate="{value}%" class="pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-4 w-full flex flex-col p-3 rounded-xl bg-emphasis">
                                        <div class="font-medium text-color p-2">Total Purchases</div>
                                        <div class="flex-1 py-4 px-2 w-full mt-2 flex items-center justify-center rounded-lg bg-surface-0 dark:bg-surface-900 shadow-sm">
                                            <p-chart type="bar" [data]="chartData2" [options]="chartOptions2" height="15rem" class="w-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ng-template>
                    </p-drawer>

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

    value1: number = 24;

    radioValue: string = 'S';

    dateValue: Date;

    switchValue: boolean = true;

    visibleRight: boolean = false;

    chartData: any;

    chartOptions: any;

    selectButtonValue: SelectItem;

    selectButtonOptions: SelectItem[];

    user: any = null;

    users: any[];

    items: MenuItem[];

    rangeValues = [20, 80];

    subscription!: Subscription;

    selectedSidebarOption: string = 'Statistics';

    sidebarOptions: string[] = ['Interaction Logs', 'Preferences', 'Statistics', 'Opportunities'];

    churnRisk: number = 24;

    lineChartData: any = {};

    lineChartOptions: any = {};

    customerSatisfaction: number = 56;

    chartData2: any = {};

    chartOptions2: any = {};

    preferences: any;

    opportunities: any;

    callLogs: any;

    emailRecords: any;

    get isDarkMode(): boolean {
        return this.configService.appState().darkTheme;
    }

    constructor(
        private configService: AppConfigService,
        @Inject(PLATFORM_ID) private platformId: any,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.sampleOptions = [
            {
                icon: 'pi pi-home',
                title: 'Overview',
                src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/sampleshots/overview'
            },
            {
                icon: 'pi pi-comment',
                title: 'Chat',
                src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/sampleshots/chat'
            },
            {
                icon: 'pi pi-inbox',
                title: 'Inbox',
                src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/sampleshots/mail'
            },
            {
                icon: 'pi pi-th-large',
                title: 'Cards',
                src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/sampleshots/cards'
            },
            {
                icon: 'pi pi-user',
                title: 'Customers',
                src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/sampleshots/customers'
            },
            {
                icon: 'pi pi-video',
                title: 'Movies',
                src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/sampleshots/movies'
            }
        ];
        this.selectedSampleOption = this.sampleOptions[0];

        this.sampleAppsSidebarNavs = [
            { icon: 'pi pi-home', title: 'Overview' },
            { icon: 'pi pi-comment', title: 'Chat' },
            { icon: 'pi pi-inbox', title: 'Inbox' },
            { icon: 'pi pi-th-large', title: 'Cards' },
            { icon: 'pi pi-user', title: 'Customers' },
            { icon: 'pi pi-video', title: 'Movies' }
        ];
        this.sampleAppsSidebarNavsMore = [{ icon: 'pi pi-cog', title: 'Settings' }];

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

        this.preferences = [
            {
                title: 'Email',
                prefs: [
                    { icon: 'pi pi-bell', title: 'Notification', checked: true },
                    { icon: 'pi pi-inbox', title: 'Newsletter', checked: false },
                    { icon: 'pi pi-sync', title: 'Product Updates', checked: false }
                ]
            },
            {
                title: 'Telephone',
                prefs: [
                    { icon: 'pi pi-mobile', title: 'Phone Call', checked: true },
                    { icon: 'pi pi-volume-down', title: 'Voicemail', checked: false },
                    { icon: 'pi pi-comments', title: 'SMS text', checked: false }
                ]
            },
            {
                title: 'Social Media',
                prefs: [
                    { icon: 'pi pi-clock', title: 'Automated Post', checked: true },
                    { icon: 'pi pi-user', title: 'Direct Message', checked: false }
                ]
            },
            {
                title: 'Data Privacy',
                prefs: [
                    { icon: 'pi pi-box', title: 'Share Data with 3rd Parties', checked: true },
                    { icon: 'pi pi-file', title: 'Cookies', checked: false }
                ]
            }
        ];

        this.opportunities = [
            {
                title: 'Apollo',
                link: 'https://primevue.org/templates/apollo/',
                image: 'https://primefaces.org/cdn/primevue/images/layouts/apollo-vue.jpg',
                text: 'Keep your application fresh with Apollo, the newest and most modern template available.'
            },
            {
                title: 'Ultima',
                link: 'https://primevue.org/templates/ultima/',
                image: 'https://primefaces.org/cdn/primevue/images/layouts/ultima-vue.jpg',
                text: "Elevate your application's intuitiveness with Ultima's premium Material Design interface."
            },
            {
                title: 'Diamond',
                link: 'https://primevue.org/templates/diamond/',
                image: 'https://primefaces.org/cdn/primevue/images/layouts/diamond-vue.jpg',
                text: "Handle complex operations with elegance with Diamond's robust and powerful premium design."
            },
            {
                title: 'Atlantis',
                link: 'https://primevue.org/templates/atlantis/',
                image: 'https://primefaces.org/cdn/primevue/images/layouts/atlantis-vue.jpg',
                text: "Boost your application's capabilities, customization with the Atlantis template."
            },
            {
                title: 'Verona',
                link: 'https://primevue.org/templates/verona/',
                image: 'https://primefaces.org/cdn/primevue/images/layouts/verona-vue.jpg',
                text: "Achieve sophistication and subtlety with Verona's minimalistic, content-focused design."
            },
            {
                title: 'Freya',
                link: 'https://primevue.org/templates/freya/',
                image: 'https://primefaces.org/cdn/primevue/images/layouts/freya-vue.png',
                text: "Give your application a sleek, updated look with Freya's chic and modern premium template."
            }
        ];

        this.callLogs = [
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar6.png',
                name: 'Brook Simmons',
                time: '02.02.2024 | 45 min'
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg',
                name: 'Jacob Jones',
                time: '02.02.2024 | 45 min'
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg',
                name: 'Annette Black',
                time: '02.03.2024 | 13 min'
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg',
                name: 'Arlene McCoy',
                time: '02.03.2024 | 14 min'
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar10.jpg',
                name: 'Arlene Simmons',
                time: '02.03.2024 | 14 min'
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg',
                name: 'Michael Brown',
                time: '02.04.2024 | 20 min'
            }
        ];

        this.emailRecords = [
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png',
                name: 'Brook Simmons',
                time: '3:24 PM',
                title: 'Unleash Business Potential',
                text: 'Automate, analyze, and accelerate with our SaaS platform. Unshackle from mundane tasks and focus on scaling your business. Contact us for a demo today!'
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar7.png',
                name: 'Jacob Jones',
                time: '12.23.2023',
                title: 'Optimized Workflow Revolution  ',
                text: "Experience a workflow revolution with our intuitive SaaS tool. With enhanced features and optimized processes, it's efficiency like never before. Let's get in touch for a brief demo!"
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar8.png',
                name: 'Annette Black',
                time: '12.17.2023',
                title: 'Innovation at Fingertips',
                text: 'With our SaaS solution, innovation is only a click away. Shape your future with pioneering features and minimalist design. Join us for your solution walk-through today!'
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg',
                name: 'Arlene McCoy',
                time: '06.17.2023',
                title: 'Seamless Integration',
                text: 'Integrate effortlessly with our user-friendly SaaS tools. Streamline your operations and boost productivity. Discover more in our demo session.'
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg',
                name: 'Arlene Simmons',
                time: '04.17.2023',
                title: 'Transform Your Business',
                text: 'Empower your team with our innovative SaaS solutions. Achieve unparalleled efficiency and drive growth. Book a demo to explore the possibilities.'
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png',
                name: 'Michael Brown',
                time: '01.05.2024',
                title: 'Next-Gen Collaboration',
                text: 'Experience the future of collaboration with our cutting-edge SaaS platform. Enhance teamwork and streamline communication. Contact us for a demo today!'
            }
        ];

        if (isPlatformBrowser(this.platformId)) {
            this.chartData2 = this.setChartData();
            this.chartOptions2 = this.setChartOptions();
            this.lineChartData = this.setLineChartData();
            this.lineChartOptions = this.setLineChartOptions();
        }
    }

    setChartData() {
        const documentStyle = getComputedStyle(document.documentElement);
        const borderColor = documentStyle.getPropertyValue('--p-content-border-color');
        const hoverBackgroundColor = documentStyle.getPropertyValue('--p-primary-color');

        return {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    type: 'bar',
                    label: 'Investment Wallet',
                    backgroundColor: borderColor,
                    data: [100, 201, 404, 300, 140, 220, 314, 520, 145, 234, 325, 147],
                    borderRadius: {
                        topLeft: 4,
                        topRight: 4
                    },
                    borderSkipped: true,
                    barThickness: 20,
                    hoverBackgroundColor: hoverBackgroundColor,
                    hoverTransition: '1s ease all'
                }
            ]
        };
    }

    setChartOptions() {
        const documentStyle = getComputedStyle(document.documentElement);
        const backgroundColor = documentStyle.getPropertyValue('--p-content-background');
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const borderColor = documentStyle.getPropertyValue('--p-content-border-color');
        const textMutedColor = documentStyle.getPropertyValue('--p-text-muted-color');

        const getOrCreateTooltip = (chart) => {
            let tooltipEl = chart.canvas.parentNode.querySelector('div.chartjs-tooltip');

            if (!tooltipEl) {
                tooltipEl = document.createElement('div');
                tooltipEl.classList.add('chartjs-tooltip');
                tooltipEl.style.backgroundColor = backgroundColor;
                tooltipEl.style.boxShadow =
                    ' 0px 33.12px 9.399px 0px rgba(0, 0, 0, 0.00), 0px 21.036px 8.504px 0px rgba(0, 0, 0, 0.01), 0px 12.084px 7.161px 0px rgba(0, 0, 0, 0.05), 0px 5.371px 5.371px 0px rgba(0, 0, 0, 0.09), 0px 1.343px 2.685px 0px rgba(0, 0, 0, 0.10)';
                tooltipEl.style.borderRadius = '7px';
                tooltipEl.style.color = textColor;
                tooltipEl.style.opacity = 1;
                tooltipEl.style.padding = '14.5px';
                tooltipEl.style.pointerEvents = 'none';
                tooltipEl.style.position = 'absolute';
                tooltipEl.style.transform = 'translate(-50%, 0)';
                tooltipEl.style.transition = 'all .2s ease';
                chart.canvas.parentNode.appendChild(tooltipEl);
            }

            return tooltipEl;
        };

        return {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                chartAreaBorder: {
                    borderColor: 'red',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    borderDashOffset: 2
                },
                tooltip: {
                    enabled: false,
                    padding: 5,
                    position: 'nearest',
                    external: function (context) {
                        // Tooltip Element
                        const { chart, tooltip } = context;
                        const tooltipEl = getOrCreateTooltip(chart);

                        // Hide if no tooltip
                        if (tooltip.opacity === 0) {
                            tooltipEl.style.opacity = 0;

                            return;
                        }

                        if (tooltip.body) {
                            const bodyLines = tooltip.body.map((b) => {
                                const strArr = b.lines[0].split(':');
                                const data = {
                                    text: strArr[0].trim(),
                                    value: strArr[1].trim()
                                };

                                return data;
                            });

                            // Clear old content
                            tooltipEl.innerHTML = '';
                            bodyLines.forEach((body, i) => {
                                const text = document.createElement('div');

                                text.appendChild(document.createTextNode('$' + body.value + 'K'));
                                text.style.fontWeight = '500';
                                text.style.lineHeight = '21px';
                                text.style.fontSize = '14px';
                                tooltipEl.appendChild(text);
                            });
                        }

                        const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

                        // Display, position, and set styles for font
                        tooltipEl.style.opacity = 1;
                        tooltipEl.style.left = positionX + tooltip.caretX + 'px';
                        tooltipEl.style.top = positionY + tooltip.caretY + 'px';
                        tooltipEl.style.font = tooltip.options.bodyFont.string;
                        tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textMutedColor
                    },
                    grid: {
                        color: 'transparent',
                        borderColor: 'transparent'
                    }
                },
                y: {
                    border: {
                        display: false
                    },
                    stacked: true,
                    ticks: {
                        color: textMutedColor
                    },
                    grid: {
                        color: borderColor,
                        borderColor: 'transparent'
                    }
                }
            }
        };
    }

    setLineChartData() {
        const { darkTheme } = this.configService.appState();

        return {
            labels: ['31', '1', '2', '3', '4', '5', '6', '7', '8'],
            datasets: [
                {
                    label: 'My First Dataset',
                    data: [60, 64, 57, 52, 58, 70, 75, 70, 60],
                    fill: true,
                    borderColor: '#16A34A',
                    tension: 0.4,
                    borderWidth: 1.5,
                    pointBackgroundColor: '#16A34A',
                    pointBorderColor: darkTheme ? '#09090B' : '#FFF',
                    pointBorderWidth: 3,

                    hideInLegendAndTooltip: false,
                    pointStyle: function (context) {
                        let index = context.dataIndex;

                        if (index == 6) {
                            return 'circle';
                        } else {
                            return 'line';
                        }
                    },
                    pointRadius: function (context) {
                        let index = context.dataIndex;

                        if (index == 6) {
                            return 6;
                        } else {
                            return 0.1;
                        }
                    },
                    backgroundColor: (context) => {
                        const bgColor = ['rgba(22,163,74,0.16)', 'rgba(22,163,74,0)'];

                        if (!context.chart.chartArea) {
                            return;
                        }

                        const {
                            ctx,
                            data,
                            chartArea: { top, bottom }
                        } = context.chart;
                        const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
                        const colorTranches = 1 / (bgColor.length - 1);

                        for (let i = 0; i < bgColor.length; i++) {
                            gradientBg.addColorStop(0 + i * colorTranches, bgColor[i]);
                        }

                        return gradientBg;
                    }
                }
            ],
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Line Chart'
                    }
                }
            }
        };
    }

    setLineChartOptions() {
        const documentStyle = getComputedStyle(document.documentElement);
        const backgroundColor = documentStyle.getPropertyValue('--p-content-background');
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const borderColor = documentStyle.getPropertyValue('--p-content-border-color');
        const textMutedColor = documentStyle.getPropertyValue('--p-text-muted-color');

        const getOrCreateTooltip = (chart) => {
            let tooltipEl = chart.canvas.parentNode.querySelector('div.chartjs-tooltip');

            if (!tooltipEl) {
                tooltipEl = document.createElement('div');
                tooltipEl.classList.add('chartjs-tooltip');
                tooltipEl.style.backgroundColor = backgroundColor;
                tooltipEl.style.boxShadow =
                    ' 0px 33.12px 9.399px 0px rgba(0, 0, 0, 0.00), 0px 21.036px 8.504px 0px rgba(0, 0, 0, 0.01), 0px 12.084px 7.161px 0px rgba(0, 0, 0, 0.05), 0px 5.371px 5.371px 0px rgba(0, 0, 0, 0.09), 0px 1.343px 2.685px 0px rgba(0, 0, 0, 0.10)';
                tooltipEl.style.borderRadius = '7px';
                tooltipEl.style.color = textColor;
                tooltipEl.style.opacity = 1;
                tooltipEl.style.padding = '2px';
                tooltipEl.style.pointerEvents = 'none';
                tooltipEl.style.position = 'absolute';
                tooltipEl.style.transform = 'translate(-50%, 0)';
                tooltipEl.style.transition = 'all .2s ease';
                chart.canvas.parentNode.appendChild(tooltipEl);
            }

            return tooltipEl;
        };

        return {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                chartAreaBorder: {
                    borderColor: 'red',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    borderDashOffset: 2
                },
                tooltip: {
                    enabled: false,
                    padding: 8,
                    position: 'nearest',
                    external: function (context) {
                        // Tooltip Element
                        const { chart, tooltip } = context;
                        const tooltipEl = getOrCreateTooltip(chart);

                        // Hide if no tooltip
                        if (tooltip.opacity === 0) {
                            tooltipEl.style.opacity = 0;

                            return;
                        }

                        if (tooltip.body) {
                            const bodyLines = tooltip.body.map((b) => {
                                const strArr = b.lines[0].split(':');
                                const data = {
                                    text: strArr[0].trim(),
                                    value: strArr[1].trim()
                                };

                                return data;
                            });

                            // Clear old content
                            tooltipEl.innerHTML = '';
                            bodyLines.forEach((body, i) => {
                                const text = document.createElement('div');

                                text.appendChild(document.createTextNode(body.value + '.000'));
                                text.style.fontWeight = '500';
                                text.style.lineHeight = '21px';
                                text.style.fontSize = '14px';
                                tooltipEl.appendChild(text);
                            });
                        }

                        const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

                        // Display, position, and set styles for font
                        tooltipEl.style.opacity = 1;
                        tooltipEl.style.left = positionX + tooltip.caretX + 'px';
                        tooltipEl.style.top = positionY + tooltip.caretY - 40 + 'px';
                        tooltipEl.style.font = tooltip.options.bodyFont.string;
                        tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textMutedColor
                    },
                    grid: {
                        color: 'transparent',
                        borderColor: 'transparent'
                    }
                },
                y: {
                    display: false,
                    grace: 14
                }
            }
        };
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
