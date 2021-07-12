import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputTextarea } from './inputtextarea';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ApplicationRef, Component } from '@angular/core';

@Component({
	template: `<textarea rows="1" cols="1" (onResize)="onResize($event)" [autoResize]="autoResize" pInputTextarea></textarea>
  `
})
class TestInputTextArea {
	autoResize: boolean;

	onResize(event) {

	}
}

describe('InputTextarea', () => {

	let fixture: ComponentFixture<TestInputTextArea>;
	let component: TestInputTextArea;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NoopAnimationsModule
			],
			declarations: [
				InputTextarea,
				TestInputTextArea
			]
		});

		fixture = TestBed.createComponent(TestInputTextArea);
		component = fixture.debugElement.componentInstance;
	});
	it('should display by default', () => {
		fixture.detectChanges();

		const inputTextEl = fixture.debugElement.query(By.css('textarea'));
		expect(inputTextEl).toBeTruthy();
	});

	it('should change autoResize', () => {
		component.autoResize = true;
		fixture.detectChanges();

		const onResizeSpy = spyOn(component, 'onResize').and.callThrough();
		const inputTextEl = fixture.debugElement.query(By.css('textarea'));
		inputTextEl.nativeElement.dispatchEvent(new Event('focus'));
		fixture.detectChanges();

		inputTextEl.nativeElement.dispatchEvent(new Event('blur'));
		fixture.detectChanges();

		expect(onResizeSpy).toHaveBeenCalledTimes(2);
	});

	it('should increment height', () => {
		component.autoResize = true;
		fixture.detectChanges();

		const inputTextEl = fixture.debugElement.query(By.css('textarea'));
		let cachedHeight = inputTextEl.nativeElement.style.height;
		inputTextEl.nativeElement.value = "primeng";
		inputTextEl.nativeElement.dispatchEvent(new Event('input'));
		fixture.detectChanges();

		expect(inputTextEl.nativeElement.style.height).toBeGreaterThan(cachedHeight);
		expect(inputTextEl.nativeElement.style.overflow).toEqual("hidden");
	});

	it('should use resize with maxHeight', () => {
		component.autoResize = true;
		fixture.detectChanges();

		const inputTextEl = fixture.debugElement.query(By.css('textarea'));
		inputTextEl.nativeElement.style.maxHeight = 70 + 'px';
		fixture.detectChanges();

		inputTextEl.nativeElement.value = "primeng rocks!";
		inputTextEl.nativeElement.dispatchEvent(new Event('input'));
		fixture.detectChanges();

		expect(inputTextEl.nativeElement.style.height).toEqual(inputTextEl.nativeElement.style.maxHeight);
		expect(inputTextEl.nativeElement.style.overflowY).toEqual("scroll");
	});

	it('should not run change detection on input/blur/focus events but should update filled state', () => {
		const appRef = TestBed.inject(ApplicationRef);
		const spy = spyOn(appRef, 'tick').and.callThrough();

		fixture.detectChanges();

		const inputTextEl = fixture.debugElement.query(By.css('textarea'));
		inputTextEl.nativeElement.value = 'primeng';
		inputTextEl.nativeElement.dispatchEvent(new Event('input'));
		inputTextEl.nativeElement.dispatchEvent(new Event('focus'));
		inputTextEl.nativeElement.dispatchEvent(new Event('blur'));

		// We've run change detection manually only once through `fixture.detectChanges()`,
		// DOM events (input, focus, blur) do not cause change detection to run anymore.
		expect(spy.calls.count()).toEqual(1);
		expect(inputTextEl.nativeElement.className).toContain('p-filled');

		inputTextEl.nativeElement.value = '';
		inputTextEl.nativeElement.dispatchEvent(new Event('input'));
		expect(inputTextEl.nativeElement.className).not.toContain('p-filled');
	});
});
