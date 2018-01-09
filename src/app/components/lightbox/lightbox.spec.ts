import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Lightbox } from './lightbox';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Lightbox', () => {
  
  let lightbox: Lightbox;
  let fixture: ComponentFixture<Lightbox>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Lightbox
      ]
    });
    
    fixture = TestBed.createComponent(Lightbox);
    lightbox = fixture.componentInstance;
  });
});
