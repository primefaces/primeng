import { isPlatformBrowser, NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, effect, ElementRef, inject, input, viewChild, ViewEncapsulation } from '@angular/core';
import { addClass, calculateScrollbarHeight, calculateScrollbarWidth, findSingle } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Scroller } from 'primeng/scroller';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { TreeTableStyle } from './style/treetablestyle';
import { TTBody } from './treetable-body';
import { TREETABLE_INSTANCE } from './treetable-service';
import type { TreeTable } from './treetable';

@Component({
    selector: '[ttScrollableView]',
    standalone: true,
    imports: [NgTemplateOutlet, NgStyle, NgClass, Bind, Scroller, TTBody],
    template: `
        <div #scrollHeader [class]="cx('scrollableHeader')" [pBind]="ptm('scrollableHeader')">
            <div #scrollHeaderBox [class]="cx('scrollableHeaderBox')" [pBind]="ptm('scrollableHeaderBox')">
                <table [class]="cn(cx('scrollableHeaderTable'), tt.tableStyleClass())" [pBind]="ptm('scrollableHeaderTable')" [ngStyle]="tt.tableStyle()">
                    <ng-container *ngTemplateOutlet="frozen() ? tt.frozenColGroupTemplate() || tt.colGroupTemplate() : tt.colGroupTemplate(); context: { $implicit: columns() }"></ng-container>
                    <thead role="rowgroup" [class]="cx('thead')" [pBind]="ptm('thead')">
                        <ng-container *ngTemplateOutlet="frozen() ? tt.frozenHeaderTemplate() || tt.headerTemplate() : tt.headerTemplate(); context: { $implicit: columns() }"></ng-container>
                    </thead>
                </table>
            </div>
        </div>

        @if (tt.virtualScroll()) {
            <p-scroller
                #scroller
                [items]="tt.serializedValue"
                [styleClass]="cx('scrollableBody')"
                [style]="{ height: tt.scrollHeight() !== 'flex' ? tt.scrollHeight() : undefined }"
                [scrollHeight]="scrollHeight() !== 'flex' ? undefined : '100%'"
                [itemSize]="tt.virtualScrollItemSize()"
                [lazy]="tt.lazy()"
                (onLazyLoad)="tt.onLazyItemLoad($event)"
                [options]="tt.virtualScrollOptions()"
                [pt]="ptm('virtualScroller')"
            >
                <ng-template #content let-items let-scrollerOptions="options">
                    <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: items, options: scrollerOptions }"></ng-container>
                </ng-template>
                @if (tt.loaderTemplate()) {
                    <ng-template #loader let-scrollerOptions="options">
                        <ng-container *ngTemplateOutlet="tt.loaderTemplate(); context: { options: scrollerOptions }"></ng-container>
                    </ng-template>
                }
            </p-scroller>
        }
        @if (!tt.virtualScroll()) {
            <div
                #scrollBody
                [class]="cx('scrollableBody')"
                [pBind]="ptm('scrollableBody')"
                [ngStyle]="{
                    'max-height': tt.scrollHeight() !== 'flex' ? scrollHeight() : undefined,
                    'overflow-y': !frozen() && tt.scrollHeight() ? 'scroll' : undefined
                }"
            >
                <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: serializedValue, options: {} }"></ng-container>
            </div>
        }

        <ng-template #buildInItems let-items let-scrollerOptions="options">
            <table role="treegrid" #scrollTable [pBind]="ptm('table')" [class]="tt.tableStyleClass()" [ngClass]="scrollerOptions.contentStyleClass" [ngStyle]="tt.tableStyle()" [style]="scrollerOptions.contentStyle">
                <ng-container *ngTemplateOutlet="frozen() ? tt.frozenColGroupTemplate() || tt.colGroupTemplate() : tt.colGroupTemplate(); context: { $implicit: columns() }"></ng-container>
                <tbody
                    [pBind]="ptm('tbody')"
                    role="rowgroup"
                    [class]="cx('tbody')"
                    [pBind]="ptm('tbody')"
                    [pTreeTableBody]="columns()"
                    [unstyled]="unstyled()"
                    [pTreeTableBodyTemplate]="frozen() ? tt.frozenBodyTemplate() || tt.bodyTemplate() : tt.bodyTemplate()"
                    [serializedNodes]="items"
                    [frozen]="frozen()"
                ></tbody>
            </table>
            @if (frozen()) {
                <div #scrollableAligner [style.background-color]="'transparent'"></div>
            }
        </ng-template>

        @if (tt.footerTemplate()) {
            <div #scrollFooter [class]="cx('scrollableFooter')" [pBind]="ptm('scrollableFooter')">
                <div #scrollFooterBox [class]="cx('scrollableFooterBox')" [pBind]="ptm('scrollableFooterBox')">
                    <table [class]="cx('scrollableFooterTable')" [ngClass]="tt.tableStyleClass()" [ngStyle]="tt.tableStyle()" [pBind]="ptm('scrollableFooterTable')">
                        <ng-container *ngTemplateOutlet="frozen() ? tt.frozenColGroupTemplate() || tt.colGroupTemplate() : tt.colGroupTemplate(); context: { $implicit: columns() }"></ng-container>
                        <tfoot role="rowgroup" [class]="cx('tfoot')" [pBind]="ptm('tfoot')">
                            <ng-container *ngTemplateOutlet="frozen() ? tt.frozenFooterTemplate() || tt.footerTemplate() : tt.footerTemplate(); context: { $implicit: columns() }"></ng-container>
                        </tfoot>
                    </table>
                </div>
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    providers: [TreeTableStyle]
})
export class TTScrollableView extends BaseComponent {
    hostName = 'TreeTable';

    columns = input<any[]>(undefined, { alias: 'ttScrollableView' });

    frozen = input(undefined, { transform: booleanAttribute });

    scrollHeight = input<string | null>();

    scrollHeaderViewChild = viewChild<ElementRef>('scrollHeader');

    scrollHeaderBoxViewChild = viewChild<ElementRef>('scrollHeaderBox');

    scrollBodyViewChild = viewChild<ElementRef>('scrollBody');

    scrollTableViewChild = viewChild<ElementRef>('scrollTable');

    scrollLoadingTableViewChild = viewChild<ElementRef>('loadingTable');

    scrollFooterViewChild = viewChild<ElementRef>('scrollFooter');

    scrollFooterBoxViewChild = viewChild<ElementRef>('scrollFooterBox');

    scrollableAlignerViewChild = viewChild<ElementRef>('scrollableAligner');

    scroller = viewChild<Scroller>('scroller');

    headerScrollListener: VoidListener;

    bodyScrollListener: VoidListener;

    footerScrollListener: VoidListener;

    frozenSiblingBody: Nullable<Element>;

    preventBodyScrollPropagation: boolean | undefined;

    _componentStyle = inject(TreeTableStyle);

    tt = inject<TreeTable>(TREETABLE_INSTANCE);

    constructor() {
        super();
        effect(() => {
            const val = this.scrollHeight();
            if (val != null && (val.includes('%') || val.includes('calc'))) {
                console.log('Percentage scroll height calculation is removed in favor of the more performant CSS based flex mode, use scrollHeight="flex" instead.');
            }
        });
    }

    get serializedValue() {
        return this.tt.serializedValue;
    }

    onAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.frozen()) {
                if (this.tt.frozenColumns() || this.tt.frozenBodyTemplate()) {
                    addClass(this.el.nativeElement, 'p-treetable-unfrozen-view');
                }

                let frozenView = this.el.nativeElement.previousElementSibling;
                if (frozenView) {
                    if (this.tt.virtualScroll()) this.frozenSiblingBody = findSingle(frozenView, '[data-pc-name="virtualscroller"]');
                    else this.frozenSiblingBody = findSingle(frozenView, '[data-pc-section="scrollablebody"]');
                }

                if (this.scrollHeight()) {
                    let scrollBarWidth = calculateScrollbarWidth();
                    if (this.scrollHeaderBoxViewChild()?.nativeElement) {
                        this.scrollHeaderBoxViewChild()!.nativeElement.style.paddingRight = scrollBarWidth + 'px';
                    }

                    if (this.scrollFooterBoxViewChild()?.nativeElement) {
                        this.scrollFooterBoxViewChild()!.nativeElement.style.paddingRight = scrollBarWidth + 'px';
                    }
                }
            } else {
                if (this.scrollableAlignerViewChild()?.nativeElement) {
                    this.scrollableAlignerViewChild()!.nativeElement.style.height = calculateScrollbarHeight() + 'px';
                }
            }

            this.bindEvents();
        }
    }

    bindEvents() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.scrollHeaderViewChild()?.nativeElement) {
                this.headerScrollListener = this.renderer.listen(this.scrollHeaderBoxViewChild()?.nativeElement, 'scroll', this.onHeaderScroll.bind(this));
            }

            if (this.scrollFooterViewChild()?.nativeElement) {
                this.footerScrollListener = this.renderer.listen(this.scrollFooterViewChild()!.nativeElement, 'scroll', this.onFooterScroll.bind(this));
            }

            if (!this.frozen()) {
                if (this.tt.virtualScroll()) {
                    this.bodyScrollListener = this.renderer.listen((this.scroller()?.getElementRef() as ElementRef).nativeElement, 'scroll', this.onBodyScroll.bind(this));
                } else {
                    this.bodyScrollListener = this.renderer.listen(this.scrollBodyViewChild()?.nativeElement, 'scroll', this.onBodyScroll.bind(this));
                }
            }
        }
    }

    unbindEvents() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.scrollHeaderViewChild()?.nativeElement) {
                if (this.headerScrollListener) {
                    this.headerScrollListener();
                    this.headerScrollListener = null;
                }
            }

            if (this.scrollFooterViewChild()?.nativeElement) {
                if (this.footerScrollListener) {
                    this.footerScrollListener();
                    this.footerScrollListener = null;
                }
            }

            if (this.scrollBodyViewChild()?.nativeElement) {
                if (this.bodyScrollListener) {
                    this.bodyScrollListener();
                    this.bodyScrollListener = null;
                }
            }

            if (this.scroller()?.getElementRef()) {
                if (this.bodyScrollListener) {
                    this.bodyScrollListener();
                    this.bodyScrollListener = null;
                }
            }
        }
    }

    onHeaderScroll() {
        const scrollLeft = this.scrollHeaderViewChild()?.nativeElement.scrollLeft;

        this.scrollBodyViewChild()!.nativeElement.scrollLeft = scrollLeft;

        if (this.scrollFooterViewChild()?.nativeElement) {
            this.scrollFooterViewChild()!.nativeElement.scrollLeft = scrollLeft;
        }

        this.preventBodyScrollPropagation = true;
    }

    onFooterScroll() {
        const scrollLeft = this.scrollFooterViewChild()?.nativeElement.scrollLeft;
        this.scrollBodyViewChild()!.nativeElement.scrollLeft = scrollLeft;

        if (this.scrollHeaderViewChild()?.nativeElement) {
            this.scrollHeaderViewChild()!.nativeElement.scrollLeft = scrollLeft;
        }

        this.preventBodyScrollPropagation = true;
    }

    onBodyScroll(event: any) {
        if (this.preventBodyScrollPropagation) {
            this.preventBodyScrollPropagation = false;
            return;
        }

        if (this.scrollHeaderViewChild()?.nativeElement) {
            this.scrollHeaderBoxViewChild()!.nativeElement.style.marginLeft = -1 * event.target.scrollLeft + 'px';
        }

        if (this.scrollFooterViewChild()?.nativeElement) {
            this.scrollFooterBoxViewChild()!.nativeElement.style.marginLeft = -1 * event.target.scrollLeft + 'px';
        }

        if (this.frozenSiblingBody) {
            this.frozenSiblingBody.scrollTop = event.target.scrollTop;
        }
    }

    scrollToVirtualIndex(index: number) {
        this.scroller()?.scrollToIndex(index);
    }

    scrollTo(options: ScrollToOptions) {
        if (this.scroller()) {
            this.scroller()!.scrollTo(options);
        } else {
            if (this.scrollBodyViewChild()?.nativeElement.scrollTo) {
                this.scrollBodyViewChild()!.nativeElement.scrollTo(options);
            } else {
                this.scrollBodyViewChild()!.nativeElement.scrollLeft = options.left;
                this.scrollBodyViewChild()!.nativeElement.scrollTop = options.top;
            }
        }
    }

    onDestroy() {
        this.unbindEvents();

        this.frozenSiblingBody = null;
    }
}
