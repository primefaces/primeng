import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Doc } from '../../domain/doc';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-doc',
    template: ` <div class="doc-component">
        <ul class="doc-tabmenu" *ngIf="docs && apiDocs">
            <li [ngClass]="{ 'doc-tabmenu-active': activeTab === 0 }">
                <button type="button" (click)="activateTab(0)">FEATURES</button>
            </li>
            <li *ngIf="apiDocs" [ngClass]="{ 'doc-tabmenu-active': activeTab === 1 }">
                <button type="button" (click)="activateTab(1)">API</button>
            </li>
        </ul>
        <div class="doc-tabpanels">
            <div [ngClass]="{ hidden: activeTab === 1 }" class="doc-tabpanel">
                <div class="doc-main">
                    <div class="doc-intro">
                        <h1>{{ header }}</h1>
                        <p>{{ description }}</p>
                    </div>
                    <app-docsection [docs]="docs"></app-docsection>
                </div>
                <app-docsection-nav [docs]="docs"></app-docsection-nav>
            </div>
            <div [ngClass]="{ hidden: activeTab === 0 }">
                <app-docapisection [docs]="apiDocs" [header]="header" class="doc-tabpanel"></app-docapisection>
            </div>
        </div>
    </div>`
})
export class AppDoc implements OnInit, OnChanges {
    @Input() docTitle!: string;

    @Input() docs!: Doc[];

    @Input() header!: string;

    @Input() description!: string;

    @Input() apiDocs!: string[];

    activeTab!: number;

    constructor(private router: Router, private titleService: Title, private metaService: Meta, private cd: ChangeDetectorRef) {}

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
