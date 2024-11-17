import { Doc } from '@/domain/doc';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, OnInit, Renderer2, signal, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppDocService } from './app.doc.service';

@Component({
    selector: 'app-doc',
    template: ` <div class="doc-component">
        <ul class="doc-tabmenu">
            @if (docs && apiDocs) {
                <li [ngClass]="{ 'doc-tabmenu-active': docService.activeTab() === 0 }">
                    <button type="button" (click)="activateTab(0)">FEATURES</button>
                </li>
                <li *ngIf="apiDocs" [ngClass]="{ 'doc-tabmenu-active': docService.activeTab() === 1 }">
                    <button type="button" (click)="activateTab(1)">API</button>
                </li>
            }
            @if (themeDocs) {
                <li [ngClass]="{ 'doc-tabmenu-active': docService.activeTab() === 2 }">
                    <button type="button" (click)="activateTab(2)">THEMING</button>
                </li>
            }
        </ul>
        <div class="doc-tabpanels">
            @if (docs) {
                <app-docfeaturessection [header]="header" [description]="description" [docs]="docs" [ngStyle]="{ display: docService.activeTab() === 0 ? 'flex' : 'none' }" />
            }
            @if (apiDocs) {
                <app-docapisection [docs]="apiDocs" [header]="header" class="doc-tabpanel" [ngStyle]="{ display: docService.activeTab() === 1 ? 'flex' : 'none' }" />
            }

            @if (themeDocs) {
                <app-docthemingsection [header]="header" [docs]="themeDocs" class="doc-tabpanel" [ngStyle]="{ display: docService.activeTab() === 2 ? 'flex' : 'none' }" />
            }
        </div>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AppDoc implements OnInit, OnChanges {
    @Input() docTitle!: string;

    @Input() docs!: Doc[];

    @Input() header!: string;

    @Input() description!: string;

    @Input() apiDocs!: string[];

    @Input() themeDocs: string;

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
