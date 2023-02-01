import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfig } from './domain/appconfig';
import { AppConfigService } from './service/appconfigservice';
import Announcement from './data/news.json';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(private configService: AppConfigService) {}

    config: AppConfig;

    public subscription: Subscription;

    public announcement: any = Announcement;

    public newsActive: boolean;

    storageKey = 'primeng';

    ngOnInit() {
        this.config = { theme: 'lara-light-blue', dark: false };

        this.subscription = this.configService.configUpdate$.subscribe((config) => {
            const linkElement = document.getElementById('theme-link');
            this.replaceLink(linkElement, config.theme);
            this.config = config;
        });

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

    onNewsClose() {
        this.newsActive = false;

        const item = {
            hiddenNews: this.announcement.id
        };

        localStorage.setItem(this.storageKey, JSON.stringify(item));
    }

    replaceLink(linkElement, theme) {
        const id = linkElement.getAttribute('id');
        const cloneLinkElement = linkElement.cloneNode(true);

        cloneLinkElement.setAttribute('href', linkElement.getAttribute('href').replace(this.config.theme, theme));
        cloneLinkElement.setAttribute('id', id + '-clone');

        linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

        cloneLinkElement.addEventListener('load', () => {
            linkElement.remove();
            cloneLinkElement.setAttribute('id', id);
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
