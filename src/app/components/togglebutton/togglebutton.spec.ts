import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToggleButton } from './togglebutton';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ToggleButton', () => {
  
  let toggleButton: ToggleButton;
  let fixture: ComponentFixture<ToggleButton>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        ToggleButton
      ]
    });
    
    fixture = TestBed.createComponent(ToggleButton);
    toggleButton = fixture.componentInstance;
  });
  
  it('should display the OFF label', () => {
    toggleButton.offLabel = 'PrimeNG ToggleButton = NO';
    fixture.detectChanges();
    const labelEl = fixture.debugElement.query(By.css('.ui-button-text'));
    expect(labelEl.nativeElement.textContent).toContain('PrimeNG ToggleButton = NO')
  });
  
  it('should display the ON label when clicked', () => {
    toggleButton.offLabel = 'PrimeNG ToggleButton = YES';
    fixture.detectChanges();
    const clickEl = fixture.nativeElement.querySelector('.ui-togglebutton')
    
    clickEl.click();
    
    const labelEl = fixture.debugElement.query(By.css('.ui-button-text'));
    expect(labelEl.nativeElement.textContent).toContain('PrimeNG ToggleButton = YES')
  });
});
