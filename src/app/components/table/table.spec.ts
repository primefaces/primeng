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
    <p-table class="basicTable">
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
    </p-table>

    <p-table class="filterTable" #dt [columns]="cols" [value]="cars" [paginator]="true" [rows]="10">
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
    `
})
class TestBasicTableComponent {
}
fdescribe('Table', () => {
  
    let table: Table;
    let filterTable: Table;
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
    });

    it('should display by default', () => {
        fixture.detectChanges();
  
        const tableEl = fixture.debugElement.query(By.css('div'));
        expect(tableEl.nativeElement).toBeTruthy();
    });

    it('should display 10 rows', () => {
        table.value = [
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
        table.columns = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
        fixture.detectChanges();
  
        const tableEl = fixture.debugElement.query(By.css('div'));
        const bodyRows = tableEl.query(By.css('.ui-table-tbody')).queryAll(By.css('tr'));
        expect(bodyRows.length).toEqual(10);
    });

    it('should use custom filter and show 2 items', fakeAsync(() => {
        fixture.detectChanges();

        filterTable.value = [
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
        filterTable.columns = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
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

        filterTable.value = [
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
        filterTable.columns = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
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

        filterTable.value = [
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
        filterTable.columns = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
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
});
