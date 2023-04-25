import {
    NgModule,
    Component,
    Input,
    AfterViewInit,
    OnDestroy,
    ElementRef,
    NgZone,
    ViewChild,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    ChangeDetectorRef,
    AfterContentInit,
    ContentChildren,
    QueryList,
    TemplateRef,
    Inject,
    Renderer2,
    PLATFORM_ID
} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { PrimeTemplate } from 'primeng/api';

@Component({
    selector: 'p-scrollPanel',
    template: `
        <div #container [ngClass]="'p-scrollpanel p-component'" [ngStyle]="style" [class]="styleClass">
            <div class="p-scrollpanel-wrapper">
                <div #content class="p-scrollpanel-content">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
            </div>
            <div #xBar class="p-scrollpanel-bar p-scrollpanel-bar-x"></div>
            <div #yBar class="p-scrollpanel-bar p-scrollpanel-bar-y"></div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./scrollpanel.css'],
    host: {
        class: 'p-element'
    }
})
export class ScrollPanel implements AfterViewInit, AfterContentInit, OnDestroy {
    @Input() style: any;

    @Input() styleClass: string;

    @ViewChild('container') containerViewChild: ElementRef;

    @ViewChild('content') contentViewChild: ElementRef;

    @ViewChild('xBar') xBarViewChild: ElementRef;

    @ViewChild('yBar') yBarViewChild: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    scrollYRatio: number;

    scrollXRatio: number;

    timeoutFrame: any = (fn) => setTimeout(fn, 0);

    initialized: boolean;

    lastPageY: number;

    lastPageX: number;

    isXBarClicked: boolean;

    isYBarClicked: boolean;

    contentTemplate: TemplateRef<any>;

    windowResizeListener: VoidFunction | null;

    contentScrollListener: VoidFunction | null;

    mouseEnterListener: VoidFunction | null;

    xBarMouseDownListener: VoidFunction | null;

    yBarMouseDownListener: VoidFunction | null;

    documentMouseMoveListener: VoidFunction | null;

    documentMouseUpListener: VoidFunction | null;

    constructor(@Inject(PLATFORM_ID) private platformId: any, public el: ElementRef, public zone: NgZone, public cd: ChangeDetectorRef, @Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {}

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                this.moveBar();
                this.moveBar = this.moveBar.bind(this);
                this.onXBarMouseDown = this.onXBarMouseDown.bind(this);
                this.onYBarMouseDown = this.onYBarMouseDown.bind(this);
                this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
                this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);

                this.windowResizeListener = this.renderer.listen(window, 'resize', this.moveBar);
                this.contentScrollListener = this.renderer.listen(this.contentViewChild.nativeElement, 'scroll', this.moveBar);
                this.mouseEnterListener = this.renderer.listen(this.contentViewChild.nativeElement, 'mouseenter', this.moveBar);
                this.xBarMouseDownListener = this.renderer.listen(this.xBarViewChild.nativeElement, 'mousedown', this.onXBarMouseDown);
                this.yBarMouseDownListener = this.renderer.listen(this.yBarViewChild.nativeElement, 'mousedown', this.onYBarMouseDown);
                this.calculateContainerHeight();

                this.initialized = true;
            });
        }
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;

                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }

    calculateContainerHeight() {
        let container = this.containerViewChild.nativeElement;
        let content = this.contentViewChild.nativeElement;
        let xBar = this.xBarViewChild.nativeElement;
        const window = this.document.defaultView as Window;

        let containerStyles = window.getComputedStyle(container),
            xBarStyles = window.getComputedStyle(xBar),
            pureContainerHeight = DomHandler.getHeight(container) - parseInt(xBarStyles['height'], 10);

        if (containerStyles['max-height'] != 'none' && pureContainerHeight == 0) {
            if (content.offsetHeight + parseInt(xBarStyles['height'], 10) > parseInt(containerStyles['max-height'], 10)) {
                container.style.height = containerStyles['max-height'];
            } else {
                container.style.height = content.offsetHeight + parseFloat(containerStyles.paddingTop) + parseFloat(containerStyles.paddingBottom) + parseFloat(containerStyles.borderTopWidth) + parseFloat(containerStyles.borderBottomWidth) + 'px';
            }
        }
    }

    moveBar() {
        let container = this.containerViewChild.nativeElement;
        let content = this.contentViewChild.nativeElement;

        /* horizontal scroll */
        let xBar = this.xBarViewChild.nativeElement;
        let totalWidth = content.scrollWidth;
        let ownWidth = content.clientWidth;
        let bottom = (container.clientHeight - xBar.clientHeight) * -1;

        this.scrollXRatio = ownWidth / totalWidth;

        /* vertical scroll */
        let yBar = this.yBarViewChild.nativeElement;
        let totalHeight = content.scrollHeight;
        let ownHeight = content.clientHeight;
        let right = (container.clientWidth - yBar.clientWidth) * -1;

        this.scrollYRatio = ownHeight / totalHeight;

        this.requestAnimationFrame(() => {
            if (this.scrollXRatio >= 1) {
                DomHandler.addClass(xBar, 'p-scrollpanel-hidden');
            } else {
                DomHandler.removeClass(xBar, 'p-scrollpanel-hidden');
                const xBarWidth = Math.max(this.scrollXRatio * 100, 10);
                const xBarLeft = (content.scrollLeft * (100 - xBarWidth)) / (totalWidth - ownWidth);
                xBar.style.cssText = 'width:' + xBarWidth + '%; left:' + xBarLeft + '%;bottom:' + bottom + 'px;';
            }

            if (this.scrollYRatio >= 1) {
                DomHandler.addClass(yBar, 'p-scrollpanel-hidden');
            } else {
                DomHandler.removeClass(yBar, 'p-scrollpanel-hidden');
                const yBarHeight = Math.max(this.scrollYRatio * 100, 10);
                const yBarTop = (content.scrollTop * (100 - yBarHeight)) / (totalHeight - ownHeight);
                yBar.style.cssText = 'height:' + yBarHeight + '%; top: calc(' + yBarTop + '% - ' + xBar.clientHeight + 'px);right:' + right + 'px;';
            }
        });
        this.cd.markForCheck();
    }

    onYBarMouseDown(e: MouseEvent) {
        this.isYBarClicked = true;
        this.lastPageY = e.pageY;
        DomHandler.addClass(this.yBarViewChild.nativeElement, 'p-scrollpanel-grabbed');

        DomHandler.addClass(this.document.body, 'p-scrollpanel-grabbed');
        this.bindDocumentMouseListeners();
        e.preventDefault();
    }

    bindDocumentMouseListeners(): void {
        this.documentMouseMoveListener = this.renderer.listen(this.document, 'mousemove', this.onDocumentMouseMove.bind(this));
        this.documentMouseUpListener = this.renderer.listen(this.document, 'mouseup', this.onDocumentMouseUp.bind(this));
    }

    unbindDocumentMouseListeners(): void {
        if (this.documentMouseMoveListener) {
            this.documentMouseMoveListener();
            this.documentMouseMoveListener = null;
        }

        if (this.documentMouseUpListener) {
            this.documentMouseUpListener();
            this.documentMouseUpListener = null;
        }
    }

    onXBarMouseDown(e: MouseEvent) {
        this.isXBarClicked = true;
        this.lastPageX = e.pageX;
        DomHandler.addClass(this.xBarViewChild.nativeElement, 'p-scrollpanel-grabbed');

        DomHandler.addClass(this.document.body, 'p-scrollpanel-grabbed');

        this.bindDocumentMouseListeners();
        e.preventDefault();
    }

    onDocumentMouseMove(e: MouseEvent) {
        if (this.isXBarClicked) {
            this.onMouseMoveForXBar(e);
        } else if (this.isYBarClicked) {
            this.onMouseMoveForYBar(e);
        } else {
            this.onMouseMoveForXBar(e);
            this.onMouseMoveForYBar(e);
        }
    }

    onMouseMoveForXBar(e: MouseEvent) {
        let deltaX = e.pageX - this.lastPageX;
        this.lastPageX = e.pageX;

        this.requestAnimationFrame(() => {
            this.contentViewChild.nativeElement.scrollLeft += deltaX / this.scrollXRatio;
        });
    }

    onMouseMoveForYBar(e: MouseEvent) {
        let deltaY = e.pageY - this.lastPageY;
        this.lastPageY = e.pageY;

        this.requestAnimationFrame(() => {
            this.contentViewChild.nativeElement.scrollTop += deltaY / this.scrollYRatio;
        });
    }

    scrollTop(scrollTop: number) {
        let scrollableHeight = this.contentViewChild.nativeElement.scrollHeight - this.contentViewChild.nativeElement.clientHeight;
        scrollTop = scrollTop > scrollableHeight ? scrollableHeight : scrollTop > 0 ? scrollTop : 0;
        this.contentViewChild.nativeElement.scrollTop = scrollTop;
    }

    onDocumentMouseUp(e: Event) {
        DomHandler.removeClass(this.yBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
        DomHandler.removeClass(this.xBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
        DomHandler.removeClass(this.document.body, 'p-scrollpanel-grabbed');

        this.unbindDocumentMouseListeners();
        this.isXBarClicked = false;
        this.isYBarClicked = false;
    }

    requestAnimationFrame(f: Function) {
        let frame = window.requestAnimationFrame || this.timeoutFrame;
        frame(f);
    }

    unbindListeners() {
        if (this.windowResizeListener) {
            this.windowResizeListener();
            this.windowResizeListener = null;
        }

        if (this.contentScrollListener) {
            this.contentScrollListener();
            this.contentScrollListener = null;
        }

        if (this.mouseEnterListener) {
            this.mouseEnterListener();
            this.mouseEnterListener = null;
        }

        if (this.xBarMouseDownListener) {
            this.xBarMouseDownListener();
            this.xBarMouseDownListener = null;
        }

        if (this.yBarMouseDownListener) {
            this.yBarMouseDownListener();
            this.yBarMouseDownListener = null;
        }
    }

    ngOnDestroy() {
        if (this.initialized) {
            this.unbindListeners();
        }
    }

    refresh() {
        this.moveBar();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [ScrollPanel],
    declarations: [ScrollPanel]
})
export class ScrollPanelModule {}
