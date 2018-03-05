import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SelectButton } from './selectbutton';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SelectButton', () => {
  
  let selectButton: SelectButton;
  let fixture: ComponentFixture<SelectButton>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        SelectButton
      ]
    });
    
    fixture = TestBed.createComponent(SelectButton);
    selectButton = fixture.componentInstance;
  });
  
  it('should display the label', () => {
    selectButton.options = [{label: 'Apartment', value: 'Apartment'},{label: 'House', value: 'House'},{label: 'Studio', value: 'Studio'}];
    fixture.detectChanges();
    const labelEl = fixture.debugElement.query(By.css('.ui-selectbutton')).children[0];
    expect(labelEl.nativeElement.querySelector('.ui-button-text').textContent).toContain('Apartment')
  });
  
  it('should display the preselected button', () => {

    selectButton.options = [{label: 'Apartment', value: {name:'Apartment'}},{label: 'House', value: {name:'House'}},{label: 'Studio', value: {name:'Studio'}}];
    selectButton.dataKey = 'name';
    selectButton.writeValue({name:'Studio'});
    fixture.detectChanges();
   
    const active = fixture.nativeElement.querySelector('.ui-state-active').children[0];
    expect(active.textContent).toContain('Studio');
  });

  it('should display the active when click', fakeAsync(() => {
    selectButton.options = [{label: 'Apartment', value: 'Apartment'},{label: 'House', value: 'House'},{label: 'Studio', value: 'Studio'}];
    fixture.detectChanges();
  
    const activeEl = fixture.nativeElement.querySelector('.ui-selectbutton').children[0];
    activeEl.click();
  
    fixture.detectChanges();
    
    const active = fixture.nativeElement.querySelector('.ui-state-active').children[0];
    expect(active.textContent).toContain('Apartment');
  }));
});
