import { NgTemplateOutlet, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChild, ElementRef, inject, InjectionToken, input, NgModule, NgZone, numberAttribute, signal, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { addClass, getHeight, removeClass, uuid } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Nullable } from 'primeng/ts-helpers';
import { ScrollPanelOrientation, ScrollPanelPassThrough } from 'primeng/types/scrollpanel';
import { ScrollPanelStyle } from './style/scrollpanelstyle';

const SCROLLPANEL_INSTANCE = new InjectionToken<ScrollPanel>('SCROLLPANEL_INSTANCE');

/**
 * ScrollPanel is a cross browser, lightweight and themable alternative to native browser scrollbar.
 * @group Components
 */
@Component({
    selector: 'p-scroll-panel, p-scrollpanel',
    standalone: true,
    imports: [NgTemplateOutlet, SharedModule, BindModule],
    template: `
        <div [pBind]="ptm('contentContainer')" [class]="cx('contentContainer')">
            <div #content [pBind]="ptm('content')" [class]="cx('content')" (mouseenter)="moveBar()" (scroll)="onScroll($event)">
                @if (!contentTemplate()) {
                    <ng-content></ng-content>
                }
                <ng-container *ngTemplateOutlet="contentTemplate()"></ng-container>
            </div>
        </div>
        <div
            #xBar
            [pBind]="ptm('barX')"
            [class]="cx('barX')"
            tabindex="0"
            role="scrollbar"
            [attr.aria-orientation]="'horizontal'"
            [attr.aria-valuenow]="lastScrollLeft()"
            [attr.aria-controls]="contentId"
            [attr.data-pc-group-section]="'bar'"
            (mousedown)="onXBarMouseDown($event)"
            (keydown)="onKeyDown($event)"
            (keyup)="onKeyUp()"
            (focus)="onFocus($event)"
            (blur)="onBlur()"
        ></div>
        <div
            #yBar
            [pBind]="ptm('barY')"
            [class]="cx('barY')"
            tabindex="0"
            role="scrollbar"
            [attr.aria-orientation]="'vertical'"
            [attr.aria-valuenow]="lastScrollTop()"
            [attr.aria-controls]="contentId"
            (mousedown)="onYBarMouseDown($event)"
            (keydown)="onKeyDown($event)"
            (keyup)="onKeyUp()"
            (focus)="onFocus($event)"
            [attr.data-pc-group-section]="'bar'"
        ></div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ScrollPanelStyle, { provide: SCROLLPANEL_INSTANCE, useExisting: ScrollPanel }, { provide: PARENT_INSTANCE, useExisting: ScrollPanel }],
    host: {
        '[class]': 'cx("root")'
    },
    hostDirectives: [Bind]
})
export class ScrollPanel extends BaseComponent<ScrollPanelPassThrough> {
    componentName = 'ScrollPanel';

    $pcScrollPanel: ScrollPanel | undefined = inject(SCROLLPANEL_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    /**
     * Step factor to scroll the content while pressing the arrow keys.
     * @group Props
     */
    step = input(5, { transform: numberAttribute });

    contentViewChild = viewChild<ElementRef>('content');

    xBarViewChild = viewChild<ElementRef>('xBar');

    yBarViewChild = viewChild<ElementRef>('yBar');

    /**
     * Custom content template.
     * @group Templates
     */
    contentTemplate = contentChild<TemplateRef<void>>('content', { descendants: false });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    scrollYRatio: number | undefined;

    scrollXRatio: number | undefined;

    timeoutFrame = (fn: VoidFunction) => setTimeout(fn, 0);

    initialized: boolean = false;

    lastPageY: number | undefined;

    lastPageX: number | undefined;

    isXBarClicked: boolean = false;

    isYBarClicked: boolean = false;

    lastScrollLeft = signal(0);

    lastScrollTop = signal(0);

    orientation: ScrollPanelOrientation = 'vertical';

    timer: ReturnType<typeof setTimeout> | undefined;

    contentId: string | undefined;

    windowResizeListener: VoidFunction | null | undefined;

    contentScrollListener: VoidFunction | null | undefined;

    mouseEnterListener: VoidFunction | null | undefined;

    xBarMouseDownListener: VoidFunction | null | undefined;

    yBarMouseDownListener: VoidFunction | null | undefined;

    documentMouseMoveListener: Nullable<(event: MouseEvent) => void>;

    documentMouseUpListener: Nullable<(event: Event) => void>;

    _componentStyle = inject(ScrollPanelStyle);

    zone: NgZone = inject(NgZone);

    onInit() {
        this.contentId = uuid('pn_id_') + '_content';
    }

    onAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                this.moveBar();
                this.moveBar = this.moveBar.bind(this);
                this.onXBarMouseDown = this.onXBarMouseDown.bind(this);
                this.onYBarMouseDown = this.onYBarMouseDown.bind(this);
                this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
                this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);

                this.windowResizeListener = this.renderer.listen(window, 'resize', this.moveBar);
                this.contentScrollListener = this.renderer.listen(this.contentViewChild()!.nativeElement, 'scroll', this.moveBar);
                this.mouseEnterListener = this.renderer.listen(this.contentViewChild()!.nativeElement, 'mouseenter', this.moveBar);
                this.xBarMouseDownListener = this.renderer.listen(this.xBarViewChild()!.nativeElement, 'mousedown', this.onXBarMouseDown);
                this.yBarMouseDownListener = this.renderer.listen(this.yBarViewChild()!.nativeElement, 'mousedown', this.onYBarMouseDown);
                this.calculateContainerHeight();

                this.initialized = true;
            });
        }
    }

    calculateContainerHeight() {
        let container = (this.el as ElementRef).nativeElement;
        let content = this.contentViewChild()!.nativeElement;
        let xBar = this.xBarViewChild()!.nativeElement;
        const window = this.document.defaultView as Window;

        let containerStyles = window.getComputedStyle(container),
            xBarStyles = window.getComputedStyle(xBar),
            pureContainerHeight = getHeight(container) - parseInt(xBarStyles['height'], 10);

        if (containerStyles['max-height'] != 'none' && pureContainerHeight == 0) {
            if (content.offsetHeight + parseInt(xBarStyles['height'], 10) > parseInt(containerStyles['max-height'], 10)) {
                container.style.height = containerStyles['max-height'];
            } else {
                container.style.height = content.offsetHeight + parseFloat(containerStyles.paddingTop) + parseFloat(containerStyles.paddingBottom) + parseFloat(containerStyles.borderTopWidth) + parseFloat(containerStyles.borderBottomWidth) + 'px';
            }
        }
    }

    moveBar() {
        let container = (this.el as ElementRef).nativeElement;
        let content = this.contentViewChild()!.nativeElement;

        /* horizontal scroll */
        let xBar = this.xBarViewChild()!.nativeElement;
        let totalWidth = content.scrollWidth;
        let ownWidth = content.clientWidth;
        let bottom = (container.clientHeight - xBar.clientHeight) * -1;

        this.scrollXRatio = ownWidth / totalWidth;

        /* vertical scroll */
        let yBar = this.yBarViewChild()!.nativeElement;
        let totalHeight = content.scrollHeight;
        let ownHeight = content.clientHeight;
        let right = (container.clientWidth - yBar.clientWidth) * -1;

        this.scrollYRatio = ownHeight / totalHeight;

        this.requestAnimationFrame(() => {
            if ((this.scrollXRatio as number) >= 1) {
                xBar.setAttribute('data-p-scrollpanel-hidden', 'true');
                !this.$unstyled() && addClass(xBar, 'p-scrollpanel-hidden');
            } else {
                xBar.setAttribute('data-p-scrollpanel-hidden', 'false');
                !this.$unstyled() && removeClass(xBar, 'p-scrollpanel-hidden');
                const xBarWidth = Math.max((this.scrollXRatio as number) * 100, 10);
                const xBarLeft = Math.abs((content.scrollLeft * (100 - xBarWidth)) / (totalWidth - ownWidth));
                xBar.style.cssText = 'width:' + xBarWidth + '%; inset-inline-start:' + xBarLeft + '%;bottom:' + bottom + 'px;';
            }

            if ((this.scrollYRatio as number) >= 1) {
                yBar.setAttribute('data-p-scrollpanel-hidden', 'true');
                !this.$unstyled() && addClass(yBar, 'p-scrollpanel-hidden');
            } else {
                yBar.setAttribute('data-p-scrollpanel-hidden', 'false');
                !this.$unstyled() && removeClass(yBar, 'p-scrollpanel-hidden');
                const yBarHeight = Math.max((this.scrollYRatio as number) * 100, 10);
                const yBarTop = (content.scrollTop * (100 - yBarHeight)) / (totalHeight - ownHeight);
                yBar.style.cssText = 'height:' + yBarHeight + '%; top: calc(' + yBarTop + '% - ' + xBar.clientHeight + 'px); inset-inline-end:' + right + 'px;';
            }
        });
    }

    onScroll(event: Event) {
        const target = event.target as HTMLElement;
        if (this.lastScrollLeft() !== target.scrollLeft) {
            this.lastScrollLeft.set(target.scrollLeft);
            this.orientation = 'horizontal';
        } else if (this.lastScrollTop() !== target.scrollTop) {
            this.lastScrollTop.set(target.scrollTop);
            this.orientation = 'vertical';
        }

        this.moveBar();
    }

    onKeyDown(event: KeyboardEvent) {
        if (this.orientation === 'vertical') {
            switch (event.code) {
                case 'ArrowDown': {
                    this.setTimer('scrollTop', this.step());
                    event.preventDefault();
                    break;
                }

                case 'ArrowUp': {
                    this.setTimer('scrollTop', this.step() * -1);
                    event.preventDefault();
                    break;
                }

                case 'ArrowLeft':

                case 'ArrowRight': {
                    event.preventDefault();
                    break;
                }

                default:
                    //no op
                    break;
            }
        } else if (this.orientation === 'horizontal') {
            switch (event.code) {
                case 'ArrowRight': {
                    this.setTimer('scrollLeft', this.step());
                    event.preventDefault();
                    break;
                }

                case 'ArrowLeft': {
                    this.setTimer('scrollLeft', this.step() * -1);
                    event.preventDefault();
                    break;
                }

                case 'ArrowDown':

                case 'ArrowUp': {
                    event.preventDefault();
                    break;
                }

                default:
                    //no op
                    break;
            }
        }
    }

    onKeyUp() {
        this.clearTimer();
    }

    repeat(bar: 'scrollTop' | 'scrollLeft', step: number) {
        const content = this.contentViewChild();
        content?.nativeElement && (content.nativeElement[bar] += step);
        this.moveBar();
    }

    setTimer(bar: 'scrollTop' | 'scrollLeft', step: number) {
        this.clearTimer();
        this.timer = setTimeout(() => {
            this.repeat(bar, step);
        }, 40);
    }

    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    bindDocumentMouseListeners(): void {
        if (!this.documentMouseMoveListener) {
            this.documentMouseMoveListener = (e) => {
                this.onDocumentMouseMove(e);
            };
            this.document.addEventListener('mousemove', this.documentMouseMoveListener);
        }

        if (!this.documentMouseUpListener) {
            this.documentMouseUpListener = () => {
                this.onDocumentMouseUp();
            };
            this.document.addEventListener('mouseup', this.documentMouseUpListener);
        }
    }

    unbindDocumentMouseListeners(): void {
        if (this.documentMouseMoveListener) {
            this.document.removeEventListener('mousemove', this.documentMouseMoveListener);
            this.documentMouseMoveListener = null;
        }

        if (this.documentMouseUpListener) {
            document.removeEventListener('mouseup', this.documentMouseUpListener);
            this.documentMouseUpListener = null;
        }
    }

    onYBarMouseDown(e: MouseEvent) {
        this.isYBarClicked = true;
        const yBar = this.yBarViewChild();
        yBar?.nativeElement?.focus();
        this.lastPageY = e.pageY;

        yBar?.nativeElement?.setAttribute('data-p-scrollpanel-grabbed', 'true');
        !this.$unstyled() && yBar && addClass(yBar.nativeElement, 'p-scrollpanel-grabbed');

        this.document.body.setAttribute('data-p-scrollpanel-grabbed', 'true');
        !this.$unstyled() && addClass(this.document.body, 'p-scrollpanel-grabbed');
        this.bindDocumentMouseListeners();
        e.preventDefault();
    }

    onXBarMouseDown(e: MouseEvent) {
        this.isXBarClicked = true;
        const xBar = this.xBarViewChild();
        xBar?.nativeElement?.focus();
        this.lastPageX = e.pageX;

        xBar?.nativeElement?.setAttribute('data-p-scrollpanel-grabbed', 'false');
        !this.$unstyled() && xBar && addClass(xBar.nativeElement, 'p-scrollpanel-grabbed');

        this.document.body.setAttribute('data-p-scrollpanel-grabbed', 'false');
        !this.$unstyled() && addClass(this.document.body, 'p-scrollpanel-grabbed');

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
        let deltaX = e.pageX - (this.lastPageX as number);
        this.lastPageX = e.pageX;

        this.requestAnimationFrame(() => {
            this.contentViewChild()!.nativeElement.scrollLeft += deltaX / (this.scrollXRatio as number);
        });
    }

    onMouseMoveForYBar(e: MouseEvent) {
        let deltaY = e.pageY - (this.lastPageY as number);
        this.lastPageY = e.pageY;

        this.requestAnimationFrame(() => {
            this.contentViewChild()!.nativeElement.scrollTop += deltaY / (this.scrollYRatio as number);
        });
    }
    /**
     * Scrolls the top location to the given value.
     * @param scrollTop
     * @group Method
     */
    scrollTop(scrollTop: number) {
        const content = this.contentViewChild()!.nativeElement;
        let scrollableHeight = content.scrollHeight - content.clientHeight;
        scrollTop = scrollTop > scrollableHeight ? scrollableHeight : scrollTop > 0 ? scrollTop : 0;
        content.scrollTop = scrollTop;
    }

    onFocus(event: FocusEvent) {
        if (this.xBarViewChild()?.nativeElement?.isSameNode(event.target)) {
            this.orientation = 'horizontal';
        } else if (this.yBarViewChild()?.nativeElement?.isSameNode(event.target)) {
            this.orientation = 'vertical';
        }
    }

    onBlur() {
        if (this.orientation === 'horizontal') {
            this.orientation = 'vertical';
        }
    }

    onDocumentMouseUp() {
        const yBar = this.yBarViewChild();
        const xBar = this.xBarViewChild();
        yBar?.nativeElement?.setAttribute('data-p-scrollpanel-grabbed', 'false');
        !this.$unstyled() && yBar && removeClass(yBar.nativeElement, 'p-scrollpanel-grabbed');
        xBar?.nativeElement?.setAttribute('data-p-scrollpanel-grabbed', 'false');
        !this.$unstyled() && xBar && removeClass(xBar.nativeElement, 'p-scrollpanel-grabbed');
        this.document.body.setAttribute('data-p-scrollpanel-grabbed', 'false');
        !this.$unstyled() && removeClass(this.document.body, 'p-scrollpanel-grabbed');

        this.unbindDocumentMouseListeners();
        this.isXBarClicked = false;
        this.isYBarClicked = false;
    }

    requestAnimationFrame(f: VoidFunction) {
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

    onDestroy() {
        if (this.initialized) {
            this.unbindListeners();
        }
    }
    /**
     * Refreshes the position and size of the scrollbar.
     * @group Method
     */
    refresh() {
        this.moveBar();
    }
}

@NgModule({
    imports: [ScrollPanel, SharedModule, BindModule],
    exports: [ScrollPanel, SharedModule, BindModule]
})
export class ScrollPanelModule {}
