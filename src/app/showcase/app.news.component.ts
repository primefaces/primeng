import {Component, Input, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-news',
    template: `
        <div class="layout-news">
            <div class="layout-news-container" (click)="redirect()">
                <img class="layout-news-logo p-ml-2" src="assets/showcase/images/topbar-newyear-logo.svg">
                <h3 class="layout-news-header p-px-2">DISCOUNT UP TO 50% ON EVERYTHING AT PRIMESTORE</h3>
                <a href="https://www.primefaces.org/primeblocks-ng" target="_blank"  style="text-decoration: none" class="layout-news-button">
                    Read More
                </a>
                <a tabindex="0" class="layout-news-close" (click)="hideNews($event)">
                    <i class="pi pi-times"></i>
                </a>
            </div>
        </div>
    `
})
export class AppNewsComponent {

    @Input() active: boolean;

    @Output() onNewsHide: EventEmitter<any> = new EventEmitter();

    hideNews(event: Event) {
        this.onNewsHide.emit();
        event.preventDefault();
    }

    redirect() {
        window.open('https://www.primefaces.org/store"', '_blank');
    }
}
