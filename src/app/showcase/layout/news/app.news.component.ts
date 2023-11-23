import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
    selector: 'app-news',
    standalone: true,
    templateUrl: './app.news.component.html',
    imports: [CommonModule, FormsModule, StyleClassModule]
})
export class AppNewsComponent {
    @Input() announcement: any;

    @Output() onNewsHide: EventEmitter<any> = new EventEmitter();

    hideNews() {
        this.onNewsHide.emit();
    }
}
