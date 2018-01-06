import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Dropdown } from './dropdown';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Dropdown', () => {
  
  let dropdown: Dropdown;
  let fixture: ComponentFixture<Dropdown>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Dropdown
      ]
    });
    
    fixture = TestBed.createComponent(Dropdown);
    dropdown = fixture.componentInstance;
  });
});
