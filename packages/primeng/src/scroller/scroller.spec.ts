import { ChangeDetectorRef, Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { defaultEstimatedItemSize, findIndexByPosition, getScrollShift, initGridManager, Scroller, shouldCalculateNodes } from './scroller';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { debounceTime, first, fromEvent, lastValueFrom } from 'rxjs';

const getRenderedItems = <T>(fixture: ComponentFixture<T>, grid = false) =>
    fixture.debugElement
        .queryAll(By.css(`.p-virtualscroller-content div ${grid ? 'div' : ''}`))
        .map((x) => x.nativeElement)
        .filter((x) => x instanceof HTMLElement);

const findByBoundingClientRect = (items: HTMLElement[], scrollerDiv: HTMLDivElement, predicate: (itemRect: DOMRect, viewportRect: DOMRect, index: number) => boolean) => {
    return items.find((x, i) => predicate(x.getBoundingClientRect(), scrollerDiv.getBoundingClientRect(), i));
};

const getFirstInViewport = <T>(fixture: ComponentFixture<T>, scrollerDiv: HTMLDivElement, orientation: 'vertical' | 'horizontal' | 'both') =>
    findByBoundingClientRect(getRenderedItems(fixture, orientation === 'both'), scrollerDiv, (itemRect, viewportRect) => {
        const matchers = {
            vertical: itemRect.top <= viewportRect.top && itemRect.bottom > viewportRect.top,
            horizontal: itemRect.left <= viewportRect.left && itemRect.right > viewportRect.left,
            both: itemRect.top <= viewportRect.top && itemRect.bottom > viewportRect.top && itemRect.left <= viewportRect.left && itemRect.right > viewportRect.left
        };
        return matchers[orientation];
    });

const getLastInViewport = <T>(fixture: ComponentFixture<T>, scrollerDiv: HTMLDivElement, orientation: 'vertical' | 'horizontal' | 'both') =>
    findByBoundingClientRect(getRenderedItems(fixture, orientation === 'both'), scrollerDiv, (itemRect, viewportRect) => {
        const scrollBar = {
            cross: scrollerDiv.offsetHeight - scrollerDiv.clientHeight,
            main: scrollerDiv.offsetWidth - scrollerDiv.clientWidth
        };
        const matchers = {
            vertical: itemRect.top <= viewportRect.bottom && itemRect.bottom >= viewportRect.bottom,
            horizontal: itemRect.left <= viewportRect.right && itemRect.right >= viewportRect.right,
            both: itemRect.top <= viewportRect.bottom - scrollBar.cross && itemRect.bottom >= viewportRect.bottom - scrollBar.cross && itemRect.left <= viewportRect.right - scrollBar.main && itemRect.right >= viewportRect.right - scrollBar.main
        };

        return matchers[orientation];
    });

const getBoundaryViewportItems = <T>(fixture: ComponentFixture<T>, scrollerDiv: HTMLDivElement, orientation: 'vertical' | 'horizontal' | 'both') => ({
    lastInViewport: getLastInViewport(fixture, scrollerDiv, orientation),
    firstInViewport: getFirstInViewport(fixture, scrollerDiv, orientation)
});

const createActions = <ItemSize, T extends { itemSize: ItemSize }>(fixture: ComponentFixture<T>, scroller: Scroller, orientation: 'vertical' | 'horizontal' | 'both') => ({
    getRenderedItems: () => getRenderedItems(fixture, orientation === 'both'),
    scrollToIndex: (idx: number | number[], behavior?: ScrollBehavior) => {
        scroller.scrollToIndex(idx, behavior);
        scroller.elementViewChild.nativeElement.dispatchEvent(new Event('scroll'));
    },
    getViewportItems: () => getBoundaryViewportItems(fixture, scroller.elementViewChild.nativeElement, orientation),
    setItemSize: (size: ItemSize) => {
        fixture.componentInstance.itemSize = size;
        fixture.detectChanges();
    },
    scrollTo: (opts: Parameters<Scroller['scrollTo']>[0]) => {
        scroller.scrollTo(opts);
        scroller.elementViewChild.nativeElement.dispatchEvent(new Event('scroll'));
    },
    userScrollTo: (opts: ScrollToOptions) => {
        scroller.elementViewChild.nativeElement.scrollTo(opts);
        scroller.elementViewChild.nativeElement.dispatchEvent(new Event('scroll'));
    }
});

describe('Basic Scroller', () => {
    @Component({
        template: `
            <p-virtualscroller [items]="items" [itemSize]="itemSize" scrollHeight="200px" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                <ng-template #item let-item let-options="options">
                    <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" [style]="{ overflow: 'hidden', height: getItemSize(item, options.index) + 'px' }">
                        {{ item }}
                    </div>
                </ng-template>
            </p-virtualscroller>
        `,
        imports: [Scroller, CommonModule]
    })
    class BasicScrollerWrapper {
        items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
        itemSize: number | ((item: string, idx: number) => { mainAxis: number }) = 50;

        getItemSize = (item: string, idx: number) => (typeof this.itemSize === 'number' ? this.itemSize : this.itemSize(item, idx).mainAxis);
    }

    let fixture: ComponentFixture<BasicScrollerWrapper>;
    let component: BasicScrollerWrapper;
    let scroller: Scroller;
    let scrollerDiv: HTMLDivElement;
    let actions: ReturnType<typeof createActions>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({ imports: [BasicScrollerWrapper] }).compileComponents();
        fixture = TestBed.createComponent(BasicScrollerWrapper);
        component = fixture.componentInstance;
        fixture.autoDetectChanges();
        scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
        scrollerDiv = scroller.elementViewChild.nativeElement;
        actions = createActions(fixture, scroller, 'vertical');
    });

    it('should calculate correct page', () => {
        scroller.step = 10;

        expect(scroller.getPageByFirst(11)).toBe(2);
    });

    it('should render items', () => {
        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(firstInViewport).toBeTruthy();
        expect(lastInViewport).toBeTruthy();
    });

    it('should scrollToIndex of the last item', () => {
        actions.scrollToIndex(scroller.items.length - 1);

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(scroller.last).toBe(scroller.items.length);
        expect(firstInViewport).toBeTruthy();
        expect(lastInViewport.textContent.trim()).toBe(component.items.at(-1));
    });

    it('should scrollToIndex of the middle item', () => {
        const itemIdx = scroller.items.length / 2;
        actions.scrollToIndex(itemIdx);

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(scroller.first).not.toBe(0);
        expect(firstInViewport.textContent.trim()).toBe(component.items.at(itemIdx));
        expect(lastInViewport).toBeTruthy();
    });

    it('should scrollToIndex of the last item (itemSize=5)', () => {
        actions.setItemSize(5);
        actions.scrollToIndex(scroller.items.length - 1);

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(scroller.last).toBe(scroller.items.length);
        expect(firstInViewport).toBeTruthy();
        expect(lastInViewport.textContent.trim()).toBe(component.items.at(-1));
    });

    it('should scrollToIndex of the middle item (itemSize=5)', () => {
        actions.setItemSize(5);
        const itemIdx = scroller.items.length / 2;
        actions.scrollToIndex(itemIdx);

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(scroller.first).not.toBe(0);
        expect(firstInViewport.textContent.trim()).toBe(component.items.at(itemIdx));
        expect(lastInViewport).toBeTruthy();
    });

    it('should scrollToIndex of the last item (itemSize=1000)', () => {
        actions.setItemSize(1000);
        actions.scrollToIndex(scroller.items.length - 1);

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(scroller.last).toBe(scroller.items.length);
        expect(firstInViewport).toBeTruthy();
        expect(lastInViewport.textContent.trim()).toBe(component.items.at(-1));
    });

    it('should scrollToIndex of the middle item (itemSize=1000)', () => {
        actions.setItemSize(1000);
        const itemIdx = scroller.items.length / 2;
        actions.scrollToIndex(itemIdx);

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(scroller.first).not.toBe(0);
        expect(firstInViewport.textContent.trim()).toBe(component.items.at(itemIdx));
        expect(lastInViewport).toBeTruthy();
    });

    it('should scrollTo the bottom', () => {
        actions.scrollTo({ top: scrollerDiv.scrollHeight });

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(scroller.last).toBe(scroller.items.length);
        expect(firstInViewport.textContent.trim()).toBe(component.items[995]);
        expect(lastInViewport).toBeTruthy();
    });

    it('should scrollTo the middle', () => {
        actions.scrollTo({ top: scrollerDiv.scrollHeight / 2 });

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(scroller.first).not.toBe(0);
        expect(firstInViewport.textContent.trim()).toBe(component.items[499]);
        expect(lastInViewport).toBeTruthy();
    });

    it('should scrollTo the bottom (itemSize=5)', () => {
        actions.setItemSize(5);
        actions.scrollTo({ top: scrollerDiv.scrollHeight });

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(scroller.last).toBe(scroller.items.length);
        expect(firstInViewport.textContent.trim()).toBe(component.items[960]);
        expect(lastInViewport.textContent.trim()).toBe(component.items[999]);
    });

    it('should scrollTo the middle (itemSize=5)', () => {
        actions.setItemSize(5);
        actions.scrollTo({ top: scrollerDiv.scrollHeight / 2 });

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(scroller.first).not.toBe(0);
        expect(firstInViewport.textContent.trim()).toBe(component.items[535]);
        expect(lastInViewport).toBeTruthy();
    });

    it('should scrollTo the bottom (itemSize=1000)', () => {
        actions.setItemSize(1000);
        actions.scrollTo({ top: scrollerDiv.scrollHeight });

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(scroller.last).toBe(996);
        expect(firstInViewport.textContent.trim()).toBe(component.items[995]);
        expect(lastInViewport).toBeTruthy();
    });

    it('should scrollTo the middle (itemSize=1000)', () => {
        actions.setItemSize(1000);
        actions.scrollTo({ top: scrollerDiv.scrollHeight / 2 });

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(scroller.first).not.toBe(0);
        expect(firstInViewport.textContent.trim()).toBe(component.items[488]);
        expect(lastInViewport).toBeTruthy();
    });

    it('should scrollTo the middle (itemSize=variable)', () => {
        actions.setItemSize((_i, idx) => ({ mainAxis: [20, 30, 80][idx % 3] }));
        actions.scrollTo({ top: scrollerDiv.scrollHeight / 2 });

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(scroller.first).not.toBe(0);
        expect(firstInViewport.textContent.trim()).toBe(component.items[500]);
        expect(lastInViewport).toBeTruthy();
    });

    it('should scrollTo the bottom (itemSize=variable)', () => {
        actions.setItemSize((_i, idx) => ({ mainAxis: [20, 30, 80][idx % 3] }));
        actions.scrollTo({ top: scrollerDiv.scrollHeight });

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(scroller.first).toBe(989);
        expect(firstInViewport.textContent.trim()).toBe(component.items[995]);
        expect(lastInViewport).toBeTruthy();
    });

    it('should scrollToIndex of the middle item (itemSize=variable)', () => {
        actions.setItemSize((_i, idx) => ({ mainAxis: [20, 30, 80][idx % 3] }));
        const middleItemIdx = component.items.length / 2;
        actions.scrollToIndex(middleItemIdx);

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(scroller.first).not.toBe(0);
        expect(firstInViewport.textContent.trim()).toBe(component.items[middleItemIdx]);
        expect(lastInViewport).toBeTruthy();
    });

    it('should scrollToIndex of the last item (itemSize=variable)', () => {
        actions.setItemSize((_i, idx) => ({ mainAxis: [20, 30, 80][idx % 3] }));
        actions.scrollToIndex(component.items.length - 1);

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(scroller.last).toBe(component.items.length);
        expect(firstInViewport).toBeTruthy();
        expect(lastInViewport.textContent.trim()).toBe(component.items.at(-1));
    });

    it('should smoothly scrollToIndex of the item with index 50', async () => {
        const itemIdx = 50;
        scroller.scrollToIndex(itemIdx, 'smooth');
        const scroll$ = fromEvent(scrollerDiv, 'scroll').pipe(debounceTime(100), first());
        await lastValueFrom(scroll$);

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(firstInViewport.textContent.trim()).toBe(component.items.at(itemIdx));
        expect(lastInViewport).toBeTruthy();
    });

    it('should not flicker during scrolling up', () => {
        actions.userScrollTo({ top: scrollerDiv.scrollHeight / 2 + 15 });

        const prescroll = actions.getViewportItems();
        expect(prescroll.firstInViewport.getBoundingClientRect().top).toBeLessThan(scrollerDiv.getBoundingClientRect().top);
        const prescrollOffset = prescroll.firstInViewport.getBoundingClientRect().top - scrollerDiv.getBoundingClientRect().top;

        actions.userScrollTo({ top: scrollerDiv.scrollTop - 200 });

        const postscroll = actions.getViewportItems();
        const postscrollOffset = postscroll.firstInViewport.getBoundingClientRect().top - scrollerDiv.getBoundingClientRect().top;

        expect(postscroll.firstInViewport.textContent.trim()).toBe(component.items.at(495));
        expect(prescrollOffset).toBe(postscrollOffset);
        expect(postscroll.firstInViewport.getBoundingClientRect().top).toBeLessThan(scrollerDiv.getBoundingClientRect().top);
    });

    it('should not flicker during scrolling up (itemSize=5)', () => {
        actions.setItemSize(5);
        actions.userScrollTo({ top: scrollerDiv.scrollHeight / 2 + 3 });

        const prescroll = actions.getViewportItems();
        expect(prescroll.firstInViewport.getBoundingClientRect().top).toBeLessThan(scrollerDiv.getBoundingClientRect().top);
        const prescrollOffset = prescroll.firstInViewport.getBoundingClientRect().top - scrollerDiv.getBoundingClientRect().top;

        actions.userScrollTo({ top: scrollerDiv.scrollTop - 200 });

        const postscroll = actions.getViewportItems();
        const postscrollOffset = postscroll.firstInViewport.getBoundingClientRect().top - scrollerDiv.getBoundingClientRect().top;

        expect(prescroll.firstInViewport.textContent.trim()).toBe(component.items.at(535));
        expect(postscroll.firstInViewport.textContent.trim()).toBe(component.items.at(495));
        expect(prescrollOffset).toBe(postscrollOffset);
        expect(postscroll.firstInViewport.getBoundingClientRect().top).toBeLessThan(scrollerDiv.getBoundingClientRect().top);
    });

    it('should not flicker during scrolling up (itemSize=1000)', () => {
        actions.setItemSize(1000);
        actions.userScrollTo({ top: scrollerDiv.scrollHeight / 2 + 30 });

        const prescroll = actions.getViewportItems();
        expect(prescroll.firstInViewport.getBoundingClientRect().top).toBeLessThan(scrollerDiv.getBoundingClientRect().top);
        const prescrollOffset = prescroll.firstInViewport.getBoundingClientRect().top - scrollerDiv.getBoundingClientRect().top;

        actions.userScrollTo({ top: scrollerDiv.scrollTop - 200 });

        const postscroll = actions.getViewportItems();
        const postscrollOffset = postscroll.firstInViewport.getBoundingClientRect().top - scrollerDiv.getBoundingClientRect().top;

        expect(prescroll.firstInViewport.textContent.trim()).toBe(component.items.at(488));
        expect(postscroll.firstInViewport.textContent.trim()).toBe(component.items.at(487));
        expect(prescrollOffset).toBe(-30);
        expect(postscrollOffset).toBe(-830);
        expect(postscroll.firstInViewport.getBoundingClientRect().top).toBeLessThan(scrollerDiv.getBoundingClientRect().top);
    });

    it('should not flicker during scrolling down', () => {
        actions.userScrollTo({ top: scrollerDiv.scrollHeight / 2 + 15 });

        const prescroll = actions.getViewportItems();
        expect(prescroll.firstInViewport.getBoundingClientRect().top).toBeLessThan(scrollerDiv.getBoundingClientRect().top);
        const prescrollOffset = prescroll.firstInViewport.getBoundingClientRect().top - scrollerDiv.getBoundingClientRect().top;

        actions.userScrollTo({ top: scrollerDiv.scrollTop + 200 });

        const postscroll = actions.getViewportItems();
        const postscrollOffset = postscroll.firstInViewport.getBoundingClientRect().top - scrollerDiv.getBoundingClientRect().top;

        expect(postscroll.firstInViewport.textContent.trim()).toBe(component.items.at(503));
        expect(prescrollOffset).toBe(postscrollOffset);
        expect(postscroll.firstInViewport.getBoundingClientRect().top).toBeLessThan(scrollerDiv.getBoundingClientRect().top);
    });

    it('should not flicker during scrolling down (itemSize=1000)', () => {
        actions.setItemSize(1000);
        actions.userScrollTo({ top: scrollerDiv.scrollHeight / 2 + 30 });

        const prescroll = actions.getViewportItems();
        expect(prescroll.firstInViewport.getBoundingClientRect().top).toBeLessThan(scrollerDiv.getBoundingClientRect().top);
        const prescrollOffset = prescroll.firstInViewport.getBoundingClientRect().top - scrollerDiv.getBoundingClientRect().top;

        actions.userScrollTo({ top: scrollerDiv.scrollTop + 200 });

        const postscroll = actions.getViewportItems();
        const postscrollOffset = postscroll.firstInViewport.getBoundingClientRect().top - scrollerDiv.getBoundingClientRect().top;

        expect(prescroll.firstInViewport.textContent.trim()).toBe(component.items.at(488));
        expect(postscroll.firstInViewport.textContent.trim()).toBe(component.items.at(488));
        expect(prescrollOffset).toBe(-30);
        expect(postscrollOffset).toBe(-230);
        expect(postscroll.firstInViewport.getBoundingClientRect().top).toBeLessThan(scrollerDiv.getBoundingClientRect().top);
    });
});

