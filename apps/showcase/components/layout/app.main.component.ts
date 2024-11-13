import { AppConfigService } from '@/service/appconfigservice';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { AppFooterComponent } from './footer/app.footer.component';
import { AppMenuComponent } from './menu/app.menu.component';
import { AppNewsComponent } from './news/app.news.component';
import { AppTopBarComponent } from './topbar/app.topbar.component';

@Component({
    selector: 'app-main',
    template: `
        <div class="layout-wrapper" [ngClass]="containerClass">
            <app-news />
            <app-topbar />
            <div class="layout-mask" [ngClass]="{ 'layout-mask-active': isMenuActive }" (click)="hideMenu()"></div>
            <div class="layout-content">
                <app-menu />
                <div class="layout-content-slot">
                    <router-outlet></router-outlet>
                </div>
            </div>
            <app-footer />
        </div>
    `,
    standalone: true,
    imports: [RouterOutlet, AppFooterComponent, CommonModule, AppNewsComponent, AppMenuComponent, AppTopBarComponent]
})
export class AppMainComponent {
    configService: AppConfigService = inject(AppConfigService);

    config: PrimeNGConfig = inject(PrimeNGConfig);

    get isNewsActive(): boolean {
        return this.configService.state.newsActive;
    }

    get isDarkMode(): boolean {
        return this.configService.appState().darkTheme;
    }

    get isRippleDisabled(): boolean {
        return this.config.ripple() === false;
    }

    get isMenuActive(): boolean {
        return this.configService.state.menuActive;
    }

    get containerClass() {
        return {
            'layout-news-active': this.isNewsActive
            // 'p-ripple-disabled': this.isRippleDisabled,
        };
    }

    hideMenu() {
        this.configService.hideMenu();
        DomHandler.unblockBodyScroll('blocked-scroll');
    }
}
