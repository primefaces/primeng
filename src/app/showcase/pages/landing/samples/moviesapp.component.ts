import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
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
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MeterGroupModule } from 'primeng/metergroup';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { DomHandler } from 'primeng/dom';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { CheckboxModule } from 'primeng/checkbox';
import { CarouselModule } from 'primeng/carousel';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
    selector: 'movies-app',
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
        IconFieldModule,
        InputIconModule,
        CalendarModule,
        ButtonModule,
        TableModule,
        MeterGroupModule,
        InputTextModule,
        MenuModule,
        TagModule,
        MeterGroupModule,
        ProgressBarModule,
        CheckboxModule,
        CarouselModule,
        OverlayBadgeModule,
    ],
    template: `
        <div
            class="flex-1 flex flex-col gap-6 p-6 h-full overflow-y-auto overflow-x-clip overflow-hidden border border-surface rounded-2xl"
        >
            <div class="flex flex-wrap gap-4 items-center justify-between">
                <p-selectButton [(ngModel)]="value" [options]="options" aria-labelledby="basic" />
                <div class="flex gap-2.5 items-center">
                    <p-iconField iconPosition="left">
                        <p-inputIcon class="pi pi-search"> </p-inputIcon>
                        <input type="text" pInputText [(ngModel)]="search" placeholder="Search" />
                    </p-iconField>
                    <!-- <Button severity="secondary" outlined>
                    <OverlayBadge
                        severity="danger"
                        size="small"
                        :pt="{
                            pcbadge: {
                                root: {
                                    class: '!min-w-0 !w-2.5 !h-2.5'
                                }
                            }
                        }"
                    >
                        <i class="pi pi-bell" />
                    </OverlayBadge>
                </Button> -->
                    <p-button severity="secondary" outlined>
                        <p-overlayBadge severity="danger" size="small">
                            <i class="pi pi-bell"></i>
                        </p-overlayBadge>
                    </p-button>
                    <p-avatar
                        image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg"
                        shape="circle"
                        class="w-9 h-9 cursor-pointer"
                    />
                </div>
            </div>
            <div class="">
                <div class="flex items-center justify-between gap-2 mb-6">
                    <div class="text-color text-xl font-medium leading-7">Keep watching</div>
                    <div class="xl:flex hidden items-center gap-2">
                        <p-button
                            [disabled]="page === 0"
                            (click)="previousPage()"
                            icon="pi pi-chevron-left"
                            severity="secondary"
                            outlined
                        />
                        <p-button
                            [disabled]="page === carouselData.length - page"
                            (click)="nextPage()"
                            icon="pi pi-chevron-right"
                            severity="secondary"
                            outlined
                        />
                    </div>
                    <div class="xl:hidden flex items-center gap-2">
                        <p-button
                            [disabled]="page === 0"
                            (click)="previousPage()"
                            icon="pi pi-chevron-left"
                            severity="secondary"
                            outlined
                        />
                        <p-button
                            [disabled]="page === carouselData.length - 3"
                            (click)="nextPage()"
                            icon="pi pi-chevron-right"
                            severity="secondary"
                            outlined
                        />
                    </div>
                </div>
                <p-carousel
                    [value]="carouselData"
                    [page]="page"
                    [numVisible]="5"
                    [numScroll]="1"
                    [responsiveOptions]="responsiveOptions"
                    [showIndicators]="false"
                    [showNavigators]="false"
                >
                    <ng-template pTemplate="item" let-item>
                        <div class="p-2 rounded-xl hover:bg-emphasis transition-colors cursor-pointer">
                            <div class="relative w-full aspect-[195/118.5] rounded-lg overflow-hidden">
                                <img [src]="item.image" class="w-full h-full object-cover" alt="Carousel Movie Image" />
                                <div
                                    class="absolute z-10 top-2 right-2 px-2 py-1 text-sm font-medium leading-tight bg-surface-0 dark:bg-surface-950 border border-surface rounded-md"
                                >
                                    {{ item.point }}
                                </div>
                                <div class="absolute z-10 bottom-2 inset-x-2">
                                    <!-- <ProgressBar
                                    :value="slotProps.data.watchedPercent"
                                    :showValue="false"
                                    :pt="{
                                        root: {
                                            class: '!h-1.5 !bg-surface-950 dark:!bg-surface-50 !rounded-full'
                                        },
                                        value: {
                                            class: '!bg-surface-0 dark:!bg-surface-950 !rounded-full'
                                        }
                                    }"
                                ></ProgressBar> -->
                                    <p-progressBar
                                        [value]="item.watchedPercent"
                                        [showValue]="false"
                                        styleClass="!h-1.5 !bg-surface-950 dark:!bg-surface-50 !rounded-full"
                                    ></p-progressBar>
                                </div>
                            </div>
                            <div class="mt-2 flex items-start justify-between gap-1">
                                <div class="px-2 flex-1">
                                    <div class="font-medium text-color leading-6 line-clamp-1">{{ item.name }}</div>
                                    <div class="mt-1 text-muted-color text-sm leading-5">
                                        {{ item.categories.join(', ') }}
                                    </div>
                                </div>
                                <p-button
                                    *ngIf="item.bookmarked"
                                    icon="pi pi-bookmark-fill"
                                    severity="contrast"
                                    text
                                    rounded
                                />
                            </div>
                        </div>
                    </ng-template>
                </p-carousel>
            </div>
            <div>
                <div class="mb-6 flex items-center gap-4 justify-between">
                    <div class="flex items-center gap-2">
                        <p-button label="Popular" severity="secondary" />
                        <p-button label="New Releases" text severity="secondary" />
                        <p-button label="Recently Added" text severity="secondary" />
                        <p-button label="For you" text severity="secondary" />
                    </div>
                    <p-button label="Show All" severity="secondary" outlined />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-6">
                    <div *ngFor="let movie of popularMovies" class="cursor-pointer">
                        <div class="relative aspect-[259/174.5] rounded-lg overflow-hidden">
                            <img class="w-full h-full object-cover" [src]="movie.image" alt="Popular Movie Cover" />
                            <div
                                class="absolute z-10 top-2 right-2 px-2 py-1 text-sm font-medium leading-tight bg-surface-0 dark:bg-surface-950 border border-surface rounded-md"
                            >
                                {{ movie.point }}
                            </div>
                        </div>
                        <div class="mt-2 flex items-start justify-between gap-1">
                            <div class="px-2 flex-1">
                                <div class="font-medium text-color leading-6 line-clamp-1">{{ movie.name }}</div>
                                <div class="mt-1 text-muted-color text-sm leading-5">
                                    {{ movie.categories.join(', ') }}
                                </div>
                            </div>
                            <p-button
                                *ngIf="movie.bookmarked"
                                icon="pi pi-bookmark-fill"
                                severity="contrast"
                                text
                                rounded
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    host: {
        class: '',
    },
    styleUrls: ['./moviesapp.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MoviesApp {
    search;
    page = 0;
    value;
    options;
    responsiveOptions;
    carouselData;
    popularMovies;

    ngOnInit() {
        this.value = 'Home';
        this.options = ['Home', 'Movies', 'TV Shows', 'Recently Added', 'My List'];
        this.responsiveOptions = [
            {
                breakpoint: '1199px',
                numVisible: 3,
                numScroll: 1,
            },

            {
                breakpoint: '767px',
                numVisible: 2,
                numScroll: 1,
            },
            {
                breakpoint: '575px',
                numVisible: 1,
                numScroll: 1,
            },
        ];
        this.carouselData = [
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie-cover1.png',
                name: 'Heat',
                bookmarked: true,
                point: '4.7',
                watchedPercent: 80,
                categories: ['Action', 'Crime', 'Drama'],
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie-cover2.png',
                name: 'Batman Begins',
                bookmarked: false,
                point: '4.8',
                watchedPercent: 45,
                categories: ['Action', 'Crime', 'Drama'],
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie-cover3.png',
                name: 'Leon: The Professional',
                bookmarked: false,
                point: '4.3',
                watchedPercent: 10,
                categories: ['Action', 'Crime', 'Drama'],
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie-cover4.png',
                name: 'Matrix',
                bookmarked: false,
                point: '4.9',
                watchedPercent: 50,
                categories: ['Action', 'Sci-Fi'],
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie-cover5.png',
                name: 'Fight Club',
                bookmarked: false,
                point: '4.4',
                watchedPercent: 30,
                categories: ['Drama'],
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie-cover6.png',
                name: 'The Big Lebowski',
                bookmarked: false,
                point: '4.7',
                watchedPercent: 40,
                categories: ['Comedy', 'Drama'],
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie-cover7.png',
                name: 'Twelve Angry Men',
                bookmarked: false,
                point: '4.7',
                watchedPercent: 50,
                categories: ['Crime', 'Drama'],
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie-cover8.png',
                name: 'Saving Private Ryan',
                bookmarked: true,
                point: '4.7',
                watchedPercent: 80,
                categories: ['Drama', 'War'],
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie-cover9.png',
                name: 'Seven',
                bookmarked: false,
                point: '4.7',
                watchedPercent: 20,
                categories: ['Crime', 'Drama', 'Mystery'],
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie-cover10.png',
                name: 'Shutter Island',
                bookmarked: false,
                point: '4.7',
                watchedPercent: 70,
                categories: ['Mystery', 'Thriller'],
            },
        ];
        this.popularMovies = [
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie-cover7.png',
                name: 'Twelve Angry Men',
                bookmarked: false,
                point: '4.6',
                categories: ['Crime', 'Drama'],
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie-cover8.png',
                name: 'Saving Private Ryan',
                bookmarked: true,
                point: '4.4',
                categories: ['Drama', 'War'],
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie-cover9.png',
                name: 'Seven',
                bookmarked: false,
                point: '4.3',
                categories: ['Crime', 'Drama', 'Mystery'],
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie-cover10.png',
                name: 'Shutter Island',
                bookmarked: false,
                point: '4.7',
                categories: ['Mystery', 'Thriller'],
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie-cover11.png',
                name: 'Basic Instinct',
                bookmarked: true,
                point: '4.3',
                categories: ['Drama', 'Mystery', 'Thriller'],
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie-cover12.png',
                name: 'Big Hero 6',
                bookmarked: false,
                point: '4.7',
                categories: ['Animation', 'Action', 'Adventure'],
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie-cover13.png',
                name: 'The Lord Of The Rings: Fellowship of the ring',
                bookmarked: true,
                point: '4.9',
                categories: ['Action', 'Adventure', 'Drama'],
            },
            {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie-cover14.png',
                name: 'Kill Bill',
                bookmarked: true,
                point: '4.5',
                categories: ['Action', 'Crime', 'Thriller'],
            },
        ];
    }
    previousPage() {
        this.page -= 1;
    }

    nextPage() {
        this.page += 1;
    }
}
