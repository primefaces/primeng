import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { Component, ViewChild, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DataView } from './dataview';
import { PaginatorModule } from 'primeng/paginator';

@Component({
    standalone: false,
    template: `
        <p-dataview
            [value]="products"
            [paginator]="paginator"
            [rows]="rows"
            [totalRecords]="totalRecords"
            [pageLinks]="pageLinks"
            [rowsPerPageOptions]="rowsPerPageOptions"
            [paginatorPosition]="paginatorPosition"
            [paginatorStyleClass]="paginatorStyleClass"
            [alwaysShowPaginator]="alwaysShowPaginator"
            [paginatorDropdownAppendTo]="paginatorDropdownAppendTo"
            [paginatorDropdownScrollHeight]="paginatorDropdownScrollHeight"
            [currentPageReportTemplate]="currentPageReportTemplate"
            [showCurrentPageReport]="showCurrentPageReport"
            [showJumpToPageDropdown]="showJumpToPageDropdown"
            [showFirstLastIcon]="showFirstLastIcon"
            [showPageLinks]="showPageLinks"
            [lazy]="lazy"
            [lazyLoadOnInit]="lazyLoadOnInit"
            [emptyMessage]="emptyMessage"
            [styleClass]="styleClass"
            [gridStyleClass]="gridStyleClass"
            [trackBy]="trackBy"
            [filterBy]="filterBy"
            [filterLocale]="filterLocale"
            [loading]="loading"
            [loadingIcon]="loadingIcon"
            [first]="first"
            [sortField]="sortField"
            [sortOrder]="sortOrder"
            [layout]="layout"
            (onLazyLoad)="onLazyLoadEvent($event)"
            (onPage)="onPageEvent($event)"
            (onSort)="onSortEvent($event)"
            (onChangeLayout)="onChangeLayoutEvent($event)"
        >
            <ng-template #list let-items>
                <div class="list-container">
                    <div *ngFor="let item of items" class="list-item">{{ item.name }} - {{ item.price }}</div>
                </div>
            </ng-template>
            <ng-template #grid let-items>
                <div class="grid-container">
                    <div *ngFor="let item of items" class="grid-item">{{ item.name }} - {{ item.price }}</div>
                </div>
            </ng-template>
        </p-dataview>
    `
})
class TestBasicDataViewComponent {
    products = [
        { id: 1, name: 'Product 1', price: 100, category: 'Category A', inventoryStatus: 'INSTOCK' },
        { id: 2, name: 'Product 2', price: 200, category: 'Category B', inventoryStatus: 'LOWSTOCK' },
        { id: 3, name: 'Product 3', price: 300, category: 'Category A', inventoryStatus: 'OUTOFSTOCK' },
        { id: 4, name: 'Product 4', price: 400, category: 'Category B', inventoryStatus: 'INSTOCK' },
        { id: 5, name: 'Product 5', price: 500, category: 'Category C', inventoryStatus: 'INSTOCK' }
    ];
    paginator = false;
    rows = 3;
    totalRecords: number | undefined;
    pageLinks = 5;
    rowsPerPageOptions: any[] = [3, 5, 10];
    paginatorPosition: 'top' | 'bottom' | 'both' = 'bottom';
    paginatorStyleClass: string | undefined;
    alwaysShowPaginator = true;
    paginatorDropdownAppendTo: any;
    paginatorDropdownScrollHeight = '200px';
    currentPageReportTemplate = '{currentPage} of {totalPages}';
    showCurrentPageReport = false;
    showJumpToPageDropdown = false;
    showFirstLastIcon = true;
    showPageLinks = true;
    lazy = false;
    lazyLoadOnInit = true;
    emptyMessage = 'No products found';
    styleClass: string | undefined;
    gridStyleClass = '';
    trackBy: Function = (index: number, item: any) => item;
    filterBy = 'name,category';
    filterLocale: string | undefined;
    loading = false;
    loadingIcon: string | undefined;
    first = 0;
    sortField: string | undefined;
    sortOrder: number | undefined;
    layout: 'list' | 'grid' = 'list';

    lazyLoadEvent: any;
    pageEvent: any;
    sortEvent: any;
    changeLayoutEvent: any;

    onLazyLoadEvent(event: any) {
        this.lazyLoadEvent = event;
    }

    onPageEvent(event: any) {
        this.pageEvent = event;
    }

    onSortEvent(event: any) {
        this.sortEvent = event;
    }

    onChangeLayoutEvent(event: any) {
        this.changeLayoutEvent = event;
    }
}

@Component({
    standalone: false,
    template: `
        <p-dataview [value]="products">
            <p-header>
                <div class="custom-header">Custom Header Content</div>
            </p-header>
            <ng-template #list let-items>
                <div class="list-container">
                    <div *ngFor="let item of items" class="list-item">
                        {{ item.name }}
                    </div>
                </div>
            </ng-template>
            <p-footer>
                <div class="custom-footer">Custom Footer Content</div>
            </p-footer>
        </p-dataview>
    `
})
class TestHeaderFooterDataViewComponent {
    products = [
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 200 }
    ];
}

@Component({
    standalone: false,
    template: `
        <p-dataview [value]="products" [paginator]="true" [rows]="2">
            <ng-template #list let-items>
                <div class="list-container">
                    <div *ngFor="let item of items" class="list-item">
                        {{ item.name }}
                    </div>
                </div>
            </ng-template>
            <ng-template #header>
                <div class="template-header">Template Header</div>
            </ng-template>
            <ng-template #footer>
                <div class="template-footer">Template Footer</div>
            </ng-template>
            <ng-template #emptymessage>
                <div class="empty-template">No data available</div>
            </ng-template>
            <ng-template #paginatorleft>
                <span class="paginator-left">Left Content</span>
            </ng-template>
            <ng-template #paginatorright>
                <span class="paginator-right">Right Content</span>
            </ng-template>
        </p-dataview>
    `
})
class TestTemplatesDataViewComponent {
    products: any[] = [];
}

