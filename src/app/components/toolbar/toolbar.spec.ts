import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Toolbar } from './toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Toolbar', () => {
  
  let toolbar: Toolbar;
  let fixture: ComponentFixture<Toolbar>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Toolbar
      ]
    });
    
    fixture = TestBed.createComponent(Toolbar);
    toolbar = fixture.componentInstance;
  });
});
