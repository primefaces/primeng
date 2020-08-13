import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TieredMenu, TieredMenuSub } from './tieredmenu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('TieredMenu', () => {

	let tieredmenu: TieredMenu;
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
		tieredmenu.style = { 'height': '300px' };
		fixture.detectChanges();

		const tieredmenuEl = fixture.debugElement.query(By.css('div'));
		const styleEl = tieredmenuEl.styles.height;
		expect(tieredmenuEl.nativeElement.className).toContain("Primeng ROCKS!");
		expect(styleEl).toEqual("300px");
	});

	it('should change autoZindex', () => {
		tieredmenu.model = [
			{
				label: 'File',
				items: [{
					label: 'New',
					icon: 'pi pi-fw pi-plus',
					items: [
						{ label: 'Project' },
						{ label: 'Other' },
					]
				},
				{ label: 'Open' },
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
		tieredmenu.autoZIndex = true;
		fixture.detectChanges();

		const subMenuEl = fixture.debugElement.query(By.css('p-tieredMenuSub')).componentInstance;
		expect(subMenuEl.autoZIndex).toEqual(true);
	});

	it('should change baseZIndex', () => {
		tieredmenu.model = [
			{
				label: 'File',
				items: [{
					label: 'New',
					icon: 'pi pi-fw pi-plus',
					items: [
						{ label: 'Project' },
						{ label: 'Other' },
					]
				},
				{ label: 'Open' },
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
						{ label: 'Project' },
						{ label: 'Other' },
					]
				},
				{ label: 'Open' },
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
						{ label: 'Project' },
						{ label: 'Other' },
					],
					command: () => { }
				},
				{ label: 'Open' },
				{ label: 'Quit' }
				]
			},
			{
				label: 'Edit',
				icon: 'pi pi-fw pi-pencil',
				items: [
					{ label: 'Delete', icon: 'pi pi-fw pi-trash' },
					{ label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
				],
				disabled: true
			}
		];
		fixture.detectChanges();

		const subMenuComponent = fixture.debugElement.query(By.css('p-tieredMenuSub')).componentInstance as TieredMenuSub;
		const itemClickSpy = spyOn(subMenuComponent, 'itemClick').and.callThrough();
		const items = fixture.debugElement.query(By.css('ul'));
		const fileItemEl = items.children[0].query(By.css('a')).nativeElement;
		const editItemEl = items.children[1].query(By.css('a')).nativeElement;
		const newItemEl = items.children[0].queryAll(By.css('a'))[1].nativeElement;
		fileItemEl.click();
		fixture.detectChanges();

		newItemEl.click();
		fixture.detectChanges();

		editItemEl.click();
		fixture.detectChanges();

		expect(itemClickSpy).toHaveBeenCalled();
	});

	it('should select with popup', () => {
		tieredmenu.model = [
			{
				label: 'File',
				items: [{
					label: 'New',
					icon: 'pi pi-fw pi-plus',
					items: [
						{ label: 'Project' },
						{ label: 'Other' },
					]
				},
				{ label: 'Open' },
				{ label: 'Quit' }
				]
			},
			{
				label: 'Edit',
				icon: 'pi pi-fw pi-pencil',
			}
		];
		tieredmenu.popup = true;
		tieredmenu.appendTo = "body";
		fixture.detectChanges();

		const showSpy = spyOn(tieredmenu, 'show').and.callThrough();
		const hideSpy = spyOn(tieredmenu, 'hide').and.callThrough();
		let event = { 'currentTarget': document.body };
		tieredmenu.toggle(event);
		fixture.detectChanges();

		const tieredmenuEl = fixture.debugElement.query(By.css('div'));
		expect(tieredmenuEl).toBeTruthy();
		const subMenuComponent = fixture.debugElement.query(By.css('p-tieredMenuSub')).componentInstance as TieredMenuSub;
		const itemClickSpy = spyOn(subMenuComponent, 'itemClick').and.callThrough();
		const items = fixture.debugElement.query(By.css('ul'));
		const editItemEl = items.children[1].query(By.css('a')).nativeElement;
		editItemEl.click();
		fixture.detectChanges();

		expect(itemClickSpy).toHaveBeenCalled();
		expect(showSpy).toHaveBeenCalled();
		expect(hideSpy).toHaveBeenCalled();
	});

	it('should use popup with diffrent appendTo', () => {
		tieredmenu.model = [
			{
				label: 'File',
				items: [{
					label: 'New',
					icon: 'pi pi-fw pi-plus',
					items: [
						{ label: 'Project' },
						{ label: 'Other' },
					]
				},
				{ label: 'Open' },
				{ label: 'Quit' }
				]
			},
			{
				label: 'Edit',
				icon: 'pi pi-fw pi-pencil',
			}
		];
		tieredmenu.popup = true;
		tieredmenu.appendTo = document.body;
		fixture.detectChanges();

		const showSpy = spyOn(tieredmenu, 'show').and.callThrough();
		const hideSpy = spyOn(tieredmenu, 'hide').and.callThrough();
		let event = { 'currentTarget': document.body };
		tieredmenu.toggle(event);
		fixture.detectChanges();

		const tieredmenuEl = fixture.debugElement.query(By.css('div'));
		expect(tieredmenuEl).toBeTruthy();
		const subMenuComponent = fixture.debugElement.query(By.css('p-tieredMenuSub')).componentInstance as TieredMenuSub;
		const itemClickSpy = spyOn(subMenuComponent, 'itemClick').and.callThrough();
		const items = fixture.debugElement.query(By.css('ul'));
		const editItemEl = items.children[1].query(By.css('a')).nativeElement;
		editItemEl.click();
		fixture.detectChanges();

		expect(itemClickSpy).toHaveBeenCalled();
		expect(showSpy).toHaveBeenCalled();
		expect(hideSpy).toHaveBeenCalled();
	});

	it('should call onItemMouseEnter when mouseenter (on root)', () => {
		tieredmenu.model = [
			{
				label: 'File',
				items: [{
					label: 'New',
					icon: 'pi pi-fw pi-plus',
					items: [
						{ label: 'Project' },
						{ label: 'Other' },
					]
				},
				{ label: 'Open' },
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

		const subMenuComponent = fixture.debugElement.query(By.css('p-tieredMenuSub')).componentInstance as TieredMenuSub;
		const onItemMouseEnter = spyOn(subMenuComponent, 'onItemMouseEnter').and.callThrough();
		const items = fixture.debugElement.query(By.css('ul'));
		const fileItemEl = items.children[0].nativeElement;
		const secondSubMenu = items.children[0].query(By.css("p-tieredMenuSub")).query(By.css('ul'));
		const event = new Event('mouseenter');
		fileItemEl.dispatchEvent(event);
		fixture.detectChanges();

		expect(onItemMouseEnter).toHaveBeenCalled();
		expect(secondSubMenu.children.length).toEqual(3);
		expect(subMenuComponent.activeItem).toBeNull();
	});

	it('should call onItemMouseEnter and do nothing', () => {
		tieredmenu.model = [
			{
				label: 'File',
				items: [{
					label: 'New',
					icon: 'pi pi-fw pi-plus',
					items: [
						{ label: 'Project' },
						{ label: 'Other' },
					]
				},
				{ label: 'Open' },
				{ label: 'Quit' }
				],
				disabled: true
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

		const subMenuComponent = fixture.debugElement.query(By.css('p-tieredMenuSub')).componentInstance as TieredMenuSub;
		const onItemMouseEnter = spyOn(subMenuComponent, 'onItemMouseEnter').and.callThrough();
		const items = fixture.debugElement.query(By.css('ul'));
		const fileItemEl = items.children[0].nativeElement;
		const event = new Event('mouseenter');
		fileItemEl.dispatchEvent(event);
		fixture.detectChanges();

		expect(onItemMouseEnter).toHaveBeenCalled();
		expect(fileItemEl.className).not.toContain("p-menuitem-active");
		expect(subMenuComponent.activeItem).toBeNull();
	});

	it('should call onItemMouseLeave when mouseleave', fakeAsync(() => {
		tieredmenu.model = [
			{
				label: 'File',
				items: [{
					label: 'New',
					icon: 'pi pi-fw pi-plus',
					items: [
						{ label: 'Project' },
						{ label: 'Other' },
					]
				},
				{ label: 'Open' },
				{ label: 'Quit' }
				]
			},
			{
				label: 'Edit',
				icon: 'pi pi-fw pi-pencil',
				items: [
					{ label: 'Delete', icon: 'pi pi-fw pi-trash' },
					{ label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
				],
				disabled: true
			}
		];
		fixture.detectChanges();

		const subMenuComponent = fixture.debugElement.query(By.css('p-tieredMenuSub')).componentInstance as TieredMenuSub;
		document.dispatchEvent(new Event('click'));
		const items = fixture.debugElement.query(By.css('ul'));
		const fileItemEl = items.children[0];
		const mouseenter = new Event('mouseenter');
		fileItemEl.nativeElement.dispatchEvent(mouseenter);
		fixture.detectChanges();

		expect(fileItemEl.nativeElement.className).not.toContain("p-menuitem-active");
		expect(subMenuComponent.activeItem).toEqual(null);
		fileItemEl.children[0].nativeElement.dispatchEvent(new Event('click'));
		fixture.detectChanges();

		expect(fileItemEl.nativeElement.className).toContain("p-menuitem-active");
		expect(subMenuComponent.activeItem).toBeTruthy();
	}));

});
