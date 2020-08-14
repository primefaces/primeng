import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Menubar, MenubarSub } from './menubar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

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

		const menuEl = fixture.debugElement.query(By.css('.p-menubar'));
		const subMenuEl = fixture.debugElement.query(By.css('.p-menubar-root-list'));
		expect(menuEl).toBeTruthy();
		expect(subMenuEl).toBeTruthy();
	});

	it('should change style and styleClass', () => {
		menubar.style = { 'height': '300px' };
		menubar.styleClass = "Primeng ROCKS!";
		fixture.detectChanges();

		const menuEl = fixture.debugElement.query(By.css('.p-menubar'));
		expect(menuEl.nativeElement.className).toContain("Primeng ROCKS!");
		expect(menuEl.nativeElement.style.height).toContain("300px");
	});

	it('should change autoDisplay baseZIndex and autoZIndex', () => {
		menubar.autoZIndex = false;
		menubar.baseZIndex = 20;
		fixture.detectChanges();

		const subMenu = fixture.debugElement.query(By.css('.p-menubar-root-list')).componentInstance as MenubarSub;
		expect(subMenu.baseZIndex).toEqual(20);
		expect(subMenu.autoZIndex).toEqual(false);
		expect(subMenu.autoDisplay).toBeUndefined();
		expect(subMenu.autoDisplay).toEqual(menubar.autoDisplay);
		expect(subMenu.autoZIndex).toEqual(menubar.autoZIndex);
		expect(subMenu.baseZIndex).toEqual(menubar.baseZIndex);
	});

	it('should show items', () => {
		menubar.model = [
			{
				label: 'File',
				icon: 'pi pi-file pi-fw',
				items: [{
					label: 'New',
					icon: 'pi pi-fw pi-plus',
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
				expect(parentMenu.query(By.css('.p-menuitem-text')).nativeElement.textContent).toEqual(menubar.model[i].label)
			}
			if (menubar.model[i].icon) {
				expect(parentMenu.query(By.css('.p-menuitem-icon')).nativeElement.className).toContain(menubar.model[i].icon)
			}
			i++;
		}
	});

	it('should call click and show firstParentMenu', () => {
		menubar.model = [
			{
				label: 'File',
				icon: 'pi pi-fw pi-file',
				items: [{
					label: 'New',
					icon: 'pi pi-fw pi-plus',
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
		firstParentEl.nativeElement.dispatchEvent(new Event('click'));
		fixture.detectChanges();

		expect(firstParentEl.parent.nativeElement.className).toContain('p-menuitem-active');
		expect(secondParentEl.parent.nativeElement.className).not.toContain('p-menuitem-active');
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
		firstParentEl.nativeElement.dispatchEvent(new Event('click'));
		fixture.detectChanges();

		firstParentEl.nativeElement.dispatchEvent(new Event('mouseleave'));
		fixture.detectChanges();

		expect(firstParentEl.parent.nativeElement.className).toContain('p-menuitem-active');
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
		firstParentEl.nativeElement.dispatchEvent(new Event('click'));
		fixture.detectChanges();

		const firstSubmenuList = fixture.debugElement.query(By.css('.p-submenu-list'));
		const firstSubItem = firstSubmenuList.query(By.css('.p-menuitem-link'));
		firstSubItem.nativeElement.click();
		fixture.detectChanges();

		expect(firstParentEl.componentInstance.activeItem).toEqual(null);
		expect(secondParentEl.componentInstance.activeItem).toEqual(null);
		expect(firstParentEl.parent.nativeElement.className).not.toContain('p-menuitem-active');
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
		firstParentEl.nativeElement.dispatchEvent(new Event('mouseenter'));
		fixture.detectChanges();

		expect(firstParentEl.componentInstance.activeItem).toBeFalsy();
		expect(onItemMouseEnterSpy).toHaveBeenCalled();
		expect(firstParentEl.parent.nativeElement.className).not.toContain('p-menuitem-active');
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

		expect(firstParentEl.parent.nativeElement.className).toContain('p-menuitem-active');
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
		const bindEventListenerSpy = spyOn(firstParentEl.componentInstance, 'bindDocumentClickListener').and.callThrough();
		firstParentEl.nativeElement.click();
		fixture.detectChanges();

		const firstSubmenuList = fixture.debugElement.query(By.css('.p-submenu-list'));
		const firstSubItem = firstSubmenuList.children[0];
		firstSubItem.nativeElement.dispatchEvent(new Event('mouseenter'));
		fixture.detectChanges();

		expect(bindEventListenerSpy).toHaveBeenCalled();
		expect(firstParentEl.parent.nativeElement.className).toContain('p-menuitem-active');
	});

	it('should show router items', () => {
		menubar.model = [
			{
				label: 'File',
				icon: 'pi pi-fw pi-file',
				items: [{
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
		firstParentEl.nativeElement.dispatchEvent(new Event('click'));
		fixture.detectChanges();

		expect(firstParentEl.componentInstance.activeItem.label).toEqual(firstParentEl.nativeElement.textContent);
	});

	it('should call itemClick', () => {
		menubar.model = [
			{
				label: 'File',
				icon: 'pi pi-fw pi-file',
				items: [{
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
				style: { 'height': '300px' },
				styleClass: "Primeng ROCKS!",
				items: [{
					label: 'New',
					icon: 'pi pi-fw pi-plus',
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

		expect(firstParentEl.nativeElement.className).toContain("Primeng ROCKS!");
		expect(firstParentEl.nativeElement.style.height).toContain("300px");
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
