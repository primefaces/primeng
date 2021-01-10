import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SlideMenu, SlideMenuSub } from './slidemenu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuItem } from 'primeng/api';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ButtonModule } from '../button/button';

@Component({
	template: `<p-slideMenu #menu></p-slideMenu>
  <button #btn type="button" pButton icon="pi pi-bars" label="Show" (click)="menu.toggle($event)"></button>
  `
})
class SlideMenuTestComponent {
}

describe('SlideMenu', () => {

	let slidemenu: SlideMenu;
	let slidemenuSub: SlideMenuSub;
	let fixture: ComponentFixture<SlideMenuTestComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			imports: [
				NoopAnimationsModule,
				RouterTestingModule,
				ButtonModule
			],
			declarations: [
				SlideMenu,
				SlideMenuSub,
				SlideMenuTestComponent
			]
		});

		fixture = TestBed.createComponent(SlideMenuTestComponent);
		slidemenu = fixture.debugElement.children[0].componentInstance;
		slidemenu.model = [
			{
				label: 'File',
				icon: 'pi pi-fw pi-file',
				items: [{
					label: 'New',
					icon: 'pi pi-fw pi-plus',
					command: () => { }
				},
				{ label: 'Open' },
				{ separator: true },
				{ label: 'Quit' }
				]
			},
			{
				label: 'Edit',
				icon: 'pi pi-fw pi-pencil',
				disabled: true
			}];
		fixture.detectChanges();
		slidemenuSub = fixture.debugElement.children[0].query(By.css('p-slideMenuSub')).componentInstance;
	});

	it('should created by default', () => {
		fixture.detectChanges();

		const containerEl = fixture.debugElement.query(By.css('.p-slidemenu'));
		const slideMenuSubEl = fixture.debugElement.query(By.css('ul'));
		expect(containerEl.nativeElement).toBeTruthy();
		expect(slideMenuSubEl).toBeTruthy();
	});

	it('should change style and styleClass', () => {
		slidemenu.style = { 'height': '300px' };
		slidemenu.styleClass = "Primeng ROCKS!";
		fixture.detectChanges();

		slidemenu.cd.detectChanges();
		const containerEl = fixture.debugElement.query(By.css('.p-slidemenu'));
		expect(containerEl.nativeElement.className).toContain("Primeng ROCKS!");
		expect(containerEl.nativeElement.style.height).toEqual("300px");
	});

	it('should change viewportHeight', () => {
		slidemenu.viewportHeight = 400;
		fixture.detectChanges();

		const wrapperEl = fixture.debugElement.query(By.css('.p-slidemenu-wrapper'));
		expect(wrapperEl.nativeElement.style.height).toEqual("auto");
	});

	it('should change backlabel', () => {
		slidemenu.backLabel = "ALWAYS BET ON PRIME";
		fixture.detectChanges();

		slidemenu.cd.detectChanges();
		const backwardSpanEl = fixture.debugElement.query(By.css('.p-slidemenu-backward')).queryAll(By.css('span'))[1];
		expect(backwardSpanEl.nativeElement.textContent).toEqual("ALWAYS BET ON PRIME");
	});

	it('should change menuWidth effectDuration and easing', () => {
		slidemenu.menuWidth = 400;
		slidemenu.effectDuration = 400;
		slidemenu.easing = 'ease-in';
		fixture.detectChanges();

		slidemenu.cd.detectChanges();
		const slideMenuSubEl = fixture.debugElement.query(By.css('p-slideMenuSub')).query(By.css('ul'));
		expect(slidemenuSub.easing).toEqual(slidemenu.easing);
		expect(slidemenuSub.effectDuration).toEqual(slidemenu.effectDuration);
		expect(slidemenuSub.easing).toEqual(slidemenu.easing);
		expect(slideMenuSubEl.nativeElement.style.transitionTimingFunction).toEqual(slidemenu.easing);
		expect(slideMenuSubEl.nativeElement.style.transitionDuration).toEqual(slidemenu.effectDuration + "ms");
		expect(slideMenuSubEl.nativeElement.style.width).toEqual(slidemenu.menuWidth + "px");
	});

	it('should show items', () => {
		fixture.detectChanges();

		const firstSlidemenuSubEl = fixture.debugElement.query(By.css('p-slideMenuSub')).query(By.css('ul'));
		const itemsEl = fixture.debugElement.query(By.css('p-slideMenuSub')).queryAll(By.css('li'));
		expect(firstSlidemenuSubEl.children.length).toEqual(slidemenu.model.length);
		expect(itemsEl.length).toEqual(6);
		let i = 0;
		for (let item of slidemenu.model) {
			expect(item.label).toEqual(itemsEl[i].query(By.css('.p-menuitem-text')).nativeElement.textContent);
			i++;
			if (item.items) {
				for (let child of item.items as MenuItem[]) {
					if (child.label)
						expect(child.label).toEqual(itemsEl[i].query(By.css('.p-menuitem-text')).nativeElement.textContent);
					i++;
				}
			}
		}
	});

	it('should call itemClick when click and change menu from root to submenu', () => {
		fixture.detectChanges();

		const listsEl = fixture.debugElement.queryAll(By.css('ul'));
		const itemsEl = fixture.debugElement.query(By.css('p-slideMenuSub')).queryAll(By.css('li'));
		const fileItemEl = itemsEl[0].query(By.css('a'));
		const itemClickSpy = spyOn(slidemenuSub, 'itemClick').and.callThrough();
		fileItemEl.nativeElement.click();
		fixture.detectChanges();

		const activeItem = fixture.debugElement.query(By.css('.p-menuitem-active'));
		expect(activeItem.query(By.css('.p-menuitem-text')).nativeElement.textContent).toEqual('File');
		expect(itemClickSpy).toHaveBeenCalled();
		expect(activeItem.query(By.css('ul')).nativeElement.className).toContain('p-active-submenu');
		expect(slidemenu.left).toEqual(-190);
	});

	it('should call goBack when click and change menu from subMenu to root', () => {
		fixture.detectChanges();

		const listsEl = fixture.debugElement.queryAll(By.css('ul'));
		const itemsEl = fixture.debugElement.query(By.css('p-slideMenuSub')).queryAll(By.css('li'));
		const fileItemEl = itemsEl[0].query(By.css('a'));
		const goBackSpy = spyOn(slidemenu, 'goBack').and.callThrough();
		fileItemEl.nativeElement.click();
		fixture.detectChanges();

		const backEl = fixture.debugElement.query(By.css('.p-slidemenu-backward'));
		backEl.nativeElement.click();
		fixture.detectChanges();

		const rootMenu = listsEl[0];
		const subMenu = listsEl[1];
		expect(goBackSpy).toHaveBeenCalled();
		expect(subMenu.nativeElement.className).not.toContain('p-submenu-list p-active-submenu');
		expect(rootMenu.nativeElement.className).toContain('p-slidemenu-rootlist p-active-submenu');
		expect(slidemenu.left).toEqual(0);
	});

	it('should click disabled item', () => {
		fixture.detectChanges();

		const listsEl = fixture.debugElement.queryAll(By.css('ul'));
		const itemsEl = fixture.debugElement.query(By.css('p-slideMenuSub')).queryAll(By.css('li'));
		const itemClickSpy = spyOn(slidemenuSub, 'itemClick').and.callThrough();
		const editItemEl = itemsEl[5].query(By.css('a'));
		editItemEl.nativeElement.click();
		fixture.detectChanges();

		const rootMenu = listsEl[0];
		const subMenu = listsEl[1];
		expect(subMenu.nativeElement.className).not.toContain('p-submenu-list p-active-submenu');
		expect(rootMenu.nativeElement.className).toContain('p-slidemenu-rootlist p-active-submenu');
		expect(slidemenu.left).toEqual(0);
		expect(slidemenuSub.activeItem).toEqual(undefined);
		expect(itemClickSpy).toHaveBeenCalled();
	});

	it('should click item (command)', () => {
		fixture.detectChanges();

		const itemsEl = fixture.debugElement.query(By.css('p-slideMenuSub')).queryAll(By.css('li'));
		const newItemEl = itemsEl[1].query(By.css('a'));
		newItemEl.nativeElement.click();
		fixture.detectChanges();

		expect(slidemenu.left).toEqual(0);
		expect(slidemenuSub.activeItem).toEqual(undefined);
	});

	it('should open popup', fakeAsync(() => {
		fixture.detectChanges();

		const toggleButton = fixture.debugElement.children[1].nativeElement;
		slidemenu.popup = true;
		slidemenu.target = toggleButton;
		slidemenu.visible = true;
		fixture.detectChanges();

		const slideMenuEl = fixture.debugElement.query(By.css('.p-slidemenu'));
		expect(slidemenu.visible).toEqual(true);
		expect(slideMenuEl).toBeTruthy();
	}));

	it('should use appendTo', fakeAsync(() => {
		slidemenu.appendTo = "body";
		fixture.detectChanges();

		const toggleButton = fixture.debugElement.children[1].nativeElement;
		slidemenu.popup = true;
		slidemenu.target = toggleButton;
		slidemenu.visible = true;
		fixture.detectChanges();

		const slideMenuEl = fixture.debugElement.query(By.css('.p-slidemenu'));
		expect(slidemenu.visible).toEqual(true);
		expect(slideMenuEl).toBeTruthy();
	}));

	it('should use appendTo with elemntRef', fakeAsync(() => {
		slidemenu.appendTo = document.body;
		fixture.detectChanges();

		const toggleButton = fixture.debugElement.children[1].nativeElement;
		slidemenu.popup = true;
		slidemenu.target = toggleButton;
		slidemenu.visible = true;
		fixture.detectChanges();

		const slideMenuEl = fixture.debugElement.query(By.css('.p-slidemenu'));
		expect(slidemenu.visible).toEqual(true);
		expect(slideMenuEl).toBeTruthy();
	}));
});
