import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Doc } from '../../domain/doc';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-doc',
    templateUrl: './app.doc.component.html'
})
export class AppDoc implements OnInit, OnChanges {
    @Input() docTitle!: string;

    @Input() docs!: Doc[];

    @Input() header!: string;

    @Input() description!: string;

    @Input() apiDocs!: string[];

    activeTab!: number;

    constructor(private router: Router, private titleService: Title, private metaService: Meta) {}

    ngOnInit() {
        if (this.router.url.includes('#api')) {
            this.activeTab = 1;
        } else {
            this.activeTab = 0;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.docTitle && changes.docTitle.currentValue) {
            this.titleService.setTitle(changes.docTitle.currentValue);
        }

        if (changes.description && changes.description.currentValue) {
            this.metaService.updateTag({ name: 'description', content: changes.description.currentValue });
        }
    }

    activateTab(index) {
        this.activeTab = index;
    }
}
