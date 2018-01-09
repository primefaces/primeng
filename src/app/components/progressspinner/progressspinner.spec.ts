import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProgressSpinner } from './progressspinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProgressSpinner', () => {
  
  let progressspinner: ProgressSpinner;
  let fixture: ComponentFixture<ProgressSpinner>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        ProgressSpinner
      ]
    });
    
    fixture = TestBed.createComponent(ProgressSpinner);
    progressspinner = fixture.componentInstance;
  });
});
