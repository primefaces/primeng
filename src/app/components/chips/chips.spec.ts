import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Chips } from './chips';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Chips', () => {

	let chips: Chips;
	let fixture: ComponentFixture<Chips>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NoopAnimationsModule
			],
			declarations: [
				Chips
			]
		});

		fixture = TestBed.createComponent(Chips);
		chips = fixture.componentInstance;
	});

	it('should display by default', () => {
		fixture.detectChanges();

		const chipsEl = fixture.debugElement.query(By.css('div'));
		expect(chipsEl.nativeElement).toBeTruthy();
	});

	it('should change style and styleClass', () => {
		chips.style = { 'height': '300px' };
		chips.styleClass = "Primeng ROCKS!";
		fixture.detectChanges();

		const chipsEl = fixture.debugElement.query(By.css('div'));
		expect(chipsEl.nativeElement.className).toContain("Primeng ROCKS!");
		expect(chipsEl.nativeElement.style.height).toEqual('300px');
	});

	it('should change inputStyle inputStyleClass inputId placeholder and tabIndex', () => {
		chips.inputStyle = { 'height': '300px' };
		chips.inputStyleClass = "Primeng ROCKS!";
		chips.inputId = "primeng";
		chips.tabindex = 13;
		chips.placeholder = "rocks!";
		fixture.detectChanges();

		const inputEl = fixture.debugElement.query(By.css('input'));
		expect(inputEl.nativeElement.className).toContain("Primeng ROCKS!");
		expect(inputEl.nativeElement.style.height).toEqual('300px');
		expect(inputEl.nativeElement.id).toEqual('primeng');
		expect(inputEl.nativeElement.tabIndex).toEqual(13);
		expect(inputEl.nativeElement.placeholder).toEqual('rocks!');
	});

	it('should disabled', () => {
		chips.disabled = true;
		fixture.detectChanges();

		const listEl = fixture.debugElement.query(By.css('ul'));
		const inputEl = fixture.debugElement.query(By.css('input'));
		const tokenIconEl = fixture.debugElement.query(By.css('.p-chips-token-icon'));
		expect(listEl.nativeElement.className).toContain("p-disabled");
		expect(tokenIconEl).toBeFalsy();
		expect(inputEl.nativeElement.disabled).toEqual(true);
	});

	it('should call onInputFocus and onInputBlur', () => {
		chips.placeholder = "rocks!";
		fixture.detectChanges();

		chips.cd.detectChanges();
		let focusData;
		let blurData;
		chips.onFocus.subscribe(value => focusData = value);
		chips.onBlur.subscribe(value => blurData = value);
		const onInputFocusSpy = spyOn(chips, 'onInputFocus').and.callThrough();
		const onInputBlurSpy = spyOn(chips, 'onInputBlur').and.callThrough();
		const inputEl = fixture.debugElement.query(By.css('input'));
		inputEl.nativeElement.dispatchEvent(new Event('focus'));
		fixture.detectChanges();

		expect(onInputFocusSpy).toHaveBeenCalled();
		expect(chips.focus).toEqual(true);
		expect(focusData).toBeTruthy();
		inputEl.nativeElement.dispatchEvent(new Event('blur'));
		fixture.detectChanges();

		expect(onInputBlurSpy).toHaveBeenCalled();
		expect(chips.focus).toEqual(false);
		expect(blurData).toBeTruthy();
	});

	it('should add item and change placeholder "rocks!" to null', () => {
		chips.placeholder = "rocks!";
		fixture.detectChanges();

		let data;
		chips.onAdd.subscribe(value => data = value);
		const addItemSpy = spyOn(chips, 'addItem').and.callThrough();
		const onKeydownSpy = spyOn(chips, 'onKeydown').and.callThrough();
		const updateMaxedOutSpy = spyOn(chips, 'updateMaxedOut').and.callThrough();
		const inputEl = fixture.debugElement.query(By.css('input'));
		inputEl.nativeElement.value = "primeng";
		fixture.detectChanges();

		let event = { 'which': 13, preventDefault() { } }
		chips.onKeydown(event as KeyboardEvent);
		fixture.detectChanges();

		chips.cd.detectChanges();
		expect(addItemSpy).toHaveBeenCalled();
		expect(data).toBeTruthy();
		expect(onKeydownSpy).toHaveBeenCalled();
		expect(updateMaxedOutSpy).toHaveBeenCalled();
		expect(chips.value.length).toEqual(1);
		expect(chips.value[0]).toEqual("primeng");
		expect(inputEl.nativeElement.placeholder).toEqual('');
	});

	it('should add duplicate item', () => {
		fixture.detectChanges();

		const inputEl = fixture.debugElement.query(By.css('input'));
		inputEl.nativeElement.value = "primeng";
		fixture.detectChanges();

		let event = { 'which': 13, preventDefault() { } }
		chips.onKeydown(event as KeyboardEvent);
		fixture.detectChanges();

		inputEl.nativeElement.value = "primeng";
		fixture.detectChanges();

		chips.onKeydown(event as KeyboardEvent);
		fixture.detectChanges();

		expect(chips.value.length).toEqual(2);
		expect(chips.value[0]).toEqual("primeng");
		expect(chips.value[1]).toEqual("primeng");
	});

	it('should not add duplicate item', () => {
		chips.allowDuplicate = false;
		fixture.detectChanges();

		const inputEl = fixture.debugElement.query(By.css('input'));
		inputEl.nativeElement.value = "primeng";
		fixture.detectChanges();

		let event = { 'which': 13, preventDefault() { } }
		chips.onKeydown(event as KeyboardEvent);
		fixture.detectChanges();

		inputEl.nativeElement.value = "primeng";
		fixture.detectChanges();

		chips.onKeydown(event as KeyboardEvent);
		fixture.detectChanges();

		expect(chips.value.length).toEqual(1);
		expect(chips.value[0]).toEqual("primeng");
	});

	it('should add item with tab key', () => {
		chips.addOnTab = true;
		fixture.detectChanges();

		const addItemSpy = spyOn(chips, 'addItem').and.callThrough();
		const onKeydownSpy = spyOn(chips, 'onKeydown').and.callThrough();
		const updateMaxedOutSpy = spyOn(chips, 'updateMaxedOut').and.callThrough();
		const inputEl = fixture.debugElement.query(By.css('input'));
		inputEl.nativeElement.value = "primeng";
		fixture.detectChanges();

		let event = { 'which': 9, preventDefault() { } }
		chips.onKeydown(event as KeyboardEvent);
		fixture.detectChanges();

		expect(addItemSpy).toHaveBeenCalled();
		expect(onKeydownSpy).toHaveBeenCalled();
		expect(updateMaxedOutSpy).toHaveBeenCalled();
		expect(chips.value.length).toEqual(1);
		expect(chips.value[0]).toEqual("primeng");
	});

	it('should add item with blur', () => {
		chips.addOnBlur = true;
		fixture.detectChanges();

		const addItemSpy = spyOn(chips, 'addItem').and.callThrough();
		const updateMaxedOutSpy = spyOn(chips, 'updateMaxedOut').and.callThrough();
		const inputEl = fixture.debugElement.query(By.css('input'));
		inputEl.nativeElement.value = "primeng";
		fixture.detectChanges();

		inputEl.nativeElement.dispatchEvent(new Event('blur'));
		fixture.detectChanges();

		expect(addItemSpy).toHaveBeenCalled();
		expect(updateMaxedOutSpy).toHaveBeenCalled();
		expect(chips.value.length).toEqual(1);
		expect(chips.value[0]).toEqual("primeng");
	});

	it('should change max', () => {
		chips.max = 2;
		fixture.detectChanges();

		const inputEl = fixture.debugElement.query(By.css('input'));
		inputEl.nativeElement.value = "primeng";
		fixture.detectChanges();

		let event = { 'which': 13, preventDefault() { } }
		chips.onKeydown(event as KeyboardEvent);
		fixture.detectChanges();

		inputEl.nativeElement.value = "primeng";
		fixture.detectChanges();

		chips.onKeydown(event as KeyboardEvent);
		fixture.detectChanges();

		event.which = 81;
		chips.onKeydown(event as KeyboardEvent);
		fixture.detectChanges();

		expect(chips.value.length).toEqual(2);
		expect(chips.value[0]).toEqual("primeng");
		expect(chips.value[1]).toEqual("primeng");
		expect(inputEl.nativeElement.disabled).toEqual(true);
		event.which = 8;
		chips.onKeydown(event as KeyboardEvent);
		chips.updateMaxedOut();
		fixture.detectChanges();

		expect(inputEl.nativeElement.disabled).toEqual(false);
	});

	it('should delete item', () => {
		chips.value = ["primeng"];
		fixture.detectChanges();

		let data;
		chips.onRemove.subscribe(value => data = value);
		expect(chips.value.length).toEqual(1);
		expect(chips.value[0]).toEqual("primeng");
		fixture.detectChanges();

		let event = { 'which': 8, preventDefault() { } }
		chips.onKeydown(event as KeyboardEvent);
		fixture.detectChanges();

		expect(data).toBeTruthy();
		expect(chips.value.length).toEqual(0);
		expect(chips.value[0]).toEqual(undefined);
	});

	it('should delete item with icon', () => {
		chips.value = ["primeng"];
		fixture.detectChanges();

		let data;
		chips.onRemove.subscribe(value => data = value);
		expect(chips.value.length).toEqual(1);
		expect(chips.value[0]).toEqual("primeng");
		fixture.detectChanges();

		const tokenIconEl = fixture.debugElement.query(By.css('.p-chips-token-icon'));
		tokenIconEl.nativeElement.click();
		fixture.detectChanges();

		expect(data).toBeTruthy();
		expect(chips.value.length).toEqual(0);
		expect(chips.value[0]).toEqual(undefined);
	});

	it('should not delete item', () => {
		chips.value = ["primeng"];
		fixture.detectChanges();

		expect(chips.value.length).toEqual(1);
		expect(chips.value[0]).toEqual("primeng");
		fixture.detectChanges();

		chips.disabled = true;
		fixture.detectChanges();

		chips.removeItem(event, 0);
		fixture.detectChanges();

		expect(chips.value.length).toEqual(1);
		expect(chips.value[0]).toEqual("primeng");
	});

	it('should use field varaible', () => {
		chips.field = "name";
		chips.value = [{ 'name': 'primeng' }];
		fixture.detectChanges();


		const labelEl = fixture.debugElement.query(By.css('.p-chips-token-label'));
		expect(labelEl.nativeElement.textContent).toEqual("primeng")
		expect(chips.value[0].name).toEqual("primeng");
	});

	it('should use field varaible (2)', () => {
		chips.field = "name.primeng";
		chips.value = [{
			'name': {
				'primeng': 'rocks'
			}
		}];
		fixture.detectChanges();


		const labelEl = fixture.debugElement.query(By.css('.p-chips-token-label'));
		expect(labelEl.nativeElement.textContent).toEqual("rocks");
		expect(chips.value[0].name.primeng).toEqual("rocks");
	});
});
