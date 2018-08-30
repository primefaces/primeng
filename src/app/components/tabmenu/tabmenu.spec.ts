import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TabMenu } from './tabmenu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '../../../../node_modules/@angular/router/testing';

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
      tabmenu.style = {'primeng' : 'rocks!'};
      tabmenu.styleClass = "Primeng ROCKS!";
      fixture.detectChanges();

      const tabmenuEl = fixture.debugElement.query(By.css('div')).nativeElement;
      expect(tabmenuEl.className).toContain("Primeng ROCKS!");
      expect(tabmenuEl.style.primeng).toContain("rocks!");
    });

    it('should not show items ', () => {
      tabmenu.model = [
        {label: 'Stats', icon: 'fa fa-fw fa-bar-chart', visible:false},
        {label: 'Calendar', icon: 'fa fa-fw fa-calendar', visible:false}
      ]; 
      fixture.detectChanges();

      const itemList = fixture.debugElement.query(By.css('ul'));
      expect(itemList.children[0].nativeElement.className).toContain("ui-helper-hidden");
      expect(itemList.children[1].nativeElement.className).toContain("ui-helper-hidden");
    });

    it('should show disabled items ', () => {
      tabmenu.model = [
        {label: 'Stats', icon: 'fa fa-fw fa-bar-chart', disabled:true},
        {label: 'Calendar', icon: 'fa fa-fw fa-calendar', disabled:true}
      ]; 
      fixture.detectChanges();

      const itemList = fixture.debugElement.query(By.css('ul'));
      expect(itemList.children[0].nativeElement.className).toContain("ui-state-disabled");
      expect(itemList.children[1].nativeElement.className).toContain("ui-state-disabled");
    });

    it('should show items and icons (url)', () => {
      tabmenu.model = [
        {label: 'Stats', icon: 'fa fa-fw fa-bar-chart'},
        {label: 'Calendar', icon: 'fa fa-fw fa-calendar'},
        {label: 'Documentation', icon: 'fa fa-fw fa-book'},
        {label: 'Support', icon: 'fa fa-fw fa-support'},
        {label: 'Social', icon: 'fa fa-fw fa-twitter'}
      ]; 
      fixture.detectChanges();

      const itemList = fixture.debugElement.query(By.css('ul'));
      expect(itemList.children.length).toEqual(5);
      expect(itemList.query(By.css('.ui-menuitem-icon'))).toBeTruthy();
      expect(itemList.query(By.css('.ui-menuitem-text'))).toBeTruthy();
    });

    it('should show items and icons (routerLink)', () => {
      tabmenu.model = [
        {label: 'Stats', icon: 'fa fa-fw fa-bar-chart', routerLink: 'test'},
        {label: 'Calendar', icon: 'fa fa-fw fa-calendar', routerLink: 'test'},
        {label: 'Documentation', icon: 'fa fa-fw fa-book', routerLink: 'test'},
        {label: 'Support', icon: 'fa fa-fw fa-support', routerLink: 'test'},
        {label: 'Social', icon: 'fa fa-fw fa-twitter', routerLink: 'test'}
      ]; 
      fixture.detectChanges();

      const itemList = fixture.debugElement.query(By.css('ul'));
      expect(itemList.children.length).toEqual(5);
      for(let x = 0; x<5; x++){
        expect(itemList.children[x].nativeElement.innerHTML).toContain("ng-reflect-router-link");
      }
      expect(itemList.query(By.css('.ui-menuitem-icon'))).toBeTruthy();
      expect(itemList.query(By.css('.ui-menuitem-text'))).toBeTruthy();
    });

    it('should select item when click (url)', () => {
      tabmenu.model = [
        {label: 'Stats', icon: 'fa fa-fw fa-bar-chart'},
        {label: 'Calendar', icon: 'fa fa-fw fa-calendar'},
        {label: 'Documentation', icon: 'fa fa-fw fa-book'},
        {label: 'Support', icon: 'fa fa-fw fa-support'},
        {label: 'Social', icon: 'fa fa-fw fa-twitter'}
      ]; 
      const itemClickSpy = spyOn(tabmenu, 'itemClick').and.callThrough();
      fixture.detectChanges();

      const itemList = fixture.debugElement.query(By.css('ul'));
      const calenderItem = itemList.children[1].children[0].nativeElement;
      calenderItem.click();
      fixture.detectChanges();

      expect(itemList.children[1].nativeElement.className).toContain("ui-state-active")
      expect(tabmenu.activeItem.label).toEqual('Calendar');
      expect(tabmenu.activeItem.icon).toContain('fa-calendar');
      expect(itemClickSpy).toHaveBeenCalled();
    });

    it('should select item and highlight with routerLinkActive when click (routerLink)', () => {
      tabmenu.model = [
        {label: 'Stats', icon: 'fa fa-fw fa-bar-chart', routerLink: 'test'},
        {label: 'Calendar', icon: 'fa fa-fw fa-calendar', routerLink: 'test'},
        {label: 'Documentation', icon: 'fa fa-fw fa-book', routerLink: 'test'},
        {label: 'Support', icon: 'fa fa-fw fa-support', routerLink: 'test'},
        {label: 'Social', icon: 'fa fa-fw fa-twitter', routerLink: 'test'}
      ]; 
      const itemClickSpy = spyOn(tabmenu, 'itemClick').and.callThrough();
      fixture.detectChanges();

      const itemList = fixture.debugElement.query(By.css('ul'));
      const calenderItem = itemList.children[1].children[0].nativeElement;
      calenderItem.click();
      fixture.detectChanges();

      expect(itemList.children[1].nativeElement.className).toContain("ui-state-active")
      expect(tabmenu.activeItem.label).toEqual('Calendar');
      expect(tabmenu.activeItem.icon).toContain('fa-calendar');
      expect(itemClickSpy).toHaveBeenCalled();
    });
    
});
