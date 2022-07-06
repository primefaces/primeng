import {Component, Input, EventEmitter, Output, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-news',
    template: `
        <div class="layout-news" [style]="announcement?.backgroundStyle">
            <div class="layout-news-content">
                <span class="layout-news-text" [style]="announcement.textStyle">{{announcement?.content}}</span>
                <a class="layout-news-link" [href]="announcement?.linkHref" [style]="announcement.linkStyle">{{announcement?.linkText}}</a>
            </div>
            <a tabindex="0" class="layout-news-close" [style]="announcement.textStyle" (click)="hideNews()">
                <span class="pi pi-times"></span>
            </a>
        </div>
    `
})
export class AppNewsComponent {

    @Input() announcement: any;

    @Output() onNewsHide: EventEmitter<any> = new EventEmitter();

    hideNews() {
        this.onNewsHide.emit();
    }
}