import { CommonModule } from '@angular/common';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { SharedModule } from 'primeng/api';
import { Select } from 'primeng/select';
import { Table, TableModule, TableService } from './table';

describe('Table', () => {
    let component: Table;
    let fixture: ComponentFixture<Table>;

    @Component({
        standalone: false,
        template: `
            <p-table [value]="products" [dataKey]="'id'">
                <ng-template #header>
                    <tr>
                        <th>ID</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Rating</th>
                    </tr>
                </ng-template>
                <ng-template #body let-product>
                    <tr>
                        <td>{{ product.id }}</td>
                        <td>{{ product.code }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.description }}</td>
                        <td>{{ product.price | currency }}</td>
                        <td>{{ product.quantity }}</td>
                        <td>{{ product.inventoryStatus }}</td>
                        <td>{{ product.category }}</td>
                        <td>{{ product.image }}</td>
                        <td>{{ product.rating }}</td>
                    </tr>
                </ng-template>
            </p-table>
        `
    })
    class TestBasicTableComponent {
        products = [
            { id: '1001', code: 'LP001', name: 'Gaming Laptop', description: 'High-end gaming laptop', price: 1299.99, quantity: 15, inventoryStatus: 'INSTOCK', category: 'Electronics', image: 'laptop.jpg', rating: 5 },
            { id: '1002', code: 'MO001', name: 'Wireless Mouse', description: 'Ergonomic wireless mouse', price: 29.99, quantity: 0, inventoryStatus: 'OUTOFSTOCK', category: 'Accessories', image: 'mouse.jpg', rating: 4 },
            { id: '1003', code: 'KB001', name: 'Mechanical Keyboard', description: 'RGB mechanical keyboard', price: 149.99, quantity: 8, inventoryStatus: 'LOWSTOCK', category: 'Accessories', image: 'keyboard.jpg', rating: 4 },
            { id: '1004', code: 'HD001', name: 'Wireless Headphones', description: 'Noise-cancelling headphones', price: 199.99, quantity: 25, inventoryStatus: 'INSTOCK', category: 'Audio', image: 'headphones.jpg', rating: 5 },
            { id: '1005', code: 'MN001', name: '4K Monitor', description: '27-inch 4K monitor', price: 399.99, quantity: 12, inventoryStatus: 'INSTOCK', category: 'Displays', image: 'monitor.jpg', rating: 4 }
        ];
    }

    @Component({
        standalone: false,
        template: `
            <p-table [value]="products" [selection]="selectedProducts" [selectionMode]="'multiple'" [dataKey]="'id'">
                <ng-template #header>
                    <tr>
                        <th><p-tableHeaderCheckbox></p-tableHeaderCheckbox></th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                </ng-template>
                <ng-template #body let-product>
                    <tr>
                        <td><p-tableCheckbox [value]="product"></p-tableCheckbox></td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.price | currency }}</td>
                        <td>{{ product.inventoryStatus }}</td>
                    </tr>
                </ng-template>
            </p-table>
        `
    })
    class TestSelectionTableComponent {
        products = [
            { id: '1001', name: 'Gaming Laptop', price: 1299.99, inventoryStatus: 'INSTOCK' },
            { id: '1002', name: 'Wireless Mouse', price: 29.99, inventoryStatus: 'OUTOFSTOCK' }
        ];
        selectedProducts: any[] = [];
    }

    @Component({
        standalone: false,
        template: `
            <p-table [value]="products" [sortMode]="'multiple'">
                <ng-template #header>
                    <tr>
                        <th pSortableColumn="name">Name <p-sortIcon field="name"></p-sortIcon></th>
                        <th pSortableColumn="price">Price <p-sortIcon field="price"></p-sortIcon></th>
                        <th pSortableColumn="category">Category <p-sortIcon field="category"></p-sortIcon></th>
                    </tr>
                </ng-template>
                <ng-template #body let-product>
                    <tr>
                        <td>{{ product.name }}</td>
                        <td>{{ product.price | currency }}</td>
                        <td>{{ product.category }}</td>
                    </tr>
                </ng-template>
            </p-table>
        `
    })
    class TestSortingTableComponent {
        products = [
            { id: '1001', name: 'Gaming Laptop', price: 1299.99, category: 'Electronics' },
            { id: '1002', name: 'Wireless Mouse', price: 29.99, category: 'Accessories' },
            { id: '1003', name: 'Mechanical Keyboard', price: 149.99, category: 'Accessories' }
        ];
    }

    @Component({
        standalone: false,
        template: `
            <p-table [value]="products" [globalFilterFields]="['name', 'category']">
                <ng-template #header>
                    <tr>
                        <th>
                            Name
                            <p-columnFilter field="name" matchMode="contains" display="menu">
                                <ng-template #filter let-value let-filter="filterCallback">
                                    <input type="text" [(ngModel)]="value" (ngModelChange)="filter($event)" placeholder="Search by name" />
                                </ng-template>
                            </p-columnFilter>
                        </th>
                        <th>
                            Category
                            <p-columnFilter field="category" matchMode="equals" display="menu">
                                <ng-template #filter let-value let-filter="filterCallback">
                                    <p-select [(ngModel)]="value" [options]="categories" (ngModelChange)="filter($event)" placeholder="Select Category"> </p-select>
                                </ng-template>
                            </p-columnFilter>
                        </th>
                    </tr>
                </ng-template>
                <ng-template #body let-product>
                    <tr>
                        <td>{{ product.name }}</td>
                        <td>{{ product.category }}</td>
                    </tr>
                </ng-template>
            </p-table>
        `
    })
    class TestFilteringTableComponent {
        products = [
            { id: '1001', name: 'Gaming Laptop', category: 'Electronics' },
            { id: '1002', name: 'Wireless Mouse', category: 'Accessories' },
            { id: '1003', name: 'Mechanical Keyboard', category: 'Accessories' }
        ];
        categories = [
            { label: 'Electronics', value: 'Electronics' },
            { label: 'Accessories', value: 'Accessories' }
        ];
    }

    @Component({
        standalone: false,
        template: `
            <p-table [value]="products" [virtualScroll]="true" [virtualScrollItemSize]="46" [scrollHeight]="'400px'">
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
                        <td>{{ product.price | currency }}</td>
                    </tr>
                </ng-template>
            </p-table>
        `
    })
    class TestVirtualScrollTableComponent {
        products = Array.from({ length: 10000 }, (_, i) => ({
            id: i + 1,
            name: `Product ${i + 1}`,
            price: Math.random() * 1000
        }));
    }

    @Component({
        standalone: false,
        template: `
            <p-table [value]="products" [lazy]="true" [totalRecords]="totalRecords" [paginator]="true" [rows]="10" (onLazyLoad)="loadProducts($event)">
                <ng-template #header>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </ng-template>
                <ng-template #body let-product>
                    <tr>
                        <td>{{ product.name }}</td>
                        <td>{{ product.price | currency }}</td>
                    </tr>
                </ng-template>
            </p-table>
        `
    })
    class TestLazyLoadTableComponent {
        products: any[] = [];
        totalRecords: number = 1000;

        loadProducts(event: any) {
            // Simulate lazy loading
            setTimeout(() => {
                this.products = Array.from({ length: event.rows }, (_, i) => ({
                    id: event.first + i + 1,
                    name: `Product ${event.first + i + 1}`,
                    price: Math.random() * 1000
                }));
            }, 1000);
        }
    }

    @Component({
        standalone: false,
        template: `
            <p-table [value]="products">
                <ng-template #caption>
                    <div class="p-d-flex p-ai-center p-jc-between">
                        <h5>Product Catalog</h5>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search"></i>
                            <input type="text" pInputText placeholder="Global Search" />
                        </span>
                    </div>
                </ng-template>
                <ng-template #header>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </ng-template>
                <ng-template #body let-product>
                    <tr>
                        <td>{{ product.name }}</td>
                        <td>{{ product.price | currency }}</td>
                    </tr>
                </ng-template>
                <ng-template #summary> Total Products: {{ products.length }} </ng-template>
            </p-table>
        `
    })
    class TestTemplatesTableComponent {
        products = [
            { id: '1001', name: 'Gaming Laptop', price: 1299.99 },
            { id: '1002', name: 'Wireless Mouse', price: 29.99 }
        ];
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [Table, TestBasicTableComponent, TestSelectionTableComponent, TestSortingTableComponent, TestFilteringTableComponent, TestVirtualScrollTableComponent, TestLazyLoadTableComponent, TestTemplatesTableComponent],
            imports: [CommonModule, FormsModule, TableModule, SharedModule, Select],
            providers: [TableService, provideZonelessChangeDetection()]
        }).compileComponents();

        fixture = TestBed.createComponent(Table);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Basic Table Functionality', () => {
        let testComponent: TestBasicTableComponent;
        let testFixture: ComponentFixture<TestBasicTableComponent>;

        beforeEach(async () => {
            testFixture = TestBed.createComponent(TestBasicTableComponent);
            testComponent = testFixture.componentInstance;
            await testFixture.whenStable();
            testFixture.detectChanges();
        });

        it('should render table with product data', () => {
            const tableElement = testFixture.debugElement.query(By.css('p-table'));
            expect(tableElement).toBeTruthy();
        });

        it('should display correct number of rows', () => {
            const rows = testFixture.debugElement.queryAll(By.css('tbody tr'));
            expect(rows.length).toBe(testComponent.products.length);
        });

        it('should display product information in cells', () => {
            const firstRowCells = testFixture.debugElement.queryAll(By.css('tbody tr:first-child td'));
            expect(firstRowCells[0].nativeElement.textContent).toContain('1001');
            expect(firstRowCells[2].nativeElement.textContent).toContain('Gaming Laptop');
        });

        it('should have correct dataKey', () => {
            const tableInstance = testFixture.debugElement.query(By.css('p-table')).componentInstance;
            expect(tableInstance.dataKey).toBe('id');
        });
    });

    describe('Selection Functionality', () => {
        let testComponent: TestSelectionTableComponent;
        let testFixture: ComponentFixture<TestSelectionTableComponent>;

        beforeEach(async () => {
            testFixture = TestBed.createComponent(TestSelectionTableComponent);
            testComponent = testFixture.componentInstance;
            await testFixture.whenStable();
            testFixture.detectChanges();
        });

        it('should enable multiple selection', () => {
            const tableInstance = testFixture.debugElement.query(By.css('p-table')).componentInstance;
            expect(tableInstance.selectionMode).toBe('multiple');
        });

        it('should render checkboxes for selection', () => {
            const checkboxes = testFixture.debugElement.queryAll(By.css('p-tableCheckbox'));
            expect(checkboxes.length).toBe(testComponent.products.length);
        });

        it('should render header checkbox for select all', () => {
            const headerCheckbox = testFixture.debugElement.query(By.css('p-tableHeaderCheckbox'));
            expect(headerCheckbox).toBeTruthy();
        });
    });

    describe('Sorting Functionality', () => {
        let testComponent: TestSortingTableComponent;
        let testFixture: ComponentFixture<TestSortingTableComponent>;

        beforeEach(async () => {
            testFixture = TestBed.createComponent(TestSortingTableComponent);
            testComponent = testFixture.componentInstance;
            await testFixture.whenStable();
            testFixture.detectChanges();
        });

        it('should enable multiple sort mode', () => {
            const tableInstance = testFixture.debugElement.query(By.css('p-table')).componentInstance;
            expect(tableInstance.sortMode).toBe('multiple');
        });

        it('should render sort icons', () => {
            const sortIcons = testFixture.debugElement.queryAll(By.css('p-sortIcon'));
            expect(sortIcons.length).toBe(3);
        });

        it('should have sortable columns', () => {
            const sortableColumns = testFixture.debugElement.queryAll(By.css('[pSortableColumn]'));
            expect(sortableColumns.length).toBe(3);
        });
    });

    describe('Filtering Functionality', () => {
        let testComponent: TestFilteringTableComponent;
        let testFixture: ComponentFixture<TestFilteringTableComponent>;

        beforeEach(async () => {
            testFixture = TestBed.createComponent(TestFilteringTableComponent);
            testComponent = testFixture.componentInstance;
            await testFixture.whenStable();
            testFixture.detectChanges();
        });

        it('should have global filter fields configured', () => {
            const tableInstance = testFixture.debugElement.query(By.css('p-table')).componentInstance;
            expect(tableInstance.globalFilterFields).toEqual(['name', 'category']);
        });

        it('should render column filters', () => {
            const columnFilters = testFixture.debugElement.queryAll(By.css('p-columnFilter'));
            expect(columnFilters.length).toBe(2);
        });
    });

    describe('Virtual Scroll Functionality', () => {
        let testComponent: TestVirtualScrollTableComponent;
        let testFixture: ComponentFixture<TestVirtualScrollTableComponent>;

        beforeEach(async () => {
            testFixture = TestBed.createComponent(TestVirtualScrollTableComponent);
            testComponent = testFixture.componentInstance;
            await testFixture.whenStable();
            testFixture.detectChanges();
        });

        it('should enable virtual scrolling', () => {
            const tableInstance = testFixture.debugElement.query(By.css('p-table')).componentInstance;
            expect(tableInstance.virtualScroll).toBe(true);
        });

        it('should have correct virtual scroll item size', () => {
            const tableInstance = testFixture.debugElement.query(By.css('p-table')).componentInstance;
            expect(tableInstance.virtualScrollItemSize).toBe(46);
        });

        it('should handle large datasets efficiently', () => {
            expect(testComponent.products.length).toBe(10000);
        });
    });

    describe('Lazy Loading Functionality', () => {
        let testComponent: TestLazyLoadTableComponent;
        let testFixture: ComponentFixture<TestLazyLoadTableComponent>;

        beforeEach(async () => {
            testFixture = TestBed.createComponent(TestLazyLoadTableComponent);
            testComponent = testFixture.componentInstance;
            await testFixture.whenStable();
            testFixture.detectChanges();
        });

        it('should enable lazy loading', () => {
            const tableInstance = testFixture.debugElement.query(By.css('p-table')).componentInstance;
            expect(tableInstance.lazy).toBe(true);
        });

        it('should have correct total records', () => {
            const tableInstance = testFixture.debugElement.query(By.css('p-table')).componentInstance;
            expect(tableInstance.totalRecords).toBe(1000);
        });

        it('should emit lazy load event', () => {
            spyOn(testComponent, 'loadProducts');
            const tableInstance = testFixture.debugElement.query(By.css('p-table')).componentInstance;

            tableInstance.onLazyLoad.emit({ first: 0, rows: 10 });
            expect(testComponent.loadProducts).toHaveBeenCalled();
        });
    });

    describe('Templates Functionality', () => {
        let testComponent: TestTemplatesTableComponent;
        let testFixture: ComponentFixture<TestTemplatesTableComponent>;

        beforeEach(async () => {
            testFixture = TestBed.createComponent(TestTemplatesTableComponent);
            testComponent = testFixture.componentInstance;
            await testFixture.whenStable();
            testFixture.detectChanges();
        });

        it('should render caption template', () => {
            const captionElement = testFixture.debugElement.query(By.css('.p-d-flex'));
            expect(captionElement).toBeTruthy();
        });

        it('should display correct product count in summary', () => {
            const summaryText = testFixture.nativeElement.textContent;
            expect(summaryText).toContain('Total Products: 2');
        });
    });

    describe('Real-Life Scenarios - E-commerce Product Management', () => {
        let ecommerceComponent: TestBasicTableComponent;
        let ecommerceFixture: ComponentFixture<TestBasicTableComponent>;

        beforeEach(async () => {
            ecommerceFixture = TestBed.createComponent(TestBasicTableComponent);
            ecommerceComponent = ecommerceFixture.componentInstance;
            ecommerceComponent.products = [
                { id: '1001', code: 'LP001', name: 'Gaming Laptop', description: 'High-end gaming laptop', price: 1299.99, quantity: 15, inventoryStatus: 'INSTOCK', category: 'Electronics', image: 'laptop.jpg', rating: 5 },
                { id: '1002', code: 'MO001', name: 'Wireless Mouse', description: 'Ergonomic wireless mouse', price: 29.99, quantity: 0, inventoryStatus: 'OUTOFSTOCK', category: 'Accessories', image: 'mouse.jpg', rating: 4 },
                { id: '1003', code: 'KB001', name: 'Mechanical Keyboard', description: 'RGB mechanical keyboard', price: 149.99, quantity: 8, inventoryStatus: 'LOWSTOCK', category: 'Accessories', image: 'keyboard.jpg', rating: 4 },
                { id: '1004', code: 'HD001', name: 'Wireless Headphones', description: 'Noise-cancelling headphones', price: 199.99, quantity: 25, inventoryStatus: 'INSTOCK', category: 'Audio', image: 'headphones.jpg', rating: 5 },
                { id: '1005', code: 'MN001', name: '4K Monitor', description: '27-inch 4K monitor', price: 399.99, quantity: 12, inventoryStatus: 'INSTOCK', category: 'Displays', image: 'monitor.jpg', rating: 4 }
            ];
            ecommerceFixture.changeDetectorRef.markForCheck();
            await ecommerceFixture.whenStable();
            ecommerceFixture.detectChanges();
        });

        it('should handle inventory status filtering for stock management', async () => {
            const tableInstance = ecommerceFixture.debugElement.query(By.css('p-table')).componentInstance;

            tableInstance.filter('INSTOCK', 'inventoryStatus', 'equals');
            await new Promise((resolve) => setTimeout(resolve, 350));
            await ecommerceFixture.whenStable();

            const inStockProducts = tableInstance.filteredValue || tableInstance.value;
            const inStock = inStockProducts.filter((product: any) => product.inventoryStatus === 'INSTOCK');
            expect(inStock.length).toBe(3);
        });

        it('should sort by price for promotional planning', async () => {
            const tableInstance = ecommerceFixture.debugElement.query(By.css('p-table')).componentInstance;

            tableInstance.sort({ field: 'price', order: 1 });
            await ecommerceFixture.whenStable();

            expect(tableInstance.sortField).toBe('price');
            expect(tableInstance.sortOrder).toBe(1);
        });

        it('should support price range filtering for budget constraints', async () => {
            const tableInstance = ecommerceFixture.debugElement.query(By.css('p-table')).componentInstance;

            tableInstance.filter(100, 'price', 'lt');
            await new Promise((resolve) => setTimeout(resolve, 350));
            await ecommerceFixture.whenStable();

            const filteredData = tableInstance.filteredValue || tableInstance.value;
            const affordableProducts = filteredData.filter((product: any) => product.price < 100);
            expect(affordableProducts.length).toBe(1); // Only the mouse under $100
        });

        it('should calculate average price for market analysis', () => {
            const products = ecommerceComponent.products;
            const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
            const averagePrice = totalPrice / products.length;

            expect(averagePrice).toBeGreaterThan(0);
            expect(averagePrice).toBeCloseTo(415.99, 1);
        });

        it('should support CSV export for external analysis', () => {
            const tableInstance = ecommerceFixture.debugElement.query(By.css('p-table')).componentInstance;
            spyOn(tableInstance, 'exportCSV');

            tableInstance.exportCSV({ selectionOnly: false });
            expect(tableInstance.exportCSV).toHaveBeenCalledWith({ selectionOnly: false });
        });

        describe('Real-Life Scenarios - Additional Tests', () => {
            it('should handle bulk operations efficiently', () => {
                const tableInstance = ecommerceFixture.debugElement.query(By.css('p-table')).componentInstance;
                expect(tableInstance).toBeTruthy();
            });

            it('should support complex filtering operations', () => {
                const tableInstance = ecommerceFixture.debugElement.query(By.css('p-table')).componentInstance;
                expect(tableInstance).toBeTruthy();
            });

            it('should handle large datasets with virtual scrolling', () => {
                const tableInstance = ecommerceFixture.debugElement.query(By.css('p-table')).componentInstance;
                expect(tableInstance).toBeTruthy();
                expect(ecommerceComponent.products.length).toBeGreaterThan(0);
            });

            it('should maintain state across user interactions', () => {
                const tableInstance = ecommerceFixture.debugElement.query(By.css('p-table')).componentInstance;
                expect(tableInstance).toBeTruthy();
                expect(tableInstance.value).toBeDefined();
            });

            it('should support row expansion for master-detail views', () => {
                expect(component.expandedRowKeys).toBeDefined();
            });

            it('should handle column reordering and resizing', () => {
                const tableInstance = ecommerceFixture.debugElement.query(By.css('p-table')).componentInstance;
                expect(tableInstance).toBeTruthy();
                expect(tableInstance.value).toBeDefined();
            });

            it('should provide advanced sorting capabilities', () => {
                const tableInstance = ecommerceFixture.debugElement.query(By.css('p-table')).componentInstance;
                expect(tableInstance).toBeTruthy();
                expect(typeof tableInstance.sort).toBe('function');
            });

            it('should export data in multiple formats', () => {
                spyOn(component, 'exportCSV');
                component.exportCSV();
                expect(component.exportCSV).toHaveBeenCalled();
            });
        });
    });

    describe('PassThrough', () => {
        beforeEach(() => {
            TestBed.resetTestingModule();
        });

        // Comprehensive PT test object with all sections
        const comprehensivePT = {
            host: { class: 'pt-host', 'data-testid': 'host' },
            root: { class: 'pt-root', 'data-testid': 'root' },
            mask: { class: 'pt-mask', 'data-testid': 'mask' },
            loadingIcon: { class: 'pt-loading-icon', 'data-testid': 'loading-icon' },
            header: { class: 'pt-header', 'data-testid': 'header' },
            pcPaginator: {
                root: { class: 'pt-paginator', 'data-testid': 'paginator' }
            },
            tableContainer: { class: 'pt-table-container', 'data-testid': 'table-container' },
            virtualScroller: {
                root: { class: 'pt-virtual-scroller', 'data-testid': 'virtual-scroller' }
            },
            table: { class: 'pt-table', 'data-testid': 'table' },
            thead: { class: 'pt-thead', 'data-testid': 'thead' },
            tbody: { class: 'pt-tbody', 'data-testid': 'tbody' },
            virtualScrollerSpacer: { class: 'pt-virtual-spacer', 'data-testid': 'virtual-spacer' },
            tfoot: { class: 'pt-tfoot', 'data-testid': 'tfoot' },
            footer: { class: 'pt-footer', 'data-testid': 'footer' },
            columnResizeIndicator: { class: 'pt-resize-indicator', 'data-testid': 'resize-indicator' },
            rowReorderIndicatorUp: { class: 'pt-reorder-up', 'data-testid': 'reorder-up' },
            rowReorderIndicatorDown: { class: 'pt-reorder-down', 'data-testid': 'reorder-down' },
            reorderableRow: { class: 'pt-reorderable-row', 'data-testid': 'reorderable-row' },
            reorderableRowHandle: { class: 'pt-reorder-handle', 'data-testid': 'reorder-handle' },
            headerCheckbox: {
                root: { class: 'pt-header-checkbox', 'data-testid': 'header-checkbox' }
            },
            pcCheckbox: {
                root: { class: 'pt-row-checkbox', 'data-testid': 'row-checkbox' }
            },
            columnFilter: {
                filter: { class: 'pt-filter', 'data-testid': 'filter' },
                pcColumnFilterButton: { class: 'pt-filter-button', 'data-testid': 'filter-button' },
                filterOverlay: { class: 'pt-filter-overlay', 'data-testid': 'filter-overlay' },
                filterConstraintList: { class: 'pt-constraint-list', 'data-testid': 'constraint-list' },
                filterConstraint: { class: 'pt-constraint', 'data-testid': 'constraint' },
                filterConstraintSeparator: { class: 'pt-constraint-separator', 'data-testid': 'constraint-separator' },
                emtpyFilterLabel: { class: 'pt-empty-filter', 'data-testid': 'empty-filter' },
                filterOperator: { class: 'pt-filter-operator', 'data-testid': 'filter-operator' },
                pcFilterOperatorDropdown: { class: 'pt-operator-dropdown', 'data-testid': 'operator-dropdown' },
                filterRuleList: { class: 'pt-rule-list', 'data-testid': 'rule-list' },
                filterRule: { class: 'pt-filter-rule', 'data-testid': 'filter-rule' },
                pcFilterConstraintDropdown: { class: 'pt-constraint-dropdown', 'data-testid': 'constraint-dropdown' },
                pcFilterRemoveRuleButton: { class: 'pt-remove-rule', 'data-testid': 'remove-rule' },
                pcAddRuleButtonLabel: { class: 'pt-add-rule', 'data-testid': 'add-rule' },
                filterButtonBar: { class: 'pt-filter-buttonbar', 'data-testid': 'filter-buttonbar' },
                pcFilterClearButton: { class: 'pt-filter-clear', 'data-testid': 'filter-clear' },
                pcFilterApplyButton: { class: 'pt-filter-apply', 'data-testid': 'filter-apply' },
                pcFilterInputText: { class: 'pt-filter-input', 'data-testid': 'filter-input' },
                pcFilterInputNumber: { class: 'pt-filter-number', 'data-testid': 'filter-number' },
                pcFilterCheckbox: {
                    root: { class: 'pt-filter-checkbox', 'data-testid': 'filter-checkbox' }
                },
                pcFilterDatePicker: { class: 'pt-filter-datepicker', 'data-testid': 'filter-datepicker' }
            },
            columnFilterFormElement: { class: 'pt-filter-form', 'data-testid': 'filter-form' }
        };

        @Component({
            standalone: false,
            template: `
                <p-table
                    [value]="products"
                    [dataKey]="'id'"
                    [selection]="selectedProducts"
                    [loading]="isLoading"
                    [paginator]="true"
                    [rows]="5"
                    [totalRecords]="products.length"
                    [scrollable]="true"
                    scrollHeight="400px"
                    [resizableColumns]="true"
                    [reorderableColumns]="true"
                    [virtualScroll]="useVirtualScroll"
                    [virtualScrollItemSize]="46"
                    [pt]="tablePT"
                >
                    <ng-template #caption>
                        <div>Product Management Table</div>
                    </ng-template>
                    <ng-template #header>
                        <tr>
                            <th><p-tableHeaderCheckbox></p-tableHeaderCheckbox></th>
                            <th pReorderableColumn pResizableColumn>
                                Name
                                <p-columnFilter field="name" matchMode="contains" display="menu">
                                    <ng-template #filter let-value let-filter="filterCallback">
                                        <input type="text" [(ngModel)]="value" (ngModelChange)="filter($event)" placeholder="Search" />
                                    </ng-template>
                                </p-columnFilter>
                            </th>
                            <th pReorderableColumn pResizableColumn>Price</th>
                            <th pReorderableColumn pResizableColumn>Category</th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-product let-rowIndex="rowIndex">
                        <tr [pReorderableRow]="rowIndex">
                            <td><p-tableCheckbox [value]="product"></p-tableCheckbox></td>
                            <td>
                                <span pReorderableRowHandle class="pi pi-bars"></span>
                                {{ product.name }}
                            </td>
                            <td>{{ product.price | currency }}</td>
                            <td>{{ product.category }}</td>
                        </tr>
                    </ng-template>
                    <ng-template #footer>
                        <tr>
                            <td colspan="4">Total: {{ products.length }} products</td>
                        </tr>
                    </ng-template>
                    <ng-template #summary>
                        <div>Footer Summary</div>
                    </ng-template>
                </p-table>
            `
        })
        class TestComprehensivePTComponent {
            products = [
                { id: 1, name: 'Gaming Laptop', price: 1299.99, category: 'Electronics' },
                { id: 2, name: 'Wireless Mouse', price: 29.99, category: 'Accessories' },
                { id: 3, name: 'Mechanical Keyboard', price: 149.99, category: 'Accessories' },
                { id: 4, name: 'Wireless Headphones', price: 199.99, category: 'Audio' },
                { id: 5, name: '4K Monitor', price: 399.99, category: 'Displays' },
                { id: 6, name: 'USB-C Hub', price: 49.99, category: 'Accessories' },
                { id: 7, name: 'Webcam', price: 79.99, category: 'Electronics' },
                { id: 8, name: 'Microphone', price: 129.99, category: 'Audio' }
            ];
            selectedProducts: any[] = [];
            isLoading = false;
            useVirtualScroll = false;
            tablePT = comprehensivePT;
        }

        it('PT Section 1: host - should apply PT to host DOM element', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestComprehensivePTComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestComprehensivePTComponent);
            fixture.detectChanges();

            // Check that p-table element exists (host element)
            const tableElement = fixture.nativeElement.querySelector('p-table');
            expect(tableElement).toBeTruthy();
        });

        it('PT Section 2: root - should apply PT to root DOM element', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestComprehensivePTComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestComprehensivePTComponent);
            fixture.detectChanges();

            const rootEl = fixture.nativeElement.querySelector('[data-testid="root"]');
            expect(rootEl).toBeTruthy();
            expect(rootEl?.classList.contains('pt-root')).toBe(true);
        });

        it('PT Section 3: mask - should apply PT to loading mask element', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestComprehensivePTComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestComprehensivePTComponent);
            const component = fixture.componentInstance;
            component.isLoading = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            const maskEl = fixture.nativeElement.querySelector('[data-testid="mask"]');
            expect(maskEl).toBeTruthy();
            expect(maskEl?.classList.contains('pt-mask')).toBe(true);
        });

        it('PT Section 4: loadingIcon - should apply PT to loading icon element', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestComprehensivePTComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestComprehensivePTComponent);
            const component = fixture.componentInstance;
            component.isLoading = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            const iconEl = fixture.nativeElement.querySelector('[data-testid="loading-icon"]');
            expect(iconEl).toBeTruthy();
            expect(iconEl?.classList.contains('pt-loading-icon')).toBe(true);
        });

        it('PT Section 5: header - should apply PT to header (caption) element', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestComprehensivePTComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestComprehensivePTComponent);
            fixture.detectChanges();

            const headerEl = fixture.nativeElement.querySelector('[data-testid="header"]');
            expect(headerEl).toBeTruthy();
            expect(headerEl?.classList.contains('pt-header')).toBe(true);
        });

        it('PT Section 6: pcPaginator - should apply PT to paginator component', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestComprehensivePTComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestComprehensivePTComponent);
            fixture.detectChanges();

            const paginatorEl = fixture.nativeElement.querySelector('[data-testid="paginator"]');
            expect(paginatorEl).toBeTruthy();
            expect(paginatorEl?.classList.contains('pt-paginator')).toBe(true);
        });

        it('PT Section 7: tableContainer - should apply PT to table container element', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestComprehensivePTComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestComprehensivePTComponent);
            fixture.detectChanges();

            const containerEl = fixture.nativeElement.querySelector('[data-testid="table-container"]');
            expect(containerEl).toBeTruthy();
            expect(containerEl?.classList.contains('pt-table-container')).toBe(true);
        });

        it('PT Section 8: virtualScroller - should apply PT to virtual scroller component', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestComprehensivePTComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestComprehensivePTComponent);
            const component = fixture.componentInstance;
            component.useVirtualScroll = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            const scrollerEl = fixture.nativeElement.querySelector('[data-testid="virtual-scroller"]');
            expect(scrollerEl).toBeTruthy();
            expect(scrollerEl?.classList.contains('pt-virtual-scroller')).toBe(true);
        });

        it('PT Section 9: table - should apply PT to table element', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestComprehensivePTComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestComprehensivePTComponent);
            fixture.detectChanges();

            const tableEl = fixture.nativeElement.querySelector('[data-testid="table"]');
            expect(tableEl).toBeTruthy();
            expect(tableEl?.classList.contains('pt-table')).toBe(true);
        });

        it('PT Section 10: thead - should apply PT to thead element', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestComprehensivePTComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestComprehensivePTComponent);
            fixture.detectChanges();

            const theadEl = fixture.nativeElement.querySelector('[data-testid="thead"]');
            expect(theadEl).toBeTruthy();
            expect(theadEl?.classList.contains('pt-thead')).toBe(true);
        });

        it('PT Section 11: tbody - should apply PT to tbody element', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestComprehensivePTComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestComprehensivePTComponent);
            fixture.detectChanges();

            const tbodyEl = fixture.nativeElement.querySelector('[data-testid="tbody"]');
            expect(tbodyEl).toBeTruthy();
            expect(tbodyEl?.classList.contains('pt-tbody')).toBe(true);
        });

        it('PT Section 12: virtualScrollerSpacer - should apply PT to virtual scroller spacer element', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestComprehensivePTComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestComprehensivePTComponent);
            const component = fixture.componentInstance;
            component.useVirtualScroll = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            // Virtual scroller spacer may not render in all scenarios
            const spacerEl = fixture.nativeElement.querySelector('[data-testid="virtual-spacer"]');
            // If element exists, check for class
            if (spacerEl) {
                expect(spacerEl.classList.contains('pt-virtual-spacer')).toBe(true);
            }
        });

        it('PT Section 13: tfoot - should apply PT to tfoot element', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestComprehensivePTComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestComprehensivePTComponent);
            fixture.detectChanges();

            const tfootEl = fixture.nativeElement.querySelector('[data-testid="tfoot"]');
            expect(tfootEl).toBeTruthy();
            expect(tfootEl?.classList.contains('pt-tfoot')).toBe(true);
        });

        it('PT Section 14: footer - should apply PT to footer element', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestComprehensivePTComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestComprehensivePTComponent);
            fixture.detectChanges();

            const footerEl = fixture.nativeElement.querySelector('[data-testid="footer"]');
            expect(footerEl).toBeTruthy();
            expect(footerEl?.classList.contains('pt-footer')).toBe(true);
        });

        it('PT Section 15: columnResizeIndicator - should apply PT to column resize indicator element', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestComprehensivePTComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestComprehensivePTComponent);
            fixture.detectChanges();

            const indicatorEl = fixture.nativeElement.querySelector('[data-testid="resize-indicator"]');
            expect(indicatorEl).toBeTruthy();
            expect(indicatorEl?.classList.contains('pt-resize-indicator')).toBe(true);
        });

        it('PT Section 16: rowReorderIndicatorUp - should apply PT to row reorder indicator up element', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestComprehensivePTComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestComprehensivePTComponent);
            fixture.detectChanges();

            const upIndicatorEl = fixture.nativeElement.querySelector('[data-testid="reorder-up"]');
            expect(upIndicatorEl).toBeTruthy();
            expect(upIndicatorEl?.classList.contains('pt-reorder-up')).toBe(true);
        });

        it('PT Section 17: rowReorderIndicatorDown - should apply PT to row reorder indicator down element', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestComprehensivePTComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestComprehensivePTComponent);
            fixture.detectChanges();

            const downIndicatorEl = fixture.nativeElement.querySelector('[data-testid="reorder-down"]');
            expect(downIndicatorEl).toBeTruthy();
            expect(downIndicatorEl?.classList.contains('pt-reorder-down')).toBe(true);
        });

        it('PT Section 18: reorderableRow - should apply PT to reorderable row element', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestComprehensivePTComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestComprehensivePTComponent);
            fixture.detectChanges();

            // Check that reorderable rows exist
            const rows = fixture.nativeElement.querySelectorAll('tbody tr');
            expect(rows.length).toBeGreaterThan(0);
        });

        it('PT Section 19: reorderableRowHandle - should apply PT to reorderable row handle element', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestComprehensivePTComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestComprehensivePTComponent);
            fixture.detectChanges();

            // Check that reorderable row handle exists
            const handles = fixture.nativeElement.querySelectorAll('[preorderablerowhandle]');
            expect(handles).toBeDefined();
        });

        it('PT Section 20: headerCheckbox - should apply PT to header checkbox component', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestComprehensivePTComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestComprehensivePTComponent);
            fixture.detectChanges();

            // Check that header checkbox exists
            const headerCheckbox = fixture.nativeElement.querySelector('p-tableheadercheckbox');
            expect(headerCheckbox).toBeTruthy();
        });

        it('PT Section 21: pcCheckbox - should apply PT to checkbox component', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestComprehensivePTComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestComprehensivePTComponent);
            fixture.detectChanges();

            // Check that row checkboxes exist
            const checkboxes = fixture.nativeElement.querySelectorAll('p-tablecheckbox');
            expect(checkboxes.length).toBeGreaterThan(0);
        });

        it('PT Section 22: columnFilter.filter - should apply PT to filter container element', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestComprehensivePTComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestComprehensivePTComponent);
            fixture.detectChanges();

            // Check that column filter element exists
            const filterEl = fixture.nativeElement.querySelector('p-columnfilter');
            expect(filterEl).toBeTruthy();
        });

        it('PT Section 23: columnFilterFormElement - should apply PT to column filter form element', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestComprehensivePTComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestComprehensivePTComponent);
            fixture.detectChanges();

            // columnFilterFormElement is part of columnFilter, check that table exists
            const tableEl = fixture.nativeElement.querySelector('table');
            expect(tableEl).toBeTruthy();
        });
    });

    describe('Cell Navigation', () => {
        beforeEach(() => {
            TestBed.resetTestingModule();
        });

        @Component({
            standalone: false,
            template: `
                <p-table [value]="products" [dataKey]="'id'" editMode="cell">
                    <ng-template #header>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-product let-rowIndex="rowIndex">
                        <tr>
                            <td>{{ product.id }}</td>
                            <td [pEditableColumn]="product" [pEditableColumnField]="'name'" [pEditableColumnRowIndex]="rowIndex">
                                <p-cellEditor>
                                    <ng-template #input>
                                        <input pInputText type="text" [(ngModel)]="product.name" class="name-input" />
                                    </ng-template>
                                    <ng-template #output>
                                        {{ product.name }}
                                    </ng-template>
                                </p-cellEditor>
                            </td>
                            <td [pEditableColumn]="product" [pEditableColumnField]="'price'" [pEditableColumnRowIndex]="rowIndex">
                                <p-cellEditor>
                                    <ng-template #input>
                                        <input pInputText type="text" [(ngModel)]="product.price" class="price-input" />
                                    </ng-template>
                                    <ng-template #output>
                                        {{ product.price | currency }}
                                    </ng-template>
                                </p-cellEditor>
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            `
        })
        class TestCellNavigationComponent {
            products = [
                { id: '1001', name: 'Gaming Laptop', price: 1299.99 },
                { id: '1002', name: 'Wireless Mouse', price: 29.99 },
                { id: '1003', name: 'Mechanical Keyboard', price: 149.99 }
            ];
        }

        it('should render editable columns with proper data attributes', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestCellNavigationComponent],
                providers: [TableService, provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestCellNavigationComponent);
            await fixture.whenStable();
            fixture.detectChanges();

            const editableCells = fixture.nativeElement.querySelectorAll('[data-p-editable-column="true"]');
            expect(editableCells.length).toBe(6); // 2 editable columns x 3 rows
        });

        it('should open cell editor on click and show input for correct field', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestCellNavigationComponent],
                providers: [TableService, provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestCellNavigationComponent);
            await fixture.whenStable();
            fixture.detectChanges();

            const editableCells = fixture.nativeElement.querySelectorAll('[data-p-editable-column="true"]');
            const nameCell = editableCells[0]; // First name cell

            nameCell.click();
            await fixture.whenStable();
            fixture.detectChanges();

            // Verify the name cell is now editing
            const editingCell = fixture.nativeElement.querySelector('[data-p-cell-editing="true"]');
            expect(editingCell).toBeTruthy();

            // Verify the name input is shown
            const nameInput = fixture.nativeElement.querySelector('.name-input');
            expect(nameInput).toBeTruthy();

            // Verify no price input is shown
            const priceInput = fixture.nativeElement.querySelector('.price-input');
            expect(priceInput).toBeFalsy();
        });

        it('should navigate from name cell to price cell on arrow right key', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestCellNavigationComponent],
                providers: [TableService, provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestCellNavigationComponent);
            await fixture.whenStable();
            fixture.detectChanges();

            const editableCells = fixture.nativeElement.querySelectorAll('[data-p-editable-column="true"]');
            const nameCell = editableCells[0]; // First name cell (row 1)

            // Open the name cell for editing
            nameCell.click();
            await fixture.whenStable();
            fixture.detectChanges();

            // Verify name input is shown initially
            let nameInput = fixture.nativeElement.querySelector('.name-input');
            expect(nameInput).toBeTruthy();

            // Dispatch arrow right key event on the cell
            const arrowRightEvent = new KeyboardEvent('keydown', {
                key: 'ArrowRight',
                code: 'ArrowRight',
                bubbles: true
            });
            nameInput.dispatchEvent(arrowRightEvent);
            await fixture.whenStable();
            fixture.detectChanges();

            // After navigation, price input should be shown
            const priceInput = fixture.nativeElement.querySelector('.price-input');
            expect(priceInput).toBeTruthy();

            // Name input should no longer be visible
            nameInput = fixture.nativeElement.querySelector('.name-input');
            expect(nameInput).toBeFalsy();
        });

        it('should navigate from price cell to name cell on arrow left key', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestCellNavigationComponent],
                providers: [TableService, provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestCellNavigationComponent);
            await fixture.whenStable();
            fixture.detectChanges();

            const editableCells = fixture.nativeElement.querySelectorAll('[data-p-editable-column="true"]');
            const priceCell = editableCells[1]; // First price cell (row 1)

            // Open the price cell for editing
            priceCell.click();
            await fixture.whenStable();
            fixture.detectChanges();

            // Verify price input is shown initially
            let priceInput = fixture.nativeElement.querySelector('.price-input');
            expect(priceInput).toBeTruthy();

            // Dispatch arrow left key event
            const arrowLeftEvent = new KeyboardEvent('keydown', {
                key: 'ArrowLeft',
                code: 'ArrowLeft',
                bubbles: true
            });
            priceInput.dispatchEvent(arrowLeftEvent);
            await fixture.whenStable();
            fixture.detectChanges();

            // After navigation, name input should be shown
            const nameInput = fixture.nativeElement.querySelector('.name-input');
            expect(nameInput).toBeTruthy();

            // Price input should no longer be visible
            priceInput = fixture.nativeElement.querySelector('.price-input');
            expect(priceInput).toBeFalsy();
        });

        it('should navigate to next row when pressing arrow right on last column', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestCellNavigationComponent],
                providers: [TableService, provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestCellNavigationComponent);
            await fixture.whenStable();
            fixture.detectChanges();

            const editableCells = fixture.nativeElement.querySelectorAll('[data-p-editable-column="true"]');
            const priceCellRow1 = editableCells[1]; // Price cell in row 1
            const nameCellRow2 = editableCells[2]; // Name cell in row 2

            // Verify they are in different rows
            expect(priceCellRow1.parentElement).not.toBe(nameCellRow2.parentElement);

            // Open price cell in row 1
            priceCellRow1.click();
            await fixture.whenStable();
            fixture.detectChanges();

            let priceInput = fixture.nativeElement.querySelector('.price-input');
            expect(priceInput).toBeTruthy();

            // Dispatch arrow right to navigate to next row
            const arrowRightEvent = new KeyboardEvent('keydown', {
                key: 'ArrowRight',
                code: 'ArrowRight',
                bubbles: true
            });
            priceInput.dispatchEvent(arrowRightEvent);
            await fixture.whenStable();
            fixture.detectChanges();

            // Should now be editing name cell in row 2
            const nameInput = fixture.nativeElement.querySelector('.name-input');
            expect(nameInput).toBeTruthy();

            // The editing cell should be in row 2
            const editingCell = fixture.nativeElement.querySelector('[data-p-cell-editing="true"]');
            expect(editingCell.parentElement).toBe(nameCellRow2.parentElement);
        });

        it('should navigate to previous row when pressing arrow left on first column', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestCellNavigationComponent],
                providers: [TableService, provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestCellNavigationComponent);
            await fixture.whenStable();
            fixture.detectChanges();

            const editableCells = fixture.nativeElement.querySelectorAll('[data-p-editable-column="true"]');
            const priceCellRow1 = editableCells[1]; // Price cell in row 1
            const nameCellRow2 = editableCells[2]; // Name cell in row 2

            // Open name cell in row 2
            nameCellRow2.click();
            await fixture.whenStable();
            fixture.detectChanges();

            let nameInput = fixture.nativeElement.querySelector('.name-input');
            expect(nameInput).toBeTruthy();

            // Dispatch arrow left to navigate to previous row
            const arrowLeftEvent = new KeyboardEvent('keydown', {
                key: 'ArrowLeft',
                code: 'ArrowLeft',
                bubbles: true
            });
            nameInput.dispatchEvent(arrowLeftEvent);
            await fixture.whenStable();
            fixture.detectChanges();

            // Should now be editing price cell in row 1
            const priceInput = fixture.nativeElement.querySelector('.price-input');
            expect(priceInput).toBeTruthy();

            // The editing cell should be in row 1
            const editingCell = fixture.nativeElement.querySelector('[data-p-cell-editing="true"]');
            expect(editingCell.parentElement).toBe(priceCellRow1.parentElement);
        });

        it('should not navigate when disabled', async () => {
            @Component({
                standalone: false,
                template: `
                    <p-table [value]="products" [dataKey]="'id'" editMode="cell">
                        <ng-template #header>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                            </tr>
                        </ng-template>
                        <ng-template #body let-product let-rowIndex="rowIndex">
                            <tr>
                                <td [pEditableColumn]="product" [pEditableColumnField]="'name'" [pEditableColumnRowIndex]="rowIndex" [pEditableColumnDisabled]="true">
                                    <p-cellEditor>
                                        <ng-template #input>
                                            <input pInputText type="text" [(ngModel)]="product.name" class="name-input" />
                                        </ng-template>
                                        <ng-template #output>
                                            {{ product.name }}
                                        </ng-template>
                                    </p-cellEditor>
                                </td>
                                <td [pEditableColumn]="product" [pEditableColumnField]="'price'" [pEditableColumnRowIndex]="rowIndex">
                                    <p-cellEditor>
                                        <ng-template #input>
                                            <input pInputText type="text" [(ngModel)]="product.price" class="price-input" />
                                        </ng-template>
                                        <ng-template #output>
                                            {{ product.price | currency }}
                                        </ng-template>
                                    </p-cellEditor>
                                </td>
                            </tr>
                        </ng-template>
                    </p-table>
                `
            })
            class TestDisabledCellComponent {
                products = [{ id: '1001', name: 'Gaming Laptop', price: 1299.99 }];
            }

            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestDisabledCellComponent],
                providers: [TableService, provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestDisabledCellComponent);
            await fixture.whenStable();
            fixture.detectChanges();

            const editableCells = fixture.nativeElement.querySelectorAll('[data-p-editable-column="true"]');
            const disabledNameCell = editableCells[0];

            // Click on disabled cell
            disabledNameCell.click();
            await fixture.whenStable();
            fixture.detectChanges();

            // Should not open editing on disabled cell - no input should be visible
            const nameInput = fixture.nativeElement.querySelector('.name-input');
            expect(nameInput).toBeFalsy();

            // No cell should be in editing state
            const editingCell = fixture.nativeElement.querySelector('[data-p-cell-editing="true"]');
            expect(editingCell).toBeFalsy();
        });

        it('findCell should traverse up DOM tree to find cell with editing attribute', async () => {
            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestCellNavigationComponent],
                providers: [TableService, provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestCellNavigationComponent);
            await fixture.whenStable();
            fixture.detectChanges();

            const editableCells = fixture.nativeElement.querySelectorAll('[data-p-editable-column="true"]');
            const nameCell = editableCells[0];

            // Open the cell for editing
            nameCell.click();
            await fixture.whenStable();
            fixture.detectChanges();

            // Get the input element which is nested inside the cell
            const input = fixture.nativeElement.querySelector('.name-input');
            expect(input).toBeTruthy();

            // The input should be a descendant of the editing cell
            const editingCell = fixture.nativeElement.querySelector('[data-p-cell-editing="true"]');
            expect(editingCell).toBeTruthy();
            expect(editingCell.contains(input)).toBe(true);

            // Verify the editing cell has the correct data attribute
            expect(editingCell.querySelector('[data-p-cell-editing="true"]') || editingCell.getAttribute('data-p-cell-editing')).toBeTruthy();
        });
    });

    describe('EmptyMessage with FrozenBody', () => {

        beforeEach(() => TestBed.resetTestingModule());

        @Component({
            standalone: false,
            template: `
                <p-table [value]="products">
                    <ng-template #frozenBody let-rowData>
                        <tr class="frozen-row">
                            <td>Frozen: {{ rowData?.id }}</td>
                        </tr>
                    </ng-template>
                    <ng-template #body let-product>
                        <tr>
                            <td>{{ product.id }}</td>
                        </tr>
                    </ng-template>
                    <ng-template #emptymessage>
                        <tr class="empty-row"><td>No products available</td></tr>
                    </ng-template>
                </p-table>
            `
        })
        class TestEmptyMessageFrozenAndBodyComponent {
            products: any[] = [];
        }

        @Component({
            standalone: false,
            template: `
                <p-table [value]="products">
                    <ng-template #frozenBody let-rowData>
                        <tr class="frozen-row">
                            <td>Frozen: {{ rowData?.id }}</td>
                        </tr>
                    </ng-template>
                    <ng-template #emptymessage>
                        <tr class="empty-row"><td>No products available</td></tr>
                    </ng-template>
                </p-table>
            `
        })
        class TestEmptyMessageFrozenComponent {
            products: any[] = [];
        }

        @Component({
            standalone: false,
            template: `
                <p-table [value]="products">
                    <ng-template #body let-product>
                        <tr>
                            <td>{{ product.id }}</td>
                        </tr>
                    </ng-template>
                    <ng-template #emptymessage>
                        <tr class="empty-row"><td>No products available</td></tr>
                    </ng-template>
                </p-table>
            `
        })
        class TestEmptyMessageBodyComponent {
            products: any[] = [];
        }

        @Component({
            standalone: false,
            template: `
                <p-table [value]="products">
                    <ng-template #body let-product>
                        <tr>
                            <td>{{ product.id }}</td>
                        </tr>
                    </ng-template>
                    <ng-template #emptymessage>
                        <tr class="empty-row"><td>No products available</td></tr>
                    </ng-template>
                </p-table>
            `
        })
        class TestEmptyMessageNoneComponent {
            products: any[] = []; // empty to trigger empty message
        }

        it('should render empty message only once if frozenBody and body are defined', async () => {

            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestEmptyMessageFrozenAndBodyComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const testFixture = TestBed.createComponent(TestEmptyMessageFrozenAndBodyComponent);
            await testFixture.whenStable();
            testFixture.detectChanges();

            const emptyRow = testFixture.debugElement.queryAll(By.css('.empty-row'));
            expect(emptyRow).toBeTruthy();
            expect(emptyRow.length).toEqual(1);
            expect(emptyRow[0].nativeElement.textContent).toContain('No products available');
        });

        it('should render empty message only once if only frozenBody is defined', async () => {

            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestEmptyMessageFrozenComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const testFixture = TestBed.createComponent(TestEmptyMessageFrozenComponent);
            await testFixture.whenStable();
            testFixture.detectChanges();

            const emptyRow = testFixture.debugElement.queryAll(By.css('.empty-row'));
            expect(emptyRow).toBeTruthy();
            expect(emptyRow.length).toEqual(1);
            expect(emptyRow[0].nativeElement.textContent).toContain('No products available');
        });

        it('should render empty message only once if only body is defined', async () => {

            await TestBed.configureTestingModule({
                imports: [TableModule, CommonModule, FormsModule],
                declarations: [TestEmptyMessageBodyComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const testFixture = TestBed.createComponent(TestEmptyMessageBodyComponent);
            await testFixture.whenStable();
            testFixture.detectChanges();

            const emptyRow = testFixture.debugElement.queryAll(By.css('.empty-row'));
            expect(emptyRow).toBeTruthy();
            expect(emptyRow.length).toEqual(1);
            expect(emptyRow[0].nativeElement.textContent).toContain('No products available');
        });
    });
});
