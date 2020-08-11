import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Steps } from './steps';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, NO_ERRORS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { Toast } from 'primeng/toast';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuItem } from 'primeng/api';

@Component({
	template: `<p-steps [model]="items"></p-steps>
  `,

})
class TestStpesComponent {
	items: MenuItem[];

	activeIndex: number = 1;

	constructor() { }

	ngOnInit() {
		this.items = [{
			label: 'Personal',
			command: (event: any) => {
				this.activeIndex = 0;
			}
		},
		{
			label: 'Seat',
			command: (event: any) => {
				this.activeIndex = 1;
			}
		},
		{
			label: 'Payment',
			command: (event: any) => {
				this.activeIndex = 2;
			}
		},
		{
			label: 'Confirmation',
			command: (event: any) => {
				this.activeIndex = 3;
			}
		}
		];
	}
}

describe('Steps', () => {

	let steps: Steps;
	let testComponent: TestStpesComponent;
	let fixture: ComponentFixture<TestStpesComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			imports: [
				NoopAnimationsModule,
				RouterTestingModule,
			],
			declarations: [
				Steps,
				Toast,
				TestStpesComponent
			],
		});

		fixture = TestBed.createComponent(TestStpesComponent);
		steps = fixture.debugElement.children[0].componentInstance;
		testComponent = fixture.debugElement.componentInstance;
	});

	it('should change style & styleClass', () => {
		steps.style = { 'height': '300px' };
		steps.styleClass = "Primeng ROCKS!";
		fixture.detectChanges();

		const stepsEl = fixture.debugElement.children[0].query(By.css('div')).nativeElement;
		expect(stepsEl.className).toContain("Primeng ROCKS!");
		expect(stepsEl.style.height).toContain("300px");
	});

	it('should readonly by default', () => {

		fixture.detectChanges();

		const items = fixture.debugElement.children[0].queryAll(By.css('li'));

		for (let x = 0; x < testComponent.items.length; x++) {
			if (x == 0)
				expect(items[x].nativeElement.className).not.toContain("p-disabled");
			else
				expect(items[x].nativeElement.className).toContain("p-disabled");
		}
	});

	it('should not readonly', () => {
		steps.readonly = false;
		fixture.detectChanges();

		const stepsEl = fixture.debugElement.children[0].query(By.css('div')).nativeElement;
		const items = fixture.debugElement.children[0].queryAll(By.css('li'));
		expect(stepsEl.className).not.toContain("p-steps-readonly");
		for (let x = 0; x < testComponent.items.length; x++) {
			expect(items[x].nativeElement.className).not.toContain("p-disabled");
		}
	});

	it('should show the step number', () => {
		fixture.detectChanges();

		const stepsEl = fixture.debugElement.children[0].query(By.css('div')).nativeElement;
		const items = fixture.debugElement.children[0].queryAll(By.css('li'));
		for (let x = 0; x < testComponent.items.length; x++) {
			expect(items[x].query(By.css('.p-steps-number')).nativeElement.textContent).toEqual((x + 1).toString());
		}
	});

	it('should activate first item', () => {
		fixture.detectChanges();

		const items = fixture.debugElement.children[0].queryAll(By.css('li'));
		for (let x = 0; x < testComponent.items.length; x++) {
			if (x == 0)
				expect(items[x].nativeElement.className).toContain("p-highlight p-steps-current");
		}
	});

	it('should change activeItem', () => {
		steps.activeIndex = 2;
		fixture.detectChanges();

		const items = fixture.debugElement.children[0].queryAll(By.css('li'));
		for (let x = 0; x < testComponent.items.length; x++) {
			if (x == 2)
				expect(items[x].nativeElement.className).toContain("p-highlight p-steps-current");
		}
	});

	it('should change activeItem when click', () => {
		steps.readonly = false;
		const itemClickSpy = spyOn(steps, 'itemClick').and.callThrough();
		fixture.detectChanges();

		const items = fixture.debugElement.children[0].queryAll(By.css('li'));
		steps.activeIndexChange.subscribe(value => steps.activeIndex = value)
		items[2].query(By.css('a')).nativeElement.click();
		fixture.detectChanges();

		expect(itemClickSpy).toHaveBeenCalled();
		for (let x = 0; x < testComponent.items.length; x++) {
			if (x == 2)
				expect(items[x].nativeElement.className).toContain("p-highlight p-steps-current");
		}
	});

	it('should listen even emitter', () => {
		steps.readonly = false;
		let data = 0;
		fixture.detectChanges();

		const items = fixture.debugElement.children[0].queryAll(By.css('li'));
		steps.activeIndexChange.subscribe(value => data = value)
		items[2].query(By.css('a')).nativeElement.click();
		fixture.detectChanges();

		expect(data).toEqual(2);
	});

});
