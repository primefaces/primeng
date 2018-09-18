import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Accordion } from './accordion';
import { AccordionTab } from './accordion'
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '../../../../node_modules/@angular/core';

@Component({
  template: `<p-accordion>
  <p-accordionTab header="Godfather I" >
      The story begins as Don Vito Corleone, the head of a New York Mafia family, overseeshis daughter's wedding. His beloved son ichael has just come home from the war, but does not intend to become part of his father's business. T hrough Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.
  </p-accordionTab>
  <p-accordionTab header="Godfather II" >
      The story begins as Don Vito Corleone, the head of a New York Mafia family, overseeshis daughter's wedding. His beloved son ichael has just come home from the war, but does not intend to become part of his father's business. T hrough Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.
  </p-accordionTab>
</p-accordion>`
})
class TestAccordionComponent {
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
      firstAccordionTab.header = "Primeng ROCKS";
      fixture.detectChanges();

      const accordionTabHeaderEl = fixture.debugElement.children[0].children[0].children[0].query(By.css('.ui-accordion-header-text'));
      expect(accordionTabHeaderEl.nativeElement.textContent).toContain("Primeng ROCKS")
    });

    it('should have selected first accordionTab and second accordionTab should be unselected', () => {
      firstAccordionTab.selected = true;
      fixture.detectChanges();

      const firstAccordionTabHeaderEl = fixture.debugElement.children[0].children[0].children[0].query(By.css('.ui-accordion-header')).nativeElement;
      const secondAccordionTabHeaderEl = fixture.debugElement.children[0].children[0].children[1].query(By.css('.ui-accordion-header')).nativeElement;
      expect(firstAccordionTabHeaderEl.className).toContain('ui-state-active');
      expect(secondAccordionTabHeaderEl.className).not.toContain('ui-state-active');
    });

    it('should have a multiple select and all accordionTabs should be selected', () => {
      accordion.multiple = true;
      fixture.detectChanges();

      const firstAccordionTabOpenEl = fixture.debugElement.children[0].children[0].children[0].query(By.css('a')).nativeElement;
      const secondAccordionTabOpenEl = fixture.debugElement.children[0].children[0].children[1].query(By.css('a')).nativeElement;
      secondAccordionTabOpenEl.click();
      firstAccordionTabOpenEl.click();
      fixture.detectChanges();

      const firstAccordionTabHeaderEl = fixture.debugElement.children[0].children[0].children[0].query(By.css('.ui-accordion-header')).nativeElement;
      const secondAccordionTabHeaderEl = fixture.debugElement.children[0].children[0].children[1].query(By.css('.ui-accordion-header')).nativeElement;
      expect(firstAccordionTabHeaderEl.className).toContain('ui-state-active');
      expect(secondAccordionTabHeaderEl.className).toContain('ui-state-active');
    });

    it('should disabled', () => {
      firstAccordionTab.disabled = true;
      fixture.detectChanges();

      const firstAccordionTabOpenEl = fixture.debugElement.children[0].children[0].children[0].query(By.css('a')).nativeElement;
      const accordionTabHeaderEl = fixture.debugElement.children[0].children[0].children[0].query(By.css('.ui-accordion-header')).nativeElement;
      firstAccordionTabOpenEl.click();
      expect(accordionTabHeaderEl.className).toContain('ui-state-disabled');
      expect(accordionTabHeaderEl.className).not.toContain("ui-state-active")
    });

    it('should change expandIcon and collapseIcon', () => {
      accordion.collapseIcon = "pi pi-fw pi-caret-left";
      accordion.expandIcon = "pi pi-fw pi-caret-up";
      fixture.detectChanges();

      const firstAccordionTabOpenEl = fixture.debugElement.children[0].children[0].children[0].query(By.css('.ui-accordion-toggle-icon')).nativeElement;
      expect(firstAccordionTabOpenEl.className).toContain('pi pi-fw pi-caret-up');
      firstAccordionTab.selected = true;
      fixture.detectChanges();

      expect(firstAccordionTabOpenEl.className).toContain('pi pi-fw pi-caret-left');
    });

    it('should get styleClass', () => {
      accordion.styleClass = "alwaysbetonprime"
      fixture.detectChanges();

      const accordionEl = fixture.debugElement.children[0].query(By.css('.ui-accordion')).nativeElement;
      expect(accordionEl.className).toContain('alwaysbetonprime');
    });

    it('should get style', () => {
      accordion.style = { "prime": 'Rocks' }
      fixture.detectChanges();

      const accordionEl = fixture.debugElement.children[0].query(By.css('.ui-accordion')).nativeElement;
      expect(accordionEl.style.prime).toContain('Rocks');
    });

    it('should active index change', () => {
      fixture.detectChanges();

      let activeIndex;
      const secondAccordionTabOpenEl = fixture.debugElement.children[0].children[0].children[1].query(By.css('a')).nativeElement;
      accordion.onOpen.subscribe(value => activeIndex=value.index);    
      secondAccordionTabOpenEl.click();
      expect(activeIndex).toEqual(1)
    });

});
