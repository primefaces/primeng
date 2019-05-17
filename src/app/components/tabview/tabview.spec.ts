import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TabView, TabPanel, TabViewNav } from './tabview';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '../../../../node_modules/@angular/core';
import { Tooltip } from '../tooltip/tooltip';
import { PrimeTemplate } from '../common/shared';

@Component({
    template: `<p-tabView>
        <p-tabPanel header="Godfather I" leftIcon="pi pi-calendar">
            The story begins as Don Vito Corleone, the head of a New York Mafia family, overseeshis daughter's wedding. His beloved son ichael has just come home from the war, but does not intend to become part of his father's business. T hrough Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.
        </p-tabPanel>
        <p-tabPanel header="Godfather II" leftIcon="pi pi-inbox">
            Francis Ford Coppola's legendary continuation and sequel to his landmark 1972 film, The_Godfather parallels the young Vito Corleone's rise with his son Michael's spiritual fall, deepening The_Godfather's depiction of the dark side of the American dream. In the early 1900s, the child Vito flees his Sicilian village for America after the local Mafia kills his family. Vito struggles to make a living, legally or illegally, for his wife and growing brood in Little Italy, killing the local Black Hand Fanucci after he demands his customary cut of the tyro's business. With Fanucci gone, Vito's communal stature grows.
        </p-tabPanel>
        <p-tabPanel>
            <ng-template pTemplate="header">Godfather III</ng-template>
            <ng-template pTemplate="content">
                After a break of more than  15 years, director Francis Ford Coppola and writer Mario Puzo returned to the well for this third and final story of the fictional Corleone crime family. Two decades have passed, and crime kingpin Michael Corleone, now divorced from his wife Kay has nearly succeeded in keeping his promise that his family would one day be completely legitimate.
            </ng-template>
        </p-tabPanel>
    </p-tabView>`
  })
  class TestTabViewComponent {
  }

