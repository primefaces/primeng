import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Doc } from '../../domain/doc';

@Component({
    selector: 'app-doc',
    templateUrl: './app.doc.component.html'
})
export class AppDoc {
    @Input() docs!: Doc[];

    @Input() header!: string;

    @Input() description!: string;

    @Input() apiDocs!: Doc[];

    activeTab!: number;

    constructor(private router: Router) {}

    ngOnInit() {
        if (this.router.url.includes('#api')) {
            this.activeTab = 1;
        } else {
            this.activeTab = 0;
        }
    }

    activateTab(index) {
        this.activeTab = index;
    }
}
