import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppConfigService } from '@service/appconfigservice';

@Component({
    selector: 'users-section',
    standalone: true,
    imports: [CommonModule],
    template: `
        <section class="landing-users py-20 px-4 lg:px-20">
            <div class="section-header">Who Uses</div>
            <p class="section-detail">
                PrimeTek libraries have reached over<span
                    class="font-semibold animated-text relative white-space-nowrap"
                    ><span>150 Million Downloads</span></span
                >on npm! Join the PrimeLand community and experience the difference yourself.
            </p>
            <div class="flex justify-center items-center mt-6">
                <span class="ml-2"> </span>
            </div>
            <div
                *ngFor="let x of users; let i = index"
                class="logo-section relative w-full md:w-8/12 mt-12 users-container"
            >
                <div class="fade-left h-24 w-24 block absolute top-0 left-0 z-20"></div>
                <div class="marquee-wrapper overflow-hidden flex">
                    <div *ngFor="let _ of [1, 2, 3]" [ngClass]="getMarqueeClass(x.reverse)">
                        <ng-container *ngFor="let user of x.slicedUsers">
                            <div class="w-full">
                                <img [src]="imgSrc(user)" [alt]="user + '-' + colorScheme" />
                            </div>
                        </ng-container>
                    </div>
                </div>
                <div class="fade-right h-24 w-24 block absolute top-0 right-0 z-20"></div>
            </div>
        </section>
    `,
})
export class UsersSectionComponent {
    constructor(private configService: AppConfigService) {}

    usersData = [
        'fox',
        'airbus',
        'mercedes',
        'ebay',
        'ford',
        'vw',
        'intel',
        'unicredit',
        'lufthansa',
        'nvidia',
        'verizon',
        'amex',
    ];
    users = null;

    ngOnInit() {
        this.users = [
            { slicedUsers: this.usersData.slice(0, 6), reverse: false },
            { slicedUsers: this.usersData.slice(6), reverse: true },
        ];
    }

    imgSrc(brand) {
        const colorScheme = this.isDarkMode ? 'light' : 'dark';
        return `https://primefaces.org/cdn/primevue/images/landing/whouses/${brand}-${colorScheme}.svg`;
    }

    getMarqueeClass(reverse: boolean): string {
        return reverse ? 'marquee marquee-reverse' : 'marquee';
    }

    get isDarkMode() {
        return this.configService.config().darkMode;
    }
}