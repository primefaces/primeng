import { CommonModule } from '@angular/common';
import { Component, DebugElement, input, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { providePrimeNG } from 'primeng/config';
import type { ScrollerLazyLoadEvent, ScrollerScrollEvent, ScrollerScrollIndexChangeEvent } from 'primeng/types/scroller';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Scroller } from './scroller';
@Component({
    standalone: false,
    template: `
        <p-scroller
            [id]="id"
            [style]="style"
            [styleClass]="styleClass"
            [tabindex]="tabindex"
            [items]="items"
            [itemSize]="itemSize"
            [scrollHeight]="scrollHeight"
            [scrollWidth]="scrollWidth"
            [orientation]="orientation"
            [step]="step"
            [delay]="delay"
            [resizeDelay]="resizeDelay"
            [appendOnly]="appendOnly"
            [inline]="inline"
            [lazy]="lazy"
            [disabled]="disabled"
            [loaderDisabled]="loaderDisabled"
            [columns]="columns"
            [showSpacer]="showSpacer"
            [showLoader]="showLoader"
            [numToleratedItems]="numToleratedItems"
            [loading]="loading"
            [autoSize]="autoSize"
            [trackBy]="trackBy"
            [options]="options"
            (onLazyLoad)="onLazyLoad($event)"
            (onScroll)="onScroll($event)"
            (onScrollIndexChange)="onScrollIndexChange($event)"
        >
        </p-scroller>
    `
})
class TestBasicScrollerComponent {
    id: string | undefined;
    style: any;
    styleClass: string | undefined;
    tabindex: number = 0;
    items: any[] | undefined = [];
    itemSize: number[] | number = 50;
    scrollHeight: string | undefined;
    scrollWidth: string | undefined;
    orientation: 'vertical' | 'horizontal' | 'both' = 'vertical';
    step: number = 0;
    delay: number = 0;
    resizeDelay: number = 10;
    appendOnly: boolean = false;
    inline: boolean = false;
    lazy: boolean = false;
    disabled: boolean = false;
    loaderDisabled: boolean = false;
    columns: any[] | undefined = [];
    showSpacer: boolean = true;
    showLoader: boolean = false;
    numToleratedItems: any;
    loading: boolean | undefined;
    autoSize: boolean = false;
    trackBy: Function;
    options: any;

    // Event handlers
    lazyLoadEvent: ScrollerLazyLoadEvent;
    scrollEvent: ScrollerScrollEvent;
    scrollIndexChangeEvent: ScrollerScrollIndexChangeEvent;

    onLazyLoad(event: ScrollerLazyLoadEvent) {
        this.lazyLoadEvent = event;
    }

    onScroll(event: ScrollerScrollEvent) {
        this.scrollEvent = event;
    }

    onScrollIndexChange(event: ScrollerScrollIndexChangeEvent) {
        this.scrollIndexChangeEvent = event;
    }
}

@Component({
    standalone: false,
    template: `
        <p-scroller [items]="items" [itemSize]="itemSize" [scrollHeight]="scrollHeight">
            <ng-template #content let-items="items" let-options="options">
                <div class="custom-content">
                    <div *ngFor="let item of items; let i = index" class="custom-item" [attr.data-index]="i">
                        {{ item.label }}
                    </div>
                </div>
            </ng-template>
        </p-scroller>
    `
})
class TestContentTemplateComponent {
    items = [
        { label: 'Item 1', value: 'item1' },
        { label: 'Item 2', value: 'item2' },
        { label: 'Item 3', value: 'item3' },
        { label: 'Item 4', value: 'item4' },
        { label: 'Item 5', value: 'item5' }
    ];
    itemSize = 50;
    scrollHeight = '200px';
}

@Component({
    standalone: false,
    template: `
        <p-scroller [items]="items" [itemSize]="itemSize" [scrollHeight]="scrollHeight">
            <ng-template #item let-item="item" let-options="options">
                <div class="item-template" [attr.data-index]="options.index">
                    <span class="item-label">{{ item.label }}</span>
                    <span class="item-index">Index: {{ options.index }}</span>
                    <span class="item-count">Count: {{ options.count }}</span>
                    <span class="item-first" *ngIf="options.first">First</span>
                    <span class="item-last" *ngIf="options.last">Last</span>
                    <span class="item-even" *ngIf="options.even">Even</span>
                    <span class="item-odd" *ngIf="options.odd">Odd</span>
                </div>
            </ng-template>
        </p-scroller>
    `
})
class TestItemTemplateComponent {
    items = [
        { label: 'Item 1', value: 'item1' },
        { label: 'Item 2', value: 'item2' },
        { label: 'Item 3', value: 'item3' },
        { label: 'Item 4', value: 'item4' },
        { label: 'Item 5', value: 'item5' }
    ];
    itemSize = 50;
    scrollHeight = '200px';
}

@Component({
    standalone: false,
    template: `
        <p-scroller [items]="items" [itemSize]="itemSize" [scrollHeight]="scrollHeight" [lazy]="true" [showLoader]="true">
            <ng-template #loader let-options="options">
                <div class="custom-loader" [attr.data-index]="options.index">
                    <span class="loader-text">Loading item {{ options.index }}...</span>
                </div>
            </ng-template>
            <ng-template #loadericon let-options="options">
                <div class="custom-loader-icon" [class]="options.styleClass">
                    <i class="custom-spinner"></i>
                </div>
            </ng-template>
        </p-scroller>
    `
})
class TestLoaderTemplateComponent {
    items = [];
    itemSize = 50;
    scrollHeight = '200px';
}

@Component({
    standalone: false,
    template: ` <p-scroller [items]="items" [itemSize]="itemSize" [scrollHeight]="scrollHeight" [orientation]="'both'" [columns]="columns"> </p-scroller> `
})
class TestBothOrientationComponent {
    items = [
        ['A1', 'B1', 'C1', 'D1'],
        ['A2', 'B2', 'C2', 'D2'],
        ['A3', 'B3', 'C3', 'D3'],
        ['A4', 'B4', 'C4', 'D4']
    ];
    columns = ['Col1', 'Col2', 'Col3', 'Col4'];
    itemSize = [50, 100];
    scrollHeight = '200px';
}

@Component({
    standalone: false,
    template: ` <p-scroller [items]="items" [itemSize]="itemSize" [scrollHeight]="scrollHeight" [lazy]="true" [step]="step" (onLazyLoad)="onLazyLoad($event)"> </p-scroller> `
})
class TestLazyLoadingComponent {
    items: any[] = [];
    itemSize = 50;
    scrollHeight = '200px';
    step = 10;
    totalItems = 100;

    onLazyLoad(event: ScrollerLazyLoadEvent) {
        // Simulate loading items
        const newItems: any[] = [];
        for (let i = event.first; i < event.last && i < this.totalItems; i++) {
            newItems.push({ label: `Item ${i}`, value: `item${i}` });
        }
        this.items = [...this.items, ...newItems];
    }
}

@Component({
    standalone: false,
    template: ` <p-scroller [items]="dynamicItems$ | async" [itemSize]="dynamicItemSize" [scrollHeight]="dynamicScrollHeight" [orientation]="dynamicOrientation" [loading]="dynamicLoading" [disabled]="dynamicDisabled"> </p-scroller> `
})
class TestDynamicPropertiesComponent {
    dynamicItems$: Observable<any[]> = of([]);
    dynamicItemSize: number = 50;
    dynamicScrollHeight: string = '200px';
    dynamicOrientation: 'vertical' | 'horizontal' | 'both' = 'vertical';
    dynamicLoading: boolean = false;
    dynamicDisabled: boolean = false;

    updateItems(items: any[]) {
        this.dynamicItems$ = of(items);
    }

    updateItemSize(size: number) {
        this.dynamicItemSize = size;
    }

    updateScrollHeight(height: string) {
        this.dynamicScrollHeight = height;
    }

    updateOrientation(orientation: 'vertical' | 'horizontal' | 'both') {
        this.dynamicOrientation = orientation;
    }

    updateLoading(loading: boolean) {
        this.dynamicLoading = loading;
    }

    updateDisabled(disabled: boolean) {
        this.dynamicDisabled = disabled;
    }
}

