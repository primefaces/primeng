import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Inplace } from './inplace';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Inplace', () => {
  
  let inplace: Inplace;
  let fixture: ComponentFixture<Inplace>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Inplace
      ]
    });
    
    fixture = TestBed.createComponent(Inplace);
    inplace = fixture.componentInstance;
  });
});
