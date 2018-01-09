import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DataScroller } from './datascroller';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DataScroller', () => {
  
  let datascroller: DataScroller;
  let fixture: ComponentFixture<DataScroller>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        DataScroller
      ]
    });
    
    fixture = TestBed.createComponent(DataScroller);
    datascroller = fixture.componentInstance;
  });
});