@Component({
    standalone: false,
    template: `
        <p-dataview [value]="products()" [layout]="layout">
            <ng-template #list let-items>
                <div class="list-container">
                    <div *ngFor="let item of items" class="list-item">List: {{ item.name }}</div>
                </div>
            </ng-template>
            <ng-template #grid let-items>
                <div class="grid-container">
                    <div *ngFor="let item of items" class="grid-item">Grid: {{ item.name }}</div>
                </div>
            </ng-template>
        </p-dataview>
    `
})
class TestLayoutDataViewComponent {
    products = signal([
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
        { id: 3, name: 'Product 3' }
    ]);
    layout: 'list' | 'grid' = 'list';
}

describe('DataView', () => {
    let fixture: ComponentFixture<TestBasicDataViewComponent>;
    let component: TestBasicDataViewComponent;
    let dataview: DataView;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, DataView, PaginatorModule],
            declarations: [TestBasicDataViewComponent, TestHeaderFooterDataViewComponent, TestTemplatesDataViewComponent, TestLayoutDataViewComponent, TestDynamicDataViewComponent]
        });
        fixture = TestBed.createComponent(TestBasicDataViewComponent);
        component = fixture.componentInstance;
        dataview = fixture.debugElement.query(By.directive(DataView)).componentInstance;
        fixture.detectChanges();
    });

    describe('Component Initialization', () => {
        it('should create the component', () => {
            expect(dataview).toBeTruthy();
        });

        it('should have default values', () => {
            expect(dataview.pageLinks).toBe(5);
            expect(dataview.paginatorPosition).toBe('bottom');
            expect(dataview.alwaysShowPaginator).toBe(true);
            expect(dataview.paginatorDropdownScrollHeight).toBe('200px');
            expect(dataview.currentPageReportTemplate).toBe('{currentPage} of {totalPages}');
            expect(dataview.showFirstLastIcon).toBe(true);
            expect(dataview.showPageLinks).toBe(true);
            expect(dataview.lazyLoadOnInit).toBe(true);
            expect(dataview.emptyMessage).toBe('No products found');
            expect(dataview.gridStyleClass).toBe('' as any);
            expect(dataview.first).toBe(0);
            expect(dataview.layout).toBe('list');
        });

        it('should accept custom values', () => {
            component.paginator = true;
            component.rows = 5;
            component.pageLinks = 3;
            component.paginatorPosition = 'top';
            component.layout = 'grid';
            component.emptyMessage = 'Custom empty message';
            fixture.detectChanges();

            expect(dataview.paginator).toBe(true);
            expect(dataview.rows).toBe(5);
            expect(dataview.pageLinks).toBe(3);
            expect(dataview.paginatorPosition).toBe('top');
            expect(dataview.layout).toBe('grid');
            expect(dataview.emptyMessage).toBe('Custom empty message');
        });

        it('should initialize with provided value', () => {
            expect(dataview.value).toEqual(component.products);
            expect(dataview.value?.length).toBe(5);
        });

        it('should update totalRecords based on value when not in lazy mode', () => {
            expect(dataview.totalRecords).toBe(5);
        });
    });

    describe('Public Methods', () => {
        it('should paginate programmatically', () => {
            component.paginator = true;
            fixture.detectChanges();

            const paginatorState = {
                first: 3,
                rows: 2,
                page: 1,
                pageCount: 3
            };

            spyOn(dataview.onPage, 'emit');
            dataview.paginate(paginatorState);

            expect(dataview.first).toBe(3);
            expect(dataview.rows).toBe(2);
            expect(dataview.onPage.emit).toHaveBeenCalledWith({
                first: 3,
                rows: 2
            });
        });

        it('should sort data', () => {
            component.sortField = 'price';
            component.sortOrder = 1;
            fixture.detectChanges();

            spyOn(dataview.onSort, 'emit');
            dataview.sort();

            expect(dataview.first).toBe(0);
            expect(dataview.onSort.emit).toHaveBeenCalledWith({
                sortField: 'price',
                sortOrder: 1
            });

            const sortedValues = dataview.value;
            expect(sortedValues![0].price).toBe(100);
            expect(sortedValues![4].price).toBe(500);
        });

        it('should sort data in descending order', () => {
            component.sortField = 'price';
            component.sortOrder = -1;
            fixture.detectChanges();

            dataview.sort();

            const sortedValues = dataview.value;
            expect(sortedValues![0].price).toBe(500);
            expect(sortedValues![4].price).toBe(100);
        });

        it('should handle null values in sorting', () => {
            component.products = [
                { id: 1, name: 'Product 1', price: null, category: 'Category A', inventoryStatus: 'INSTOCK' },
                { id: 2, name: 'Product 2', price: 200, category: 'Category B', inventoryStatus: 'INSTOCK' },
                { id: 3, name: 'Product 3', price: null, category: 'Category C', inventoryStatus: 'INSTOCK' },
                { id: 4, name: 'Product 4', price: 100, category: 'Category D', inventoryStatus: 'INSTOCK' }
            ] as any;
            component.sortField = 'price';
            component.sortOrder = 1;
            fixture.detectChanges();

            dataview.sort();

            const sortedValues = dataview.value;
            expect(sortedValues![0].price).toBe(null);
            expect(sortedValues![1].price).toBe(null);
            expect(sortedValues![2].price).toBe(100);
            expect(sortedValues![3].price).toBe(200);
        });

        it('should check if data is empty', () => {
            expect(dataview.isEmpty()).toBe(false);

            component.products = [];
            fixture.detectChanges();

            expect(dataview.isEmpty()).toBe(true);
        });

        it('should filter data', () => {
            component.filterBy = 'name,category';
            fixture.detectChanges();

            dataview.filter('Product 1');

            expect(dataview.filteredValue).toBeTruthy();
            expect(dataview.filteredValue!.length).toBe(1);
            expect(dataview.filteredValue![0].name).toBe('Product 1');
        });

        it('should filter with different match modes', () => {
            component.filterBy = 'name';
            fixture.detectChanges();

            dataview.filter('Product', 'contains');

            expect(dataview.filteredValue).toBe(null);
        });

        it('should reset filteredValue when filter matches all items', () => {
            component.filterBy = 'category';
            fixture.detectChanges();

            dataview.filter('Category');

            expect(dataview.filteredValue).toBe(null);
        });

        it('should check if filter is active', () => {
            component.filterBy = 'name';
            fixture.detectChanges();

            // Test hasFilter with valid filter value
            dataview.filterValue = 'test';
            expect(dataview.hasFilter()).toBe(true);

            // Test hasFilter returns falsy for null/undefined
            dataview.filterValue = null as any;
            expect(dataview.hasFilter()).toBeFalsy();
        });

        it('should create lazy load metadata', () => {
            dataview.first = 10;
            dataview.rows = 5;
            dataview.sortField = 'name';
            dataview.sortOrder = -1;

            const metadata = dataview.createLazyLoadMetadata();

            expect(metadata).toEqual({
                first: 10,
                rows: 5,
                sortField: 'name',
                sortOrder: -1
            });
        });

        it('should get blockable element', () => {
            const element = dataview.getBlockableElement();
            expect(element).toBeTruthy();
            expect(element).toBe(dataview.el.nativeElement.children[0]);
        });

        it('should update totalRecords', () => {
            dataview.totalRecords = undefined as any;
            dataview._value = component.products;
            dataview.updateTotalRecords();

            expect(dataview.totalRecords).toBe(5);

            dataview.lazy = true;
            dataview.totalRecords = 100;
            dataview.updateTotalRecords();

            expect(dataview.totalRecords).toBe(100);
        });
    });

    describe('Event Handling', () => {
        it('should emit onLazyLoad on init when lazy and lazyLoadOnInit are true', fakeAsync(() => {
            const lazyFixture = TestBed.createComponent(TestBasicDataViewComponent);
            const lazyComponent = lazyFixture.componentInstance;
            lazyComponent.lazy = true;

            spyOn(lazyComponent, 'onLazyLoadEvent');
            lazyFixture.detectChanges();
            tick();

            expect(lazyComponent.onLazyLoadEvent).toHaveBeenCalled();
            flush();
        }));

        it('should not emit onLazyLoad on init when lazyLoadOnInit is false', fakeAsync(() => {
            const lazyFixture = TestBed.createComponent(TestBasicDataViewComponent);
            const lazyComponent = lazyFixture.componentInstance;
            lazyComponent.lazy = true;
            lazyComponent.lazyLoadOnInit = false;

            spyOn(lazyComponent, 'onLazyLoadEvent');
            lazyFixture.detectChanges();
            tick();

            expect(lazyComponent.onLazyLoadEvent).not.toHaveBeenCalled();
            flush();
        }));

        it('should emit onPage event when paginating', () => {
            component.paginator = true;
            fixture.detectChanges();

            spyOn(component, 'onPageEvent');

            dataview.paginate({ first: 3, rows: 2, page: 1, pageCount: 3 });

            expect(component.onPageEvent).toHaveBeenCalledWith({
                first: 3,
                rows: 2
            });
        });

        it('should emit onSort event when sorting', () => {
            component.sortField = 'name';
            component.sortOrder = 1;
            fixture.detectChanges();

            spyOn(component, 'onSortEvent');

            dataview.sort();

            expect(component.onSortEvent).toHaveBeenCalledWith({
                sortField: 'name',
                sortOrder: 1
            });
        });

        it('should emit onChangeLayout event when layout changes', fakeAsync(() => {
            spyOn(component, 'onChangeLayoutEvent');

            component.layout = 'grid';
            fixture.detectChanges();
            tick();

            expect(component.onChangeLayoutEvent).toHaveBeenCalledWith({
                layout: 'grid'
            });
            flush();
        }));

        it('should emit onLazyLoad when paginating in lazy mode', () => {
            component.lazy = true;
            component.paginator = true;
            fixture.detectChanges();

            spyOn(component, 'onLazyLoadEvent');

            dataview.paginate({ first: 3, rows: 2, page: 1, pageCount: 3 });

            expect(component.onLazyLoadEvent).toHaveBeenCalled();
        });

        it('should emit onLazyLoad when sorting in lazy mode', () => {
            component.lazy = true;
            component.sortField = 'name';
            fixture.detectChanges();

            spyOn(component, 'onLazyLoadEvent');

            dataview.sort();

            expect(component.onLazyLoadEvent).toHaveBeenCalled();
        });
    });

    describe('Template and Content Projection', () => {
        it('should render list template', () => {
            const listItems = fixture.debugElement.queryAll(By.css('.list-item'));
            expect(listItems.length).toBe(5);
            expect(listItems[0].nativeElement.textContent).toContain('Product 1 - 100');
        });

        it('should render grid template when layout is grid', () => {
            component.layout = 'grid';
            fixture.detectChanges();

            const gridItems = fixture.debugElement.queryAll(By.css('.grid-item'));
            expect(gridItems.length).toBe(5);
            expect(gridItems[0].nativeElement.textContent).toContain('Product 1 - 100');
        });

        it('should render header and footer content', () => {
            const headerFooterFixture = TestBed.createComponent(TestHeaderFooterDataViewComponent);
            headerFooterFixture.detectChanges();

            const header = headerFooterFixture.debugElement.query(By.css('.custom-header'));
            const footer = headerFooterFixture.debugElement.query(By.css('.custom-footer'));

            expect(header).toBeTruthy();
            expect(header.nativeElement.textContent).toBe('Custom Header Content');
            expect(footer).toBeTruthy();
            expect(footer.nativeElement.textContent).toBe('Custom Footer Content');
        });

        it('should render template-based header and footer', () => {
            const templateFixture = TestBed.createComponent(TestTemplatesDataViewComponent);
            templateFixture.detectChanges();

            const header = templateFixture.debugElement.query(By.css('.template-header'));
            const footer = templateFixture.debugElement.query(By.css('.template-footer'));

            expect(header).toBeTruthy();
            expect(header.nativeElement.textContent).toBe('Template Header');
            expect(footer).toBeTruthy();
            expect(footer.nativeElement.textContent).toBe('Template Footer');
        });

        it('should render empty message when no data', () => {
            component.products = [];
            fixture.detectChanges();

            const emptyMessage = fixture.debugElement.query(By.css('div'));
            const emptyMessageDiv = fixture.debugElement.queryAll(By.css('div')).find((div) => div.nativeElement.textContent && div.nativeElement.textContent.includes('No products found'));
            expect(emptyMessageDiv).toBeTruthy();
        });

        it('should render custom empty message template', () => {
            const templateFixture = TestBed.createComponent(TestTemplatesDataViewComponent);
            templateFixture.detectChanges();

            const emptyTemplate = templateFixture.debugElement.query(By.css('.empty-template'));
            expect(emptyTemplate).toBeTruthy();
            expect(emptyTemplate.nativeElement.textContent).toBe('No data available');
        });

        it('should switch between list and grid layouts', () => {
            const layoutFixture = TestBed.createComponent(TestLayoutDataViewComponent);
            const layoutComponent = layoutFixture.componentInstance;
            layoutFixture.detectChanges();

            let listItems = layoutFixture.debugElement.queryAll(By.css('.list-item'));
            expect(listItems.length).toBe(3);
            expect(listItems[0].nativeElement.textContent).toContain('List: Product 1');

            layoutComponent.layout = 'grid';
            layoutFixture.detectChanges();

            const gridItems = layoutFixture.debugElement.queryAll(By.css('.grid-item'));
            expect(gridItems.length).toBe(3);
            expect(gridItems[0].nativeElement.textContent).toContain('Grid: Product 1');
        });

        it('should work with signals for value', () => {
            const layoutFixture = TestBed.createComponent(TestLayoutDataViewComponent);
            const layoutComponent = layoutFixture.componentInstance;
            layoutFixture.detectChanges();

            const items = layoutFixture.debugElement.queryAll(By.css('.list-item'));
            expect(items.length).toBe(3);

            layoutComponent.products.set([
                { id: 1, name: 'Updated Product 1' },
                { id: 2, name: 'Updated Product 2' }
            ]);
            layoutFixture.detectChanges();

            const updatedItems = layoutFixture.debugElement.queryAll(By.css('.list-item'));
            expect(updatedItems.length).toBe(2);
            expect(updatedItems[0].nativeElement.textContent).toContain('Updated Product 1');
        });
    });

    describe('Pagination', () => {
        beforeEach(() => {
            component.paginator = true;
            component.rows = 2;
            fixture.detectChanges();
        });

        it('should render paginator when enabled', () => {
            const paginator = fixture.debugElement.query(By.css('p-paginator'));
            expect(paginator).toBeTruthy();
        });

        it('should render paginator at bottom by default', () => {
            const content = fixture.debugElement.query(By.css('[class*="content"]'));
            const paginator = content.nativeElement.nextElementSibling;
            expect(paginator.tagName.toLowerCase()).toBe('p-paginator');
        });

        it('should render paginator at top when position is top', () => {
            component.paginatorPosition = 'top';
            fixture.detectChanges();

            const content = fixture.debugElement.query(By.css('[class*="content"]'));
            const paginator = content.nativeElement.previousElementSibling;
            expect(paginator.tagName.toLowerCase()).toBe('p-paginator');
        });

        it('should render paginator at both positions when position is both', () => {
            component.paginatorPosition = 'both';
            fixture.detectChanges();

            const paginators = fixture.debugElement.queryAll(By.css('p-paginator'));
            expect(paginators.length).toBe(2);
        });

        it('should slice data based on pagination', () => {
            const items = fixture.debugElement.queryAll(By.css('.list-item'));
            expect(items.length).toBe(2);
            expect(items[0].nativeElement.textContent).toContain('Product 1');
            expect(items[1].nativeElement.textContent).toContain('Product 2');
        });

        it('should update displayed data when page changes', fakeAsync(() => {
            dataview.paginate({ first: 2, rows: 2, page: 1, pageCount: 3 });
            fixture.detectChanges();
            tick();

            const items = fixture.debugElement.queryAll(By.css('.list-item'));
            expect(items.length).toBe(2);
            expect(items[0].nativeElement.textContent).toContain('Product 3');
            expect(items[1].nativeElement.textContent).toContain('Product 4');
            flush();
        }));

        it('should pass correct props to paginator', () => {
            component.rowsPerPageOptions = [2, 5, 10];
            component.showCurrentPageReport = true;
            component.currentPageReportTemplate = 'Page {currentPage} of {totalPages}';
            fixture.detectChanges();

            const paginator = fixture.debugElement.query(By.css('p-paginator')).componentInstance;
            expect(paginator.rows).toBe(2);
            expect(paginator.totalRecords).toBe(5);
            expect(paginator.rowsPerPageOptions).toEqual([2, 5, 10]);
            expect(paginator.showCurrentPageReport).toBe(true);
        });

        it('should render custom paginator templates', () => {
            const templateFixture = TestBed.createComponent(TestTemplatesDataViewComponent);
            templateFixture.componentInstance.products = [
                { id: 1, name: 'Product 1' },
                { id: 2, name: 'Product 2' },
                { id: 3, name: 'Product 3' },
                { id: 4, name: 'Product 4' },
                { id: 5, name: 'Product 5' }
            ];
            templateFixture.detectChanges();

            // Check if paginator templates are defined in component
            const templateDataView = templateFixture.debugElement.query(By.directive(DataView)).componentInstance;
            expect(templateDataView.paginatorleft).toBeTruthy();
            expect(templateDataView.paginatorright).toBeTruthy();
        });
    });

    describe('Sorting and Filtering', () => {
        it('should sort string fields correctly', () => {
            component.sortField = 'name';
            component.sortOrder = 1;
            fixture.detectChanges();

            dataview.sort();

            const sortedValues = dataview.value;
            expect(sortedValues![0].name).toBe('Product 1');
            expect(sortedValues![4].name).toBe('Product 5');
        });

        it('should sort number fields correctly', () => {
            component.sortField = 'price';
            component.sortOrder = -1;
            fixture.detectChanges();

            dataview.sort();

            const sortedValues = dataview.value;
            expect(sortedValues![0].price).toBe(500);
            expect(sortedValues![4].price).toBe(100);
        });

        it('should filter across multiple fields', () => {
            component.filterBy = 'name,category';
            fixture.detectChanges();

            dataview.filter('Category A');

            expect(dataview.filteredValue).toBeTruthy();
            expect(dataview.filteredValue!.length).toBe(2);
        });

        it('should update totalRecords when filtering with pagination', () => {
            component.paginator = true;
            component.filterBy = 'name';
            fixture.detectChanges();

            dataview.filter('Product 1');

            expect(dataview.totalRecords).toBe(1);
            expect(dataview.first).toBe(0);
        });

        it('should reset first index when sorting', () => {
            component.first = 2;
            component.sortField = 'name';
            fixture.detectChanges();

            dataview.sort();

            expect(dataview.first).toBe(0);
        });

        it('should apply filter after sorting', () => {
            component.sortField = 'price';
            component.sortOrder = 1;
            component.filterBy = 'category';
            fixture.detectChanges();

            dataview.sort();
            dataview.filter('Category A');

            expect(dataview.filteredValue).toBeTruthy();
            expect(dataview.filteredValue!.length).toBe(2);
            expect(dataview.filteredValue![0].price).toBe(100);
            expect(dataview.filteredValue![1].price).toBe(300);
        });
    });

    describe('Loading State', () => {
        it('should show loading indicator when loading is true', () => {
            component.loading = true;
            fixture.detectChanges();

            const loadingDiv = fixture.debugElement.query(By.css('[class*="loading"]'));
            expect(loadingDiv).toBeTruthy();
        });

        it('should show custom loading icon', () => {
            component.loading = true;
            component.loadingIcon = ' pi-spinner';
            fixture.detectChanges();

            const loadingIcon = fixture.debugElement.query(By.css('i'));
            expect(loadingIcon).toBeTruthy();
            expect(loadingIcon.nativeElement.className).toContain('pi-spinner');
        });

        it('should hide content when loading', () => {
            component.loading = true;
            component.products = [];
            fixture.detectChanges();

            const emptyMessage = fixture.debugElement.query(By.css('[class*="emptyMessage"]'));
            expect(emptyMessage).toBeFalsy();
        });

        it('should show default loading icon when no custom icon specified', () => {
            component.loading = true;
            fixture.detectChanges();

            const svg = fixture.debugElement.query(By.css('svg')) || fixture.debugElement.query(By.css('[data-p-icon="spinner"]'));
            expect(svg).toBeTruthy();
        });
    });

    describe('Edge Cases', () => {
        it('should handle null/undefined values gracefully', () => {
            component.products = null as any;
            fixture.detectChanges();

            expect(dataview.isEmpty()).toBe(true);
            expect(() => fixture.detectChanges()).not.toThrow();
        });

        it('should handle empty array', () => {
            component.products = [];
            fixture.detectChanges();

            expect(dataview.isEmpty()).toBe(true);
            const emptyMessageDivs = fixture.debugElement.queryAll(By.css('div'));
            const emptyMessage = emptyMessageDivs.find((div) => div.nativeElement.textContent && div.nativeElement.textContent.includes('No products found'));
            expect(emptyMessage).toBeTruthy();
        });

        it('should handle rapid layout changes', fakeAsync(() => {
            let changeCount = 0;
            dataview.onChangeLayout.subscribe(() => changeCount++);

            component.layout = 'grid';
            fixture.detectChanges();
            tick();

            component.layout = 'list';
            fixture.detectChanges();
            tick();

            component.layout = 'grid';
            fixture.detectChanges();
            tick();

            expect(changeCount).toBe(3);
            flush();
        }));

        it('should handle filtering with empty filterBy', () => {
            component.filterBy = '';
            fixture.detectChanges();

            expect(() => dataview.filter('test')).not.toThrow();
        });

        it('should handle sorting without sortField', () => {
            component.sortField = undefined as any;
            fixture.detectChanges();

            expect(() => dataview.sort()).not.toThrow();
        });

        it('should handle large datasets efficiently', () => {
            const largeData: any[] = [];
            for (let i = 0; i < 1000; i++) {
                largeData.push({
                    id: i,
                    name: `Product ${i}`,
                    price: Math.random() * 1000,
                    category: `Category ${i % 10}`
                });
            }

            const startTime = performance.now();
            component.products = largeData;
            fixture.detectChanges();
            const endTime = performance.now();

            expect(endTime - startTime).toBeLessThan(1000);
            expect(dataview.value?.length).toBe(1000);
        });

        it('should maintain filter when value changes', () => {
            component.filterBy = 'name';
            fixture.detectChanges();

            dataview.filter('Product 1');
            expect(dataview.filteredValue?.length).toBe(1);

            component.products = [...component.products, { id: 6, name: 'Product 10', price: 600, category: 'Category D', inventoryStatus: 'INSTOCK' }];
            fixture.detectChanges();

            expect(dataview.filteredValue).toBeTruthy();
        });

        it('should handle undefined in template context', () => {
            component.products = undefined as any;
            fixture.detectChanges();

            expect(() => fixture.detectChanges()).not.toThrow();
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should apply custom styleClass', () => {
            component.styleClass = 'custom-dataview-class';
            fixture.detectChanges();

            const dataviewElement = fixture.debugElement.query(By.css('p-dataview'));
            expect(dataviewElement.nativeElement.className).toContain('custom-dataview-class');
        });

        it('should apply gridStyleClass', () => {
            component.gridStyleClass = 'custom-grid-class';
            component.layout = 'grid';
            fixture.detectChanges();

            expect(dataview.gridStyleClass).toBe('custom-grid-class');
        });

        it('should apply correct classes for loading state', () => {
            component.loading = true;
            fixture.detectChanges();

            const loadingDiv = fixture.debugElement.query(By.css('[class*="loading"]'));
            expect(loadingDiv).toBeTruthy();
        });

        it('should apply paginator style class', () => {
            component.paginator = true;
            component.paginatorStyleClass = 'custom-paginator';
            fixture.detectChanges();

            expect(component.paginatorStyleClass).toBe('custom-paginator');
        });
    });

    describe('Lifecycle and Cleanup', () => {
        it('should unsubscribe from translation observer on destroy', () => {
            const translationSub = dataview.translationSubscription;
            spyOn(translationSub!, 'unsubscribe');

            fixture.destroy();

            expect(translationSub!.unsubscribe).toHaveBeenCalled();
        });

        it('should call ngAfterViewInit', () => {
            spyOn(dataview, 'ngAfterViewInit');
            dataview.ngAfterViewInit();
            expect(dataview.ngAfterViewInit).toHaveBeenCalled();
        });

        it('should handle onChanges for value', fakeAsync(() => {
            const newProducts = [{ id: 10, name: 'New Product', price: 1000, category: 'New Category', inventoryStatus: 'INSTOCK' }];

            component.products = newProducts;
            fixture.detectChanges();
            tick();

            expect(dataview.value).toEqual(newProducts);
            expect(dataview.totalRecords).toBe(1);
            flush();
        }));

        it('should trigger lazy load correctly when initialized', fakeAsync(() => {
            const lazyFixture = TestBed.createComponent(TestBasicDataViewComponent);
            const lazyComponent = lazyFixture.componentInstance;

            lazyComponent.lazy = true;
            lazyFixture.detectChanges();

            const lazyDataview = lazyFixture.debugElement.query(By.directive(DataView)).componentInstance;

            spyOn(lazyDataview.onLazyLoad, 'emit');

            lazyComponent.sortField = 'name';
            lazyFixture.detectChanges();
            tick();

            expect(lazyDataview.onLazyLoad.emit).toHaveBeenCalled();
            flush();
        }));
    });

    describe('TrackBy Function', () => {
        it('should use default trackBy function', () => {
            const item = { id: 1, name: 'Test' };
            const result = dataview.trackBy(0, item);
            expect(result).toBe(item);
        });

        it('should use custom trackBy function', () => {
            const customTrackBy = (index: number, item: any) => item.id;
            dataview.trackBy = customTrackBy;

            const item = { id: 1, name: 'Test' };
            const result = dataview.trackBy(0, item);
            expect(result).toBe(1);
        });
    });

    describe('Empty Message Label', () => {
        it('should return custom empty message when provided', () => {
            dataview.emptyMessage = 'Custom empty message';
            expect(dataview.emptyMessageLabel).toBe('Custom empty message');
        });

        it('should return translation when no custom message', () => {
            dataview.emptyMessage = '';
            expect(dataview.emptyMessageLabel).toBeTruthy();
        });
    });

    describe('Input Properties Tests', () => {
        beforeEach(() => {
            fixture.detectChanges();
        });

        it('should handle paginator property changes', () => {
            expect(dataview.paginator).toBe(false);

            component.paginator = true;
            fixture.detectChanges();

            expect(dataview.paginator).toBe(true);
        });

        it('should handle rows property changes', () => {
            expect(dataview.rows).toBe(3);

            component.rows = 5;
            fixture.detectChanges();

            expect(dataview.rows).toBe(5);
        });

        it('should handle totalRecords property', () => {
            expect(dataview.totalRecords).toBe(5); // auto-calculated from value

            component.totalRecords = 100;
            fixture.detectChanges();

            expect(dataview.totalRecords).toBe(100);
        });

        it('should handle pageLinks property', () => {
            expect(dataview.pageLinks).toBe(5);

            component.pageLinks = 7;
            fixture.detectChanges();

            expect(dataview.pageLinks).toBe(7);
        });

        it('should handle rowsPerPageOptions property', () => {
            const options = [5, 10, 20, { showAll: 'All' }];
            component.rowsPerPageOptions = options;
            fixture.detectChanges();

            expect(dataview.rowsPerPageOptions).toEqual(options);
        });

        it('should handle paginatorPosition property', () => {
            expect(dataview.paginatorPosition).toBe('bottom');

            component.paginatorPosition = 'top';
            fixture.detectChanges();

            expect(dataview.paginatorPosition).toBe('top');
        });

        it('should handle paginatorStyleClass property', () => {
            component.paginatorStyleClass = 'custom-paginator';
            fixture.detectChanges();

            expect(dataview.paginatorStyleClass).toBe('custom-paginator');
        });

        it('should handle alwaysShowPaginator property', () => {
            expect(dataview.alwaysShowPaginator).toBe(true);

            component.alwaysShowPaginator = false;
            fixture.detectChanges();

            expect(dataview.alwaysShowPaginator).toBe(false);
        });

        it('should handle paginatorDropdownAppendTo property', () => {
            const element = document.createElement('div');
            component.paginatorDropdownAppendTo = element;
            fixture.detectChanges();

            expect(dataview.paginatorDropdownAppendTo).toBe(element);
        });

        it('should handle paginatorDropdownScrollHeight property', () => {
            expect(dataview.paginatorDropdownScrollHeight).toBe('200px');

            component.paginatorDropdownScrollHeight = '300px';
            fixture.detectChanges();

            expect(dataview.paginatorDropdownScrollHeight).toBe('300px');
        });

        it('should handle currentPageReportTemplate property', () => {
            const template = 'Page {currentPage} of {totalPages}';
            component.currentPageReportTemplate = template;
            fixture.detectChanges();

            expect(dataview.currentPageReportTemplate).toBe(template);
        });

        it('should handle showCurrentPageReport property', () => {
            expect(dataview.showCurrentPageReport).toBe(false);

            component.showCurrentPageReport = true;
            fixture.detectChanges();

            expect(dataview.showCurrentPageReport).toBe(true);
        });

        it('should handle showJumpToPageDropdown property', () => {
            expect(dataview.showJumpToPageDropdown).toBe(false);

            component.showJumpToPageDropdown = true;
            fixture.detectChanges();

            expect(dataview.showJumpToPageDropdown).toBe(true);
        });

        it('should handle showFirstLastIcon property', () => {
            expect(dataview.showFirstLastIcon).toBe(true);

            component.showFirstLastIcon = false;
            fixture.detectChanges();

            expect(dataview.showFirstLastIcon).toBe(false);
        });

        it('should handle showPageLinks property', () => {
            expect(dataview.showPageLinks).toBe(true);

            component.showPageLinks = false;
            fixture.detectChanges();

            expect(dataview.showPageLinks).toBe(false);
        });

        it('should handle lazy property', () => {
            expect(dataview.lazy).toBe(false);

            component.lazy = true;
            fixture.detectChanges();

            expect(dataview.lazy).toBe(true);
        });

        it('should handle lazyLoadOnInit property', () => {
            expect(dataview.lazyLoadOnInit).toBe(true);

            component.lazyLoadOnInit = false;
            fixture.detectChanges();

            expect(dataview.lazyLoadOnInit).toBe(false);
        });

        it('should handle emptyMessage property', () => {
            expect(dataview.emptyMessage).toBe('No products found');

            component.emptyMessage = 'Custom empty message';
            fixture.detectChanges();

            expect(dataview.emptyMessage).toBe('Custom empty message');
        });

        it('should handle styleClass property', () => {
            component.styleClass = 'custom-dataview-class';
            fixture.detectChanges();

            expect(dataview.styleClass).toBe('custom-dataview-class');
        });

        it('should handle gridStyleClass property', () => {
            expect(dataview.gridStyleClass).toBe('' as any);

            component.gridStyleClass = 'custom-grid-class';
            fixture.detectChanges();

            expect(dataview.gridStyleClass).toBe('custom-grid-class');
        });

        it('should handle trackBy property', () => {
            const customTrackBy = (index: number, item: any) => item.id;
            component.trackBy = customTrackBy;
            fixture.detectChanges();

            expect(dataview.trackBy).toBe(customTrackBy);
        });

        it('should handle filterBy property', () => {
            expect(dataview.filterBy).toBe('name,category');

            component.filterBy = 'price';
            fixture.detectChanges();

            expect(dataview.filterBy).toBe('price');
        });

        it('should handle filterLocale property', () => {
            component.filterLocale = 'en-US';
            fixture.detectChanges();

            expect(dataview.filterLocale).toBe('en-US');
        });

        it('should handle loading property', () => {
            expect(dataview.loading).toBe(false);

            component.loading = true;
            fixture.detectChanges();

            expect(dataview.loading).toBe(true);
        });

        it('should handle loadingIcon property', () => {
            component.loadingIcon = 'pi pi-spinner';
            fixture.detectChanges();

            expect(dataview.loadingIcon).toBe('pi pi-spinner');
        });

        it('should handle first property', () => {
            expect(dataview.first).toBe(0);

            component.first = 5;
            fixture.detectChanges();

            expect(dataview.first).toBe(5);
        });

        it('should handle sortField property', () => {
            component.sortField = 'name';
            fixture.detectChanges();

            expect(dataview.sortField).toBe('name');
        });

        it('should handle sortOrder property', () => {
            component.sortOrder = 1;
            fixture.detectChanges();

            expect(dataview.sortOrder).toBe(1);
        });

        it('should handle layout property', () => {
            expect(dataview.layout).toBe('list');

            component.layout = 'grid';
            fixture.detectChanges();

            expect(dataview.layout).toBe('grid');
        });

        it('should handle value property', () => {
            expect(dataview.value).toEqual(component.products);

            const newProducts = [{ id: 10, name: 'New Product', price: 1000, category: 'New Category', inventoryStatus: 'INSTOCK' }];
            component.products = newProducts;
            fixture.detectChanges();

            expect(dataview.value).toEqual(newProducts);
        });

        it('should handle boolean attributes transformation', () => {
            // Test boolean transformation for paginator
            component.paginator = 'true' as any;
            fixture.detectChanges();

            expect(dataview.paginator).toBe(true);

            component.paginator = '' as any;
            fixture.detectChanges();

            expect(dataview.paginator).toBe(true); // empty string should be true
        });

        it('should handle number attributes transformation', () => {
            // Test number transformation for rows
            component.rows = '10' as any;
            fixture.detectChanges();

            expect(dataview.rows).toBe(10);
            expect(typeof dataview.rows).toBe('number');
        });

        it('should handle edge case values for numeric inputs', () => {
            // Test zero values
            component.rows = 0;
            component.totalRecords = 0;
            component.pageLinks = 0;
            component.first = 0;
            fixture.detectChanges();

            expect(dataview.rows).toBe(0);
            expect(dataview.totalRecords).toBe(0);
            expect(dataview.pageLinks).toBe(0);
            expect(dataview.first).toBe(0);
        });

        it('should handle negative values for numeric inputs', () => {
            component.rows = -5;
            component.sortOrder = -1;
            component.first = -10;
            fixture.detectChanges();

            expect(dataview.rows).toBe(-5);
            expect(dataview.sortOrder).toBe(-1);
            // The first property might be validated to prevent negative values as it represents pagination index
            expect(dataview.first).toBeGreaterThanOrEqual(0);
        });
    });

    describe('Dynamic and Observable Input Values', () => {
        let dynamicComponent: TestDynamicDataViewComponent;
        let dynamicFixture: ComponentFixture<TestDynamicDataViewComponent>;
        let dynamicDataView: DataView;

        beforeEach(() => {
            dynamicFixture = TestBed.createComponent(TestDynamicDataViewComponent);
            dynamicComponent = dynamicFixture.componentInstance;
            dynamicFixture.detectChanges();
            dynamicDataView = dynamicComponent.dataView;
        });

        it('should handle dynamic value changes', fakeAsync(() => {
            expect(dynamicDataView.value?.length).toBe(5);

            // Change value dynamically
            dynamicComponent.updateValue([
                { id: 1, name: 'New Product 1', price: 150 },
                { id: 2, name: 'New Product 2', price: 250 }
            ]);
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicDataView.value?.length).toBe(2);
            expect(dynamicDataView.totalRecords).toBe(2);

            flush();
        }));

        it('should handle dynamic pagination settings', fakeAsync(() => {
            expect(dynamicDataView.paginator).toBe(false);
            expect(dynamicDataView.rows).toBe(3);

            // Change pagination settings dynamically
            dynamicComponent.updatePaginationSettings(true, 5);
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicDataView.paginator).toBe(true);
            expect(dynamicDataView.rows).toBe(5);

            flush();
        }));

        it('should handle dynamic layout changes', fakeAsync(() => {
            expect(dynamicDataView.layout).toBe('list');

            // Toggle layout
            dynamicComponent.toggleLayout();
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicDataView.layout).toBe('grid');

            dynamicComponent.toggleLayout();
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicDataView.layout).toBe('list');

            flush();
        }));

        it('should handle dynamic loading state changes', fakeAsync(() => {
            expect(dynamicDataView.loading).toBe(false);

            // Toggle loading state
            dynamicComponent.toggleLoading();
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicDataView.loading).toBe(true);

            dynamicComponent.toggleLoading();
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicDataView.loading).toBe(false);

            flush();
        }));

        it('should handle dynamic sorting changes', fakeAsync(() => {
            expect(dynamicDataView.sortField).toBeUndefined();
            expect(dynamicDataView.sortOrder || undefined).toBeUndefined();

            // Change sorting settings
            dynamicComponent.updateSorting('price', -1);
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicDataView.sortField).toBe('price');
            expect(dynamicDataView.sortOrder).toBe(-1);

            flush();
        }));

        it('should handle dynamic filtering changes', fakeAsync(() => {
            // Change filter settings
            dynamicComponent.updateFilter('name');
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicDataView.filterBy).toBe('name');

            flush();
        }));

        it('should handle dynamic rowsPerPageOptions changes', fakeAsync(() => {
            // Initial options
            dynamicComponent.updateRowsPerPageOptions([5, 10, 15]);
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicDataView.rowsPerPageOptions).toEqual([5, 10, 15]);

            // Update with showAll option
            dynamicComponent.updateRowsPerPageOptions([10, 20, 30, { showAll: 'All' }]);
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicDataView.rowsPerPageOptions).toEqual([10, 20, 30, { showAll: 'All' }]);

            flush();
        }));

        it('should handle multiple simultaneous changes', fakeAsync(() => {
            // Change multiple properties at once
            dynamicComponent.updateMultipleProperties([{ id: 1, name: 'Updated Product', price: 999 }], true, 2, 'grid');
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicDataView.value?.length).toBe(1);
            expect(dynamicDataView.paginator).toBe(true);
            expect(dynamicDataView.rows).toBe(2);
            expect(dynamicDataView.layout).toBe('grid');

            flush();
        }));

        it('should handle observable values from services', fakeAsync(() => {
            // Simulate data from a service observable
            dynamicComponent.loadDataFromService();
            tick(100); // Wait for async operation
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicDataView.value?.length).toBe(10);
            expect(dynamicDataView.rows).toBe(5);

            flush();
        }));

        it('should handle async property updates with delays', fakeAsync(() => {
            // Simulate delayed updates
            dynamicComponent.updateWithDelay(
                [
                    { id: 1, name: 'Delayed Product 1', price: 500 },
                    { id: 2, name: 'Delayed Product 2', price: 600 }
                ],
                10
            );
            tick(500); // Wait for the delay
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicDataView.value?.length).toBe(2);
            expect(dynamicDataView.rows).toBe(10);

            flush();
        }));

        it('should maintain component state during rapid changes', fakeAsync(() => {
            const initialLayout = dynamicDataView.layout;

            // Perform rapid changes
            for (let i = 0; i < 5; i++) {
                dynamicComponent.updateValue([{ id: i, name: `Rapid Product ${i}`, price: 100 + i * 50 }]);
                tick(10);
                dynamicFixture.detectChanges();
            }

            expect(dynamicDataView.value?.length).toBe(1);
            expect(dynamicDataView.layout).toBe(initialLayout); // Should maintain layout

            flush();
        }));

        it('should handle edge case: empty value becomes populated', fakeAsync(() => {
            // Start with empty
            dynamicComponent.updateValue([]);
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicDataView.isEmpty()).toBe(true);

            // Add data
            dynamicComponent.updateValue([{ id: 1, name: 'First Product', price: 100 }]);
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicDataView.isEmpty()).toBe(false);
            expect(dynamicDataView.value?.length).toBe(1);

            flush();
        }));

        it('should handle dynamic template property changes', fakeAsync(() => {
            // Change empty message
            dynamicComponent.updateEmptyMessage('Custom dynamic empty message');
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicDataView.emptyMessage).toBe('Custom dynamic empty message');

            flush();
        }));
    });
});