describe('Horizontal Scroller', () => {
    @Component({
        template: `
            <p-virtualscroller [items]="items" [itemSize]="itemSize" orientation="horizontal" scrollHeight="200px" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                <ng-template #item let-item let-options="options">
                    <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" [style]="{ overflow: 'hidden', width: itemSize + 'px' }">
                        {{ item }}
                    </div>
                </ng-template>
            </p-virtualscroller>
        `,
        imports: [Scroller, CommonModule]
    })
    class HorizontalScrollerWrapper {
        items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
        itemSize = 50;
    }

    let fixture: ComponentFixture<HorizontalScrollerWrapper>;
    let scroller: Scroller;
    let scrollerDiv: HTMLDivElement;
    let actions: ReturnType<typeof createActions>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({ imports: [HorizontalScrollerWrapper] }).compileComponents();
        fixture = TestBed.createComponent(HorizontalScrollerWrapper);
        fixture.autoDetectChanges();
        scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
        scrollerDiv = scroller.elementViewChild.nativeElement;
        actions = createActions(fixture, scroller, 'horizontal');
    });

    it('should not jump during forward scrolling', () => {
        actions.scrollTo({ left: 300 });

        const { firstInViewport } = actions.getViewportItems();

        const leftBefore = firstInViewport.getBoundingClientRect().left;

        actions.scrollTo({ left: scrollerDiv.scrollLeft + 1 });

        const leftAfter = firstInViewport.getBoundingClientRect().left;

        expect(leftBefore - leftAfter).toBe(1);
    });

    it('should not jump during backward scrolling', () => {
        actions.scrollTo({ left: 30000 });

        const { firstInViewport } = actions.getViewportItems();

        const leftBefore = firstInViewport.getBoundingClientRect().left;

        actions.scrollTo({ left: scrollerDiv.scrollLeft - 1 });

        const leftAfter = firstInViewport.getBoundingClientRect().left;

        expect(leftAfter - leftBefore).toBe(1);
    });
});

