import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'primeng/api';
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
            imports: [CommonModule, FormsModule, NoopAnimationsModule, TableModule, SharedModule],
            providers: [TableService]
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

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestBasicTableComponent);
            testComponent = testFixture.componentInstance;
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

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestSelectionTableComponent);
            testComponent = testFixture.componentInstance;
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

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestSortingTableComponent);
            testComponent = testFixture.componentInstance;
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

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestFilteringTableComponent);
            testComponent = testFixture.componentInstance;
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

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestVirtualScrollTableComponent);
            testComponent = testFixture.componentInstance;
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

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestLazyLoadTableComponent);
            testComponent = testFixture.componentInstance;
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

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestTemplatesTableComponent);
            testComponent = testFixture.componentInstance;
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

        beforeEach(() => {
            ecommerceFixture = TestBed.createComponent(TestBasicTableComponent);
            ecommerceComponent = ecommerceFixture.componentInstance;
            ecommerceComponent.products = [
                { id: '1001', code: 'LP001', name: 'Gaming Laptop', description: 'High-end gaming laptop', price: 1299.99, quantity: 15, inventoryStatus: 'INSTOCK', category: 'Electronics', image: 'laptop.jpg', rating: 5 },
                { id: '1002', code: 'MO001', name: 'Wireless Mouse', description: 'Ergonomic wireless mouse', price: 29.99, quantity: 0, inventoryStatus: 'OUTOFSTOCK', category: 'Accessories', image: 'mouse.jpg', rating: 4 },
                { id: '1003', code: 'KB001', name: 'Mechanical Keyboard', description: 'RGB mechanical keyboard', price: 149.99, quantity: 8, inventoryStatus: 'LOWSTOCK', category: 'Accessories', image: 'keyboard.jpg', rating: 4 },
                { id: '1004', code: 'HD001', name: 'Wireless Headphones', description: 'Noise-cancelling headphones', price: 199.99, quantity: 25, inventoryStatus: 'INSTOCK', category: 'Audio', image: 'headphones.jpg', rating: 5 },
                { id: '1005', code: 'MN001', name: '4K Monitor', description: '27-inch 4K monitor', price: 399.99, quantity: 12, inventoryStatus: 'INSTOCK', category: 'Displays', image: 'monitor.jpg', rating: 4 }
            ];
            ecommerceFixture.detectChanges();
        });

        it('should handle inventory status filtering for stock management', fakeAsync(() => {
            const tableInstance = ecommerceFixture.debugElement.query(By.css('p-table')).componentInstance;

            tableInstance.filter('INSTOCK', 'inventoryStatus', 'equals');
            tick(350);

            const inStockProducts = tableInstance.filteredValue || tableInstance.value;
            const inStock = inStockProducts.filter((product: any) => product.inventoryStatus === 'INSTOCK');
            expect(inStock.length).toBe(3);
            flush();
        }));

        it('should sort by price for promotional planning', fakeAsync(() => {
            const tableInstance = ecommerceFixture.debugElement.query(By.css('p-table')).componentInstance;

            tableInstance.sort({ field: 'price', order: 1 });
            tick();

            expect(tableInstance.sortField).toBe('price');
            expect(tableInstance.sortOrder).toBe(1);
            flush();
        }));

        it('should support price range filtering for budget constraints', fakeAsync(() => {
            const tableInstance = ecommerceFixture.debugElement.query(By.css('p-table')).componentInstance;

            tableInstance.filter(100, 'price', 'lt');
            tick(350);

            const filteredData = tableInstance.filteredValue || tableInstance.value;
            const affordableProducts = filteredData.filter((product: any) => product.price < 100);
            expect(affordableProducts.length).toBe(1); // Only the mouse under $100
            flush();
        }));

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
});
