import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppConfigService } from '../../service/appconfigservice';

@Component({
    selector: 'users-section',
    standalone: true,
    imports: [CommonModule],
    template: `
        <section class="landing-users py-8 px-3 lg:px-8">
            <div class="section-header">Who Uses</div>
            <p class="section-detail">
                PrimeTek libraries have reached over<span class="font-semibold animated-text relative white-space-nowrap"><span>150 Million Downloads</span></span
                >on npm! Join the PrimeLand community and experience the difference yourself.
            </p>
            <div class="logo-section relative w-full md:w-8 mt-6 users-container">
                <div class="fade-left h-6rem w-6rem block absolute top-0 left-0 z-2" style="background: linear-gradient(to right, var(--home-bg), transparent)"></div>
                <div class="marquee-wrapper overflow-hidden flex">
                    <div class="marquee">
                        <div class="w-full" *ngFor="let user of usersData.slice(0, 6)">
                            <img src="https://primefaces.org/cdn/primeng/images/landing/whouses/{{ user.name }}-{{ isDarkMode ? 'light' : 'dark' }}.svg" [width]="user.width" [height]="user.height" [alt]="user.name" />
                        </div>
                    </div>
                    <div class="marquee">
                        <div class="w-full" *ngFor="let user of usersData.slice(0, 6)">
                            <img src="https://primefaces.org/cdn/primeng/images/landing/whouses/{{ user.name }}-{{ isDarkMode ? 'light' : 'dark' }}.svg" [width]="user.width" [height]="user.height" [alt]="user.name" />
                        </div>
                    </div>
                    <div class="marquee">
                        <div class="w-full" *ngFor="let user of usersData.slice(0, 6)">
                            <img src="https://primefaces.org/cdn/primeng/images/landing/whouses/{{ user.name }}-{{ isDarkMode ? 'light' : 'dark' }}.svg" [width]="user.width" [height]="user.height" [alt]="user.name" />
                        </div>
                    </div>
                </div>
                <div class="fade-right h-6rem w-6rem block absolute top-0 right-0 z-2" style="background: linear-gradient(to left, var(--home-bg), transparent)"></div>
            </div>
            <div class="logo-section relative w-full md:w-8 mt-2 users-container">
                <div class="fade-left h-6rem w-6rem block absolute top-0 left-0 z-2" style="background: linear-gradient(to right, var(--home-bg), transparent)"></div>
                <div class="marquee-wrapper overflow-hidden flex">
                    <div class="marquee marquee-reverse">
                        <div class="w-full" *ngFor="let user of usersData.slice(6)">
                            <img src="https://primefaces.org/cdn/primeng/images/landing/whouses/{{ user.name }}-{{ isDarkMode ? 'light' : 'dark' }}.svg" [width]="user.width" [height]="user.height" [alt]="user.name" />
                        </div>
                    </div>
                    <div class="marquee marquee-reverse">
                        <div class="w-full" *ngFor="let user of usersData.slice(6)">
                            <img src="https://primefaces.org/cdn/primeng/images/landing/whouses/{{ user.name }}-{{ isDarkMode ? 'light' : 'dark' }}.svg" [width]="user.width" [height]="user.height" [alt]="user.name" />
                        </div>
                    </div>
                    <div class="marquee marquee-reverse">
                        <div class="w-full" *ngFor="let user of usersData.slice(6)">
                            <img src="https://primefaces.org/cdn/primeng/images/landing/whouses/{{ user.name }}-{{ isDarkMode ? 'light' : 'dark' }}.svg" [width]="user.width" [height]="user.height" [alt]="user.name" />
                        </div>
                    </div>
                </div>
                <div class="fade-right h-6rem w-6rem block absolute top-0 right-0 z-2" style="background: linear-gradient(to left, var(--home-bg), transparent)"></div>
            </div>
        </section>
    `
})
export class UsersSectionComponent {
    constructor(private configService: AppConfigService) {}

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

    get isDarkMode() {
        return this.configService.config().darkMode;
    }
}
