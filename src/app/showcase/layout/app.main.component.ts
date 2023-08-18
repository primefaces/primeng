import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppConfig } from '../domain/appconfig';
import { AppConfigService } from '../service/appconfigservice';
import { AppComponent } from './app.component';

@Component({
    selector: 'app-main',
    templateUrl: './app.main.component.html'
})
export class AppMainComponent implements OnInit {
    menuActive: boolean;

    newsActive: boolean = true;

    config: AppConfig;

    news_key = 'primenews';

    public subscription: Subscription;

    constructor(@Inject(PLATFORM_ID) private platformId: any, private router: Router, private configService: AppConfigService, private primengConfig: PrimeNGConfig, public app: AppComponent) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe((config) => {
            this.config = config;
        });
        if (isPlatformBrowser(this.platformId)) {
            this.newsActive = this.newsActive && this.isNewsStorageExpired();
        }
    }

    onMenuButtonClick() {
        this.menuActive = true;
        this.addClass(document.body, 'blocked-scroll');
    }

    onMaskClick() {
        this.hideMenu();
    }

    hideMenu() {
        this.menuActive = false;
        this.removeClass(document.body, 'blocked-scroll');
    }

    addClass(element: any, className: string) {
        if (element.classList) element.classList.add(className);
        else element.className += ' ' + className;
    }

    removeClass(element: any, className: string) {
        if (element.classList) element.classList.remove(className);
        else element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    hideNews() {
        this.newsActive = false;
        const now = new Date();
        const item = {
            value: false,
            expiry: now.getTime() + 604800000
        };
        localStorage.setItem(this.news_key, JSON.stringify(item));
    }

    isNewsStorageExpired() {
        const newsString = localStorage.getItem(this.news_key);
        if (!newsString) {
            return true;
        }
        const newsItem = JSON.parse(newsString);
        const now = new Date();

        if (now.getTime() > newsItem.expiry) {
            localStorage.removeItem(this.news_key);
            return true;
        }

        return false;
    }

    isDarkTheme(theme) {
        return theme.indexOf('dark') !== -1 || theme.indexOf('vela') !== -1 || theme.indexOf('arya') !== -1 || theme.indexOf('luna') !== -1;
    }

    applyScale(scale: number) {
        document.documentElement.style.fontSize = scale + 'px';
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
