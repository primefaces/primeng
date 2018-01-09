import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Steps } from './steps';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Steps', () => {
  
  let steps: Steps;
  let fixture: ComponentFixture<Steps>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Steps
      ]
    });
    
    fixture = TestBed.createComponent(Steps);
    steps = fixture.componentInstance;
  });
});
