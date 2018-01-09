import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProgressBar } from './progressbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProgressBar', () => {
  
  let progressbar: ProgressBar;
  let fixture: ComponentFixture<ProgressBar>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        ProgressBar
      ]
    });
    
    fixture = TestBed.createComponent(ProgressBar);
    progressbar = fixture.componentInstance;
  });
});
