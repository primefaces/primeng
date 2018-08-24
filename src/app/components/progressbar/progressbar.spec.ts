import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProgressBar } from './progressbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProgressBar', () => {
  
    let progressbar: ProgressBar;
    let fixture: ComponentFixture<ProgressBar>;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule
        ],
        declarations: [
          ProgressBar
        ]
      });
      
      fixture = TestBed.createComponent(ProgressBar);
      progressbar = fixture.componentInstance;
    });

    it('should be fill %50', () => {
      progressbar.value=50;
      fixture.detectChanges();
      
      const progressbarValueEl = fixture.debugElement.query(By.css('.ui-progressbar-value')).nativeElement;
      const progressbarLabelEl = fixture.debugElement.query(By.css('.ui-progressbar-label')).nativeElement;
      expect(progressbarValueEl.style.width).toEqual('50%');
      expect(progressbarLabelEl.textContent).toEqual('50%');
    });

    it('should not show value', () => {
      progressbar.value=50;
      progressbar.showValue=false;
      fixture.detectChanges();
      
      const progressbarValueEl = fixture.debugElement.query(By.css('.ui-progressbar-value')).nativeElement;
      const progressbarLabelEl = fixture.debugElement.query(By.css('.ui-progressbar-label'));
      expect(progressbarValueEl.style.width).toEqual('50%');
      expect(progressbarLabelEl).toBeFalsy();
    });

    it('should be change style and styleClass', () => {
      progressbar.value = 50;
      progressbar.style = {'primeng':'rocks'};
      progressbar.styleClass = "Primeng";
      fixture.detectChanges();

      const progressbarEl = fixture.debugElement.query(By.css('div')).nativeElement;
      expect(progressbarEl.style.primeng).toEqual('rocks');
      expect(progressbarEl.className).toContain('Primeng');
    });

    it('should be change unit', () => {
      progressbar.value = 50;
      progressbar.unit = '&';
      fixture.detectChanges();

      const progressbarLabelEl = fixture.debugElement.query(By.css('.ui-progressbar-label')).nativeElement;
      expect(progressbarLabelEl.textContent).toEqual('50&');
    });

    it('should be change mode', () => {
      progressbar.value = 50;
      progressbar.mode = 'indeterminate';
      fixture.detectChanges();

      const progressbarLabelEl = fixture.debugElement.query(By.css('div')).nativeElement;
      expect(progressbarLabelEl.className).toContain('ui-progressbar-indeterminate');
    });
});
