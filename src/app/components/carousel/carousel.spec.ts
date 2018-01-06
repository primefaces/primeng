import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Carousel } from './carousel';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Carousel', () => {
  
  let carousel: Carousel;
  let fixture: ComponentFixture<Carousel>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Carousel
      ]
    });
    
    fixture = TestBed.createComponent(Carousel);
    carousel = fixture.componentInstance;
  });
});
