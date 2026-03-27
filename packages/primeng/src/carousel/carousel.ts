import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChildren, effect, inject, input, NgModule, numberAttribute, output, signal, untracked, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { ButtonModule } from 'primeng/button';
import { ChevronDown as ChevronDownIcon } from '@primeicons/angular/chevron-down';
import { ChevronLeft as ChevronLeftIcon } from '@primeicons/angular/chevron-left';
import { ChevronRight as ChevronRightIcon } from '@primeicons/angular/chevron-right';
import { ChevronUp as ChevronUpIcon } from '@primeicons/angular/chevron-up';
import { CarouselStyle } from './style/carouselstyle';
import { CAROUSEL_ROOT } from './carousel-token';
import { CarouselContent as CarouselContentComp } from './carousel-content';
import { CarouselItem } from './carousel-item';
import { CarouselNext } from './carousel-next';
import { CarouselPrev } from './carousel-prev';
import { CarouselIndicators } from './carousel-indicators';
import { CarouselIndicator } from './carousel-indicator';
import { CarouselLegacyBase } from './carousel-legacy';

/**
 * Carousel is a content slider featuring various customization options.
 * @group Components
 */
@Component({
    selector: 'p-carousel',
    standalone: true,
    imports: [NgTemplateOutlet, ChevronRightIcon, ButtonModule, ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon, SharedModule, BindModule],
    template: `
        @if (isCompositionMode()) {
            <ng-content></ng-content>
        } @else {
            @if (hasHeader()) {
                <div [class]="cx('header')" [pBind]="ptm('header')">
                    <ng-content select="p-header"></ng-content>
                    <ng-container *ngTemplateOutlet="headerTemplate()"></ng-container>
                </div>
            }
            <div [class]="cn(cx('contentContainer'), contentClass())" [pBind]="ptm('contentContainer')">
                <div [class]="cx('content')" [attr.aria-live]="ariaLive()" [pBind]="ptm('content')">
                    @if (showNavigators()) {
                        <p-button
                            [class]="cx('pcPrevButton')"
                            [attr.aria-label]="ariaPrevButtonLabel()"
                            (click)="navBackward($event)"
                            [text]="true"
                            [buttonProps]="prevButtonProps()"
                            [pt]="ptm('pcPrevButton')"
                            [unstyled]="unstyled()"
                            attr.data-pc-group-section="navigator"
                        >
                            <ng-template #icon>
                                @if (showDefaultPrevIcon()) {
                                    @if (!isVertical()) {
                                        <svg data-p-icon="chevron-left" />
                                    }
                                    @if (isVertical()) {
                                        <svg data-p-icon="chevron-up" />
                                    }
                                }
                                @if (showPrevIconTemplate()) {
                                    <ng-template *ngTemplateOutlet="previousIconTemplate()"></ng-template>
                                }
                            </ng-template>
                        </p-button>
                    }
                    <div [class]="cx('viewport')" [style]="viewportStyle()" (touchend)="onTouchEnd($event)" (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)" [pBind]="ptm('viewport')">
                        <div #itemsContainer [class]="cx('itemList')" (transitionend)="onTransitionEnd()" [pBind]="ptm('itemList')">
                            @for (item of clonedItemsForStarting(); track item; let i = $index) {
                                <div
                                    [class]="cx('itemClone', { index: i })"
                                    [attr.aria-hidden]="isCloneStartAriaHidden()"
                                    [attr.aria-label]="ariaSlideNumber(i)"
                                    [attr.aria-roledescription]="ariaSlideLabel()"
                                    [attr.data-p-carousel-item-active]="isCloneStartActive()"
                                    [attr.data-p-carousel-item-start]="i === 0"
                                    [attr.data-p-carousel-item-end]="isCloneStartEnd(i)"
                                    [pBind]="ptm('itemClone')"
                                >
                                    <ng-container *ngTemplateOutlet="itemTemplate(); context: { $implicit: item }"></ng-container>
                                </div>
                            }
                            @for (item of value(); track item; let i = $index) {
                                <div
                                    [class]="cx('item', { index: i })"
                                    role="group"
                                    [attr.aria-hidden]="isItemAriaHidden(i)"
                                    [attr.aria-label]="ariaSlideNumber(i)"
                                    [attr.aria-roledescription]="ariaSlideLabel()"
                                    [attr.data-p-carousel-item-active]="isItemActive(i)"
                                    [attr.data-p-carousel-item-start]="isItemStart(i)"
                                    [attr.data-p-carousel-item-end]="isItemEnd(i)"
                                    [pBind]="getItemPTOptions('item', i)"
                                >
                                    <ng-container *ngTemplateOutlet="itemTemplate(); context: { $implicit: item }"></ng-container>
                                </div>
                            }
                            @for (item of clonedItemsForFinishing(); track item) {
                                <div [class]="cx('itemClone', { index: 0 })" [attr.data-p-carousel-item-active]="false" [attr.data-p-carousel-item-start]="false" [attr.data-p-carousel-item-end]="false" [pBind]="ptm('itemClone')">
                                    <ng-container *ngTemplateOutlet="itemTemplate(); context: { $implicit: item }"></ng-container>
                                </div>
                            }
                        </div>
                    </div>
                    @if (showNavigators()) {
                        <p-button
                            type="button"
                            [class]="cx('pcNextButton')"
                            (click)="navForward($event)"
                            [attr.aria-label]="ariaNextButtonLabel()"
                            [buttonProps]="nextButtonProps()"
                            [text]="true"
                            [pt]="ptm('pcNextButton')"
                            [unstyled]="unstyled()"
                            attr.data-pc-group-section="navigator"
                        >
                            <ng-template #icon>
                                @if (showDefaultNextIcon()) {
                                    @if (!isVertical()) {
                                        <svg data-p-icon="chevron-right" />
                                    }
                                    @if (isVertical()) {
                                        <svg data-p-icon="chevron-down" />
                                    }
                                }
                                @if (showNextIconTemplate()) {
                                    <ng-template *ngTemplateOutlet="nextIconTemplate()"></ng-template>
                                }
                            </ng-template>
                        </p-button>
                    }
                </div>
                @if (showIndicators()) {
                    <ul #indicatorContent [class]="cx('indicatorList')" [style]="indicatorsContentStyle()" (keydown)="onIndicatorKeydown($event)" [pBind]="ptm('indicatorList')">
                        @for (dot of totalDotsArray(); track dot) {
                            <li [class]="cx('indicator', { index: dot })" [attr.data-p-active]="isIndicatorActive(dot)" [pBind]="getIndicatorPTOptions('indicator', dot)">
                                <button
                                    type="button"
                                    [class]="cx('indicatorButton')"
                                    (click)="onDotClick($event, dot)"
                                    [style]="indicatorStyle()"
                                    [attr.aria-label]="ariaPageLabel(dot + 1)"
                                    [attr.aria-current]="getIndicatorAriaCurrent(dot)"
                                    [tabindex]="getIndicatorTabindex(dot)"
                                    [pBind]="getIndicatorPTOptions('indicatorButton', dot)"
                                ></button>
                            </li>
                        }
                    </ul>
                }
            </div>
            @if (hasFooter()) {
                <div [class]="cx('footer')" [pBind]="ptm('footer')">
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate()"></ng-container>
                </div>
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [CarouselStyle, { provide: PARENT_INSTANCE, useExisting: Carousel }, { provide: CAROUSEL_ROOT, useExisting: Carousel }],
    hostDirectives: [Bind],
    host: {
        '[attr.id]': 'id',
        '[attr.role]': "'region'",
        '[class]': 'hostClass()',
        '[attr.data-scope]': 'dataScope()',
        '[attr.data-part]': 'dataPart()',
        '[attr.data-orientation]': 'dataOrientation()',
        '[attr.data-align]': 'dataAlign()',
        '[attr.data-page]': 'dataPage()',
        '[attr.data-swiping]': 'dataSwiping()',
        '[attr.data-autosize]': 'dataAutosize()'
    }
})
export class Carousel extends CarouselLegacyBase {
    componentName = 'Carousel';

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptm('root'));
    }

    _compositionContent = contentChildren(CarouselContentComp, { descendants: true });

    isCompositionMode = computed(() => this._compositionContent().length > 0);

    hostClass = computed(() => (this.isCompositionMode() ? this.cx('compositionRoot') : this.cx('root')));

    /**
     * Alignment of the carousel items (composition mode).
     * @group Props
     * @defaultValue 'start'
     */
    align = input<'start' | 'center' | 'end'>('start');

    /**
     * Alias for orientation used by composition mode host bindings.
     * Delegates to the existing `orientation` input.
     */
    compositionOrientation = computed(() => this.orientation());

    /**
     * Alias for align used by composition mode host bindings.
     * Delegates to the `align` input.
     */
    compositionAlign = computed(() => this.align());

    /**
     * Whether the carousel should loop (composition mode).
     * @group Props
     * @defaultValue false
     */
    loop = input(false, { transform: booleanAttribute });

    /**
     * Scroll snap type applied to the track (composition mode).
     * @group Props
     * @defaultValue 'mandatory'
     */
    snapType = input<'mandatory' | 'proximity'>('mandatory');

    /**
     * Spacing between carousel items in pixels (composition mode).
     * @group Props
     * @defaultValue 16
     */
    spacing = input(16, { transform: numberAttribute });

    /**
     * Whether the carousel should auto size items (composition mode).
     * @group Props
     * @defaultValue false
     */
    autoSize = input(false, { transform: booleanAttribute });

    /**
     * Alias for autoSize used by composition mode host bindings.
     */
    compositionAutoSize = computed(() => this.autoSize());

    // Host data attributes (composition mode only)
    dataScope = computed(() => (this.isCompositionMode() ? 'carousel' : null));
    dataPart = computed(() => (this.isCompositionMode() ? 'root' : null));
    dataOrientation = computed(() => (this.isCompositionMode() ? this.compositionOrientation() : null));
    dataAlign = computed(() => (this.isCompositionMode() ? this.compositionAlign() : null));
    dataPage = computed(() => (this.isCompositionMode() ? this.pageState() : null));
    dataSwiping = computed(() => (this.isCompositionMode() && this.swiping() ? '' : null));
    dataAutosize = computed(() => (this.isCompositionMode() && this.compositionAutoSize() ? '' : null));

    /**
     * How many slides are visible per page (composition mode). Supports fractions (e.g. 1.5).
     * @group Props
     * @defaultValue 1
     */
    slidesPerPage = input(1, { transform: numberAttribute });

    /**
     * Index of the active slide (composition mode).
     * @group Props
     */
    slide = input<number | undefined>(undefined);

    /**
     * Callback fired when the carousel's page changes (composition mode).
     * @group Emits
     */
    onPageChange = output<{ value: number }>();

    /**
     * Callback fired when the active slide changes (composition mode).
     * @group Emits
     */
    onSlideChange = output<{ value: number }>();

    // ==========================================
    // Composition mode signals
    // ==========================================

    swiping = signal(false);
    isNextDisabled = signal(false);
    isPrevDisabled = signal(false);
    snapPoints = signal<Set<number>>(new Set());
    pageState = signal(0);
    contentEl = signal<HTMLElement | null>(null);

    private _snapPointsRef = new Set<number>();
    private _scrollSnapsRef: number[] = [];
    private _initialPageApplied = false;
    private _initialControlledScroll = false;

    private _resizeObserver: ResizeObserver | null = null;
    private _mutationObserver: MutationObserver | null = null;
    private _intersectionObserver: IntersectionObserver | null = null;
    private _scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    private _wheelTimeout: ReturnType<typeof setTimeout> | null = null;
    private _scrollListener: (() => void) | null = null;

    private _swipeStartPoint = { x: 0, y: 0 };
    private _isRealSwipe = false;
    private _itemSelector = '[data-item]';

    private _areSetsEqual<T>(a: Set<T>, b: Set<T>): boolean {
        if (a.size !== b.size) return false;
        for (const value of a) {
            if (!b.has(value)) return false;
        }
        return true;
    }

    constructor() {
        super();

        // Composition mode: watch slide input changes
        effect(() => {
            const slideVal = this.slide();
            if (slideVal === undefined || slideVal === null) return;
            if (!this.isCompositionMode()) return;
            untracked(() => {
                if (this._snapPointsRef.size > 0) {
                    this.scrollToSlide(slideVal);
                }
            });
        });
    }

    onAfterContentInit() {
        this.legacyOnAfterContentInit();
    }

    onAfterContentChecked() {
        this.legacyOnAfterContentChecked();
    }

    onDestroy() {
        this.legacyOnDestroy();

        // Composition mode cleanup
        this._resizeObserver?.disconnect();
        this._mutationObserver?.disconnect();
        this._intersectionObserver?.disconnect();
        this._scrollListener?.();
        if (this._scrollTimeout) clearTimeout(this._scrollTimeout);
        if (this._wheelTimeout) clearTimeout(this._wheelTimeout);
    }

    resolveSnapType(): string {
        const axis = this.orientation() === 'vertical' ? 'y' : 'x';
        return `${axis} ${this.snapType()}`;
    }

    setupObservers() {
        const content = this.contentEl();
        if (!content) return;

        // ResizeObserver
        this._resizeObserver = new ResizeObserver(() => {
            this.computeSnapPoints();
            const closest = this.setToClosest();
            this.scrollToPage(closest ?? this.pageState(), true);
        });
        this._resizeObserver.observe(content);
        this._observeResizeItems(content);

        // Delay initial computation to ensure items have their data-item attributes
        requestAnimationFrame(() => {
            this.computeSnapPoints();
            this._observeResizeItems(content);
            this._observeIntersectionItems(content);
            this._applyInitialPage();
            this._applyControlledPage();
            this._applyControlledSlide();
        });

        // MutationObserver
        this._mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach(() => {
                this.computeSnapPoints();
                this._observeResizeItems(content);
                this._observeIntersectionItems(content);
                requestAnimationFrame(() => {
                    const closest = this.setToClosest();
                    this.scrollToPage(closest ?? this.pageState(), true);
                });
            });
        });
        this._mutationObserver.observe(content, { childList: true, subtree: true });

        // IntersectionObserver
        this._intersectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.setAttribute('data-inview', '');
                    else entry.target.removeAttribute('data-inview');
                });
            },
            { root: content, threshold: 0.6 }
        );
        this._observeIntersectionItems(content);

        // Scroll listener
        const onScroll = () => {
            if (this._scrollTimeout) clearTimeout(this._scrollTimeout);
            this._scrollTimeout = setTimeout(() => {
                this.setToClosest();
            }, 80);
        };
        onScroll();
        content.addEventListener('scroll', onScroll, { passive: true });
        this._scrollListener = () => content.removeEventListener('scroll', onScroll);
    }

    private _applyInitialPage() {
        if (this._initialPageApplied) return;
        const slideInput = this.slide();
        if (slideInput !== undefined && slideInput !== null) return;
        const size = this._snapPointsRef.size || this.snapPoints().size;
        if (size === 0) return;
        this._initialPageApplied = true;
        this.scrollToPage(0, true);
    }

    private _applyControlledPage() {
        const pageInput = this.page();
        const slideInput = this.slide();
        if (pageInput === undefined || pageInput === null) return;
        if (slideInput !== undefined && slideInput !== null) return;
        if (this._snapPointsRef.size === 0 && this.snapPoints().size === 0) return;
        const instant = !this._initialControlledScroll;
        this._initialControlledScroll = true;
        this.scrollToPage(pageInput, instant);
    }

    private _applyControlledSlide() {
        const slideInput = this.slide();
        if (slideInput === undefined || slideInput === null) return;
        if (this._snapPointsRef.size === 0 && this.snapPoints().size === 0) return;
        const instant = !this._initialControlledScroll;
        this._initialControlledScroll = true;
        this.scrollToSlide(slideInput, instant);
    }

    private _observeResizeItems(content: HTMLElement) {
        if (!this._resizeObserver) return;
        content.querySelectorAll<HTMLElement>(this._itemSelector).forEach((item) => this._resizeObserver!.observe(item));
    }

    private _observeIntersectionItems(content: HTMLElement) {
        if (!this._intersectionObserver) return;
        content.querySelectorAll<HTMLElement>(this._itemSelector).forEach((item) => this._intersectionObserver!.observe(item));
    }

    computeSnapPoints() {
        const content = this.contentEl();
        if (!content) return;

        const isHorizontal = this.orientation() !== 'vertical';
        const trackSize = isHorizontal ? content.clientWidth : content.clientHeight;
        const maxOffset = Math.max(0, isHorizontal ? content.scrollWidth - trackSize : content.scrollHeight - trackSize);
        const snaps: number[] = [];
        const alignValue = this.align();

        this._scrollSnapsRef = [];

        content.querySelectorAll<HTMLElement>(this._itemSelector).forEach((item) => {
            const offset = isHorizontal ? item.offsetLeft : item.offsetTop;
            const size = isHorizontal ? item.clientWidth : item.clientHeight;

            let snapPoint = offset;

            if (alignValue === 'center') {
                snapPoint = offset - (trackSize - size) / 2;
            } else if (alignValue === 'end') {
                snapPoint = offset - (trackSize - size);
            }

            const clamped = Math.max(0, Math.min(snapPoint, maxOffset));
            this._scrollSnapsRef.push(clamped);
            snaps.push(clamped);
        });

        const newSnapPoints = new Set(snaps.map(Number));
        if (this._areSetsEqual(this._snapPointsRef, newSnapPoints)) return;

        this._snapPointsRef = newSnapPoints;
        this.snapPoints.set(newSnapPoints);
    }

    setPage(page: number) {
        if (!this.loop()) {
            const size = this._snapPointsRef.size || this.snapPoints().size;
            this.isPrevDisabled.set(page === 0);
            this.isNextDisabled.set(page === size - 1);
        }
        this.pageState.set(page);
        this.onPageChange.emit({ value: page });
        this.onSlideChange.emit({ value: page });
    }

    setToClosest(): number | undefined {
        const content = this.contentEl();
        const points = this._snapPointsRef;
        if (!content || points.size === 0) return undefined;

        const scrollPos = this.orientation() === 'horizontal' ? content.scrollLeft : content.scrollTop;
        const closestSnapPoint = Array.from(points).reduce((closest, point) => {
            return Math.abs(point - scrollPos) < Math.abs(closest - scrollPos) ? point : closest;
        }, Infinity);

        const index = Array.from(points).indexOf(closestSnapPoint);
        this.setPage(index);
        return index;
    }

    scrollToPage(pageNum?: number, instant = false) {
        const points = this._snapPointsRef;
        if (points.size === 0) return;
        const target = pageNum ?? this.pageState();
        const clampedPage = this.loop() ? (target + points.size) % points.size : Math.max(0, Math.min(target, points.size - 1));
        this.setPage(clampedPage);
        this.scrollTo(Array.from(points)[clampedPage], instant);
    }

    next() {
        this.scrollToPage(this.pageState() + 1);
    }

    prev() {
        this.scrollToPage(this.pageState() - 1);
    }

    scrollTo(snapPoint: number, instant = false) {
        const content = this.contentEl();
        if (!content) return;
        content.scrollTo({
            [this.orientation() === 'horizontal' ? 'left' : 'top']: snapPoint,
            behavior: instant ? 'instant' : 'smooth'
        });
    }

    scrollToSlide(slideNum: number, instant = false) {
        const points = this._snapPointsRef;
        const snaps = this._scrollSnapsRef;
        if (points.size === 0 || snaps.length === 0) return;
        const clampedSlide = Math.max(0, Math.min(slideNum, snaps.length - 1));
        const snap = snaps[clampedSlide];
        this.scrollTo(snap, instant);
        const pageIdx = Array.from(points).indexOf(snap);
        this.setPage(pageIdx);
    }

    setContentEl(el: HTMLElement) {
        this.contentEl.set(el);
    }

    // Pointer event handlers (called by CarouselContent)
    onContentPointerDown(e: PointerEvent) {
        if (e.button !== 0) return;
        if (e.pointerType === 'touch') return;
        this.swiping.set(true);
        this._swipeStartPoint = { x: e.clientX, y: e.clientY };
        this._isRealSwipe = false;
    }

    onContentPointerMove(e: PointerEvent) {
        const content = this.contentEl();
        if (!this.swiping() || !content || e.pointerType === 'touch') return;
        const deltaX = e.clientX - this._swipeStartPoint.x;
        const deltaY = e.clientY - this._swipeStartPoint.y;
        const distance = Math.abs(deltaX) + Math.abs(deltaY);
        if (distance < 6) return;
        if ((window.getSelection()?.toString().length ?? 0) > 0) return;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        content.style.userSelect = 'none';
        this._isRealSwipe = true;
        content.style.scrollSnapType = 'none';
        content.scrollBy({ left: -e.movementX, top: -e.movementY, behavior: 'instant' });
        e.preventDefault();
    }

    onContentPointerUp(e: PointerEvent) {
        this.swiping.set(false);
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        if (!this._isRealSwipe) return;
        const content = this.contentEl();
        if (!content) return;
        content.style.userSelect = '';
        const scrollPos = this.orientation() === 'horizontal' ? content.scrollLeft : content.scrollTop;
        const snapPointsSet = this._snapPointsRef;
        const closestSnapPoint = Array.from(snapPointsSet).reduce((closest, point) => {
            return Math.abs(point - scrollPos) < Math.abs(closest - scrollPos) ? point : closest;
        }, Infinity);
        const index = Array.from(snapPointsSet).indexOf(closestSnapPoint);
        requestAnimationFrame(() => {
            if (closestSnapPoint !== undefined) this.scrollToPage(index);
            requestAnimationFrame(() => {
                content.style.scrollSnapType = this.resolveSnapType();
            });
        });
    }

    onContentWheel(e: WheelEvent) {
        if (this._wheelTimeout) clearTimeout(this._wheelTimeout);
        this._wheelTimeout = setTimeout(() => {
            const primaryDelta = this.orientation() === 'horizontal' ? e.deltaX || e.deltaY : e.deltaY || e.deltaX;
            if (primaryDelta > 0 && this.isNextDisabled()) return;
            if (primaryDelta < 0 && this.isPrevDisabled()) return;
            this.setToClosest();
        }, 80);
    }
}

@NgModule({
    imports: [Carousel, CarouselContentComp, CarouselItem, CarouselNext, CarouselPrev, CarouselIndicators, CarouselIndicator, SharedModule],
    exports: [Carousel, CarouselContentComp, CarouselItem, CarouselNext, CarouselPrev, CarouselIndicators, CarouselIndicator, SharedModule]
})
export class CarouselModule {}
