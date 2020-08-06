import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Accordion } from './accordion';
import { AccordionTab } from './accordion'
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
	template: `<p-accordion [collapseIcon]="collapseIcon" [expandIcon]="expandIcon" [styleClass]="styleClass" [style]="style">
  <p-accordionTab [header]="header1" [disabled]="disabled1">
      The story begins as Don Vito Corleone, the head of a New York Mafia family, overseeshis daughter's wedding. His beloved son ichael has just come home from the war, but does not intend to become part of his father's business. T hrough Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.
  </p-accordionTab>
  <p-accordionTab header="Godfather II" >
      The story begins as Don Vito Corleone, the head of a New York Mafia family, overseeshis daughter's wedding. His beloved son ichael has just come home from the war, but does not intend to become part of his father's business. T hrough Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.
  </p-accordionTab>
</p-accordion>`
})
class TestAccordionComponent {
	header1: string = "Godfather I";

	disabled1: boolean = false;

	collapseIcon: string = "pi pi-fw pi-chevron-down";

	expandIcon: string = "pi pi-fw pi-chevron-right";

	styleClass: string;

	style: any;
}


describe('Accordion', () => {

	let accordion: Accordion;
	let firstAccordionTab: AccordionTab;
	let secondAccordionTab: AccordionTab;
	let fixture: ComponentFixture<TestAccordionComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			imports: [
				NoopAnimationsModule
			],
			declarations: [
				Accordion,
				AccordionTab,
				TestAccordionComponent
			],
		})
	}));
	beforeEach(() => {
		fixture = TestBed.createComponent(TestAccordionComponent);
		accordion = fixture.debugElement.children[0].componentInstance;
		firstAccordionTab = fixture.debugElement.children[0].children[0].children[0].componentInstance;
		secondAccordionTab = fixture.debugElement.children[0].children[0].children[1].componentInstance;
		fixture.detectChanges();
	})

	it('should have a two accordionTab', () => {
		fixture.detectChanges();

		expect(accordion.tabs.length).toBe(2)
	});

	it('should change header', () => {
		fixture.detectChanges();

		fixture.componentInstance.header1 = "Primeng ROCKS";

		firstAccordionTab.header = "Primeng ROCKS";
		fixture.detectChanges();

		const accordionTabHeaderEl = fixture.debugElement.children[0].children[0].children[0].query(By.css('.p-accordion-header-text'));
		expect(accordionTabHeaderEl.nativeElement.textContent).toContain("Primeng ROCKS")
	});

	it('should have selected first accordionTab and second accordionTab should be unselected', () => {
		firstAccordionTab.selected = true;
		fixture.detectChanges();

		const firstAccordionTabHeaderEl = fixture.debugElement.children[0].children[0].children[0].query(By.css('.p-accordion-header')).nativeElement;
		const secondAccordionTabHeaderEl = fixture.debugElement.children[0].children[0].children[1].query(By.css('.p-accordion-header')).nativeElement;
		expect(firstAccordionTabHeaderEl.className).toContain('p-highlight');
		expect(secondAccordionTabHeaderEl.className).not.toContain('p-highlight');
	});

	it('should have a multiple select and all accordionTabs should be selected', () => {
		accordion.multiple = true;
		fixture.detectChanges();

		const firstAccordionTabOpenEl = fixture.debugElement.children[0].children[0].children[0].query(By.css('a')).nativeElement;
		const secondAccordionTabOpenEl = fixture.debugElement.children[0].children[0].children[1].query(By.css('a')).nativeElement;
		secondAccordionTabOpenEl.click();
		firstAccordionTabOpenEl.click();
		fixture.detectChanges();

		const firstAccordionTabHeaderEl = fixture.debugElement.children[0].children[0].children[0].query(By.css('.p-accordion-header')).nativeElement;
		const secondAccordionTabHeaderEl = fixture.debugElement.children[0].children[0].children[1].query(By.css('.p-accordion-header')).nativeElement;
		expect(firstAccordionTabHeaderEl.className).toContain('p-highlight');
		expect(secondAccordionTabHeaderEl.className).toContain('p-highlight');
	});

	it('should disabled', () => {
		fixture.componentInstance.disabled1 = true;
		fixture.detectChanges();

		const firstAccordionTabOpenEl = fixture.debugElement.children[0].children[0].children[0].query(By.css('a')).nativeElement;
		const accordionTabHeaderEl = fixture.debugElement.children[0].children[0].children[0].query(By.css('.p-accordion-header')).nativeElement;
		firstAccordionTabOpenEl.click();
		expect(accordionTabHeaderEl.className).toContain('p-disabled');
		expect(accordionTabHeaderEl.className).not.toContain("p-highlight")
	});

	it('should change expandIcon and collapseIcon', () => {
		fixture.componentInstance.collapseIcon = "pi pi-fw pi-caret-left";
		fixture.componentInstance.expandIcon = "pi pi-fw pi-caret-up";
		fixture.detectChanges();

		firstAccordionTab.changeDetector.detectChanges();
		const firstAccordionTabOpenEl = fixture.debugElement.children[0].children[0].children[0].query(By.css('.p-accordion-toggle-icon')).nativeElement;
		expect(firstAccordionTabOpenEl.className).toContain('pi-caret-up');
		firstAccordionTab.selected = true;
		fixture.detectChanges();

		expect(firstAccordionTabOpenEl.className).toContain('pi-caret-left');
	});

	it('should get styleClass', () => {
		fixture.componentInstance.styleClass = "alwaysbetonprime"
		fixture.detectChanges();

		const accordionEl = fixture.debugElement.children[0].query(By.css('.p-accordion')).nativeElement;
		expect(accordionEl.className).toContain('alwaysbetonprime');
	});

	it('should get style', () => {
		fixture.componentInstance.style = { "height": '300px' }
		fixture.detectChanges();

		accordion.changeDetector.detectChanges();
		const accordionEl = fixture.debugElement.children[0].query(By.css('.p-accordion')).nativeElement;
		expect(accordionEl.style.height).toContain('300px');
	});

	it('should active index change', () => {
		fixture.detectChanges();

		let activeIndex;
		const secondAccordionTabOpenEl = fixture.debugElement.children[0].children[0].children[1].query(By.css('a')).nativeElement;
		accordion.onOpen.subscribe(value => activeIndex = value.index);
		secondAccordionTabOpenEl.click();
		expect(activeIndex).toEqual(1)
	});

	it('should be closed', fakeAsync(() => {
		fixture.detectChanges();

		let activeIndex;
		const secondAccordionTabOpenEl = fixture.debugElement.children[0].children[0].children[1].query(By.css('a')).nativeElement;
		accordion.onOpen.subscribe(value => activeIndex = value.index);
		secondAccordionTabOpenEl.click();
		fixture.detectChanges();
		tick(150);

		secondAccordionTabOpenEl.click();
		fixture.detectChanges();

		const secondAccordionTabHeaderEl = fixture.debugElement.children[0].children[0].children[1].query(By.css('.p-accordion-header')).nativeElement;
		expect(secondAccordionTabHeaderEl.className).not.toContain('p-highlight');
	}));

	it('should have an activeIndex', () => {
		fixture.detectChanges();

		accordion.activeIndex = 1;
		fixture.detectChanges();

		const secondAccordionTabHeaderEl = fixture.debugElement.children[0].children[0].children[1].query(By.css('.p-accordion-header')).nativeElement;
		expect(secondAccordionTabHeaderEl.className).toContain('p-highlight');
	});

	it('should be closed', () => {
		fixture.detectChanges();

		const secondAccordionTabOpenEl = fixture.debugElement.children[0].children[0].children[1].query(By.css('a')).nativeElement;
		let spaceEvent = { 'which': 32, preventDefault() { } };
		secondAccordionTab.onKeydown(spaceEvent as KeyboardEvent)
		fixture.detectChanges();

		const secondAccordionTabHeaderEl = fixture.debugElement.children[0].children[0].children[1].query(By.css('.p-accordion-header')).nativeElement;
		expect(secondAccordionTabHeaderEl.className).toContain('p-highlight');
	});
});