describe('TabView', () => {
  
  let tabview: TabView;
  let firstTabPanel:TabPanel;
  let secondTabPanel:TabPanel;
  let thirdTabPanel:TabPanel;
  let fixture: ComponentFixture<TestTabViewComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        TabView,
        TabPanel,
        TabViewNav,
        Tooltip,
        TestTabViewComponent,
        PrimeTemplate
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(TestTabViewComponent);
    tabview = fixture.debugElement.children[0].componentInstance;
    firstTabPanel = fixture.debugElement.children[0].children[0].children[0].children[0].componentInstance;
    secondTabPanel = fixture.debugElement.children[0].children[0].children[0].children[1].componentInstance;
    thirdTabPanel = fixture.debugElement.children[0].children[0].children[0].children[2].componentInstance;
    fixture.detectChanges();      
    });

    it('should have a three tabPanel', () => {
      fixture.detectChanges();

      expect(tabview.tabs.length).toEqual(3);  
    });

    it('should change the orientation', () => {
      tabview.orientation="left"
      fixture.detectChanges();
      
      const tabPanelEl=fixture.debugElement.children[0].query(By.css('.ui-tabview')).nativeElement;
      const tabviewEl=fixture.debugElement.children[0].query(By.css('.ui-tabview')).nativeElement;
      expect(tabviewEl.className).toContain("ui-tabview-left");
      expect(tabPanelEl.className).toContain("ui-tabview-left");
    });

    it('should change the header', () => {
      fixture.detectChanges();

      firstTabPanel.header = "Primeng ROCKS!"
      secondTabPanel.header = "Primeng ROCKS!"
      fixture.detectChanges();

      const firstTabViewNavEl = fixture.debugElement.children[0].children[0].children[0].children[0].nativeElement;
      const secondTabViewNavEl = fixture.debugElement.children[0].children[0].children[0].children[1].nativeElement;
      expect(firstTabViewNavEl.textContent).toContain("Primeng ROCKS!");
      expect(secondTabViewNavEl.textContent).toContain("Primeng ROCKS!");
    });

    it('should disabled', () => {
      fixture.detectChanges();

      firstTabPanel.disabled = true;
      fixture.detectChanges();

      const firstTabViewNavEl = fixture.debugElement.children[0].children[0].children[0].children[0].nativeElement;
      expect(firstTabViewNavEl.className).toContain("ui-state-disabled");
    });

    it('should closable and element count should be 2', () => {
      fixture.detectChanges();

      firstTabPanel.closable = true;
      fixture.detectChanges();

      const firstTabViewNavEl = fixture.debugElement.children[0].children[0].children[0].children[0].query(By.css('.ui-tabview-close')).nativeElement;
      expect(firstTabViewNavEl.className).toContain("ui-tabview-close");
      firstTabViewNavEl.click();
      fixture.detectChanges();

      const tabviewElCount = fixture.debugElement.children[0].children[0].children[0].children.length;
      expect(firstTabPanel.closed).toEqual(true);
      expect(tabviewElCount).toEqual(2);
    });

    it('should change left and right icon', () => {
      fixture.detectChanges();

      firstTabPanel.leftIcon = "PrimeNg ROCKS!";
      firstTabPanel.rightIcon = "ALWAYS BET ON PRIME";
      fixture.detectChanges();

      const firstTabViewLeftIconEl = fixture.debugElement.children[0].children[0].children[0].children[0].query(By.css('.ui-tabview-left-icon')).nativeElement;
      const firstTabViewRightIconEl = fixture.debugElement.children[0].children[0].children[0].children[0].query(By.css('.ui-tabview-right-icon')).nativeElement;
      expect(firstTabViewLeftIconEl.className).toContain("PrimeNg ROCKS!");
      expect(firstTabViewRightIconEl.className).toContain("ALWAYS BET ON PRIME");
    });

    it('should change headerStyle and headerStyleClass', () => {
      fixture.detectChanges();

      firstTabPanel.headerStyle = {"prime":"rock"};
      firstTabPanel.headerStyleClass = "Primeng ROCKS!";
      fixture.detectChanges();

      const firstTabViewNavEl = fixture.debugElement.children[0].children[0].children[0].children[0].nativeElement;
      expect(firstTabViewNavEl.className).toContain("Primeng ROCKS!");
      expect(firstTabViewNavEl.style.prime).toContain("rock");
    });

    it('should change style and styleClass', () => {
      fixture.detectChanges();

      tabview.style = {"prime":"rock"};
      tabview.styleClass = "Primeng ROCKS!";
      fixture.detectChanges();

      const firstTabViewNavEl = fixture.debugElement.children[0].children[0].nativeElement;
      expect(firstTabViewNavEl.className).toContain("Primeng ROCKS!");
      expect(firstTabViewNavEl.style.prime).toContain("rock");
    });

    it('should cache true by default', () => {
      fixture.detectChanges();

      expect(firstTabPanel.cache).toEqual(true);
      expect(secondTabPanel.cache).toEqual(true);
      expect(thirdTabPanel.cache).toEqual(true);
    });

    it('should open by activeIndex', () => {
      tabview.activeIndex=1;
      fixture.detectChanges();

      const firstTabViewNavEl=fixture.debugElement.children[0].children[0].children[0].children[0].nativeElement;
      const secondTabViewNavEl=fixture.debugElement.children[0].children[0].children[0].children[1].nativeElement;
      const thirdTabViewNavEl=fixture.debugElement.children[0].children[0].children[0].children[2].nativeElement;
      expect(firstTabViewNavEl.className).not.toContain('ui-tabview-selected ui-state-active');
      expect(secondTabViewNavEl.className).toContain('ui-tabview-selected ui-state-active');
      expect(thirdTabViewNavEl.className).not.toContain('ui-tabview-selected ui-state-active');
    });

    it('should change activeIndex', () => {
      tabview.activeIndex=1;
      fixture.detectChanges();

      let activeIndex;
      const firstTabViewNavEl=fixture.debugElement.children[0].children[0].children[0].children[0].nativeElement;
      tabview.activeIndexChange.subscribe(value => activeIndex=value);      
      firstTabViewNavEl.click();
      expect(activeIndex).toEqual(0);
    });

    it('should display header template', () => {
        tabview.activeIndex=2;
        fixture.detectChanges();

        const thirdTabViewNavEl=fixture.debugElement.children[0].children[0].children[0].children[2].nativeElement;
        expect(thirdTabViewNavEl.textContent).toContain("Godfather III");
    });

});
