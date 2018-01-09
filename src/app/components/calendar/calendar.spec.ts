import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Calendar } from './calendar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Calendar', () => {
  
  let calendar: Calendar;
  let fixture: ComponentFixture<Calendar>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Calendar
      ]
    });
    
    fixture = TestBed.createComponent(Calendar);
    calendar = fixture.componentInstance;
  });
});