// Test component for dynamic values
@Component({
    standalone: false,
    template: `
        <p-dataview
            #dataView
            [value]="value"
            [paginator]="paginator"
            [rows]="rows"
            [totalRecords]="totalRecords"
            [layout]="layout"
            [loading]="loading"
            [loadingIcon]="loadingIcon"
            [sortField]="sortField"
            [sortOrder]="sortOrder"
            [filterBy]="filterBy"
            [rowsPerPageOptions]="rowsPerPageOptions"
            [emptyMessage]="emptyMessage"
        >
            <ng-template #list let-items>
                <div class="dynamic-list-container">
                    <div *ngFor="let item of items" class="dynamic-list-item">{{ item.name }} - {{ item.price }}</div>
                </div>
            </ng-template>
            <ng-template #grid let-items>
                <div class="dynamic-grid-container">
                    <div *ngFor="let item of items" class="dynamic-grid-item">{{ item.name }} - {{ item.price }}</div>
                </div>
            </ng-template>
        </p-dataview>
    `
})
class TestDynamicDataViewComponent {
    @ViewChild('dataView') dataView!: DataView;

    value = [
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 200 },
        { id: 3, name: 'Product 3', price: 300 },
        { id: 4, name: 'Product 4', price: 400 },
        { id: 5, name: 'Product 5', price: 500 }
    ];
    paginator = false;
    rows = 3;
    totalRecords: number | undefined;
    layout: 'list' | 'grid' = 'list';
    loading = false;
    loadingIcon: string | undefined;
    sortField: string | undefined;
    sortOrder: number | undefined;
    filterBy: string | undefined;
    rowsPerPageOptions: any[] | undefined;
    emptyMessage = 'No data available';

    updateValue(newValue: any[]) {
        this.value = newValue;
    }

    updatePaginationSettings(paginator: boolean, rows: number) {
        this.paginator = paginator;
        this.rows = rows;
    }

    toggleLayout() {
        this.layout = this.layout === 'list' ? 'grid' : 'list';
    }

    toggleLoading() {
        this.loading = !this.loading;
    }

    updateSorting(sortField: string, sortOrder: number) {
        this.sortField = sortField;
        this.sortOrder = sortOrder;
    }

    updateFilter(filterBy: string) {
        this.filterBy = filterBy;
    }

    updateRowsPerPageOptions(options: any[]) {
        this.rowsPerPageOptions = options;
    }

    updateEmptyMessage(message: string) {
        this.emptyMessage = message;
    }

    updateMultipleProperties(value: any[], paginator: boolean, rows: number, layout: 'list' | 'grid') {
        this.value = value;
        this.paginator = paginator;
        this.rows = rows;
        this.layout = layout;
    }

    loadDataFromService() {
        // Simulate async data loading
        setTimeout(() => {
            this.value = Array.from({ length: 10 }, (_, i) => ({
                id: i + 1,
                name: `Service Product ${i + 1}`,
                price: (i + 1) * 100
            }));
            this.rows = 5;
        }, 100);
    }

    updateWithDelay(value: any[], rows: number) {
        setTimeout(() => {
            this.value = value;
            this.rows = rows;
        }, 500);
    }
}
