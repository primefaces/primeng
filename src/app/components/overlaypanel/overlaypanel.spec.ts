import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OverlayPanel } from './overlaypanel';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
	template: `
  <button type="text" (click)="op1.toggle($event)"></button>
  <button type="text" (click)="op1.toggle($event)"></button>
  <p-overlayPanel #op1>
      <img src="assets/showcase/images/demo/galleria/galleria1.jpg" alt="Galleria 1" />
  </p-overlayPanel>
  <a (click)="outSideClick()" class="outside-anchor"></a>
  `
})
class TestOverlayPanelComponent {
	outSideClick() { }
}

describe('OverlayPanel', () => {

	let overlaypanel: OverlayPanel;
	let fixture: ComponentFixture<TestOverlayPanelComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			imports: [
				NoopAnimationsModule
			],
			declarations: [
				OverlayPanel,
				TestOverlayPanelComponent
			],
		});

		fixture = TestBed.createComponent(TestOverlayPanelComponent);
		overlaypanel = fixture.debugElement.query(By.css('p-overlayPanel')).componentInstance;
	});

	it('should change style and styleClass', () => {
		overlaypanel.style = { 'height': '300px' };
		overlaypanel.styleClass = "Primeng rocks!";
		const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
		buttonEl.click();
		fixture.detectChanges();

		const containerEl = fixture.debugElement.query(By.css('div')).nativeElement;
		expect(containerEl.className).toContain("Primeng rocks!");
		expect(containerEl.style.height).toContain('300px')
	});

	it('should show icon', () => {
		overlaypanel.showCloseIcon = true;
		const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
		buttonEl.click();
		fixture.detectChanges();

		const closeEl = fixture.debugElement.query(By.css('a'));
		expect(closeEl).toBeTruthy();
	});

	it('should open', () => {
		overlaypanel.showCloseIcon = true;
		const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
		const toggleSpy = spyOn(overlaypanel, 'toggle').and.callThrough();
		buttonEl.click();
		fixture.detectChanges();

		let overlaypanelEl = fixture.debugElement.query(By.css('div'));
		expect(toggleSpy).toHaveBeenCalled();
		expect(overlaypanelEl).toBeTruthy();
	});

	it('should close overlay panel and open on the other button', () => {
		overlaypanel.showCloseIcon = true;
		const buttonEls = fixture.debugElement.queryAll(By.css('button'));
		const toggleSpy = spyOn(overlaypanel, 'toggle').and.callThrough();
		buttonEls[0].nativeElement.click();
		fixture.detectChanges();

		let overlaypanelEl = fixture.debugElement.query(By.css('div'));
		expect(toggleSpy).toHaveBeenCalled();
		expect(overlaypanelEl).toBeTruthy();
		buttonEls[1].nativeElement.click();
		fixture.detectChanges();

		expect(overlaypanelEl).toBeTruthy();
	});

	it('should close', () => {
		overlaypanel.showCloseIcon = true;
		const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
		const closeSpy = spyOn(overlaypanel, 'onCloseClick').and.callThrough();
		const overlaypanelEl = fixture.debugElement.query(By.css('div'));
		buttonEl.click();
		fixture.detectChanges();

		const closeEl = fixture.debugElement.query(By.css('div')).query(By.css('button')).nativeElement;
		closeEl.click();
		fixture.detectChanges();

		expect(closeSpy).toHaveBeenCalled();
		expect(overlaypanelEl).toBeFalsy();
	});

	it('should close when outside click', () => {
		overlaypanel.showCloseIcon = true;
		const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
		const overlaypanelEl = fixture.debugElement.query(By.css('div'));
		buttonEl.click();
		fixture.detectChanges();

		const outsideEl = fixture.debugElement.query(By.css('a')).nativeElement;
		outsideEl.click();
		document.dispatchEvent(new Event('click'))
		fixture.detectChanges();

		overlaypanel.cd.detectChanges();
		expect(overlaypanelEl).toBeFalsy();
	});
});
