import { NgModule, Component, ElementRef, AfterContentInit, Input, Output, EventEmitter, ContentChild, ContentChildren, QueryList, TemplateRef, ChangeDetectionStrategy, ViewEncapsulation, Inject, Optional, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header, Footer, PrimeTemplate, SharedModule, BlockableUI } from 'primeng/api';
import { Scroller, ScrollerModule, ScrollerOptions } from 'primeng/scroller';

@Component({
    selector: 'p-virtualScroller',
    template: `
        <div [ngClass]="'p-virtualscroller p-component'" [ngStyle]="style" [class]="styleClass">
            <div class="p-virtualscroller-header" *ngIf="header || headerTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
            <div #content class="p-virtualscroller-content">
                <p-scroller #scroller [items]="value" styleClass="p-virtualscroller-list" [style]="{'height': scrollHeight}" [itemSize]="itemSize"
                    [lazy]="lazy" (onLazyLoad)="onLazyItemLoad($event)" [options]="options">
                    <ng-template pTemplate="item" let-item let-scrollerOptions="options">
                        <div [ngStyle]="{'height': itemSize + 'px'}" class="p-virtualscroller-item">
                            <ng-container *ngTemplateOutlet="item ? itemTemplate : loadingItemTemplate; context: {$implicit: item, options: scrollerOptions}"></ng-container>
                        </div>
                    </ng-template>
                </p-scroller>
            </div>
            <div class="p-virtualscroller-footer" *ngIf="footer || footerTemplate">
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'p-element'
    }
})
export class VirtualScroller implements AfterContentInit, BlockableUI {

    @Input() value: any[];

    @Input() itemSize: number;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() scrollHeight: any;

    @Input() lazy: boolean;

    @Input() options: ScrollerOptions;

    @Input() delay: number = 250;

    @ContentChild(Header) header: Header;

    @ContentChild(Footer) footer: Footer;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @ViewChild('scroller') scroller: Scroller;

    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();

    itemTemplate: TemplateRef<any>;

    headerTemplate: TemplateRef<any>;

    footerTemplate: TemplateRef<any>;

    loadingItemTemplate: TemplateRef<any>;

    virtualScrollTimeout: any;

    constructor(public el: ElementRef, public cd: ChangeDetectorRef) { }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;

                case 'loadingItem':
                    this.loadingItemTemplate = item.template;
                    break;

                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'footer':
                    this.footerTemplate = item.template;
                    break;

                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }

    onLazyItemLoad(event) {
        if (this.virtualScrollTimeout) {
            clearTimeout(this.virtualScrollTimeout);
        }

        this.virtualScrollTimeout = setTimeout(() => {
            this.onLazyLoad.emit({
                ...event,
                rows: event.last - event.first,
                forceUpdate: () => this.cd.detectChanges()
            });
        }, this.delay);
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    scrollToIndex(index: number, mode?: ScrollBehavior): void {
        this.scroller?.scrollToIndex(index, mode);
    }
}

@NgModule({
    imports: [CommonModule, SharedModule, ScrollerModule],
    exports: [VirtualScroller, SharedModule, ScrollerModule],
    declarations: [VirtualScroller]
})
export class VirtualScrollerModule { }

