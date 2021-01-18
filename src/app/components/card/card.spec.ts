import { CardDemo } from './../../showcase/components/card/carddemo';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Card } from './card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { ButtonModule } from '../button/button';

@Component({
	template: `<p-card [header]="header" [subheader]="subheader" [style]="style" [styleClass]="styleClass">
  <ng-template pTemplate="header">CardDemo
      <img src="Card" src="assets/showcase/images/usercard.png">
  </ng-template>
  <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
      quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</div>
  <ng-template pTemplate="footer">
      <button  type="button" label="Save" icon="pi pi-check" style="margin-right: .25em"></button>
      <button  type="button" label="Cancel" icon="pi pi-times" class="ui-button-secondary"></button>
  </ng-template>
</p-card>`
})
class TestCardComponent {

	header: string;

	subheader: string;

	styleClass: string;

	style: any;
}

describe('Card', () => {

	let card: Card;
	let fixture: ComponentFixture<TestCardComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			imports: [
				NoopAnimationsModule,
				ButtonModule
			],
			declarations: [
				Card,
				TestCardComponent,
				PrimeTemplate,
			],
		})
	}));
	beforeEach(() => {
		fixture = TestBed.createComponent(TestCardComponent);
		card = fixture.debugElement.children[0].componentInstance;

		fixture.detectChanges();
	});

	it('should display by default', () => {
		fixture.detectChanges();

		const cardEl = fixture.debugElement.query(By.css('div'));
		expect(cardEl.nativeElement).toBeTruthy();
	});

	it('should display the title', () => {
		fixture.componentInstance.header = "Primeng ROCKS!";
		fixture.detectChanges();

		const cardEl = fixture.debugElement.query(By.css('.p-card-title')).nativeElement;
		expect(cardEl.textContent).toEqual(" Primeng ROCKS! ");
	});

	it('should display the subtitle', () => {
		fixture.componentInstance.subheader = "Primeng ROCKS!";
		fixture.detectChanges();

		const cardEl = fixture.debugElement.query(By.css('.p-card-subtitle')).nativeElement;
		expect(cardEl.textContent).toEqual(" Primeng ROCKS! ");
	});

	it('should change style and styleClass', () => {
		fixture.componentInstance.styleClass = "Primeng ROCKS!";
		fixture.componentInstance.style = { 'height': '300px' };
		fixture.detectChanges();

		const cardEl = fixture.debugElement.query(By.css('div')).nativeElement;
		expect(cardEl.className).toContain("Primeng ROCKS!");
		expect(cardEl.style.height).toEqual("300px");
	});

	it('should have a header', () => {
		fixture.detectChanges();

		const cardHeaderEl = fixture.debugElement.query(By.css('.p-card-header')).nativeElement;
		expect(cardHeaderEl).toBeTruthy();
		expect(cardHeaderEl.children.length).toEqual(1);
	});

	it('should have a footer', () => {
		fixture.detectChanges();

		const cardFooterEl = fixture.debugElement.query(By.css('.p-card-footer')).nativeElement;
		expect(cardFooterEl).toBeTruthy();
		expect(cardFooterEl.children.length).toEqual(2);
	});

	it('should not have a header', () => {
		card.headerFacet = card.headerTemplate = null;
		fixture.componentInstance.header = null;
		fixture.detectChanges();

		const cardHeaderEl = fixture.debugElement.query(By.css('.p-card-header'));
		expect(cardHeaderEl).toBeFalsy();
	});
});
