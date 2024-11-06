import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSoftRange } from './calendarsoftrange';

describe('PCalendarSoftRangeComponent', () => {
  let component: CalendarSoftRange;
  let fixture: ComponentFixture<CalendarSoftRange>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarSoftRange]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarSoftRange);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