describe('Lazy Scroller', () => {
    @Component({
        template: `
            <p-virtualscroller
                [items]="items"
                [itemSize]="50"
                [showLoader]="true"
                [delay]="delay"
                [loading]="lazyLoading"
                [lazy]="true"
                (onLazyLoad)="onLazyLoad($event)"
                styleClass="border border-surface"
                [style]="{ width: '200px', height: '200px' }"
            >
                <ng-template #item let-item let-options="options">
                    <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" style="height: 50px;">
                        {{ item }}
                    </div>
                </ng-template>
            </p-virtualscroller>
        `,
        imports: [Scroller, CommonModule]
    })
    class LazyScrollerWrapper {
        items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
        itemSize = 50;
        delay = 200;
        timeoutTime = 300;
        lazyLoading: boolean = true;
        loadLazyTimeout: NodeJS.Timeout;

        constructor(private cd: ChangeDetectorRef) {}

        onLazyLoad(event: { first: number; last: number }) {
            this.lazyLoading = true;
            if (this.loadLazyTimeout) clearTimeout(this.loadLazyTimeout);
            //imitate delay of a backend call
            this.loadLazyTimeout = setTimeout(() => {
                const { first, last } = event;
                const lazyItems = [...this.items];

                for (let i = first; i < last; i++) lazyItems[i] = `Item #${i}`;

                this.items = lazyItems;
                this.lazyLoading = false;
                this.cd.markForCheck();
            }, this.timeoutTime);
        }
    }

    let fixture: ComponentFixture<LazyScrollerWrapper>;
    let component: LazyScrollerWrapper;
    let scroller: Scroller;
    let scrollerDiv: HTMLDivElement;
    let actions: ReturnType<typeof createActions>;
    const setupTest = () => {
        fixture.autoDetectChanges();
        scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
        scrollerDiv = scroller.elementViewChild.nativeElement;
        actions = createActions(fixture, scroller, 'vertical');
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({ imports: [LazyScrollerWrapper] }).compileComponents();
        fixture = TestBed.createComponent(LazyScrollerWrapper);
        component = fixture.componentInstance;
    });

    it('should render items', fakeAsync(() => {
        setupTest();

        tick(component.timeoutTime);

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(firstInViewport).toBeTruthy();
        expect(lastInViewport).toBeTruthy();
    }));

    it('should scrollToIndex of the middle items', fakeAsync(() => {
        setupTest();

        tick(component.timeoutTime);
        const middleItemIdx = component.items.length / 2 - 1;
        actions.scrollToIndex(middleItemIdx);
        tick(component.delay + component.timeoutTime);

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(firstInViewport.textContent.trim()).toBe(component.items.at(middleItemIdx));
        expect(lastInViewport).toBeTruthy();
    }));

    it('should scrollToIndex of the last items', fakeAsync(() => {
        setupTest();

        tick(component.timeoutTime);
        actions.scrollToIndex(component.items.length - 1);
        tick(component.delay + component.timeoutTime);

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(firstInViewport).toBeTruthy();
        expect(lastInViewport.textContent.trim()).toBe(component.items.at(-1));
    }));

    it('should scrollTo the middle', fakeAsync(() => {
        setupTest();

        tick(component.timeoutTime);
        actions.scrollTo({ top: scrollerDiv.scrollHeight / 2 });
        tick(component.delay + component.timeoutTime);

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(firstInViewport.textContent.trim()).toBe(component.items.at(499));
        expect(lastInViewport).toBeTruthy();
    }));

    it('should scrollTo the bottom', fakeAsync(() => {
        setupTest();

        tick(component.timeoutTime);
        actions.scrollTo({ top: scrollerDiv.scrollHeight });
        tick(component.delay + component.timeoutTime);

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(firstInViewport.textContent.trim()).toBe(component.items.at(995));
        expect(lastInViewport).toBeTruthy();
    }));
});

