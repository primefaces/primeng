import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { KeyFilter } from './keyfilter';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('KeyFilter', () => {
  
  let keyfilter: KeyFilter;
  let fixture: ComponentFixture<KeyFilter>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        KeyFilter
      ]
    });
    
    fixture = TestBed.createComponent(KeyFilter);
    keyfilter = fixture.componentInstance;
  });
});
