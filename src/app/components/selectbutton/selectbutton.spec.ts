import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SelectButton } from './selectbutton';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleChange } from '@angular/core';

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
		selectButton.ngOnChanges({
			options: new SimpleChange(null, [{ label: 'Apartment', value: 'Apartment' }, { label: 'House', value: 'House' }, { label: 'Studio', value: 'Studio' }], false)
		});
		fixture.detectChanges();

		selectButton.cd.detectChanges();
		const labelEl = fixture.debugElement.query(By.css('.p-selectbutton')).children[0];
		expect(labelEl.nativeElement.querySelector('.p-button-label').textContent).toContain('Apartment')
	});

	it('should display the preselected button', () => {
		selectButton.ngOnChanges({
			options: new SimpleChange(null, [{ label: 'Apartment', value: { name: 'Apartment' } }, { label: 'House', value: { name: 'House' } }, { label: 'Studio', value: { name: 'Studio' } }], false)
		});
		selectButton.dataKey = 'name';
		selectButton.writeValue({ name: 'Studio' });
		fixture.detectChanges();

		selectButton.cd.detectChanges();
		const active = fixture.nativeElement.querySelector('.p-highlight').children[0];
		expect(active.textContent).toContain('Studio');
	});

	it('should display the active when click', fakeAsync(() => {
		selectButton.ngOnChanges({
			options: new SimpleChange(null, [{ label: 'Apartment', value: 'Apartment' }, { label: 'House', value: 'House' }, { label: 'Studio', value: 'Studio' }], false)
		});
		fixture.detectChanges();

		const activeEl = fixture.nativeElement.querySelector('.p-selectbutton').children[0];
		activeEl.click();
		fixture.detectChanges();

		const active = fixture.nativeElement.querySelector('.p-highlight').children[0];
		expect(active.textContent).toContain('Apartment');
	}));

	it('should disabled', () => {
		selectButton.disabled = true;
		selectButton.ngOnChanges({
			options: new SimpleChange(null, [{ label: 'Apartment', value: { name: 'Apartment' } }, { label: 'House', value: { name: 'House' } }, { label: 'Studio', value: { name: 'Studio' } }], false)
		});
		fixture.detectChanges();

		const onItemClickSpy = spyOn(selectButton, 'onItemClick').and.callThrough();
		const buttonEls = fixture.debugElement.queryAll(By.css('.p-button'));
		expect(buttonEls.length).toEqual(3);
		buttonEls[1].nativeElement.click();
		fixture.detectChanges();

		expect(onItemClickSpy).toHaveBeenCalled();
		expect(selectButton.value).toEqual(undefined);
	});

	it('should select multiple', () => {
		selectButton.multiple = true;
		selectButton.ngOnChanges({
			options: new SimpleChange(null, [{ label: 'Apartment', value: { name: 'Apartment' } }, { label: 'House', value: { name: 'House' } }, { label: 'Studio', value: { name: 'Studio' } }], false)
		});
		fixture.detectChanges();

		let valueOptionClick;
		let valueChange;
		selectButton.onOptionClick.subscribe(data => valueOptionClick = data);
		selectButton.onChange.subscribe(data => valueChange = data);
		const onItemClickSpy = spyOn(selectButton, 'onItemClick').and.callThrough();
		const buttonEls = fixture.debugElement.queryAll(By.css('.p-button'));
		expect(buttonEls.length).toEqual(3);
		buttonEls[0].nativeElement.click();
		buttonEls[1].nativeElement.click();
		buttonEls[2].nativeElement.click();
		fixture.detectChanges();

		buttonEls[2].nativeElement.click();
		fixture.detectChanges();

		expect(onItemClickSpy).toHaveBeenCalled();
		expect(selectButton.value.length).toEqual(2);
		expect(valueOptionClick.option).toBeTruthy();
		expect(valueChange.value).toBeTruthy();
	});
});
