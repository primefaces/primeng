import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TabMenu } from './tabmenu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('TabMenu', () => {

	let tabmenu: TabMenu;
	let fixture: ComponentFixture<TabMenu>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NoopAnimationsModule,
				RouterTestingModule.withRoutes([
					{ path: 'test', component: TabMenu }
				]),
			],
			declarations: [
				TabMenu
			]
		});

		fixture = TestBed.createComponent(TabMenu);
		tabmenu = fixture.componentInstance;
	});

	it('should created by default', () => {
		fixture.detectChanges();

		const tabmenuEl = fixture.debugElement.query(By.css('div')).nativeElement;
		expect(tabmenuEl).toBeTruthy();
	});

	it('should change style and styleClass', () => {
		tabmenu.style = { 'height': '300px' };
		tabmenu.styleClass = "Primeng ROCKS!";
		fixture.detectChanges();

		const tabmenuEl = fixture.debugElement.query(By.css('div')).nativeElement;
		expect(tabmenuEl.className).toContain("Primeng ROCKS!");
		expect(tabmenuEl.style.height).toContain("300px");
	});

	it('should not show items ', () => {
		tabmenu.model = [
			{ label: 'Stats', icon: 'pi pi-fw pi-bar-chart', visible: false },
			{ label: 'Calendar', icon: 'pi pi-fw pi-calendar', visible: false }
		];
		fixture.detectChanges();

		const itemList = fixture.debugElement.query(By.css('ul'));
		expect(itemList.children[0].nativeElement.className).toContain("p-hidden");
		expect(itemList.children[1].nativeElement.className).toContain("p-hidden");
	});

	it('should show disabled items ', () => {
		tabmenu.model = [
			{ label: 'Stats', icon: 'pi pi-fw pi-bar-chart', disabled: true },
			{ label: 'Calendar', icon: 'pi pi-fw pi-calendar', disabled: true }
		];
		fixture.detectChanges();

		const itemList = fixture.debugElement.query(By.css('ul'));
		expect(itemList.children[0].nativeElement.className).toContain("p-disabled");
		expect(itemList.children[1].nativeElement.className).toContain("p-disabled");
	});

	it('should show items and icons (url)', () => {
		tabmenu.model = [
			{ label: 'Stats', icon: 'pi pi-fw pi-bar-chart' },
			{ label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
			{ label: 'Documentation', icon: 'pi pi-fw pi-book' },
			{ label: 'Support', icon: 'pi pi-fw pi-support' },
			{ label: 'Social', icon: 'pi pi-fw pi-twitter' }
		];
		fixture.detectChanges();

		const itemList = fixture.debugElement.query(By.css('ul'));
		const itemEls = itemList.queryAll(By.css('li:not(.p-tabmenu-ink-bar)'))
		expect(itemEls.length).toEqual(5);
		expect(itemList.query(By.css('.p-menuitem-icon'))).toBeTruthy();
		expect(itemList.query(By.css('.p-menuitem-text'))).toBeTruthy();
	});

	it('should show items and icons (routerLink)', () => {
		tabmenu.model = [
			{ label: 'Stats', icon: 'pi pi-fw pi-bar-chart', routerLink: 'test' },
			{ label: 'Calendar', icon: 'pi pi-fw pi-calendar', routerLink: 'test' },
			{ label: 'Documentation', icon: 'pi pi-fw pi-book', routerLink: 'test' },
			{ label: 'Support', icon: 'pi pi-fw pi-support', routerLink: 'test' },
			{ label: 'Social', icon: 'pi pi-fw pi-twitter', routerLink: 'test' }
		];
		fixture.detectChanges();

		const itemList = fixture.debugElement.query(By.css('ul'));
		const itemEls = itemList.queryAll(By.css('li:not(.p-tabmenu-ink-bar)'))
		expect(itemEls.length).toEqual(5);
		for (let x = 0; x < 5; x++) {
			expect(itemList.children[x].nativeElement.innerHTML).toContain("ng-reflect-router-link");
		}
		expect(itemList.query(By.css('.p-menuitem-icon'))).toBeTruthy();
		expect(itemList.query(By.css('.p-menuitem-text'))).toBeTruthy();
	});

	it('should select item when click (url)', () => {
		tabmenu.model = [
			{ label: 'Stats', icon: 'pi pi-fw pi-bar-chart' },
			{ label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
			{ label: 'Documentation', icon: 'pi pi-fw pi-book' },
			{ label: 'Support', icon: 'pi pi-fw pi-support' },
			{ label: 'Social', icon: 'pi pi-fw pi-twitter' }
		];
		const itemClickSpy = spyOn(tabmenu, 'itemClick').and.callThrough();
		fixture.detectChanges();

		const itemList = fixture.debugElement.query(By.css('ul'));
		const calenderItem = itemList.children[1].children[0].nativeElement;
		calenderItem.click();
		fixture.detectChanges();

		expect(itemList.children[1].nativeElement.className).toContain("p-highlight")
		expect(tabmenu.activeItem.label).toEqual('Calendar');
		expect(tabmenu.activeItem.icon).toContain('pi-calendar');
		expect(itemClickSpy).toHaveBeenCalled();
	});

	it('should select item and highlight with routerLinkActive when click (routerLink)', () => {
		tabmenu.model = [
			{ label: 'Stats', icon: 'pi pi-fw pi-bar-chart', routerLink: 'test' },
			{ label: 'Calendar', icon: 'pi pi-fw pi-calendar', routerLink: 'test' },
			{ label: 'Documentation', icon: 'pi pi-fw pi-book', routerLink: 'test' },
			{ label: 'Support', icon: 'pi pi-fw pi-support', routerLink: 'test' },
			{ label: 'Social', icon: 'pi pi-fw pi-twitter', routerLink: 'test' }
		];
		const itemClickSpy = spyOn(tabmenu, 'itemClick').and.callThrough();
		fixture.detectChanges();

		const itemList = fixture.debugElement.query(By.css('ul'));
		const calenderItem = itemList.children[1].children[0].nativeElement;
		calenderItem.click();
		fixture.detectChanges();

		expect(itemList.children[1].nativeElement.className).toContain("p-highlight")
		expect(tabmenu.activeItem.label).toEqual('Calendar');
		expect(tabmenu.activeItem.icon).toContain('pi-calendar');
		expect(itemClickSpy).toHaveBeenCalled();
	});

	it('shouldn\'t show content', () => {
		tabmenu.model = [
			{ label: 'Stats', icon: 'pi pi-fw pi-bar-chart', disabled: true },
			{ label: 'Calendar', icon: 'pi pi-fw pi-calendar', disabled: true }
		];
		fixture.detectChanges();

		const itemList = fixture.debugElement.query(By.css('ul'));
		expect(itemList.children[0].nativeElement.className).toContain("p-disabled");
		expect(itemList.children[1].nativeElement.className).toContain("p-disabled");
		const calenderItem = itemList.children[1].children[0].nativeElement;
		calenderItem.click();
		fixture.detectChanges();

		expect(itemList.children[1].nativeElement.className).not.toContain("p-highlight")
	});

	it('should use command', () => {
		let x;
		tabmenu.model = [
			{ label: 'Stats', icon: 'pi pi-fw pi-bar-chart', disabled: true },
			{
				label: 'Calendar', icon: 'pi pi-fw pi-calendar', command: () => {
					x = "PRIMENG!"
				}
			}
		];
		fixture.detectChanges();

		const itemList = fixture.debugElement.query(By.css('ul'));
		const calenderItem = itemList.children[1].children[0].nativeElement;
		calenderItem.click();
		fixture.detectChanges();

		expect(x).toEqual("PRIMENG!");
	});
});
