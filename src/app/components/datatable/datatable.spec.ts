import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DataTable, DTRadioButton, DTCheckbox, ColumnHeaders, ColumnFooters, TableBody, ScrollableView } from './datatable';
import {SharedModule} from '../common/shared';
import {PaginatorModule} from '../paginator/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DataTable', () => {
  
  let datatable: DataTable;
  let fixture: ComponentFixture<DataTable>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule,
        PaginatorModule
      ],
      declarations: [
        DataTable,
        DTRadioButton,
        DTCheckbox,
        ColumnHeaders,
        ColumnFooters,
        TableBody,
        ScrollableView
      ]
    });
    
    fixture = TestBed.createComponent(DataTable);
    datatable = fixture.componentInstance;
  });
});
