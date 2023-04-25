import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-news',
    templateUrl: './app.news.component.html'
})
export class AppNewsComponent {
    @Input() announcement: any;

    @Output() onNewsHide: EventEmitter<any> = new EventEmitter();

    hideNews() {
        this.onNewsHide.emit();
    }
}
