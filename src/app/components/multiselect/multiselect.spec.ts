import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MultiSelect } from './multiselect';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MultiSelect', () => {
  
  let multiselect: MultiSelect;
  let fixture: ComponentFixture<MultiSelect>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        MultiSelect
      ]
    });
    
    fixture = TestBed.createComponent(MultiSelect);
    multiselect = fixture.componentInstance;
  });
});
