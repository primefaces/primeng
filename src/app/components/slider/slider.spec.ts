import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Slider } from './slider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Slider', () => {
  
  let slider: Slider;
  let fixture: ComponentFixture<Slider>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Slider
      ]
    });
    
    fixture = TestBed.createComponent(Slider);
    slider = fixture.componentInstance;
  });
});