describe('Grid Scroller', () => {
    const getItems = (lenMain = 5, lenCross = 5) => Array.from({ length: lenMain }, (_, idx) => Array.from({ length: lenCross }, (_, idxCross) => `Item #${idx}_${idxCross}`));
    @Component({
        template: `
            <p-virtualscroller [items]="items" orientation="both" [itemSize]="itemSize" scrollHeight="200px" [style]="{ width: '200px', height: '200px' }">
                <ng-template #item let-item let-options="options">
                    <div style="display: flex; align-items: center">
                        <div
                            *ngFor="let el of item; let elIndex = index"
                            style="width: {{ getItemSize(el, options.index, options.firstCrossAxisIndex + elIndex).crossAxis }}px; height: {{ getItemSize(el, options.index, options.firstCrossAxisIndex + elIndex).mainAxis }}px"
                        >
                            {{ el }}
                        </div>
                    </div>
                </ng-template>
            </p-virtualscroller>
        `,
        imports: [Scroller, CommonModule]
    })
    class GridScrollerWrapper {
        items = getItems(1000, 1000);
        itemSize: [number, number] | ((item: string, idxMain: number, idxCross: number) => { mainAxis: number }) = [50, 100];

        getItemSize = (item: string, idxMain: number, idxCross: number) => (Array.isArray(this.itemSize) ? { mainAxis: this.itemSize[0], crossAxis: this.itemSize[1] } : this.itemSize(item, idxMain, idxCross));
    }

    let fixture: ComponentFixture<GridScrollerWrapper>;
    let component: GridScrollerWrapper;
    let scroller: Scroller;
    let scrollerDiv: HTMLDivElement;
    let actions: ReturnType<typeof createActions>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({ imports: [GridScrollerWrapper] }).compileComponents();
        fixture = TestBed.createComponent(GridScrollerWrapper);
        component = fixture.componentInstance;
        fixture.autoDetectChanges();
        scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
        scrollerDiv = scroller.elementViewChild.nativeElement;
        actions = createActions(fixture, scroller, 'both');
    });

    it('should scrollToIndex of the last item', () => {
        const idx = { main: component.items.length - 1, cross: component.items.at(0).length - 1 };
        actions.scrollToIndex([idx.main, idx.cross]);

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(scroller.last).toEqual({ rows: idx.main + 1, cols: idx.cross + 1 });
        expect(firstInViewport).toBeTruthy();
        expect(lastInViewport.textContent.trim()).toBe(component.items.at(idx.main).at(idx.cross));
    });

    it('should scrollToIndex of the middle item', () => {
        const itemIdx = { main: component.items.length / 2, cross: component.items.at(0).length / 2 };
        actions.scrollToIndex([itemIdx.main, itemIdx.cross]);

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(scroller.first).not.toBe(0);
        expect(firstInViewport.textContent.trim()).toBe(component.items.at(itemIdx.main).at(itemIdx.cross));
        expect(lastInViewport).toBeTruthy();
    });

    it('should scrollToIndex of the last item (itemSize=[5,10])', () => {
        actions.setItemSize([5, 10]);
        const itemIdx = { main: component.items.length - 1, cross: component.items.at(0).length - 1 };
        actions.scrollToIndex([itemIdx.main, itemIdx.cross]);

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(scroller.last).toEqual({ rows: itemIdx.main + 1, cols: itemIdx.cross + 1 });
        expect(firstInViewport).toBeTruthy();
        expect(lastInViewport.textContent.trim()).toBe(component.items.at(itemIdx.main).at(itemIdx.cross));
    });

    it('should scrollToIndex of the middle item (itemSize=[5,10])', () => {
        actions.setItemSize([5, 10]);
        const itemIdx = { main: component.items.length / 2, cross: component.items.at(0).length / 2 };
        actions.scrollToIndex([itemIdx.main, itemIdx.cross]);

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(scroller.first).not.toBe(0);
        expect(firstInViewport.textContent.trim()).toBe(component.items.at(itemIdx.main).at(itemIdx.cross));
        expect(lastInViewport).toBeTruthy();
    });

    it('should scrollTo the bottom', () => {
        actions.scrollTo({ top: scrollerDiv.scrollHeight, left: scrollerDiv.scrollWidth });

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(scroller.last).toEqual({ rows: 1000, cols: 1000 });
        expect(firstInViewport.textContent.trim()).toBe(component.items[995][995]);
        expect(lastInViewport).toBeTruthy();
    });

    it('should scrollTo the middle', () => {
        actions.scrollTo({ top: scrollerDiv.scrollHeight / 2, left: scrollerDiv.scrollWidth / 2 });

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(scroller.first).not.toEqual({ rows: 0, cols: 0 });
        expect(firstInViewport.textContent.trim()).toBe(component.items[499][497]);
        expect(lastInViewport).toBeTruthy();
    });

    it('should calculate positions during user scrolling', () => {
        actions.userScrollTo({ top: 1000, left: 1000 });

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(scroller.first).not.toEqual({ rows: 0, cols: 0 });
        expect(firstInViewport.textContent.trim()).toBe(component.items.at(23).at(19));
        expect(lastInViewport).toBeTruthy();
    });

    it('should jump to bottom item from user scrolling', () => {
        actions.userScrollTo({ top: scrollerDiv.scrollHeight, left: scrollerDiv.scrollWidth });

        const { firstInViewport, lastInViewport } = actions.getViewportItems();

        expect(scroller.last).toEqual({ rows: 1000, cols: 1000 });
        expect(firstInViewport.textContent.trim()).toBe(component.items.at(995).at(995));
        expect(lastInViewport).toBeTruthy();
    });

    it('should not flicker during scrolling', () => {
        actions.userScrollTo({ top: scrollerDiv.scrollHeight / 2, left: scrollerDiv.scrollWidth / 2 + 10 });

        const prescroll = actions.getViewportItems();
        expect(prescroll.firstInViewport.getBoundingClientRect().left).toBeLessThan(scrollerDiv.getBoundingClientRect().left);
        const prescrollOffset = {
            main: prescroll.firstInViewport.getBoundingClientRect().top - scrollerDiv.getBoundingClientRect().top,
            cross: prescroll.firstInViewport.getBoundingClientRect().left - scrollerDiv.getBoundingClientRect().left
        };

        actions.userScrollTo({ top: scrollerDiv.scrollTop, left: scrollerDiv.scrollLeft - 200 });

        const postscroll = actions.getViewportItems();
        expect(postscroll.firstInViewport.textContent.trim()).toBe(component.items.at(499).at(495));
        const postscrollOffset = {
            main: postscroll.firstInViewport.getBoundingClientRect().top - scrollerDiv.getBoundingClientRect().top,
            cross: postscroll.firstInViewport.getBoundingClientRect().left - scrollerDiv.getBoundingClientRect().left
        };

        expect(prescrollOffset).toEqual(postscrollOffset);
        expect(postscroll.firstInViewport.getBoundingClientRect().left).toBeLessThan(scrollerDiv.getBoundingClientRect().left);
        expect(scroller.first['cols']).toBeLessThan(495);
    });

    it('should not flicker on scroll up (itemSize=variable)', () => {
        actions.setItemSize((_i, idxMain, idxCross) => ({ mainAxis: [120, 20, 50, 30][idxMain % 4], crossAxis: [80, 125, 100, 200][idxCross % 4] }));
        actions.userScrollTo({ top: scrollerDiv.scrollHeight / 2, left: scrollerDiv.scrollWidth / 2 });

        const { firstInViewport } = actions.getViewportItems();
        const firstInViewportPos = firstInViewport.getBoundingClientRect().top;

        actions.userScrollTo({ top: scrollerDiv.scrollTop - 100, left: scrollerDiv.scrollLeft });

        const prevFirstInViewport = actions.getRenderedItems().find((item) => item.textContent === firstInViewport.textContent);

        expect(prevFirstInViewport.getBoundingClientRect().top - firstInViewportPos).toBe(100);
    });

    it('should not flicker on scroll left (itemSize=variable)', () => {
        actions.setItemSize((_i, idxMain, idxCross) => ({ mainAxis: [120, 20, 50, 30][idxMain % 4], crossAxis: [80, 125, 100, 200][idxCross % 4] }));
        actions.userScrollTo({ top: scrollerDiv.scrollHeight / 2, left: scrollerDiv.scrollWidth / 2 });

        const { firstInViewport } = actions.getViewportItems();
        const firstInViewportPos = firstInViewport.getBoundingClientRect().left;

        actions.userScrollTo({ top: scrollerDiv.scrollTop, left: scrollerDiv.scrollLeft - 100 });

        const prevFirstInViewport = actions.getRenderedItems().find((item) => item.textContent === firstInViewport.textContent);

        expect(prevFirstInViewport.getBoundingClientRect().left - firstInViewportPos).toBe(100);
    });
});

