import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Toolbar } from './toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { ButtonModule } from '../button/button';

@Component({
	template: `<p-toolbar>
  <div class="p-toolbar-group-left">
      <button  type="button" label="New" icon="pi pi-plus"></button>
      <button  type="button" label="Upload" icon="pi pi-upload" class="p-button-success"></button>
  </div>
  
  <div class="p-toolbar-group-right">
      <button  type="button" icon="pi pi-search"></button>
      <button  type="button" icon="pi pi-calendar" class="p-button-success"></button>
      <button  type="button" icon="pi pi-times" class="p-button-danger"></button>
  </div>
</p-toolbar>`
})
class TestToolbarComponent {
}

describe('Toolbar', () => {

	let toolbar: Toolbar;
	let fixture: ComponentFixture<TestToolbarComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NoopAnimationsModule,
				ButtonModule
			],
			declarations: [
				Toolbar,
				TestToolbarComponent,
			]
		});

		fixture = TestBed.createComponent(TestToolbarComponent);
		toolbar = fixture.debugElement.children[0].componentInstance;
	});

	it('should display by default', () => {
		fixture.detectChanges();

		const toolbarEl = fixture.debugElement.query(By.css('p-toolbar'));
		expect(toolbarEl.nativeElement).toBeTruthy();
		expect(toolbarEl.nativeElement.children[0].children.length).toEqual(2);
	});

	it('should change style and styleClass', () => {
		toolbar.style = { 'height': '300px' };
		toolbar.styleClass = "Primeng ROCKS!";
		fixture.detectChanges();

		const toolbarEl = fixture.debugElement.query(By.css('div')).nativeElement;
		expect(toolbarEl.className).toContain("Primeng ROCKS!");
		expect(toolbarEl.style.height).toEqual("300px");
	});

	it('should show ng-content', () => {
		fixture.detectChanges();

		const contentEl = fixture.debugElement.query(By.css('.p-toolbar-group-left')).nativeElement;
		expect(contentEl).toBeTruthy();
	});

});
