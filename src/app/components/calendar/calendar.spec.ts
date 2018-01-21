import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Calendar} from './calendar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {ButtonModule} from '../button/button';
import {SharedModule} from '../common/shared';

describe('Calendar', () => {
  
  let calendar: Calendar;
  let fixture: ComponentFixture<Calendar>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ButtonModule,
        SharedModule
      ],
      declarations: [
        Calendar
      ]
    });
    
    fixture = TestBed.createComponent(Calendar);
    calendar = fixture.componentInstance;
  });
});
