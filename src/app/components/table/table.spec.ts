import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Table, TableBody, ScrollableView, SortableColumn, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, SortIcon, TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick } from './table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { Paginator } from '../paginator/paginator';
import { Dropdown } from '../dropdown/dropdown';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../common/shared';

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
                <i class="fa fa-search" style="margin:4px 4px 0 0"></i>
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
    `
})
class TestBasicTableComponent {
    cols = [
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
    let testComponent: TestBasicTableComponent;
    let fixture: ComponentFixture<TestBasicTableComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                FormsModule,
                SharedModule
            ],
            declarations: [
                Table,
                SortableColumn,
                SelectableRow,
                RowToggler,
                ContextMenuRow,
                ResizableColumn,
                ReorderableColumn,
                EditableColumn,
                CellEditor,
                TableBody,
                ScrollableView,
                SortIcon,
                TableRadioButton,
                TableCheckbox,
                TableHeaderCheckbox,
                ReorderableRowHandle,
                ReorderableRow,
                SelectableRowDblClick,
                Paginator,
                Dropdown,
                TestBasicTableComponent,
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
    });

    it('should display by default', () => {
        fixture.detectChanges();
  
        const tableEl = fixture.debugElement.query(By.css('div'));
        expect(tableEl.nativeElement).toBeTruthy();
    });

    it('should display 10 rows', () => {
        fixture.detectChanges();
  
        const tableEl = fixture.debugElement.query(By.css('div'));
        const bodyRows = tableEl.query(By.css('.ui-table-tbody')).queryAll(By.css('tr'));
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
        fixture.detectChanges();

        const paginatorCount = fixture.debugElement.queryAll(By.css("p-paginator"));
        expect(paginatorCount.length).toEqual(2);
    });

    it('should use paginator and list 5 elements', () => {
        fixture.detectChanges();

        table.paginator = true;
        table.rows = 5;
        fixture.detectChanges();
        
        const tableEl = fixture.debugElement.query(By.css('div'));
        const bodyRows = tableEl.query(By.css('.ui-table-tbody')).queryAll(By.css('tr'));
        expect(bodyRows.length).toEqual(5);
        const pageTwoEl = fixture.debugElement.query(By.css("p-paginator")).query(By.css(".ui-paginator-pages")).children[1];

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
        const bodyRows = tableEl.query(By.css('.ui-table-tbody')).queryAll(By.css('tr'));
        expect(bodyRows.length).toEqual(2);
    }));

    it('should use global filter and show 1 items', fakeAsync(() => {
        fixture.detectChanges();

        const globalFilter = fixture.debugElement.query(By.css(".globalFilter"));
        globalFilter.nativeElement.value = "dsad231ff";
        globalFilter.nativeElement.dispatchEvent(new Event("input"));
        tick(300);
        fixture.detectChanges();

        const tableEl = fixture.debugElement.query(By.css(".filterTable"));
        const bodyRows = tableEl.query(By.css('.ui-table-tbody')).queryAll(By.css('tr'));
        expect(bodyRows.length).toEqual(1);
    }));

    it('should use globalFilterFields and show 0 items', fakeAsync(() => {
        fixture.detectChanges();

        filterTable.globalFilterFields = ['year','color','brand']
        fixture.detectChanges();
        
        const globalFilter = fixture.debugElement.query(By.css(".globalFilter"));
        globalFilter.nativeElement.value = "dsad231ff";
        globalFilter.nativeElement.dispatchEvent(new Event("input"));
        tick(300);
        fixture.detectChanges();

        const tableEl = fixture.debugElement.query(By.css(".filterTable"));
        const bodyRows = tableEl.query(By.css('.ui-table-tbody')).queryAll(By.css('tr'));
        expect(bodyRows.length).toEqual(0);
    }));

    it('should use basic sort', () => {
        fixture.detectChanges();

        const brandSortEl = fixture.debugElement.query(By.css(".sortableColumn"));
        brandSortEl.nativeElement.click();
        fixture.detectChanges();

        const firstEl = fixture.debugElement.query(By.css(".sortTable")).query(By.css('.ui-table-tbody')).query(By.css('td'));

        expect(firstEl.nativeElement.outerText).toEqual("Audi");
    });

    it('should use multiple sort', fakeAsync(() => {
        sortTable.sortMode = "multiple"
        fixture.detectChanges();

        const yearSortEl = fixture.debugElement.queryAll(By.css(".sortableColumn"))[1];
        const colorSortEl = fixture.debugElement.queryAll(By.css(".sortableColumn"))[3];
        colorSortEl.nativeElement.click();
        fixture.detectChanges();

        const firstEl = fixture.debugElement.query(By.css(".sortTable")).query(By.css('.ui-table-tbody')).query(By.css('tr'));

        expect(firstEl.children[3].nativeElement.outerText).toEqual("Black");
        expect(firstEl.children[2].nativeElement.outerText).toEqual("2011");
        sortTable.multiSortMeta.push({field:"year",order:1});
        sortTable.sortMultiple();
        tick(300);
        fixture.detectChanges();

        const firstRow = fixture.debugElement.query(By.css(".sortTable")).query(By.css('.ui-table-tbody')).query(By.css('tr'));
        expect(firstRow.children[2].nativeElement.outerText).toEqual("2000");
    }));

    it('should use custom sort', () => {
        sortTable.customSort = true;
        sortTable.sortFunction.subscribe(event => testComponent.customSort(event));
        fixture.detectChanges();

        const brandSortEl = fixture.debugElement.query(By.css(".sortableColumn"));
        brandSortEl.nativeElement.click();
        fixture.detectChanges();

        const firstEl = fixture.debugElement.query(By.css(".sortTable")).query(By.css('.ui-table-tbody')).query(By.css('td'));

        expect(firstEl.nativeElement.outerText).toEqual("Audi");
    });

    it('should select single item and unselect when another item select and self click', () => {
        fixture.detectChanges();

        const selectableRows = fixture.debugElement.queryAll(By.css(".selectableRow"));
        const vwEl = selectableRows[0];
        vwEl.nativeElement.click();
        fixture.detectChanges();

        expect(basicSelectionTable.selection.brand).toEqual("VW");
        expect(vwEl.nativeElement.className).toContain('ui-state-highlight');
        const audiEl = selectableRows[1];
        audiEl.nativeElement.click();
        fixture.detectChanges();

        expect(basicSelectionTable.selection.brand).toEqual("Audi");
        expect(audiEl.nativeElement.className).toContain('ui-state-highlight');
        audiEl.nativeElement.click();
        fixture.detectChanges();

        expect(basicSelectionTable.selection).toBeFalsy();
        expect(audiEl.nativeElement.className).not.toContain('ui-state-highlight');
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
        expect(vwEl.nativeElement.className).toContain('ui-state-highlight');
        const audiEl = selectableRows[1];
        audiEl.nativeElement.click();
        fixture.detectChanges();

        expect(basicSelectionTable.selection.brand).toEqual("Audi");
        expect(audiEl.nativeElement.className).toContain('ui-state-highlight');
        audiEl.nativeElement.click();
        fixture.detectChanges();

        expect(basicSelectionTable.selection).toBeFalsy();
        expect(audiEl.nativeElement.className).not.toContain('ui-state-highlight');
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
        expect(vwEl.nativeElement.className).toContain('ui-state-highlight');
        const audiEl = selectableRows[1];
        audiEl.nativeElement.click();
        fixture.detectChanges();

        expect(basicSelectionTable.selection[1].brand).toEqual("Audi");
        expect(basicSelectionTable.selection.length).toEqual(2);
        expect(audiEl.nativeElement.className).toContain('ui-state-highlight');
        audiEl.nativeElement.click();
        fixture.detectChanges();

        expect(basicSelectionTable.selection.length).toEqual(1);
        expect(audiEl.nativeElement.className).not.toContain('ui-state-highlight');
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
        expect(vwEl.nativeElement.className).toContain('ui-state-highlight');
        const event: any = document.createEvent('CustomEvent');
        event.metaKey = true;
        event.ctrlKey = true;
        event.initEvent('click');
        const audiEl = selectableRows[1];
        audiEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();

        expect(basicSelectionTable.selection.brand).toEqual("Audi");
        expect(audiEl.nativeElement.className).toContain('ui-state-highlight');
        audiEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();

        expect(basicSelectionTable.selection).toBeFalsy();
        expect(audiEl.nativeElement.className).not.toContain('ui-state-highlight');
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
        expect(vwEl.nativeElement.className).toContain('ui-state-highlight');
        const event: any = document.createEvent('CustomEvent');
        event.metaKey = true;
        event.ctrlKey = true;
        event.initEvent('click');
        const audiEl = selectableRows[1];
        audiEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();

        expect(basicSelectionTable.selection[1].brand).toEqual("Audi");
        expect(basicSelectionTable.selection.length).toEqual(2);
        expect(audiEl.nativeElement.className).toContain('ui-state-highlight');
        audiEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();

        expect(basicSelectionTable.selection.length).toEqual(1);
        expect(audiEl.nativeElement.className).not.toContain('ui-state-highlight');
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
        expect(audiEl.nativeElement.className).toContain('ui-state-highlight');
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
        expect(audiEl.nativeElement.className).toContain('ui-state-highlight');
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
        
        expect(vwRadioEl.query(By.css(".ui-radiobutton-box")).nativeElement.className).toContain("ui-state-focus");
        vwRadioEl.query(By.css("input")).nativeElement.dispatchEvent(new Event("blur"));
        fixture.detectChanges();

        expect(vwRadioEl.query(By.css(".ui-radiobutton-box")).nativeElement.className).not.toContain("ui-state-focus");
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
        
        expect(vwCheckboxEl.query(By.css(".ui-chkbox-box")).nativeElement.className).toContain("ui-state-focus");
        vwCheckboxEl.query(By.css("input")).nativeElement.dispatchEvent(new Event("blur"));
        fixture.detectChanges();

        expect(vwCheckboxEl.query(By.css(".ui-chkbox-box")).nativeElement.className).not.toContain("ui-state-focus");
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
        
        expect(headerCheckbox.query(By.css(".ui-chkbox-box")).nativeElement.className).toContain("ui-state-focus");
        headerCheckbox.nativeElement.click();
        headerCheckbox.query(By.css("input")).nativeElement.dispatchEvent(new Event("blur"));
        fixture.detectChanges();

        expect(headerCheckbox.query(By.css(".ui-chkbox-box")).nativeElement.className).not.toContain("ui-state-focus");
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
});
