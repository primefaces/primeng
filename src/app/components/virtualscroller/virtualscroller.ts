import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    NgModule,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    booleanAttribute,
    numberAttribute
} from '@angular/core';
import { BlockableUI, Footer, Header, PrimeTemplate, ScrollerOptions, SharedModule } from 'primeng/api';
import { Scroller, ScrollerModule } from 'primeng/scroller';
import { Nullable } from 'primeng/ts-helpers';
import { VirtualScrollerLazyLoadEvent } from './virtualscroller.interface';
/**
 * VirtualScroller is a performant approach to handle huge data efficiently.
 * @group Components
 */
@Component({
    selector: 'p-virtualScroller',
    template: `
        <div [ngClass]="'p-virtualscroller p-component'" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'virtualscroller'" [attr.data-pc-section]="'root'">
            <div class="p-virtualscroller-header" *ngIf="header || headerTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
            <div #content class="p-virtualscroller-content" [attr.data-pc-section]="'content'">
                <p-scroller #scroller [items]="value" styleClass="p-virtualscroller-list" [style]="{ height: scrollHeight }" [itemSize]="itemSize" [lazy]="lazy" (onLazyLoad)="onLazyItemLoad($event)" [options]="options">
                    <ng-template pTemplate="item" let-item let-scrollerOptions="options">
                        <div [ngStyle]="{ height: itemSize + 'px' }" class="p-virtualscroller-item">
                            <ng-container *ngTemplateOutlet="item ? itemTemplate : loadingItemTemplate; context: { $implicit: item, options: scrollerOptions }"></ng-container>
                        </div>
                    </ng-template>
                </p-scroller>
            </div>
            <div class="p-virtualscroller-footer" *ngIf="footer || footerTemplate" [attr.data-pc-section]="'footer'">
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class VirtualScroller implements AfterContentInit, BlockableUI {
    /**
     * An array of objects to display.
     * @group Props
     */
    @Input() value: any[] | undefined;
    /**
     * Height of an item in the list.
     * @group Props
     */
    @Input({ transform: numberAttribute }) itemSize: number | undefined;
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Max height of the content area in inline mode.
     * @group Props
     */
    @Input() scrollHeight: any;
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) lazy: boolean | undefined;
    /**
     * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
     * @group Props
     */
    @Input() options: ScrollerOptions | undefined;
    /**
     * Threshold in milliseconds to delay lazy loading during scrolling.
     * @group Props
     */
    @Input({ transform: numberAttribute }) delay: number = 250;
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {VirtualScrollerLazyLoadEvent} event - custom lazy load event.
     * @group Emits
     */
    @Output() onLazyLoad: EventEmitter<VirtualScrollerLazyLoadEvent> = new EventEmitter<VirtualScrollerLazyLoadEvent>();

    @ContentChild(Header) header: Header | undefined;

    @ContentChild(Footer) footer: Footer | undefined;

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

    @ViewChild('scroller') scroller: Nullable<Scroller>;

    itemTemplate: Nullable<TemplateRef<any>>;

    headerTemplate: Nullable<TemplateRef<any>>;

    footerTemplate: Nullable<TemplateRef<any>>;

    loadingItemTemplate: Nullable<TemplateRef<any>>;

    virtualScrollTimeout: any;

    constructor(
        public el: ElementRef,
        public cd: ChangeDetectorRef
    ) {}

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
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

    onLazyItemLoad(event: VirtualScrollerLazyLoadEvent) {
        if (this.virtualScrollTimeout) {
            clearTimeout(this.virtualScrollTimeout);
        }

        this.virtualScrollTimeout = setTimeout(() => {
            this.onLazyLoad.emit({
                ...event,
                rows: <number>event.last - <number>event.first,
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
export class VirtualScrollerModule {}
