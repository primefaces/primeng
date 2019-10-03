import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Menubar, MenubarSub } from './menubar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '../../../../node_modules/@angular/router/testing';

describe('Menubar', () => {
  
    let menubar: Menubar;
    let fixture: ComponentFixture<Menubar>;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule,
          RouterTestingModule.withRoutes([
            { path: 'test', component: Menubar }
           ])
        ],
        declarations: [
          Menubar,
          MenubarSub
        ]
      });
      
      fixture = TestBed.createComponent(Menubar);
      menubar = fixture.componentInstance;
    });

    it('should created by default', () => {
      fixture.detectChanges();

      const menuEl = fixture.debugElement.query(By.css('.ui-menubar'));
      const subMenuEl = fixture.debugElement.query(By.css('.ui-menubar-root-list'));
      expect(menuEl).toBeTruthy();
      expect(subMenuEl).toBeTruthy();
    });

    it('should change style and styleClass', () => {
      menubar.style = {'primeng':'rocks!'};
      menubar.styleClass = "Primeng ROCKS!";
      fixture.detectChanges();

      const menuEl = fixture.debugElement.query(By.css('.ui-menubar'));
      expect(menuEl.nativeElement.className).toContain("Primeng ROCKS!");
      expect(menuEl.nativeElement.style.primeng).toContain("rocks!");
    });

    it('should change autoDisplay baseZIndex and autoZIndex', () => {
      menubar.autoDisplay = false;
      menubar.autoZIndex = false;
      menubar.baseZIndex = 20;
      fixture.detectChanges();

      const subMenu = fixture.debugElement.query(By.css('.ui-menubar-root-list')).componentInstance as MenubarSub;
      expect(subMenu.baseZIndex).toEqual(20);
      expect(subMenu.autoZIndex).toEqual(false);
      expect(subMenu.autoDisplay).toEqual(false);
      expect(subMenu.autoDisplay).toEqual(menubar.autoDisplay);
      expect(subMenu.autoZIndex).toEqual(menubar.autoZIndex);
      expect(subMenu.baseZIndex).toEqual(menubar.baseZIndex);
    });

    it('should show items', () => {
      menubar.model = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            items: [{
                    label: 'New', 
                    icon: 'pi pi-fw pi-plus',
                },
                {label: 'Open'},
                {separator:true},
                {label: 'Quit'}
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
            ]
        }
      ];
      fixture.detectChanges();

      const menuEl = fixture.debugElement.query(By.css('.ui-menubar-root-list'));
      expect(menuEl.children.length).toEqual(menubar.model.length);
      const parentMenuEls = menuEl.queryAll(By.css('.ui-menu-parent'));
      let i = 0;
      for(let parentMenu of parentMenuEls){
        if(menubar.model[i].label){
          expect(parentMenu.query(By.css('.ui-menuitem-text')).nativeElement.textContent).toEqual(menubar.model[i].label)
        }
        if(menubar.model[i].icon){
          expect(parentMenu.query(By.css('.ui-menuitem-icon')).nativeElement.className).toContain(menubar.model[i].icon)
        }        
        i++;
      }
    });

    it('should call onItemMouseEnter and show firstParentMenu', () => {
      menubar.model = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            items: [{
                    label: 'New', 
                    icon: 'pi pi-fw pi-plus',
                },
                {label: 'Open'},
                {separator:true},
                {label: 'Quit'}
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
            ]
        }
      ];
      fixture.detectChanges();

      const parentEls = fixture.debugElement.query(By.css('.ui-menubar-root-list')).children;
      const firstParentEl = parentEls[0];
      const secondParentEl = parentEls[1];
      const onItemMouseEnterSpy = spyOn(firstParentEl.componentInstance, 'onItemMouseEnter').and.callThrough();
      firstParentEl.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();

      expect(firstParentEl.componentInstance.activeMenu.textContent).toEqual(firstParentEl.nativeElement.textContent);
      expect(firstParentEl.componentInstance.activeItem).toBeTruthy();
      expect(onItemMouseEnterSpy).toHaveBeenCalled();
      expect(firstParentEl.nativeElement.className).toContain('ui-menuitem-active');
      expect(secondParentEl.nativeElement.className).not.toContain('ui-menuitem-active');
    });

    it('should call onItemMouseLeave and close firstParentMenu', fakeAsync(() => {
      menubar.model = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            items: [{
                    label: 'New', 
                    icon: 'pi pi-fw pi-plus',
                },
                {label: 'Open'},
                {separator:true},
                {label: 'Quit'}
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
            ]
        }
      ];
      fixture.detectChanges();

      const parentEls = fixture.debugElement.query(By.css('.ui-menubar-root-list')).children;
      const firstParentEl = parentEls[0];
      const secondParentEl = parentEls[1];
      const onItemMouseLeaveSpy = spyOn(firstParentEl.componentInstance, 'onItemMouseLeave').and.callThrough();
      firstParentEl.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();

      firstParentEl.nativeElement.dispatchEvent(new Event('mouseleave'));
      tick(300);
      fixture.detectChanges();

      expect(firstParentEl.componentInstance.activeItem).toEqual(null);
      expect(secondParentEl.componentInstance.activeItem).toEqual(null);
      expect(onItemMouseLeaveSpy).toHaveBeenCalled();
      expect(firstParentEl.nativeElement.className).not.toContain('ui-menuitem-active');
    }));

    it('should call itemClick', () => {
      menubar.model = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            items: [{
                    label: 'New', 
                    icon: 'pi pi-fw pi-plus',
                },
                {label: 'Open'},
                {separator:true},
                {label: 'Quit'}
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
            ]
        }
      ];
      fixture.detectChanges();

      const parentEls = fixture.debugElement.query(By.css('.ui-menubar-root-list')).children;
      const firstParentEl = parentEls[0];
      const secondParentEl = parentEls[1];
      const onItemMenuClickSpy = spyOn(firstParentEl.componentInstance, 'onItemMenuClick').and.callThrough();
      const bindEventListenerSpy = spyOn(firstParentEl.componentInstance, 'bindEventListener').and.callThrough();
      firstParentEl.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();

      const firstSubmenuList = firstParentEl.query(By.css('ul'));
      const firstSubItem = firstSubmenuList.children[0];
      firstSubItem.nativeElement.click();
      fixture.detectChanges();

      expect(onItemMenuClickSpy).toHaveBeenCalled();
      expect(bindEventListenerSpy).not.toHaveBeenCalled();
      expect(firstParentEl.componentInstance.activeItem).toEqual(null);
      expect(secondParentEl.componentInstance.activeItem).toEqual(null);
      expect(firstParentEl.nativeElement.className).not.toContain('ui-menuitem-active');
    });

    it('should call onItemMouseEnter and not show firstParentMenu', () => {
      menubar.model = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            items: [{
                    label: 'New', 
                    icon: 'pi pi-fw pi-plus',
                },
                {label: 'Open'},
                {separator:true},
                {label: 'Quit'}
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
            ]
        }
      ];
      menubar.autoDisplay = false;
      fixture.detectChanges();

      const parentEls = fixture.debugElement.query(By.css('.ui-menubar-root-list')).children;
      const firstParentEl = parentEls[0];
      const onItemMouseEnterSpy = spyOn(firstParentEl.componentInstance, 'onItemMouseEnter').and.callThrough();
      firstParentEl.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();

      expect(firstParentEl.componentInstance.activeItem).toBeFalsy();
      expect(onItemMouseEnterSpy).toHaveBeenCalled();
      expect(firstParentEl.nativeElement.className).not.toContain('ui-menuitem-active');
    });

    it('should call onItemMouseLeave and not close firstParentMenu', fakeAsync(() => {
      menubar.model = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            items: [{
                    label: 'New', 
                    icon: 'pi pi-fw pi-plus',
                },
                {label: 'Open'},
                {separator:true},
                {label: 'Quit'}
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
            ]
        }
      ];
      menubar.autoDisplay = false;
      fixture.detectChanges();

      const parentEls = fixture.debugElement.query(By.css('.ui-menubar-root-list')).children;
      const firstParentEl = parentEls[0];
      const onItemMouseLeaveSpy = spyOn(firstParentEl.componentInstance, 'onItemMouseLeave').and.callThrough();
      firstParentEl.nativeElement.click();
      fixture.detectChanges();

      firstParentEl.nativeElement.dispatchEvent(new Event('mouseleave'));
      tick(300);
      fixture.detectChanges();

      expect(firstParentEl.componentInstance.activeItem).toBeTruthy();
      expect(onItemMouseLeaveSpy).toHaveBeenCalled();
      expect(firstParentEl.nativeElement.className).toContain('ui-menuitem-active');
    }));

    it('should call itemClick and bindEventListener', () => {
      menubar.model = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            items: [{
                    label: 'New', 
                    icon: 'pi pi-fw pi-plus',
                },
                {label: 'Open'},
                {separator:true},
                {label: 'Quit'}
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
            ]
        }
      ];
      menubar.autoDisplay = false;
      fixture.detectChanges();

      const parentEls = fixture.debugElement.query(By.css('.ui-menubar-root-list')).children;
      const firstParentEl = parentEls[0];
      const secondParentEl = parentEls[1];
      const onItemMenuClickSpy = spyOn(firstParentEl.componentInstance, 'onItemMenuClick').and.callThrough();
      const bindEventListenerSpy = spyOn(firstParentEl.componentInstance, 'bindEventListener').and.callThrough();
      firstParentEl.nativeElement.click();
      fixture.detectChanges();

      const firstSubmenuList = firstParentEl.query(By.css('ul'));
      const firstSubItem = firstSubmenuList.children[0];
      firstSubItem.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();

      expect(onItemMenuClickSpy).toHaveBeenCalled();
      expect(bindEventListenerSpy).toHaveBeenCalled();
      expect(firstParentEl.componentInstance.activeItem).toBeTruthy();
      expect(secondParentEl.componentInstance.activeItem).toBeTruthy();
      expect(firstParentEl.nativeElement.className).toContain('ui-menuitem-active');
    });

    it('should show router items', () => {
      menubar.model = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            items: [{
                    label: 'New', 
                    icon: 'pi pi-fw pi-plus',
                    routerLink:'test'
                },
                {label: 'Open'},
                {separator:true},
                {label: 'Quit'}
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
            ]
        }
      ];
      fixture.detectChanges();

      const parentEls = fixture.debugElement.query(By.css('.ui-menubar-root-list')).children;
      const firstParentEl = parentEls[0];
      firstParentEl.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();

      expect(firstParentEl.componentInstance.activeMenu.textContent).toEqual(firstParentEl.nativeElement.textContent);
      expect(firstParentEl.componentInstance.activeItem).toBeTruthy();
    });

    it('should call itemClick', () => {
      menubar.model = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            items: [{
                    label: 'New', 
                    icon: 'pi pi-fw pi-plus',
                    routerLink:'test'
                },
                {label: 'Open'},
                {separator:true},
                {label: 'Quit'}
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
            ]
        }
      ];
      fixture.detectChanges();

      const parentEls = fixture.debugElement.query(By.css('.ui-menubar-root-list')).children;
      const firstParentEl = parentEls[0];
      firstParentEl.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      
      const firstSubmenuList = firstParentEl.query(By.css('ul'));
      const firstSubItem = firstSubmenuList.children[0].query(By.css('a'));
      const itemClickSpy = spyOn(firstSubItem.componentInstance, 'itemClick').and.callThrough();
      firstSubItem.nativeElement.click();
      fixture.detectChanges();
      
      expect(itemClickSpy).toHaveBeenCalled();
    });

    it('should change item style and styleClass', () => {
      menubar.model = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            style: {'primeng':'rocks!'},
            styleClass: "Primeng ROCKS!",
            items: [{
                    label: 'New', 
                    icon: 'pi pi-fw pi-plus',
                },
                {label: 'Open'},
                {separator:true},
                {label: 'Quit'}
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
            ]
        }
      ];
      fixture.detectChanges();

      const parentEls = fixture.debugElement.query(By.css('.ui-menubar-root-list')).children;
      const firstParentEl = parentEls[0];
      firstParentEl.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();

      const firstItem = firstParentEl.query(By.css('a'));
      expect(firstItem.nativeElement.className).toContain("Primeng ROCKS!");
      expect(firstItem.nativeElement.style.primeng).toContain("rocks!");
    });

    it('should change item disable', () => {
      menubar.model = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            disabled: true,
            items: [{
                    label: 'New', 
                    icon: 'pi pi-fw pi-plus',
                },
                {label: 'Open'},
                {separator:true},
                {label: 'Quit'}
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
            ]
        }
      ];
      fixture.detectChanges();

      const parentEls = fixture.debugElement.query(By.css('.ui-menubar-root-list')).children;
      const firstParentEl = parentEls[0];
      firstParentEl.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();

      const firstItem = firstParentEl.query(By.css('a'));
      expect(firstItem.nativeElement.className).toContain('ui-state-disabled');
    });
});
