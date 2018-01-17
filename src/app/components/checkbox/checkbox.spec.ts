import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Checkbox } from './checkbox';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Checkbox', () => {
  
  let checkbox: Checkbox;
  let fixture: ComponentFixture<Checkbox>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Checkbox
      ]
    });
    
    fixture = TestBed.createComponent(Checkbox);
    checkbox = fixture.componentInstance;
  });
  it('Should display the fa-check', () => {
     
    const checkFa = fixture.nativeElement.querySelector('.ui-chkbox-icon');
    checkFa.click();
    fixture.detectChanges();
   });
});
