import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Card } from './card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Card', () => {
  
  let card: Card;
  let fixture: ComponentFixture<Card>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Card
      ]
    });
    
    fixture = TestBed.createComponent(Card);
    card = fixture.componentInstance;
  });
});
