import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DataList } from './datalist';
import {SharedModule} from '../common/shared';
import {PaginatorModule} from '../paginator/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('DataList', () => {
  
  let datalist: DataList;
  let fixture: ComponentFixture<DataList>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule,
        PaginatorModule
      ],
      declarations: [
        DataList
      ]
    });
    
    fixture = TestBed.createComponent(DataList);
    datalist = fixture.componentInstance;
  });
});