describe('initGridManager', () => {
    const getItems = (len = 5) => Array.from({ length: len }, (_, idx) => `Item #${idx}`);
    const getGridItems = (lenMain = 5, lenCross = 5) => getItems(lenMain).map((_, idx) => Array.from({ length: lenCross }, (_, idxCross) => `Item #${idx}_${idxCross}`));

    it('should initialize nodes', () => {
        const { nodes } = initGridManager({
            items: getGridItems(),
            getScrollPos: () => ({ main: 0, cross: 0 }),
            setScrollSize: () => {},
            scrollTo: () => {},
            getItemSize: () => ({ main: 50, cross: 60 }),
            viewportSize: { main: 100, cross: 100 }
        });

        expect(nodes).toEqual({
            mainAxis: [
                { size: 50, pos: 0 },
                { size: 50, pos: 50 },
                { size: 50, pos: 100 },
                { size: 50, pos: 150 },
                { size: defaultEstimatedItemSize.main, pos: 200 }
            ],
            crossAxis: [
                { size: 60, pos: 0 },
                { size: 60, pos: 60 },
                { size: 60, pos: 120 },
                { size: 60, pos: 180 },
                { size: defaultEstimatedItemSize.cross, pos: 240 }
            ]
        });
    });

    it('should initialize 1_000_000 nodes', () => {
        const { nodes } = initGridManager({
            items: getItems(1_000_000),
            getScrollPos: () => ({ main: 0, cross: 0 }),
            setScrollSize: () => {},
            scrollTo: () => {},
            getItemSize: () => ({ main: 50, cross: 60 }),
            viewportSize: { main: 100, cross: 100 }
        });

        expect(nodes.mainAxis.slice(0, 5)).toEqual([
            { size: 50, pos: 0 },
            { size: 50, pos: 50 },
            { size: 50, pos: 100 },
            { size: 50, pos: 150 },
            { size: defaultEstimatedItemSize.main, pos: 200 }
        ]);
        expect(nodes.crossAxis).toEqual([{ size: 60, pos: 0 }]);
    });

    it('should calculate nodes for item at index [999,999]', () => {
        const { nodes, at } = initGridManager({
            items: getGridItems(1000, 1000),
            getItemSize: () => ({ main: 50, cross: 100 }),
            getScrollPos: () => ({ main: 0, cross: 0 }),
            scrollTo: () => {},
            setScrollSize: () => {},
            viewportSize: { main: 200, cross: 200 }
        });
        at(-1, -1);

        expect(nodes.mainAxis.slice(0, 10)).toEqual([
            { size: 50, pos: 0 },
            { size: 50, pos: 50 },
            { size: 50, pos: 100 },
            { size: 50, pos: 150 },
            { size: 50, pos: 200 },
            { size: 50, pos: 250 },
            { size: 50, pos: 300 },
            { size: 50, pos: 350 },
            { size: defaultEstimatedItemSize.main, pos: 400 },
            { size: defaultEstimatedItemSize.main, pos: 440 }
        ]);
        expect(nodes.mainAxis.slice(-10)).toEqual([
            { size: defaultEstimatedItemSize.main, pos: 39680 },
            { size: defaultEstimatedItemSize.main, pos: 39720 },
            { size: 50, pos: 39760 },
            { size: 50, pos: 39810 },
            { size: 50, pos: 39860 },
            { size: 50, pos: 39910 },
            { size: 50, pos: 39960 },
            { size: 50, pos: 40010 },
            { size: 50, pos: 40060 },
            { size: 50, pos: 40110 }
        ]);
        expect(nodes.crossAxis.slice(0, 6)).toEqual([
            { size: 100, pos: 0 },
            { size: 100, pos: 100 },
            { size: 100, pos: 200 },
            { size: 100, pos: 300 },
            { size: defaultEstimatedItemSize.cross, pos: 400 },
            { size: defaultEstimatedItemSize.cross, pos: 440 }
        ]);
        expect(nodes.crossAxis.slice(-6)).toEqual([
            { size: defaultEstimatedItemSize.cross, pos: 40000 },
            { size: defaultEstimatedItemSize.cross, pos: 40040 },
            { size: 100, pos: 40080 },
            { size: 100, pos: 40180 },
            { size: 100, pos: 40280 },
            { size: 100, pos: 40380 }
        ]);
    });

    it('should calculate nodes with first node partially in viewport', () => {
        const scrollPos = { main: 0, cross: 0 };
        const viewportSize = { main: 200, cross: 200 };
        const { nodes, getRange } = initGridManager({
            items: getGridItems(1000, 1000),
            getItemSize: () => ({ main: 100, cross: 100 }),
            getScrollPos: () => scrollPos,
            scrollTo: ({ main, cross }) => {
                scrollPos.main = main;
                scrollPos.cross = cross;
            },
            setScrollSize: () => {},
            viewportSize
        });
        scrollPos.main = 40055;
        scrollPos.cross = scrollPos.main;
        getRange({ main: 0, cross: 0 }, { main: 0, cross: 0 });
        const lastRenderedIdx = findIndexByPosition(scrollPos.main + viewportSize.main * 2, nodes.mainAxis);
        const firstInViewportIdx = findIndexByPosition(scrollPos.main, nodes.mainAxis);

        expect(scrollPos.main - nodes.mainAxis[firstInViewportIdx].pos).toBe(15);
        expect(lastRenderedIdx).toBe(999);
        expect(nodes.mainAxis.at(lastRenderedIdx).size).toBe(100);
    });

    it('should calculate nodes for item at index [499,499]', () => {
        const { nodes, at } = initGridManager({
            items: getGridItems(1000, 1000),
            getItemSize: () => ({ main: 50, cross: 100 }),
            getScrollPos: () => ({ main: 0, cross: 0 }),
            scrollTo: () => {},
            setScrollSize: () => {},
            viewportSize: { main: 200, cross: 200 }
        });
        at(499, 499);

        expect(nodes.mainAxis.slice(494, 509)).toEqual([
            { size: defaultEstimatedItemSize.main, pos: 19840 },
            { size: 50, pos: 19880 },
            { size: 50, pos: 19930 },
            { size: 50, pos: 19980 },
            { size: 50, pos: 20030 },
            { size: 50, pos: 20080 },
            { size: 50, pos: 20130 },
            { size: 50, pos: 20180 },
            { size: 50, pos: 20230 },
            { size: 50, pos: 20280 },
            { size: 50, pos: 20330 },
            { size: 50, pos: 20380 },
            { size: 50, pos: 20430 },
            { size: defaultEstimatedItemSize.main, pos: 20480 },
            { size: defaultEstimatedItemSize.main, pos: 20520 }
        ]);
        expect(nodes.crossAxis.slice(496, 505)).toEqual([
            { size: defaultEstimatedItemSize.cross, pos: 20080 },
            { size: 100, pos: 20120 },
            { size: 100, pos: 20220 },
            { size: 100, pos: 20320 },
            { size: 100, pos: 20420 },
            { size: 100, pos: 20520 },
            { size: 100, pos: 20620 },
            { size: defaultEstimatedItemSize.cross, pos: 20720 },
            { size: defaultEstimatedItemSize.cross, pos: 20760 }
        ]);
    });

    it('should calculate first node to render', () => {
        const scrollPos = { main: 19960, cross: 19960 };
        const { getRange, nodes } = initGridManager({
            items: getGridItems(1000, 1000),
            getScrollPos: () => scrollPos,
            getItemSize: () => ({ main: 50, cross: 100 }),
            scrollTo: (x) => {
                scrollPos.main = x.main;
                scrollPos.cross = x.cross;
            },
            setScrollSize: () => {},
            viewportSize: { main: 200, cross: 200 }
        });

        const expectedFirstItemToRender = { main: 495, cross: 497 };
        expect(getRange({ main: 0, cross: 0 }, { main: 0, cross: 0 }).first).toEqual(expectedFirstItemToRender);
        expect(nodes.mainAxis[expectedFirstItemToRender.main].size).toBe(50);
        expect(nodes.crossAxis[expectedFirstItemToRender.cross].size).toBe(100);
    });

    it('should calculate last node index that should not be rendered', () => {
        const scrollPos = { main: 19960, cross: 19960 };
        const { getRange, nodes } = initGridManager({
            items: getGridItems(1000, 1000),
            getScrollPos: () => scrollPos,
            getItemSize: () => ({ main: 50, cross: 100 }),
            scrollTo: (x) => {
                scrollPos.main = x.main;
                scrollPos.cross = x.cross;
            },
            setScrollSize: () => {},
            viewportSize: { main: 200, cross: 200 }
        });

        const expectedLast = { main: 507, cross: 503 };
        expect(getRange({ main: 0, cross: 0 }, { main: 0, cross: 0 }).last).toEqual(expectedLast);
        expect(nodes.mainAxis[expectedLast.main - 1].size).toBe(50);
        expect(nodes.crossAxis[expectedLast.cross - 1].size).toBe(100);
        expect(nodes.mainAxis[expectedLast.main].size).toBe(defaultEstimatedItemSize.main);
        expect(nodes.crossAxis[expectedLast.cross].size).toBe(defaultEstimatedItemSize.cross);
    });

    it('should calculate nodes at the bottom', () => {
        const { nodes, at } = initGridManager({
            items: getGridItems(6, 5),
            getItemSize: (_, mainIdx, crossIdx) => ({ main: [20, 50, 100][mainIdx % 3], cross: [30, 60, 110][crossIdx % 3] }),
            getScrollPos: () => ({ main: 340, cross: 400 }),
            setScrollSize: () => {},
            scrollTo: () => {},
            viewportSize: { main: 100, cross: 100 }
        });
        at(-1, -1);

        expect(nodes).toEqual({
            mainAxis: [
                { size: defaultEstimatedItemSize.main, pos: 0 },
                { size: 50, pos: 40 },
                { size: 100, pos: 90 },
                { size: 20, pos: 190 },
                { size: 50, pos: 210 },
                { size: 100, pos: 260 }
            ],
            crossAxis: [
                { size: defaultEstimatedItemSize.cross, pos: 0 },
                { size: defaultEstimatedItemSize.cross, pos: 40 },
                { size: 110, pos: 80 },
                { size: 30, pos: 190 },
                { size: 60, pos: 220 }
            ]
        });
    });

    it('should calculate nodes at the middle', () => {
        const { nodes, at } = initGridManager({
            items: getGridItems(10, 10),
            getItemSize: (_, mainIdx, crossIdx) => ({ main: [20, 50, 100][mainIdx % 3], cross: [30, 60, 110][crossIdx % 3] }),
            getScrollPos: () => ({ main: 160, cross: 160 }),
            setScrollSize: () => {},
            scrollTo: () => {},
            viewportSize: { main: 100, cross: 100 }
        });
        at(4, 4);

        expect(nodes).toEqual({
            mainAxis: [
                { size: defaultEstimatedItemSize.main, pos: 0 },
                { size: defaultEstimatedItemSize.main, pos: 40 },
                { size: 100, pos: 80 },
                { size: 20, pos: 180 },
                { size: 50, pos: 200 },
                { size: 100, pos: 250 },
                { size: 20, pos: 350 },
                { size: 50, pos: 370 },
                { size: defaultEstimatedItemSize.main, pos: 420 },
                { size: defaultEstimatedItemSize.main, pos: 460 }
            ],
            crossAxis: [
                { size: defaultEstimatedItemSize.cross, pos: 0 },
                { size: defaultEstimatedItemSize.cross, pos: 40 },
                { size: 110, pos: 80 },
                { size: 30, pos: 190 },
                { size: 60, pos: 220 },
                { size: 110, pos: 280 },
                { size: 30, pos: 390 },
                { size: defaultEstimatedItemSize.cross, pos: 420 },
                { size: defaultEstimatedItemSize.cross, pos: 460 },
                { size: defaultEstimatedItemSize.cross, pos: 500 }
            ]
        });
    });

    it('should calculate nodes at the top and adjust leftover nodes', () => {
        const { nodes, at } = initGridManager({
            items: getGridItems(),
            getItemSize: () => ({ main: 200, cross: 200 }),
            getScrollPos: () => ({ main: 0, cross: 0 }),
            setScrollSize: () => {},
            scrollTo: () => {},
            viewportSize: { main: 200, cross: 200 }
        });
        at(1, 1);

        expect(nodes).toEqual({
            mainAxis: [
                { size: 200, pos: 0 },
                { size: 200, pos: 200 },
                { size: 200, pos: 400 },
                { size: defaultEstimatedItemSize.main, pos: 600 },
                { size: defaultEstimatedItemSize.main, pos: 640 }
            ],
            crossAxis: [
                { size: 200, pos: 0 },
                { size: 200, pos: 200 },
                { size: 200, pos: 400 },
                { size: defaultEstimatedItemSize.cross, pos: 600 },
                { size: defaultEstimatedItemSize.cross, pos: 640 }
            ]
        });
    });

    it('should calculate nodes at the bottom and adjust leftover nodes', () => {
        const { nodes, at } = initGridManager({
            items: getGridItems(),
            getItemSize: () => ({ main: 200, cross: 200 }),
            getScrollPos: () => ({ main: 0, cross: 0 }),
            setScrollSize: () => {},
            scrollTo: () => {},
            viewportSize: { main: 200, cross: 200 }
        });
        at(-1, -1);

        expect(nodes).toEqual({
            mainAxis: [
                { size: 200, pos: 0 },
                { size: 200, pos: 200 },
                { size: defaultEstimatedItemSize.main, pos: 400 },
                { size: 200, pos: 440 },
                { size: 200, pos: 640 }
            ],
            crossAxis: [
                { size: 200, pos: 0 },
                { size: 200, pos: 200 },
                { size: defaultEstimatedItemSize.cross, pos: 400 },
                { size: 200, pos: 440 },
                { size: 200, pos: 640 }
            ]
        });
    });

    it('should restore same item in viewport', () => {
        const scrollPos = { main: 0, cross: 0 };
        const gridManager = initGridManager({
            items: getGridItems(100),
            getScrollPos: () => scrollPos,
            getItemSize: () => ({ main: 30, cross: 10 }),
            viewportSize: { main: 200, cross: 200 },
            scrollTo: ({ main, cross }) => {
                scrollPos.main = main;
                scrollPos.cross = cross;
            },
            setScrollSize: () => {}
        });
        scrollPos.main = gridManager.totalSize().main / 2 + 20;
        scrollPos.cross = gridManager.totalSize().cross / 2;
        gridManager.getRange({ main: 0, cross: 0 }, { main: 0, cross: 0 });
        const firstInViewport = gridManager.nodesInViewport().first;

        const scrollPos2 = {
            main: scrollPos.main + getScrollShift({ scrollPos: scrollPos.main, prevNodePos: gridManager.nodes.mainAxis[firstInViewport.main].pos, currNodePos: defaultEstimatedItemSize.main * firstInViewport.main }),
            cross: scrollPos.cross + getScrollShift({ scrollPos: scrollPos.cross, prevNodePos: gridManager.nodes.crossAxis[firstInViewport.cross].pos, currNodePos: defaultEstimatedItemSize.cross * firstInViewport.cross })
        };
        const gridManager2 = initGridManager({
            items: getGridItems(100),
            getScrollPos: () => scrollPos2,
            getItemSize: () => ({ main: 30, cross: 10 }),
            viewportSize: { main: 200, cross: 200 },
            scrollTo: ({ main, cross }) => {
                scrollPos2.main = main;
                scrollPos2.cross = cross;
            },
            setScrollSize: () => {}
        });
        const firstInViewport2 = gridManager2.nodesInViewport().first;

        expect(firstInViewport).toEqual(firstInViewport2);
        expect(scrollPos.main - gridManager.nodes.mainAxis[firstInViewport.main].pos).toBe(scrollPos2.main - gridManager2.nodes.mainAxis[firstInViewport.main].pos);
        expect(scrollPos.cross - gridManager.nodes.crossAxis[firstInViewport.cross].pos).toBe(scrollPos2.cross - gridManager2.nodes.crossAxis[firstInViewport.cross].pos);
    });

    it('should keep assumed nodes in view after calculation', () => {
        const scrollPos = { main: 0, cross: 0 };
        const gridManager = initGridManager({
            items: getGridItems(100),
            getScrollPos: () => scrollPos,
            getItemSize: () => ({ main: 50, cross: 40 }),
            viewportSize: { main: 200, cross: 200 },
            scrollTo: ({ main, cross }) => {
                scrollPos.main = main;
                scrollPos.cross = cross;
            },
            setScrollSize: () => {}
        });

        scrollPos.main = 3000;
        const preidx = findIndexByPosition(scrollPos.main, gridManager.nodes.mainAxis);
        gridManager.getRange({ main: 0, cross: 0 }, { main: 0, cross: 0 });
        const postidx = findIndexByPosition(scrollPos.main, gridManager.nodes.mainAxis);

        expect(preidx).toBe(postidx);
    });

    xdescribe('perf', () => {
        it('should initialize in 10ms', () => {
            const params = {
                items: getGridItems(5000, 5000),
                getItemSize: () => ({ main: 50, cross: 100 }),
                getScrollPos: () => ({ main: 0, cross: 0 }),
                scrollTo: () => {},
                setScrollSize: () => {},
                viewportSize: { main: 2000, cross: 2000 }
            };

            const start = performance.now();
            initGridManager(params);
            const end = performance.now();

            expect(end - start).toBeLessThanOrEqual(10);
        });

        it('should getRange in 10ms', () => {
            const scrollPos = { main: 0, cross: 0 };
            const { getRange } = initGridManager({
                items: getGridItems(5000, 5000),
                getItemSize: () => ({ main: 50, cross: 100 }),
                getScrollPos: () => scrollPos,
                scrollTo: () => {},
                setScrollSize: () => {},
                viewportSize: { main: 2000, cross: 2000 }
            });
            scrollPos.main = 20000;
            scrollPos.cross = 20000;

            const start = performance.now();
            getRange({ main: 0, cross: 0 }, { main: 0, cross: 0 });
            const end = performance.now();

            expect(end - start).toBeLessThanOrEqual(10);
        });

        it('should calculate nodes in 10ms', () => {
            const { at } = initGridManager({
                items: getGridItems(5000, 5000),
                getItemSize: () => ({ main: 50, cross: 100 }),
                getScrollPos: () => ({ main: 0, cross: 0 }),
                scrollTo: () => {},
                setScrollSize: () => {},
                viewportSize: { main: 2000, cross: 2000 }
            });

            const start = performance.now();
            at(4999, 4999);
            const end = performance.now();

            expect(end - start).toBeLessThanOrEqual(10);
        });
    });
});

