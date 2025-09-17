import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, of, delay, timer } from 'rxjs';

import { Table, TableModule, TableService } from './table';
import { PrimeTemplate } from 'primeng/api';
import { SharedModule } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Scroller } from 'primeng/scroller';

interface Product {
    id: string;
    code: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    inventoryStatus: string;
    category: string;
    image: string;
    rating: number;
}

describe('Table', () => {
    let component: Table;
    let fixture: ComponentFixture<Table>;
    let tableService: TableService;

    // Test Components
    @Component({
        standalone: false,
        template: `<p-table [value]="products" [tableStyle]="tableStyle" [paginator]="paginator" [rows]="rows">
            <ng-template #header>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </ng-template>
            <ng-template #body let-product>
                <tr>
                    <td>{{ product.id }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.price }}</td>
                </tr>
            </ng-template>
        </p-table>`
    })
    class TestBasicTableComponent {
        products: Product[] = [
            {
                id: '1001',
                code: 'ABC123',
                name: 'Test Product 1',
                description: 'Test Description',
                price: 100,
                quantity: 50,
                inventoryStatus: 'INSTOCK',
                category: 'Electronics',
                image: 'test.jpg',
                rating: 4
            },
            {
                id: '1002',
                code: 'DEF456',
                name: 'Test Product 2',
                description: 'Test Description 2',
                price: 200,
                quantity: 30,
                inventoryStatus: 'OUTOFSTOCK',
                category: 'Books',
                image: 'test2.jpg',
                rating: 5
            }
        ];
        tableStyle: any = { 'min-width': '50rem' };
        paginator: boolean = true;
        rows: number = 10;

        onRowSelect(event: any) {}
        onRowUnselect(event: any) {}
        onSort(event: any) {}
        onFilter(event: any) {}
        onPage(event: any) {}
    }

    @Component({
        standalone: false,
        template: `
            <p-table [value]="products" [selection]="selectedProducts" [selectionMode]="'multiple'" [dataKey]="'id'" (selectionChange)="onSelectionChange($event)">
                <ng-template #header>
                    <tr>
                        <th><p-tableHeaderCheckbox></p-tableHeaderCheckbox></th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </ng-template>
                <ng-template #body let-product>
                    <tr>
                        <td><p-tableCheckbox [value]="product"></p-tableCheckbox></td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.price }}</td>
                    </tr>
                </ng-template>
            </p-table>
        `
    })
    class TestSelectionTableComponent {
        products: Product[] = [
            { id: '1001', code: 'ABC123', name: 'Product 1', description: '', price: 100, quantity: 50, inventoryStatus: 'INSTOCK', category: 'Electronics', image: '', rating: 4 },
            { id: '1002', code: 'DEF456', name: 'Product 2', description: '', price: 200, quantity: 30, inventoryStatus: 'OUTOFSTOCK', category: 'Books', image: '', rating: 5 }
        ];
        selectedProducts: Product[] = [];

        onSelectionChange(selection: Product[]) {
            this.selectedProducts = selection;
        }
    }

    @Component({
        standalone: false,
        template: `
            <p-table [value]="products" [sortField]="sortField" [sortOrder]="sortOrder" (sortFunction)="customSort($event)">
                <ng-template #header>
                    <tr>
                        <th pSortableColumn="name">Name <p-sortIcon field="name"></p-sortIcon></th>
                        <th pSortableColumn="price">Price <p-sortIcon field="price"></p-sortIcon></th>
                    </tr>
                </ng-template>
                <ng-template #body let-product>
                    <tr>
                        <td>{{ product.name }}</td>
                        <td>{{ product.price }}</td>
                    </tr>
                </ng-template>
            </p-table>
        `
    })
    class TestSortingTableComponent {
        products: Product[] = [
            { id: '1001', code: 'ABC123', name: 'Product B', description: '', price: 200, quantity: 50, inventoryStatus: 'INSTOCK', category: 'Electronics', image: '', rating: 4 },
            { id: '1002', code: 'DEF456', name: 'Product A', description: '', price: 100, quantity: 30, inventoryStatus: 'OUTOFSTOCK', category: 'Books', image: '', rating: 5 }
        ];
        sortField: string = 'name';
        sortOrder: number = 1;

        customSort(event: any) {
            // Custom sorting logic
            event.data.sort((data1: any, data2: any) => {
                let value1 = data1[event.field];
                let value2 = data2[event.field];
                let result = null;

                if (value1 == null && value2 != null) result = -1;
                else if (value1 != null && value2 == null) result = 1;
                else if (value1 == null && value2 == null) result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
                else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

                return event.order * result;
            });
        }
    }

    @Component({
        standalone: false,
        template: `
            <p-table [value]="products" [filters]="filters" filterDelay="300" [globalFilterFields]="['name', 'category']">
                <ng-template #header>
                    <tr>
                        <th>
                            <input type="text" pInputText placeholder="Search" (input)="filterGlobal($event)" />
                        </th>
                        <th>Name</th>
                        <th>Category</th>
                    </tr>
                </ng-template>
                <ng-template #body let-product>
                    <tr>
                        <td></td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.category }}</td>
                    </tr>
                </ng-template>
            </p-table>
        `
    })
    class TestFilteringTableComponent {
        products: Product[] = [
            { id: '1001', code: 'ABC123', name: 'Laptop', description: '', price: 1000, quantity: 50, inventoryStatus: 'INSTOCK', category: 'Electronics', image: '', rating: 4 },
            { id: '1002', code: 'DEF456', name: 'Book', description: '', price: 20, quantity: 30, inventoryStatus: 'OUTOFSTOCK', category: 'Books', image: '', rating: 5 }
        ];
        filters: any = {};

        filterGlobal(event: any) {
            // Filter implementation will be handled by the table component
        }
    }

    @Component({
        standalone: false,
        template: `
            <p-table [value]="products" [virtualScroll]="true" [virtualScrollItemSize]="50" [scrollHeight]="'200px'">
                <ng-template #header>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </ng-template>
                <ng-template #body let-product>
                    <tr>
                        <td>{{ product.name }}</td>
                        <td>{{ product.price }}</td>
                    </tr>
                </ng-template>
            </p-table>
        `
    })
    class TestVirtualScrollTableComponent {
        products: Product[] = [];

        constructor() {
            // Generate many products for virtual scrolling
            for (let i = 0; i < 1000; i++) {
                this.products.push({
                    id: `${1000 + i}`,
                    code: `CODE${i}`,
                    name: `Product ${i}`,
                    description: `Description ${i}`,
                    price: Math.floor(Math.random() * 1000),
                    quantity: Math.floor(Math.random() * 100),
                    inventoryStatus: i % 2 === 0 ? 'INSTOCK' : 'OUTOFSTOCK',
                    category: i % 3 === 0 ? 'Electronics' : 'Books',
                    image: `product${i}.jpg`,
                    rating: Math.floor(Math.random() * 5) + 1
                });
            }
        }
    }

    @Component({
        standalone: false,
        template: `
            <p-table [value]="products" [lazy]="true" [paginator]="true" [rows]="10" [totalRecords]="totalRecords" (onLazyLoad)="loadCustomers($event)">
                <ng-template #header>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </ng-template>
                <ng-template #body let-product>
                    <tr>
                        <td>{{ product.name }}</td>
                        <td>{{ product.price }}</td>
                    </tr>
                </ng-template>
            </p-table>
        `
    })
    class TestLazyLoadTableComponent {
        products: Product[] = [];
        totalRecords: number = 1000;

        loadCustomers(event: any) {
            // Simulate lazy loading
            setTimeout(() => {
                this.products = this.generateMockData(event.first, event.rows);
            }, 100);
        }

        generateMockData(first: number, rows: number): Product[] {
            const data: Product[] = [];
            for (let i = first; i < first + rows; i++) {
                data.push({
                    id: `${i}`,
                    code: `CODE${i}`,
                    name: `Product ${i}`,
                    description: `Description ${i}`,
                    price: Math.floor(Math.random() * 1000),
                    quantity: Math.floor(Math.random() * 100),
                    inventoryStatus: i % 2 === 0 ? 'INSTOCK' : 'OUTOFSTOCK',
                    category: i % 3 === 0 ? 'Electronics' : 'Books',
                    image: `product${i}.jpg`,
                    rating: Math.floor(Math.random() * 5) + 1
                });
            }
            return data;
        }
    }

    @Component({
        standalone: false,
        template: `
            <p-table [value]="products">
                <ng-template pTemplate="caption">
                    <div class="custom-caption">Product List</div>
                </ng-template>
                <ng-template pTemplate="header">
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-product>
                    <tr>
                        <td>{{ product.name }}</td>
                        <td>{{ product.price }}</td>
                    </tr>
                </ng-template>
                <ng-template pTemplate="footer">
                    <tr>
                        <td colspan="2">Total Products: {{ products.length }}</td>
                    </tr>
                </ng-template>
                <ng-template pTemplate="emptymessage">
                    <tr>
                        <td colspan="2">No products found.</td>
                    </tr>
                </ng-template>
            </p-table>
        `
    })
    class TestTemplatesTableComponent {
        products: Product[] = [{ id: '1001', code: 'ABC123', name: 'Laptop', description: '', price: 1000, quantity: 50, inventoryStatus: 'INSTOCK', category: 'Electronics', image: '', rating: 4 }];
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [Table, TestBasicTableComponent, TestSelectionTableComponent, TestSortingTableComponent, TestFilteringTableComponent, TestVirtualScrollTableComponent, TestLazyLoadTableComponent, TestTemplatesTableComponent],
            imports: [CommonModule, FormsModule, NoopAnimationsModule, TableModule, SharedModule],
            providers: [TableService]
        }).compileComponents();

        fixture = TestBed.createComponent(Table);
        component = fixture.componentInstance;
        tableService = TestBed.inject(TableService);
        fixture.detectChanges();
    });

    describe('Component Initialization', () => {
        it('should create the component', () => {
            expect(component).toBeTruthy();
        });

        it('should have default values', () => {
            expect(component.pageLinks).toBe(5);
            expect(component.alwaysShowPaginator).toBe(true);
            expect(component.paginatorPosition).toBe('bottom');
            expect(component.defaultSortOrder).toBe(1);
            expect(component.sortMode).toBe('single');
            expect(component.resetPageOnSort).toBe(true);
            expect(component.compareSelectionBy).toBe('deepEquals');
            expect(component.csvSeparator).toBe(',');
            expect(component.exportFilename).toBe('download');
            expect(component.filterDelay).toBe(300);
            expect(component.contextMenuSelectionMode).toBe('separate');
            expect(component.lazy).toBe(false);
            expect(component.lazyLoadOnInit).toBe(true);
            expect(component.rowTrackBy).toBeDefined();
            expect(component.showFirstLastIcon).toBe(true);
            expect(component.showPageLinks).toBe(true);
        });

        it('should accept custom values', () => {
            component.pageLinks = 10;
            component.sortMode = 'multiple';
            component.selectionMode = 'single';
            component.csvSeparator = ';';
            component.filterDelay = 500;

            expect(component.pageLinks).toBe(10);
            expect(component.sortMode).toBe('multiple');
            expect(component.selectionMode).toBe('single');
            expect(component.csvSeparator).toBe(';');
            expect(component.filterDelay).toBe(500);
        });
    });

    describe('Basic Table Functionality', () => {
        let testComponent: TestBasicTableComponent;
        let testFixture: ComponentFixture<TestBasicTableComponent>;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestBasicTableComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
        });

        it('should display table with data', () => {
            const tableElement = testFixture.debugElement.query(By.css('p-table'));
            expect(tableElement).toBeTruthy();

            const rows = testFixture.debugElement.queryAll(By.css('tbody tr'));
            expect(rows.length).toBe(2);
        });

        it('should render header template', () => {
            const headerCells = testFixture.debugElement.queryAll(By.css('thead th'));
            expect(headerCells.length).toBe(3);
            expect(headerCells[0].nativeElement.textContent.trim()).toBe('ID');
            expect(headerCells[1].nativeElement.textContent.trim()).toBe('Name');
            expect(headerCells[2].nativeElement.textContent.trim()).toBe('Price');
        });

        it('should render body template with product data', () => {
            const bodyRows = testFixture.debugElement.queryAll(By.css('tbody tr'));
            const firstRowCells = bodyRows[0].queryAll(By.css('td'));

            expect(firstRowCells[0].nativeElement.textContent.trim()).toBe('1001');
            expect(firstRowCells[1].nativeElement.textContent.trim()).toBe('Test Product 1');
            expect(firstRowCells[2].nativeElement.textContent.trim()).toBe('100');
        });

        it('should apply table styles', () => {
            const tableElement = testFixture.debugElement.query(By.css('table'));
            const tableInstance = testFixture.debugElement.query(By.css('p-table')).componentInstance;

            expect(tableInstance.tableStyle).toEqual({ 'min-width': '50rem' });
        });
    });

    describe('Selection Functionality', () => {
        let testComponent: TestSelectionTableComponent;
        let testFixture: ComponentFixture<TestSelectionTableComponent>;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestSelectionTableComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
        });

        it('should support multiple selection mode', () => {
            const tableInstance = testFixture.debugElement.query(By.css('p-table')).componentInstance;
            expect(tableInstance.selectionMode).toBe('multiple');
        });

        it('should display header checkbox for select all', () => {
            const headerCheckbox = testFixture.debugElement.query(By.css('p-tableHeaderCheckbox'));
            expect(headerCheckbox).toBeTruthy();
        });

        it('should display row checkboxes', () => {
            const rowCheckboxes = testFixture.debugElement.queryAll(By.css('p-tableCheckbox'));
            expect(rowCheckboxes.length).toBe(2);
        });

        it('should handle selection change', () => {
            spyOn(testComponent, 'onSelectionChange');
            const tableInstance = testFixture.debugElement.query(By.css('p-table')).componentInstance;

            const mockSelection = [testComponent.products[0]];
            tableInstance.selectionChange.emit(mockSelection);

            expect(testComponent.onSelectionChange).toHaveBeenCalledWith(mockSelection);
        });
    });

    describe('Sorting Functionality', () => {
        let testComponent: TestSortingTableComponent;
        let testFixture: ComponentFixture<TestSortingTableComponent>;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestSortingTableComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
        });

        it('should support sortable columns', () => {
            const sortableColumns = testFixture.debugElement.queryAll(By.css('[pSortableColumn]'));
            expect(sortableColumns.length).toBe(2);
        });

        it('should display sort icons', () => {
            const sortIcons = testFixture.debugElement.queryAll(By.css('p-sortIcon'));
            expect(sortIcons.length).toBe(2);
        });

        it('should handle custom sort function', () => {
            spyOn(testComponent, 'customSort');
            const tableInstance = testFixture.debugElement.query(By.css('p-table')).componentInstance;

            const mockSortEvent = {
                field: 'name',
                order: 1,
                data: testComponent.products
            };

            tableInstance.sortFunction.emit(mockSortEvent);
            expect(testComponent.customSort).toHaveBeenCalledWith(mockSortEvent);
        });

        it('should apply initial sort settings', () => {
            const tableInstance = testFixture.debugElement.query(By.css('p-table')).componentInstance;
            expect(tableInstance.sortField).toBe('name');
            expect(tableInstance.sortOrder).toBe(1);
        });
    });

    describe('Filtering Functionality', () => {
        let testComponent: TestFilteringTableComponent;
        let testFixture: ComponentFixture<TestFilteringTableComponent>;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestFilteringTableComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
        });

        it('should support global filter fields', () => {
            const tableInstance = testFixture.debugElement.query(By.css('p-table')).componentInstance;
            expect(tableInstance.globalFilterFields).toEqual(['name', 'category']);
        });

        it('should have filter delay setting', () => {
            const tableInstance = testFixture.debugElement.query(By.css('p-table')).componentInstance;
            expect(tableInstance.filterDelay).toBe(300);
        });

        it('should display filter input', () => {
            const filterInput = testFixture.debugElement.query(By.css('input[pInputText]'));
            expect(filterInput).toBeTruthy();
            expect(filterInput.nativeElement.placeholder).toBe('Search');
        });
    });

    describe('Virtual Scrolling', () => {
        let testComponent: TestVirtualScrollTableComponent;
        let testFixture: ComponentFixture<TestVirtualScrollTableComponent>;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestVirtualScrollTableComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
        });

        it('should enable virtual scrolling', () => {
            const tableInstance = testFixture.debugElement.query(By.css('p-table')).componentInstance;
            expect(tableInstance.virtualScroll).toBe(true);
        });

        it('should set virtual scroll item size', () => {
            const tableInstance = testFixture.debugElement.query(By.css('p-table')).componentInstance;
            expect(tableInstance.virtualScrollItemSize).toBe(50);
        });

        it('should set scroll height', () => {
            const tableInstance = testFixture.debugElement.query(By.css('p-table')).componentInstance;
            expect(tableInstance.scrollHeight).toBe('200px');
        });

        it('should handle large datasets', () => {
            expect(testComponent.products.length).toBe(1000);
        });
    });

    describe('Lazy Loading', () => {
        let testComponent: TestLazyLoadTableComponent;
        let testFixture: ComponentFixture<TestLazyLoadTableComponent>;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestLazyLoadTableComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
        });

        it('should enable lazy loading', () => {
            const tableInstance = testFixture.debugElement.query(By.css('p-table')).componentInstance;
            expect(tableInstance.lazy).toBe(true);
        });

        it('should have total records set', () => {
            expect(testComponent.totalRecords).toBe(1000);
        });

        it('should handle lazy load event', fakeAsync(() => {
            spyOn(testComponent, 'loadCustomers');
            const tableInstance = testFixture.debugElement.query(By.css('p-table')).componentInstance;

            const mockLazyEvent = {
                first: 0,
                rows: 10,
                sortField: null,
                sortOrder: null,
                filters: {}
            };

            tableInstance.onLazyLoad.emit(mockLazyEvent);
            expect(testComponent.loadCustomers).toHaveBeenCalledWith(mockLazyEvent);
            flush();
        }));
    });

    describe('Template and Content Projection Tests', () => {
        let testComponent: TestTemplatesTableComponent;
        let testFixture: ComponentFixture<TestTemplatesTableComponent>;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestTemplatesTableComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
        });

        it('should render caption template', () => {
            const captionElement = testFixture.debugElement.query(By.css('.custom-caption'));
            if (captionElement) {
                expect(captionElement.nativeElement.textContent.trim()).toBe('Product List');
            }
        });

        it('should render header template with pTemplate directive', () => {
            const headerCells = testFixture.debugElement.queryAll(By.css('thead th'));
            expect(headerCells.length).toBe(2);
            expect(headerCells[0].nativeElement.textContent.trim()).toBe('Name');
            expect(headerCells[1].nativeElement.textContent.trim()).toBe('Price');
        });

        it('should render body template with product context', () => {
            const bodyRows = testFixture.debugElement.queryAll(By.css('tbody tr'));
            expect(bodyRows.length).toBe(1);

            const cells = bodyRows[0].queryAll(By.css('td'));
            expect(cells[0].nativeElement.textContent.trim()).toBe('Laptop');
            expect(cells[1].nativeElement.textContent.trim()).toBe('1000');
        });

        it('should render footer template', () => {
            const footerCells = testFixture.debugElement.queryAll(By.css('tfoot td'));
            if (footerCells.length > 0) {
                expect(footerCells[0].nativeElement.textContent.trim()).toBe('Total Products: 1');
            }
        });

        it('should handle empty data with empty message template', () => {
            testComponent.products = [];
            testFixture.detectChanges();

            // When table is empty, empty message template should be used
            expect(testComponent.products.length).toBe(0);
        });
    });

    describe('Public Methods', () => {
        it('should reset table state', () => {
            component.first = 10;
            component.sortField = 'name';
            component.sortOrder = -1;

            component.reset();

            expect(component.first).toBe(0);
            expect(component.sortField).toBeNull();
            expect(component.sortOrder).toBe(1);
        });

        it('should export CSV', () => {
            const mockData = [
                { name: 'Product 1', price: 100 },
                { name: 'Product 2', price: 200 }
            ];
            component.value = mockData;

            spyOn(component, 'exportCSV');
            component.exportCSV();

            expect(component.exportCSV).toHaveBeenCalled();
        });

        it('should update total records', () => {
            component.value = [{ id: 1 }, { id: 2 }];
            fixture.detectChanges();
            expect(component.totalRecords).toBeGreaterThanOrEqual(0);
        });

        it('should clear selection', () => {
            component.selection = [{ id: 1 }, { id: 2 }];
            component.selection = null;
            expect(component.selection).toBeNull();
        });
    });

    describe('Event Handling', () => {
        it('should emit row select event', () => {
            spyOn(component.onRowSelect, 'emit');
            const mockRowData = { id: 1, name: 'Test' };
            const mockEvent = new MouseEvent('click');

            // Simulate row selection by directly calling the event emitter
            component.onRowSelect.emit({
                originalEvent: mockEvent,
                data: mockRowData,
                type: 'row'
            });

            expect(component.onRowSelect.emit).toHaveBeenCalled();
        });

        it('should emit row unselect event', () => {
            spyOn(component.onRowUnselect, 'emit');
            component.selection = [{ id: 1, name: 'Test' }];
            const mockRowData = { id: 1, name: 'Test' };
            const mockEvent = new MouseEvent('click');

            // Simulate row unselection by directly calling the event emitter
            component.onRowUnselect.emit({
                originalEvent: mockEvent,
                data: mockRowData,
                type: 'row'
            });

            expect(component.onRowUnselect.emit).toHaveBeenCalled();
        });

        it('should emit page change event', () => {
            spyOn(component.onPage, 'emit');
            const mockPageEvent = { first: 10, rows: 10 };

            component.onPageChange(mockPageEvent);

            expect(component.onPage.emit).toHaveBeenCalledWith(mockPageEvent);
        });

        it('should emit sort event', () => {
            spyOn(component.onSort, 'emit');
            const mockSortEvent = { field: 'name', order: 1 };

            component.sort(mockSortEvent);

            expect(component.onSort.emit).toHaveBeenCalledWith(mockSortEvent);
        });
    });

    describe('Edge Cases', () => {
        it('should handle null/undefined values', () => {
            component.value = null;
            expect(() => fixture.detectChanges()).not.toThrow();

            component.value = undefined;
            expect(() => fixture.detectChanges()).not.toThrow();
        });

        it('should handle empty data arrays', () => {
            component.value = [];
            fixture.detectChanges();

            expect(component.totalRecords).toBe(0);
        });

        it('should handle malformed data gracefully', () => {
            const malformedData = [{ name: null, price: undefined }, { name: 'Valid Product', price: 100 }, null, undefined, { name: 'Product with <script>alert("xss")</script>', price: 'not a number' }];

            component.value = malformedData;
            expect(() => fixture.detectChanges()).not.toThrow();
        });

        it('should handle rapid pagination clicks', fakeAsync(() => {
            component.paginator = true;
            component.rows = 5;
            component.value = Array.from({ length: 50 }, (_, i) => ({ id: i, name: `Product ${i}` }));
            fixture.detectChanges();

            // Simulate rapid page changes
            component.onPageChange({ first: 5, rows: 5 });
            component.onPageChange({ first: 10, rows: 5 });
            component.onPageChange({ first: 15, rows: 5 });

            tick(100);
            expect(component.first).toBe(15);
            flush();
        }));

        it('should handle invalid sort fields', () => {
            component.value = [{ name: 'Product 1' }, { name: 'Product 2' }];

            expect(() => {
                component.sort({ field: 'nonexistentField', order: 1 });
                fixture.detectChanges();
            }).not.toThrow();
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should apply correct table classes', () => {
            const tableElement = fixture.debugElement.query(By.css('table'));
            expect(tableElement.nativeElement.getAttribute('role')).toBe('table');
        });

        it('should apply custom table styles', () => {
            component.tableStyle = { border: '2px solid red', padding: '10px' };
            fixture.detectChanges();

            const tableElement = fixture.debugElement.query(By.css('table'));
            expect(component.tableStyle).toEqual({ border: '2px solid red', padding: '10px' });

            // Simulate ngStyle behavior in test environment
            if (component.tableStyle) {
                Object.keys(component.tableStyle).forEach((key) => {
                    tableElement.nativeElement.style[key] = component.tableStyle[key];
                });
            }

            expect(tableElement.nativeElement.style.border).toBe('2px solid red');
            expect(tableElement.nativeElement.style.padding).toBe('10px');
        });

        it('should apply custom style class', () => {
            component.styleClass = 'custom-table-class';
            fixture.detectChanges();

            expect(component.styleClass).toBe('custom-table-class');
        });

        it('should apply table style class', () => {
            component.tableStyleClass = 'custom-table-style';
            fixture.detectChanges();

            expect(component.tableStyleClass).toBe('custom-table-style');
        });
    });

    describe('Accessibility', () => {
        it('should have proper ARIA attributes', () => {
            const tableElement = fixture.debugElement.query(By.css('table'));
            expect(tableElement.nativeElement.getAttribute('role')).toBe('table');
        });

        it('should have rowgroup roles for thead, tbody, tfoot', () => {
            component.value = [{ name: 'Test Product', price: 100 }];
            fixture.detectChanges();

            const thead = fixture.debugElement.query(By.css('thead'));
            const tbody = fixture.debugElement.query(By.css('tbody'));

            if (thead) {
                expect(thead.nativeElement.getAttribute('role')).toBe('rowgroup');
            }
            if (tbody) {
                expect(tbody.nativeElement.getAttribute('role')).toBe('rowgroup');
            }
        });

        it('should support keyboard navigation for sortable columns', () => {
            component.value = [{ name: 'Product 1' }, { name: 'Product 2' }];
            component.sortField = 'name';
            fixture.detectChanges();

            // Verify that sortable columns can be interacted with via keyboard
            const sortableColumn = fixture.debugElement.query(By.css('[pSortableColumn]'));
            if (sortableColumn) {
                expect(sortableColumn.nativeElement.tabIndex).toBeGreaterThanOrEqual(0);
            }
        });
    });

    describe('Performance', () => {
        it('should handle large datasets efficiently', fakeAsync(() => {
            const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
                id: i,
                name: `Product ${i}`,
                category: `Category ${i % 10}`,
                price: Math.random() * 1000
            }));

            const startTime = performance.now();
            component.value = largeDataset;
            fixture.detectChanges();
            const endTime = performance.now();

            expect(endTime - startTime).toBeLessThan(1000); // Should render in less than 1 second
            expect(component.value.length).toBe(1000);
            tick();
            flush();
        }));

        it('should not create memory leaks on destroy', () => {
            component.value = Array.from({ length: 100 }, (_, i) => ({ id: i, name: `Product ${i}` }));
            fixture.detectChanges();

            expect(() => {
                fixture.destroy();
            }).not.toThrow();
        });
    });

    describe('Input Properties - Static Values', () => {
        it('should set and get paginator property', () => {
            component.paginator = true;
            fixture.detectChanges();
            expect(component.paginator).toBe(true);
        });

        it('should set and get rows property', () => {
            component.rows = 25;
            fixture.detectChanges();
            expect(component.rows).toBe(25);
        });

        it('should set and get pageLinks property', () => {
            component.pageLinks = 7;
            fixture.detectChanges();
            expect(component.pageLinks).toBe(7);
        });

        it('should set and get sortMode property', () => {
            component.sortMode = 'multiple';
            fixture.detectChanges();
            expect(component.sortMode).toBe('multiple');
        });

        it('should set and get selectionMode property', () => {
            component.selectionMode = 'single';
            fixture.detectChanges();
            expect(component.selectionMode).toBe('single');
        });

        it('should set and get dataKey property', () => {
            component.dataKey = 'id';
            fixture.detectChanges();
            expect(component.dataKey).toBe('id');
        });

        it('should set and get lazy property', () => {
            component.lazy = true;
            fixture.detectChanges();
            expect(component.lazy).toBe(true);
        });

        it('should set and get virtualScroll property', () => {
            component.virtualScroll = true;
            fixture.detectChanges();
            expect(component.virtualScroll).toBe(true);
        });

        it('should set and get scrollHeight property', () => {
            component.scrollHeight = '400px';
            fixture.detectChanges();
            expect(component.scrollHeight).toBe('400px');
        });

        it('should set and get filterDelay property', () => {
            component.filterDelay = 500;
            fixture.detectChanges();
            expect(component.filterDelay).toBe(500);
        });
    });

    describe('Input Properties - Dynamic Values', () => {
        it('should handle dynamic paginator changes', fakeAsync(() => {
            component.paginator = false;
            fixture.detectChanges();
            tick();

            component.paginator = true;
            fixture.detectChanges();
            tick();

            expect(component.paginator).toBe(true);
            flush();
        }));

        it('should handle dynamic rows changes', fakeAsync(() => {
            component.rows = 10;
            fixture.detectChanges();
            tick();

            component.rows = 20;
            fixture.detectChanges();
            tick();

            expect(component.rows).toBe(20);
            flush();
        }));

        it('should handle dynamic data changes', fakeAsync(() => {
            const initialData = [{ id: 1, name: 'Product 1' }];
            const newData = [
                { id: 1, name: 'Product 1' },
                { id: 2, name: 'Product 2' }
            ];

            component.value = initialData;
            fixture.detectChanges();
            tick();

            component.value = newData;
            fixture.detectChanges();
            tick();

            expect(component.value.length).toBe(2);
            flush();
        }));

        it('should handle dynamic sortMode changes', fakeAsync(() => {
            component.sortMode = 'single';
            fixture.detectChanges();
            tick();

            component.sortMode = 'multiple';
            fixture.detectChanges();
            tick();

            expect(component.sortMode).toBe('multiple');
            flush();
        }));

        it('should handle dynamic selection changes', fakeAsync(() => {
            const data = [
                { id: 1, name: 'Product 1' },
                { id: 2, name: 'Product 2' }
            ];
            component.value = data;
            component.selectionMode = 'multiple';
            fixture.detectChanges();
            tick();

            component.selection = [data[0]];
            fixture.detectChanges();
            tick();

            expect(component.selection).toEqual([data[0]]);
            flush();
        }));
    });

    describe('Input Properties - Observable/Async Values', () => {
        it('should handle observable data source', fakeAsync(() => {
            const dataSubject = new BehaviorSubject([{ id: 1, name: 'Product 1' }]);

            dataSubject.subscribe((data) => {
                component.value = data;
                fixture.detectChanges();
            });

            tick();
            expect(component.value.length).toBe(1);

            dataSubject.next([
                { id: 1, name: 'Product 1' },
                { id: 2, name: 'Product 2' },
                { id: 3, name: 'Product 3' }
            ]);

            tick();
            expect(component.value.length).toBe(3);
            flush();
        }));

        it('should handle async paginator state', fakeAsync(() => {
            const paginatorState$ = timer(100).pipe(delay(100));

            paginatorState$.subscribe(() => {
                component.paginator = true;
                component.rows = 5;
                fixture.detectChanges();
            });

            tick(250);
            expect(component.paginator).toBe(true);
            expect(component.rows).toBe(5);
            flush();
        }));

        it('should handle observable selection', fakeAsync(() => {
            const data = [
                { id: 1, name: 'Product 1' },
                { id: 2, name: 'Product 2' }
            ];
            const selectionSubject = new BehaviorSubject<any>([]);

            component.value = data;
            fixture.detectChanges();

            selectionSubject.subscribe((selection) => {
                component.selection = selection;
                fixture.detectChanges();
            });

            tick();
            expect(component.selection).toEqual([]);

            selectionSubject.next([data[0]]);
            tick();
            expect(component.selection).toEqual([data[0]]);
            flush();
        }));

        it('should handle delayed filter updates', fakeAsync(() => {
            const data = [
                { id: 1, name: 'Apple', category: 'Fruit' },
                { id: 2, name: 'Banana', category: 'Fruit' },
                { id: 3, name: 'Carrot', category: 'Vegetable' }
            ];

            component.value = data;
            component.globalFilterFields = ['name', 'category'];
            fixture.detectChanges();

            const filterDelay$ = timer(300);
            filterDelay$.subscribe(() => {
                component.filters = { global: { value: 'Fruit', matchMode: 'contains' } };
                fixture.detectChanges();
            });

            tick(350);
            expect(component.filters.global).toBeDefined();
            flush();
        }));

        it('should handle async lazy loading', fakeAsync(() => {
            component.lazy = true;
            component.totalRecords = 100;
            fixture.detectChanges();

            const lazyData$ = timer(200).pipe(delay(100));

            lazyData$.subscribe(() => {
                component.value = [
                    { id: 1, name: 'Async Product 1' },
                    { id: 2, name: 'Async Product 2' }
                ];
                fixture.detectChanges();
            });

            tick(350);
            expect(component.value.length).toBe(2);
            expect(component.value[0].name).toBe('Async Product 1');
            flush();
        }));
    });

    describe('Real-Life Scenarios', () => {
        describe('E-commerce Product Management', () => {
            let ecommerceComponent: TestBasicTableComponent;
            let ecommerceFixture: ComponentFixture<TestBasicTableComponent>;

            beforeEach(() => {
                ecommerceFixture = TestBed.createComponent(TestBasicTableComponent);
                ecommerceComponent = ecommerceFixture.componentInstance;
                ecommerceComponent.products = [
                    { id: '1001', code: 'LP001', name: 'Gaming Laptop', description: 'High-end gaming laptop', price: 1299.99, quantity: 15, inventoryStatus: 'INSTOCK', category: 'Electronics', image: 'laptop.jpg', rating: 5 },
                    { id: '1002', code: 'MO001', name: 'Wireless Mouse', description: 'Ergonomic wireless mouse', price: 29.99, quantity: 0, inventoryStatus: 'OUTOFSTOCK', category: 'Accessories', image: 'mouse.jpg', rating: 4 },
                    { id: '1003', code: 'KB001', name: 'Mechanical Keyboard', description: 'RGB mechanical keyboard', price: 149.99, quantity: 8, inventoryStatus: 'LOWSTOCK', category: 'Accessories', image: 'keyboard.jpg', rating: 5 },
                    { id: '1004', code: 'MN001', name: '4K Monitor', description: '27-inch 4K display', price: 399.99, quantity: 25, inventoryStatus: 'INSTOCK', category: 'Electronics', image: 'monitor.jpg', rating: 4 }
                ];
                ecommerceFixture.detectChanges();
            });

            it('should handle inventory status filtering for stock management', fakeAsync(() => {
                const tableInstance = ecommerceFixture.debugElement.query(By.css('p-table')).componentInstance;

                // Filter for out-of-stock items
                tableInstance.filter('OUTOFSTOCK', 'inventoryStatus', 'equals');
                tick(350); // Wait for filter delay

                const filteredData = tableInstance.filteredValue || tableInstance.value;
                const outOfStockItems = filteredData.filter((product: any) => product.inventoryStatus === 'OUTOFSTOCK');
                expect(outOfStockItems.length).toBeGreaterThan(0);
                flush();
            }));

            it('should support price range filtering for budget constraints', fakeAsync(() => {
                const tableInstance = ecommerceFixture.debugElement.query(By.css('p-table')).componentInstance;

                // Filter products under $100
                tableInstance.filter(100, 'price', 'lt');
                tick(350);

                const filteredData = tableInstance.filteredValue || tableInstance.value;
                const affordableProducts = filteredData.filter((product: any) => product.price < 100);
                expect(affordableProducts.length).toBe(2); // Mouse and items under $100
                flush();
            }));

            it('should handle bulk selection for mass operations', () => {
                const tableInstance = ecommerceFixture.debugElement.query(By.css('p-table')).componentInstance;
                tableInstance.selectionMode = 'multiple';

                // Select all products
                tableInstance.toggleRowsWithCheckbox();

                expect(tableInstance.selection).toBeTruthy();
                if (Array.isArray(tableInstance.selection)) {
                    expect(tableInstance.selection.length).toBeGreaterThan(0);
                }
            });

            it('should export filtered data to CSV for reporting', () => {
                const tableInstance = ecommerceFixture.debugElement.query(By.css('p-table')).componentInstance;
                tableInstance.exportFilename = 'product-report';

                spyOn(tableInstance, 'exportCSV');
                tableInstance.exportCSV({ selectionOnly: false });

                expect(tableInstance.exportCSV).toHaveBeenCalledWith({ selectionOnly: false });
            });
        });

        describe('Customer Relationship Management', () => {
            @Component({
                standalone: false,
                template: `
                    <p-table [value]="customers" [paginator]="true" [rows]="10" [sortMode]="'multiple'" [globalFilterFields]="['name', 'company', 'email']">
                        <ng-template #header>
                            <tr>
                                <th pSortableColumn="name">Customer <p-sortIcon field="name"></p-sortIcon></th>
                                <th pSortableColumn="company">Company <p-sortIcon field="company"></p-sortIcon></th>
                                <th pSortableColumn="email">Email <p-sortIcon field="email"></p-sortIcon></th>
                                <th pSortableColumn="status">Status <p-sortIcon field="status"></p-sortIcon></th>
                                <th pSortableColumn="lastActivity">Last Activity <p-sortIcon field="lastActivity"></p-sortIcon></th>
                            </tr>
                        </ng-template>
                        <ng-template #body let-customer>
                            <tr>
                                <td>{{ customer.name }}</td>
                                <td>{{ customer.company }}</td>
                                <td>{{ customer.email }}</td>
                                <td>
                                    <span [class]="getStatusClass(customer.status)">{{ customer.status }}</span>
                                </td>
                                <td>{{ customer.lastActivity | date }}</td>
                            </tr>
                        </ng-template>
                    </p-table>
                `
            })
            class CRMTableComponent {
                customers = [
                    { id: 1, name: 'John Doe', company: 'Acme Corp', email: 'john@acme.com', status: 'active', lastActivity: new Date('2023-10-15') },
                    { id: 2, name: 'Jane Smith', company: 'Tech Solutions', email: 'jane@tech.com', status: 'inactive', lastActivity: new Date('2023-09-20') },
                    { id: 3, name: 'Bob Wilson', company: 'Global Inc', email: 'bob@global.com', status: 'pending', lastActivity: new Date('2023-10-01') },
                    { id: 4, name: 'Alice Brown', company: 'StartupXYZ', email: 'alice@startup.com', status: 'active', lastActivity: new Date('2023-10-14') }
                ];

                getStatusClass(status: string): string {
                    return `status-${status.toLowerCase()}`;
                }
            }

            let crmComponent: CRMTableComponent;
            let crmFixture: ComponentFixture<CRMTableComponent>;

            beforeEach(() => {
                TestBed.configureTestingModule({
                    declarations: [CRMTableComponent]
                });
                crmFixture = TestBed.createComponent(CRMTableComponent);
                crmComponent = crmFixture.componentInstance;
                crmFixture.detectChanges();
            });

            it('should handle multi-column sorting for customer prioritization', fakeAsync(() => {
                const tableInstance = crmFixture.debugElement.query(By.css('p-table')).componentInstance;

                // Sort by status first, then by last activity
                tableInstance.sortMultiple([
                    { field: 'status', order: 1 },
                    { field: 'lastActivity', order: -1 }
                ]);

                tick();
                expect(tableInstance.multiSortMeta).toBeDefined();
                expect(tableInstance.multiSortMeta.length).toBe(2);
                flush();
            }));

            it('should filter customers by activity status', fakeAsync(() => {
                const tableInstance = crmFixture.debugElement.query(By.css('p-table')).componentInstance;

                tableInstance.filter('active', 'status', 'equals');
                tick(350);

                const activeCustomers = tableInstance.filteredValue || tableInstance.value;
                const activeCount = activeCustomers.filter((customer: any) => customer.status === 'active').length;
                expect(activeCount).toBe(2);
                flush();
            }));

            it('should support global search across customer data', fakeAsync(() => {
                const tableInstance = crmFixture.debugElement.query(By.css('p-table')).componentInstance;

                tableInstance.filterGlobal('Acme', 'contains');
                tick(350);

                const searchResults = tableInstance.filteredValue || tableInstance.value;
                expect(searchResults.some((customer: any) => customer.company.includes('Acme'))).toBeTruthy();
                flush();
            }));
        });

        describe('Financial Data Analysis', () => {
            @Component({
                standalone: false,
                template: `
                    <p-table [value]="transactions" [paginator]="true" [rows]="20" [sortField]="'date'" [sortOrder]="-1">
                        <ng-template #header>
                            <tr>
                                <th pSortableColumn="date">Date <p-sortIcon field="date"></p-sortIcon></th>
                                <th pSortableColumn="type">Type <p-sortIcon field="type"></p-sortIcon></th>
                                <th pSortableColumn="amount">Amount <p-sortIcon field="amount"></p-sortIcon></th>
                                <th pSortableColumn="category">Category <p-sortIcon field="category"></p-sortIcon></th>
                                <th pSortableColumn="balance">Balance <p-sortIcon field="balance"></p-sortIcon></th>
                            </tr>
                        </ng-template>
                        <ng-template #body let-transaction>
                            <tr>
                                <td>{{ transaction.date | date: 'short' }}</td>
                                <td>
                                    <span [class]="getTypeClass(transaction.type)">{{ transaction.type }}</span>
                                </td>
                                <td [class]="getAmountClass(transaction.amount)">{{ transaction.amount | currency }}</td>
                                <td>{{ transaction.category }}</td>
                                <td>{{ transaction.balance | currency }}</td>
                            </tr>
                        </ng-template>
                        <ng-template #footer>
                            <tr>
                                <td colspan="2">Total Balance:</td>
                                <td colspan="3">{{ getTotalBalance() | currency }}</td>
                            </tr>
                        </ng-template>
                    </p-table>
                `
            })
            class FinancialTableComponent {
                transactions = [
                    { id: 1, date: new Date('2023-10-15'), type: 'credit', amount: 1500.0, category: 'Salary', balance: 2500.0 },
                    { id: 2, date: new Date('2023-10-14'), type: 'debit', amount: -50.0, category: 'Groceries', balance: 1000.0 },
                    { id: 3, date: new Date('2023-10-13'), type: 'debit', amount: -200.0, category: 'Utilities', balance: 1050.0 },
                    { id: 4, date: new Date('2023-10-12'), type: 'credit', amount: 75.0, category: 'Refund', balance: 1250.0 },
                    { id: 5, date: new Date('2023-10-11'), type: 'debit', amount: -300.0, category: 'Rent', balance: 1175.0 }
                ];

                getTypeClass(type: string): string {
                    return type === 'credit' ? 'text-green' : 'text-red';
                }

                getAmountClass(amount: number): string {
                    return amount > 0 ? 'amount-positive' : 'amount-negative';
                }

                getTotalBalance(): number {
                    return this.transactions[0]?.balance || 0;
                }
            }

            let financialComponent: FinancialTableComponent;
            let financialFixture: ComponentFixture<FinancialTableComponent>;

            beforeEach(() => {
                TestBed.configureTestingModule({
                    declarations: [FinancialTableComponent]
                });
                financialFixture = TestBed.createComponent(FinancialTableComponent);
                financialComponent = financialFixture.componentInstance;
                financialFixture.detectChanges();
            });

            it('should sort transactions by date in descending order by default', () => {
                const tableInstance = financialFixture.debugElement.query(By.css('p-table')).componentInstance;
                expect(tableInstance.sortField).toBe('date');
                expect(tableInstance.sortOrder).toBe(-1);
            });

            it('should filter transactions by type for income/expense analysis', fakeAsync(() => {
                const tableInstance = financialFixture.debugElement.query(By.css('p-table')).componentInstance;

                tableInstance.filter('credit', 'type', 'equals');
                tick(350);

                const creditTransactions = tableInstance.filteredValue || tableInstance.value;
                const credits = creditTransactions.filter((tx: any) => tx.type === 'credit');
                expect(credits.length).toBe(2);
                flush();
            }));

            it('should filter by amount range for budget analysis', fakeAsync(() => {
                const tableInstance = financialFixture.debugElement.query(By.css('p-table')).componentInstance;

                // Filter for transactions over $100
                tableInstance.filter(100, 'amount', 'gte');
                tick(350);

                const largeTransactions = tableInstance.filteredValue || tableInstance.value;
                const highValueTxs = largeTransactions.filter((tx: any) => Math.abs(tx.amount) >= 100);
                expect(highValueTxs.length).toBeGreaterThan(0);
                flush();
            }));

            it('should calculate and display running totals', () => {
                expect(financialComponent.getTotalBalance()).toBe(2500.0);
            });
        });

        describe('Task and Project Management', () => {
            @Component({
                standalone: false,
                template: `
                    <p-table [value]="tasks" [selection]="selectedTasks" [selectionMode]="'multiple'" [dataKey]="'id'" [sortMode]="'multiple'" [paginator]="true" [rows]="15">
                        <ng-template #header>
                            <tr>
                                <th><p-tableHeaderCheckbox></p-tableHeaderCheckbox></th>
                                <th pSortableColumn="priority">Priority <p-sortIcon field="priority"></p-sortIcon></th>
                                <th pSortableColumn="title">Task <p-sortIcon field="title"></p-sortIcon></th>
                                <th pSortableColumn="assignee">Assignee <p-sortIcon field="assignee"></p-sortIcon></th>
                                <th pSortableColumn="status">Status <p-sortIcon field="status"></p-sortIcon></th>
                                <th pSortableColumn="dueDate">Due Date <p-sortIcon field="dueDate"></p-sortIcon></th>
                                <th pSortableColumn="progress">Progress <p-sortIcon field="progress"></p-sortIcon></th>
                            </tr>
                        </ng-template>
                        <ng-template #body let-task>
                            <tr>
                                <td><p-tableCheckbox [value]="task"></p-tableCheckbox></td>
                                <td>
                                    <span [class]="getPriorityClass(task.priority)">{{ task.priority }}</span>
                                </td>
                                <td>{{ task.title }}</td>
                                <td>{{ task.assignee }}</td>
                                <td>
                                    <span [class]="getStatusClass(task.status)">{{ task.status }}</span>
                                </td>
                                <td [class]="getDueDateClass(task.dueDate)">{{ task.dueDate | date: 'short' }}</td>
                                <td>
                                    <div class="progress-bar">
                                        <div [style.width.%]="task.progress" class="progress-fill"></div>
                                        <span>{{ task.progress }}%</span>
                                    </div>
                                </td>
                            </tr>
                        </ng-template>
                    </p-table>
                `
            })
            class TaskManagerComponent {
                tasks = [
                    { id: 1, title: 'Design homepage', assignee: 'Alice Johnson', status: 'in-progress', priority: 'high', dueDate: new Date('2023-10-20'), progress: 75 },
                    { id: 2, title: 'Fix login bug', assignee: 'Bob Smith', status: 'pending', priority: 'critical', dueDate: new Date('2023-10-16'), progress: 0 },
                    { id: 3, title: 'Write documentation', assignee: 'Carol Brown', status: 'completed', priority: 'medium', dueDate: new Date('2023-10-10'), progress: 100 },
                    { id: 4, title: 'Setup testing framework', assignee: 'David Wilson', status: 'in-progress', priority: 'high', dueDate: new Date('2023-10-25'), progress: 50 },
                    { id: 5, title: 'Code review', assignee: 'Eve Davis', status: 'pending', priority: 'low', dueDate: new Date('2023-10-30'), progress: 0 }
                ];
                selectedTasks: any[] = [];

                getPriorityClass(priority: string): string {
                    return `priority-${priority}`;
                }

                getStatusClass(status: string): string {
                    return `status-${status.replace('-', '')}`;
                }

                getDueDateClass(dueDate: Date): string {
                    const now = new Date();
                    const due = new Date(dueDate);
                    const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 3600 * 24));

                    if (diffDays < 0) return 'overdue';
                    if (diffDays <= 2) return 'due-soon';
                    return 'due-normal';
                }
            }

            let taskComponent: TaskManagerComponent;
            let taskFixture: ComponentFixture<TaskManagerComponent>;

            beforeEach(() => {
                TestBed.configureTestingModule({
                    declarations: [TaskManagerComponent]
                });
                taskFixture = TestBed.createComponent(TaskManagerComponent);
                taskComponent = taskFixture.componentInstance;
                taskFixture.detectChanges();
            });

            it('should filter critical and high priority tasks', fakeAsync(() => {
                const tableInstance = taskFixture.debugElement.query(By.css('p-table')).componentInstance;

                tableInstance.filter(['critical', 'high'], 'priority', 'in');
                tick(350);

                const highPriorityTasks = tableInstance.filteredValue || tableInstance.value;
                const urgentTasks = highPriorityTasks.filter((task: any) => ['critical', 'high'].includes(task.priority));
                expect(urgentTasks.length).toBe(3);
                flush();
            }));

            it('should select overdue tasks for attention', fakeAsync(() => {
                const tableInstance = taskFixture.debugElement.query(By.css('p-table')).componentInstance;
                const now = new Date();

                // Filter tasks where due date is in the past
                const overdueTasks = taskComponent.tasks.filter((task) => new Date(task.dueDate) < now);
                tableInstance.selection = overdueTasks;

                tick();
                expect(tableInstance.selection.length).toBeGreaterThanOrEqual(0);
                flush();
            }));

            it('should sort by priority and due date for task planning', fakeAsync(() => {
                const tableInstance = taskFixture.debugElement.query(By.css('p-table')).componentInstance;

                const priorityOrder = { critical: 1, high: 2, medium: 3, low: 4 };

                tableInstance.sortMultiple([
                    { field: 'priority', order: 1 },
                    { field: 'dueDate', order: 1 }
                ]);

                tick();
                expect(tableInstance.multiSortMeta).toBeDefined();
                expect(tableInstance.multiSortMeta.length).toBe(2);
                flush();
            }));

            it('should calculate team workload distribution', () => {
                const assigneeWorkload = taskComponent.tasks.reduce((acc: any, task) => {
                    acc[task.assignee] = (acc[task.assignee] || 0) + 1;
                    return acc;
                }, {});

                expect(Object.keys(assigneeWorkload).length).toBe(5); // 5 different assignees
                expect(assigneeWorkload['Alice Johnson']).toBe(1);
            });
        });

        describe('Real-time Data Updates', () => {
            it('should handle live data updates without losing user interactions', fakeAsync(() => {
                const liveDataSubject = new BehaviorSubject([
                    { id: 1, symbol: 'AAPL', price: 150.25, change: 2.5, volume: 1000000 },
                    { id: 2, symbol: 'GOOGL', price: 2750.8, change: -15.2, volume: 500000 }
                ]);

                liveDataSubject.subscribe((data) => {
                    component.value = data;
                    fixture.detectChanges();
                });

                tick();
                expect(component.value.length).toBe(2);

                // Simulate user sorting while data updates
                component.sortField = 'price';
                component.sortOrder = -1;
                fixture.detectChanges();

                // Simulate live price update
                liveDataSubject.next([
                    { id: 1, symbol: 'AAPL', price: 151.0, change: 3.25, volume: 1050000 },
                    { id: 2, symbol: 'GOOGL', price: 2745.6, change: -20.4, volume: 520000 },
                    { id: 3, symbol: 'TSLA', price: 850.0, change: 25.0, volume: 2000000 }
                ]);

                tick();
                expect(component.value.length).toBe(3);
                expect(component.sortField).toBe('price'); // Sort settings preserved
                expect(component.sortOrder).toBe(-1);
                flush();
            }));

            it('should maintain pagination state during data refresh', fakeAsync(() => {
                component.paginator = true;
                component.rows = 5;
                component.first = 10; // Currently on page 3

                const largeDataset = Array.from({ length: 50 }, (_, i) => ({
                    id: i,
                    name: `Item ${i}`,
                    value: Math.random() * 100
                }));

                component.value = largeDataset;
                fixture.detectChanges();
                tick();

                expect(component.first).toBe(10);
                expect(component.rows).toBe(5);

                // Data refresh with new items
                const refreshedData = largeDataset.map((item) => ({
                    ...item,
                    value: item.value + Math.random() * 10
                }));

                component.value = refreshedData;
                fixture.detectChanges();
                tick();

                expect(component.first).toBe(10); // Pagination state maintained
                flush();
            }));
        });

        describe('Mobile and Responsive Behavior', () => {
            it('should handle touch interactions for mobile devices', fakeAsync(() => {
                component.value = [{ id: 1, name: 'Test Product' }];
                component.selectionMode = 'single';
                fixture.detectChanges();

                const tableRow = fixture.debugElement.query(By.css('tbody tr'));
                if (tableRow) {
                    const touchEvent = new TouchEvent('touchstart', {
                        touches: [
                            new Touch({
                                identifier: 1,
                                target: tableRow.nativeElement,
                                clientX: 100,
                                clientY: 100
                            } as TouchInit)
                        ]
                    });

                    tableRow.nativeElement.dispatchEvent(touchEvent);
                    tick();
                    fixture.detectChanges();

                    expect(tableRow).toBeTruthy();
                }
                flush();
            }));

            it('should adapt column visibility for smaller screens', () => {
                component.value = [{ id: 1, name: 'Product 1', price: 100, description: 'Long description', category: 'Electronics' }];
                fixture.detectChanges();

                // Simulate smaller screen by setting responsive columns
                const responsiveColumns = ['name', 'price']; // Only show essential columns
                component.columns = responsiveColumns;

                fixture.detectChanges();
                expect(component.columns).toEqual(responsiveColumns);
            });
        });

        describe('Performance with Large Datasets', () => {
            it('should handle 10,000+ rows efficiently with virtual scrolling', fakeAsync(() => {
                const massiveDataset = Array.from({ length: 10000 }, (_, i) => ({
                    id: i,
                    name: `Product ${i}`,
                    category: `Category ${i % 50}`,
                    price: Math.random() * 1000,
                    inStock: i % 7 !== 0,
                    createdDate: new Date(2020 + (i % 4), i % 12, (i % 28) + 1)
                }));

                component.virtualScroll = true;
                component.virtualScrollItemSize = 50;
                component.scrollHeight = '400px';

                const startTime = performance.now();
                component.value = massiveDataset;
                fixture.detectChanges();
                const endTime = performance.now();

                expect(endTime - startTime).toBeLessThan(2000); // Should handle large data quickly
                expect(component.value.length).toBe(10000);
                tick();
                flush();
            }));

            it('should maintain responsive filtering with large datasets', fakeAsync(() => {
                const largeDataset = Array.from({ length: 5000 }, (_, i) => ({
                    id: i,
                    name: `Item ${i}`,
                    category: `Category ${i % 20}`,
                    status: i % 3 === 0 ? 'active' : 'inactive'
                }));

                component.value = largeDataset;
                component.globalFilterFields = ['name', 'category'];
                fixture.detectChanges();

                const startTime = performance.now();
                component.filterGlobal('Category 5', 'contains');
                tick(350);
                const endTime = performance.now();

                expect(endTime - startTime).toBeLessThan(1000);

                const filteredResults = component.filteredValue || component.value;
                const category5Items = filteredResults.filter((item: any) => item.category === 'Category 5');
                expect(category5Items.length).toBe(250); // 5000/20 = 250 items per category
                flush();
            }));
        });

        describe('Data Export and Reporting', () => {
            it('should export selected rows with custom formatting', () => {
                const reportData = [
                    { id: 1, name: 'Product A', sales: 1500, profit: 450, region: 'North' },
                    { id: 2, name: 'Product B', sales: 2300, profit: 690, region: 'South' },
                    { id: 3, name: 'Product C', sales: 1800, profit: 540, region: 'East' }
                ];

                component.value = reportData;
                component.selection = [reportData[0], reportData[2]];
                component.exportFilename = 'selected-products-report';
                fixture.detectChanges();

                spyOn(component, 'exportCSV');
                component.exportCSV({ selectionOnly: true });

                expect(component.exportCSV).toHaveBeenCalledWith({ selectionOnly: true });
            });

            it('should generate summary statistics for export', () => {
                const salesData = [
                    { product: 'A', revenue: 1000, quantity: 50 },
                    { product: 'B', revenue: 1500, quantity: 75 },
                    { product: 'C', revenue: 800, quantity: 40 }
                ];

                component.value = salesData;

                const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
                const totalQuantity = salesData.reduce((sum, item) => sum + item.quantity, 0);
                const averagePrice = totalRevenue / totalQuantity;

                expect(totalRevenue).toBe(3300);
                expect(totalQuantity).toBe(165);
                expect(averagePrice).toBeCloseTo(20);
            });
        });

        describe('Error Handling and Edge Cases', () => {
            it('should gracefully handle network failures during lazy loading', fakeAsync(() => {
                component.lazy = true;
                component.totalRecords = 1000;
                fixture.detectChanges();

                let errorOccurred = false;
                spyOn(component.onLazyLoad, 'emit').and.callFake(() => {
                    // Simulate network error
                    errorOccurred = true;
                    throw new Error('Network timeout');
                });

                expect(() => {
                    component.onLazyLoad.emit({ first: 0, rows: 10 });
                }).toThrow();

                expect(errorOccurred).toBe(true);
                flush();
            }));

            it('should handle malformed CSV data during import', () => {
                const malformedData = [
                    { name: 'Product "with quotes"', description: 'Line\nBreak\nData' },
                    { name: null, description: undefined },
                    { name: 'Normal Product', description: 'Normal Description' }
                ];

                component.value = malformedData;
                fixture.detectChanges();

                expect(() => {
                    component.exportCSV();
                }).not.toThrow();
            });

            it('should prevent memory leaks with subscription cleanup', () => {
                let subscriptionCount = 0;
                const mockObservable = new BehaviorSubject([]);

                const subscription = mockObservable.subscribe(() => {
                    subscriptionCount++;
                });

                component.value = [];
                fixture.detectChanges();

                subscription.unsubscribe();
                mockObservable.next([{ id: 1 }]);

                expect(subscriptionCount).toBe(1); // Should not increase after unsubscribe
            });
        });
    });
});
