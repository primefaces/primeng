import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TriStateCheckbox } from './tristatecheckbox';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TriStateCheckbox', () => {
  
    let tristate: TriStateCheckbox;
    let fixture: ComponentFixture<TriStateCheckbox>;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule
        ],
        declarations: [
          TriStateCheckbox
        ]
      });
      
      fixture = TestBed.createComponent(TriStateCheckbox);
      tristate = fixture.componentInstance;
    });

    it('should be created by default', () => {
      fixture.detectChanges();

      const tristatecheckboxEl = fixture.debugElement.query(By.css('div'));
      expect(tristatecheckboxEl).toBeTruthy();
    });

    it('should be disabled', () => {
      tristate.disabled = true;
      tristate.label = "Primeng!";
      fixture.detectChanges();

      const toggleSpy = spyOn(tristate, 'toggle').and.callThrough();
      const helperInputEl = fixture.debugElement.query(By.css('.ui-helper-hidden-accessible')).children[0].nativeElement;
      const checkBoxEl = fixture.debugElement.query(By.css('.ui-chkbox-box')).nativeElement;
      const labelEl = fixture.debugElement.query(By.css('label')).nativeElement;
      checkBoxEl.click();
      fixture.detectChanges();

      expect(helperInputEl.disabled).toEqual(true);
      expect(checkBoxEl.className).toContain("ui-state-disabled");
      expect(labelEl.className).toContain("ui-label-disabled");
      expect(toggleSpy).not.toHaveBeenCalled();
    });

    it('should be get a label', () => {
      tristate.label = "Primeng!";
      fixture.detectChanges();

      const labelEl = fixture.debugElement.query(By.css('label')).nativeElement;
      expect(labelEl.textContent).toContain("Primeng!");
    });

    it('should be change stlye and styleClass', () => {
      tristate.styleClass = "Primeng ROCKS!";
      tristate.style = {'primeng':'rocks!'};
      fixture.detectChanges();

      const tristatecheckboxEl = fixture.debugElement.query(By.css('div')).nativeElement;
      expect(tristatecheckboxEl.className).toContain("Primeng ROCKS!");
      expect(tristatecheckboxEl.style.primeng).toContain("rocks!");
    });

    it('should be get a name inputId and tabIndex', () => {
      tristate.label = "Primeng!";
      tristate.tabindex = 5;
      tristate.inputId = "Primeng";
      tristate.name = "Primeng ROCKS!";
      fixture.detectChanges();

      const helperInputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      const labelEl = fixture.debugElement.query(By.css('label')).nativeElement;
      expect(helperInputEl.tabIndex).toEqual(5);
      expect(helperInputEl.id).toEqual("Primeng");
      expect(helperInputEl.name).toEqual("Primeng ROCKS!");
      expect(labelEl.htmlFor).toEqual("Primeng");
    });

    it('should be value is true when click', () => {
      tristate.label = "Primeng";
      fixture.detectChanges();

      const onClickSpy = spyOn(tristate, 'onClick').and.callThrough();
      const checkBoxEl = fixture.debugElement.query(By.css('.ui-chkbox-box')).nativeElement;
      const checkBoxIconEl = fixture.debugElement.query(By.css('span')).nativeElement;
      const labeEl = fixture.debugElement.query(By.css('label')).nativeElement;
      checkBoxEl.click();
      fixture.detectChanges();

      expect(tristate.value).toEqual(true);
      expect(checkBoxEl.className).toContain("ui-state-active");
      expect(checkBoxIconEl.className).toContain("pi-check");
      expect(labeEl.className).toContain("ui-label-active");
      expect(onClickSpy).toHaveBeenCalled();
    });

    it('should be value is true when click to label', () => {
      tristate.label = "Primeng";
      fixture.detectChanges();

      const onClickSpy = spyOn(tristate, 'onClick').and.callThrough();
      const checkBoxEl = fixture.debugElement.query(By.css('.ui-chkbox-box')).nativeElement;
      const checkBoxIconEl = fixture.debugElement.query(By.css('span')).nativeElement;
      const labeEl = fixture.debugElement.query(By.css('label')).nativeElement;
      labeEl.click();
      fixture.detectChanges();

      expect(tristate.value).toEqual(true);
      expect(checkBoxEl.className).toContain("ui-state-active");
      expect(checkBoxIconEl.className).toContain("pi-check");
      expect(labeEl.className).toContain("ui-label-active");
      expect(onClickSpy).toHaveBeenCalled();
    });

    it('should be value is false when click twice', () => {
      tristate.label = "Primeng";
      fixture.detectChanges();

      const onClickSpy = spyOn(tristate, 'onClick').and.callThrough();
      const checkBoxEl = fixture.debugElement.query(By.css('.ui-chkbox-box')).nativeElement;
      const checkBoxIconEl = fixture.debugElement.query(By.css('span')).nativeElement;
      const labeEl = fixture.debugElement.query(By.css('label')).nativeElement;
      checkBoxEl.click();
      checkBoxEl.click();
      fixture.detectChanges();

      expect(tristate.value).toEqual(false);
      expect(checkBoxEl.className).toContain("ui-state-active");
      expect(checkBoxIconEl.className).toContain("pi-times");
      expect(labeEl.className).toContain("ui-label-active");
      expect(onClickSpy).toHaveBeenCalledTimes(2);
    });

    it('should be value is false when click three time', () => {
      tristate.label = "Primeng";
      fixture.detectChanges();

      const onClickSpy = spyOn(tristate, 'onClick').and.callThrough();
      const checkBoxEl = fixture.debugElement.query(By.css('.ui-chkbox-box')).nativeElement;
      const checkBoxIconEl = fixture.debugElement.query(By.css('span')).nativeElement;
      const labeEl = fixture.debugElement.query(By.css('label')).nativeElement;
      checkBoxEl.click();
      checkBoxEl.click();
      checkBoxEl.click();
      fixture.detectChanges();

      expect(tristate.value).toEqual(null);
      expect(checkBoxEl.className).not.toContain("ui-state-active");
      expect(checkBoxIconEl.className).toEqual("ui-chkbox-icon pi ui-clickable");
      expect(labeEl.className).not.toContain("ui-label-active");
      expect(onClickSpy).toHaveBeenCalledTimes(3);
    });

});
