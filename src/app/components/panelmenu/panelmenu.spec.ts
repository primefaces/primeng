import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PanelMenu, PanelMenuSub } from './panelmenu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { PanelModule } from '../panel/panel';

describe('PanelMenu', () => {
    let panelmenu: PanelMenu;
    let fixture: ComponentFixture<PanelMenu>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, RouterTestingModule, PanelModule]
        });

        fixture = TestBed.createComponent(PanelMenu);
        panelmenu = fixture.componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const panelMenuEl = fixture.debugElement.query(By.css('.p-panelmenu'));
        expect(panelMenuEl).toBeTruthy();
    });

    it('should change style and styleClass', () => {
        panelmenu.style = { height: '300px' };
        panelmenu.styleClass = 'Primeng ROCKS!';
        fixture.detectChanges();

        const panelMenuEl = fixture.debugElement.query(By.css('.p-panelmenu'));
        expect(panelMenuEl.nativeElement.className).toContain('Primeng ROCKS!');
        expect(panelMenuEl.nativeElement.style.height).toContain('300px');
    });

    it('should change item visible ', () => {
        panelmenu.model = [
            {
                label: 'File',
                icon: 'pi pi-pw pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            { label: 'User', icon: 'pi pi-fw pi-user-plus' },
                            { label: 'Filter', icon: 'pi pi-fw pi-filter' }
                        ]
                    },
                    { label: 'Open', icon: 'pi pi-fw pi-external-link' },
                    { separator: true },
                    { label: 'Quit', icon: 'pi pi-fw pi-times' }
                ],
                visible: false
            }
        ];
        fixture.detectChanges();

        const panelEl = fixture.debugElement.query(By.css('.p-panelmenu-panel'));
        expect(panelEl).toBeFalsy();
    });

    it('should change item style styleClass and disable ', () => {
        panelmenu.model = [
            {
                label: 'File',
                icon: 'pi pi-pw pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            { label: 'User', icon: 'pi pi-fw pi-user-plus' },
                            { label: 'Filter', icon: 'pi pi-fw pi-filter' }
                        ]
                    },
                    { label: 'Open', icon: 'pi pi-fw pi-external-link' },
                    { separator: true },
                    { label: 'Quit', icon: 'pi pi-fw pi-times' }
                ],
                style: { height: '300px' },
                styleClass: 'Primeng ROCKS!',
                disabled: true
            }
        ];
        fixture.detectChanges();

        const panelHeaderEl = fixture.debugElement.query(By.css('.p-panelmenu-header'));
        expect(panelHeaderEl.nativeElement.className).toContain('p-disabled');
        expect(panelHeaderEl.nativeElement.className).toContain('Primeng ROCKS!');
        expect(panelHeaderEl.nativeElement.style.height).toContain('300px');
    });

    it('should change item url target item and title', () => {
        panelmenu.model = [
            {
                label: 'File',
                icon: 'Primeng ROCKS!',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            { label: 'User', icon: 'pi pi-fw pi-user-plus' },
                            { label: 'Filter', icon: 'pi pi-fw pi-filter' }
                        ]
                    },
                    { label: 'Open', icon: 'pi pi-fw pi-external-link' },
                    { separator: true },
                    { label: 'Quit', icon: 'pi pi-fw pi-times' }
                ],
                title: 'primeng',
                target: 'primeng',
                url: 'primeng'
            }
        ];
        fixture.detectChanges();

        const panelHeaderLinkEl = fixture.debugElement.query(By.css('.p-panelmenu-header-action'));
        expect(panelHeaderLinkEl.nativeElement.href).toContain('primeng');
        expect(panelHeaderLinkEl.nativeElement.title).toEqual('primeng');
        expect(panelHeaderLinkEl.nativeElement.target).toEqual('primeng');
        expect(panelHeaderLinkEl.query(By.css('.p-menuitem-icon')).nativeElement.className).toContain('Primeng ROCKS!');
    });

    it('should change child visible ', () => {
        panelmenu.model = [
            {
                label: 'File',
                icon: 'pi pi-pw pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        visible: false
                    },
                    { label: 'Open', icon: 'pi pi-fw pi-external-link', visible: false },
                    { separator: true, visible: false },
                    { label: 'Quit', icon: 'pi pi-fw pi-times', visible: false }
                ]
            }
        ];
        fixture.detectChanges();

        const menuItems = fixture.debugElement.queryAll(By.css('.p-menuitem'));
        for (let menuItem of menuItems) expect(menuItem.nativeElement.className).toContain('p-hidden');
    });

    it('should change child style and styleClass', () => {
        panelmenu.model = [
            {
                label: 'File',
                icon: 'pi pi-pw pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        style: { height: '300px' },
                        styleClass: 'Primeng ROCKS!'
                    },
                    { label: 'Open', icon: 'pi pi-fw pi-external-link', style: { height: '300px' }, styleClass: 'Primeng ROCKS!' },
                    { separator: true },
                    { label: 'Quit', icon: 'pi pi-fw pi-times', style: { height: '300px' }, styleClass: 'Primeng ROCKS!' }
                ]
            }
        ];
        fixture.detectChanges();

        const menuItemLinks = fixture.debugElement.queryAll(By.css('.p-menuitem'));
        for (let menuItemLink of menuItemLinks) {
            expect(menuItemLink.nativeElement.className).toContain('Primeng ROCKS!');
            expect(menuItemLink.nativeElement.style.height).toContain('300px');
        }
    });

    it('should change child url target icon disabled and label', () => {
        panelmenu.model = [
            {
                label: 'File',
                icon: 'Primeng ROCKS!',
                items: [
                    {
                        label: 'New',
                        icon: 'Primeng ROCKS!',
                        title: 'primeng',
                        target: 'primeng',
                        url: 'primeng',
                        disabled: true
                    },
                    {
                        label: 'Open',
                        icon: 'Primeng ROCKS!',
                        title: 'primeng',
                        target: 'primeng',
                        url: 'primeng',
                        disabled: true
                    },
                    {
                        label: 'Quit',
                        icon: 'Primeng ROCKS!',
                        title: 'primeng',
                        target: 'primeng',
                        url: 'primeng',
                        disabled: true
                    }
                ]
            }
        ];
        fixture.detectChanges();

        const panelHeaderLinkEl = fixture.debugElement.query(By.css('.p-menuitem-link'));
        expect(panelHeaderLinkEl.nativeElement.href).toContain('primeng');
        expect(panelHeaderLinkEl.nativeElement.target).toEqual('primeng');
        expect(panelHeaderLinkEl.nativeElement.disabled).toBeTruthy;
        expect(panelHeaderLinkEl.query(By.css('.p-menuitem-icon')).nativeElement.className).toContain('Primeng ROCKS!');
        expect(panelHeaderLinkEl.nativeElement.innerHTML).toContain("New");
    });

    it('should show items and call toggle', () => {
        panelmenu.model = [
            {
                label: 'File',
                icon: 'pi pi-pw pi-file',
                items: [{ label: 'Open', icon: 'pi pi-fw pi-external-link' }, { separator: true }, { label: 'Quit', icon: 'pi pi-fw pi-times' }]
            },
            {
                label: 'Edit',
                icon: 'pi pi-pw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            }
        ];
        fixture.detectChanges();

        const handleClickSpy = spyOn(panelmenu, 'onHeaderClick').and.callThrough();
        const headerLinks = fixture.debugElement.queryAll(By.css('.p-panelmenu-header-action'));
        expect(headerLinks.length).toEqual(2);
        headerLinks[0].nativeElement.click();
        fixture.detectChanges();

        const icon = fixture.debugElement.query(By.css('.p-icon'));
        expect(handleClickSpy).toHaveBeenCalled();
        expect(panelmenu.animating).toEqual(true);
        expect(panelmenu.model[0].expanded).toEqual(true);
        expect(icon.nativeElement.tagName.toLowerCase()).toContain('svg');
    });

    it('should select multiple', () => {
        panelmenu.model = [
            {
                label: 'File',
                icon: 'pi pi-pw pi-file',
                items: [{ label: 'Open', icon: 'pi pi-fw pi-external-link' }, { separator: true }, { label: 'Quit', icon: 'pi pi-fw pi-times' }]
            },
            {
                label: 'Edit',
                icon: 'pi pi-pw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            }
        ];
        panelmenu.multiple = true;
        fixture.detectChanges();

        const headerLinks = fixture.debugElement.queryAll(By.css('.p-panelmenu-header-content'));
        headerLinks[0].nativeElement.click();
        headerLinks[1].nativeElement.click();
        fixture.detectChanges();

        const activeEls = fixture.debugElement.queryAll(By.css('.p-highlight'));
        expect(activeEls.length).toEqual(2);
        let x = 0;
        for (let activeEl of activeEls) {
            expect(activeEl.query(By.css('.p-menuitem-text')).nativeElement.textContent).toEqual(panelmenu.model[x].label);
            x++;
        }
        expect(panelmenu.model[0].expanded).toEqual(true);
        expect(panelmenu.model[1].expanded).toEqual(true);
    });

    it('should not select multiple', () => {
        panelmenu.model = [
            {
                label: 'File',
                icon: 'pi pi-pw pi-file',
                items: [{ label: 'Open', icon: 'pi pi-fw pi-external-link' }, { separator: true }, { label: 'Quit', icon: 'pi pi-fw pi-times' }]
            },
            {
                label: 'Edit',
                icon: 'pi pi-pw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            }
        ];
        panelmenu.multiple = false;
        fixture.detectChanges();

        const headerLinks = fixture.debugElement.queryAll(By.css('.p-panelmenu-header-content'));
        headerLinks[0].nativeElement.click();
        headerLinks[1].nativeElement.click();
        fixture.detectChanges();

        const activeEls = fixture.debugElement.queryAll(By.css('.p-highlight'));
        expect(activeEls.length).toEqual(1);
        expect(activeEls[0].query(By.css('.p-menuitem-text')).nativeElement.textContent).toEqual(panelmenu.model[1].label);
        expect(panelmenu.model[0].expanded).toEqual(false);
        expect(panelmenu.model[1].expanded).toEqual(true);
    });
});
