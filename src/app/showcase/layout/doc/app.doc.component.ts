import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    OnChanges,
    OnInit,
    signal,
    SimpleChanges,
    ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Doc } from '@domain/doc';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-doc',
    template: ` <div class="doc-component">
        <ul class="doc-tabmenu" *ngIf="docs && apiDocs">
            <li [ngClass]="{ 'doc-tabmenu-active': activeTab() === 0 }">
                <button type="button" (click)="activateTab(0)">FEATURES</button>
            </li>
            <li *ngIf="apiDocs" [ngClass]="{ 'doc-tabmenu-active': activeTab() === 1 }">
                <button type="button" (click)="activateTab(1)">API</button>
            </li>
            <li [ngClass]="{ 'doc-tabmenu-active': activeTab() === 2 }">
                <button type="button" (click)="activateTab(2)">THEMING</button>
            </li>
        </ul>
        <div class="doc-tabpanels">
            <div [style.display]="activeTab() !== 0 ? 'none' : ''" class="doc-tabpanel">
                <div class="doc-main">
                    <div class="doc-intro">
                        <h1>{{ header }}</h1>
                        <p>{{ description }}</p>
                    </div>
                    <app-docsection [docs]="docs" />
                </div>
                <app-docsection-nav [docs]="docs" />
            </div>
            <div [style.display]="activeTab() !== 1 ? 'none' : ''" class="doc-tabpanel">
                <app-docapisection [docs]="apiDocs" [header]="header" />
            </div>
            <div [style.display]="activeTab() !== 2 ? 'none' : ''" class="doc-tabpanel">
                <app-docthemingsection [header]="header" />
            </div>
        </div>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class AppDoc implements OnInit, OnChanges {
    @Input() docTitle!: string;

    @Input() docs!: Doc[];

    @Input() header!: string;

    @Input() description!: string;

    @Input() apiDocs!: string[];

    activeTab = signal<number>(0);

    router = inject(Router);

    titleService = inject(Title);

    metaService = inject(Meta);

    ngOnInit() {
        if (this.router.url.includes('#api')) {
            this.activeTab.set(1);
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
        this.activeTab.set(index);
    }
}
