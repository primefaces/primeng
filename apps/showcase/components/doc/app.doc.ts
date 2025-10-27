import { Doc } from '@/domain/doc';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, OnChanges, OnInit, Renderer2, signal, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppDocService } from './app.doc.service';
import { AppDocApiSection } from './app.docapisection';
import { AppDocFeaturesSection } from './app.docfeaturessection';
import { AppDocPtSection } from './app.docptsection';
import { AppDocThemingSection } from './app.docthemingsection';

@Component({
    selector: 'app-doc',
    standalone: true,
    imports: [CommonModule, AppDocFeaturesSection, AppDocApiSection, AppDocThemingSection, AppDocPtSection],
    providers: [AppDocService],
    template: ` <div class="doc-component">
        <ul class="doc-tabmenu">
            @if (isComponentDoc()) {
                <li [ngClass]="{ 'doc-tabmenu-active': docService.activeTab() === 0 }">
                    <button type="button" (click)="activateTab(0)">FEATURES</button>
                </li>
            }
            @if (apiDocs()) {
                <li [ngClass]="{ 'doc-tabmenu-active': docService.activeTab() === 1 }">
                    <button type="button" (click)="activateTab(1)">API</button>
                </li>
            }
            @if (_componentName() || themeDocs()) {
                <li [ngClass]="{ 'doc-tabmenu-active': docService.activeTab() === 2 }">
                    <button type="button" (click)="activateTab(2)">THEMING</button>
                </li>
            }
            @if (ptDocs()) {
                <li [ngClass]="{ 'doc-tabmenu-active': docService.activeTab() === 3 }">
                    <button type="button" (click)="activateTab(3)">PASSTHROUGH</button>
                </li>
            }
        </ul>
        <div class="doc-tabpanels">
            @if (docs()) {
                <app-docfeaturessection [header]="header() ?? _componentName()" [description]="description()" [docs]="docs()" [ngStyle]="{ display: docService.activeTab() === 0 ? 'flex' : 'none' }" />
            }
            @if (apiDocs()) {
                @defer (when docService.activeTab() === 1) {
                    <app-docapisection [docs]="apiDocs()" [header]="header() ?? _componentName()" class="doc-tabpanel" [ngStyle]="{ display: docService.activeTab() === 1 ? 'flex' : 'none' }" />
                }
            }

            @if (_componentName() || themeDocs()) {
                @defer (when docService.activeTab() === 2) {
                    <app-docthemingsection [header]="header()" [docs]="themeDocs()" [componentName]="_componentName()" class="doc-tabpanel" [ngStyle]="{ display: docService.activeTab() === 2 ? 'flex' : 'none' }" />
                }
            }
            @if (ptDocs()) {
                @defer (when docService.activeTab() === 3) {
                    <app-docptsection [ptComponent]="ptDocs()" [componentName]="_componentName()" class="doc-tabpanel" [ngStyle]="{ display: docService.activeTab() === 3 ? 'flex' : 'none' }" />
                }
            }
        </div>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AppDoc implements OnInit, OnChanges {
    docTitle = input<string>('');

    docs = input<Doc[]>();

    description = input<string>('');

    apiDocs = input<string[]>();

    themeDocs = input<string>('');

    header = input<string>('');

    componentName = input<string>('');

    _componentName = computed(() => {
        return this.componentName() || this.themeDocs() || this.header();
    });

    isComponentDoc = computed(() => !!(this.docs() && (this.apiDocs() || this.themeDocs() || this.ptDocs())));

    ptDocs = input<any>();

    docService = inject(AppDocService);

    activeTab = signal<number>(0);

    router = inject(Router);

    titleService = inject(Title);

    metaService = inject(Meta);

    scrollListener!: any;

    renderer = inject(Renderer2);

    public document: Document = inject(DOCUMENT);

    ngOnInit() {
        this.navigate();
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

    navigate() {
        if (this.router.url.includes('#api')) {
            this.activateTab(1);
        }
        if (this.router.url.toLowerCase().includes('classes') || this.router.url.toLowerCase().includes('designtokens')) {
            this.activateTab(2);
        }
        if (this.router.url.includes('#pt')) {
            this.activateTab(3);
        }
    }

    ngOnDestroy() {
        this.activateTab(0);
    }
}
