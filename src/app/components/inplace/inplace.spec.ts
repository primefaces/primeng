import { Component, ComponentRef, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TimesIcon } from 'primeng/icons/times';
import { ButtonModule } from '../button/button';
import { Inplace, InplaceModule } from './inplace';

@Component({
    template: `
        <p-inplace class="custom-template" [(active)]="active" [closable]="closable">
            <ng-template pTemplate="closeicon">
                <span class="my-icon"></span>
            </ng-template>
            <ng-template pTemplate="display">Display</ng-template>
            <ng-template pTemplate="content">Content</ng-template>
        </p-inplace>
    `,
    standalone: true,
    imports: [InplaceModule],
})
class TestHostComponent {
    closable = false;
    active = false;
}

describe('Inplace', () => {
    let inplace: Inplace;
    let fixture: ComponentFixture<Inplace>;
    let fixtureTest: ComponentFixture<TestHostComponent>;
    let inplaceRef: ComponentRef<Inplace>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, ButtonModule, TimesIcon, InplaceModule, TestHostComponent],
        });

        fixture = TestBed.createComponent(Inplace);
        fixtureTest = TestBed.createComponent(TestHostComponent);
        inplace = fixture.componentInstance;
        inplaceRef = fixture.componentRef;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const inplaceEl = fixture.debugElement.query(By.css('div'));
        expect(inplaceEl.nativeElement).toBeTruthy();
    });

    it('should change style styleClass and closable', () => {
        inplaceRef.setInput('style', { height: '300px' });
        inplaceRef.setInput('styleClass', 'Primeng ROCKS!');
        inplaceRef.setInput('closable', true);
        inplaceRef.setInput('active', true);
        fixture.detectChanges();

        const inplaceEl = fixture.debugElement.query(By.css('div'));
        const closableButton = fixture.debugElement.query(By.css('button'));
        expect(inplaceEl.nativeElement.className).toContain('Primeng ROCKS!');
        expect(inplaceEl.nativeElement.className).toContain('p-inplace-closable');
        expect(inplaceEl.nativeElement.style.height).toContain('300px');
        expect(closableButton).toBeTruthy();
    });

    it('should call activate and deactivate', () => {
        inplaceRef.setInput('closable', true);
        fixture.detectChanges();

        const activateSpy = spyOn(inplace, 'activate').and.callThrough();
        const deactivateSpy = spyOn(inplace, 'deactivate').and.callThrough();
        const displayEl = fixture.debugElement.query(By.css('.p-inplace-display'));
        displayEl.nativeElement.click();
        fixture.detectChanges();

        expect(inplace.active()).toEqual(true);
        expect(activateSpy).toHaveBeenCalled();
        const closableButtonEl = fixture.debugElement.query(By.css('button'));
        closableButtonEl.nativeElement.click();
        fixture.detectChanges();

        expect(inplace.active()).toEqual(false);
        expect(deactivateSpy).toHaveBeenCalled();
    });

    it('should disabled', () => {
        inplaceRef.setInput('closable', true);
        inplaceRef.setInput('disabled', true);
        fixture.detectChanges();

        const activateSpy = spyOn(inplace, 'activate').and.callThrough();
        const deactivateSpy = spyOn(inplace, 'deactivate').and.callThrough();
        const displayEl = fixture.debugElement.query(By.css('.p-inplace-display'));
        displayEl.nativeElement.click();
        fixture.detectChanges();

        expect(inplace.active()).toEqual(false);
        expect(activateSpy).toHaveBeenCalled();
        inplace.active.set(true);
        fixture.detectChanges();

        inplace.cd.detectChanges();
        const closableButtonEl = fixture.debugElement.query(By.css('button'));
        closableButtonEl.nativeElement.click();
        fixture.detectChanges();

        expect(inplace.active()).toEqual(true);
        expect(deactivateSpy).toHaveBeenCalled();
    });

    it('should activate content on Enter key press', () => {
        fixture.detectChanges();

        const displayElement = fixture.debugElement.query(By.css('.p-inplace-display'));
        displayElement.triggerEventHandler('keydown', { code: 'Enter', preventDefault: () => {} });

        fixture.detectChanges();

        expect(inplace.active()).toBeTrue();
    });

    it('should prevent activation when preventClick is true', () => {
        inplaceRef.setInput('preventClick', true);
        fixture.detectChanges();

        const displayElement = fixture.debugElement.query(By.css('.p-inplace-display'));
        displayElement.triggerEventHandler('click', {});

        fixture.detectChanges();

        expect(inplace.active()).toBeFalse();
    });

    it('should render custom close button icon when provided', () => {
        inplaceRef.setInput('closable', true);
        inplaceRef.setInput('closeIcon', 'custom-icon');
        inplace.active.set(true);
        fixture.detectChanges();

        const buttonIcon = fixture.debugElement.query(By.css('span.custom-icon'));
        expect(buttonIcon).toBeTruthy();
    });

    it('should set aria-label for the close button', () => {
        inplaceRef.setInput('closable', true);
        inplaceRef.setInput('closeAriaLabel', 'Close');
        inplace.active.set(true);
        fixture.detectChanges();

        const closeButton = fixture.debugElement.query(By.css('button'));
        expect(closeButton.attributes['aria-label']).toBe('Close');
    });

    it('should render the default close icon if no closeIconTemplate is provided', () => {
        inplaceRef.setInput('closable', true);
        inplace.active.set(true); // Ensure content mode is active
        fixture.detectChanges();

        const closeButton = fixture.debugElement.query(By.css('.p-button-icon-only'));
        const timesIcon = fixture.debugElement.query(By.css('TimesIcon')); // Default icon
        expect(closeButton).toBeTruthy(); // Close button should be present
        expect(timesIcon).toBeTruthy(); // Ensure the default icon is rendered
    });

    it('should render the content template when active', () => {
        fixtureTest.componentInstance.active = true; // Set the component to active mode
        fixtureTest.detectChanges();

        const contentElement = fixtureTest.debugElement.query(By.css('.p-inplace-content'));
        expect(contentElement).toBeTruthy(); // Content should be visible
        expect(contentElement.nativeElement.textContent).toBe('Content'); // Ensure content template is rendered
    });

    it('should render the custom close icon template when closable', () => {
        fixtureTest.componentInstance.closable = true; // // Enable close button
        fixtureTest.componentInstance.active = true; // Ensure it's in content mode
        fixtureTest.detectChanges();

        const closeButton = fixtureTest.debugElement.query(By.css('button'));
        const closeIcon = closeButton.query(By.css('span.my-icon'));
        expect(closeButton).toBeTruthy(); // Close button should be present
        expect(closeIcon).toBeTruthy(); // custom close icon button should be present
    });

    it('should render the display template when inactive', () => {
        fixtureTest.detectChanges();

        const displayElement = fixtureTest.debugElement.query(By.css('.p-inplace-display'));
        expect(displayElement).toBeTruthy(); // Display element should be present
        expect(displayElement.nativeElement.textContent).toBe('Display'); // Ensure the template is rendered
    });
});
