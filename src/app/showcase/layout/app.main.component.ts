import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppConfig } from '../domain/appconfig';
import { AppConfigService } from '../service/appconfigservice';
import { AppComponent } from './app.component';
import { DomHandler } from 'primeng/dom';

@Component({
    selector: 'app-main',
    template: `
    <div class="layout-wrapper" [ngClass]="containerClass">
        <app-news *ngIf="app.newsActive && app.announcement" (onNewsHide)="app.onNewsClose()" [announcement]="app.announcement"></app-news>
        <app-topbar  (menuButtonClick)="onMenuButtonClick()"></app-topbar>
        <app-config></app-config>
        <div class="layout-mask" [ngClass]="{'layout-mask-active': menuActive}" (click)="onMaskClick()"></div>
        <div class="layout-content">
            <app-menu [active]="menuActive"></app-menu>
            <div class="layout-content-slot">
                <router-outlet></router-outlet>
            </div>
        </div>
        <app-footer></app-footer>
    </div>
    `
})
export class AppMainComponent implements OnInit {
    menuActive: boolean;

    newsActive: boolean = true;

    config: AppConfig;

    news_key = 'primenews';

    public subscription: Subscription;
    
    get containerClass() {
        return {
            'layout-news-active': this.app.newsActive && this.app.announcement,
            'p-input-filled': this.config.inputStyle === 'filled',
            'p-ripple-disabled': !this.config.ripple,
            'layout-dark': this.config.dark,
            'layout-light': !this.config.dark
        }
    }

    constructor(@Inject(PLATFORM_ID) private platformId: any, @Inject(DOCUMENT) private document: Document, private router: Router, private configService: AppConfigService, private primengConfig: PrimeNGConfig, public app: AppComponent) {}

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
        DomHandler.addClass(this.document.body, 'blocked-scroll');
        this.document.body.style.setProperty('--scrollbar-width', DomHandler.calculateScrollbarWidth() + 'px');
    }

    onMaskClick() {
        this.hideMenu();
    }

    hideMenu() {
        this.menuActive = false;
        DomHandler.removeClass(this.document.body, 'blocked-scroll');
        this.document.body.style.removeProperty('--scrollbar-width');
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
