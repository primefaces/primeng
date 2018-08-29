import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Slider } from './slider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Slider', () => {
  
    let slider: Slider;
    let fixture: ComponentFixture<Slider>;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule
        ],
        declarations: [
          Slider
        ]
      });
      
      fixture = TestBed.createComponent(Slider);
      slider = fixture.componentInstance;
    });

    it('should created by default', () => {
      fixture.detectChanges();

      const sliderEl = fixture.debugElement.query(By.css('div')).nativeElement;
      expect(sliderEl).toBeTruthy();
    });

    it('should disable', () => {
      slider.disabled = true;
      fixture.detectChanges();

      const sliderEl = fixture.debugElement.query(By.css('div')).nativeElement;
      const clickSpy = spyOn(slider, 'updateDomData').and.callThrough();
      sliderEl.click();
      expect(sliderEl.className).toContain('ui-state-disabled');
      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('should animate', () => {
      slider.animate = true;
      fixture.detectChanges();

      const sliderEl = fixture.debugElement.query(By.css('div')).nativeElement;
      sliderEl.click();
      expect(sliderEl.className).toContain('ui-slider-animate');
    });

    it('should change styles', () => {
      slider.style = {'primeng':'rocks!'};
      slider.styleClass = "Primeng ROCKS!";
      fixture.detectChanges();

      const sliderEl = fixture.debugElement.query(By.css('div')).nativeElement;
      expect(sliderEl.className).toContain("Primeng ROCKS!");
      expect(sliderEl.style.primeng).toEqual("rocks!");
    });

    it('should change orientation', () => {
      slider.orientation = "vertical"
      fixture.detectChanges();

      const sliderEl = fixture.debugElement.query(By.css('div')).nativeElement;
      expect(sliderEl.className).toContain("ui-slider-vertical");
    });

    it('should have a range', () => {
      slider.range = true;
      fixture.detectChanges();

      const sliderEl = fixture.debugElement.query(By.css('div')).nativeElement;
      expect(sliderEl.children.length).toEqual(3);
    });

    it('should set min', () => {
      slider.min = 20;
      fixture.detectChanges();

      slider.updateValue(19);
      fixture.detectChanges();

      const spanEl = fixture.debugElement.query(By.css('span')).nativeElement;
      expect(slider.handleValue).toEqual(0);
      expect(spanEl.style.width).toEqual('0%');
    });

    it('should set max', () => {
      slider.max = 90;
      fixture.detectChanges();

      slider.updateValue(91);
      fixture.detectChanges();

      const spanEl = fixture.debugElement.query(By.css('span')).nativeElement;
      expect(slider.handleValue).toEqual(100);
      expect(spanEl.style.width).toEqual('100%');
    });

    it('should listen onChange', () => {
      let value = 1;
      slider.onChange.subscribe(data => value = data.value);
      slider.updateValue(91);
      fixture.detectChanges();
      
      expect(value).toEqual(91)
    });


});
