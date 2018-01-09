import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Schedule } from './schedule';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Schedule', () => {
  
  let schedule: Schedule;
  let fixture: ComponentFixture<Schedule>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Schedule
      ]
    });
    
    fixture = TestBed.createComponent(Schedule);
    schedule = fixture.componentInstance;
  });
});
