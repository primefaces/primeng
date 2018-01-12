import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Spinner } from './spinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Spinner', () => {
  
  let spinner: Spinner;
  let fixture: ComponentFixture<Spinner>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Spinner
      ]
    });
    
    fixture = TestBed.createComponent(Spinner);
    spinner = fixture.componentInstance;
  });
});
