import { Doc } from '@/domain/doc';
import { CommonModule, DOCUMENT, isPlatformBrowser, Location } from '@angular/common';
import { Component, DestroyRef, ElementRef, inject, input, OnInit, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomHandler } from 'primeng/dom';
import { ObjectUtils } from 'primeng/utils';
import { fromEvent } from 'rxjs';

@Component({
    selector: 'app-docsection-nav',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="doc-section-nav-container">
            <ul #nav class="doc-section-nav">
                @for (doc of docs(); track doc.label) {
                    @if (!doc.isInterface) {
                        <li class="navbar-item" [ngClass]="{ 'active-navbar-item': activeId() === doc.id }">
                            <div class="navbar-item-content">
                                <button (click)="onButtonClick(doc)">{{ doc.label }}</button>
                            </div>
                            @if (doc.children) {
                                <ul>
                                    @for (child of doc.children; track child.label) {
                                        <li class="navbar-item" [ngClass]="{ 'active-navbar-item': activeId() === child.id }">
                                            <div class="navbar-item-content">
                                                <button (click)="onButtonClick(child)">
                                                    {{ child.label }}
                                                </button>
                                            </div>
                                        </li>
                                    }
                                </ul>
                            }
                        </li>
                    }
                }
            </ul>

            <div class="mt-8 px-4 py-6 rounded-lg border border-surface-200 dark:border-surface-800 bg-surface-0 dark:bg-surface-900 w-full relative cursor-pointer">
                <img src="https://primefaces.org/cdn/primevue/images/primeblocks/primeblocks-menu-light.jpg" class="w-full rounded-xl block dark:hidden mb-4" />
                <img src="https://primefaces.org/cdn/primevue/images/primeblocks/primeblocks-menu-dark.jpg" class="w-full rounded-xl hidden dark:block mb-4" />
                <span class="bg-yellow-400 text-black absolute end-2 top-3 text-xs font-bold rounded-md px-1 py-1 leading-none" value="New">NEW</span>
                <div class="text-xl font-semibold flex flex-col gap-2 text-center">
                    <span class="leading-none">Build Faster </span>
                    <span class="leading-none text-primary">Design Better</span>
                </div>
                <div class="text-center text-sm mt-4 text-secondary">490+ ready to use UI blocks crafted with PrimeVue and Tailwind CSS.</div>
                <span class="flex justify-center">
                    <a pButton label="Learn More" size="small" href="https://primeblocks.org" target="_blank" rel="noopener" class="mt-4 inline-flex" rounded></a>
                </span>
            </div>
        </div>
    `
})
export class AppDocSectionNav implements OnInit {
    docs = input.required<Doc[]>();

    activeId = signal<string | null>(null);

    isScrollBlocked: boolean = false;

    topbarHeight: number = 0;

    scrollEndTimer!: any;

    private readonly document = inject(DOCUMENT);
    private readonly platformId = inject(PLATFORM_ID);
    private readonly location = inject(Location);
    private readonly destroyRef = inject(DestroyRef);

    @ViewChild('nav') nav: ElementRef;

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.scrollCurrentUrl();

            fromEvent(this.document, 'scroll')
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => this.onScroll());
        }
    }

    scrollCurrentUrl() {
        const hash = window.location.hash.substring(1);
        const hasHash = ObjectUtils.isNotEmpty(hash);
        const id = hasHash ? hash : (this.docs()[0] || {}).id;

        this.activeId.set(id);
        hasHash &&
            setTimeout(() => {
                this.scrollToLabelById(id);
            }, 250);
    }

    getLabels() {
        return [...Array.from(this.document.querySelectorAll(':is(h1,h2,h3).doc-section-label'))].filter((el: any) => DomHandler.isVisible(el));
    }

    onScroll() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.isScrollBlocked) {
                if (typeof document !== 'undefined') {
                    const labels = this.getLabels();
                    const windowScrollTop = DomHandler.getWindowScrollTop();
                    labels.forEach((label) => {
                        const { top } = DomHandler.getOffset(label);
                        const threshold = this.getThreshold(label);

                        if (top - threshold <= windowScrollTop) {
                            const link = DomHandler.findSingle(label, 'a');
                            this.activeId.set(link.id);
                        }
                    });
                }
            }

            clearTimeout(this.scrollEndTimer);
            this.scrollEndTimer = setTimeout(() => {
                this.isScrollBlocked = false;

                const activeItem = DomHandler.findSingle(this.nav.nativeElement, '.active-navbar-item');

                activeItem && activeItem.scrollIntoView({ block: 'nearest', inline: 'start' });
            }, 50);
        }
    }

    onButtonClick(doc: Doc) {
        this.activeId.set(doc.id);
        setTimeout(() => {
            this.scrollToLabelById(doc.id);
            this.isScrollBlocked = true;
        }, 1);
    }

    getThreshold(label: Element) {
        if (typeof document !== undefined) {
            if (!this.topbarHeight) {
                const topbar = DomHandler.findSingle(document.body, '.layout-topbar');

                this.topbarHeight = topbar ? DomHandler.getHeight(topbar) : 0;
            }
        }

        return this.topbarHeight + DomHandler.getHeight(label) * 3.5;
    }

    scrollToLabelById(id: string) {
        if (typeof document !== undefined) {
            const label = document.getElementById(id);
            this.location.go(this.location.path().split('#')[0] + '#' + id);
            setTimeout(() => {
                label && label.parentElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
            }, 1);
        }
    }
}
