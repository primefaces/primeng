import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Rating } from './rating';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Rating', () => {
  
  let rating: Rating;
  let fixture: ComponentFixture<Rating>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Rating
      ]
    });
    
    fixture = TestBed.createComponent(Rating);
    rating = fixture.componentInstance;
  });
});
