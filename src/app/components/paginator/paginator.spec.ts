import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Paginator } from './paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Paginator', () => {
  
  let paginator: Paginator;
  let fixture: ComponentFixture<Paginator>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Paginator
      ]
    });
    
    fixture = TestBed.createComponent(Paginator);
    paginator = fixture.componentInstance;
  });
});
