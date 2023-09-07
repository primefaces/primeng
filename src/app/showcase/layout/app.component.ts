import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Announcement from '../data/news.json';
import { AppConfigService } from '../service/appconfigservice';

declare let gtag: Function;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any, private renderer: Renderer2, private configService: AppConfigService, private router: Router) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                gtag('event', 'page_view', {
                    page_path: event.urlAfterRedirects
                });
            }
        });
    }

    public subscription: Subscription;

    public announcement: any = Announcement;

    public newsActive: boolean;

    storageKey = 'primeng';

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            const itemString = localStorage.getItem(this.storageKey);
            if (itemString) {
                const item = JSON.parse(itemString);
                if (item.hiddenNews && item.hiddenNews !== Announcement.id) {
                    this.newsActive = true;
                }
            } else {
                this.newsActive = true;
            }
        }
    }

    onNewsClose() {
        if (isPlatformBrowser(this.platformId)) {
            this.newsActive = false;

            const item = {
                hiddenNews: this.announcement.id
            };

            localStorage.setItem(this.storageKey, JSON.stringify(item));
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
