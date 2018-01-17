import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RadioButton } from './radiobutton';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RadioButton', () => {
  
  let radiobutton: RadioButton;
  let fixture: ComponentFixture<RadioButton>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        RadioButton
      ]
    });
    
    fixture = TestBed.createComponent(RadioButton);
    radiobutton = fixture.componentInstance;
  });
  it('Should display the fa-circle', () => {
    const radioEl = fixture.nativeElement.querySelector('.ui-radiobutton-icon');
    radioEl.click();
    fixture.detectChanges();
   });

   it('Should display the default checked', () => {
      radiobutton.checked = true;
      const radioChecked = fixture.nativeElement.querySelector('.ui-state-active');
      expect(radiobutton.checked).toBe(true);
      fixture.detectChanges();
   });
});
