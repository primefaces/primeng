import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Chips } from './chips';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Chips', () => {
  
  let chips: Chips;
  let fixture: ComponentFixture<Chips>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Chips
      ]
    });
    
    fixture = TestBed.createComponent(Chips);
    chips = fixture.componentInstance;
  });
});
