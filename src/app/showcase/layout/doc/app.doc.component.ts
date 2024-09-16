import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    OnChanges,
    OnInit,
    Renderer2,
    signal,
    SimpleChanges,
    ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Doc } from '@domain/doc';
import { Title, Meta } from '@angular/platform-browser';
import { AppDocService } from './app.doc.service';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-doc',
    template: ` <div class="doc-component">
        <ul class="doc-tabmenu" *ngIf="docs && apiDocs">
            <li [ngClass]="{ 'doc-tabmenu-active': docService.activeTab() === 0 }">
                <button type="button" (click)="activateTab(0)">FEATURES</button>
            </li>
            <li *ngIf="apiDocs" [ngClass]="{ 'doc-tabmenu-active': docService.activeTab() === 1 }">
                <button type="button" (click)="activateTab(1)">API</button>
            </li>
            <li [ngClass]="{ 'doc-tabmenu-active': docService.activeTab() === 2 }">
                <button type="button" (click)="activateTab(2)">THEMING</button>
            </li>
        </ul>
        <div class="doc-tabpanels">
            <app-docfeaturessection
                [header]="header"
                [description]="description"
                [docs]="docs"
                [ngStyle]="{ display: docService.activeTab() === 0 ? 'flex' : 'none' }"
            />
            <app-docapisection
                [docs]="apiDocs"
                [header]="header"
                class="doc-tabpanel"
                [ngStyle]="{ display: docService.activeTab() === 1 ? 'flex' : 'none' }"
            />
            <app-docthemingsection
                [header]="header"
                class="doc-tabpanel"
                [ngStyle]="{ display: docService.activeTab() === 2 ? 'flex' : 'none' }"
            />
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

    docService = inject(AppDocService);

    activeTab = signal<number>(0);

    router = inject(Router);

    titleService = inject(Title);

    metaService = inject(Meta);

    scrollListener!: any;

    renderer = inject(Renderer2);

    public document: Document = inject(DOCUMENT);

    ngOnInit() {
        if (this.router.url.includes('#api')) {
            this.activateTab(1);
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
        this.docService.activeTab.set(index);
    }
}
