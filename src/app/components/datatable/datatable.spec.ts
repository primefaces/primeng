import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DataTable } from './datatable';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DataTable', () => {
  
  let datatable: DataTable;
  let fixture: ComponentFixture<DataTable>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        DataTable
      ]
    });
    
    fixture = TestBed.createComponent(DataTable);
    datatable = fixture.componentInstance;
  });
});
