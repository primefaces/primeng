import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Sidebar } from './sidebar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  template: `<p-sidebar [(visible)]="visibleSidebar1">
  <h1 style="font-weight:normal">Full Screen Sidebar</h1>
  <button type="button" (click)="visibleSidebar1 = false" label="Save" class="ui-button-success"></button>
  <button type="button" (click)="visibleSidebar1 = false" label="Cancel" class="ui-button-secondary"></button>
  </p-sidebar>
  <button type="button" (click)="visibleSidebar1 = true" icon="pi pi-arrow-right"></button>`
})
class TestSideBarComponent {
  visibleSidebar1;
}

describe('Sidebar', () => {
  
    let sidebar: Sidebar;
    let fixture: ComponentFixture<TestSideBarComponent>;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Sidebar,
        TestSideBarComponent
      ],
      });
      
      fixture = TestBed.createComponent(TestSideBarComponent);
      sidebar = fixture.debugElement.query(By.css('p-sidebar')).componentInstance;
    });
  
    it('should change style and styleClass', () => {
      sidebar.style = {'primeng':'rocks!'};
      sidebar.styleClass = "Primeng rocks!";
      fixture.detectChanges();

      const containerEl = fixture.debugElement.query(By.css('div')).nativeElement;
      expect(containerEl.className).toContain("Primeng rocks!");
      expect(containerEl.style.primeng).toContain('rocks!')
    });

    it('should not show icon', () => {
      sidebar.showCloseIcon = false;
      fixture.detectChanges();

      const closeEl = fixture.debugElement.query(By.css('.ui-sidebar-close'));
      expect(closeEl).toBeFalsy();
    });

    it('should set positions', () => {
      fixture.detectChanges();
      const containerEl = fixture.debugElement.query(By.css('div')).nativeElement;
      expect(containerEl.className).toContain('ui-sidebar-left');
      sidebar.position = 'right';
      fixture.detectChanges();

      expect(containerEl.className).toContain('ui-sidebar-right');
      sidebar.position = 'bottom';
      fixture.detectChanges();

      expect(containerEl.className).toContain('ui-sidebar-bottom');
      sidebar.position = 'top';
      fixture.detectChanges();

      expect(containerEl.className).toContain('ui-sidebar-top');      
    });

    it('should open', () => {
      const buttonEl = fixture.debugElement.children[1].nativeElement;
      const sidebarOpenSpy = spyOn(sidebar, 'show').and.callThrough();
      buttonEl.click();
      fixture.detectChanges();

      const containerEl = fixture.debugElement.query(By.css('div'));
      expect(containerEl.nativeElement.style.opacity).toEqual('1');
      expect(sidebarOpenSpy).toHaveBeenCalled();
    });

    it('should open fullscreen', () => {
      sidebar.fullScreen = true;
      const buttonEl = fixture.debugElement.children[1].nativeElement;
      const sidebarOpenSpy = spyOn(sidebar, 'show').and.callThrough();
      buttonEl.click();
      fixture.detectChanges();

      const containerEl = fixture.debugElement.query(By.css('div'));
      expect(containerEl.nativeElement.style.opacity).toEqual('1');
      expect(sidebarOpenSpy).toHaveBeenCalled();
      expect(containerEl.nativeElement.className).toContain('ui-sidebar-full');
    });

    it('should close', () => {
      const buttonEl = fixture.debugElement.children[1].nativeElement;
      const sidebarCloseSpy = spyOn(sidebar, 'close').and.callThrough();
      buttonEl.click();
      fixture.detectChanges();

      const closeEl = fixture.debugElement.query(By.css('div')).query(By.css('a')).nativeElement;
      closeEl.click();
      fixture.detectChanges();

      const containerEl = fixture.debugElement.query(By.css('div'));
      expect(containerEl.nativeElement.style.opacity).toBeFalsy();
      expect(sidebarCloseSpy).toHaveBeenCalled();
    });

    it('should listen emitters', () => {
      fixture.detectChanges();

      const buttonEl = fixture.debugElement.children[1].nativeElement;
      let visibleChangeCount = 0;
      let visibleOption;
      sidebar.onShow.subscribe(value => visibleOption = "visible");
      sidebar.onHide.subscribe(value => visibleOption = "hide");
      sidebar.visibleChange.subscribe(value => visibleChangeCount++);
      buttonEl.click();
      fixture.detectChanges();

      expect(visibleOption).toEqual("visible");
      expect(visibleChangeCount).toEqual(0);
      const closeEl = fixture.debugElement.query(By.css('div')).query(By.css('a')).nativeElement;
      closeEl.click();
      fixture.detectChanges();

      expect(visibleOption).toEqual("hide");
      expect(visibleChangeCount).toEqual(1);
    });

    it('should not use modal', () => {
      sidebar.modal = false;
      const buttonEl = fixture.debugElement.children[1].nativeElement;
      const enableModalitySpy = spyOn(sidebar, 'enableModality').and.callThrough();
      buttonEl.click();
      fixture.detectChanges();

      expect(enableModalitySpy).not.toHaveBeenCalled();
      expect(sidebar.mask).toEqual(undefined);
      const disableModalitySpy = spyOn(sidebar, 'disableModality').and.callThrough();
      const closeEl = fixture.debugElement.query(By.css('div')).query(By.css('a')).nativeElement;
      closeEl.click();
      fixture.detectChanges();

      expect(enableModalitySpy).not.toHaveBeenCalled();
      expect(sidebar.mask).toEqual(undefined);
    });
    
});
