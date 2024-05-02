import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Menubar, MenubarModule, MenubarService, MenubarSub } from './menubar';
import { RouterModule } from '@angular/router';

describe('Menubar', () => {
    let menubar: Menubar;
    let fixture: ComponentFixture<Menubar>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, RouterModule.forRoot([{ path: 'test', component: Menubar }]), MenubarModule],
            providers: [MenubarService]
        });

        fixture = TestBed.createComponent(Menubar);
        menubar = fixture.componentInstance;
    });

    it('should created by default', () => {
        fixture.detectChanges();

        const menuEl = fixture.debugElement.query(By.css('.p-menubar'));
        const subMenuEl = fixture.debugElement.query(By.css('.p-menubar-root-list'));
        expect(menuEl).toBeTruthy();
        expect(subMenuEl).toBeTruthy();
    });

    it('should change style and styleClass', () => {
        menubar.style = { height: '300px' };
        menubar.styleClass = 'Primeng ROCKS!';
        fixture.detectChanges();

        const menuEl = fixture.debugElement.query(By.css('.p-menubar'));
        expect(menuEl.nativeElement.className).toContain('Primeng ROCKS!');
        expect(menuEl.nativeElement.style.height).toContain('300px');
    });

    it('should change autoDisplay baseZIndex and autoZIndex', () => {
        menubar.autoZIndex = false;
        menubar.baseZIndex = 20;
        fixture.detectChanges();

        const subMenu = fixture.debugElement.query(By.css('.p-menubar-root-list')).componentInstance as MenubarSub;
        expect(subMenu.baseZIndex).toEqual(20);
        expect(subMenu.autoZIndex).toEqual(false);
        expect(subMenu.autoDisplay).toBeDefined();
        expect(subMenu.autoDisplay).toEqual(menubar.autoDisplay);
        expect(subMenu.autoZIndex).toEqual(menubar.autoZIndex);
        expect(subMenu.baseZIndex).toEqual(menubar.baseZIndex);
    });

    it('should show items', () => {
        menubar.model = [
            {
                label: 'File',
                icon: 'pi pi-file pi-fw',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus'
                    },
                    { label: 'Open' },
                    { separator: true },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            }
        ];
        fixture.detectChanges();

        const menuEl = fixture.debugElement.query(By.css('.p-menubar-root-list'));
        expect(menuEl.children.length).toEqual(menubar.model.length);
        const parentMenuEls = menuEl.queryAll(By.css('.p-menu-parent'));
        let i = 0;
        for (let parentMenu of parentMenuEls) {
            if (menubar.model[i].label) {
                expect(parentMenu.query(By.css('.p-menuitem-text')).nativeElement.textContent).toEqual(menubar.model[i].label);
            }
            if (menubar.model[i].icon) {
                expect(parentMenu.query(By.css('.p-menuitem-icon')).nativeElement.className).toContain(menubar.model[i].icon);
            }
            i++;
        }
    });

    it('should call click and show firstParentMenu', () => {
        menubar.model = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus'
                    },
                    { label: 'Open' },
                    { separator: true },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            }
        ];
        fixture.detectChanges();

        const parentEl = fixture.debugElement.query(By.css('.p-menubar-root-list'));
        const firstParentEl = parentEl.query(By.css('.p-menuitem-link'));
        const secondParentEl = parentEl.queryAll(By.css('.p-menuitem-link'))[1];
        firstParentEl.nativeElement.click();
        fixture.detectChanges();

        expect(firstParentEl?.parent?.parent?.nativeElement.classList.contains('p-menuitem-active')).toBe(true);
        expect(secondParentEl?.parent?.parent?.nativeElement.classList.contains('p-menuitem-active')).toBe(false);
    });

    it('should call onItemMouseEnter and not show firstParentMenu', () => {
        menubar.model = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus'
                    },
                    { label: 'Open' },
                    { separator: true },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            }
        ];
        fixture.detectChanges();

        const parentEl = fixture.debugElement.query(By.css('.p-menubar-root-list'));
        const firstParentEl = parentEl.query(By.css('.p-menuitem'));
        const onItemMouseEnterSpy = spyOn(firstParentEl.componentInstance, 'onItemMouseEnter').and.callThrough();
        firstParentEl.children[0].nativeElement.dispatchEvent(new Event('mouseenter'));
        fixture.detectChanges();

        expect(firstParentEl.componentInstance.activeItem).toBeFalsy();
        expect(onItemMouseEnterSpy).toHaveBeenCalled();
        expect(firstParentEl.parent.nativeElement.classList).not.toContain('p-menuitem-active');
    });

    it('should call onItemMouseLeave and not close firstParentMenu', fakeAsync(() => {
        menubar.model = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus'
                    },
                    { label: 'Open' },
                    { separator: true },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            }
        ];
        fixture.detectChanges();

        const parentEl = fixture.debugElement.query(By.css('.p-menubar-root-list'));
        const firstParentEl = parentEl.query(By.css('.p-menuitem-link'));
        firstParentEl.nativeElement.click();
        fixture.detectChanges();

        firstParentEl.nativeElement.dispatchEvent(new Event('mouseleave'));
        tick(300);
        fixture.detectChanges();
        expect(firstParentEl?.parent?.parent?.nativeElement.classList.contains('p-menuitem-active')).toBe(true);
        flush();
    }));

    it('should call itemClick', () => {
        menubar.model = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus'
                    },
                    { label: 'Open' },
                    { separator: true },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            }
        ];
        fixture.detectChanges();

        const parentEl = fixture.debugElement.query(By.css('.p-menubar-root-list'));
        const firstParentEl = parentEl.query(By.css('.p-menuitem-link'));
        const secondParentEl = parentEl.queryAll(By.css('.p-menuitem-link'))[1];
        firstParentEl.nativeElement.click();
        fixture.detectChanges();

        const firstSubmenuList = fixture.debugElement.query(By.css('.p-submenu-list'));
        const firstSubItem = firstSubmenuList.children[0];
        firstSubItem.nativeElement.dispatchEvent(new Event('mouseenter'));
        fixture.detectChanges();

        expect(firstParentEl?.parent?.parent?.nativeElement.className).toContain('p-menuitem-active');
        expect(secondParentEl?.parent?.parent?.nativeElement.className).not.toContain('p-menuitem-active');

    });

    it('should show router items', () => {
        menubar.model = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: 'test'
                    },
                    { label: 'Open' },
                    { separator: true },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            }
        ];
        fixture.detectChanges();

        const parentEl = fixture.debugElement.query(By.css('.p-menubar-root-list'));
        const firstParentEl = parentEl.query(By.css('.p-menuitem-link'));
        firstParentEl.nativeElement.click();
        fixture.detectChanges();
        expect(firstParentEl?.componentInstance.activeItemPath[0].item.label).toEqual(firstParentEl.nativeElement.textContent);
    });

    it('should call itemClick', () => {
        menubar.model = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: 'test'
                    },
                    { label: 'Open' },
                    { separator: true },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            }
        ];
        fixture.detectChanges();

        const parentEl = fixture.debugElement.query(By.css('.p-menubar-root-list'));
        const firstParentEl = parentEl.query(By.css('.p-menuitem-link'));
        firstParentEl.nativeElement.dispatchEvent(new Event('mouseenter'));
        fixture.detectChanges();

        const firstSubmenuList = fixture.debugElement.query(By.css('.p-submenu-list'));
        const firstSubItem = firstSubmenuList.children[0].query(By.css('a'));
        const itemClickSpy = spyOn(firstSubItem.componentInstance, 'onItemClick').and.callThrough();
        firstSubItem.nativeElement.click();
        fixture.detectChanges();

        expect(itemClickSpy).toHaveBeenCalled();
    });

    it('should change item style and styleClass', () => {
        menubar.model = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                style: { height: '300px' },
                styleClass: 'Primeng ROCKS!',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus'
                    },
                    { label: 'Open' },
                    { separator: true },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            }
        ];
        fixture.detectChanges();

        const parentEl = fixture.debugElement.query(By.css('.p-menubar-root-list'));
        const firstParentEl = parentEl.query(By.css('.p-menuitem'));
        firstParentEl.nativeElement.dispatchEvent(new Event('mouseenter'));
        fixture.detectChanges();

        expect(firstParentEl.nativeElement.className).toContain('Primeng ROCKS!');
        expect(firstParentEl.nativeElement.style.height).toContain('300px');
    });

    it('should change item disable', () => {
        menubar.model = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                disabled: true,
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus'
                    },
                    { label: 'Open' },
                    { separator: true },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            }
        ];
        fixture.detectChanges();

        const parentEl = fixture.debugElement.query(By.css('.p-menubar-root-list'));
        const firstParentEl = parentEl.query(By.css('.p-menuitem-link'));
        firstParentEl.nativeElement.dispatchEvent(new Event('mouseenter'));
        fixture.detectChanges();

        expect(firstParentEl.nativeElement.className).toContain('p-disabled');
    });
});
