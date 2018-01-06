import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Breadcrumb } from './breadcrumb';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Breadcrumb', () => {
  
  let breadcrumb: Breadcrumb;
  let fixture: ComponentFixture<Breadcrumb>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Breadcrumb
      ]
    });
    
    fixture = TestBed.createComponent(Breadcrumb);
    breadcrumb = fixture.componentInstance;
  });
});
