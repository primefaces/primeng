import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Menu, MenuItemContent } from './menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Button } from '../button/button';

@Component({
  template: `<p-menu #menu></p-menu>
  <button type="button" pButton icon="pi pi-bars" label="Show" (click)="menu.toggle($event)"></button>
  `
})
class TestMenuComponent {
}

describe('Menu', () => {
  
    let menu: Menu;
    let fixture: ComponentFixture<TestMenuComponent>;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule,
          RouterTestingModule
        ],
        declarations: [
          Menu,
          MenuItemContent,
          TestMenuComponent,
          Button
        ]
      });
      
      fixture = TestBed.createComponent(TestMenuComponent);
      menu = fixture.debugElement.children[0].componentInstance;
    });

    it('should display by default', () => {
      fixture.detectChanges();
      
      const containerEl = fixture.debugElement.query(By.css('.ui-menu'));
      expect(containerEl).toBeTruthy();
    });

    it('should not display container', () => {
      menu.popup = true;
      fixture.detectChanges();
      
      const containerEl = fixture.debugElement.query(By.css('.ui-menu'));
      expect(containerEl).toBeFalsy();
    });

    it('should change style and styleClass', () => {
      menu.style = {'primeng' : 'rocks!'};
      menu.styleClass = "Primeng ROCKS!";
      fixture.detectChanges();
      
      const containerEl = fixture.debugElement.query(By.css('.ui-menu'));
      expect(containerEl.nativeElement.className).toContain("Primeng ROCKS!");      
      expect(containerEl.nativeElement.className).toContain(menu.styleClass);
      expect(containerEl.nativeElement.style.primeng).toEqual(menu.style.primeng);
      expect(containerEl.nativeElement.style.primeng).toEqual("rocks!");
    });

    it('should call hasSubMenu and return false', () => {
      const hasSubMenuSpy = spyOn(menu, 'hasSubMenu').and.callThrough();
      menu.model  = [{
        label: 'File',
      }]; 
      fixture.detectChanges();

      expect(hasSubMenuSpy).toHaveBeenCalled();
      expect(menu.hasSubMenu()).toEqual(false);
    });

    it('should call hasSubMenu and return true', () => {
      const hasSubMenuSpy = spyOn(menu, 'hasSubMenu').and.callThrough();
      menu.model  = [{
        label: 'File',
        items: [
          {label: 'New', icon: 'pi pi-fw pi-plus'},
          {label: 'Download', icon: 'pi pi-fw pi-download'}
        ]
      }]; 
      fixture.detectChanges();

      expect(hasSubMenuSpy).toHaveBeenCalled();
      expect(menu.hasSubMenu()).toEqual(true);
    });

    it('should show items', () => {
      menu.model  = [{
        label: 'File',
        items: [
          {label: 'New', icon: 'pi pi-fw pi-plus'},
          {label: 'Download', icon: 'pi pi-fw pi-download'}
        ]
      }]; 
      fixture.detectChanges();

      const itemsEl = fixture.debugElement.queryAll(By.css('a'));
      expect(itemsEl.length).toEqual(2);
    });

    it('should not show items (menu visible false)', () => {
      menu.model  = [{
        label: 'File',
        items: [
          {label: 'New', icon: 'pi pi-fw pi-plus'},
          {label: 'Download', icon: 'pi pi-fw pi-download'}
        ],
        visible:false
      }]; 
      fixture.detectChanges();
      
      const menuItemsEl = fixture.debugElement.queryAll(By.css('.ui-menuitem'));
      expect(menuItemsEl.length).toEqual(2);
      for(let menuItem of menuItemsEl)
        expect(menuItem.nativeElement.className).toContain("ui-helper-hidden");
    });

    it('should not show items (subMenu visible false)', () => {
      menu.model  = [{
        label: 'File',
        items: [
          {label: 'New', icon: 'pi pi-fw pi-plus',visible:false},
          {label: 'Download', icon: 'pi pi-fw pi-download',visible:false}
        ]
      }]; 
      fixture.detectChanges();
      
      const menuItemsEl = fixture.debugElement.queryAll(By.css('.ui-menuitem'));
      expect(menuItemsEl.length).toEqual(2);
      for(let menuItem of menuItemsEl)
        expect(menuItem.nativeElement.className).toContain("ui-helper-hidden");
    });

    it('should change menuItemStyle and menuItemStyleClass', () => {
      menu.model  = [{
        label: 'File',
        items: [
          {label: 'New', icon: 'pi pi-fw pi-plus',style:{'primeng':'rocks!'},styleClass:"Primeng ROCKS!"},
          {label: 'Download', icon: 'pi pi-fw pi-download',style:{'primeng':'rocks!'},styleClass:"Primeng ROCKS!"}
        ]
      }]; 
      fixture.detectChanges();
      
      const menuItemsEl = fixture.debugElement.queryAll(By.css('.ui-menuitem'));
      expect(menuItemsEl.length).toEqual(2);
      for(let menuItem of menuItemsEl){
        expect(menuItem.nativeElement.className).toContain("Primeng ROCKS!");
        expect(menuItem.nativeElement.style.primeng).toContain("rocks!");
      }
    });

    it('should show seperator', () => {
      menu.model  = [{
        label: 'File',
        items: [
          {label: 'New', icon: 'pi pi-fw pi-plus'},
          {separator:true},
          {label: 'Download', icon: 'pi pi-fw pi-download'}
        ]
      }]; 
      fixture.detectChanges();
      
      const seperatorEl = fixture.debugElement.query(By.css('.ui-menu-separator'));
      const menuItemsEl = fixture.debugElement.queryAll(By.css('li'));
      expect(seperatorEl).toBeTruthy();
      expect(menuItemsEl.length).toEqual(4); 
    });

    it('should change target title icon and url', () => {
      menu.model  = [{
        label: 'File',
        items: [
          {label: 'New', icon: 'primeng',target:"primeng",title:"primeng",url:"primeng"},
        ]
      }]; 
      fixture.detectChanges();
      
      const menuItemLink = fixture.debugElement.query(By.css('.ui-menuitem-link'));
      const iconEl = fixture.debugElement.query(By.css('.ui-menuitem-icon'));
      expect(menuItemLink.nativeElement.href).toContain("primeng");
      expect(menuItemLink.nativeElement.target).toContain("primeng");
      expect(menuItemLink.nativeElement.title).toContain("primeng");
      expect(iconEl.nativeElement.className).toContain("primeng");
    });

    it('should have a disabled item', () => {
      menu.model  = [{
        label: 'File',
        items: [
          {label: 'New', icon: 'pi pi-fw pi-plus',disabled:true},
        ]
      }]; 
      fixture.detectChanges();
      
      const menuItemLink = fixture.debugElement.query(By.css('.ui-menuitem-link'));
      expect(menuItemLink.nativeElement.className).toContain("ui-state-disabled");
    });

    it('should call itemClick', () => {
      menu.model  = [{
        label: 'File',
        items: [
          {label: 'New', icon: 'pi pi-fw pi-plus'},
        ]
      }]; 
      const itemClickSpy = spyOn(menu, 'itemClick').and.callThrough();
      fixture.detectChanges();
      
      const menuItemLink = fixture.debugElement.query(By.css('.ui-menuitem-link'));
      menuItemLink.nativeElement.click();
      expect(itemClickSpy).toHaveBeenCalled();
    });

    it('should use popup and call call toggle', () => {
      menu.popup = true;
      menu.model  = [{
        label: 'File',
        items: [
          {label: 'New', icon: 'pi pi-fw pi-plus'},
        ]
      }]; 
      fixture.detectChanges();
      
      const toggleSpy = spyOn(menu, 'toggle').and.callThrough();
      const popupButtonEl = fixture.debugElement.query(By.css('button'));
      popupButtonEl.nativeElement.click();
      fixture.detectChanges();

      const containerEl = fixture.debugElement.query(By.css('.ui-menu'));
      const headerEl = fixture.debugElement.query(By.css('.ui-submenu-header'));
      const menuItem = fixture.debugElement.query(By.css('.ui-menuitem-link'));
      expect(toggleSpy).toHaveBeenCalled();
      expect(containerEl).toBeTruthy();
      expect(headerEl).toBeTruthy();
      expect(headerEl.nativeElement.textContent).toEqual("File");
      expect(menuItem).toBeTruthy();
      expect(menuItem.query(By.css('.ui-menuitem-text')).nativeElement.textContent).toEqual('New');
    });

    it('should call hide when item click', () => {
      menu.popup = true;
      menu.model  = [{
        label: 'File',
        items: [
          {label: 'New', icon: 'pi pi-fw pi-plus'},
        ]
      }]; 
      fixture.detectChanges();
      
      const itemClickSpy = spyOn(menu, 'itemClick').and.callThrough();
      const hideSpy = spyOn(menu, 'hide').and.callThrough();
      const popupButtonEl = fixture.debugElement.query(By.css('button'));
      popupButtonEl.nativeElement.click();
      fixture.detectChanges();

      const menuItem = fixture.debugElement.query(By.css('.ui-menuitem-link'));
      menuItem.nativeElement.click();
      fixture.detectChanges();

      expect(itemClickSpy).toHaveBeenCalled();
      expect(hideSpy).toHaveBeenCalled();
      expect(menu.visible).toEqual(false);
    });

});
