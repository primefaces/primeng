import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { binarySearchFirst, getShift, initGridPositions, Scroller } from './scroller';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { debounceTime, first, fromEvent, lastValueFrom, tap } from 'rxjs';

fdescribe('mytest', () => {
    @Component({
        template: `
            <p-virtualscroller [items]="items" [itemSize]="itemSize" scrollHeight="200px" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                <ng-template #item let-item let-options="options">
                    <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" style="height: {{ itemSize }}px; overflow: hidden;">
                        {{ item }}
                    </div>
                </ng-template>
            </p-virtualscroller>
        `,
        imports: [Scroller, CommonModule]
    })
    class BasicScrollerWrapper {
        items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
        itemSize = 50;
    }

    const getRenderedItems = <T>(fixture: ComponentFixture<T>) =>
        fixture.debugElement
            .queryAll(By.css('.p-virtualscroller-content div'))
            .map((x) => x.nativeElement)
            .filter((x) => x instanceof HTMLElement);
    const getRenderedItemsGrid = <T>(fixture: ComponentFixture<T>) =>
        fixture.debugElement.queryAll(By.css('.p-virtualscroller-content div div')).reduce((acc, x) => {
            if (x.nativeElement instanceof HTMLElement) acc.push(x.nativeElement);
            return acc;
        }, []);

    const findByBoundingClientRect = (items: HTMLElement[], scrollerDiv: HTMLDivElement, predicate: (itemRect: DOMRect, viewportRect: DOMRect, index: number) => boolean) => {
        return items.find((x, i) => predicate(x.getBoundingClientRect(), scrollerDiv.getBoundingClientRect(), i));
    };

    const getFirstInViewport = <T>(fixture: ComponentFixture<T>, scrollerDiv: HTMLDivElement) =>
        findByBoundingClientRect(getRenderedItems(fixture), scrollerDiv, (itemRect, viewportRect) => itemRect.top <= viewportRect.top && itemRect.bottom > viewportRect.top);

    const getFirstInViewportGrid = <T>(fixture: ComponentFixture<T>, scrollerDiv: HTMLDivElement) =>
        findByBoundingClientRect(getRenderedItemsGrid(fixture), scrollerDiv, (itemRect, viewportRect) => {
            return itemRect.top <= viewportRect.top && itemRect.bottom > viewportRect.top && itemRect.left <= viewportRect.left && itemRect.right > viewportRect.left;
        });

    const getLastInViewport = <T>(fixture: ComponentFixture<T>, scrollerDiv: HTMLDivElement) =>
        findByBoundingClientRect(getRenderedItems(fixture), scrollerDiv, (itemRect, viewportRect) => itemRect.top <= viewportRect.bottom && itemRect.bottom >= viewportRect.bottom);

    const getLastInViewportGrid = <T>(fixture: ComponentFixture<T>, scrollerDiv: HTMLDivElement) =>
        findByBoundingClientRect(getRenderedItemsGrid(fixture), scrollerDiv, (itemRect, viewportRect) => {
            const scrollBar = {
                cross: scrollerDiv.offsetHeight - scrollerDiv.clientHeight,
                main: scrollerDiv.offsetWidth - scrollerDiv.clientWidth
            };
            return itemRect.top <= viewportRect.bottom - scrollBar.cross && itemRect.bottom >= viewportRect.bottom - scrollBar.cross && itemRect.left <= viewportRect.right - scrollBar.main && itemRect.right >= viewportRect.right - scrollBar.main;
        });

    const getBoundaryViewportItems = <T>(fixture: ComponentFixture<T>, scrollerDiv: HTMLDivElement) => ({ lastInViewport: getLastInViewport(fixture, scrollerDiv), firstInViewport: getFirstInViewport(fixture, scrollerDiv) });

    const getBoundaryViewportItemsGrid = <T>(fixture: ComponentFixture<T>, scrollerDiv: HTMLDivElement) => ({ lastInViewport: getLastInViewportGrid(fixture, scrollerDiv), firstInViewport: getFirstInViewportGrid(fixture, scrollerDiv) });

    const expandInViewport = <T>(num: number, fixture: ComponentFixture<T>) => {
        getRenderedItems(fixture)
            .slice(0, num)
            .forEach((item) => item.click());
    };

    describe('Scroller', () => {
        let fixture: ComponentFixture<BasicScrollerWrapper>;
        let component: BasicScrollerWrapper;
        let scroller: Scroller;
        let scrollerDiv: HTMLDivElement;
        beforeEach(async () => {
            await TestBed.configureTestingModule({ imports: [BasicScrollerWrapper] }).compileComponents();
            fixture = TestBed.createComponent(BasicScrollerWrapper);
            component = fixture.componentInstance;
            fixture.autoDetectChanges();
            scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
            scrollerDiv = scroller.elementViewChild.nativeElement;
        });

        it('should scrollToIndex of the last index with itemSize equals to 50', () => {
            scroller.scrollToIndex(scroller.items.length - 1);
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const { firstInViewport, lastInViewport } = getBoundaryViewportItems(fixture, scrollerDiv);

            expect(scroller.last).toBe(scroller.items.length);
            expect(firstInViewport).toBeTruthy();
            expect(lastInViewport.textContent.trim()).toBe(component.items.at(-1));
        });

        it('should scrollToIndex of the middle index with itemSize equals to 50', () => {
            const itemIdx = scroller.items.length / 2;
            scroller.scrollToIndex(itemIdx);
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const { firstInViewport, lastInViewport } = getBoundaryViewportItems(fixture, scrollerDiv);

            expect(scroller.first).not.toBe(0);
            expect(firstInViewport.textContent.trim()).toBe(component.items.at(itemIdx));
            expect(lastInViewport).toBeTruthy();
        });

        it('should scrollToIndex of the last index with itemSize equals to 5', () => {
            component.itemSize = 5;
            fixture.detectChanges();
            scroller.scrollToIndex(scroller.items.length - 1);
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const { firstInViewport, lastInViewport } = getBoundaryViewportItems(fixture, scrollerDiv);

            expect(scroller.last).toBe(scroller.items.length);
            expect(firstInViewport).toBeTruthy();
            expect(lastInViewport.textContent.trim()).toBe(component.items.at(-1));
        });

        it('should scrollToIndex of the middle index with itemSize equals to 5', () => {
            component.itemSize = 5;
            fixture.detectChanges();
            const itemIdx = scroller.items.length / 2;
            scroller.scrollToIndex(itemIdx);
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const { firstInViewport, lastInViewport } = getBoundaryViewportItems(fixture, scrollerDiv);

            expect(scroller.first).not.toBe(0);
            expect(firstInViewport.textContent.trim()).toBe(component.items.at(itemIdx));
            expect(lastInViewport).toBeTruthy();
        });

        it('should scrollTo the bottom with itemSize equals to 50', () => {
            scroller.scrollTo({ top: scroller._poss.totalSize().main });
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const { firstInViewport, lastInViewport } = getBoundaryViewportItems(fixture, scrollerDiv);

            expect(scroller.last).toBe(scroller.items.length);
            expect(firstInViewport.textContent.trim()).toBe(component.items[995]);
            expect(lastInViewport).toBeTruthy();
        });

        it('should scrollTo the middle with itemSize equals to 50', () => {
            scroller.scrollTo({ top: scroller._poss.totalSize().main / 2 });
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const { firstInViewport, lastInViewport } = getBoundaryViewportItems(fixture, scrollerDiv);

            expect(scroller.first).not.toBe(0);
            expect(firstInViewport).toBeTruthy();
            expect(lastInViewport).toBeTruthy();
        });
    });

    @Component({
        template: `
            <p-virtualscroller [items]="items" [itemSize]="recreateItemSizeOnEachRender ? itemSize.bind(this) : itemSize" scrollHeight="200px" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                <ng-template #item let-item let-options="options">
                    <div
                        (click)="expandedItems.has(item) ? expandedItems.delete(item) : expandedItems.add(item)"
                        class="flex items-center p-2"
                        [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }"
                        style="height: {{ itemSize(item).mainAxis }}px; overflow: hidden;"
                    >
                        {{ item }}
                    </div>
                </ng-template>
            </p-virtualscroller>
        `,
        imports: [Scroller, CommonModule],
        providers: [provideAnimations()]
    })
    class FlexibleScrollerWrapper {
        items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
        expandedItems = new Set<string>();
        itemSize = (item: string) => ({ mainAxis: this.expandedItems.has(item) ? 100 : 30 });
        recreateItemSizeOnEachRender = false;
    }

    describe('Flexible Scroller', () => {
        let fixture: ComponentFixture<FlexibleScrollerWrapper>;
        let component: FlexibleScrollerWrapper;
        let scroller: Scroller;
        let scrollerDiv: HTMLDivElement;
        beforeEach(async () => {
            await TestBed.configureTestingModule({ imports: [FlexibleScrollerWrapper] }).compileComponents();
            fixture = TestBed.createComponent(FlexibleScrollerWrapper);
            component = fixture.componentInstance;
            fixture.autoDetectChanges();
            scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
            scrollerDiv = scroller.elementViewChild.nativeElement;
        });

        it('should scrollToIndex of the last item', () => {
            scroller.scrollToIndex(component.items.length - 1);
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const { firstInViewport, lastInViewport } = getBoundaryViewportItems(fixture, scrollerDiv);

            expect(firstInViewport).toBeTruthy();
            expect(lastInViewport.textContent.trim()).toBe(component.items.at(-1));
        });

        it('should scrollToIndex of the middle item', () => {
            const itemIdx = component.items.length / 2;
            scroller.scrollToIndex(itemIdx);
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const { firstInViewport, lastInViewport } = getBoundaryViewportItems(fixture, scrollerDiv);

            expect(firstInViewport.textContent.trim()).toBe(component.items.at(itemIdx));
            expect(lastInViewport).toBeTruthy();
        });

        it('should scrollTo the middle', () => {
            scroller.scrollTo({ top: scrollerDiv.scrollHeight / 2 });
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const { firstInViewport, lastInViewport } = getBoundaryViewportItems(fixture, scrollerDiv);

            expect(firstInViewport).toBeTruthy();
            expect(lastInViewport).toBeTruthy();
        });

        it('should scrollTo the bottom', () => {
            scroller.scrollTo({ top: scrollerDiv.scrollHeight });
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const { firstInViewport, lastInViewport } = getBoundaryViewportItems(fixture, scrollerDiv);

            expect(firstInViewport).toBeTruthy();
            expect(lastInViewport.textContent.trim()).toBe(component.items.at(-1));
        });

        it('should expand first item', () => {
            const { firstInViewport } = getBoundaryViewportItems(fixture, scrollerDiv);
            firstInViewport.click();

            expect(firstInViewport.offsetHeight).toBe(100);
        });

        it('should expand first 5 items and scrollTo the middle', () => {
            expandInViewport(5, fixture);
            scroller.scrollTo({ top: scrollerDiv.scrollHeight / 2 });
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const { firstInViewport, lastInViewport } = getBoundaryViewportItems(fixture, scrollerDiv);

            expect(firstInViewport).toBeTruthy();
            expect(lastInViewport).toBeTruthy();
        });

        it('should expand first 5 items and scrollTo the bottom', () => {
            expandInViewport(5, fixture);
            scroller.scrollTo({ top: scrollerDiv.scrollHeight });
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const { firstInViewport, lastInViewport } = getBoundaryViewportItems(fixture, scrollerDiv);

            expect(firstInViewport).toBeTruthy();
            expect(lastInViewport.textContent.trim()).toBe(component.items.at(-1));
        });

        it('should expand first 5 items and scrollToIndex of the middle item', () => {
            expandInViewport(5, fixture);
            const itemIdx = component.items.length / 2;
            scroller.scrollToIndex(itemIdx);
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const { firstInViewport, lastInViewport } = getBoundaryViewportItems(fixture, scrollerDiv);

            expect(firstInViewport.textContent.trim()).toBe(component.items.at(itemIdx));
            expect(lastInViewport).toBeTruthy();
        });

        it('should expand first 5 items and scrollToIndex of the last item', () => {
            expandInViewport(5, fixture);
            scroller.scrollToIndex(component.items.length - 1);
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const { firstInViewport, lastInViewport } = getBoundaryViewportItems(fixture, scrollerDiv);

            expect(firstInViewport).toBeTruthy();
            expect(lastInViewport.textContent.trim()).toBe(component.items.at(-1));
        });

        xit('should smoothly scrollToIndex of the middle item', async () => {
            const itemIdx = component.items.length / 2;
            scroller.scrollToIndex(itemIdx, 'smooth');
            const scroll$ = fromEvent(scrollerDiv, 'scroll').pipe(
                tap(() => scrollerDiv.dispatchEvent(new Event('scroll'))),
                debounceTime(100),
                first()
            );
            await lastValueFrom(scroll$);

            const { firstInViewport, lastInViewport } = getBoundaryViewportItems(fixture, scrollerDiv);

            expect(firstInViewport.textContent.trim()).toBe(component.items.at(itemIdx));
            expect(lastInViewport).toBeTruthy();
        });

        xit('should smoothly scrollTo the middle', async () => {
            const scrollTo = scrollerDiv.scrollHeight / 2;
            scroller.scrollTo({ top: scrollTo, behavior: 'smooth' });
            const scroll$ = fromEvent(scrollerDiv, 'scroll').pipe(
                tap(() => scrollerDiv.dispatchEvent(new Event('scroll'))),
                debounceTime(100),
                first()
            );
            await lastValueFrom(scroll$);
            const itemIdx = binarySearchFirst(scrollTo, scroller._poss.positions.mainAxis);

            const { firstInViewport, lastInViewport } = getBoundaryViewportItems(fixture, scrollerDiv);

            expect(firstInViewport.textContent.trim()).toBe(component.items.at(itemIdx));
            expect(lastInViewport).toBeTruthy();
        });

        it('should scrollTo the middle while recreating itemSize function on every render', async () => {
            component.recreateItemSizeOnEachRender = true;
            fixture.detectChanges();
            const scrollPos = scrollerDiv.scrollHeight / 2;
            scroller.scrollTo({ top: scrollPos });
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const { firstInViewport, lastInViewport } = getBoundaryViewportItems(fixture, scrollerDiv);

            expect(firstInViewport.textContent.trim()).toBe(component.items.at(502));
            expect(lastInViewport).toBeTruthy();
        });

        xit('should smoothly scrollTo the middle while recreating itemSize function on every render', async () => {
            component.recreateItemSizeOnEachRender = true;
            fixture.detectChanges();
            const scrollPos = scrollerDiv.scrollHeight / 2;
            scroller.scrollTo({ top: scrollPos, behavior: 'smooth' });
            const scroll$ = fromEvent(scrollerDiv, 'scroll').pipe(
                tap(() => scrollerDiv.dispatchEvent(new Event('scroll'))),
                debounceTime(100),
                first()
            );
            await lastValueFrom(scroll$);
            const itemIdx = binarySearchFirst(scrollPos, scroller._poss.positions.mainAxis);

            const { firstInViewport, lastInViewport } = getBoundaryViewportItems(fixture, scrollerDiv);

            expect(firstInViewport.textContent.trim()).toBe(component.items.at(itemIdx));
            expect(lastInViewport).toBeTruthy();
        });
    });

    describe('Grid Scroller', () => {
        const getItems = (lenMain = 5, lenCross = 5) => Array.from({ length: lenMain }, (_, idx) => Array.from({ length: lenCross }, (_, idxCross) => `Item #${idx}_${idxCross}`));
        @Component({
            template: `
                <p-virtualscroller [items]="items" orientation="both" [itemSize]="itemSize" scrollHeight="200px" [style]="{ width: '200px', height: '200px' }">
                    <ng-template #item let-item let-options="options">
                        <div style="display: flex; align-items: center">
                            <div *ngFor="let el of item" style="width: {{ itemSize[1] }}px; height: {{ itemSize[0] }}px">{{ el }}</div>
                        </div>
                    </ng-template>
                </p-virtualscroller>
            `,
            imports: [Scroller, CommonModule]
        })
        class GridScrollerWrapper {
            items = getItems(1000, 1000);
            itemSize = [50, 100];
        }

        let fixture: ComponentFixture<GridScrollerWrapper>;
        let component: GridScrollerWrapper;
        let scroller: Scroller;
        let scrollerDiv: HTMLDivElement;
        beforeEach(async () => {
            await TestBed.configureTestingModule({ imports: [GridScrollerWrapper] }).compileComponents();
            fixture = TestBed.createComponent(GridScrollerWrapper);
            component = fixture.componentInstance;
            fixture.autoDetectChanges();
            scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
            scrollerDiv = scroller.elementViewChild.nativeElement;
        });

        it('should scrollToIndex of the last index with itemSize equals to [50,100]', () => {
            const idx = { main: component.items.length - 1, cross: component.items.at(0).length - 1 };
            scroller.scrollToIndex([idx.main, idx.cross]);
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const { firstInViewport, lastInViewport } = getBoundaryViewportItemsGrid(fixture, scrollerDiv);

            expect(scroller.last).toEqual({ rows: idx.main + 1, cols: idx.cross + 1 });
            expect(firstInViewport).toBeTruthy();
            expect(lastInViewport.textContent.trim()).toBe(component.items.at(idx.main).at(idx.cross));
        });

        it('should scrollToIndex of the middle index with itemSize equals to [50,100]', () => {
            const itemIdx = { main: component.items.length / 2, cross: component.items.at(0).length / 2 };
            scroller.scrollToIndex([itemIdx.main, itemIdx.cross]);
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const { firstInViewport, lastInViewport } = getBoundaryViewportItemsGrid(fixture, scrollerDiv);

            expect(scroller.first).not.toBe(0);
            expect(firstInViewport.textContent.trim()).toBe(component.items.at(itemIdx.main).at(itemIdx.cross));
            expect(lastInViewport).toBeTruthy();
        });

        it('should scrollToIndex of the last index with itemSize equals to [5,10]', () => {
            component.itemSize = [5, 10];
            fixture.detectChanges();
            const itemIdx = { main: component.items.length - 1, cross: component.items.at(0).length - 1 };
            scroller.scrollToIndex([itemIdx.main, itemIdx.cross]);
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const { firstInViewport, lastInViewport } = getBoundaryViewportItemsGrid(fixture, scrollerDiv);

            expect(scroller.last).toEqual({ rows: component.items.length, cols: component.items.at(0).length });
            expect(firstInViewport).toBeTruthy();
            expect(lastInViewport.textContent.trim()).toBe(component.items.at(itemIdx.main).at(itemIdx.cross));
        });

        it('should scrollToIndex of the middle index with itemSize equals to [5,10]', () => {
            component.itemSize = [5, 10];
            fixture.detectChanges();
            const itemIdx = { main: component.items.length / 2, cross: component.items.at(0).length / 2 };
            scroller.scrollToIndex([itemIdx.main, itemIdx.cross]);
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const { firstInViewport, lastInViewport } = getBoundaryViewportItemsGrid(fixture, scrollerDiv);

            expect(scroller.first).not.toBe(0);
            expect(firstInViewport.textContent.trim()).toBe(component.items.at(itemIdx.main).at(itemIdx.cross));
            expect(lastInViewport).toBeTruthy();
        });

        it('should scrollTo the bottom with itemSize equals to [50,100]', () => {
            scroller.scrollTo({ top: scroller._poss.totalSize().main, left: scroller._poss.totalSize().cross });
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const { firstInViewport, lastInViewport } = getBoundaryViewportItemsGrid(fixture, scrollerDiv);

            expect(scroller.last).toEqual({ rows: component.items.length, cols: component.items.at(-1).length - 1 });
            expect(firstInViewport.textContent.trim()).toBe(component.items[995][995]);
            expect(lastInViewport).toBeTruthy();
        });

        it('should scrollTo the middle with itemSize equals to [50,100]', () => {
            scroller.scrollTo({ top: scroller._poss.totalSize().main / 2, left: scroller._poss.totalSize().cross / 2 });
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const { firstInViewport, lastInViewport } = getBoundaryViewportItemsGrid(fixture, scrollerDiv);

            expect(scroller.first).not.toEqual({ rows: 0, cols: 0 });
            expect(firstInViewport).toBeTruthy();
            expect(lastInViewport).toBeTruthy();
        });

        it('should calculate positions during user scrolling', () => {
            scrollerDiv.scrollTo({ top: 1000, left: 1000 });
            const itemIdx = {
                main: binarySearchFirst(1000, scroller._poss.positions.mainAxis),
                cross: binarySearchFirst(1000, scroller._poss.positions.crossAxis)
            };
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const { firstInViewport, lastInViewport } = getBoundaryViewportItemsGrid(fixture, scrollerDiv);

            expect(scroller.first).not.toEqual({ rows: 0, cols: 0 });
            expect(firstInViewport.textContent.trim()).toBe(component.items.at(itemIdx.main).at(itemIdx.cross));
            expect(lastInViewport).toBeTruthy();
        });

        it('should jump to bottom item from user scrolling', () => {
            const totalsize = scroller._poss.totalSize();
            scrollerDiv.scrollTo({ top: totalsize.main, left: totalsize.cross });
            const itemIdx = {
                main: binarySearchFirst(scrollerDiv.scrollTop, scroller._poss.positions.mainAxis),
                cross: binarySearchFirst(scrollerDiv.scrollLeft, scroller._poss.positions.crossAxis)
            };
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const { firstInViewport, lastInViewport } = getBoundaryViewportItemsGrid(fixture, scrollerDiv);

            expect(firstInViewport.textContent.trim()).toBe(component.items.at(itemIdx.main).at(itemIdx.cross));
            expect(lastInViewport).toBeTruthy();
        });

        it('should not flicker during smooth scrolling', () => {
            const totalsize = scroller._poss.totalSize();
            scrollerDiv.scrollTo({ top: totalsize.main / 2, left: totalsize.cross / 2 + 10 });
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const init = getBoundaryViewportItemsGrid(fixture, scrollerDiv);
            expect(init.firstInViewport.getBoundingClientRect().left).toBeLessThan(scrollerDiv.getBoundingClientRect().left);
            const diffCross = init.firstInViewport.getBoundingClientRect().left - scrollerDiv.getBoundingClientRect().left;
            const diffMain = init.firstInViewport.getBoundingClientRect().top - scrollerDiv.getBoundingClientRect().top;
            scrollerDiv.scrollTo({ top: scrollerDiv.scrollTop, left: scrollerDiv.scrollLeft - 200 });
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const after = getBoundaryViewportItemsGrid(fixture, scrollerDiv);
            expect(after.firstInViewport.textContent.trim()).toBe(component.items.at(499).at(495));
            const diffCrossAfter = after.firstInViewport.getBoundingClientRect().left - scrollerDiv.getBoundingClientRect().left;
            const diffMainAfter = after.firstInViewport.getBoundingClientRect().top - scrollerDiv.getBoundingClientRect().top;
            expect(diffCross).toBe(diffCrossAfter);
            expect(diffMain).toBe(diffMainAfter);
            expect(after.firstInViewport.getBoundingClientRect().left).toBeLessThan(scrollerDiv.getBoundingClientRect().left);
            expect(scroller.first['cols']).toBeLessThan(495);
        });

        it('should calculate items on scroll right', () => {
            const totalsize = scroller._poss.totalSize();
            scrollerDiv.scrollTo({ top: totalsize.main / 2, left: totalsize.cross / 2 + 10 });
            scrollerDiv.dispatchEvent(new Event('scroll'));

            scrollerDiv.scrollTo({ top: scrollerDiv.scrollTop, left: scrollerDiv.scrollLeft + 250 });
            scrollerDiv.dispatchEvent(new Event('scroll'));

            const { lastInViewport } = getBoundaryViewportItemsGrid(fixture, scrollerDiv);

            expect(lastInViewport.getBoundingClientRect().right).toBeGreaterThan(scrollerDiv.getBoundingClientRect().right);
        });
    });

    describe('initGridPositions', () => {
        const getItems = (lenMain = 5, lenCross = 5) => Array.from({ length: lenMain }, (_, idx) => Array.from({ length: lenCross }, (_, idxCross) => `Item #${idx}_${idxCross}`));
        it('should create positions', () => {
            const { positions } = initGridPositions({ items: getItems(), scrollPos: { main: 0, cross: 0 }, getItemSize: () => ({ main: 50, cross: 60 }), viewportSize: { main: 100, cross: 100 } });
            expect(positions).toEqual({
                mainAxis: [
                    { size: 50, pos: 0 },
                    { size: 50, pos: 50 },
                    { size: 50, pos: 100 },
                    { size: 50, pos: 150 },
                    { size: 40, pos: 200 }
                ],
                crossAxis: [
                    { size: 60, pos: 0 },
                    { size: 60, pos: 60 },
                    { size: 60, pos: 120 },
                    { size: 60, pos: 180 },
                    { size: 40, pos: 240 }
                ]
            });
        });

        it('should calculate a [1000,1000] positions', () => {
            const { positions, updateByIndex } = initGridPositions({ items: getItems(1000, 1000), scrollPos: { main: 0, cross: 0 }, getItemSize: () => ({ main: 50, cross: 100 }), viewportSize: { main: 200, cross: 200 } });
            updateByIndex(-1, -1);

            expect(positions.mainAxis.slice(0, 10)).toEqual([
                { size: 50, pos: 0 },
                { size: 50, pos: 50 },
                { size: 50, pos: 100 },
                { size: 50, pos: 150 },
                { size: 50, pos: 200 },
                { size: 50, pos: 250 },
                { size: 50, pos: 300 },
                { size: 50, pos: 350 },
                { size: 40, pos: 400 },
                { size: 40, pos: 440 }
            ]);
            expect(positions.mainAxis.slice(-10)).toEqual([
                { size: 40, pos: 39680 },
                { size: 40, pos: 39720 },
                { size: 50, pos: 39760 },
                { size: 50, pos: 39810 },
                { size: 50, pos: 39860 },
                { size: 50, pos: 39910 },
                { size: 50, pos: 39960 },
                { size: 50, pos: 40010 },
                { size: 50, pos: 40060 },
                { size: 50, pos: 40110 }
            ]);
            expect(positions.crossAxis.slice(0, 6)).toEqual([
                { size: 100, pos: 0 },
                { size: 100, pos: 100 },
                { size: 100, pos: 200 },
                { size: 100, pos: 300 },
                { size: 40, pos: 400 },
                { size: 40, pos: 440 }
            ]);
            expect(positions.crossAxis.slice(-6)).toEqual([
                { size: 40, pos: 40000 },
                { size: 40, pos: 40040 },
                { size: 100, pos: 40080 },
                { size: 100, pos: 40180 },
                { size: 100, pos: 40280 },
                { size: 100, pos: 40380 }
            ]);
        });

        it('should updateByIndex(499,499)', () => {
            const { positions, updateByIndex } = initGridPositions({
                items: getItems(1000, 1000),
                scrollPos: { main: 0, cross: 0 },
                getItemSize: () => ({ main: 50, cross: 100 }),
                viewportSize: { main: 200, cross: 200 }
            });
            updateByIndex(499, 499);

            expect(positions.mainAxis.slice(494, 509)).toEqual([
                { size: 40, pos: 19840 },
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
                { size: 40, pos: 20480 },
                { size: 40, pos: 20520 }
            ]);
            expect(positions.crossAxis.slice(496, 505)).toEqual([
                { size: 40, pos: 20080 },
                { size: 100, pos: 20120 },
                { size: 100, pos: 20220 },
                { size: 100, pos: 20320 },
                { size: 100, pos: 20420 },
                { size: 100, pos: 20520 },
                { size: 100, pos: 20620 },
                { size: 40, pos: 20720 },
                { size: 40, pos: 20760 }
            ]);
        });

        it('should calculate first', () => {
            const scrollPos = { main: 19960, cross: 19960 };
            const { getRange, positions } = initGridPositions({
                items: getItems(1000, 1000),
                scrollPos,
                getItemSize: () => ({ main: 50, cross: 100 }),
                scrollTo: (x) => {
                    scrollPos.main = x.main;
                    scrollPos.cross = x.cross;
                },
                viewportSize: { main: 200, cross: 200 }
            });

            const expectedFirst = { main: 495, cross: 497 };
            expect(getRange({ main: 0, cross: 0 }).first).toEqual(expectedFirst);
            expect(positions.mainAxis[expectedFirst.main].size).toBe(50);
            expect(positions.crossAxis[expectedFirst.cross].size).toBe(100);
        });

        it('should calculate last', () => {
            const scrollPos = { main: 19960, cross: 19960 };
            const { getRange, positions } = initGridPositions({
                items: getItems(1000, 1000),
                scrollPos,
                getItemSize: () => ({ main: 50, cross: 100 }),
                scrollTo: (x) => {
                    scrollPos.main = x.main;
                    scrollPos.cross = x.cross;
                },
                viewportSize: { main: 200, cross: 200 }
            });

            const first = { main: 495, cross: 497 };
            const expectedLast = { main: 506, cross: 502 };
            expect(getRange(first).last).toEqual(expectedLast);
            expect(positions.mainAxis[expectedLast.main].size).toBe(50);
            expect(positions.crossAxis[expectedLast.cross].size).toBe(100);
        });

        it('should calculate positions at the bottom', () => {
            const { positions, updateByIndex } = initGridPositions({
                items: getItems(6, 5),
                scrollPos: { main: 340, cross: 400 },
                getItemSize: (_, mainIdx, crossIdx) => ({ main: [20, 50, 100][mainIdx % 3], cross: [30, 60, 110][crossIdx % 3] }),
                viewportSize: { main: 100, cross: 100 }
            });
            updateByIndex(-1, -1);

            expect(positions).toEqual({
                mainAxis: [
                    { size: 40, pos: 0 },
                    { size: 40, pos: 40 },
                    { size: 100, pos: 80 },
                    { size: 20, pos: 180 },
                    { size: 50, pos: 200 },
                    { size: 100, pos: 250 }
                ],
                crossAxis: [
                    { size: 40, pos: 0 },
                    { size: 40, pos: 40 },
                    { size: 110, pos: 80 },
                    { size: 30, pos: 190 },
                    { size: 60, pos: 220 }
                ]
            });
        });

        it('should calculate positions at the middle', () => {
            const { positions, updateByIndex } = initGridPositions({
                items: getItems(10, 10),
                scrollPos: { main: 160, cross: 160 },
                getItemSize: (_, mainIdx, crossIdx) => ({ main: [20, 50, 100][mainIdx % 3], cross: [30, 60, 110][crossIdx % 3] }),
                viewportSize: { main: 100, cross: 100 }
            });
            updateByIndex(4, 4);

            expect(positions).toEqual({
                mainAxis: [
                    { size: 40, pos: 0 },
                    { size: 40, pos: 40 },
                    { size: 100, pos: 80 },
                    { size: 20, pos: 180 },
                    { size: 50, pos: 200 },
                    { size: 100, pos: 250 },
                    { size: 20, pos: 350 },
                    { size: 50, pos: 370 },
                    { size: 40, pos: 420 },
                    { size: 40, pos: 460 }
                ],
                crossAxis: [
                    { size: 40, pos: 0 },
                    { size: 40, pos: 40 },
                    { size: 110, pos: 80 },
                    { size: 30, pos: 190 },
                    { size: 60, pos: 220 },
                    { size: 110, pos: 280 },
                    { size: 30, pos: 390 },
                    { size: 40, pos: 420 },
                    { size: 40, pos: 460 },
                    { size: 40, pos: 500 }
                ]
            });
        });

        it('should calculate real positions and adjust leftover positions from top down', () => {
            const { positions, updateByIndex } = initGridPositions({ items: getItems(), scrollPos: { main: 0, cross: 0 }, getItemSize: () => ({ main: 200, cross: 200 }), viewportSize: { main: 200, cross: 200 } });
            updateByIndex(1, 1);

            expect(positions).toEqual({
                mainAxis: [
                    { size: 200, pos: 0 },
                    { size: 200, pos: 200 },
                    { size: 200, pos: 400 },
                    { size: 40, pos: 600 },
                    { size: 40, pos: 640 }
                ],
                crossAxis: [
                    { size: 200, pos: 0 },
                    { size: 200, pos: 200 },
                    { size: 200, pos: 400 },
                    { size: 40, pos: 600 },
                    { size: 40, pos: 640 }
                ]
            });
        });

        it('should calculate real positions and adjust leftover positions from bottom up', () => {
            const { positions, updateByIndex } = initGridPositions({ items: getItems(), scrollPos: { main: 0, cross: 0 }, getItemSize: () => ({ main: 200, cross: 200 }), viewportSize: { main: 200, cross: 200 } });
            updateByIndex(-1, -1);

            expect(positions).toEqual({
                mainAxis: [
                    { size: 200, pos: 0 },
                    { size: 200, pos: 200 },
                    { size: 40, pos: 400 },
                    { size: 200, pos: 440 },
                    { size: 200, pos: 640 }
                ],
                crossAxis: [
                    { size: 200, pos: 0 },
                    { size: 200, pos: 200 },
                    { size: 40, pos: 400 },
                    { size: 200, pos: 440 },
                    { size: 200, pos: 640 }
                ]
            });
        });

        it('should calculate correct jumps', () => {
            let actualJump: { main: number; cross: number };
            const scrollerEl = { main: 0, cross: 0 };
            const { positions, at } = initGridPositions({ items: getItems(100, 100), scrollPos: scrollerEl, getItemSize: () => ({ main: 200, cross: 200 }), viewportSize: { main: 200, cross: 200 }, onChange: ({ jump }) => (actualJump = jump) });
            const itemIdx = { main: 50, cross: 50 };
            const positionBefore = { main: positions.mainAxis.at(itemIdx.main).pos, cross: positions.crossAxis.at(itemIdx.cross).pos };
            scrollerEl.main = positionBefore.main;
            scrollerEl.cross = positionBefore.cross;
            at(25);
            const expectedJump = {
                main: positions.mainAxis.at(itemIdx.main).pos - positionBefore.main,
                cross: positions.crossAxis.at(itemIdx.cross).pos - positionBefore.cross
            };

            expect(actualJump).toEqual(expectedJump);
        });

        it('should be pure', () => {
            const positions = initGridPositions({ items: getItems(100), scrollPos: { main: 0, cross: 0 }, getItemSize: () => ({ main: 200, cross: 200 }), viewportSize: { main: 200, cross: 200 } });
            const positions2 = initGridPositions({ items: getItems(100), scrollPos: { main: 0, cross: 0 }, getItemSize: () => ({ main: 200, cross: 200 }), viewportSize: { main: 200, cross: 200 } });
            const idx = 25;
            positions.at(idx, idx);
            positions2.at(idx, idx);

            expect(positions.positions).toEqual(positions2.positions);
        });

        it('should restore same item in viewport', () => {
            const scrollPos = { main: 0, cross: 0 };
            const positions = initGridPositions({
                items: getItems(100),
                scrollPos,
                getItemSize: () => ({ main: 30, cross: 10 }),
                viewportSize: { main: 200, cross: 200 },
                scrollTo: ({ main, cross }) => {
                    scrollPos.main = main;
                    scrollPos.cross = cross;
                },
                onChange: ({ jump }) => {
                    scrollPos.main += jump.main;
                    scrollPos.cross += jump.cross;
                }
            });
            scrollPos.main = positions.totalSize().main / 2;
            scrollPos.cross = positions.totalSize().cross / 2;
            positions.getRange({ main: 0, cross: 0 });
            const firstInViewport = positions.numsInViewport().first;
            const scrollPos2 = {
                main: scrollPos.main + getShift({ scrollPos: scrollPos.main, prevItemPos: positions.positions.mainAxis[firstInViewport.main].pos, currItemPos: 40 * firstInViewport.main }),
                cross: scrollPos.cross + getShift({ scrollPos: scrollPos.cross, prevItemPos: positions.positions.crossAxis[firstInViewport.cross].pos, currItemPos: 40 * firstInViewport.cross })
            };
            const positions2 = initGridPositions({
                items: getItems(100),
                scrollPos: scrollPos2,
                getItemSize: () => ({ main: 30, cross: 10 }),
                viewportSize: { main: 200, cross: 200 },
                scrollTo: ({ main, cross }) => {
                    scrollPos2.main = main;
                    scrollPos2.cross = cross;
                },
                onChange: ({ jump }) => {
                    scrollPos2.main += jump.main;
                    scrollPos2.cross += jump.cross;
                }
            });
            const firstInViewport2 = positions2.numsInViewport().first;

            expect(firstInViewport).toEqual(firstInViewport2);
        });

        it('should get shift', () => {
            const scrollPos = 50;
            const shift = getShift({
                scrollPos,
                prevItemPos: 40,
                currItemPos: 180
            });
            expect(scrollPos + shift).toBe(190);
        });
        it('should get shift 2', () => {
            const scrollPos = 190;
            const shift = getShift({ scrollPos, prevItemPos: 180, currItemPos: 40 });
            expect(scrollPos + shift).toBe(50);
        });
        it('should get shift 3', () => {
            const shift = getShift({ scrollPos: 0, prevItemPos: 0, currItemPos: 0 });
            expect(shift).toBe(0);
        });
    });
});
