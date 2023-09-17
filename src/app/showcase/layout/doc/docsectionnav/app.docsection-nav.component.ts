import { DOCUMENT, Location } from '@angular/common';
import { Router } from '@angular/router';
import { Component, ElementRef, Inject, Input, NgZone, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import { ObjectUtils } from 'primeng/utils';
import { Subscription } from 'rxjs';
import { Doc } from 'src/app/showcase/domain/doc';

@Component({
    selector: 'app-docsection-nav',
    templateUrl: './app.docsection-nav.component.html'
})
export class AppDocSectionNavComponent implements OnInit, OnDestroy {
    @Input() docs!: Doc[];

    subscription!: Subscription;

    scrollListener!: any;

    activeId!: string;

    isScrollBlocked: boolean = false;

    topbarHeight: number = 0;

    scrollEndTimer!: any;

    @ViewChild('nav') nav: ElementRef;

    constructor(@Inject(DOCUMENT) private document: Document, private location: Location, private zone: NgZone, private renderer: Renderer2, private router: Router) {}

    ngOnInit(): void {
        if (typeof window !== undefined) {
            const hash = window.location.hash.substring(1);
            const hasHash = ObjectUtils.isNotEmpty(hash);
            const id = hasHash ? hash : ((this.docs && this.docs[0]) || {}).id;

            this.activeId = id;
            hasHash &&
                setTimeout(() => {
                    this.scrollToLabelById(id);
                }, 1);

            this.zone.runOutsideAngular(() => {
                this.scrollListener = this.renderer.listen(this.document, 'scroll', (event: any) => {
                    this.onScroll();
                });
            });
        }
    }

    onScroll() {
        if (typeof window !== undefined && this.nav) {
            if (!this.isScrollBlocked) {
                if (typeof document !== undefined) {
                    const labels = [...Array.from(this.document.querySelectorAll(':is(h1,h2,h3).doc-section-label'))].filter((el: any) => DomHandler.isVisible(el));
                    const windowScrollTop = DomHandler.getWindowScrollTop();

                    labels.forEach((label) => {
                        const { top } = DomHandler.getOffset(label);
                        const threshold = this.getThreshold(label);

                        if (top - threshold <= windowScrollTop) {
                            const link = DomHandler.findSingle(label, 'a');
                            this.activeId = link.id;
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

    onChildButtonClick(parent: Doc, isFirst: boolean, child: Doc): void {
        this.onButtonClick(isFirst ? parent : child);
    }

    onButtonClick(doc) {
        this.activeId = doc.id;
        setTimeout(() => {
            this.scrollToLabelById(doc.id);
            this.isScrollBlocked = true;
        }, 1);
    }

    getThreshold(label) {
        if (typeof document !== undefined) {
            if (!this.topbarHeight) {
                const topbar = DomHandler.findSingle(document.body, '.layout-topbar');

                this.topbarHeight = topbar ? DomHandler.getHeight(topbar) : 0;
            }
        }

        return this.topbarHeight + DomHandler.getHeight(label) * 3.5;
    }

    scrollToLabelById(id) {
        if (typeof document !== undefined) {
            const label = document.getElementById(id);
            this.location.go(this.location.path().split('#')[0] + '#' + id);
            label && label.parentElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
    }

    isActiveChildId(isFirst: boolean, activeId: string, childId: string, parentId: string): boolean {
        if (isFirst) {
            return this.getActiveChildId(activeId, parentId);
        }

        return this.getActiveChildId(activeId, childId);
    }

    getActiveChildId(activeId, childId) {
        return activeId.toLowerCase() === childId.toLowerCase();
    }

    ngOnDestroy() {
        if (this.scrollListener) {
            this.scrollListener();
            this.scrollListener = null;
        }
    }
}