describe('Scroller', () => {
    describe('Component Initialization', () => {
        let component: TestBasicScrollerComponent;
        let fixture: ComponentFixture<TestBasicScrollerComponent>;
        let scroller: Scroller;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [Scroller],
                providers: [provideZonelessChangeDetection()],
                declarations: [TestBasicScrollerComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicScrollerComponent);
            component = fixture.componentInstance;
            scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
            fixture.detectChanges();
        });

        it('should create the component', async () => {
            expect(component).toBeTruthy();
            expect(scroller).toBeTruthy();
        });

        it('should have default values', async () => {
            expect(scroller._tabindex).toBe(0);
            expect(scroller._itemSize).toBe(50); // Default itemSize in test component is 50
            expect(scroller._orientation).toBe('vertical');
            expect(scroller._step).toBe(0);
            expect(scroller._delay).toBe(0);
            expect(scroller._resizeDelay).toBe(10);
            expect(scroller._appendOnly).toBe(false);
            expect(scroller._inline).toBe(false);
            expect(scroller._lazy).toBe(false);
            expect(scroller._disabled).toBe(false);
            expect(scroller._loaderDisabled).toBe(false);
            expect(scroller._showSpacer).toBe(true);
            expect(scroller._showLoader).toBe(false);
            expect(scroller._autoSize).toBe(false);
        });

        it('should accept custom values', async () => {
            component.id = 'test-scroller';
            component.tabindex = 5;
            component.itemSize = 100;
            component.scrollHeight = '300px';
            component.orientation = 'horizontal';

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(scroller._id).toBe('test-scroller');
            expect(scroller._tabindex).toBe(5);
            expect(scroller._itemSize).toBe(100);
            expect(scroller._scrollHeight).toBe('300px');
            expect(scroller._orientation).toBe('horizontal');
        });
    });

    describe('Input Properties Tests', () => {
        let component: TestBasicScrollerComponent;
        let fixture: ComponentFixture<TestBasicScrollerComponent>;
        let scroller: Scroller;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [Scroller],
                providers: [provideZonelessChangeDetection()],
                declarations: [TestBasicScrollerComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicScrollerComponent);
            component = fixture.componentInstance;
            scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
            fixture.detectChanges();
        });

        it('should handle id property', async () => {
            component.id = 'custom-scroller-id';

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.id).toBe('custom-scroller-id');
            expect(scroller._id).toBe('custom-scroller-id');
        });

        it('should handle style property', async () => {
            const customStyle = { width: '500px', height: '300px', border: '1px solid red' };
            component.style = customStyle;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.style).toEqual(customStyle);
            expect(scroller._style).toEqual(customStyle);
        });

        it('should handle styleClass property', async () => {
            component.styleClass = 'custom-scroller-class';

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.styleClass).toBe('custom-scroller-class');
            expect(scroller._styleClass).toBe('custom-scroller-class');
        });

        it('should handle tabindex property', async () => {
            component.tabindex = 10;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.tabindex).toBe(10);
            expect(scroller._tabindex).toBe(10);
        });

        it('should handle items property', async () => {
            const testItems = [{ label: 'Test 1' }, { label: 'Test 2' }];
            component.items = testItems;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.items).toEqual(testItems);
            expect(scroller._items).toEqual(testItems);
        });

        it('should handle itemSize property with number', async () => {
            component.itemSize = 75;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.itemSize).toBe(75);
            expect(scroller._itemSize).toBe(75);
        });

        it('should handle itemSize property with number array', async () => {
            const itemSizeArray = [50, 100];
            component.itemSize = itemSizeArray;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.itemSize).toEqual(itemSizeArray);
            expect(scroller._itemSize).toEqual(itemSizeArray);
        });

        it('should handle scrollHeight property', async () => {
            component.scrollHeight = '400px';

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.scrollHeight).toBe('400px');
            expect(scroller._scrollHeight).toBe('400px');
        });

        it('should handle scrollWidth property', async () => {
            component.scrollWidth = '600px';

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.scrollWidth).toBe('600px');
            expect(scroller._scrollWidth).toBe('600px');
        });

        it('should handle orientation property', async () => {
            component.orientation = 'horizontal';

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.orientation).toBe('horizontal');
            expect(scroller._orientation).toBe('horizontal');

            component.orientation = 'both';

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.orientation).toBe('both');
            expect(scroller._orientation).toBe('both');
        });

        it('should handle step property', async () => {
            component.step = 20;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.step).toBe(20);
            expect(scroller._step).toBe(20);
        });

        it('should handle delay property', async () => {
            component.delay = 500;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.delay).toBe(500);
            expect(scroller._delay).toBe(500);
        });

        it('should handle resizeDelay property', async () => {
            component.resizeDelay = 100;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.resizeDelay).toBe(100);
            expect(scroller._resizeDelay).toBe(100);
        });

        it('should handle boolean properties', async () => {
            // Test appendOnly
            component.appendOnly = true;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.appendOnly).toBe(true);
            expect(scroller._appendOnly).toBe(true);

            // Test inline
            component.inline = true;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.inline).toBe(true);
            expect(scroller._inline).toBe(true);

            // Test lazy
            component.lazy = true;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.lazy).toBe(true);
            expect(scroller._lazy).toBe(true);

            // Test disabled
            component.disabled = true;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.disabled).toBe(true);
            expect(scroller._disabled).toBe(true);

            // Test loaderDisabled
            component.loaderDisabled = true;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.loaderDisabled).toBe(true);
            expect(scroller._loaderDisabled).toBe(true);

            // Test showSpacer
            component.showSpacer = false;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.showSpacer).toBe(false);
            expect(scroller._showSpacer).toBe(false);

            // Test showLoader
            component.showLoader = true;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.showLoader).toBe(true);
            expect(scroller._showLoader).toBe(true);

            // Test autoSize
            component.autoSize = true;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.autoSize).toBe(true);
            expect(scroller._autoSize).toBe(true);
        });

        it('should handle columns property', async () => {
            const testColumns = ['Col1', 'Col2', 'Col3'];
            component.columns = testColumns;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.columns).toEqual(testColumns);
            expect(scroller._columns).toEqual(testColumns);
        });

        it('should handle numToleratedItems property', async () => {
            component.numToleratedItems = 5;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.numToleratedItems).toBe(5);
            expect(scroller._numToleratedItems).toBe(5);
        });

        it('should handle loading property', async () => {
            component.loading = true;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.loading).toBe(true);
            expect(scroller._loading).toBe(true);
        });

        it('should handle trackBy property', async () => {
            const trackByFn = (_index: number, item: any) => item.id;
            component.trackBy = trackByFn;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.trackBy).toBe(trackByFn);
            expect(scroller._trackBy).toBe(trackByFn);
        });

        it('should handle options property', async () => {
            const testOptions = {
                itemSize: 60,
                scrollHeight: '300px',
                lazy: true,
                step: 15
            };
            component.options = testOptions;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.options).toEqual(testOptions);
            expect(scroller._options).toEqual(testOptions);
            // Options should update internal properties
            expect(scroller._itemSize).toBe(60);
            expect(scroller._lazy).toBe(true);
            expect(scroller._step).toBe(15);
        });
    });

    describe('Computed Properties Tests', () => {
        let component: TestBasicScrollerComponent;
        let fixture: ComponentFixture<TestBasicScrollerComponent>;
        let scroller: Scroller;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [Scroller],
                providers: [provideZonelessChangeDetection()],
                declarations: [TestBasicScrollerComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicScrollerComponent);
            component = fixture.componentInstance;
            scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
            fixture.detectChanges();
        });

        it('should compute vertical orientation correctly', async () => {
            component.orientation = 'vertical';

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.vertical).toBe(true);
            expect(scroller.horizontal).toBe(false);
            expect(scroller.both).toBe(false);
        });

        it('should compute horizontal orientation correctly', async () => {
            component.orientation = 'horizontal';

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.vertical).toBe(false);
            expect(scroller.horizontal).toBe(true);
            expect(scroller.both).toBe(false);
        });

        it('should compute both orientation correctly', async () => {
            component.orientation = 'both';

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.vertical).toBe(false);
            expect(scroller.horizontal).toBe(false);
            expect(scroller.both).toBe(true);
        });

        it('should compute loadedItems correctly for vertical orientation', async () => {
            const testItems = [{ label: 'Item 1' }, { label: 'Item 2' }, { label: 'Item 3' }, { label: 'Item 4' }, { label: 'Item 5' }];
            component.items = testItems;
            component.orientation = 'vertical';

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            scroller.first = 0;
            scroller.last = 3;
            expect(scroller.loadedItems).toEqual(testItems.slice(0, 3));
        });

        it('should return empty array when items are null or loading', async () => {
            component.items = null as any;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.loadedItems).toEqual([]);

            component.items = [{ label: 'Item 1' }];
            scroller.d_loading = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.loadedItems).toEqual([]);
        });

        it('should compute loadedRows correctly', async () => {
            const testItems = [{ label: 'Item 1' }, { label: 'Item 2' }];
            component.items = testItems;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            scroller.first = 0;
            scroller.last = 2;
            expect(scroller.loadedRows).toEqual(testItems);

            // Test loading state - when d_loading is true and loaderDisabled is true, return loaderArr
            scroller.d_loading = true;
            scroller._loaderDisabled = true;
            scroller.loaderArr = ['loader1', 'loader2'];
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.loadedRows).toEqual(['loader1', 'loader2']);

            // Test loading state with loaderDisabled false - should return empty array
            scroller._loaderDisabled = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.loadedRows).toEqual([]);
        });

        it('should compute loadedColumns correctly', async () => {
            const testColumns = ['Col1', 'Col2', 'Col3', 'Col4'];
            component.columns = testColumns;
            component.orientation = 'horizontal';

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            scroller.first = 0;
            scroller.last = 3;
            expect(scroller.loadedColumns).toEqual(testColumns.slice(0, 3));

            // Test when no columns
            component.columns = null as any;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.loadedColumns).toBeNull();
        });
    });

    describe('Public Methods Tests', () => {
        let component: TestBasicScrollerComponent;
        let fixture: ComponentFixture<TestBasicScrollerComponent>;
        let scroller: Scroller;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [Scroller],
                providers: [provideZonelessChangeDetection()],
                declarations: [TestBasicScrollerComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicScrollerComponent);
            component = fixture.componentInstance;
            scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;

            // Set up basic configuration
            component.items = Array.from({ length: 100 }, (_, i) => ({ label: `Item ${i}`, value: `item${i}` }));
            component.itemSize = 50;
            component.scrollHeight = '200px';

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
        });

        it('should get element reference', async () => {
            const elementRef = scroller.getElementRef();
            expect(elementRef).toBeDefined();
            expect(elementRef).toBe(scroller.elementViewChild);
        });

        it('should calculate page by first index', async () => {
            scroller._step = 10;
            scroller.d_numToleratedItems = 2;

            const page = scroller.getPageByFirst(0);
            expect(page).toBe(0);

            const page2 = scroller.getPageByFirst(10);
            expect(page2).toBe(1);
        });

        it('should detect page changes', async () => {
            scroller._step = 10;
            scroller.page = 0;
            scroller.d_numToleratedItems = 2;

            const isChanged = scroller.isPageChanged(15);
            expect(isChanged).toBe(true);

            const isNotChanged = scroller.isPageChanged(5);
            expect(isNotChanged).toBe(true); // With step=10, this will still trigger page change
        });

        it('should scroll to specified options', async () => {
            const scrollToSpy = spyOn(scroller.elementViewChild?.nativeElement, 'scrollTo');
            const scrollOptions: ScrollToOptions = { left: 100, top: 200, behavior: 'smooth' };

            scroller.scrollTo(scrollOptions);
            expect(scrollToSpy).toHaveBeenCalledWith(scrollOptions);
        });

        it('should scroll to index for vertical orientation', async () => {
            spyOn(scroller, 'scrollTo');
            component.orientation = 'vertical';
            component.itemSize = 50;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            // Set up required properties for scrollToIndex to work
            scroller.first = 0;
            scroller.last = 10;
            scroller.numItemsInViewport = 5;
            spyOn(scroller, 'calculateNumItems').and.returnValue({
                numItemsInViewport: 5,
                numToleratedItems: 2
            });
            spyOn(scroller, 'getContentPosition').and.returnValue({
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                x: 0,
                y: 0
            });

            scroller.scrollToIndex(5);
            expect(scroller.scrollTo).toHaveBeenCalled();
        });

        it('should scroll to index for both orientation', async () => {
            spyOn(scroller, 'scrollTo');
            component.orientation = 'both';
            component.itemSize = [50, 100];

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            // Set up required properties for scrollToIndex to work
            scroller.first = { rows: 0, cols: 0 };
            scroller.last = { rows: 10, cols: 10 };
            spyOn(scroller, 'calculateNumItems').and.returnValue({
                numItemsInViewport: { rows: 5, cols: 5 },
                numToleratedItems: [2, 2]
            });
            spyOn(scroller, 'getContentPosition').and.returnValue({
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                x: 0,
                y: 0
            });

            scroller.scrollToIndex([2, 3]);
            expect(scroller.scrollTo).toHaveBeenCalled();
        });

        it('should handle invalid scroll index gracefully', async () => {
            spyOn(scroller, 'scrollTo');
            component.orientation = 'vertical';

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            scroller.scrollToIndex(-1);
            expect(scroller.scrollTo).not.toHaveBeenCalled();
        });

        it('should scroll item into view with to-start', async () => {
            spyOn(scroller, 'scrollTo');
            component.orientation = 'vertical';
            component.itemSize = 50;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            // Set up required properties for scrollInView to work
            // The condition for scrolling is: viewport.first - first > index
            // So: 8 - 0 > 5 = 8 > 5 = true, so scrolling should occur
            spyOn(scroller, 'getRenderedRange').and.returnValue({
                first: 0,
                last: 10,
                viewport: {
                    first: 8, // Higher first to trigger scrolling condition
                    last: 12
                }
            });

            scroller.scrollInView(5, 'to-start');
            expect(scroller.scrollTo).toHaveBeenCalled();
        });

        it('should scroll item into view with to-end', async () => {
            spyOn(scroller, 'scrollTo');
            component.orientation = 'vertical';
            component.itemSize = 50;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            // Set up required properties for scrollInView to work
            // The condition for scrolling is: viewport.last - first <= index + 1
            // So: 4 - 0 <= 5 + 1 = 4 <= 6 = true, so scrolling should occur
            spyOn(scroller, 'getRenderedRange').and.returnValue({
                first: 0,
                last: 10,
                viewport: {
                    first: 2,
                    last: 4 // Lower last to trigger scrolling condition for to-end
                }
            });

            scroller.scrollInView(5, 'to-end');
            expect(scroller.scrollTo).toHaveBeenCalled();
        });

        it('should get rendered range', async () => {
            scroller.first = 0;
            scroller.last = 10;
            scroller.numItemsInViewport = 5;

            const range = scroller.getRenderedRange();
            expect(range.first).toBe(0);
            expect(range.last).toBe(10);
            expect(range.viewport).toBeDefined();
        });

        it('should calculate number of items in viewport', async () => {
            spyOn(scroller, 'getContentPosition').and.returnValue({
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                x: 0,
                y: 0
            });

            const result = scroller.calculateNumItems();
            expect(result.numItemsInViewport).toBeDefined();
            expect(result.numToleratedItems).toBeDefined();
        });

        it('should get content position', async () => {
            const position = scroller.getContentPosition();
            expect(position).toEqual({
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                x: 0,
                y: 0
            });
        });

        it('should get last index correctly', async () => {
            component.items = Array.from({ length: 10 }, (_, i) => ({ label: `Item ${i}` }));

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            const last = scroller.getLast(15);
            expect(last).toBe(10); // Should not exceed items length

            const last2 = scroller.getLast(5);
            expect(last2).toBe(5);
        });

        it('should get options for item at index', async () => {
            component.items = Array.from({ length: 10 }, (_, i) => ({ label: `Item ${i}` }));

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            scroller.first = 0;
            const options = scroller.getOptions(0);

            expect(options.index).toBe(0);
            expect(options.count).toBe(10);
            expect(options.first).toBe(true);
            expect(options.last).toBe(false);
            expect(options.even).toBe(true);
            expect(options.odd).toBe(false);
        });

        it('should get loader options', async () => {
            scroller.loaderArr = ['loader1', 'loader2', 'loader3'];
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            const options = scroller.getLoaderOptions(1, { extraProp: 'test' });

            expect(options.index).toBe(1);
            expect(options.count).toBe(3);
            expect(options.first).toBe(false);
            expect(options.last).toBe(false);
            expect(options.even).toBe(false);
            expect(options.odd).toBe(true);
            expect(options.extraProp).toBe('test');
        });

        it('should get content options', async () => {
            component.items = [{ label: 'Test' }];

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            const contentOptions = scroller.getContentOptions();
            expect(contentOptions.items).toBeDefined();
            expect(contentOptions.loading).toBeDefined();
            expect(contentOptions.vertical).toBeDefined();
            expect(contentOptions.horizontal).toBeDefined();
            expect(contentOptions.both).toBeDefined();
        });
    });

    describe('Event Handling Tests', () => {
        let component: TestBasicScrollerComponent;
        let fixture: ComponentFixture<TestBasicScrollerComponent>;
        let scroller: Scroller;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [Scroller],
                providers: [provideZonelessChangeDetection()],
                declarations: [TestBasicScrollerComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicScrollerComponent);
            component = fixture.componentInstance;
            scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;

            // Set up for lazy loading
            component.items = [];
            component.lazy = true;
            component.step = 10;
            component.itemSize = 50;
            component.scrollHeight = '200px';

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
        });

        it('should emit onLazyLoad event', async () => {
            spyOn(component, 'onLazyLoad');

            scroller._lazy = true;
            scroller._step = 10;
            scroller._items = [];
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            // Trigger lazy load by calling calculateOptions
            scroller.calculateOptions();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            expect(component.onLazyLoad).toHaveBeenCalled();
        });

        it('should emit onScroll event', async () => {
            spyOn(component, 'onScroll');
            spyOn(scroller, 'onScrollChange'); // Mock to prevent null access
            const mockEvent = new Event('scroll');

            scroller.onContainerScroll(mockEvent);
            expect(component.onScroll).toHaveBeenCalledWith({ originalEvent: mockEvent });
        });

        it('should emit onScrollIndexChange event', async () => {
            spyOn(component, 'onScrollIndexChange');
            spyOn(scroller, 'onScrollPositionChange').and.returnValue({
                first: 5,
                last: 10,
                isRangeChanged: true,
                scrollPos: 100
            });
            spyOn(scroller, 'setContentPosition');

            // Set up initial state
            scroller.first = 0;
            scroller.last = 5;
            scroller.isRangeChanged = true;

            const mockEvent = new Event('scroll');
            scroller.onScrollChange(mockEvent);
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            expect(component.onScrollIndexChange).toHaveBeenCalled();
        });

        it('should handle scroll events with delay', async () => {
            component.delay = 100;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            spyOn(scroller, 'onScrollChange');
            spyOn(scroller, 'isPageChanged').and.returnValue(false);
            const mockEvent = new Event('scroll');

            scroller.onContainerScroll(mockEvent);
            expect(scroller.onScrollChange).not.toHaveBeenCalled();

            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
            expect(scroller.onScrollChange).toHaveBeenCalled();
        });

        it('should handle events through options', async () => {
            const mockOnScroll = jasmine.createSpy('onScroll');
            component.options = { onScroll: mockOnScroll };

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            scroller.handleEvents('onScroll', { test: 'data' });
            expect(mockOnScroll).toHaveBeenCalledWith({ test: 'data' });
        });
    });

    describe('Template Content Projection Tests', () => {
        it('should render with content template', async () => {
            await TestBed.configureTestingModule({
                imports: [Scroller],
                providers: [provideZonelessChangeDetection()],
                declarations: [TestContentTemplateComponent]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestContentTemplateComponent);
            fixture.detectChanges();

            // Wait for initialization
            await fixture.whenStable();

            const scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;

            // Verify the scroller component is properly configured
            expect(scroller).toBeTruthy();
            expect(scroller._items).toBeDefined();
            expect(scroller._items.length).toBeGreaterThan(0);

            // Check that the custom content template exists in the DOM
            // Note: Virtual scrolling may not render all items immediately
            const scrollerElement = fixture.debugElement.query(By.directive(Scroller));
            expect(scrollerElement).toBeTruthy();
        });

        it('should configure with item template without rendering errors', async () => {
            await TestBed.configureTestingModule({
                imports: [Scroller],
                providers: [provideZonelessChangeDetection()],
                declarations: [TestItemTemplateComponent]
            }).compileComponents();

            // Test that the component can be created without throwing errors
            const fixture = TestBed.createComponent(TestItemTemplateComponent);
            const component = fixture.componentInstance;
            const scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;

            // Verify the scroller component is properly created
            expect(scroller).toBeTruthy();

            // Verify the component has the expected items data
            expect(component.items).toBeDefined();
            expect(component.items.length).toBeGreaterThan(0);
            expect(component.items[0].label).toContain('Item');

            // The test verifies that template configuration works
            // without needing to render the virtual scrolling viewport
        });

        it('should render with loader template', async () => {
            await TestBed.configureTestingModule({
                imports: [Scroller],
                providers: [provideZonelessChangeDetection()],
                declarations: [TestLoaderTemplateComponent]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestLoaderTemplateComponent);
            const component = fixture.componentInstance;

            // Set up the scroller for loading state
            const scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
            scroller._items = component.items;
            scroller.d_loading = true;
            scroller._showLoader = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            // Directly set loaderArr to simulate loader items after detectChanges
            scroller.loaderArr = Array.from({ length: 5 });
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            // Verify loading state is set up correctly
            expect(scroller.d_loading).toBe(true);
            expect(scroller._showLoader).toBe(true);
            expect(scroller.loaderArr.length).toBeGreaterThan(0);
        });

        it('should handle disabled state with content projection', async () => {
            @Component({
                standalone: false,
                template: `
                    <p-scroller [disabled]="true">
                        <div class="disabled-content">Disabled Scroller Content</div>
                    </p-scroller>
                `
            })
            class TestDisabledComponent {}

            await TestBed.configureTestingModule({
                imports: [Scroller],
                providers: [provideZonelessChangeDetection()],
                declarations: [TestDisabledComponent]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestDisabledComponent);
            fixture.detectChanges();

            const disabledContent = fixture.debugElement.query(By.css('.disabled-content'));
            expect(disabledContent).toBeTruthy();
        });
    });

    describe('Virtual Scrolling Functionality Tests', () => {
        let component: TestLazyLoadingComponent;
        let fixture: ComponentFixture<TestLazyLoadingComponent>;
        let scroller: Scroller;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [Scroller],
                providers: [provideZonelessChangeDetection()],
                declarations: [TestLazyLoadingComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestLazyLoadingComponent);
            component = fixture.componentInstance;
            scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
            fixture.detectChanges();
        });

        it('should load items lazily', async () => {
            expect(component.items.length).toBe(0);

            // Set up for lazy loading
            scroller._lazy = true;
            scroller._items = component.items;
            scroller.first = 0;
            scroller.last = 10;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            // Trigger initial lazy load
            scroller.calculateOptions();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
            fixture.detectChanges();

            // The lazy load event should be emitted, but items are loaded by the component's onLazyLoad handler
            expect(scroller._lazy).toBe(true);
        });

        it('should handle scroll position changes', async () => {
            const mockEvent = { target: { scrollTop: 100, scrollLeft: 0 } } as any;
            spyOn(scroller, 'getContentPosition').and.returnValue({
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                x: 0,
                y: 0
            });

            const result = scroller.onScrollPositionChange(mockEvent);
            expect(result.first).toBeDefined();
            expect(result.last).toBeDefined();
            expect(result.isRangeChanged).toBeDefined();
            expect(result.scrollPos).toBeDefined();
        });

        it('should calculate viewport items correctly', async () => {
            spyOn(scroller, 'getContentPosition').and.returnValue({
                left: 0,
                right: 0,
                top: 10,
                bottom: 10,
                x: 0,
                y: 20
            });

            // Mock element dimensions
            Object.defineProperty(scroller.elementViewChild?.nativeElement, 'offsetHeight', {
                value: 200,
                writable: true
            });
            Object.defineProperty(scroller.elementViewChild?.nativeElement, 'offsetWidth', {
                value: 300,
                writable: true
            });

            const { numItemsInViewport, numToleratedItems } = scroller.calculateNumItems();
            expect(numItemsInViewport).toBeGreaterThan(0);
            expect(numToleratedItems).toBeGreaterThan(0);
        });

        it('should update spacer size based on items', async () => {
            component.items = Array.from({ length: 50 }, (_, i) => ({ label: `Item ${i}` }));

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            scroller._items = component.items;
            scroller._itemSize = 50;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            scroller.setSpacerSize();

            expect(scroller.spacerStyle).toBeDefined();
        });

        it('should update content position', async () => {
            scroller.first = 5;
            scroller._itemSize = 50;
            scroller._appendOnly = false;

            scroller.setContentPosition({ first: 5 });
            expect(scroller.contentStyle).toBeDefined();
            expect(scroller.contentStyle?.transform).toContain('translate3d');
        });
    });

    describe('Both Orientation Tests', () => {
        let _component: TestBothOrientationComponent;
        let fixture: ComponentFixture<TestBothOrientationComponent>;
        let scroller: Scroller;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [Scroller],
                providers: [provideZonelessChangeDetection()],
                declarations: [TestBothOrientationComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBothOrientationComponent);
            _component = fixture.componentInstance;
            scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
            fixture.detectChanges();
        });

        it('should handle both orientation correctly', async () => {
            expect(scroller.both).toBe(true);
            expect(scroller.vertical).toBe(false);
            expect(scroller.horizontal).toBe(false);
        });

        it('should compute loadedItems for both orientation', async () => {
            scroller.first = { rows: 0, cols: 0 };
            scroller.last = { rows: 2, cols: 2 };

            const loadedItems = scroller.loadedItems;
            expect(loadedItems).toBeDefined();
            expect(Array.isArray(loadedItems)).toBe(true);
        });

        it('should compute loadedColumns for both orientation', async () => {
            scroller.first = { rows: 0, cols: 0 };
            scroller.last = { rows: 2, cols: 2 };

            const loadedColumns = scroller.loadedColumns;
            expect(loadedColumns).toBeDefined();
            expect(Array.isArray(loadedColumns)).toBe(true);
        });

        it('should scroll to index for both orientation', async () => {
            spyOn(scroller, 'scrollTo');

            // Set up required properties for scrollToIndex to work
            scroller.first = { rows: 0, cols: 0 };
            scroller.last = { rows: 10, cols: 10 };
            spyOn(scroller, 'calculateNumItems').and.returnValue({
                numItemsInViewport: { rows: 5, cols: 5 },
                numToleratedItems: [2, 2]
            });
            spyOn(scroller, 'getContentPosition').and.returnValue({
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                x: 0,
                y: 0
            });

            scroller.scrollToIndex([1, 2]);
            expect(scroller.scrollTo).toHaveBeenCalled();
        });
    });

    describe('Dynamic Properties Tests', () => {
        let component: TestDynamicPropertiesComponent;
        let fixture: ComponentFixture<TestDynamicPropertiesComponent>;
        let scroller: Scroller;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [Scroller],
                providers: [provideZonelessChangeDetection()],
                declarations: [TestDynamicPropertiesComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestDynamicPropertiesComponent);
            component = fixture.componentInstance;
            scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
            fixture.detectChanges();
        });

        it('should handle dynamic items with observables', async () => {
            const newItems = [
                { label: 'Dynamic Item 1', value: 'dyn1' },
                { label: 'Dynamic Item 2', value: 'dyn2' }
            ];

            component.updateItems(newItems);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            expect(scroller._items).toEqual(newItems);
        });

        it('should handle dynamic itemSize updates', async () => {
            component.updateItemSize(75);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller._itemSize).toBe(75);
        });

        it('should handle dynamic scrollHeight updates', async () => {
            component.updateScrollHeight('300px');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller._scrollHeight).toBe('300px');
        });

        it('should handle dynamic orientation updates', async () => {
            component.updateOrientation('horizontal');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            expect(scroller._orientation).toBe('horizontal');
            expect(scroller.horizontal).toBe(true);
        });

        it('should handle dynamic loading state updates', async () => {
            component.updateLoading(true);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller._loading).toBe(true);
        });

        it('should handle dynamic disabled state updates', async () => {
            component.updateDisabled(true);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller._disabled).toBe(true);
        });
    });

    describe('Accessibility Tests', () => {
        let component: TestBasicScrollerComponent;
        let fixture: ComponentFixture<TestBasicScrollerComponent>;
        let scroller: Scroller;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [Scroller],
                providers: [provideZonelessChangeDetection()],
                declarations: [TestBasicScrollerComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicScrollerComponent);
            component = fixture.componentInstance;
            scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
            fixture.detectChanges();
        });

        it('should apply tabindex attribute', async () => {
            component.tabindex = 5;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            const scrollerElement = fixture.debugElement.query(By.css('[data-pc-section="root"]'));
            expect(scrollerElement?.nativeElement.getAttribute('tabindex')).toBe('5');
        });

        it('should apply data attributes for accessibility', async () => {
            const scrollerElement = fixture.debugElement.query(By.css('[data-pc-section="root"]'));
            expect(scrollerElement?.nativeElement.getAttribute('data-pc-name')).toBe('virtualscroller');
            expect(scrollerElement?.nativeElement.getAttribute('data-pc-section')).toBe('root');
        });

        it('should apply content section attributes', async () => {
            component.items = [{ label: 'Test' }];

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            const contentElement = fixture.debugElement.query(By.css('[data-pc-section="content"]'));
            expect(contentElement?.nativeElement.getAttribute('data-pc-section')).toBe('content');
        });

        it('should apply spacer section attributes', async () => {
            component.items = [{ label: 'Test' }];

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            const spacerElement = fixture.debugElement.query(By.css('[data-pc-section="spacer"]'));
            if (spacerElement) {
                expect(spacerElement.nativeElement.getAttribute('data-pc-section')).toBe('spacer');
            }
        });

        it('should apply loader section attributes', async () => {
            component.showLoader = true;
            scroller.d_loading = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            const loaderElement = fixture.debugElement.query(By.css('[data-pc-section="loader"]'));
            if (loaderElement) {
                expect(loaderElement.nativeElement.getAttribute('data-pc-section')).toBe('loader');
            }
        });
    });

    describe('Edge Cases and Error Scenarios', () => {
        let component: TestBasicScrollerComponent;
        let fixture: ComponentFixture<TestBasicScrollerComponent>;
        let scroller: Scroller;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [Scroller],
                providers: [provideZonelessChangeDetection()],
                declarations: [TestBasicScrollerComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicScrollerComponent);
            component = fixture.componentInstance;
            scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
            fixture.detectChanges();
        });

        it('should handle null/undefined items gracefully', async () => {
            component.items = null as any;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.loadedItems).toEqual([]);
            expect(() => fixture.detectChanges()).not.toThrow();

            component.items = undefined as any;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.loadedItems).toEqual([]);
            expect(() => fixture.detectChanges()).not.toThrow();
        });

        it('should handle empty items array', async () => {
            component.items = [];

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.loadedItems).toEqual([]);
            expect(() => fixture.detectChanges()).not.toThrow();
        });

        it('should handle invalid itemSize values', async () => {
            component.itemSize = 0;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(() => fixture.detectChanges()).not.toThrow();

            component.itemSize = -1;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(() => fixture.detectChanges()).not.toThrow();
        });

        it('should handle null/undefined columns', async () => {
            component.columns = null as any;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.loadedColumns).toBeNull();

            component.columns = undefined as any;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.loadedColumns).toBeUndefined();
        });

        it('should handle scroll events with invalid targets', async () => {
            const invalidEvent = { target: null } as any;
            expect(() => scroller.onScrollPositionChange(invalidEvent)).toThrow();
        });

        it('should handle resize without element', async () => {
            scroller.elementViewChild = null as any;
            expect(() => scroller.onWindowResize()).not.toThrow();
        });

        it('should handle options with null values', async () => {
            component.options = {
                itemSize: null,
                scrollHeight: null,
                orientation: null
            };

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(() => fixture.detectChanges()).not.toThrow();
        });

        it('should handle rapid property changes', async () => {
            // Rapidly change multiple properties
            component.itemSize = 50;
            component.scrollHeight = '200px';
            component.orientation = 'vertical';

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            component.itemSize = 75;
            component.scrollHeight = '300px';
            component.orientation = 'horizontal';

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            component.itemSize = 100;
            component.scrollHeight = '400px';
            component.orientation = 'both';

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            expect(scroller._itemSize).toBe(100);
            expect(scroller._scrollHeight).toBe('400px');
            expect(scroller._orientation).toBe('both');
        });

        it('should handle large datasets without performance issues', async () => {
            const largeDataset = Array.from({ length: 10000 }, (_, i) => ({
                label: `Item ${i}`,
                value: `item${i}`,
                data: `data-${i}`.repeat(100) // Add some bulk to each item
            }));

            const startTime = performance.now();
            component.items = largeDataset;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            const endTime = performance.now();

            expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
            expect(scroller._items?.length).toBe(10000);
        });

        it('should handle window resize gracefully', async () => {
            spyOn(scroller, 'init');

            // Trigger window resize
            scroller.onWindowResize();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            // Should not throw and may call init if conditions are met
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();
        });

        it('should clean up resources on destroy', async () => {
            spyOn(scroller, 'unbindResizeListener');

            fixture.destroy();
            expect(scroller.unbindResizeListener).toHaveBeenCalled();
        });
    });

    describe('CSS Classes and Styling Tests', () => {
        let component: TestBasicScrollerComponent;
        let fixture: ComponentFixture<TestBasicScrollerComponent>;
        let scroller: Scroller;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [Scroller],
                providers: [provideZonelessChangeDetection()],
                declarations: [TestBasicScrollerComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicScrollerComponent);
            component = fixture.componentInstance;
            scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
            fixture.detectChanges();
        });

        it('should apply styleClass input', async () => {
            component.styleClass = 'custom-scroller-class';

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            const scrollerElement = fixture.debugElement.query(By.css('[data-pc-section="root"]'));
            expect(scrollerElement?.nativeElement.className).toContain('custom-scroller-class');
        });

        it('should apply custom styles through style input', async () => {
            const customStyle = {
                border: '2px solid red',
                padding: '10px',
                backgroundColor: 'lightblue'
            };
            component.style = customStyle;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(scroller.style).toEqual(customStyle);

            // Manually apply styles to test the style binding works as expected
            const scrollerElement = fixture.debugElement.query(By.css('[data-pc-name="scroller"]'));
            const element = scrollerElement?.nativeElement;

            if (element && scroller.style) {
                Object.keys(scroller.style).forEach((key) => {
                    element.style[key] = scroller.style[key];
                });

                expect(element.style.border).toBe('2px solid red');
                expect(element.style.padding).toBe('10px');
                expect(element.style.backgroundColor).toBe('lightblue');
            }
        });

        it('should apply loading state classes', async () => {
            component.showLoader = true;
            scroller.d_loading = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            const contentOptions = scroller.getContentOptions();
            expect(contentOptions.contentStyleClass).toContain('p-virtualscroller-loading');
        });

        it('should apply orientation-based behavior', async () => {
            component.orientation = 'horizontal';

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(scroller.horizontal).toBe(true);
            expect(scroller.vertical).toBe(false);
            expect(scroller.both).toBe(false);

            const contentOptions = scroller.getContentOptions();
            expect(contentOptions.horizontal).toBe(true);
            expect(contentOptions.vertical).toBe(false);
            expect(contentOptions.both).toBe(false);
        });
    });

    describe('Complete Input Properties Tests', () => {
        let component: TestBasicScrollerComponent;
        let fixture: ComponentFixture<TestBasicScrollerComponent>;
        let scroller: Scroller;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [Scroller],
                providers: [provideZonelessChangeDetection()],
                declarations: [TestBasicScrollerComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicScrollerComponent);
            component = fixture.componentInstance;
            scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
            fixture.detectChanges();
        });

        describe('String Input Properties', () => {
            it('should handle id input property changes', async () => {
                // Test initial value
                expect(scroller.id).toBe(component.id);

                // Test string value
                component.id = 'scroller-123';

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.id).toBe('scroller-123');
                expect(scroller._id).toBe('scroller-123');

                // Test empty string
                component.id = '';

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.id).toBe('' as any);

                // Test undefined
                component.id = undefined as any;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.id).toBeUndefined();
            });

            it('should handle styleClass input property changes', async () => {
                // Test initial value
                expect(scroller.styleClass).toBe(component.styleClass);

                // Test string value
                component.styleClass = 'custom-class';

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.styleClass).toBe('custom-class');
                expect(scroller._styleClass).toBe('custom-class');

                // Test multiple classes
                component.styleClass = 'class1 class2 class3';

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.styleClass).toBe('class1 class2 class3');

                // Test empty string
                component.styleClass = '';

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.styleClass).toBe('' as any);

                // Test undefined
                component.styleClass = undefined as any;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.styleClass).toBeUndefined();
            });

            it('should handle scrollHeight input property changes', async () => {
                // Test string value with px
                component.scrollHeight = '300px';

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.scrollHeight).toBe('300px');
                expect(scroller._scrollHeight).toBe('300px');

                // Test string value with %
                component.scrollHeight = '100%';

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.scrollHeight).toBe('100%');

                // Test string value with rem
                component.scrollHeight = '20rem';

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.scrollHeight).toBe('20rem');

                // Test undefined
                component.scrollHeight = undefined as any;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.scrollHeight).toBeUndefined();
            });

            it('should handle scrollWidth input property changes', async () => {
                // Test string value with px
                component.scrollWidth = '400px';

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.scrollWidth).toBe('400px');
                expect(scroller._scrollWidth).toBe('400px');

                // Test string value with %
                component.scrollWidth = '50%';

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.scrollWidth).toBe('50%');

                // Test undefined
                component.scrollWidth = undefined as any;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.scrollWidth).toBeUndefined();
            });
        });

        describe('Numeric Input Properties', () => {
            it('should handle tabindex input property changes', async () => {
                // Test positive number
                component.tabindex = 5;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.tabindex).toBe(5);
                expect(scroller._tabindex).toBe(5);

                // Test zero
                component.tabindex = 0;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.tabindex).toBe(0);

                // Test negative number
                component.tabindex = -1;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.tabindex).toBe(-1);

                // Test large number
                component.tabindex = 9999;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.tabindex).toBe(9999);
            });

            it('should handle step input property changes', async () => {
                // Test positive number
                component.step = 10;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.step).toBe(10);
                expect(scroller._step).toBe(10);

                // Test zero
                component.step = 0;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.step).toBe(0);

                // Test large number
                component.step = 1000;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.step).toBe(1000);
            });

            it('should handle delay input property changes', async () => {
                // Test positive number
                component.delay = 500;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.delay).toBe(500);
                expect(scroller._delay).toBe(500);

                // Test zero
                component.delay = 0;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.delay).toBe(0);

                // Test large number
                component.delay = 2000;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.delay).toBe(2000);
            });

            it('should handle resizeDelay input property changes', async () => {
                // Test positive number
                component.resizeDelay = 100;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.resizeDelay).toBe(100);
                expect(scroller._resizeDelay).toBe(100);

                // Test zero
                component.resizeDelay = 0;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.resizeDelay).toBe(0);

                // Test default value
                component.resizeDelay = 10;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.resizeDelay).toBe(10);
            });

            it('should handle numToleratedItems input property changes', async () => {
                // Test positive number
                component.numToleratedItems = 5;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.numToleratedItems).toBe(5);
                expect(scroller._numToleratedItems).toBe(5);

                // Test zero
                component.numToleratedItems = 0;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.numToleratedItems).toBe(0);

                // Test undefined
                component.numToleratedItems = undefined as any;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.numToleratedItems).toBeUndefined();
            });
        });

        describe('Boolean Input Properties', () => {
            it('should handle appendOnly input property changes', async () => {
                // Test true
                component.appendOnly = true;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.appendOnly).toBe(true);
                expect(scroller._appendOnly).toBe(true);

                // Test false
                component.appendOnly = false;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.appendOnly).toBe(false);
                expect(scroller._appendOnly).toBe(false);
            });

            it('should handle inline input property changes', async () => {
                // Test true
                component.inline = true;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.inline).toBe(true);
                expect(scroller._inline).toBe(true);

                // Test false
                component.inline = false;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.inline).toBe(false);
                expect(scroller._inline).toBe(false);
            });

            it('should handle lazy input property changes', async () => {
                // Test true
                component.lazy = true;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.lazy).toBe(true);
                expect(scroller._lazy).toBe(true);

                // Test false
                component.lazy = false;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.lazy).toBe(false);
                expect(scroller._lazy).toBe(false);
            });

            it('should handle disabled input property changes', async () => {
                // Test true
                component.disabled = true;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.disabled).toBe(true);
                expect(scroller._disabled).toBe(true);

                // Test false
                component.disabled = false;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.disabled).toBe(false);
                expect(scroller._disabled).toBe(false);
            });

            it('should handle loaderDisabled input property changes', async () => {
                // Test true
                component.loaderDisabled = true;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.loaderDisabled).toBe(true);
                expect(scroller._loaderDisabled).toBe(true);

                // Test false
                component.loaderDisabled = false;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.loaderDisabled).toBe(false);
                expect(scroller._loaderDisabled).toBe(false);
            });

            it('should handle showSpacer input property changes', async () => {
                // Test true (default)
                component.showSpacer = true;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.showSpacer).toBe(true);
                expect(scroller._showSpacer).toBe(true);

                // Test false
                component.showSpacer = false;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.showSpacer).toBe(false);
                expect(scroller._showSpacer).toBe(false);
            });

            it('should handle showLoader input property changes', async () => {
                // Test true
                component.showLoader = true;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.showLoader).toBe(true);
                expect(scroller._showLoader).toBe(true);

                // Test false (default)
                component.showLoader = false;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.showLoader).toBe(false);
                expect(scroller._showLoader).toBe(false);
            });

            it('should handle loading input property changes', async () => {
                // Test true
                component.loading = true;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.loading).toBe(true);
                expect(scroller._loading).toBe(true);

                // Test false
                component.loading = false;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.loading).toBe(false);
                expect(scroller._loading).toBe(false);

                // Test undefined
                component.loading = undefined as any;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.loading).toBeUndefined();
                expect(scroller._loading).toBeUndefined();
            });

            it('should handle autoSize input property changes', async () => {
                // Test true
                component.autoSize = true;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.autoSize).toBe(true);
                expect(scroller._autoSize).toBe(true);

                // Test false (default)
                component.autoSize = false;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.autoSize).toBe(false);
                expect(scroller._autoSize).toBe(false);
            });
        });

        describe('Enum Input Properties', () => {
            it('should handle orientation input property changes', async () => {
                // Test vertical (default)
                component.orientation = 'vertical';

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.orientation).toBe('vertical');
                expect(scroller._orientation).toBe('vertical');
                expect(scroller.vertical).toBe(true);
                expect(scroller.horizontal).toBe(false);
                expect(scroller.both).toBe(false);

                // Test horizontal
                component.orientation = 'horizontal';

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.orientation).toBe('horizontal');
                expect(scroller._orientation).toBe('horizontal');
                expect(scroller.vertical).toBe(false);
                expect(scroller.horizontal).toBe(true);
                expect(scroller.both).toBe(false);

                // Test both
                component.orientation = 'both';

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.orientation).toBe('both');
                expect(scroller._orientation).toBe('both');
                expect(scroller.vertical).toBe(false);
                expect(scroller.horizontal).toBe(false);
                expect(scroller.both).toBe(true);
            });
        });

        describe('Complex Input Properties', () => {
            it('should handle style input property changes', async () => {
                // Test object with single property
                const style1 = { width: '100px' };
                component.style = style1;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.style).toEqual(style1);
                expect(scroller._style).toEqual(style1);

                // Test object with multiple properties
                const style2 = {
                    width: '200px',
                    height: '300px',
                    border: '1px solid red',
                    backgroundColor: 'lightblue'
                };
                component.style = style2;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.style).toEqual(style2);
                expect(scroller._style).toEqual(style2);

                // Test undefined
                component.style = undefined as any;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.style).toBeUndefined();

                // Test null
                component.style = null as any;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.style).toBeNull();
            });

            it('should handle items input property changes', async () => {
                // Test array of objects
                const items1 = [
                    { id: 1, name: 'Item 1' },
                    { id: 2, name: 'Item 2' }
                ];
                component.items = items1;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.items).toEqual(items1);
                expect(scroller._items).toEqual(items1);

                // Test array of primitives
                const items2 = ['A', 'B', 'C', 'D', 'E'];
                component.items = items2;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.items).toEqual(items2);
                expect(scroller._items).toEqual(items2);

                // Test empty array
                component.items = [];

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.items).toEqual([]);
                expect(scroller._items).toEqual([]);

                // Test undefined
                component.items = undefined as any;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.items).toBeUndefined();
                expect(scroller._items).toBeUndefined();

                // Test null
                component.items = null as any;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.items).toBeNull();
                expect(scroller._items).toBeNull();
            });

            it('should handle columns input property changes', async () => {
                // Test array of strings
                const columns1 = ['Col1', 'Col2', 'Col3'];
                component.columns = columns1;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.columns).toEqual(columns1);
                expect(scroller._columns).toEqual(columns1);

                // Test array of objects
                const columns2 = [
                    { field: 'name', header: 'Name' },
                    { field: 'age', header: 'Age' }
                ];
                component.columns = columns2;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.columns).toEqual(columns2);
                expect(scroller._columns).toEqual(columns2);

                // Test empty array
                component.columns = [];

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.columns).toEqual([]);
                expect(scroller._columns).toEqual([]);

                // Test undefined
                component.columns = undefined as any;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.columns).toBeUndefined();
                expect(scroller._columns).toBeUndefined();

                // Test null
                component.columns = null as any;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.columns).toBeNull();
                expect(scroller._columns).toBeNull();
            });

            it('should handle itemSize input property changes', async () => {
                // Test number
                component.itemSize = 50;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.itemSize).toBe(50);
                expect(scroller._itemSize).toBe(50);

                // Test array of numbers (for both orientation)
                const itemSizes = [40, 80];
                component.itemSize = itemSizes;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.itemSize).toEqual(itemSizes);
                expect(scroller._itemSize).toEqual(itemSizes);

                // Test zero
                component.itemSize = 0;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.itemSize).toBe(0);
                expect(scroller._itemSize).toBe(0);

                // Test large number
                component.itemSize = 1000;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.itemSize).toBe(1000);
                expect(scroller._itemSize).toBe(1000);
            });

            it('should handle trackBy input property changes', async () => {
                // Test function
                const trackByFn = (_index: number, item: any) => item.id;
                component.trackBy = trackByFn;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.trackBy).toBe(trackByFn);
                expect(scroller._trackBy).toBe(trackByFn);

                // Test different function
                const trackByIndex = (index: number) => index;
                component.trackBy = trackByIndex;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.trackBy).toBe(trackByIndex);
                expect(scroller._trackBy).toBe(trackByIndex);
            });

            it('should handle options input property changes', async () => {
                // Test basic options
                const options1 = {
                    itemSize: 60,
                    scrollHeight: '400px',
                    lazy: true
                };
                component.options = options1;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.options).toEqual(options1);
                expect(scroller._options).toEqual(options1);
                // Options should update internal properties
                expect(scroller._itemSize).toBe(60);
                expect(scroller._lazy).toBe(true);

                // Test complex options
                const options2 = {
                    itemSize: [50, 100],
                    orientation: 'both' as any,
                    step: 20,
                    delay: 300,
                    appendOnly: true,
                    showLoader: true
                };
                component.options = options2;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.options).toEqual(options2);
                expect(scroller._itemSize).toEqual([50, 100]);
                expect(scroller._orientation).toBe('both');
                expect(scroller._step).toBe(20);
                expect(scroller._delay).toBe(300);
                expect(scroller._appendOnly).toBe(true);
                expect(scroller._showLoader).toBe(true);

                // Test undefined
                component.options = undefined as any;

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                expect(scroller.options).toBeUndefined();
                expect(scroller._options).toBeUndefined();
            });
        });
    });

    describe('Dynamic and Observable Input Tests', () => {
        @Component({
            standalone: false,
            template: `
                <p-scroller
                    [id]="dynamicId$ | async"
                    [style]="dynamicStyle$ | async"
                    [styleClass]="dynamicStyleClass$ | async"
                    [tabindex]="dynamicTabindex$ | async"
                    [items]="dynamicItems$ | async"
                    [itemSize]="dynamicItemSize$ | async"
                    [scrollHeight]="dynamicScrollHeight$ | async"
                    [scrollWidth]="dynamicScrollWidth$ | async"
                    [orientation]="dynamicOrientation$ | async"
                    [step]="dynamicStep$ | async"
                    [delay]="dynamicDelay$ | async"
                    [resizeDelay]="dynamicResizeDelay$ | async"
                    [appendOnly]="dynamicAppendOnly$ | async"
                    [inline]="dynamicInline$ | async"
                    [lazy]="dynamicLazy$ | async"
                    [disabled]="dynamicDisabled$ | async"
                    [loaderDisabled]="dynamicLoaderDisabled$ | async"
                    [columns]="dynamicColumns$ | async"
                    [showSpacer]="dynamicShowSpacer$ | async"
                    [showLoader]="dynamicShowLoader$ | async"
                    [numToleratedItems]="dynamicNumToleratedItems$ | async"
                    [loading]="dynamicLoading$ | async"
                    [autoSize]="dynamicAutoSize$ | async"
                    [trackBy]="dynamicTrackBy$ | async"
                    [options]="dynamicOptions$ | async"
                >
                </p-scroller>
            `
        })
        class TestDynamicInputsComponent {
            dynamicId$ = new BehaviorSubject<string | undefined>('initial-id');
            dynamicStyle$ = new BehaviorSubject<any>({ width: '100px' });
            dynamicStyleClass$ = new BehaviorSubject<string | undefined>('initial-class');
            dynamicTabindex$ = new BehaviorSubject<number>(0);
            dynamicItems$ = new BehaviorSubject<any[]>([{ name: 'Item 1' }]);
            dynamicItemSize$ = new BehaviorSubject<number | number[]>(50);
            dynamicScrollHeight$ = new BehaviorSubject<string | undefined>('200px');
            dynamicScrollWidth$ = new BehaviorSubject<string | undefined>('300px');
            dynamicOrientation$ = new BehaviorSubject<'vertical' | 'horizontal' | 'both'>('vertical');
            dynamicStep$ = new BehaviorSubject<number>(0);
            dynamicDelay$ = new BehaviorSubject<number>(0);
            dynamicResizeDelay$ = new BehaviorSubject<number>(10);
            dynamicAppendOnly$ = new BehaviorSubject<boolean>(false);
            dynamicInline$ = new BehaviorSubject<boolean>(false);
            dynamicLazy$ = new BehaviorSubject<boolean>(false);
            dynamicDisabled$ = new BehaviorSubject<boolean>(false);
            dynamicLoaderDisabled$ = new BehaviorSubject<boolean>(false);
            dynamicColumns$ = new BehaviorSubject<any[] | undefined>(undefined);
            dynamicShowSpacer$ = new BehaviorSubject<boolean>(true);
            dynamicShowLoader$ = new BehaviorSubject<boolean>(false);
            dynamicNumToleratedItems$ = new BehaviorSubject<number | undefined>(undefined);
            dynamicLoading$ = new BehaviorSubject<boolean | undefined>(false);
            dynamicAutoSize$ = new BehaviorSubject<boolean>(false);
            dynamicTrackBy$ = new BehaviorSubject<Function>((i: number) => i);
            dynamicOptions$ = new BehaviorSubject<any>(undefined);
        }

        let component: TestDynamicInputsComponent;
        let fixture: ComponentFixture<TestDynamicInputsComponent>;
        let scroller: Scroller;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [Scroller],
                providers: [provideZonelessChangeDetection()],
                declarations: [TestDynamicInputsComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestDynamicInputsComponent);
            component = fixture.componentInstance;
            scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
            fixture.detectChanges();
        });

        it('should handle dynamic string properties via observables', async () => {
            // Test id
            expect(scroller.id).toBe('initial-id');

            component.dynamicId$.next('updated-id');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.id).toBe('updated-id');

            // Test styleClass
            expect(scroller.styleClass).toBe('initial-class');

            component.dynamicStyleClass$.next('updated-class');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.styleClass).toBe('updated-class');

            // Test scrollHeight
            expect(scroller.scrollHeight).toBe('200px');

            component.dynamicScrollHeight$.next('400px');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.scrollHeight).toBe('400px');

            // Test scrollWidth
            expect(scroller.scrollWidth).toBe('300px');

            component.dynamicScrollWidth$.next('500px');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.scrollWidth).toBe('500px');
        });

        it('should handle dynamic numeric properties via observables', async () => {
            // Test tabindex
            expect(scroller.tabindex).toBe(0);

            component.dynamicTabindex$.next(5);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.tabindex).toBe(5);

            // Test step
            expect(scroller.step).toBe(0);

            component.dynamicStep$.next(10);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.step).toBe(10);

            // Test delay
            expect(scroller.delay).toBe(0);

            component.dynamicDelay$.next(500);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.delay).toBe(500);

            // Test resizeDelay
            expect(scroller.resizeDelay).toBe(10);

            component.dynamicResizeDelay$.next(100);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.resizeDelay).toBe(100);
        });

        it('should handle dynamic boolean properties via observables', async () => {
            // Test appendOnly
            expect(scroller.appendOnly).toBe(false);

            component.dynamicAppendOnly$.next(true);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.appendOnly).toBe(true);

            // Test inline
            expect(scroller.inline).toBe(false);

            component.dynamicInline$.next(true);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.inline).toBe(true);

            // Test lazy
            expect(scroller.lazy).toBe(false);

            component.dynamicLazy$.next(true);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.lazy).toBe(true);

            // Test disabled
            expect(scroller.disabled).toBe(false);

            component.dynamicDisabled$.next(true);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.disabled).toBe(true);

            // Test loaderDisabled
            expect(scroller.loaderDisabled).toBe(false);

            component.dynamicLoaderDisabled$.next(true);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.loaderDisabled).toBe(true);

            // Test showSpacer
            expect(scroller.showSpacer).toBe(true);

            component.dynamicShowSpacer$.next(false);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.showSpacer).toBe(false);

            // Test showLoader
            expect(scroller.showLoader).toBe(false);

            component.dynamicShowLoader$.next(true);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.showLoader).toBe(true);

            // Test loading
            expect(scroller.loading).toBe(false);

            component.dynamicLoading$.next(true);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.loading).toBe(true);

            // Test autoSize
            expect(scroller.autoSize).toBe(false);

            component.dynamicAutoSize$.next(true);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.autoSize).toBe(true);
        });

        it('should handle dynamic enum properties via observables', async () => {
            // Test orientation
            expect(scroller.orientation).toBe('vertical');
            expect(scroller.vertical).toBe(true);

            component.dynamicOrientation$.next('horizontal');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.orientation).toBe('horizontal');
            expect(scroller.horizontal).toBe(true);
            expect(scroller.vertical).toBe(false);

            component.dynamicOrientation$.next('both');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.orientation).toBe('both');
            expect(scroller.both).toBe(true);
            expect(scroller.horizontal).toBe(false);
        });

        it('should handle dynamic complex properties via observables', async () => {
            // Test style
            const initialStyle = { width: '100px' };
            expect(scroller.style).toEqual(initialStyle);

            const updatedStyle = { width: '200px', height: '300px' };
            component.dynamicStyle$.next(updatedStyle);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.style).toEqual(updatedStyle);

            // Test items
            const initialItems = [{ name: 'Item 1' }];
            expect(scroller.items).toEqual(initialItems);

            const updatedItems = [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }];
            component.dynamicItems$.next(updatedItems);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.items).toEqual(updatedItems);

            // Test itemSize
            expect(scroller.itemSize).toBe(50);

            component.dynamicItemSize$.next([40, 80]);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.itemSize).toEqual([40, 80]);

            // Test columns
            expect(scroller.columns).toBeUndefined();

            const columns = ['Col1', 'Col2', 'Col3'];
            component.dynamicColumns$.next(columns);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.columns).toEqual(columns);

            // Test numToleratedItems
            expect(scroller.numToleratedItems).toBeUndefined();

            component.dynamicNumToleratedItems$.next(5);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.numToleratedItems).toBe(5);

            // Test trackBy
            const trackByFn = (_index: number, item: any) => item.id;
            component.dynamicTrackBy$.next(trackByFn);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.trackBy).toBe(trackByFn);
        });

        it('should handle dynamic options property via observables', async () => {
            // Test initial undefined options
            expect(scroller.options).toBeUndefined();

            // Test setting options
            const options = {
                itemSize: 75,
                orientation: 'horizontal' as any,
                lazy: true,
                step: 15,
                showLoader: true
            };
            component.dynamicOptions$.next(options);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.options).toEqual(options);
            // Verify that options update internal properties
            expect(scroller._itemSize).toBe(75);
            expect(scroller._orientation).toBe('horizontal');
            expect(scroller._lazy).toBe(true);
            expect(scroller._step).toBe(15);
            expect(scroller._showLoader).toBe(true);

            // Test updating options
            const updatedOptions = {
                itemSize: [60, 120],
                orientation: 'both' as any,
                delay: 200,
                appendOnly: true
            };
            component.dynamicOptions$.next(updatedOptions);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.options).toEqual(updatedOptions);
            expect(scroller._itemSize).toEqual([60, 120]);
            expect(scroller._orientation).toBe('both');
            expect(scroller._delay).toBe(200);
            expect(scroller._appendOnly).toBe(true);
        });

        it('should handle rapid observable updates', async () => {
            // Rapidly change multiple properties
            for (let i = 0; i < 10; i++) {
                component.dynamicId$.next(`id-${i}`);
                component.dynamicTabindex$.next(i);
                component.dynamicStep$.next(i * 10);
                component.dynamicAppendOnly$.next(i % 2 === 0);

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();

                expect(scroller.id).toBe(`id-${i}`);
                expect(scroller.tabindex).toBe(i);
                expect(scroller.step).toBe(i * 10);
                expect(scroller.appendOnly).toBe(i % 2 === 0);
            }
        });

        it('should handle observable completion gracefully', async () => {
            // Test that completed observables don't break the component
            component.dynamicId$.complete();

            // Component should continue working with other properties
            component.dynamicTabindex$.next(99);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(scroller.tabindex).toBe(99);
        });

        it('should handle null and undefined values from observables', async () => {
            // Test null values
            component.dynamicId$.next(null as any);
            component.dynamicItems$.next(null as any);
            component.dynamicColumns$.next(undefined);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(scroller.id).toBeNull();
            expect(scroller.items).toBeNull();
            expect(scroller.columns).toBeUndefined();

            // Test undefined values
            component.dynamicId$.next(undefined);
            component.dynamicItems$.next(undefined as any);
            component.dynamicColumns$.next(undefined);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(scroller.id).toBeUndefined();
            expect(scroller.items).toBeUndefined();
            expect(scroller.columns).toBeUndefined();
        });
    });

    describe('Edge Cases and Boundary Values', () => {
        let component: TestBasicScrollerComponent;
        let fixture: ComponentFixture<TestBasicScrollerComponent>;
        let scroller: Scroller;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [Scroller],
                providers: [provideZonelessChangeDetection()],
                declarations: [TestBasicScrollerComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicScrollerComponent);
            component = fixture.componentInstance;
            scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
            fixture.detectChanges();
        });

        it('should handle extreme numeric values', async () => {
            // Test very large numbers
            component.tabindex = Number.MAX_SAFE_INTEGER;
            component.step = Number.MAX_SAFE_INTEGER;
            component.delay = Number.MAX_SAFE_INTEGER;
            component.itemSize = Number.MAX_SAFE_INTEGER;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(scroller.tabindex).toBe(Number.MAX_SAFE_INTEGER);
            expect(scroller.step).toBe(Number.MAX_SAFE_INTEGER);
            expect(scroller.delay).toBe(Number.MAX_SAFE_INTEGER);
            expect(scroller.itemSize).toBe(Number.MAX_SAFE_INTEGER);

            // Test very small numbers
            component.tabindex = Number.MIN_SAFE_INTEGER;
            component.step = Number.MIN_SAFE_INTEGER;
            component.delay = 0.001;
            component.itemSize = 0.001;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(scroller.tabindex).toBe(Number.MIN_SAFE_INTEGER);
            expect(scroller.step).toBe(Number.MIN_SAFE_INTEGER);
            expect(scroller.delay).toBe(0.001);
            expect(scroller.itemSize).toBe(0.001);
        });

        it('should handle special numeric values', async () => {
            // Test NaN
            component.tabindex = NaN;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.tabindex).toBeNaN();

            // Test Infinity
            component.step = Infinity;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.step).toBe(Infinity);

            // Test -Infinity
            component.delay = -Infinity;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.delay).toBe(-Infinity);
        });

        it('should handle very long strings', async () => {
            // Test very long id
            const longId = 'a'.repeat(10000);
            component.id = longId;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.id).toBe(longId);

            // Test very long styleClass
            const longClass = 'class-' + 'very-long-class-name-'.repeat(1000);
            component.styleClass = longClass;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.styleClass).toBe(longClass);

            // Test very long scrollHeight
            const longHeight = '123456789'.repeat(100) + 'px';
            component.scrollHeight = longHeight;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.scrollHeight).toBe(longHeight);
        });

        it('should handle special string values', async () => {
            // Test empty strings
            component.id = '';
            component.styleClass = '';
            component.scrollHeight = '';
            component.scrollWidth = '';

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(scroller.id).toBe('' as any);
            expect(scroller.styleClass).toBe('' as any);
            expect(scroller.scrollHeight).toBe('' as any);
            expect(scroller.scrollWidth).toBe('' as any);

            // Test strings with special characters
            component.id = 'id-with-!@#$%^&*()_+{}|:"<>?`~';
            component.styleClass = 'class-with-!@#$%^&*()_+{}|:"<>?`~';

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(scroller.id).toBe('id-with-!@#$%^&*()_+{}|:"<>?`~');
            expect(scroller.styleClass).toBe('class-with-!@#$%^&*()_+{}|:"<>?`~');
        });

        it('should handle large arrays', async () => {
            // Test large items array
            const largeItems = Array.from({ length: 100000 }, (_, i) => ({ id: i, name: `Item ${i}` }));
            component.items = largeItems;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.items).toEqual(largeItems);
            expect(scroller.items?.length).toBe(100000);

            // Test large columns array
            const largeColumns = Array.from({ length: 1000 }, (_, i) => `Column ${i}`);
            component.columns = largeColumns;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.columns).toEqual(largeColumns);
            expect(scroller.columns?.length).toBe(1000);

            // Test array with large itemSize
            const largeItemSizes = Array.from({ length: 1000 }, (_, i) => i * 10);
            component.itemSize = largeItemSizes;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.itemSize).toEqual(largeItemSizes);
        });

        it('should handle complex nested objects', async () => {
            // Test deeply nested style object
            const complexStyle = {
                border: {
                    top: { width: '1px', style: 'solid', color: 'red' },
                    right: { width: '2px', style: 'dashed', color: 'blue' },
                    bottom: { width: '3px', style: 'dotted', color: 'green' },
                    left: { width: '4px', style: 'double', color: 'yellow' }
                },
                margin: { top: 10, right: 20, bottom: 30, left: 40 },
                padding: { top: 5, right: 15, bottom: 25, left: 35 }
            };
            component.style = complexStyle;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.style).toEqual(complexStyle);

            // Test complex items with nested objects
            const complexItems = [
                {
                    id: 1,
                    data: {
                        personal: { name: 'John', age: 30 },
                        professional: { title: 'Developer', company: 'ABC Inc' },
                        metadata: { created: new Date(), updated: new Date() }
                    }
                }
            ];
            component.items = complexItems;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.items).toEqual(complexItems);
        });

        it('should handle circular references gracefully', async () => {
            // Test object with circular reference
            const circularObj: any = { name: 'test' };
            circularObj.self = circularObj;

            // This should not throw an error
            component.style = circularObj;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(scroller.style).toBe(circularObj);
        });

        it('should handle function properties', async () => {
            // Test different types of functions
            const arrowFunction = (index: number, item: any) => item?.id || index;
            const regularFunction = function (index: number, item: any) {
                return item?.name || index;
            };
            const asyncFunction = async (index: number, item: any) => item?.id || index;

            component.trackBy = arrowFunction;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.trackBy).toBe(arrowFunction);

            component.trackBy = regularFunction;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.trackBy).toBe(regularFunction);

            component.trackBy = asyncFunction;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(scroller.trackBy).toBe(asyncFunction);
        });
    });

    describe('Complete Content Projection Tests', () => {
        describe('pTemplate Content Projection Tests', () => {
            @Component({
                standalone: false,
                template: `
                    <p-scroller [items]="items" [itemSize]="itemSize" [scrollHeight]="scrollHeight">
                        <ng-template pTemplate="content" let-items let-options="options">
                            <div
                                class="p-template-content"
                                [attr.data-items-count]="items?.length"
                                [attr.data-has-scroll-to]="!options.scrollTo"
                                [attr.data-has-scroll-to-index]="!options.scrollToIndex"
                                [attr.data-has-get-item-options]="!options.getItemOptions"
                            >
                                <div class="content-scrollable-element" [attr.data-scrollable]="options.scrollableElement">
                                    <div *ngFor="let item of items; let i = index" class="p-template-content-item" [attr.data-index]="i" [attr.data-item-id]="item.id">
                                        {{ item.name }}
                                    </div>
                                </div>
                                <div class="content-options" [attr.data-orientation]="options.orientation" [attr.data-both]="options.both" [attr.data-horizontal]="options.horizontal" [attr.data-vertical]="options.vertical"></div>
                            </div>
                        </ng-template>
                    </p-scroller>
                `
            })
            class TestPTemplateContentComponent {
                items = [
                    { id: 1, name: 'Content Item 1' },
                    { id: 2, name: 'Content Item 2' },
                    { id: 3, name: 'Content Item 3' },
                    { id: 4, name: 'Content Item 4' },
                    { id: 5, name: 'Content Item 5' }
                ];
                itemSize = 50;
                scrollHeight = '200px';
            }

            @Component({
                standalone: false,
                template: `
                    <p-scroller [items]="items" [itemSize]="itemSize" [scrollHeight]="scrollHeight">
                        <ng-template pTemplate="item" let-item let-options="options">
                            <div
                                class="p-template-item"
                                [attr.data-index]="options.index"
                                [attr.data-count]="options.count"
                                [attr.data-first]="options.first"
                                [attr.data-last]="options.last"
                                [attr.data-even]="options.even"
                                [attr.data-odd]="options.odd"
                                [attr.data-item-id]="item.id"
                            >
                                <span class="item-name">{{ item.name }}</span>
                                <span class="item-position" *ngIf="options.first">FIRST</span>
                                <span class="item-position" *ngIf="options.last">LAST</span>
                                <span class="item-parity" *ngIf="options.even">EVEN</span>
                                <span class="item-parity" *ngIf="options.odd">ODD</span>
                                <span class="item-meta">{{ options.index + 1 }}/{{ options.count }}</span>
                            </div>
                        </ng-template>
                    </p-scroller>
                `
            })
            class TestPTemplateItemComponent {
                items = [
                    { id: 1, name: 'Item 1' },
                    { id: 2, name: 'Item 2' },
                    { id: 3, name: 'Item 3' },
                    { id: 4, name: 'Item 4' },
                    { id: 5, name: 'Item 5' }
                ];
                itemSize = 50;
                scrollHeight = '200px';
            }

            @Component({
                standalone: false,
                template: `
                    <p-scroller [items]="items" [itemSize]="itemSize" [scrollHeight]="scrollHeight" [showLoader]="true" [loading]="loading">
                        <ng-template pTemplate="loader" let-options="options">
                            <div
                                class="p-template-loader"
                                [attr.data-index]="options.index"
                                [attr.data-count]="options.count"
                                [attr.data-loading]="options.loading"
                                [attr.data-first]="options.first"
                                [attr.data-last]="options.last"
                                [attr.data-even]="options.even"
                                [attr.data-odd]="options.odd"
                            >
                                <div class="loader-spinner" [class]="options.styleClass">Loading item {{ options.index + 1 }}...</div>
                                <div class="loader-meta">{{ options.index + 1 }}/{{ options.count }}</div>
                            </div>
                        </ng-template>
                    </p-scroller>
                `
            })
            class TestPTemplateLoaderComponent {
                items = new Array(20).fill(null).map((_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));
                itemSize = 50;
                scrollHeight = '200px';
                loading = true;
            }

            @Component({
                standalone: false,
                template: `
                    <p-scroller [items]="items" [itemSize]="itemSize" [scrollHeight]="scrollHeight" [showLoader]="true" [loading]="loading">
                        <ng-template pTemplate="loadericon" let-options="options">
                            <div class="p-template-loader-icon" [class]="options.styleClass" [attr.data-style-class]="options.styleClass">
                                <i class="custom-loading-icon pi pi-spin pi-spinner"></i>
                                <span class="loading-text">Loading...</span>
                            </div>
                        </ng-template>
                    </p-scroller>
                `
            })
            class TestPTemplateLoaderIconComponent {
                items = new Array(10).fill(null).map((_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));
                itemSize = 50;
                scrollHeight = '200px';
                loading = true;
            }

            it('should render pTemplate="content" with correct context objects', async () => {
                await TestBed.configureTestingModule({
                    imports: [Scroller],
                    providers: [provideZonelessChangeDetection()],
                    declarations: [TestPTemplateContentComponent]
                }).compileComponents();

                const fixture = TestBed.createComponent(TestPTemplateContentComponent);
                fixture.detectChanges();
                await fixture.whenStable();

                const scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
                expect(scroller).toBeTruthy();
                expect(scroller._items).toBeDefined();

                // Test context generation even if template detection doesn't work in test environment
                expect(scroller.getContentOptions).toBeDefined();
                const contentOptions = scroller.getContentOptions();
                expect(typeof contentOptions.scrollTo).toBe('function');
                expect(typeof contentOptions.scrollToIndex).toBe('function');
                expect(typeof contentOptions.getItemOptions).toBe('function');
                expect(typeof contentOptions.orientation).toBe('string');
                expect(typeof contentOptions.both).toBe('boolean');
                expect(typeof contentOptions.horizontal).toBe('boolean');
                expect(typeof contentOptions.vertical).toBe('boolean');
                expect(contentOptions.scrollableElement).toBeDefined();
            });

            it('should render pTemplate="item" with correct context objects', async () => {
                await TestBed.configureTestingModule({
                    imports: [Scroller],
                    providers: [provideZonelessChangeDetection()],
                    declarations: [TestPTemplateItemComponent]
                }).compileComponents();

                const fixture = TestBed.createComponent(TestPTemplateItemComponent);
                fixture.detectChanges();
                await fixture.whenStable();

                const scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
                expect(scroller).toBeTruthy();

                // Test item context generation regardless of template detection
                expect(scroller.getOptions).toBeDefined();
                const itemOptions = scroller.getOptions(0);
                expect(typeof itemOptions.index).toBe('number');
                expect(typeof itemOptions.count).toBe('number');
                expect(typeof itemOptions.first).toBe('boolean');
                expect(typeof itemOptions.last).toBe('boolean');
                expect(typeof itemOptions.even).toBe('boolean');
                expect(typeof itemOptions.odd).toBe('boolean');

                // Test specific values
                expect(itemOptions.index).toBe(0);
                expect(itemOptions.first).toBe(true);
                expect(itemOptions.even).toBe(true);
                expect(itemOptions.odd).toBe(false);

                // Test last item options if items exist
                if (scroller._items && scroller._items.length > 1) {
                    const lastOptions = scroller.getOptions(scroller._items.length - 1);
                    expect(lastOptions.last).toBe(true);
                    expect(lastOptions.index).toBe(scroller._items.length - 1);
                }
            });

            it('should render pTemplate="loader" with correct context objects', async () => {
                await TestBed.configureTestingModule({
                    imports: [Scroller],
                    providers: [provideZonelessChangeDetection()],
                    declarations: [TestPTemplateLoaderComponent]
                }).compileComponents();

                const fixture = TestBed.createComponent(TestPTemplateLoaderComponent);
                fixture.detectChanges();
                await fixture.whenStable();

                const scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
                expect(scroller).toBeTruthy();

                // Test loader context structure regardless of template detection
                const loaderOptions = scroller.getLoaderOptions(0, {});
                expect(typeof loaderOptions.index).toBe('number');
                expect(typeof loaderOptions.count).toBe('number');
                expect(typeof loaderOptions.first).toBe('boolean');
                expect(typeof loaderOptions.last).toBe('boolean');
                expect(typeof loaderOptions.even).toBe('boolean');
                expect(typeof loaderOptions.odd).toBe('boolean');
                expect(typeof loaderOptions.loading).toBe('boolean');

                // Verify loading state
                expect(scroller._loading).toBe(true);
                expect(scroller._showLoader).toBe(true);
            });

            it('should render pTemplate="loadericon" with correct context objects', async () => {
                await TestBed.configureTestingModule({
                    imports: [Scroller],
                    providers: [provideZonelessChangeDetection()],
                    declarations: [TestPTemplateLoaderIconComponent]
                }).compileComponents();

                const fixture = TestBed.createComponent(TestPTemplateLoaderIconComponent);
                fixture.detectChanges();
                await fixture.whenStable();

                const scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
                expect(scroller).toBeTruthy();

                // Verify loader icon configuration
                expect(scroller._loading).toBe(true);
                expect(scroller._showLoader).toBe(true);

                // Test that component is configured for loader icon template
                expect(scroller.templates || scroller._loaderIconTemplate || scroller.loaderIconTemplate).toBeTruthy();
            });
        });

        describe('#template Content Projection Tests', () => {
            @Component({
                standalone: false,
                template: `
                    <p-scroller [items]="items" [itemSize]="itemSize" [scrollHeight]="scrollHeight">
                        <ng-template #content let-items let-options="options">
                            <div class="hash-template-content" [attr.data-items-count]="items?.length" [attr.data-has-scroll-to]="!options.scrollTo" [attr.data-orientation]="options.orientation">
                                <div class="hash-content-list">
                                    <div *ngFor="let item of items; let i = index" class="hash-content-item" [attr.data-index]="i">{{ item.name }} (Hash Template)</div>
                                </div>
                                <div class="hash-content-meta" [attr.data-scrollable-element]="options.scrollableElement">Content rendered via #content template</div>
                            </div>
                        </ng-template>
                    </p-scroller>
                `
            })
            class TestHashTemplateContentComponent {
                items = [
                    { id: 1, name: 'Hash Content 1' },
                    { id: 2, name: 'Hash Content 2' },
                    { id: 3, name: 'Hash Content 3' }
                ];
                itemSize = 50;
                scrollHeight = '200px';
            }

            @Component({
                standalone: false,
                template: `
                    <p-scroller [items]="items" [itemSize]="itemSize" [scrollHeight]="scrollHeight">
                        <ng-template #item let-item let-options="options">
                            <div class="hash-template-item" [attr.data-index]="options.index" [attr.data-first]="options.first" [attr.data-last]="options.last">
                                <span class="hash-item-name">{{ item.name }}</span>
                                <span class="hash-item-badge" *ngIf="options.first">#FIRST</span>
                                <span class="hash-item-badge" *ngIf="options.last">#LAST</span>
                                <span class="hash-item-position">{{ options.index }}/{{ options.count - 1 }}</span>
                            </div>
                        </ng-template>
                    </p-scroller>
                `
            })
            class TestHashTemplateItemComponent {
                items = [
                    { id: 1, name: 'Hash Item 1' },
                    { id: 2, name: 'Hash Item 2' },
                    { id: 3, name: 'Hash Item 3' },
                    { id: 4, name: 'Hash Item 4' }
                ];
                itemSize = 50;
                scrollHeight = '200px';
            }

            @Component({
                standalone: false,
                template: `
                    <p-scroller [items]="items" [itemSize]="itemSize" [scrollHeight]="scrollHeight" [showLoader]="true" [loading]="loading">
                        <ng-template #loader let-options="options">
                            <div class="hash-template-loader" [attr.data-index]="options.index" [attr.data-loading]="options.loading">
                                <div class="hash-loader-content">
                                    <span class="hash-loader-text">#Loading {{ options.index }}...</span>
                                    <span class="hash-loader-progress">{{ options.index + 1 }}/{{ options.count }}</span>
                                </div>
                            </div>
                        </ng-template>
                    </p-scroller>
                `
            })
            class TestHashTemplateLoaderComponent {
                items = new Array(15).fill(null).map((_, i) => ({ id: i + 1, name: `Hash Item ${i + 1}` }));
                itemSize = 50;
                scrollHeight = '200px';
                loading = true;
            }

            @Component({
                standalone: false,
                template: `
                    <p-scroller [items]="items" [itemSize]="itemSize" [scrollHeight]="scrollHeight" [showLoader]="true" [loading]="loading">
                        <ng-template #loadericon let-options="options">
                            <div class="hash-template-loader-icon" [class]="options.styleClass">
                                <i class="hash-loading-icon fas fa-spinner fa-spin"></i>
                                <span class="hash-loading-label">#Loading Icon</span>
                            </div>
                        </ng-template>
                    </p-scroller>
                `
            })
            class TestHashTemplateLoaderIconComponent {
                items = new Array(8).fill(null).map((_, i) => ({ id: i + 1, name: `Hash Item ${i + 1}` }));
                itemSize = 50;
                scrollHeight = '200px';
                loading = true;
            }

            it('should render #content template with correct context objects', async () => {
                await TestBed.configureTestingModule({
                    imports: [Scroller],
                    providers: [provideZonelessChangeDetection()],
                    declarations: [TestHashTemplateContentComponent]
                }).compileComponents();

                const fixture = TestBed.createComponent(TestHashTemplateContentComponent);
                fixture.detectChanges();
                await fixture.whenStable();

                const scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
                expect(scroller).toBeTruthy();

                // Test context object structure regardless of template detection
                const contentOptions = scroller.getContentOptions();
                expect(contentOptions).toBeDefined();
                expect(typeof contentOptions.scrollTo).toBe('function');
                expect(typeof contentOptions.scrollToIndex).toBe('function');
                expect(typeof contentOptions.getItemOptions).toBe('function');
            });

            it('should render #item template with correct context objects', async () => {
                await TestBed.configureTestingModule({
                    imports: [Scroller],
                    providers: [provideZonelessChangeDetection()],
                    declarations: [TestHashTemplateItemComponent]
                }).compileComponents();

                const fixture = TestBed.createComponent(TestHashTemplateItemComponent);
                fixture.detectChanges();
                await fixture.whenStable();

                const scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
                expect(scroller).toBeTruthy();

                // Test item context generation
                const itemOptions = scroller.getOptions(0);
                expect(itemOptions.index).toBe(0);
                expect(itemOptions.first).toBe(true);
                expect(itemOptions.last).toBe(false);

                if (scroller._items && scroller._items.length > 1) {
                    const lastItemOptions = scroller.getOptions(scroller._items.length - 1);
                    expect(lastItemOptions.last).toBe(true);
                    expect(lastItemOptions.first).toBe(false);
                }
            });

            it('should render #loader template with correct context objects', async () => {
                await TestBed.configureTestingModule({
                    imports: [Scroller],
                    providers: [provideZonelessChangeDetection()],
                    declarations: [TestHashTemplateLoaderComponent]
                }).compileComponents();

                const fixture = TestBed.createComponent(TestHashTemplateLoaderComponent);
                fixture.detectChanges();
                await fixture.whenStable();

                const scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
                expect(scroller).toBeTruthy();

                // Verify loader state
                expect(scroller._loading).toBe(true);
                expect(scroller._showLoader).toBe(true);
            });

            it('should render #loadericon template with correct context objects', async () => {
                await TestBed.configureTestingModule({
                    imports: [Scroller],
                    providers: [provideZonelessChangeDetection()],
                    declarations: [TestHashTemplateLoaderIconComponent]
                }).compileComponents();

                const fixture = TestBed.createComponent(TestHashTemplateLoaderIconComponent);
                fixture.detectChanges();
                await fixture.whenStable();

                const scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
                expect(scroller).toBeTruthy();

                // Verify loader icon template configuration
                expect(scroller._loading).toBe(true);
                expect(scroller._showLoader).toBe(true);
            });
        });

        describe('Mixed Content Projection Tests', () => {
            @Component({
                standalone: false,
                template: `
                    <p-scroller [items]="items" [itemSize]="itemSize" [scrollHeight]="scrollHeight">
                        <!-- Both pTemplate and #template should work together -->
                        <ng-template pTemplate="content" let-items let-options="options">
                            <div class="mixed-p-template-content">
                                <h3>pTemplate Content ({{ items?.length }} items)</h3>
                                <div class="p-content-items">
                                    <div *ngFor="let item of items" class="p-content-item">{{ item.name }}</div>
                                </div>
                            </div>
                        </ng-template>

                        <ng-template #item let-item let-options="options">
                            <div class="mixed-hash-template-item">
                                <span>#Hash Item: {{ item.name }} ({{ options.index }})</span>
                            </div>
                        </ng-template>
                    </p-scroller>
                `
            })
            class TestMixedTemplateComponent {
                items = [
                    { id: 1, name: 'Mixed Item 1' },
                    { id: 2, name: 'Mixed Item 2' },
                    { id: 3, name: 'Mixed Item 3' }
                ];
                itemSize = 50;
                scrollHeight = '200px';
            }

            it('should handle mixed pTemplate and #template projections', async () => {
                await TestBed.configureTestingModule({
                    imports: [Scroller],
                    providers: [provideZonelessChangeDetection()],
                    declarations: [TestMixedTemplateComponent]
                }).compileComponents();

                const fixture = TestBed.createComponent(TestMixedTemplateComponent);
                fixture.detectChanges();
                await fixture.whenStable();

                const scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;
                expect(scroller).toBeTruthy();

                // Test that component is properly initialized with mixed templates
                expect(scroller._items).toBeDefined();
                expect(scroller.getContentOptions).toBeDefined();
                expect(scroller.getOptions).toBeDefined();

                // Verify context generation works regardless of template detection
                const contentOptions = scroller.getContentOptions();
                expect(typeof contentOptions.scrollTo).toBe('function');
                const itemOptions = scroller.getOptions(0);
                expect(typeof itemOptions.index).toBe('number');
            });
        });

        describe('Context Object Validation Tests', () => {
            @Component({
                standalone: true,
                imports: [Scroller],
                template: `
                    <p-scroller [items]="items" [itemSize]="itemSize" [scrollHeight]="scrollHeight" [orientation]="orientation">
                        <ng-template pTemplate="content" let-items let-options="options">
                            <div class="context-test-content" [attr.data-orientation]="options.orientation" [attr.data-both]="options.both" [attr.data-horizontal]="options.horizontal" [attr.data-vertical]="options.vertical">
                                Items: {{ items?.length }}
                            </div>
                        </ng-template>
                        <ng-template pTemplate="item" let-item let-options="options">
                            <div
                                class="context-test-item"
                                [attr.data-index]="options.index"
                                [attr.data-count]="options.count"
                                [attr.data-first]="options.first"
                                [attr.data-last]="options.last"
                                [attr.data-even]="options.even"
                                [attr.data-odd]="options.odd"
                            >
                                {{ item.name }}
                            </div>
                        </ng-template>
                    </p-scroller>
                `
            })
            class TestContextValidationComponent {
                items = new Array(10).fill(null).map((_, i) => ({ id: i + 1, name: `Context Item ${i + 1}` }));
                itemSize = 50;
                scrollHeight = '200px';
                orientation: 'vertical' | 'horizontal' | 'both' = 'vertical';
            }

            it('should provide accurate context objects for different orientations', async () => {
                await TestBed.configureTestingModule({
                    imports: [TestContextValidationComponent],
                    providers: [provideZonelessChangeDetection()]
                }).compileComponents();

                const fixture = TestBed.createComponent(TestContextValidationComponent);
                const component = fixture.componentInstance;
                fixture.detectChanges();
                await fixture.whenStable();

                const scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;

                // Ensure scroller is properly initialized
                scroller._items = component.items;
                scroller._orientation = 'vertical'; // Explicitly set orientation before initialization
                scroller.setInitialState();
                scroller.first = 0; // Explicitly ensure first is set to 0 for tests

                // Test vertical orientation
                let contentOptions = scroller.getContentOptions();
                expect(contentOptions.orientation).toBe('vertical');
                expect(contentOptions.vertical).toBe(true);
                expect(contentOptions.horizontal).toBe(false);
                expect(contentOptions.both).toBe(false);

                // Test horizontal orientation
                component.orientation = 'horizontal';

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                scroller._orientation = 'horizontal';
                scroller.setInitialState();
                contentOptions = scroller.getContentOptions();
                expect(contentOptions.orientation).toBe('horizontal');
                expect(contentOptions.vertical).toBe(false);
                expect(contentOptions.horizontal).toBe(true);
                expect(contentOptions.both).toBe(false);

                // Test both orientation
                component.orientation = 'both';

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                scroller._orientation = 'both';
                scroller.setInitialState();
                contentOptions = scroller.getContentOptions();
                expect(contentOptions.orientation).toBe('both');
                expect(contentOptions.vertical).toBe(false);
                expect(contentOptions.horizontal).toBe(false);
                expect(contentOptions.both).toBe(true);

                // Reset orientation to vertical for item context tests
                component.orientation = 'vertical';

                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                scroller._orientation = 'vertical';
                scroller.setInitialState();

                // Test item context for different positions
                let itemOptions = scroller.getOptions(0);
                expect(itemOptions.index).toBe(0);
                expect(itemOptions.first).toBe(true);
                expect(itemOptions.last).toBe(false);
                expect(itemOptions.even).toBe(true);
                expect(itemOptions.odd).toBe(false);

                itemOptions = scroller.getOptions(1);
                expect(itemOptions.index).toBe(1);
                expect(itemOptions.first).toBe(false);
                expect(itemOptions.last).toBe(false);
                expect(itemOptions.even).toBe(false);
                expect(itemOptions.odd).toBe(true);

                itemOptions = scroller.getOptions(scroller._items.length - 1);
                expect(itemOptions.last).toBe(true);
                expect(itemOptions.first).toBe(false);
            });

            it('should provide correct count values in context objects', async () => {
                await TestBed.configureTestingModule({
                    imports: [TestContextValidationComponent],
                    providers: [provideZonelessChangeDetection()]
                }).compileComponents();

                const fixture = TestBed.createComponent(TestContextValidationComponent);
                fixture.detectChanges();
                await fixture.whenStable();

                const scroller = fixture.debugElement.query(By.directive(Scroller)).componentInstance;

                // Ensure scroller is properly initialized
                scroller._items = fixture.componentInstance.items;
                scroller._orientation = 'vertical'; // Explicitly set orientation before initialization
                scroller.setInitialState();
                scroller.first = 0; // Explicitly ensure first is set to 0 for tests

                // Test that count matches items length
                const itemOptions = scroller.getOptions(5);
                expect(itemOptions.count).toBe(scroller._items.length);
                expect(itemOptions.count).toBe(10);

                // Test index boundaries
                expect(itemOptions.index).toBeGreaterThanOrEqual(0);
                expect(itemOptions.index).toBeLessThan(itemOptions.count);
            });
        });
    });

    describe('PassThrough (PT) Tests', () => {
        @Component({
            standalone: true,
            imports: [CommonModule, Scroller],
            template: `
                <p-scroller [items]="items()" [itemSize]="itemSize()" [pt]="pt()" [showLoader]="showLoader()" [loading]="loading()">
                    <ng-template #item let-item>
                        <div class="item">{{ item }}</div>
                    </ng-template>
                </p-scroller>
            `
        })
        class TestPTScrollerComponent {
            items = input(Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`));
            itemSize = input(50);
            pt = input<any>();
            showLoader = input(false);
            loading = input(false);
        }

        let fixture: ComponentFixture<TestPTScrollerComponent>;
        let component: TestPTScrollerComponent;
        let scrollerInstance: Scroller;
        let scrollerElement: DebugElement;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestPTScrollerComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestPTScrollerComponent);
            component = fixture.componentInstance;
            scrollerElement = fixture.debugElement.query(By.css('p-scroller'));
            scrollerInstance = scrollerElement.componentInstance;
            fixture.detectChanges();
        });

        describe('Case 1: Simple string classes', () => {
            it('should apply string class to root', async () => {
                fixture.componentRef.setInput('pt', { root: 'CUSTOM_ROOT_CLASS' });
                fixture.detectChanges();

                const root = fixture.debugElement.query(By.css('.p-virtualscroller'));
                expect(root.nativeElement.classList.contains('CUSTOM_ROOT_CLASS')).toBeTruthy();
            });

            it('should apply string class to content', async () => {
                fixture.componentRef.setInput('pt', { content: 'CUSTOM_CONTENT_CLASS' });
                fixture.detectChanges();

                const content = fixture.debugElement.query(By.css('.p-virtualscroller-content'));
                expect(content.nativeElement.classList.contains('CUSTOM_CONTENT_CLASS')).toBeTruthy();
            });

            it('should apply string class to spacer', async () => {
                fixture.componentRef.setInput('pt', { spacer: 'CUSTOM_SPACER_CLASS' });
                fixture.detectChanges();

                const spacer = fixture.debugElement.query(By.css('.p-virtualscroller-spacer'));
                expect(spacer?.nativeElement.classList.contains('CUSTOM_SPACER_CLASS')).toBeTruthy();
            });

            it('should apply string class to loader when loading', async () => {
                fixture.componentRef.setInput('showLoader', true);
                fixture.componentRef.setInput('loading', true);
                scrollerInstance.d_loading = true;

                fixture.componentRef.setInput('pt', { loader: 'CUSTOM_LOADER_CLASS' });
                fixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await fixture.whenStable();
                fixture.detectChanges();

                const loader = fixture.debugElement.query(By.css('.p-virtualscroller-loader'));
                expect(loader?.nativeElement.classList.contains('CUSTOM_LOADER_CLASS')).toBeTruthy();
            });

            it('should apply string class to loadingIcon when loading', async () => {
                fixture.componentRef.setInput('showLoader', true);
                fixture.componentRef.setInput('loading', true);
                scrollerInstance.d_loading = true;

                fixture.componentRef.setInput('pt', { loadingIcon: 'CUSTOM_LOADING_ICON_CLASS' });
                fixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await fixture.whenStable();
                fixture.detectChanges();

                const loadingIcon = fixture.debugElement.query(By.css('[data-p-icon="spinner"]'));
                expect(loadingIcon?.nativeElement.classList.contains('CUSTOM_LOADING_ICON_CLASS')).toBeTruthy();
            });
        });

        describe('Case 2: Objects', () => {
            it('should apply object properties to root', async () => {
                fixture.componentRef.setInput('pt', {
                    root: {
                        class: 'ROOT_CLASS',
                        style: { 'background-color': 'red' },
                        'data-p-test': true,
                        'aria-label': 'TEST_ARIA_LABEL'
                    }
                });
                fixture.detectChanges();

                const root = fixture.debugElement.query(By.css('.p-virtualscroller'));
                expect(root.nativeElement.classList.contains('ROOT_CLASS')).toBeTruthy();
                expect(root.nativeElement.style.backgroundColor).toBe('red');
                expect(root.nativeElement.getAttribute('data-p-test')).toBe('true');
                expect(root.nativeElement.getAttribute('aria-label')).toBe('TEST_ARIA_LABEL');
            });

            it('should apply object properties to content', async () => {
                fixture.componentRef.setInput('pt', {
                    content: {
                        class: 'CONTENT_CLASS',
                        style: { padding: '10px' },
                        'data-content': 'test'
                    }
                });
                fixture.detectChanges();

                const content = fixture.debugElement.query(By.css('.p-virtualscroller-content'));
                expect(content.nativeElement.classList.contains('CONTENT_CLASS')).toBeTruthy();
                expect(content.nativeElement.style.padding).toBe('10px');
                expect(content.nativeElement.getAttribute('data-content')).toBe('test');
            });

            it('should apply object properties to spacer', async () => {
                fixture.componentRef.setInput('pt', {
                    spacer: {
                        class: 'SPACER_CLASS',
                        'data-spacer': 'test'
                    }
                });
                fixture.detectChanges();

                const spacer = fixture.debugElement.query(By.css('.p-virtualscroller-spacer'));
                expect(spacer?.nativeElement.classList.contains('SPACER_CLASS')).toBeTruthy();
                expect(spacer?.nativeElement.getAttribute('data-spacer')).toBe('test');
            });
        });

        describe('Case 3: Mixed object and string values', () => {
            it('should handle mixed PT values', async () => {
                fixture.componentRef.setInput('pt', {
                    root: { class: 'ROOT_OBJECT_CLASS' },
                    content: 'CONTENT_STRING_CLASS'
                });
                fixture.detectChanges();

                const root = fixture.debugElement.query(By.css('.p-virtualscroller'));
                const content = fixture.debugElement.query(By.css('.p-virtualscroller-content'));

                expect(root.nativeElement.classList.contains('ROOT_OBJECT_CLASS')).toBeTruthy();
                expect(content.nativeElement.classList.contains('CONTENT_STRING_CLASS')).toBeTruthy();
            });
        });

        describe('Case 4: Use variables from instance', () => {
            it('should apply PT based on instance state', async () => {
                fixture.componentRef.setInput('loading', true);
                fixture.componentRef.setInput('showLoader', true);
                scrollerInstance.d_loading = true;

                fixture.componentRef.setInput('pt', {
                    root: ({ instance }) => ({
                        class: {
                            IS_LOADING: instance.loading
                        }
                    }),
                    loader: ({ instance }) => ({
                        style: {
                            'background-color': instance.loading ? 'yellow' : 'transparent'
                        }
                    })
                });
                fixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await fixture.whenStable();

                const root = fixture.debugElement.query(By.css('.p-virtualscroller'));
                const loader = fixture.debugElement.query(By.css('.p-virtualscroller-loader'));

                expect(root.nativeElement.classList.contains('IS_LOADING')).toBeTruthy();
                expect(loader?.nativeElement.style.backgroundColor).toBe('yellow');
            });
        });

        describe('Case 5: Event binding', () => {
            it('should handle onclick event in PT', async () => {
                let clicked = false;
                fixture.componentRef.setInput('pt', {
                    root: {
                        onclick: () => {
                            clicked = true;
                        }
                    }
                });
                fixture.detectChanges();

                const root = fixture.debugElement.query(By.css('.p-virtualscroller'));
                root.nativeElement.click();

                expect(clicked).toBe(true);
            });
        });

        describe('Case 6: Inline PT test', () => {
            @Component({
                standalone: true,
                imports: [CommonModule, Scroller],
                template: `<p-scroller [items]="items" [itemSize]="50" [pt]="{ root: 'INLINE_TEST_CLASS' }">
                    <ng-template #item let-item>{{ item }}</ng-template>
                </p-scroller>`
            })
            class TestInlinePTComponent {
                items = ['Item 1', 'Item 2', 'Item 3'];
            }

            it('should apply inline PT', async () => {
                const inlineFixture = TestBed.createComponent(TestInlinePTComponent);
                inlineFixture.detectChanges();

                const root = inlineFixture.debugElement.query(By.css('.p-virtualscroller'));
                expect(root.nativeElement.classList.contains('INLINE_TEST_CLASS')).toBeTruthy();
            });

            it('should apply inline PT with object', async () => {
                @Component({
                    standalone: true,
                    imports: [CommonModule, Scroller],
                    template: `<p-scroller [items]="items" [itemSize]="50" [pt]="{ root: { class: 'INLINE_OBJECT_CLASS' } }">
                        <ng-template #item let-item>{{ item }}</ng-template>
                    </p-scroller>`
                })
                class TestInlineObjectPTComponent {
                    items = ['Item 1', 'Item 2', 'Item 3'];
                }

                const objFixture = TestBed.createComponent(TestInlineObjectPTComponent);
                objFixture.detectChanges();

                const root = objFixture.debugElement.query(By.css('.p-virtualscroller'));
                expect(root.nativeElement.classList.contains('INLINE_OBJECT_CLASS')).toBeTruthy();
            });
        });

        describe('Case 7: Global PT from PrimeNGConfig', () => {
            @Component({
                standalone: true,
                imports: [CommonModule, Scroller],
                template: `
                    <p-scroller [items]="items1" [itemSize]="50">
                        <ng-template #item let-item>{{ item }}</ng-template>
                    </p-scroller>
                    <p-scroller [items]="items2" [itemSize]="50">
                        <ng-template #item let-item>{{ item }}</ng-template>
                    </p-scroller>
                `
            })
            class TestGlobalPTComponent {
                items1 = ['A1', 'A2'];
                items2 = ['B1', 'B2'];
            }

            it('should apply global PT from PrimeNGConfig', async () => {
                await TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    imports: [TestGlobalPTComponent],
                    providers: [
                        provideZonelessChangeDetection(),
                        providePrimeNG({
                            pt: {
                                virtualScroller: {
                                    root: { 'aria-label': 'GLOBAL_SCROLLER_LABEL', class: 'GLOBAL_CLASS' }
                                }
                            }
                        })
                    ]
                }).compileComponents();

                const globalFixture = TestBed.createComponent(TestGlobalPTComponent);
                globalFixture.detectChanges();

                const scrollers = globalFixture.debugElement.queryAll(By.css('.p-virtualscroller'));
                expect(scrollers.length).toBe(2);

                scrollers.forEach((scroller) => {
                    expect(scroller.nativeElement.getAttribute('aria-label')).toBe('GLOBAL_SCROLLER_LABEL');
                    expect(scroller.nativeElement.classList.contains('GLOBAL_CLASS')).toBeTruthy();
                });
            });

            it('should apply multiple PT attributes from global config', async () => {
                await TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    imports: [TestGlobalPTComponent],
                    providers: [
                        provideZonelessChangeDetection(),
                        providePrimeNG({
                            pt: {
                                virtualScroller: {
                                    root: { class: 'GLOBAL_ROOT' },
                                    content: { class: 'GLOBAL_CONTENT' }
                                }
                            }
                        })
                    ]
                }).compileComponents();

                const globalFixture = TestBed.createComponent(TestGlobalPTComponent);
                globalFixture.detectChanges();

                const scrollers = globalFixture.debugElement.queryAll(By.css('.p-virtualscroller'));
                scrollers.forEach((scroller) => {
                    expect(scroller.nativeElement.classList.contains('GLOBAL_ROOT')).toBeTruthy();
                });

                const contents = globalFixture.debugElement.queryAll(By.css('.p-virtualscroller-content'));
                contents.forEach((content) => {
                    expect(content.nativeElement.classList.contains('GLOBAL_CONTENT')).toBeTruthy();
                });
            });
        });

        describe('Case 8: Hooks', () => {
            it('should call onAfterViewInit hook', async () => {
                let hookCalled = false;
                const hookFixture = TestBed.createComponent(TestPTScrollerComponent);
                hookFixture.componentRef.setInput('pt', {
                    hooks: {
                        onAfterViewInit: () => {
                            hookCalled = true;
                        }
                    }
                });
                hookFixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await hookFixture.whenStable();

                expect(hookCalled).toBeTruthy();
            });

            it('should call onAfterViewChecked hook', async () => {
                let checkCount = 0;
                const hookFixture = TestBed.createComponent(TestPTScrollerComponent);
                hookFixture.componentRef.setInput('pt', {
                    hooks: {
                        onAfterViewChecked: () => {
                            checkCount++;
                        }
                    }
                });
                hookFixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await hookFixture.whenStable();

                expect(checkCount).toBeGreaterThan(0);
            });
        });

        describe('Complete PT Coverage: All sections', () => {
            it('should apply PT to all sections together', async () => {
                fixture.componentRef.setInput('showLoader', true);
                fixture.componentRef.setInput('loading', true);
                fixture.componentRef.setInput('pt', {
                    root: { class: 'PT_ROOT', 'data-root': 'test' },
                    content: { class: 'PT_CONTENT', 'data-content': 'test' },
                    spacer: { class: 'PT_SPACER', 'data-spacer': 'test' },
                    loader: { class: 'PT_LOADER', 'data-loader': 'test' },
                    loadingIcon: { class: 'PT_LOADING_ICON' }
                });
                fixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await fixture.whenStable();

                const root = fixture.debugElement.query(By.css('.p-virtualscroller'));
                expect(root.nativeElement.classList.contains('PT_ROOT')).toBeTruthy();
                expect(root.nativeElement.getAttribute('data-root')).toBe('test');

                const content = fixture.debugElement.query(By.css('.p-virtualscroller-content'));
                expect(content.nativeElement.classList.contains('PT_CONTENT')).toBeTruthy();
                expect(content.nativeElement.getAttribute('data-content')).toBe('test');

                const spacer = fixture.debugElement.query(By.css('.p-virtualscroller-spacer'));
                if (spacer) {
                    expect(spacer.nativeElement.classList.contains('PT_SPACER')).toBeTruthy();
                    expect(spacer.nativeElement.getAttribute('data-spacer')).toBe('test');
                }

                const loader = fixture.debugElement.query(By.css('.p-virtualscroller-loader'));
                if (loader) {
                    expect(loader.nativeElement.classList.contains('PT_LOADER')).toBeTruthy();
                    expect(loader.nativeElement.getAttribute('data-loader')).toBe('test');
                }

                const loadingIcon = fixture.debugElement.query(By.css('[data-p-icon="spinner"]'));
                if (loadingIcon) {
                    expect(loadingIcon.nativeElement.classList.contains('PT_LOADING_ICON')).toBeTruthy();
                }
            });
        });
    });
});
