import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfigService } from '../service/appconfigservice';
import Announcement from '../data/news.json';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any, private renderer: Renderer2, private configService: AppConfigService) {}

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
