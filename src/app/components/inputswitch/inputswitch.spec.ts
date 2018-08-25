import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputSwitch } from './inputswitch';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('InputSwitch', () => {
  
    let inputswitch: InputSwitch;
    let fixture: ComponentFixture<InputSwitch>;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule
        ],
        declarations: [
          InputSwitch
        ]
      });
      
      fixture = TestBed.createComponent(InputSwitch);
      inputswitch = fixture.componentInstance;
    });

    it('should created by default', () => {
      fixture.detectChanges();

      const inputSwitchEl = fixture.debugElement.query(By.css('div')).nativeElement;
      expect(inputSwitchEl).toBeTruthy();
    });

    it('should be disabled', () => {
      inputswitch.disabled = true;
      fixture.detectChanges();

      const updateModelSpy = spyOn(inputswitch, 'updateModel').and.callThrough();
      const inputSwitchEl = fixture.debugElement.query(By.css('div')).nativeElement;
      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      inputSwitchEl.click();
      fixture.detectChanges();

      expect(inputSwitchEl.className).toContain('ui-state-disabled');
      expect(inputEl.disabled).toEqual(true);
      expect(updateModelSpy).not.toHaveBeenCalled();
    });

    it('should be change style and styleClass', () => {
      inputswitch.style = {'primeng' : 'rocks!'};
      inputswitch.styleClass = "Primeng ROCKS!";
      fixture.detectChanges();

      const inputSwitchEl = fixture.debugElement.query(By.css('div')).nativeElement;
      expect(inputSwitchEl.className).toContain("Primeng ROCKS!");
      expect(inputSwitchEl.style.primeng).toContain("rocks!")
    });

    it('should be get a name inputId and tabindex', () => {
      inputswitch.tabindex = 5;
      inputswitch.inputId = "Primeng!";
      inputswitch.name = "Primeng ROCKS!";
      fixture.detectChanges();

      const inputSwitchEl = fixture.debugElement.query(By.css('input')).nativeElement;
      expect(inputSwitchEl.tabIndex).toEqual(5);
      expect(inputSwitchEl.name).toEqual("Primeng ROCKS!");
      expect(inputSwitchEl.id).toEqual("Primeng!");
    });

    it('should be checked when click', () => {
      fixture.detectChanges();

      const toggleSpy = spyOn(inputswitch, 'toggle').and.callThrough();
      const inputSwitchEl = fixture.debugElement.query(By.css('div')).nativeElement;
      inputSwitchEl.click();
      fixture.detectChanges();

      expect(inputswitch.checked).toEqual(true);
      expect(toggleSpy).toHaveBeenCalled();
    });

    it('should be listen event emitter', () => {
      fixture.detectChanges();

      let data;
      inputswitch.onChange.subscribe(value => data = value);
      const inputSwitchEl = fixture.debugElement.query(By.css('div')).nativeElement;
      inputSwitchEl.click();
      fixture.detectChanges();

      expect(data.checked).toEqual(true);
      inputSwitchEl.click();
      expect(data.checked).toEqual(false);
    });
    
  });
