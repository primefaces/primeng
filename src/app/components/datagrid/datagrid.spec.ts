import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DataGrid } from './datagrid';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DataGrid', () => {
  
  let datagrid: DataGrid;
  let fixture: ComponentFixture<DataGrid>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        DataGrid
      ]
    });
    
    fixture = TestBed.createComponent(DataGrid);
    datagrid = fixture.componentInstance;
  });
});
