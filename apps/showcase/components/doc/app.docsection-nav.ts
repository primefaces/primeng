import { Doc } from '@/domain/doc';
import { CommonModule, DOCUMENT, isPlatformBrowser, Location } from '@angular/common';
import { Component, DestroyRef, ElementRef, inject, input, OnInit, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DomHandler } from 'primeng/dom';
import { ObjectUtils } from 'primeng/utils';
import { fromEvent } from 'rxjs';

@Component({
    selector: 'app-docsection-nav',
    standalone: true,
    imports: [CommonModule, ButtonModule, RouterLink],
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
            @if (false) {
                <div class="mt-8 px-4 py-6 rounded-lg border border-surface-200 dark:border-surface-800 bg-surface-0 dark:bg-surface-900 w-full">
                    <img [src]="ad.lightImage" class="w-full rounded-xl block dark:hidden mb-4" />
                    <img [src]="ad.darkImage" class="w-full rounded-xl hidden dark:block mb-4" />
                    <div class="text-xl font-semibold flex flex-col gap-2 text-center">
                        <span class="leading-none">{{ ad.title }}</span>
                    </div>
                    <div class="text-center text-sm mt-4 text-secondary">{{ ad.details }}</div>
                    <span class="flex justify-center mt-4">
                        @if (ad.href) {
                            <a pButton label="Learn More" size="small" [href]="ad.href" target="_blank" rel="noopener" rounded></a>
                        }
                        @if (ad.routerLink) {
                            <a pButton label="Learn More" size="small" [routerLink]="ad.routerLink" rounded></a>
                        }
                    </span>
                </div>
            }
            <a href="https://primeui.store" target="_blank" class="mt-8 block w-full">
                <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/common.images/ads/dec25/endofyear-light.jpg" class="w-full rounded-xl block dark:hidden" />
                <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/common.images/ads/dec25/endofyear-dark.jpg" class="w-full rounded-xl hidden dark:block" />
                <div class="text-xl font-semibold flex flex-col gap-2 text-center mt-4">
                    <span class="leading-none">END OF YEAR SALE</span>
                </div>
                <div class="text-center text-sm mt-4 text-muted-color">Apply coupon code <strong>ENDOFYEAR25</strong> at checkout to enjoy 25% off your order.</div>
                <span class="flex justify-center mt-4">
                    <span class="p-button p-button-rounded p-button-sm font-semibold">Buy Now</span>
                </span>
            </a>
        </div>
    `
})
export class AppDocSectionNav implements OnInit {
    docs = input.required<Doc[]>();

    activeId = signal<string | null>(null);

    isScrollBlocked: boolean = false;

    topbarHeight: number = 0;

    scrollEndTimer!: any;

    ad = null;

    ads = [
        {
            lightImage: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/common.images/ads/primeblocks-menu-light.jpg',
            darkImage: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/common.images/ads/primeblocks-menu-dark.jpg',
            title: 'PrimeBlocks',
            details: '490+ ready to use UI blocks crafted with PrimeNG and Tailwind CSS.',
            href: 'https://primeblocks.org'
        },
        {
            lightImage: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/common.images/ads/primeone-menu-light.jpg',
            darkImage: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/common.images/ads/primeone-menu-dark.jpg',
            title: 'Figma UI Kit',
            details: 'The official Figma UI Kit for Prime UI libraries, the essential resource for designing with PrimeOne components.',
            routerLink: '/uikit'
        },
        {
            lightImage: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/common.images/ads/templates-menu-light.jpg',
            darkImage: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/common.images/ads/templates-menu-dark.jpg',
            title: 'Templates',
            details: 'Highly customizable application templates to get started in no time with style. Designed and implemented by PrimeTek.',
            routerLink: '/templates'
        },
        {
            lightImage: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/common.images/ads/themedesigner-menu-light.jpg',
            darkImage: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/common.images/ads/themedesigner-menu-dark.jpg',
            title: 'Theme Designer',
            details: 'Theme Designer is the ultimate tool to customize and design your own themes featuring a visual editor, figma to theme code, cloud storage, and migration assistant.',
            routerLink: '/designer'
        }
    ];

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

        this.ad = this.ads[Math.floor(Math.random() * this.ads.length)];
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
