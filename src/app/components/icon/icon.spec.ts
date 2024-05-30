import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Icon, PIconComponent, P_ICON_COMPONENT } from './icon';

describe('Icon', () => {
    let fixture: ComponentFixture<Icon>;

    beforeEach(() => TestBed.configureTestingModule({ imports: [Icon] }));

    it('should display default template if no override has been defined', () => {
        fixture = TestBed.createComponent(Icon);
        fixture.componentInstance.icon = 'pi pi-check';
        fixture.componentInstance.iconStyle = { color: 'red' };

        fixture.detectChanges();
        const iconEl = fixture.debugElement.query(By.css('i'));
        expect(iconEl).toBeTruthy();
    });

    it('should display custom component if override has been defined', () => {
        @Component({
            standalone: true,
            selector: 'custom-icon',
            template: ` Hello world! `
        })
        class CustomIconComponent implements PIconComponent {
            @Input() icon: string;
            @Input() iconStyle?: any;
            @Input() iconClass?: any;
        }

        TestBed.overrideProvider(P_ICON_COMPONENT, { useValue: CustomIconComponent });
        fixture = TestBed.createComponent(Icon);
        fixture.componentInstance.icon = 'pi pi-check';
        fixture.componentInstance.iconStyle = { color: 'red' };

        fixture.detectChanges();
        const customIconEl = fixture.debugElement.query(By.css('custom-icon'));
        expect(customIconEl).toBeTruthy();

        const customIconComponent = customIconEl.componentInstance as CustomIconComponent;
        expect(customIconComponent.icon).toBe('pi pi-check');
        expect(customIconComponent.iconStyle).toEqual({ color: 'red' });
    });
});
