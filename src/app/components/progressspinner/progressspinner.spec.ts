import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProgressSpinner } from './progressspinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProgressSpinner', () => {
  
    let progressspinner: ProgressSpinner;
    let fixture: ComponentFixture<ProgressSpinner>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
            NoopAnimationsModule
            ],
            declarations: [
            ProgressSpinner
            ]
        });

        fixture = TestBed.createComponent(ProgressSpinner);
        progressspinner = fixture.componentInstance;
    });
    it('should created by default', () => {
        fixture.detectChanges();
  
        const progressSpinnerEl = fixture.debugElement.query(By.css('.ui-progress-spinner'));
        expect(progressSpinnerEl.nativeElement).toBeTruthy();
    });

    it('should get style and styleClass', () => {
        progressspinner.style = {'primeng':'rocks'};
        progressspinner.styleClass = "PrimeNG ROCKS!"
        fixture.detectChanges();
  
        const progressSpinnerEl = fixture.debugElement.query(By.css('.ui-progress-spinner'));
        expect(progressSpinnerEl.nativeElement.className).toContain("PrimeNG ROCKS!");
        expect(progressSpinnerEl.nativeElement.style.primeng).toEqual("rocks");
    });
});
