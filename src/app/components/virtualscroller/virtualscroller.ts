import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    OutputEmitterRef,
    input,
    NgModule,
    output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    booleanAttribute,
    numberAttribute,
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
        <div
            [ngClass]="'p-virtualscroller p-component'"
            [ngStyle]="style()"
            [class]="styleClass()"
            [attr.data-pc-name]="'virtualscroller'"
            [attr.data-pc-section]="'root'"
        >
            @if (header || headerTemplate) {
                <div class="p-virtualscroller-header">
                    <ng-content select="p-header"></ng-content>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                </div>
            }
            <div #content class="p-virtualscroller-content" [attr.data-pc-section]="'content'">
                <p-scroller
                    #scroller
                    [items]="value()"
                    styleClass="p-virtualscroller-list"
                    [style]="{ height: scrollHeight() }"
                    [itemSize]="itemSize()"
                    [lazy]="lazy()"
                    (onLazyLoad)="onLazyItemLoad($event)"
                    [options]="options()"
                >
                    <ng-template pTemplate="item" let-item let-scrollerOptions="options">
                        <div [ngStyle]="{ height: itemSize() + 'px' }" class="p-virtualscroller-item">
                            <ng-container
                                *ngTemplateOutlet="
                                    item ? itemTemplate : loadingItemTemplate;
                                    context: { $implicit: item, options: scrollerOptions }
                                "
                            ></ng-container>
                        </div>
                    </ng-template>
                </p-scroller>
            </div>
            @if (footer || footerTemplate) {
                <div class="p-virtualscroller-footer" [attr.data-pc-section]="'footer'">
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
            }
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
})
export class VirtualScroller implements AfterContentInit, BlockableUI {
    /**
     * An array of objects to display.
     * @group Props
     */
    value = input<any[]>();
    /**
     * Height of an item in the list.
     * @group Props
     */
    itemSize = input<number, any>(undefined, { transform: numberAttribute });
    /**
     * Inline style of the component.
     * @group Props
     */
    style = input<{ [klass: string]: any } | null>();
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass = input<string>();
    /**
     * Max height of the content area in inline mode.
     * @group Props
     */
    scrollHeight = input<any>();
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    lazy = input<boolean, any>(undefined, { transform: booleanAttribute });
    /**
     * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
     * @group Props
     */
    options = input<ScrollerOptions>();
    /**
     * Threshold in milliseconds to delay lazy loading during scrolling.
     * @group Props
     */
    delay = input<number, any>(250, { transform: numberAttribute });
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {VirtualScrollerLazyLoadEvent} event - custom lazy load event.
     * @group Emits
     */
    onLazyLoad: OutputEmitterRef<VirtualScrollerLazyLoadEvent> = output<VirtualScrollerLazyLoadEvent>();

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
        public cd: ChangeDetectorRef,
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
                forceUpdate: () => this.cd.detectChanges(),
            });
        }, this.delay());
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    scrollToIndex(index: number, mode?: ScrollBehavior): void {
        this.scroller?.scrollToIndex(index, mode);
    }
}

@NgModule({
    imports: [NgClass, NgStyle, NgTemplateOutlet, SharedModule, ScrollerModule],
    exports: [VirtualScroller, SharedModule, ScrollerModule],
    declarations: [VirtualScroller],
})
export class VirtualScrollerModule {}
