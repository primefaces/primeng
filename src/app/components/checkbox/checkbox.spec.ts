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
  it('Should display the default checked ', () => {
    checkbox.checked = true;
    const checkboxChecked = fixture.nativeElement.querySelector('.ui-state-active');
    expect(checkbox.checked).toBe(true);
    fixture.detectChanges();
    });
});
