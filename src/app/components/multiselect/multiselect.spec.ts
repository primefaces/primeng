import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MultiSelect } from './multiselect';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MultiSelect', () => {
  
    let multiselect: MultiSelect;
    let fixture: ComponentFixture<MultiSelect>;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule
        ],
        declarations: [
          MultiSelect
        ]
      });
      
      fixture = TestBed.createComponent(MultiSelect);
      multiselect = fixture.componentInstance;
    });

    it('should disabled', () => {
      multiselect.disabled = true;
      const showSpy = spyOn(multiselect, 'onMouseclick').and.callThrough();
      fixture.detectChanges();

      const containerEl = fixture.debugElement.query(By.css('div')).nativeElement;
      const inputReadOnlyEl = fixture.debugElement.query(By.css('div')).nativeElement;
      containerEl.click();
      fixture.detectChanges();
      
      expect(showSpy).toHaveBeenCalled();
      expect(containerEl.className).toContain('ui-state-disabled');
      expect(inputReadOnlyEl.className).toContain('ui-state-disabled');
      expect(multiselect.overlayVisible).toEqual(undefined);
    });

    it('should get a name', () => {
      multiselect.name = "PrimeNG";
      fixture.detectChanges();

      const inputReadOnlyEl = fixture.debugElement.query(By.css('.ui-helper-hidden-accessible')).children[0].nativeElement;
      expect(inputReadOnlyEl.name).toContain("PrimeNG");
    });

    it('should set dropdown icon by default and able to change', () => {
      fixture.detectChanges();

      const dropdownIcon = fixture.debugElement.query(By.css('.ui-multiselect-trigger-icon')).nativeElement;
      expect(dropdownIcon.className).toContain('pi pi-caret-down');
      fixture.detectChanges();

      multiselect.dropdownIcon = "Primeng Rocks!";
      fixture.detectChanges();
      
      expect(dropdownIcon.className).toContain("Primeng Rocks!");
    });

    it('should change style and styleClass', () => {
      fixture.detectChanges();

      multiselect.style = {'primeng':'rocks'};
      multiselect.styleClass = "Primeng ROCKS!";
      fixture.detectChanges();
      
      const multiselectEl = fixture.debugElement.children[0].nativeElement;
      expect(multiselectEl.className).toContain('Primeng ROCKS!');
      expect(multiselectEl.style.primeng).toContain('rocks');
    });

    it('should change panelstyle and panelStyleClass', () => {
      fixture.detectChanges();

      multiselect.panelStyle = {'primeng':'rocks'};
      multiselect.panelStyleClass = "Primeng ROCKS!";
      multiselect.overlayVisible=true;
      fixture.detectChanges();
      
      const multiselectPanelEl = fixture.debugElement.query(By.css('.ui-multiselect-panel ')).nativeElement;
      expect(multiselectPanelEl.className).toContain('Primeng ROCKS!');
      expect(multiselectPanelEl.style.primeng).toContain('rocks');
    });

    it('should open when click', () => {
      const multiselectEl = fixture.debugElement.children[0].nativeElement;
      const clickSpy = spyOn(multiselect, 'onMouseclick').and.callThrough();
      multiselectEl.click();
      fixture.detectChanges();

      const multiselectPanelEl = fixture.debugElement.query(By.css('.ui-multiselect-panel'));
      expect(multiselectEl.className).toContain('ui-multiselect-open');
      expect(multiselect.overlayVisible).toEqual(true);
      expect(multiselectPanelEl).toBeTruthy();
      expect(clickSpy).toHaveBeenCalled();
    });

    it('should close when double click', () => {
      const multiselectEl = fixture.debugElement.children[0].nativeElement;
      const clickSpy = spyOn(multiselect, 'onMouseclick').and.callThrough();
      const hideSpy = spyOn(multiselect, 'hide').and.callThrough();
      multiselectEl.click();
      multiselectEl.click();
      fixture.detectChanges();

      const multiselectPanelEl = fixture.debugElement.query(By.css('.ui-multiselect-panel'));
      expect(multiselectEl.className).not.toContain('ui-multiselect-open');
      expect(multiselect.overlayVisible).toEqual(false);
      expect(multiselectPanelEl).toBeFalsy();
      expect(clickSpy).toHaveBeenCalled();
      expect(hideSpy).toHaveBeenCalled();
    });
    it('should item selected', () => {
      multiselect.options = [
        {label: 'Audi', value: 'Audi'},
        {label: 'BMW', value: 'BMW'},
        {label: 'Fiat', value: 'Fiat'},
        {label: 'Ford', value: 'Ford'},
        {label: 'Honda', value: 'Honda'},
        {label: 'Jaguar', value: 'Jaguar'},
        {label: 'Mercedes', value: 'Mercedes'},
        {label: 'Renault', value: 'Renault'},
        {label: 'VW', value: 'VW'},
        {label: 'Volvo', value: 'Volvo'}
    ];
      const multiselectEl = fixture.debugElement.children[0].nativeElement;
      multiselectEl.click();
      fixture.detectChanges();

      const multiselectItemEl = fixture.debugElement.query(By.css('.ui-multiselect-items')).nativeElement;
      expect(multiselectItemEl.children.length).toEqual(10);
      const bmwEl = multiselectItemEl.children[1];
      const itemClickSpy = spyOn(multiselect,'onItemClick').and.callThrough();
      bmwEl.click();
      fixture.detectChanges();
      expect(multiselect.value[0]).toEqual('BMW');
      expect(bmwEl.className).toContain('ui-state-highlight');
      expect(itemClickSpy).toBeTruthy();
    });

    it('should select multiple', () => {
      multiselect.options = [
        {label: 'Audi', value: 'Audi'},
        {label: 'BMW', value: 'BMW'},
        {label: 'Fiat', value: 'Fiat'},
        {label: 'Ford', value: 'Ford'},
        {label: 'Honda', value: 'Honda'},
        {label: 'Jaguar', value: 'Jaguar'},
        {label: 'Mercedes', value: 'Mercedes'},
        {label: 'Renault', value: 'Renault'},
        {label: 'VW', value: 'VW'},
        {label: 'Volvo', value: 'Volvo'}
    ];
      const multiselectEl = fixture.debugElement.children[0].nativeElement;
      multiselectEl.click();
      fixture.detectChanges();

      const multiselectItemEl = fixture.debugElement.query(By.css('.ui-multiselect-items')).nativeElement;
      expect(multiselectItemEl.children.length).toEqual(10);
      const bmwEl = multiselectItemEl.children[1];
      const fordEl = multiselectItemEl.children[3];
      const itemClickSpy = spyOn(multiselect,'onItemClick').and.callThrough();
      bmwEl.click();
      fordEl.click();
      fixture.detectChanges();
      expect(multiselect.value[0]).toEqual('BMW');
      expect(multiselect.value[1]).toEqual('Ford');
      expect(fordEl.className).toContain('ui-state-highlight');
      expect(bmwEl.className).toContain('ui-state-highlight');
      expect(itemClickSpy).toHaveBeenCalledTimes(2);
    });

    it('should select multiple with selection limit', () => {
      multiselect.options = [
        {label: 'Audi', value: 'Audi'},
        {label: 'BMW', value: 'BMW'},
        {label: 'Fiat', value: 'Fiat'},
        {label: 'Ford', value: 'Ford'},
        {label: 'Honda', value: 'Honda'},
        {label: 'Jaguar', value: 'Jaguar'},
        {label: 'Mercedes', value: 'Mercedes'},
        {label: 'Renault', value: 'Renault'},
        {label: 'VW', value: 'VW'},
        {label: 'Volvo', value: 'Volvo'}
      ];
      multiselect.value = [];
      multiselect.selectionLimit = 2;
      const multiselectEl = fixture.debugElement.children[0].nativeElement;
      const itemClickSpy = spyOn(multiselect,'onItemClick').and.callThrough();
      fixture.detectChanges();

      multiselectEl.click();
      fixture.detectChanges();

      const multiselectItemEl = fixture.debugElement.query(By.css('.ui-multiselect-items')).nativeElement;
      expect(multiselectItemEl.children.length).toEqual(10);
      const bmwEl = multiselectItemEl.children[1];
      const fordEl = multiselectItemEl.children[3];
      const fiatEl = multiselectItemEl.children[2];
      bmwEl.click();
      fordEl.click();
      fiatEl.click();
      fixture.detectChanges();
      
      expect(multiselect.value[0]).toEqual('BMW');
      expect(multiselect.value[1]).toEqual('Ford');
      expect(fordEl.className).toContain('ui-state-highlight');
      expect(bmwEl.className).toContain('ui-state-highlight');
      expect(fiatEl.className).not.toContain('ui-state-highlight');
      expect(itemClickSpy).toHaveBeenCalledTimes(3);
    });

    it('should select all', () => {
      multiselect.options = [
        {label: 'Audi', value: 'Audi'},
        {label: 'BMW', value: 'BMW'},
        {label: 'Fiat', value: 'Fiat'},
        {label: 'Ford', value: 'Ford'},
        {label: 'Honda', value: 'Honda'},
        {label: 'Jaguar', value: 'Jaguar'},
        {label: 'Mercedes', value: 'Mercedes'},
        {label: 'Renault', value: 'Renault'},
        {label: 'VW', value: 'VW'},
        {label: 'Volvo', value: 'Volvo'}
      ];
      const multiselectEl = fixture.debugElement.children[0].nativeElement;
      const itemClickSpy = spyOn(multiselect,'isAllChecked').and.callThrough();
      multiselectEl.click();
      fixture.detectChanges();

      const allCheckedEl = fixture.debugElement.query(By.css('.ui-chkbox-box')).nativeElement;
      allCheckedEl.click();
      fixture.detectChanges();
      
      expect(multiselect.value.length).toEqual(10);
      expect(itemClickSpy).toHaveBeenCalled();
    });

    it('should filtered', () => {
      multiselect.options = [
        {label: 'Audi', value: 'Audi'},
        {label: 'BMW', value: 'BMW'},
        {label: 'Fiat', value: 'Fiat'},
        {label: 'Ford', value: 'Ford'},
        {label: 'Honda', value: 'Honda'},
        {label: 'Jaguar', value: 'Jaguar'},
        {label: 'Mercedes', value: 'Mercedes'},
        {label: 'Renault', value: 'Renault'},
        {label: 'VW', value: 'VW'},
        {label: 'Volvo', value: 'Volvo'}
      ];
      const multiselectEl = fixture.debugElement.children[0].nativeElement;
      multiselectEl.click();
      fixture.detectChanges();

      const filterInputEl = fixture.debugElement.query(By.css('.ui-inputtext')).nativeElement;
      filterInputEl.value = "f";
      filterInputEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(multiselect.visibleOptions.length).toEqual(2);
    });

    it('should detect changes of defaultLabel', () => {
        multiselect.defaultLabel = 'Initial Value';
        fixture.detectChanges();
        expect(multiselect.valuesAsString).toBe(multiselect.defaultLabel);

        multiselect.defaultLabel = 'Second Value';
        fixture.detectChanges();
        expect(multiselect.valuesAsString).toBe(multiselect.defaultLabel);
      });
});
