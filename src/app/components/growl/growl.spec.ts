import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Growl } from './growl';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Growl', () => {
  
  let growl: Growl;
  let fixture: ComponentFixture<Growl>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Growl
      ]
    });
    
    fixture = TestBed.createComponent(Growl);
    growl = fixture.componentInstance;
  });
});
