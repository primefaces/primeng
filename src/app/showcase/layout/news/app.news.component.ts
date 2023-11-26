import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StyleClassModule } from 'primeng/styleclass';
import News from '../../data/news.json';
import { AppConfigService } from '../../service/appconfigservice';

@Component({
    selector: 'app-news',
    standalone: true,
    templateUrl: './app.news.component.html',
    imports: [CommonModule, FormsModule, StyleClassModule]
})
export class AppNewsComponent implements OnInit {
    storageKey: string = 'primeng';

    announcement: any;

    constructor(@Inject(PLATFORM_ID) private platformId: any, private configService: AppConfigService) {}

    get isNewsActive(): boolean {
        return this.configService.state.newsActive;
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            const itemString = localStorage.getItem(this.storageKey);

            if (itemString) {
                const item = JSON.parse(itemString);

                if (!item.hiddenNews || item.hiddenNews !== News.id) {
                    this.configService.state.newsActive = true;
                    this.announcement = News;
                } else {
                    this.configService.state.newsActive = false;
                }
            } else {
                this.configService.state.newsActive = true;
                this.announcement = News;
            }
        }
    }

    hideNews() {
        this.configService.hideNews();
        const item = {
            hiddenNews: this.announcement.id
        };

        localStorage.setItem(this.storageKey, JSON.stringify(item));
    }
}