describe('getScrollShift', () => {
    it('should calculate scroll shift (scrollPos=50))', () => {
        const scrollPos = 50;
        const shift = getScrollShift({ scrollPos, prevNodePos: 40, currNodePos: 180 });
        expect(scrollPos + shift).toBe(190);
    });

    it('should calculate scroll shift (scrollPos=190)', () => {
        const scrollPos = 190;
        const shift = getScrollShift({ scrollPos, prevNodePos: 180, currNodePos: 40 });
        expect(scrollPos + shift).toBe(50);
    });

    it('should calculate scroll shift (scrollPos=0)', () => {
        const shift = getScrollShift({ scrollPos: 0, prevNodePos: 0, currNodePos: 0 });
        expect(shift).toBe(0);
    });
});

describe('shouldCalculateNodes', () => {
    it('should not calculate already calculated nodes when trigger distance to first rendered node is passed', () => {
        const res = shouldCalculateNodes({
            nodes: Array.from({ length: 100 }, (_, idx) => ({ size: 40, pos: idx * 40 })),
            calculatedIdxs: Array.from({ length: 100 }, () => true),
            triggerDistance: 200,
            viewportSize: 400,
            viewportNodesIdxs: { first: 25, last: 35 },
            renderedNodesIdxs: { first: 22, last: 45 }
        });

        expect(res).toBeFalse();
    });

    it('should not calculate already calculated nodes when trigger distance to last rendered node is passed', () => {
        const res = shouldCalculateNodes({
            nodes: Array.from({ length: 100 }, (_, idx) => ({ size: 40, pos: idx * 40 })),
            calculatedIdxs: Array.from({ length: 100 }, () => true),
            triggerDistance: 200,
            viewportSize: 400,
            viewportNodesIdxs: { first: 25, last: 35 },
            renderedNodesIdxs: { first: 15, last: 37 }
        });

        expect(res).toBeFalse();
    });

    it('should calculate nodes when trigger distance to first rendered node is passed', () => {
        const res = shouldCalculateNodes({
            nodes: Array.from({ length: 100 }, (_, idx) => ({ size: 40, pos: idx * 40 })),
            calculatedIdxs: Array.from({ length: 100 }, (_, idx) => idx >= 22 && idx <= 45),
            triggerDistance: 200,
            viewportSize: 400,
            viewportNodesIdxs: { first: 25, last: 35 },
            renderedNodesIdxs: { first: 22, last: 45 }
        });

        expect(res).toBeTrue();
    });

    it('should calculate nodes when trigger distance to last rendered node is passed', () => {
        const res = shouldCalculateNodes({
            nodes: Array.from({ length: 100 }, (_, idx) => ({ size: 40, pos: idx * 40 })),
            calculatedIdxs: Array.from({ length: 100 }, (_, idx) => idx >= 15 && idx <= 37),
            triggerDistance: 200,
            viewportSize: 400,
            viewportNodesIdxs: { first: 25, last: 35 },
            renderedNodesIdxs: { first: 15, last: 37 }
        });

        expect(res).toBeTrue();
    });

    it('should calculate nodes when they are no calculated nodes', () => {
        const res = shouldCalculateNodes({
            nodes: Array.from({ length: 100 }, (_, idx) => ({ size: 40, pos: idx * 40 })),
            calculatedIdxs: Array.from({ length: 100 }, () => false),
            triggerDistance: 200,
            viewportSize: 400,
            viewportNodesIdxs: { first: 25, last: 35 },
            renderedNodesIdxs: { first: 15, last: 37 }
        });

        expect(res).toBeTrue();
    });

    it('should not calculate nodes when they are calculated', () => {
        const res = shouldCalculateNodes({
            nodes: [{ size: 300, pos: 0 }],
            calculatedIdxs: [true],
            triggerDistance: 200,
            viewportSize: 400,
            viewportNodesIdxs: { first: 0, last: 0 },
            renderedNodesIdxs: { first: 0, last: 0 }
        });

        expect(res).toBeFalse();
    });

    it('should calculate nodes in viewport that are not calculated', () => {
        const res = shouldCalculateNodes({
            nodes: Array.from({ length: 100 }, (_, idx) => ({ size: 40, pos: idx * 40 })),
            calculatedIdxs: Array.from({ length: 100 }, (_, idx) => idx < 50 || idx > 60),
            triggerDistance: 200,
            viewportSize: 400,
            viewportNodesIdxs: { first: 50, last: 60 },
            renderedNodesIdxs: { first: 10, last: 40 }
        });

        expect(res).toBeTrue();
    });
});
