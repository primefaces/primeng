import { TestBed, ComponentFixture, async } from '@angular/core/testing';
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

  it('should render events on component init', async(() => {
    schedule.defaultDate = '2016-01-01';
    schedule.events = [
      {
        "title": "All Day Event",
        "start": "2016-01-01"
      }
    ];
    fixture.detectChanges();
    fixture.whenRenderingDone().then(() => {
      const element = fixture.nativeElement.querySelector('.fc-event');
      expect(element).toBeTruthy();
    });
  }));
});