import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SplitButton } from './splitbutton';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from '../button/button';
import { RouterTestingModule } from '../../../../node_modules/@angular/router/testing';

describe('SplitButton', () => {
  
    let splitbutton: SplitButton;
    let fixture: ComponentFixture<SplitButton>;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule,
          RouterTestingModule,
          ButtonModule
        ],
        declarations: [
          SplitButton,
        ],
      });
      
      fixture = TestBed.createComponent(SplitButton);
      splitbutton = fixture.componentInstance;
    });
    
    it('should open dropdown menu when click dropdown button and call onDropdownButtonClick', () => {
      const dropDownEl = fixture.debugElement.query(By.css('.ui-splitbutton-menubutton')).nativeElement;
      const dropdownClickSpy = spyOn(splitbutton, 'onDropdownButtonClick').and.callThrough();
      const showSpy = spyOn(splitbutton, 'show').and.callThrough();
      dropDownEl.click();
      fixture.detectChanges();

      const dropdownMenuEl=fixture.debugElement.query(By.css('.ui-menu-dynamic')).nativeElement;
      expect(splitbutton.dropdownClick).toEqual(true);
      expect(splitbutton.overlayVisible).toEqual(true);
      expect (dropdownClickSpy).toHaveBeenCalled();
      expect (showSpy).toHaveBeenCalled();
      expect(dropdownMenuEl).toBeTruthy();
    });

    it('should close dropdown menu when click dropdown button and call onDropdownButtonClick', () => {
      const dropDownEl = fixture.debugElement.query(By.css('.ui-splitbutton-menubutton')).nativeElement;
      const dropdownClickSpy = spyOn(splitbutton, 'onDropdownButtonClick').and.callThrough();
      const showSpy = spyOn(splitbutton, 'show').and.callThrough();
      dropDownEl.click();
      dropDownEl.click();
      fixture.detectChanges();

      const dropdownMenuEl=fixture.debugElement.query(By.css('.ui-menu-dynamic'));
      expect(splitbutton.dropdownClick).toEqual(true);
      expect(splitbutton.overlayVisible).toEqual(false);
      expect (dropdownClickSpy).toHaveBeenCalledTimes(2);
      expect (showSpy).toHaveBeenCalledTimes(2);
      expect(dropdownMenuEl).toBeFalsy();
    });

    it('should close dropdown menu when click dropdown menu item and call itemClick', () => {
      splitbutton.model = [{label: 'Update', icon: 'fa fa-refresh', command: () => {}}];
      const dropDownEl = fixture.debugElement.query(By.css('.ui-splitbutton-menubutton')).nativeElement;
      const itemClickSpy = spyOn(splitbutton, 'itemClick').and.callThrough();
      dropDownEl.click();
      fixture.detectChanges();

      const menuEl = fixture.debugElement.query(By.css('.ui-menuitem')).children[0].nativeElement;
      menuEl.click();
      fixture.detectChanges();

      const dropdownMenuEl = fixture.debugElement.query(By.css('.ui-menu-dynamic'));
      expect (itemClickSpy).toHaveBeenCalled();
      expect(splitbutton.overlayVisible).toEqual(false);
      expect(dropdownMenuEl).toBeFalsy();
    });

    it('should disabled and not called onDropdownButtonClick & show', () => {
      splitbutton.disabled = true;
      const dropdownClickSpy = spyOn(splitbutton, 'onDropdownButtonClick').and.callThrough();
      const showSpy = spyOn(splitbutton, 'show').and.callThrough();
      fixture.detectChanges();
      
      const defaultButtonEl=fixture.debugElement.query(By.css('button')).nativeElement;
      const dropdownEl=fixture.debugElement.query(By.css('.ui-splitbutton-menubutton')).nativeElement;
      const containerEl=fixture.debugElement.query(By.css('.ui-splitbutton')).nativeElement;
      defaultButtonEl.click();
      dropdownEl.click();
      fixture.detectChanges();

      expect(containerEl.className).toContain("ui-state-disabled");
      expect(dropdownEl.disabled).toBeTruthy();
      expect(defaultButtonEl.disabled).toBeTruthy();
      expect (dropdownClickSpy).not.toHaveBeenCalled();
      expect (showSpy).not.toHaveBeenCalled();
    });

    it('should add label and change icon and iconPosition', () => {
      splitbutton.label = "Primeng ROCKS!";
      splitbutton.icon = "Primeng ROCKS!";
      splitbutton.iconPos = "right";
      fixture.detectChanges();

      const defaultButton=fixture.debugElement.query(By.css('button'));
      expect(defaultButton.attributes["ng-reflect-icon"]).toEqual("Primeng ROCKS!");
      expect(defaultButton.attributes["ng-reflect-label"]).toEqual("Primeng ROCKS!");
      expect(defaultButton.attributes["ng-reflect-icon-pos"]).toEqual("right");
    });

    it('should change style and styleClass', () => {
      splitbutton.style = {'primeng':'rock'};
      splitbutton.styleClass = "Primeng ROCKS!";
      fixture.detectChanges();

      const containerEl=fixture.debugElement.query(By.css('.ui-splitbutton')).nativeElement;
      expect(containerEl.className).toContain("Primeng ROCKS!");
      expect(containerEl.style.primeng).toContain("rock");
    });

    it('should change menuStyle and stylemenuStyleClassClass', () => {
      splitbutton.menuStyle = {'primeng':'rock'};
      splitbutton.menuStyleClass="Primeng ROCKS!";
      fixture.detectChanges();

      const dropdownEl=fixture.debugElement.query(By.css('.ui-splitbutton-menubutton')).nativeElement;
      dropdownEl.click();
      fixture.detectChanges();

      const containerEl=fixture.debugElement.query(By.css('.ui-menu')).nativeElement;
      expect(containerEl.className).toContain("Primeng ROCKS!");
      expect(containerEl.style.primeng).toContain("rock");
    });

    it('should change directon of elements', () => {
      splitbutton.dir="ltr"
      fixture.detectChanges();

      const dropdownButton = fixture.debugElement.query(By.css('.ui-splitbutton-menubutton'));
      const defaultButton = fixture.debugElement.query(By.css('button'));
      expect(defaultButton.attributes["ng-reflect-corner-style-class"]).toEqual("ui-corner-left");
      expect(dropdownButton.attributes["ng-reflect-corner-style-class"]).toEqual("ui-corner-right");
    });

    it('should have a tabindex', () => {
      splitbutton.tabindex = 1
      fixture.detectChanges();

      const defaultButton=fixture.debugElement.query(By.css('button'));
      expect(defaultButton.nativeElement.tabIndex).toEqual(1);
    });

});
