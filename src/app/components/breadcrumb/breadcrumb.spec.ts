import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Breadcrumb, BreadcrumbModule } from './breadcrumb';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Breadcrumb', () => {
    let breadcrumb: Breadcrumb;
    let fixture: ComponentFixture<Breadcrumb>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([{ path: 'test', component: Breadcrumb }]), NoopAnimationsModule, BreadcrumbModule],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(Breadcrumb);
        breadcrumb = fixture.componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const breadcrumbEl = fixture.debugElement.query(By.css('nav')).nativeElement;
        expect(breadcrumbEl).toBeTruthy();
    });

    it('should change style and styleClass', () => {
        breadcrumb.style = { height: '300px' };
        breadcrumb.styleClass = 'Primeng ROCKS!';
        fixture.detectChanges();

        const breadcrumbEl = fixture.debugElement.query(By.css('nav'));
        expect(breadcrumbEl.nativeElement.className).toContain('Primeng ROCKS!');
        expect(breadcrumbEl.styles.height).toEqual('300px');
    });

    it('should display the home', () => {
        breadcrumb.home = { icon: 'pi pi-home' };
        fixture.detectChanges();

        const homeEl = fixture.debugElement.query(By.css('.p-breadcrumb-home'));
        expect(homeEl).toBeTruthy();
    });

    it('should change home icon', () => {
        breadcrumb.home = { icon: 'primeng' };
        fixture.detectChanges();

        const homeEl = fixture.debugElement.query(By.css('.p-breadcrumb-home')).query(By.css('span')).nativeElement;
        expect(homeEl.className).toContain('primeng');
    });

    it('should display items', () => {
        breadcrumb.home = { icon: 'pi pi-home' };
        breadcrumb.model = [{ label: 'Squad' }, { label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link' }];
        fixture.detectChanges();

        const itemsEl = fixture.debugElement.query(By.css('ol'));
        expect(itemsEl.children[2].children[0]).toBeTruthy();
        expect(itemsEl.children[2].children[0].nativeElement.textContent).toEqual('Squad');
        expect(itemsEl.children.length).toEqual(5);
    });

    it('should call itemClick when click home ', () => {
        breadcrumb.home = { icon: 'pi pi-home' };
        breadcrumb.model = [{ label: 'Squad' }, { label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link' }];
        fixture.detectChanges();

        const itemClickSpy = spyOn(breadcrumb, 'onClick').and.callThrough();
        const homeEl = fixture.debugElement.query(By.css('.p-breadcrumb-home')).query(By.css('a')).nativeElement;
        homeEl.click();
        fixture.detectChanges();

        expect(itemClickSpy).toHaveBeenCalled();
    });

    it('should call itemClick when click item ', () => {
        breadcrumb.home = { icon: 'pi pi-home' };
        breadcrumb.model = [{ label: 'Squad' }, { label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link' }];
        fixture.detectChanges();

        const itemClickSpy = spyOn(breadcrumb, 'onClick').and.callThrough();
        const squadEl = fixture.debugElement.query(By.css('ol')).children[2].children[0].nativeElement;
        squadEl.click();
        fixture.detectChanges();

        expect(itemClickSpy).toHaveBeenCalled();
    });

    it('should call itemClick(routerLink) when click item ', () => {
        breadcrumb.home = { icon: 'pi pi-home' };
        breadcrumb.model = [{ label: 'Squad' }, { label: 'Lionel Messi', routerLink: 'test', icon: 'pi pi-external-link' }];
        fixture.detectChanges();

        const itemClickSpy = spyOn(breadcrumb, 'onClick').and.callThrough();
        const messiEl = fixture.debugElement.query(By.css('ol')).children[4].children[0].nativeElement;
        messiEl.click();
        fixture.detectChanges();

        expect(itemClickSpy).toHaveBeenCalled();
    });

    it('should call itemClick and do nothing (item disabled) ', () => {
        breadcrumb.home = { icon: 'pi pi-home' };
        breadcrumb.model = [
            { label: 'Squad', disabled: true },
            { label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link' }
        ];
        fixture.detectChanges();

        const itemClickSpy = spyOn(breadcrumb, 'onClick').and.callThrough();
        const squadEl = fixture.debugElement.query(By.css('ol')).children[2].children[0].nativeElement;
        squadEl.click();
        fixture.detectChanges();

        expect(itemClickSpy).toHaveBeenCalled();
    });

    it('should run command', () => {
        breadcrumb.home = { icon: 'pi pi-home' };
        breadcrumb.model = [
            {
                label: 'Squad',
                command: () => {
                    breadcrumb.styleClass = 'primengRocks!';
                }
            },
            { label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link' }
        ];
        fixture.detectChanges();

        const itemClickSpy = spyOn(breadcrumb, 'onClick').and.callThrough();
        const squadEl = fixture.debugElement.query(By.css('ol')).children[2].children[0].nativeElement;
        squadEl.click();
        fixture.detectChanges();

        expect(itemClickSpy).toHaveBeenCalled();
        expect(breadcrumb.styleClass).toEqual('primengRocks!');
    });

    it('should call itemClick with home item', () => {
        breadcrumb.home = { icon: 'pi pi-home' };
        breadcrumb.model = [
            {
                label: 'Squad',
                command: () => {
                    breadcrumb.styleClass = 'primengRocks!';
                }
            },
            { label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link' }
        ];
        fixture.detectChanges();

        const itemClickSpy = spyOn(breadcrumb, 'onClick').and.callThrough();
        let event = new Event('click');
        breadcrumb.onHomeClick(event);
        fixture.detectChanges();

        expect(itemClickSpy).toHaveBeenCalled();
    });
});
