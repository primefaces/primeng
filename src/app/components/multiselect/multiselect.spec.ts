import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MultiSelect, MultiSelectItem } from './multiselect';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';

describe('MultiSelect', () => {
  
    let multiselect: MultiSelect;
    let fixture: ComponentFixture<MultiSelect>;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule,
          ScrollingModule
        ],
        declarations: [
          MultiSelect,
          MultiSelectItem
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

	it('should select item', () => {
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

		const multiselectItemEl = fixture.debugElement.queryAll(By.css('.ui-multiselect-item'));
		expect(multiselectItemEl.length).toEqual(10);
		const bmwEl = multiselectItemEl[1];
		const onOptionClickSpy = spyOn(multiselect,'onOptionClick').and.callThrough();
		bmwEl.nativeElement.click();
		fixture.detectChanges();

		expect(multiselect.value[0]).toEqual('BMW');
		expect(bmwEl.nativeElement.className).toContain('ui-state-highlight');
		expect(onOptionClickSpy).toBeTruthy();
	});

	it('should unselect item', () => {
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
		multiselect.selectionLimit = 3;
		multiselect.value = [];
		fixture.detectChanges();

		const multiselectEl = fixture.debugElement.children[0].nativeElement;
		multiselectEl.click();
		fixture.detectChanges();

		const multiselectItemEl = fixture.debugElement.queryAll(By.css('.ui-multiselect-item'));
		expect(multiselectItemEl.length).toEqual(10);
		const audiEl = multiselectItemEl[0];
		const bmwEl = multiselectItemEl[1];
		const onOptionClickSpy = spyOn(multiselect,'onOptionClick').and.callThrough();
		bmwEl.nativeElement.click();
		audiEl.nativeElement.click();
		fixture.detectChanges();

		expect(multiselect.value[0]).toEqual('BMW');
		expect(multiselect.value[1]).toEqual('Audi');
		expect(multiselect.value.length).toEqual(2);
		expect(bmwEl.nativeElement.className).toContain('ui-state-highlight');
		expect(onOptionClickSpy).toBeTruthy();
		audiEl.nativeElement.click();
		fixture.detectChanges();

		expect(multiselect.value.length).toEqual(1);
	});

	it('should not select disabled item', () => {
		multiselect.options = [
		{label: 'Audi', value: 'Audi'},
		{label: 'BMW', value: 'BMW',disabled:true},
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

		const multiselectItemEl = fixture.debugElement.queryAll(By.css('.ui-multiselect-item'));
		expect(multiselectItemEl.length).toEqual(10);
		const bmwEl = multiselectItemEl[1];
		const audiEl = multiselectItemEl[0];
		const onOptionClickSpy = spyOn(multiselect,'onOptionClick').and.callThrough();
		bmwEl.nativeElement.click();
		fixture.detectChanges();

		audiEl.nativeElement.click();
		fixture.detectChanges();

		expect(multiselect.value[0]).not.toEqual('BMW');
		expect(bmwEl.nativeElement.className).not.toContain('ui-state-highlight');
		expect(onOptionClickSpy).toBeTruthy();
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

		const multiselectItemEl = fixture.debugElement.queryAll(By.css('.ui-multiselect-item'));
		expect(multiselectItemEl.length).toEqual(10);
		const bmwEl = multiselectItemEl[1];
		const fordEl = multiselectItemEl[3];
		const onOptionClickSpy = spyOn(multiselect,'onOptionClick').and.callThrough();
		bmwEl.nativeElement.click();
		fordEl.nativeElement.click();
		fixture.detectChanges();

		expect(multiselect.value[0]).toEqual('BMW');
		expect(multiselect.value[1]).toEqual('Ford');
		expect(fordEl.nativeElement.className).toContain('ui-state-highlight');
		expect(bmwEl.nativeElement.className).toContain('ui-state-highlight');
		expect(onOptionClickSpy).toHaveBeenCalledTimes(2);
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
		const onOptionClickSpy = spyOn(multiselect,'onOptionClick').and.callThrough();
		fixture.detectChanges();

		multiselectEl.click();
		fixture.detectChanges();

		const multiselectItemEl = fixture.debugElement.queryAll(By.css('.ui-multiselect-item'));
		expect(multiselectItemEl.length).toEqual(10);
		const bmwEl = multiselectItemEl[1];
		const fordEl = multiselectItemEl[3];
		const fiatEl = multiselectItemEl[2];
		bmwEl.nativeElement.click();
		fordEl.nativeElement.click();
		fiatEl.nativeElement.click();
		fixture.detectChanges();
		
		expect(multiselect.value[0]).toEqual('BMW');
		expect(multiselect.value[1]).toEqual('Ford');
		expect(fordEl.nativeElement.className).toContain('ui-state-highlight');
		expect(bmwEl.nativeElement.className).toContain('ui-state-highlight');
		expect(fiatEl.nativeElement.className).not.toContain('ui-state-highlight');
		expect(onOptionClickSpy).toHaveBeenCalledTimes(3);
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
		const onHeaderCheckboxFocusSpy = spyOn(multiselect,'onHeaderCheckboxFocus').and.callThrough();
		const onHeaderCheckboxBlurSpy = spyOn(multiselect,'onHeaderCheckboxBlur').and.callThrough();
		multiselectEl.click();
		fixture.detectChanges();

		const allCheckedEl = fixture.debugElement.query(By.css('.ui-chkbox-box')).nativeElement;
		const readOnlyEl = fixture.debugElement.query(By.css(".ui-chkbox")).children[0].children[0].nativeElement;
		readOnlyEl.dispatchEvent(new Event('focus'));
		allCheckedEl.click();
		fixture.detectChanges();
		
		expect(multiselect.value.length).toEqual(10);
		expect(itemClickSpy).toHaveBeenCalled();
		readOnlyEl.dispatchEvent(new Event('blur'));
		fixture.detectChanges();

		expect(onHeaderCheckboxFocusSpy).toHaveBeenCalled();
		expect(onHeaderCheckboxBlurSpy).toHaveBeenCalled();
	});

	it('should select all when filtered', () => {
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
		const onInputFocusSpy = spyOn(multiselect,"onInputFocus").and.callThrough();
		const onInputBlur = spyOn(multiselect,"onInputBlur").and.callThrough();
		const multiselectEl = fixture.debugElement.children[0].nativeElement;
		const readOnlyEl = fixture.debugElement.query(By.css("input")).nativeElement;
		readOnlyEl.dispatchEvent(new Event('focus'));
		multiselectEl.click();
		fixture.detectChanges();

		readOnlyEl.dispatchEvent(new Event('blur'));
		const filterInputEl = fixture.debugElement.query(By.css('.ui-inputtext')).nativeElement;
		filterInputEl.value = "v";
		filterInputEl.dispatchEvent(new Event('input'));
		fixture.detectChanges();

		const allCheckedEl = fixture.debugElement.query(By.css('.ui-chkbox-box')).nativeElement;
		allCheckedEl.click();
		fixture.detectChanges();
		
		expect(multiselect.value.length).toEqual(2);
		expect(onInputFocusSpy).toHaveBeenCalled();
		expect(onInputBlur).toHaveBeenCalled();
	});

	it('should unselect all', () => {
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
		const toggleSpy = spyOn(multiselect,'isAllChecked').and.callThrough();
		multiselectEl.click();
		fixture.detectChanges();

		const allCheckedEl = fixture.debugElement.query(By.css('.ui-chkbox-box')).nativeElement;
		allCheckedEl.click();
		fixture.detectChanges();

		expect(multiselect.value.length).toEqual(10);
		expect(toggleSpy).toHaveBeenCalled();
		allCheckedEl.click();
		fixture.detectChanges();

		expect(multiselect.value.length).toEqual(0);

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

	it('should close with close icon and reset filter input', () => {
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
		multiselect.resetFilterOnHide = true;
		const multiselectEl = fixture.debugElement.children[0].nativeElement;
		multiselectEl.click();
		fixture.detectChanges();

		const filterInputEl = fixture.debugElement.query(By.css('.ui-inputtext')).nativeElement;
		filterInputEl.value = "f";
		filterInputEl.dispatchEvent(new Event('input'));
		fixture.detectChanges();

		expect(multiselect.visibleOptions.length).toEqual(2);
		const closeEl = fixture.debugElement.query(By.css(".ui-multiselect-close"));
		closeEl.nativeElement.click();
		fixture.detectChanges();

		expect(fixture.debugElement.query(By.css("div")).nativeElement.className).not.toContain("ui-multiselect-open");
	});
});
