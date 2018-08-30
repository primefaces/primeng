import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TieredMenu, TieredMenuSub } from './tieredmenu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '../../../../node_modules/@angular/router/testing';

describe('TieredMenu', () => {
  
    let tieredmenu: TieredMenu;
    let tieredmenuSub : TieredMenuSub;
    let fixture: ComponentFixture<TieredMenu>;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule,
          RouterTestingModule
        ],
        declarations: [
          TieredMenu,
          TieredMenuSub
        ]
      });
      
      fixture = TestBed.createComponent(TieredMenu);
      tieredmenu = fixture.componentInstance;
      // tieredmenuSub = fixture.debugElement.query(By.css("p-tieredMenuSub")).componentInstance;
    });

    it('should created by default', () => {
      fixture.detectChanges();

      const tieredmenuEl = fixture.debugElement.query(By.css('div'));
      expect(tieredmenuEl).toBeTruthy();
    });

    it('should not created', () => {
      tieredmenu.popup = true;
      fixture.detectChanges();

      const tieredmenuEl = fixture.debugElement.query(By.css('div'));
      expect(tieredmenuEl).toBeFalsy();
    });

    it('should change style and styleClass', () => {
      tieredmenu.styleClass = "Primeng ROCKS!";
      tieredmenu.style = {'primeng' : 'rocks!'};
      fixture.detectChanges();

      const tieredmenuEl = fixture.debugElement.query(By.css('div'));
      const styleEl = tieredmenuEl.styles.primeng;
      expect(tieredmenuEl.nativeElement.className).toContain("Primeng ROCKS!");
      expect(styleEl).toEqual("rocks!");
    });

    it('should change autoZindex', () => {
      tieredmenu.model = [
        {
            label: 'File',
            items: [{
                    label: 'New', 
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {label: 'Project'},
                        {label: 'Other'},
                    ]
                },
                {label: 'Open'},
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
      tieredmenu.autoZIndex = true;
      fixture.detectChanges();

      const subMenuEl = fixture.debugElement.query(By.css('p-tieredMenuSub')).componentInstance;
      expect(subMenuEl.autoZIndex).toEqual(true);
    });

    it('should change hideDelay', () => {
      tieredmenu.model = [
        {
            label: 'File',
            items: [{
                    label: 'New', 
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {label: 'Project'},
                        {label: 'Other'},
                    ]
                },
                {label: 'Open'},
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
      tieredmenu.hideDelay = 500;
      fixture.detectChanges();

      const subMenuEl = fixture.debugElement.query(By.css('p-tieredMenuSub')).componentInstance;
      expect(subMenuEl.hideDelay).toEqual(500);
    });

    it('should change baseZIndex', () => {
      tieredmenu.model = [
        {
            label: 'File',
            items: [{
                    label: 'New', 
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {label: 'Project'},
                        {label: 'Other'},
                    ]
                },
                {label: 'Open'},
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
      tieredmenu.baseZIndex = 500;
      fixture.detectChanges();

      const subMenuEl = fixture.debugElement.query(By.css('p-tieredMenuSub')).componentInstance;
      expect(subMenuEl.baseZIndex).toEqual(500);
    });

    it('should show items', () => {
      tieredmenu.model = [
        {
            label: 'File',
            items: [{
                    label: 'New', 
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {label: 'Project'},
                        {label: 'Other'},
                    ]
                },
                {label: 'Open'},
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
      const items = fixture.debugElement.query(By.css('ul'));
      expect(items.children.length).toEqual(2);
    });

    it('should call itemClick when click', () => {
      tieredmenu.model = [
        {
            label: 'File',
            items: [{
                    label: 'New', 
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {label: 'Project'},
                        {label: 'Other'},
                    ]
                },
                {label: 'Open'},
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

      const subMenuComponent = fixture.debugElement.query(By.css('p-tieredMenuSub')).componentInstance as TieredMenuSub;
      const itemClickSpy = spyOn(subMenuComponent, 'itemClick').and.callThrough();
      const items = fixture.debugElement.query(By.css('ul'));
      const fileItemEl = items.children[0].query(By.css('a')).nativeElement;
      fileItemEl.click();
      fixture.detectChanges();

      expect(itemClickSpy).toHaveBeenCalled();
    });

    it('should call onItemMouseEnter when mouseenter', () => {
      tieredmenu.model = [
        {
            label: 'File',
            items: [{
                    label: 'New', 
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {label: 'Project'},
                        {label: 'Other'},
                    ]
                },
                {label: 'Open'},
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

      const subMenuComponent = fixture.debugElement.query(By.css('p-tieredMenuSub')).componentInstance as TieredMenuSub;
      const onItemMouseEnter = spyOn(subMenuComponent, 'onItemMouseEnter').and.callThrough();
      const items = fixture.debugElement.query(By.css('ul'));
      const fileItemEl = items.children[0].nativeElement;
      const secondSubMenu = items.children[0].query(By.css("p-tieredMenuSub")).query(By.css('ul'));
      const event = new Event('mouseenter');
      fileItemEl.dispatchEvent(event);
      fixture.detectChanges();

      expect(onItemMouseEnter).toHaveBeenCalled();
      expect(fileItemEl.className).toContain("ui-menuitem-active");
      expect(secondSubMenu.children.length).toEqual(3);
      expect(subMenuComponent.activeItem).toBeTruthy();
    });

    it('should call onItemMouseLeave when mouseleave', fakeAsync(() => {
      tieredmenu.model = [
        {
            label: 'File',
            items: [{
                    label: 'New', 
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {label: 'Project'},
                        {label: 'Other'},
                    ]
                },
                {label: 'Open'},
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

      const subMenuComponent = fixture.debugElement.query(By.css('p-tieredMenuSub')).componentInstance as TieredMenuSub;
      const onItemMouseLeave = spyOn(subMenuComponent, 'onItemMouseLeave').and.callThrough();
      const items = fixture.debugElement.query(By.css('ul'));
      const fileItemEl = items.children[0].nativeElement;
      const secondSubMenu = items.children[0].query(By.css("p-tieredMenuSub")).query(By.css('ul'));
      const mouseenter = new Event('mouseenter');
      fileItemEl.dispatchEvent(mouseenter);
      fixture.detectChanges();

      const mouseleave = new Event('mouseleave');
      fileItemEl.dispatchEvent(mouseleave);
      tick(250);
      fixture.detectChanges();

      expect(onItemMouseLeave).toHaveBeenCalled();
      expect(fileItemEl.className).not.toContain("ui-menuitem-active");
      expect(subMenuComponent.activeItem).toEqual(null);
    }));

});
