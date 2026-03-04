import { AppConfigService } from '@/service/appconfigservice';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'users-section',
    standalone: true,
    imports: [CommonModule],
    template: `
        <section class="landing-users py-20 px-3.5 lg:px-20">
            <div class="section-header">Who Uses</div>
            <p class="section-detail">
                PrimeTek libraries have reached over<span class="font-semibold animated-text relative white-space-nowrap !p-0"><span>400 Million Downloads</span></span
                >on npm! Join the PrimeLand community and experience the difference yourself.
            </p>
            <div class="flex justify-center items-center mt-5">
                <span class="ml-2"> </span>
            </div>
            @for (x of users; track $index) {
                <div class="logo-section relative w-full md:w-8/12 mt-10 users-container">
                    <div class="fade-left h-21 w-21 block absolute top-0 left-0 z-20"></div>
                    <div class="marquee-wrapper overflow-hidden flex">
                        @for (_ of [1, 2, 3]; track $index) {
                            <div [ngClass]="getMarqueeClass(x.reverse)">
                                @for (user of x.slicedUsers; track $index) {
                                    <div class="w-full">
                                        <img [src]="imgSrc(user)" [alt]="user + '-' + colorScheme" />
                                    </div>
                                }
                            </div>
                        }
                    </div>
                    <div class="fade-right h-21 w-21 block absolute top-0 right-0 z-20"></div>
                </div>
            }
        </section>
    `
})
export class UsersSectionComponent {
    constructor(private configService: AppConfigService) {}

    usersData = ['fox', 'airbus', 'mercedes', 'ebay', 'ford', 'vw', 'intel', 'unicredit', 'lufthansa', 'nvidia', 'verizon', 'amex'];
    users = null;

    ngOnInit() {
        this.users = [
            { slicedUsers: this.usersData.slice(0, 6), reverse: false },
            { slicedUsers: this.usersData.slice(6), reverse: true }
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
        return this.configService.appState().darkTheme;
    }
}
