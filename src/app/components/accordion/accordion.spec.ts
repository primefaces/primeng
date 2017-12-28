import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Accordion } from './accordion';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Accordion', () => {
  
  let accordion: Accordion;
  let fixture: ComponentFixture<Accordion>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Accordion
      ]
    });
    
    fixture = TestBed.createComponent(Accordion);
    accordion = fixture.componentInstance;
  });
});
