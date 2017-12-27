import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PickList } from './picklist';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PickList', () => {
  
  let picklist: PickList;
  let fixture: ComponentFixture<PickList>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        PickList
      ]
    });
    
    fixture = TestBed.createComponent(PickList);
    picklist = fixture.componentInstance;
  });
});
