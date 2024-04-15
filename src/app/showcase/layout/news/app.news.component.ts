import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, afterNextRender } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StyleClassModule } from '@alamote/primeng/styleclass';
import News from '../../data/news.json';
import { AppConfigService } from '../../service/appconfigservice';

@Component({
    selector: 'app-news',
    standalone: true,
    templateUrl: './app.news.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, FormsModule, StyleClassModule]
})
export class AppNewsComponent {
    storageKey: string = 'primeng';

    announcement: any;

    constructor(private configService: AppConfigService, private cd: ChangeDetectorRef) {
        afterNextRender(() => {
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
            this.cd.markForCheck();
        });
    }

    get isNewsActive(): boolean {
        return this.configService.state.newsActive;
    }

    hideNews() {
        this.configService.hideNews();
        const item = {
            hiddenNews: this.announcement.id
        };

        localStorage.setItem(this.storageKey, JSON.stringify(item));
    }
}
