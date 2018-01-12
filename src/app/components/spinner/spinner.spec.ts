import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Spinner } from './spinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Spinner', () => {
  
  let spinner: Spinner;
  let fixture: ComponentFixture<Spinner>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Spinner
      ]
    });
    
    fixture = TestBed.createComponent(Spinner);
    spinner = fixture.componentInstance;
  });
  
  const triggerEvent = (el, type) => {
    const e = document.createEvent('HTMLEvents');
    e.initEvent(type, false, true);
    el.dispatchEvent(e);
  };

  it('Should display the spinner value 3', () => {
    fixture.detectChanges();
    const spinnerUp = fixture.nativeElement.querySelector('.ui-spinner-up');
    triggerEvent(spinnerUp, 'mousedown');
    fixture.detectChanges();
    triggerEvent(spinnerUp, 'mousedown');
    fixture.detectChanges();
    triggerEvent(spinnerUp, 'mousedown');
    fixture.detectChanges();

     expect(spinner.valueAsString).toEqual('3');
  });

  it('Should display the spinner value -3', () => {
    fixture.detectChanges();
    const spinnerDown = fixture.nativeElement.querySelector('.ui-spinner-down');
    triggerEvent(spinnerDown, 'mousedown');
    fixture.detectChanges();
    triggerEvent(spinnerDown, 'mousedown');
    fixture.detectChanges();
    triggerEvent(spinnerDown, 'mousedown');
    fixture.detectChanges();

     expect(spinner.valueAsString).toEqual('-3');
  });
  
  it('Should display the spinner value 0.75  ', () => {
    spinner.step = 0.25;
    fixture.detectChanges();

    const spinnerUp = fixture.nativeElement.querySelector('.ui-spinner-up');
    triggerEvent(spinnerUp, 'mousedown');
    fixture.detectChanges();
    triggerEvent(spinnerUp, 'mousedown');
    fixture.detectChanges();
    triggerEvent(spinnerUp, 'mousedown');
    fixture.detectChanges();
    expect(spinner.valueAsString).toEqual('0.75');
  });
  it('Should display the spinner value -0.75', () => {
    spinner.step = 0.25;
    fixture.detectChanges();

    const spinnerDown = fixture.nativeElement.querySelector('.ui-spinner-down');
    triggerEvent(spinnerDown, 'mousedown');
    fixture.detectChanges();
    triggerEvent(spinnerDown, 'mousedown');
    fixture.detectChanges();
    triggerEvent(spinnerDown, 'mousedown');
    fixture.detectChanges();

     expect(spinner.valueAsString).toEqual('-0.75');
  });
});
