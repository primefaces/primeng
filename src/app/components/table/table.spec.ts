import {ScrollingModule} from '@angular/cdk/scrolling';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Table, TableModule, EditableColumn } from './table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { ContextMenu, ContextMenuModule } from 'primeng/contextmenu';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
    template: `
    <p-table class="basicTable" [value]="cars">
        <ng-template pTemplate="caption">
            List of Cars
        </ng-template>
        <ng-template pTemplate="header">
        <tr>
            <th>Vin</th>
            <th>Year</th>
            <th>Brand</th>
            <th>Color</th>
        </tr>
        </ng-template>
        <ng-template pTemplate="body" let-car>
            <tr>
                <td>{{car.vin}}</td>
                <td>{{car.year}}</td>
                <td>{{car.brand}}</td>
                <td>{{car.color}}</td>
            </tr>
        </ng-template>
        <ng-template pTemplate="footer" let-columns>
            <tr>
                <td>Vin</td>
                <td>Year</td>
                <td>Brand</td>
                <td>Color</td>
            </tr>
        </ng-template>
        <ng-template pTemplate="summary">
            <div style="text-align: left">
                Always Bet On Prime!
            </div>
        </ng-template>
    </p-table>

    <p-table class="filterTable" #dt [columns]="cols" [value]="cars">
        <ng-template pTemplate="caption">
            <div style="text-align: right">        
                <i class="pi pi-search" style="margin:4px 4px 0 0"></i>
                <input type="text" class="globalFilter" pInputText size="50" placeholder="Global Filter" (input)="dt.filterGlobal($event.target.value, 'contains')" style="width:auto">
            </div>
        </ng-template>
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th *ngFor="let col of columns">
                    {{col.header}}
                </th>
            </tr>
            <tr>
                <th *ngFor="let col of columns" [ngSwitch]="col.field">
                    <input *ngSwitchCase="'brand'" class="brandFilter" pInputText type="text" (input)="dt.filter($event.target.value, col.field, col.filterMatchMode)">
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowData let-columns="columns">
            <tr>
                <td *ngFor="let col of columns">
                    {{rowData[col.field]}}
                </td>
            </tr>
        </ng-template>
    </p-table>

    <p-table class="sortTable" [columns]="cols" [value]="cars">
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th *ngFor="let col of columns" class="sortableColumn" [pSortableColumn]="col.field">
                    {{col.header}}
                    <p-sortIcon [field]="col.field" ariaLabel="Activate to sort" ariaLabelDesc="Activate to sort in descending order" ariaLabelAsc="Activate to sort in ascending order"></p-sortIcon>
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowData let-columns="columns">
            <tr class="sort">
                <td *ngFor="let col of columns">
                    {{rowData[col.field]}}
                </td>
            </tr>
        </ng-template>
    </p-table>

    <p-table class="basicSelectionTable" [columns]="cols" [value]="cars" selectionMode="single"  dataKey="vin">
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th *ngFor="let col of columns">
                    {{col.header}}
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowData let-columns="columns" let-rowIndex="rowIndex">
            <tr class="selectableRow" [pSelectableRow]="rowData" [pSelectableRowIndex]="rowIndex">
                <td *ngFor="let col of columns">
                    {{rowData[col.field]}}
                </td>
            </tr>
        </ng-template>
    </p-table>

    <p-table class="radioSelectionTable" [columns]="cols" [value]="cars" dataKey="vin">
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th style="width: 3em"></th>
                <th *ngFor="let col of columns">
                    {{col.header}}
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowData let-columns="columns">
            <tr [pSelectableRow]="rowData">
                <td>
                    <p-tableRadioButton class="radioRow" [value]="rowData"></p-tableRadioButton>
                </td>
                <td *ngFor="let col of columns">
                    {{rowData[col.field]}}
                </td>
            </tr>
        </ng-template>
    </p-table>

    <p-table class="checkboxSelectionTable" [columns]="cols" [value]="cars" dataKey="vin">
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th>
                    <p-tableHeaderCheckbox class="headerCheckbox"></p-tableHeaderCheckbox>
                </th>
                <th *ngFor="let col of columns">
                    {{col.header}}
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowData let-columns="columns">
            <tr [pSelectableRow]="rowData">
                <td>
                    <p-tableCheckbox class="rowCheckbox" [value]="rowData"></p-tableCheckbox>
                </td>
                <td *ngFor="let col of columns">
                    {{rowData[col.field]}}
                </td>
            </tr>
        </ng-template>
    </p-table>

    <p-table class="editableTable" [value]="cars">
        <ng-template pTemplate="header">
            <tr>
                <th>Vin</th>
                <th>Year</th>
                <th>Brand</th>
                <th>Color</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowData>
            <tr>
                <td pEditableColumn>
                    <p-cellEditor>
                        <ng-template pTemplate="input">
                            <input pInputText type="text" [(ngModel)]="rowData.vin">
                        </ng-template>
                        <ng-template pTemplate="output">
                            {{rowData.vin}}
                        </ng-template>
                    </p-cellEditor>
                </td>
                <td pEditableColumn>
                    <p-cellEditor>
                        <ng-template pTemplate="input">
                            <input pInputText type="text" [(ngModel)]="rowData.year" required>
                        </ng-template>
                        <ng-template pTemplate="output">
                            {{rowData.year}}
                        </ng-template>
                    </p-cellEditor>
                </td>
                <td pEditableColumn>
                    <p-cellEditor>
                        <ng-template pTemplate="input">
                            <p-dropdown [options]="brands" [(ngModel)]="rowData.brand" [style]="{'width':'100%'}"></p-dropdown>
                        </ng-template>
                        <ng-template pTemplate="output">
                            {{rowData.brand}}
                        </ng-template>
                    </p-cellEditor>
                </td>
                <td pEditableColumn>
                    <p-cellEditor>
                        <ng-template pTemplate="input">
                            <input pInputText type="text" [(ngModel)]="rowData.color">
                        </ng-template>
                        <ng-template pTemplate="output">
                            {{rowData.color}}
                        </ng-template>
                    </p-cellEditor>
                </td>
            </tr>
        </ng-template>
    </p-table>
    <p-table class="rowExpansionTable" [columns]="cols" [value]="cars" dataKey="vin">
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th style="width: 3em"></th>
                <th *ngFor="let col of columns">
                    {{col.header}}
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowData let-expanded="expanded" let-columns="columns">
            <tr>
                <td>
                    <a href="#" class="rowExpansionToggler" [pRowToggler]="rowData">
                        <i [ngClass]="expanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"></i>
                    </a>
                </td>
                <td *ngFor="let col of columns">
                    {{rowData[col.field]}}
                </td>
            </tr>
        </ng-template>
        <ng-template pTemplate="rowexpansion" let-rowData let-columns="columns">
            <tr>
                <td [attr.colspan]="columns.length + 1">
                    <div class="p-grid p-fluid expandedRow" style="font-size:16px;padding:20px">
                        <div class="p-col-12 p-md-3" style="text-align:center">
                        </div>
                        <div class="p-col-12 p-md-9">
                            <div class="p-grid">
                                <div class="p-col-12">
                                    <b>Vin:</b> {{rowData.vin}}
                                </div>
                                <div class="p-col-12">
                                    <b>Year:</b> {{rowData.year}}
                                </div>
                                <div class="p-col-12">
                                    <b>Brand:</b> {{rowData.brand}}
                                </div>
                                <div class="p-col-12">
                                    <b>Color:</b> {{rowData.color}}
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </ng-template>
    </p-table>
    <p-table class="colResizeTable" [columns]="cols" [value]="cars" [resizableColumns]="true">
        <ng-template pTemplate="colgroup" let-columns>
            <colgroup>
                <col *ngFor="let col of columns" >
            </colgroup>
        </ng-template>
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th *ngFor="let col of columns" pResizableColumn>
                    {{col.header}}
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowData let-columns="columns">
            <tr>
                <td *ngFor="let col of columns" class="p-resizable-column">
                    {{rowData[col.field]}}
                </td>
            </tr>
        </ng-template>
    </p-table>
    <p-table class="reorderableTable" [columns]="cols" [value]="cars" [reorderableColumns]="true">
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th style="width:2.5em"></th>
                <th *ngFor="let col of columns" pReorderableColumn>
                    {{col.header}}
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowData let-columns="columns" let-index="rowIndex">
            <tr [pReorderableRow]="index">
                <td>
                    <i class="pi pi-bars" pReorderableRowHandle></i>
                </td>
                <td *ngFor="let col of columns">
                    {{rowData[col.field]}}
                </td>
            </tr>
        </ng-template>
    </p-table>
    <p-table class="contextMenuTable" [columns]="cols" [value]="cars" [contextMenu]="cm">
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th *ngFor="let col of columns">
                    {{col.header}}
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowData let-columns="columns">
            <tr [pSelectableRow]="rowData" [pContextMenuRow]="rowData">
                <td *ngFor="let col of columns">
                    {{rowData[col.field]}}
                </td>
            </tr>
        </ng-template>
    </p-table>

    <p-contextMenu #cm [model]="items"></p-contextMenu>
    <p-table class="stateTable" #dt1 [columns]="cols2" [value]="cars2" [paginator]="true" [rows]="3" dataKey="vin" [resizableColumns]="true" [reorderableColumns]="true"
        selectionMode="single" stateKey="statedemo">
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th *ngFor="let col of columns" [pSortableColumn]="col.field" pResizableColumn pReorderableColumn>
                    {{col.header}}
                    <p-sortIcon [field]="col.field"></p-sortIcon>
                </th>
            </tr>
            <tr>
                <th *ngFor="let col of columns" [ngSwitch]="col.field" class="p-fluid">
                    <input pInputText type="text" (input)="dt1.filter($event.target.value, col.field, col.filterMatchMode)" [value]="dt1.filters[col.field]?.value">
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowData let-columns="columns">
            <tr [pSelectableRow]="rowData">
                <td *ngFor="let col of columns">
                    {{rowData[col.field]}}
                </td>
            </tr>
        </ng-template>
    </p-table>
    `
})
class TestBasicTableComponent {
    items = [
        { label: 'View', icon: 'pi pi-search', command: (event) => {} },
        { label: 'Delete', icon: 'pi pi-times', command: (event) => {}}
    ];
    cols = [
        { field: 'brand', header: 'Brand' },
        { field: 'vin', header: 'Vin' },
        { field: 'year', header: 'Year' },
        { field: 'color', header: 'Color' }
    ];
    cols2 = [
        { field: 'brand', header: 'Brand' },
        { field: 'vin', header: 'Vin' },
        { field: 'year', header: 'Year' },
        { field: 'color', header: 'Color' }
    ];
    cars = [
        {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
        {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
        {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr"},
        {"brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh"},
        {"brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34"},
        {"brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj"},
        {"brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr"},
        {"brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34"},
        {"brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5"},
        {"brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s"}
    ];
    cars2 = [
        {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
        {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
        {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr"},
        {"brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh"},
        {"brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34"},
        {"brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj"},
        {"brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr"},
        {"brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34"},
        {"brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5"},
        {"brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s"}
    ];

    customSort(event) {
        event.data.sort((data1, data2) => {
            let value1 = data1[event.field];
            let value2 = data2[event.field];
            let result = null;

            if (value1 == null && value2 != null)
                result = -1;
            else if (value1 != null && value2 == null)
                result = 1;
            else if (value1 == null && value2 == null)
                result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string')
                result = value1.localeCompare(value2);
            else
                result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

            return (event.order * result);
        });
    }

}
describe('Table', () => {
  
    let table: Table;
    let filterTable: Table;
    let sortTable: Table;
    let basicSelectionTable: Table;
    let radioSelectionTable: Table;
    let checkboxSelectionTable: Table;
    let editableTable: Table;
    let rowExpansionTable: Table;
    let colResizeTable: Table;
    let reorderableTable: Table;
    let contextMenuTable: Table;
    let stateTable: Table;
    let testComponent: TestBasicTableComponent;
    let fixture: ComponentFixture<TestBasicTableComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                FormsModule,
                SharedModule,
                ScrollingModule,
                DropdownModule,
                ContextMenuModule,
                TableModule,
                RouterTestingModule.withRoutes([
                    { path: 'test', component: ContextMenu }
                ]),

            ],
            declarations: [
                TestBasicTableComponent,
                EditableColumn
            ]
        });

        fixture = TestBed.createComponent(TestBasicTableComponent);
        testComponent = fixture.componentInstance;
        table = fixture.debugElement.children[0].componentInstance;
        filterTable = fixture.debugElement.children[1].componentInstance;
        sortTable = fixture.debugElement.children[2].componentInstance;
        basicSelectionTable = fixture.debugElement.children[3].componentInstance;
        radioSelectionTable = fixture.debugElement.children[4].componentInstance;
        checkboxSelectionTable = fixture.debugElement.children[5].componentInstance;
        editableTable = fixture.debugElement.children[6].componentInstance;
        rowExpansionTable = fixture.debugElement.children[7].componentInstance;
        colResizeTable = fixture.debugElement.children[8].componentInstance;
        reorderableTable = fixture.debugElement.children[9].componentInstance;
        contextMenuTable = fixture.debugElement.children[10].componentInstance;
        stateTable = fixture.debugElement.children[12].componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();
  
        const tableEl = fixture.debugElement.query(By.css('div'));
        expect(tableEl.nativeElement).toBeTruthy();
    });

    it('should display 10 rows', () => {
        fixture.detectChanges();
  
        const tableEl = fixture.debugElement.query(By.css('div'));
        const bodyRows = tableEl.query(By.css('.p-datatable-tbody')).queryAll(By.css('tr'));
        expect(bodyRows.length).toEqual(10);
    });

    it('should use sections', () => {
        fixture.detectChanges();
        
        expect(table.captionTemplate).toBeTruthy();
        expect(table.footerTemplate).toBeTruthy();
        expect(table.summaryTemplate).toBeTruthy();
    });

    it('should use 2 paginator', () => {
        fixture.detectChanges();

        table.paginator = true;
        table.rows = 5;
        table.paginatorPosition = "both";
        const basicTableEl = fixture.debugElement.query(By.css('.basicTable'));
        fixture.detectChanges();

        const paginatorCount = basicTableEl.queryAll(By.css("p-paginator"));
        expect(paginatorCount.length).toEqual(2);
    });

    it('should use paginator and list 5 elements', () => {
        fixture.detectChanges();

        table.paginator = true;
        table.rows = 5;
        fixture.detectChanges();
        
        const tableEl = fixture.debugElement.query(By.css('div'));
        const bodyRows = tableEl.query(By.css('.p-datatable-tbody')).queryAll(By.css('tr'));
        expect(bodyRows.length).toEqual(5);
        const pageTwoEl = fixture.debugElement.query(By.css("p-paginator")).query(By.css(".p-paginator-pages")).children[1];

        pageTwoEl.nativeElement.click();
        fixture.detectChanges();

        expect(table.first).toEqual(5);
        expect(bodyRows.length).toEqual(5);
    });

    it('should use custom filter and show 2 items', fakeAsync(() => {
        fixture.detectChanges();

        const brandFilter = fixture.debugElement.query(By.css(".brandFilter"));
        brandFilter.nativeElement.value = "v";
        brandFilter.nativeElement.dispatchEvent(new Event("input"));
        tick(300);
        fixture.detectChanges();

        const tableEl = fixture.debugElement.query(By.css(".filterTable"));
        const bodyRows = tableEl.query(By.css('.p-datatable-tbody')).queryAll(By.css('tr'));
        expect(bodyRows.length).toEqual(2);
    }));

    it('should use custom filter and show 2 items and after call reset', fakeAsync(() => {
        fixture.detectChanges();

        const brandFilter = fixture.debugElement.query(By.css(".brandFilter"));
        brandFilter.nativeElement.value = "v";
        brandFilter.nativeElement.dispatchEvent(new Event("input"));
        tick(300);
        fixture.detectChanges();

        const tableEl = fixture.debugElement.query(By.css(".filterTable"));
        const bodyRows = tableEl.query(By.css('.p-datatable-tbody')).queryAll(By.css('tr'));
        expect(bodyRows.length).toEqual(2);
        filterTable.reset();
        fixture.detectChanges();

        expect(filterTable.filteredValue).toBeNull();
    }));

    it('should use global filter and show 1 items', fakeAsync(() => {
        fixture.detectChanges();

        const globalFilter = fixture.debugElement.query(By.css(".globalFilter"));
        globalFilter.nativeElement.value = "dsad231ff";
        globalFilter.nativeElement.dispatchEvent(new Event("input"));
        tick(300);
        fixture.detectChanges();

        const tableEl = fixture.debugElement.query(By.css(".filterTable"));
        const bodyRows = tableEl.query(By.css('.p-datatable-tbody')).queryAll(By.css('tr'));
        expect(bodyRows.length).toEqual(1);
    }));

    it('should use globalFilterFields and show 0 items', fakeAsync(() => {
        fixture.detectChanges();

        filterTable.globalFilterFields = ['year','color','brand']
        fixture.detectChanges();
        
        const globalFilter = fixture.debugElement.query(By.css(".globalFilter"));
        globalFilter.nativeElement.value = "dsad231";
        globalFilter.nativeElement.dispatchEvent(new Event("input"));
        tick(300);
        fixture.detectChanges();

        const tableEl = fixture.debugElement.query(By.css(".filterTable"));
        const bodyRows = tableEl.query(By.css('.p-datatable-tbody')).queryAll(By.css('tr'));
        expect(bodyRows.length).toEqual(0);
    }));

    it('should use endsWith filter and show 1 item. It should clear the filter and show 10 item.', fakeAsync(() => {
        fixture.detectChanges();
        
        filterTable.filter("231ff","vin","endsWith");
        tick(300);
        fixture.detectChanges();

        let tableEl = fixture.debugElement.query(By.css(".filterTable"));
        let bodyRows = tableEl.query(By.css('.p-datatable-tbody')).queryAll(By.css('tr'));
        expect(bodyRows.length).toEqual(1);
        filterTable.filter(null,"vin","endsWith");
        tick(300);
        fixture.detectChanges();

        bodyRows = tableEl.query(By.css('.p-datatable-tbody')).queryAll(By.css('tr'));
        expect(bodyRows.length).toEqual(10);
    }));

    it('should use equals filter and show 1 item', fakeAsync(() => {
        fixture.detectChanges();
        
        filterTable.filter("dsad231ff","vin","equals");
        tick(300);
        fixture.detectChanges();

        let tableEl = fixture.debugElement.query(By.css(".filterTable"));
        let bodyRows = tableEl.query(By.css('.p-datatable-tbody')).queryAll(By.css('tr'));
        expect(bodyRows.length).toEqual(1);
    }));

    it('should use not equals filter and show 9 item', fakeAsync(() => {
        fixture.detectChanges();
        
        filterTable.filter("dsad231ff","vin","notEquals");
        tick(300);
        fixture.detectChanges();

        let tableEl = fixture.debugElement.query(By.css(".filterTable"));
        let bodyRows = tableEl.query(By.css('.p-datatable-tbody')).queryAll(By.css('tr'));
        expect(bodyRows.length).toEqual(9);
    }));

    it('should use in filter and show 1 item', fakeAsync(() => {
        fixture.detectChanges();
        
        filterTable.filter(["BMW",null],"brand","in");
        tick(300);
        fixture.detectChanges();

        let tableEl = fixture.debugElement.query(By.css(".filterTable"));
        let bodyRows = tableEl.query(By.css('.p-datatable-tbody')).queryAll(By.css('tr'));
        expect(bodyRows.length).toEqual(1);
        filterTable.filter([],"brand","in");
        tick(300);
        fixture.detectChanges();

        expect(bodyRows.length).toEqual(1);
    }));

    it('should use lt filter and show 5 item', fakeAsync(() => {
        fixture.detectChanges();
        
        filterTable.filter("2005","year","lt");
        tick(300);
        fixture.detectChanges();

        let tableEl = fixture.debugElement.query(By.css(".filterTable"));
        let bodyRows = tableEl.query(By.css('.p-datatable-tbody')).queryAll(By.css('tr'));
        expect(bodyRows.length).toEqual(3);
    }));

    it('should use lte filter and show 5 item', fakeAsync(() => {
        fixture.detectChanges();
        
        filterTable.filter("2005","year","lte");
        tick(300);
        fixture.detectChanges();

        let tableEl = fixture.debugElement.query(By.css(".filterTable"));
        let bodyRows = tableEl.query(By.css('.p-datatable-tbody')).queryAll(By.css('tr'));
        expect(bodyRows.length).toEqual(5);
    }));

    it('should use gt filter and show 5 item', fakeAsync(() => {
        fixture.detectChanges();
        
        filterTable.filter("2005","year","gt");
        tick(300);
        fixture.detectChanges();

        let tableEl = fixture.debugElement.query(By.css(".filterTable"));
        let bodyRows = tableEl.query(By.css('.p-datatable-tbody')).queryAll(By.css('tr'));
        expect(bodyRows.length).toEqual(5);
    }));

    it('should use gte filter and show 5 item', fakeAsync(() => {
        fixture.detectChanges();
        
        filterTable.filter("2005","year","gte");
        tick(300);
        fixture.detectChanges();

        let tableEl = fixture.debugElement.query(By.css(".filterTable"));
        let bodyRows = tableEl.query(By.css('.p-datatable-tbody')).queryAll(By.css('tr'));
        expect(bodyRows.length).toEqual(7);
    }));

    it('should use basic sort', () => {
        fixture.detectChanges();

        const brandSortEl = fixture.debugElement.query(By.css(".sortableColumn"));
        brandSortEl.nativeElement.click();
        fixture.detectChanges();

        const firstEl = fixture.debugElement.query(By.css(".sortTable")).query(By.css('.p-datatable-tbody')).query(By.css('td'));

        expect(firstEl.nativeElement.outerText).toEqual("Audi");
    });

    it('should use multiple sort', fakeAsync(() => {
        sortTable.sortMode = "multiple"
        fixture.detectChanges();

        const yearSortEl = fixture.debugElement.queryAll(By.css(".sortableColumn"))[1];
        const colorSortEl = fixture.debugElement.queryAll(By.css(".sortableColumn"))[3];
        colorSortEl.nativeElement.click();
        fixture.detectChanges();

        const firstEl = fixture.debugElement.query(By.css(".sortTable")).query(By.css('.p-datatable-tbody')).query(By.css('tr'));

        expect(firstEl.children[3].nativeElement.outerText).toEqual("Black");
        expect(firstEl.children[2].nativeElement.outerText).toEqual("2011");
        sortTable.multiSortMeta.push({field:"year",order:1});
        sortTable.sortMultiple();
        tick(300);
        fixture.detectChanges();

        const firstRow = fixture.debugElement.query(By.css(".sortTable")).query(By.css('.p-datatable-tbody')).query(By.css('tr'));
        expect(firstRow.children[2].nativeElement.outerText).toEqual("2000");
    }));

    it('should use custom sort', () => {
        sortTable.customSort = true;
        sortTable.sortFunction.subscribe(event => testComponent.customSort(event));
        fixture.detectChanges();

        const brandSortEl = fixture.debugElement.query(By.css(".sortableColumn"));
        brandSortEl.nativeElement.click();
        fixture.detectChanges();

        const firstEl = fixture.debugElement.query(By.css(".sortTable")).query(By.css('.p-datatable-tbody')).query(By.css('td'));

        expect(firstEl.nativeElement.outerText).toEqual("Audi");
    });

    it('should select single item and unselect when another item select and self click', () => {
        fixture.detectChanges();

        const selectableRows = fixture.debugElement.queryAll(By.css(".selectableRow"));
        const vwEl = selectableRows[0];
        vwEl.nativeElement.click();
        fixture.detectChanges();

        expect(basicSelectionTable.selection.brand).toEqual("VW");
        expect(vwEl.nativeElement.className).toContain('p-highlight');
        const audiEl = selectableRows[1];
        audiEl.nativeElement.click();
        fixture.detectChanges();

        expect(basicSelectionTable.selection.brand).toEqual("Audi");
        expect(audiEl.nativeElement.className).toContain('p-highlight');
        audiEl.nativeElement.click();
        fixture.detectChanges();

        expect(basicSelectionTable.selection).toBeFalsy();
        expect(audiEl.nativeElement.className).not.toContain('p-highlight');
    });

    it('should select single item and unselect when another item select and self click without dataKey', () => {
        fixture.detectChanges();
        basicSelectionTable.dataKey = null;
        fixture.detectChanges();
        
        const selectableRows = fixture.debugElement.queryAll(By.css(".selectableRow"));
        const vwEl = selectableRows[0];
        vwEl.nativeElement.click();
        fixture.detectChanges();

        expect(basicSelectionTable.selection.brand).toEqual("VW");
        expect(vwEl.nativeElement.className).toContain('p-highlight');
        const audiEl = selectableRows[1];
        audiEl.nativeElement.click();
        fixture.detectChanges();

        expect(basicSelectionTable.selection.brand).toEqual("Audi");
        expect(audiEl.nativeElement.className).toContain('p-highlight');
        audiEl.nativeElement.click();
        fixture.detectChanges();

        expect(basicSelectionTable.selection).toBeFalsy();
        expect(audiEl.nativeElement.className).not.toContain('p-highlight');
    });

    it('should select multiple items and unselect with self click', () => {
        fixture.detectChanges();

        basicSelectionTable.selectionMode = "multiple";
        fixture.detectChanges();

        const selectableRows = fixture.debugElement.queryAll(By.css(".selectableRow"));
        const vwEl = selectableRows[0];
        vwEl.nativeElement.click();
        fixture.detectChanges();

        expect(basicSelectionTable.selection[0].brand).toEqual("VW");
        expect(vwEl.nativeElement.className).toContain('p-highlight');
        const audiEl = selectableRows[1];
        audiEl.nativeElement.click();
        fixture.detectChanges();

        expect(basicSelectionTable.selection[1].brand).toEqual("Audi");
        expect(basicSelectionTable.selection.length).toEqual(2);
        expect(audiEl.nativeElement.className).toContain('p-highlight');
        audiEl.nativeElement.click();
        fixture.detectChanges();

        expect(basicSelectionTable.selection.length).toEqual(1);
        expect(audiEl.nativeElement.className).not.toContain('p-highlight');
    });

    it('should select single item with metaKey selection', () => {
        fixture.detectChanges();

        basicSelectionTable.metaKeySelection = true;
        fixture.detectChanges();

        const selectableRows = fixture.debugElement.queryAll(By.css(".selectableRow"));
        const vwEl = selectableRows[0];
        vwEl.nativeElement.click();
        fixture.detectChanges();

        expect(basicSelectionTable.selection.brand).toEqual("VW");
        expect(vwEl.nativeElement.className).toContain('p-highlight');
        const event: any = document.createEvent('CustomEvent');
        event.metaKey = true;
        event.ctrlKey = true;
        event.initEvent('click');
        const audiEl = selectableRows[1];
        audiEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();

        expect(basicSelectionTable.selection.brand).toEqual("Audi");
        expect(audiEl.nativeElement.className).toContain('p-highlight');
        audiEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();

        expect(basicSelectionTable.selection).toBeFalsy();
        expect(audiEl.nativeElement.className).not.toContain('p-highlight');
    });

    it('should select multiple items with metaKey selection', () => {
        fixture.detectChanges();

        basicSelectionTable.stateKey = "vin";
        basicSelectionTable.selectionMode = "multiple";
        basicSelectionTable.metaKeySelection = true;
        fixture.detectChanges();

        const selectableRows = fixture.debugElement.queryAll(By.css(".selectableRow"));
        const vwEl = selectableRows[0];
        vwEl.nativeElement.click();
        fixture.detectChanges();

        expect(basicSelectionTable.selection[0].brand).toEqual("VW");
        expect(vwEl.nativeElement.className).toContain('p-highlight');
        const event: any = document.createEvent('CustomEvent');
        event.metaKey = true;
        event.ctrlKey = true;
        event.initEvent('click');
        const audiEl = selectableRows[1];
        audiEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();

        expect(basicSelectionTable.selection[1].brand).toEqual("Audi");
        expect(basicSelectionTable.selection.length).toEqual(2);
        expect(audiEl.nativeElement.className).toContain('p-highlight');
        audiEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();

        expect(basicSelectionTable.selection.length).toEqual(1);
        expect(audiEl.nativeElement.className).not.toContain('p-highlight');
    });

    it('should select range  with shiftKey selection', () => {
        fixture.detectChanges();

        basicSelectionTable.selectionMode = "multiple";
        basicSelectionTable.metaKeySelection = true;
        fixture.detectChanges();

        const event: any = document.createEvent('CustomEvent');
        event.shiftKey = true;
        event.initEvent('click');
        const selectableRows = fixture.debugElement.queryAll(By.css(".selectableRow"));
        const audiEl = selectableRows[1];
        audiEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();

        audiEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();

        expect(basicSelectionTable.rangeRowIndex).toEqual(basicSelectionTable.anchorRowIndex);
        expect(basicSelectionTable.selection[0].brand).toEqual("Audi");
        expect(audiEl.nativeElement.className).toContain('p-highlight');
        const mercedesEl = selectableRows[4];
        mercedesEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();

        expect(basicSelectionTable.selection.length).toEqual(4);
        const fordEl = selectableRows[8];
        fordEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();

        expect(basicSelectionTable.selection.length).toEqual(8);
        const vwEl = selectableRows[0];
        vwEl.nativeElement.dispatchEvent(event);
        vwEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();

        expect(basicSelectionTable.selection.length).toEqual(2);
    });

    it('should select range  with shiftKey selection without dataKey', () => {
        fixture.detectChanges();

        basicSelectionTable.dataKey = null;
        basicSelectionTable.selectionMode = "multiple";
        basicSelectionTable.metaKeySelection = true;
        fixture.detectChanges();

        const event: any = document.createEvent('CustomEvent');
        event.shiftKey = true;
        event.initEvent('click');
        const selectableRows = fixture.debugElement.queryAll(By.css(".selectableRow"));
        const audiEl = selectableRows[1];
        audiEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();

        audiEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();

        expect(basicSelectionTable.rangeRowIndex).toEqual(basicSelectionTable.anchorRowIndex);
        expect(basicSelectionTable.selection[0].brand).toEqual("Audi");
        expect(audiEl.nativeElement.className).toContain('p-highlight');
        const mercedesEl = selectableRows[4];
        mercedesEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();

        expect(basicSelectionTable.selection.length).toEqual(4);
        const fordEl = selectableRows[8];
        fordEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();

        expect(basicSelectionTable.selection.length).toEqual(8);
        const vwEl = selectableRows[0];
        vwEl.nativeElement.dispatchEvent(event);
        vwEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();

        expect(basicSelectionTable.selection.length).toEqual(2);
    });

    it('should select with radioButton', () => {
        fixture.detectChanges();

        radioSelectionTable.stateKey = "vin";
        fixture.detectChanges();

        const radioRows = fixture.debugElement.queryAll(By.css(".radioRow"));
        expect(radioRows.length).toEqual(10);
        const vwRadioEl = radioRows[0].query(By.css("div"));
        const bmwRadioEl = radioRows[3].query(By.css("div"));
        vwRadioEl.query(By.css("input")).nativeElement.dispatchEvent(new Event("focus"));
        vwRadioEl.nativeElement.click();
        fixture.detectChanges();
        
        expect(vwRadioEl.query(By.css(".p-radiobutton-box")).nativeElement.className).toContain("p-focus");
        vwRadioEl.query(By.css("input")).nativeElement.dispatchEvent(new Event("blur"));
        fixture.detectChanges();

        expect(vwRadioEl.query(By.css(".p-radiobutton-box")).nativeElement.className).not.toContain("p-focus");
        expect(radioSelectionTable.selection.brand).toEqual("VW");
        bmwRadioEl.nativeElement.click();
        fixture.detectChanges();

        expect(radioSelectionTable.selection.brand).toEqual("BMW");
        bmwRadioEl.nativeElement.click();
        fixture.detectChanges();

        expect(radioSelectionTable.selection).toBeFalsy();
    });

    it('should select with checkbox and unselect when self click', () => {
        fixture.detectChanges();

        checkboxSelectionTable.stateKey = "vin";
        fixture.detectChanges();
        
        const checkboxRows = fixture.debugElement.queryAll(By.css(".rowCheckbox"));
        expect(checkboxRows.length).toEqual(10);
        const vwCheckboxEl = checkboxRows[0].query(By.css("div"));
        vwCheckboxEl.query(By.css("input")).nativeElement.dispatchEvent(new Event("focus"));
        vwCheckboxEl.nativeElement.click();
        fixture.detectChanges();
        
        expect(vwCheckboxEl.query(By.css(".p-checkbox-box")).nativeElement.className).toContain("p-focus");
        vwCheckboxEl.query(By.css("input")).nativeElement.dispatchEvent(new Event("blur"));
        fixture.detectChanges();

        expect(vwCheckboxEl.query(By.css(".p-checkbox-box")).nativeElement.className).not.toContain("p-focus");
        expect(checkboxSelectionTable.selection[0].brand).toEqual("VW");
        const audiCheckboxEl = checkboxRows[1].query(By.css("div"));
        audiCheckboxEl.nativeElement.click();
        fixture.detectChanges();

        expect(checkboxSelectionTable.selection.length).toEqual(2);
        audiCheckboxEl.nativeElement.click();
        vwCheckboxEl.nativeElement.click();
        fixture.detectChanges();

        expect(checkboxSelectionTable.selection.length).toEqual(0);
    });

    it('should select all items and unselect all item with header checkbox', () => {
        fixture.detectChanges();

        checkboxSelectionTable.stateKey = "vin";
        fixture.detectChanges();
        
        const checkboxRows = fixture.debugElement.queryAll(By.css(".rowCheckbox"));
        const vwCheckboxEl = checkboxRows[0].query(By.css("div"));
        const headerCheckbox = fixture.debugElement.query(By.css(".headerCheckbox")).query(By.css("div"));
        headerCheckbox.query(By.css("input")).nativeElement.dispatchEvent(new Event("focus"));
        fixture.detectChanges();
        
        expect(headerCheckbox.query(By.css(".p-checkbox-box")).nativeElement.className).toContain("p-focus");
        headerCheckbox.nativeElement.click();
        headerCheckbox.query(By.css("input")).nativeElement.dispatchEvent(new Event("blur"));
        fixture.detectChanges();

        expect(headerCheckbox.query(By.css(".p-checkbox-box")).nativeElement.className).not.toContain("p-focus");
        expect(checkboxSelectionTable.selection.length).toEqual(10);
        vwCheckboxEl.nativeElement.click();
        fixture.detectChanges();

        expect(checkboxSelectionTable.selection.length).toEqual(9);
        headerCheckbox.nativeElement.click();
        fixture.detectChanges();

        headerCheckbox.nativeElement.click();
        fixture.detectChanges();
        expect(checkboxSelectionTable.selection).toEqual([]);
    });

    it('should headerCheckbox changing by filtering', fakeAsync(() => {
        fixture.detectChanges();

        checkboxSelectionTable.stateKey = "vin";
        fixture.detectChanges();
        
        const headerCheckbox = fixture.debugElement.query(By.css(".headerCheckbox")).query(By.css("div"));
        headerCheckbox.nativeElement.click();
        fixture.detectChanges();

        checkboxSelectionTable.filter("v","brand","contains");
        tick(300);
        fixture.detectChanges();

        const rowCheckboxs = fixture.debugElement.queryAll(By.css(".rowCheckbox"));
        expect(rowCheckboxs.length).toEqual(2);
        expect(fixture.debugElement.query(By.css(".headerCheckbox")).componentInstance.isAllFilteredValuesChecked()).toEqual(true);
        rowCheckboxs[0].query(By.css("div")).nativeElement.click();
        fixture.detectChanges();

        checkboxSelectionTable.filter("v","brand","contains");
        tick(300);
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".headerCheckbox")).componentInstance.isAllFilteredValuesChecked()).toEqual(false);
    }));

    it('should headerCheckbox changing by filtering', fakeAsync(() => {
        fixture.detectChanges();

        checkboxSelectionTable.stateKey = "vin";
        fixture.detectChanges();
        
        const headerCheckbox = fixture.debugElement.query(By.css(".headerCheckbox")).query(By.css("div"));
        headerCheckbox.nativeElement.click();
        fixture.detectChanges();

        checkboxSelectionTable.filter("v","brand","contains");
        tick(300);
        fixture.detectChanges();

        const rowCheckboxs = fixture.debugElement.queryAll(By.css(".rowCheckbox"));
        expect(rowCheckboxs.length).toEqual(2);
        expect(fixture.debugElement.query(By.css(".headerCheckbox")).componentInstance.isAllFilteredValuesChecked()).toEqual(true);
        rowCheckboxs[0].query(By.css("div")).nativeElement.click();
        fixture.detectChanges();

        checkboxSelectionTable.filter("v","brand","contains");
        tick(300);
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(".headerCheckbox")).componentInstance.isAllFilteredValuesChecked()).toEqual(false);
    }));

    it('should open cell', () => {
        fixture.detectChanges();

        let cell = fixture.debugElement.query(By.css(".p-editable-column"));
        cell.nativeElement.click();
        fixture.detectChanges();

        expect(editableTable.editingCell).toBeTruthy();
    });

    it('should close cell', () => {
        fixture.detectChanges();

        let cell = fixture.debugElement.query(By.css(".p-editable-column"));
        let editableDir = cell.parent.query(By.directive(EditableColumn)).injector.get(EditableColumn);
        cell.nativeElement.click();
        fixture.detectChanges();

        expect(editableTable.editingCell).toBeTruthy();
        const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.keyCode = 13;
        keydownEvent.initEvent('keydown', true, true);
        cell.nativeElement.dispatchEvent(keydownEvent);
        editableDir.onEnterKeyDown(keydownEvent);
        fixture.detectChanges();

        expect(editableTable.editingCell).toBeFalsy();
        cell.nativeElement.click();
        fixture.detectChanges();

        expect(editableTable.editingCell).toBeTruthy();
        keydownEvent.keyCode = 27;
        cell.nativeElement.dispatchEvent(keydownEvent);
        editableDir.onEscapeKeyDown(keydownEvent);
        fixture.detectChanges();

        expect(editableTable.editingCell).toBeFalsy();
    });

    it('should open next cell', () => {
        fixture.detectChanges();

        let cellEls = fixture.debugElement.queryAll(By.css(".p-editable-column"));
        let cell = cellEls[0];
        let editableDir = cell.parent.query(By.directive(EditableColumn)).injector.get(EditableColumn);
        const moveToNextCellSpy = spyOn(editableDir, 'moveToNextCell').and.callThrough();
        cell.nativeElement.click();
        fixture.detectChanges();

        expect(editableTable.editingCell).toBeTruthy();
        const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.keyCode = 9;
        keydownEvent.initEvent('keydown', true, true);
        keydownEvent.shiftKey = false;
        editableDir.onShiftKeyDown(keydownEvent);
        fixture.detectChanges();

        expect(moveToNextCellSpy).toHaveBeenCalled();
    });

    it('should open prev cell', () => {
        fixture.detectChanges();

        let cellEls = fixture.debugElement.queryAll(By.css(".p-editable-column"));
        let cell = cellEls[1];
        cell.nativeElement.click();
        fixture.detectChanges();

        expect(editableTable.editingCell).toBeTruthy();
        let editableDir = cell.parent.query(By.directive(EditableColumn)).injector.get(EditableColumn);
        const moveToPreviousCellSpy = spyOn(editableDir, 'moveToPreviousCell').and.callThrough();
        const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.keyCode = 9;
        keydownEvent.initEvent('keydown', true, true);
        keydownEvent.shiftKey = true;
        editableDir.onShiftKeyDown(keydownEvent);
        fixture.detectChanges();

        expect(moveToPreviousCellSpy).toHaveBeenCalled();
    });

    it('should open expansion', () => {
        fixture.detectChanges();

        const rowExpansionTableEl = fixture.debugElement.query(By.css(".rowExpansionTable"));
        let togglerEls = fixture.debugElement.queryAll(By.css(".rowExpansionToggler"));
        let rowEls = rowExpansionTableEl.queryAll(By.css("tr"));
        expect(togglerEls.length).toEqual(10);
        expect(rowEls.length).toEqual(11);
        togglerEls[0].nativeElement.click();
        fixture.detectChanges();

        rowEls = rowExpansionTableEl.queryAll(By.css("tr"));
        let expandedRow = fixture.debugElement.query(By.css(".expandedRow"));
        expect(rowEls.length).toEqual(12);
        expect(expandedRow.nativeElement).toBeTruthy();
    });

    it('should call resize (expand)', () => {
        fixture.detectChanges();

        colResizeTable.columnResizeMode = "expand";
        fixture.detectChanges();

        let resizerEls = document.getElementsByClassName("p-column-resizer");
        let defaultWidth = resizerEls[0].parentElement.parentElement.clientWidth;
        const onColumnResizeBeginSpy = spyOn(colResizeTable,"onColumnResizeBegin").and.callThrough();
        const event: any = document.createEvent('CustomEvent');
        event.pageX = 450;
        event.which = 1;
        event.initEvent('mousedown');
        let firstWidth = resizerEls[0].parentElement.clientWidth;
        resizerEls[0].dispatchEvent(event as MouseEvent);
        fixture.detectChanges();

        expect(onColumnResizeBeginSpy).toHaveBeenCalled();
        const onColumnResizeSpy = spyOn(colResizeTable,"onColumnResize").and.callThrough();
        event.initEvent("mousemove");
        event.pageX = 420;
        document.dispatchEvent(event as MouseEvent);
        fixture.detectChanges();

        expect(onColumnResizeSpy).toHaveBeenCalled();
        const onColumnResizeEndSpy = spyOn(colResizeTable,"onColumnResizeEnd").and.callThrough();
        event.initEvent("mouseup");
        document.dispatchEvent(event as MouseEvent);
        fixture.detectChanges();

        expect(onColumnResizeEndSpy).toHaveBeenCalled();
        expect(resizerEls[0].parentElement.clientWidth).toEqual(firstWidth - 30);
        expect(resizerEls[0].parentElement.clientWidth).not.toEqual(firstWidth);
        expect(defaultWidth).not.toEqual(resizerEls[0].parentElement.parentElement.clientWidth);
        expect(defaultWidth).toEqual(resizerEls[0].parentElement.parentElement.clientWidth + 30);
    });

    it('should call resize and resizeColGroup with scrollableTable (expand)', () => {
        fixture.detectChanges();

        colResizeTable.columnResizeMode = "expand";
        colResizeTable.scrollable = true;
        colResizeTable.scrollHeight = "50px";
        fixture.detectChanges();

        let resizerEls = document.getElementsByClassName("p-column-resizer");
        let defaultWidth = resizerEls[0].parentElement.parentElement.clientWidth;
        const onColumnResizeBeginSpy = spyOn(colResizeTable,"onColumnResizeBegin").and.callThrough();
        const event: any = document.createEvent('CustomEvent');
        event.pageX = 450;
        event.which = 1;
        event.initEvent('mousedown');
        let firstWidth = resizerEls[0].parentElement.clientWidth;
        resizerEls[0].dispatchEvent(event as MouseEvent);
        fixture.detectChanges();

        expect(onColumnResizeBeginSpy).toHaveBeenCalled();
        const onColumnResizeSpy = spyOn(colResizeTable,"onColumnResize").and.callThrough();
        event.initEvent("mousemove");
        event.pageX = 420;
        document.dispatchEvent(event as MouseEvent);
        fixture.detectChanges();

        expect(onColumnResizeSpy).toHaveBeenCalled();
        const onColumnResizeEndSpy = spyOn(colResizeTable,"onColumnResizeEnd").and.callThrough();
        event.initEvent("mouseup");
        document.dispatchEvent(event as MouseEvent);
        fixture.detectChanges();

        expect(onColumnResizeEndSpy).toHaveBeenCalled();
        expect(resizerEls[0].parentElement.clientWidth).toEqual(firstWidth - 30);
        expect(resizerEls[0].parentElement.clientWidth).not.toEqual(firstWidth);
        expect(defaultWidth).not.toEqual(resizerEls[0].parentElement.parentElement.clientWidth);
        expect(defaultWidth).toEqual(resizerEls[0].parentElement.parentElement.clientWidth + 30);
    });

    it('should call resize (fit)', () => {
        fixture.detectChanges();

        let resizerEls = document.getElementsByClassName("p-column-resizer");
        let defaultWidth = resizerEls[0].parentElement.parentElement.clientWidth;
        const onColumnResizeBeginSpy = spyOn(colResizeTable,"onColumnResizeBegin").and.callThrough();
        const event: any = document.createEvent('CustomEvent');
        event.pageX = 450;
        event.initEvent('mousedown');
        event.which = 1;
        let firstWidth = resizerEls[0].parentElement.clientWidth;
        resizerEls[0].dispatchEvent(event as MouseEvent);
        fixture.detectChanges();

        expect(onColumnResizeBeginSpy).toHaveBeenCalled();
        const onColumnResizeSpy = spyOn(colResizeTable,"onColumnResize").and.callThrough();
        event.initEvent("mousemove");
        event.pageX = 420;
        document.dispatchEvent(event as MouseEvent);
        fixture.detectChanges();

        expect(onColumnResizeSpy).toHaveBeenCalled();
        const onColumnResizeEndSpy = spyOn(colResizeTable,"onColumnResizeEnd").and.callThrough();
        event.initEvent("mouseup");
        document.dispatchEvent(event as MouseEvent);
        fixture.detectChanges();

        expect(onColumnResizeEndSpy).toHaveBeenCalled();
        expect(resizerEls[0].parentElement.clientWidth).toEqual(firstWidth - 30);
        expect(resizerEls[0].parentElement.clientWidth).not.toEqual(firstWidth);
        expect(defaultWidth).toEqual(resizerEls[0].parentElement.parentElement.clientWidth);
    });

    it('should call resize and resizeColGroup with scrollableTable (fit)', () => {
        colResizeTable.scrollable = true;
        colResizeTable.scrollHeight = "50px";
        fixture.detectChanges();

        let resizerEls = document.getElementsByClassName("p-column-resizer");
        let defaultWidth = resizerEls[0].parentElement.parentElement.clientWidth;
        const onColumnResizeBeginSpy = spyOn(colResizeTable,"onColumnResizeBegin").and.callThrough();
        const event: any = document.createEvent('CustomEvent');
        event.pageX = 450;
        event.which = 1;
        event.initEvent('mousedown');
        let firstWidth = resizerEls[0].parentElement.clientWidth;
        resizerEls[0].dispatchEvent(event as MouseEvent);
        fixture.detectChanges();

        expect(onColumnResizeBeginSpy).toHaveBeenCalled();
        const onColumnResizeSpy = spyOn(colResizeTable,"onColumnResize").and.callThrough();
        event.initEvent("mousemove");
        event.pageX = 420;
        document.dispatchEvent(event as MouseEvent);
        fixture.detectChanges();

        expect(onColumnResizeSpy).toHaveBeenCalled();
        const onColumnResizeEndSpy = spyOn(colResizeTable,"onColumnResizeEnd").and.callThrough();
        const resizeColGroupSpy = spyOn(colResizeTable,"resizeColGroup").and.callThrough();
        event.initEvent("mouseup");
        document.dispatchEvent(event as MouseEvent);
        fixture.detectChanges();

        expect(onColumnResizeEndSpy).toHaveBeenCalled();
        expect(resizeColGroupSpy).toHaveBeenCalled();
        expect(resizerEls[0].parentElement.clientWidth).toEqual(firstWidth - 30);
        expect(resizerEls[0].parentElement.clientWidth).not.toEqual(firstWidth);
        expect(defaultWidth).toEqual(resizerEls[0].parentElement.parentElement.clientWidth);
    });

    it('should reorder column (dropPosition -1)', () => {
        fixture.detectChanges();

        const reorderableTableEl = fixture.debugElement.query(By.css(".reorderableTable"));
        let reorableHeaderEls = reorderableTableEl.queryAll(By.css("th"));
        expect(reorableHeaderEls[1].nativeElement.draggable).toBeFalsy();
        reorableHeaderEls[1].nativeElement.dispatchEvent(new Event("mousedown"));
        fixture.detectChanges();

        expect(reorableHeaderEls[1].nativeElement.draggable).toBeTruthy();
        const onColumnDragStartSpy = spyOn(reorderableTable,"onColumnDragStart").and.callThrough();
        const dragEvent: any = document.createEvent('CustomEvent');
        dragEvent.initEvent('dragstart', true, true);
        dragEvent.dataTransfer = {setData(val1,val2){}};
        reorableHeaderEls[1].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();

        dragEvent.initEvent('dragenter', true, true);
        dragEvent.pageX = reorableHeaderEls[3].nativeElement.clientWidth + 1;
        reorableHeaderEls[2].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();

        dragEvent.initEvent('dragleave', true, true);
        reorableHeaderEls[2].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();

        expect(onColumnDragStartSpy).toHaveBeenCalled();
        expect(reorderableTable.draggedColumn.textContent).toEqual(" Brand ");
        dragEvent.initEvent('dragenter', true, true);
        dragEvent.pageX = reorableHeaderEls[3].nativeElement.clientWidth * 2 + 1;
        reorableHeaderEls[3].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();

        expect(reorderableTable.dropPosition).toEqual(-1);
        dragEvent.initEvent('drop');
        reorableHeaderEls[3].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();

        reorableHeaderEls = reorderableTableEl.queryAll(By.css("th"));
        expect(reorableHeaderEls[1].nativeElement.textContent).toEqual(" Vin ");
        expect(reorableHeaderEls[2].nativeElement.textContent).toEqual(" Brand ");
    });

    it('should reorder column (dropPosition +1)', () => {
        fixture.detectChanges();

        const reorderableTableEl = fixture.debugElement.query(By.css(".reorderableTable"));
        let reorableHeaderEls = reorderableTableEl.queryAll(By.css("th"));
        expect(reorableHeaderEls[1].nativeElement.draggable).toBeFalsy();
        reorableHeaderEls[1].nativeElement.dispatchEvent(new Event("mousedown"));
        fixture.detectChanges();

        expect(reorableHeaderEls[1].nativeElement.draggable).toBeTruthy();
        const onColumnDragStartSpy = spyOn(reorderableTable,"onColumnDragStart").and.callThrough();
        const dragEvent: any = document.createEvent('CustomEvent');
        dragEvent.initEvent('dragstart', true, true);
        dragEvent.dataTransfer = {setData(val1,val2){}};
        reorableHeaderEls[1].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();

        expect(onColumnDragStartSpy).toHaveBeenCalled();
        expect(reorderableTable.draggedColumn.textContent).toEqual(" Brand ");
        dragEvent.initEvent('dragenter', true, true);
        dragEvent.pageX = reorableHeaderEls[3].nativeElement.clientWidth * 3 + 1;
        reorableHeaderEls[3].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();

        expect(reorderableTable.dropPosition).toEqual(1);
        dragEvent.initEvent('drop');
        reorableHeaderEls[3].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();

        reorableHeaderEls = reorderableTableEl.queryAll(By.css("th"));
        expect(reorableHeaderEls[1].nativeElement.textContent).toEqual(" Vin ");
        expect(reorableHeaderEls[2].nativeElement.textContent).toEqual(" Year ");
        expect(reorableHeaderEls[3].nativeElement.textContent).toEqual(" Brand ");
    });

    it('should reorder row (bottom of the dropped row)', () => {
        fixture.detectChanges();

        const reorderableTableEl = fixture.debugElement.query(By.css(".reorderableTable"));
        let reorderableRowEls = reorderableTableEl.queryAll(By.css("tr"));
        expect(reorderableRowEls[1].nativeElement.draggable).toBeFalsy();
        expect(reorderableRowEls[1].children[1].nativeElement.textContent).toEqual(" VW ");
        reorderableRowEls[1].nativeElement.classList.add("p-datatable-reorderablerow-handle");
        reorderableRowEls[1].nativeElement.dispatchEvent(new Event("mousedown"));
        fixture.detectChanges();

        expect(reorderableRowEls[1].nativeElement.draggable).toBeTruthy();
        reorderableRowEls[1].nativeElement.classList.remove("p-datatable-reorderablerow-handle");
        const onRowDragStartSpy = spyOn(reorderableTable,"onRowDragStart").and.callThrough();
        const dragEvent: any = document.createEvent('CustomEvent');
        dragEvent.initEvent('dragstart', true, true);
        dragEvent.dataTransfer = {setData(val1,val2){}};
        reorderableRowEls[1].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();

        expect(onRowDragStartSpy).toHaveBeenCalled();
        expect(reorderableTable.rowDragging).toBeTruthy();
        expect(reorderableTable.draggedRowIndex).toEqual(0);
        dragEvent.initEvent('dragover', true,true);
        dragEvent.pageY = reorderableRowEls[3].nativeElement.clientWidth + 1; 
        const onRowDragOverSpy = spyOn(reorderableTable,"onRowDragOver").and.callThrough();
        reorderableRowEls[3].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();

        expect(onRowDragOverSpy).toHaveBeenCalled();
        expect(reorderableTable.droppedRowIndex).toEqual(2);
        const onRowDropSpy = spyOn(reorderableTable,"onRowDrop").and.callThrough();
        const onRowDragEndSpy = spyOn(reorderableTable,"onRowDragEnd").and.callThrough();
        const onRowDragLeaveSpy = spyOn(reorderableTable,"onRowDragLeave").and.callThrough();
        dragEvent.initEvent('drop', true,true);
        reorderableRowEls[3].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();

        reorderableRowEls = reorderableTableEl.queryAll(By.css("tr"));
        expect(reorderableRowEls[1].children[1].nativeElement.textContent).toEqual(" Audi ");
        expect(reorderableRowEls[2].children[1].nativeElement.textContent).toEqual(" VW ");
        expect(reorderableRowEls[3].children[1].nativeElement.textContent).toEqual(" Renault ");
        expect(onRowDropSpy).toHaveBeenCalled();
        expect(onRowDragEndSpy).toHaveBeenCalled();
        expect(onRowDragLeaveSpy).toHaveBeenCalled();
    });

    it('should export csv selection only', () => {
        fixture.detectChanges();

        basicSelectionTable.selectionMode = "multiple";
        fixture.detectChanges();

        const selectableRows = fixture.debugElement.queryAll(By.css(".selectableRow"));
        const vwEl = selectableRows[0];
        vwEl.nativeElement.click();
        fixture.detectChanges();

        let spyObj:HTMLElement = document.createElement("a");
        spyOn(document, 'createElement').and.returnValue(spyObj);
        fixture.detectChanges();

        basicSelectionTable.exportCSV({selectionOnly:true});
        fixture.detectChanges();

        expect(document.createElement).toHaveBeenCalledTimes(1);
        expect(document.createElement).toHaveBeenCalledWith('a');
        expect(spyObj.style.display).toEqual("none");
    });

    it('should set href and download when using exportCSV function', () => {
        fixture.detectChanges();

        let spyObj:HTMLElement = document.createElement("a");

        spyOn(spyObj, 'click').and.callThrough();
        spyOn(document, 'createElement').and.returnValue(spyObj);
        basicSelectionTable.exportCSV();
        expect(document.createElement).toHaveBeenCalledTimes(1);
        expect(document.createElement).toHaveBeenCalledWith('a');

        expect(spyObj.click).toHaveBeenCalledTimes(1);
    });

    it('should open contextMenu and select row', () => {
        fixture.detectChanges();

        const contextMenu = fixture.debugElement.query(By.css(".p-contextmenu")).componentInstance as ContextMenu;
        const showSpy = spyOn(contextMenu,"show").and.callThrough();
        const contextMenuTableEl = fixture.debugElement.query(By.css(".contextMenuTable"));
        const rowEls = contextMenuTableEl.queryAll(By.css("tr"));
        const event: any = document.createEvent('CustomEvent');
        const handleRowRightClickSpy = spyOn(contextMenuTable,"handleRowRightClick").and.callThrough();
        event.initEvent('contextmenu');
        rowEls[1].nativeElement.dispatchEvent(event);
        fixture.detectChanges();
    
        expect(handleRowRightClickSpy).toHaveBeenCalled();
        expect(showSpy).toHaveBeenCalled();
        expect(contextMenuTable.contextMenuSelection.brand).toEqual("VW");
    });

    it('should open contextMenu and select row (contextMenuSelectionMode is joint and selection mode single)', () => {
        fixture.detectChanges();

        contextMenuTable.selectionMode = "single";
        contextMenuTable.contextMenuSelectionMode = "joint";
        fixture.detectChanges();

        const contextMenu = fixture.debugElement.query(By.css(".p-contextmenu")).componentInstance as ContextMenu;
        const showSpy = spyOn(contextMenu,"show").and.callThrough();
        const contextMenuTableEl = fixture.debugElement.query(By.css(".contextMenuTable"));
        const rowEls = contextMenuTableEl.queryAll(By.css("tr"));
        const event: any = document.createEvent('CustomEvent');
        const handleRowRightClickSpy = spyOn(contextMenuTable,"handleRowRightClick").and.callThrough();
        event.initEvent('contextmenu');
        rowEls[1].nativeElement.dispatchEvent(event);
        fixture.detectChanges();
    
        expect(handleRowRightClickSpy).toHaveBeenCalled();
        expect(showSpy).toHaveBeenCalled();
        expect(contextMenuTable.selection.brand).toEqual("VW");
    });

    it('should open contextMenu and select row (contextMenuSelectionMode is joint and selection mode multiple)', () => {
        fixture.detectChanges();

        contextMenuTable.selectionMode = "multiple";
        contextMenuTable.contextMenuSelectionMode = "joint";
        fixture.detectChanges();

        const contextMenu = fixture.debugElement.query(By.css(".p-contextmenu")).componentInstance as ContextMenu;
        const showSpy = spyOn(contextMenu,"show").and.callThrough();
        const contextMenuTableEl = fixture.debugElement.query(By.css(".contextMenuTable"));
        const rowEls = contextMenuTableEl.queryAll(By.css("tr"));
        const event: any = document.createEvent('CustomEvent');
        const handleRowRightClickSpy = spyOn(contextMenuTable,"handleRowRightClick").and.callThrough();
        event.initEvent('contextmenu');
        rowEls[1].nativeElement.dispatchEvent(event);
        rowEls[2].nativeElement.click();
        fixture.detectChanges();
    
        expect(handleRowRightClickSpy).toHaveBeenCalled();
        expect(showSpy).toHaveBeenCalled();
        expect(contextMenuTable.selection[0].brand).toEqual("VW");
        expect(contextMenuTable.selection[1].brand).toEqual("Audi");
        expect(contextMenuTable.selection.length).toEqual(2);
    });

    it('should call saveState and clearState (session)', () => {
        stateTable.columnResizeMode = "expand";       
        fixture.detectChanges();
        
        stateTable.selection = null;
        stateTable.clearState();
        stateTable.stateStorage = "session";
        fixture.detectChanges();

        const stateTableEl = fixture.debugElement.query(By.css(".stateTable"))
        const headerEls = stateTableEl.queryAll(By.css("th"));
        const brandFilter = stateTableEl.query(By.css("input"));
        brandFilter.nativeElement.value = "vo";
        brandFilter.nativeElement.dispatchEvent(new Event("input"));
        fixture.detectChanges();

        const rowEls = stateTableEl.queryAll(By.css(".p-selectable-row"));
        rowEls[0].nativeElement.click();
        fixture.detectChanges();

        let resizerEls = document.getElementsByClassName("p-column-resizer");
        const event: any = document.createEvent('CustomEvent');
        event.pageX = 450;
        event.initEvent('mousedown');
        resizerEls[4].dispatchEvent(event as MouseEvent);
        fixture.detectChanges();

        event.initEvent("mousemove");
        event.pageX = 420;
        document.dispatchEvent(event as MouseEvent);
        fixture.detectChanges();

        event.initEvent("mouseup");
        document.dispatchEvent(event as MouseEvent);
        fixture.detectChanges();

        headerEls[0].nativeElement.click();
        fixture.detectChanges();

        let state = JSON.parse((stateTable.getStorage().getItem(stateTable.stateKey)));
        expect(state.columnOrder[0]).toEqual("brand");
        expect(state.columnOrder[1]).toEqual("vin");
        expect(state.columnOrder[2]).toEqual("year");
        expect(state.columnOrder[3]).toEqual("color");
        expect(state.filters.brand.value).toEqual("vo");
        expect(state.first).toEqual(0);
        expect(state.rows).toEqual(3);
        expect(state.selection).toBeTruthy();
        expect(state.sortField).toEqual("brand");
        expect(state.sortOrder).toBeTruthy();
        stateTable.clearState();
        fixture.detectChanges();

        state = JSON.parse((stateTable.getStorage().getItem(stateTable.stateKey)));
        expect(state).toBeNull();
    });

    it('should call saveState and clearState (local)', () => {
        stateTable.columnResizeMode = "expand";       
        fixture.detectChanges();
        
        stateTable.selection = null;
        stateTable.clearState();
        stateTable.stateStorage = "local";
        fixture.detectChanges();

        const stateTableEl = fixture.debugElement.query(By.css(".stateTable"))
        const headerEls = stateTableEl.queryAll(By.css("th"));
        const brandFilter = stateTableEl.query(By.css("input"));
        brandFilter.nativeElement.value = "vo";
        brandFilter.nativeElement.dispatchEvent(new Event("input"));
        fixture.detectChanges();

        const rowEls = stateTableEl.queryAll(By.css(".p-selectable-row"));
        rowEls[0].nativeElement.click();
        fixture.detectChanges();

        let resizerEls = document.getElementsByClassName("p-column-resizer");
        const event: any = document.createEvent('CustomEvent');
        event.pageX = 450;
        event.initEvent('mousedown');
        resizerEls[4].dispatchEvent(event as MouseEvent);
        fixture.detectChanges();

        event.initEvent("mousemove");
        event.pageX = 420;
        document.dispatchEvent(event as MouseEvent);
        fixture.detectChanges();

        event.initEvent("mouseup");
        document.dispatchEvent(event as MouseEvent);
        fixture.detectChanges();

        headerEls[0].nativeElement.click();
        fixture.detectChanges();

        let state = JSON.parse((stateTable.getStorage().getItem(stateTable.stateKey)));
        expect(state.columnOrder[0]).toEqual("brand");
        expect(state.columnOrder[1]).toEqual("vin");
        expect(state.columnOrder[2]).toEqual("year");
        expect(state.columnOrder[3]).toEqual("color");
        expect(state.filters.brand.value).toEqual("vo");
        expect(state.first).toEqual(0);
        expect(state.rows).toEqual(3);
        expect(state.selection).toBeTruthy();
        expect(state.sortField).toEqual("brand");
        expect(state.sortOrder).toBeTruthy();
        stateTable.clearState();
        fixture.detectChanges();

        state = JSON.parse((stateTable.getStorage().getItem(stateTable.stateKey)));
        expect(state).toBeNull();
    });
});
