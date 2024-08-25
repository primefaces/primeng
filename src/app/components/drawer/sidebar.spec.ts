import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Drawer } from './drawer';

@Component({
    template: `<p-drawer [(visible)]="visibleSidebar1">
            <h1 style="font-weight:normal">Full Screen Sidebar</h1>
            <button type="button" (click)="visibleSidebar1 = false" label="Save"></button>
            <button type="button" (click)="visibleSidebar1 = false" label="Cancel"></button>
        </p-drawer>
        <button type="button" (click)="visibleSidebar1 = true"></button>`
})
class TestSideBarComponent {
    visibleSidebar1;
}

describe('Sidebar', () => {
    let sidebar: Drawer;
    let fixture: ComponentFixture<TestSideBarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            imports: [NoopAnimationsModule],
            declarations: [Drawer, TestSideBarComponent]
        });

        fixture = TestBed.createComponent(TestSideBarComponent);
        sidebar = fixture.debugElement.query(By.css('p-sidebar')).componentInstance;
    });

    it('should change style and styleClass', fakeAsync(() => {
        sidebar.modal = false;
        sidebar.style = { height: '300px' };
        sidebar.styleClass = 'Primeng rocks!';
        const buttonEl = fixture.debugElement.children[1].nativeElement;
        buttonEl.click();
        fixture.detectChanges();

        tick(150);
        const containerEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(containerEl.className).toContain('Primeng rocks!');
        expect(containerEl.style.height).toContain('300px');
        flush();
    }));

    it('should not show icon', () => {
        sidebar.modal = false;
        sidebar.showCloseIcon = false;
        fixture.detectChanges();

        const closeEl = fixture.debugElement.query(By.css('.p-sidebar-close'));
        expect(closeEl).toBeFalsy();
    });

    it('should set positions', fakeAsync(() => {
        sidebar.modal = false;
        const buttonEl = fixture.debugElement.children[1].nativeElement;
        buttonEl.click();

        fixture.detectChanges();

        tick(150);
        const containerEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(containerEl.className).toContain('p-sidebar-left');
        sidebar.position = 'right';
        fixture.detectChanges();

        sidebar.cd.detectChanges();
        expect(containerEl.className).toContain('p-sidebar-right');
        sidebar.position = 'bottom';
        fixture.detectChanges();

        sidebar.cd.detectChanges();
        expect(containerEl.className).toContain('p-sidebar-bottom');
        sidebar.position = 'top';
        fixture.detectChanges();

        sidebar.cd.detectChanges();
        expect(containerEl.className).toContain('p-sidebar-top');
        flush();
    }));

    it('should open', fakeAsync(() => {
        sidebar.modal = false;
        const buttonEl = fixture.debugElement.children[1].nativeElement;
        const sidebarOpenSpy = spyOn(sidebar, 'show').and.callThrough();
        buttonEl.click();
        fixture.detectChanges();

        tick(150);
        expect(sidebarOpenSpy).toHaveBeenCalled();
        flush();
    }));

    it('should open fullscreen', fakeAsync(() => {
        sidebar.modal = false;
        sidebar.fullScreen = true;
        const buttonEl = fixture.debugElement.children[1].nativeElement;
        const sidebarOpenSpy = spyOn(sidebar, 'show').and.callThrough();
        buttonEl.click();
        fixture.detectChanges();

        tick(150);
        const containerEl = fixture.debugElement.query(By.css('div'));
        expect(sidebarOpenSpy).toHaveBeenCalled();
        expect(containerEl.nativeElement.className).toContain('p-sidebar-full');
        flush();
    }));

    it('should close', fakeAsync(() => {
        const buttonEl = fixture.debugElement.children[1].nativeElement;
        const sidebarCloseSpy = spyOn(sidebar, 'close').and.callThrough();
        buttonEl.click();
        fixture.detectChanges();

        const closeEl = fixture.debugElement.query(By.css('div')).query(By.css('button')).nativeElement;
        closeEl.click();
        fixture.detectChanges();

        tick(300);
        const containerEl = fixture.debugElement.query(By.css('div'));
        expect(containerEl).toBeFalsy();
        expect(sidebarCloseSpy).toHaveBeenCalled();
        sidebar.destroyModal();
        flush();
    }));

    it('should listen emitters', () => {
        sidebar.modal = false;
        fixture.detectChanges();

        const buttonEl = fixture.debugElement.children[1].nativeElement;
        let visibleChangeCount = 0;
        let visibleOption;
        sidebar.onShow.subscribe((value) => (visibleOption = 'visible'));
        sidebar.onHide.subscribe((value) => (visibleOption = 'hide'));
        sidebar.visibleChange.subscribe((value) => visibleChangeCount++);
        buttonEl.click();
        fixture.detectChanges();

        expect(visibleChangeCount).toEqual(0);
        const closeEl = fixture.debugElement.query(By.css('div')).query(By.css('button')).nativeElement;
        closeEl.click();
        fixture.detectChanges();

        expect(visibleChangeCount).toEqual(1);
    });

    it('should not use modal', () => {
        sidebar.modal = false;
        const buttonEl = fixture.debugElement.children[1].nativeElement;
        const enableModalitySpy = spyOn(sidebar, 'enableModality').and.callThrough();
        buttonEl.click();
        fixture.detectChanges();

        expect(enableModalitySpy).not.toHaveBeenCalled();
        expect(sidebar.mask).toEqual(undefined);
        const closeEl = fixture.debugElement.query(By.css('div')).query(By.css('button')).nativeElement;
        closeEl.click();
        fixture.detectChanges();

        expect(enableModalitySpy).not.toHaveBeenCalled();
        expect(sidebar.mask).toEqual(undefined);
    });
});
