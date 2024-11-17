import { ComponentRef } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToggleButton } from './togglebutton';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ToggleButton', () => {
    let toggleButton: ToggleButton;
    let fixture: ComponentFixture<ToggleButton>;
    let toggleButtonRef: ComponentRef<ToggleButton>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, ToggleButton]
        });

        fixture = TestBed.createComponent(ToggleButton);
        toggleButton = fixture.componentInstance;
        toggleButtonRef = fixture.componentRef;
        fixture.detectChanges();
    });

    it('should display the onLabel and offLabel', () => {
        const clickEl = fixture.nativeElement.querySelector('.p-togglebutton');
        clickEl.click();
        fixture.detectChanges();

        const labelEl = fixture.debugElement.query(By.css('.p-togglebutton-label'));
        expect(labelEl.nativeElement.textContent.trim()).toBe('Yes');

        clickEl.click();
        fixture.detectChanges();

        expect(labelEl.nativeElement.textContent.trim()).toBe('No');
    });

    it('Should display as checked when value is true by default', () => {
        toggleButton.checked.set(true);
        fixture.detectChanges();

        expect(toggleButton.active()).toBe(true);
    });

    it('should initialize with default values', () => {
        expect(toggleButton.onLabel()).toBe('Yes');
        expect(toggleButton.offLabel()).toBe('No');
        expect(toggleButton.checked()).toBeFalse();
        expect(toggleButton.iconPos()).toBe('left');
    });

    it('should toggle the checked state on click', () => {
        const button = fixture.nativeElement.querySelector('button');
        button.click();

        fixture.detectChanges();
        expect(toggleButton.checked()).toBeTrue();

        button.click();
        fixture.detectChanges();
        expect(toggleButton.checked()).toBeFalse();
    });

    it('should not toggle when disabled', () => {
        toggleButton.disabled.set(true);
        fixture.detectChanges();

        const button = fixture.nativeElement.querySelector('button');
        button.click();

        expect(toggleButton.checked()).toBeFalse(); // Should not change
    });

    it('should display custom labels and icons', () => {
        toggleButtonRef.setInput('onLabel', 'Active');
        toggleButtonRef.setInput('offLabel', 'Inactive');
        toggleButtonRef.setInput('onIcon', 'pi pi-check');
        toggleButtonRef.setInput('offIcon', 'pi pi-times');

        fixture.detectChanges();

        const label = fixture.nativeElement.querySelector('.p-togglebutton-icon');
        expect(label.classList.contains('pi-times')).toBeTrue(); // Initially off icon

        toggleButton.toggle(new MouseEvent('click'));
        fixture.detectChanges();

        expect(label.classList.contains('pi-check')).toBeTrue(); // After toggle, should show on icon
    });

    it('should toggle when Enter or Space is pressed', () => {
        const button = fixture.nativeElement.querySelector('button');

        const keydownEvent = new KeyboardEvent('keydown', { code: 'Enter' });
        button.dispatchEvent(keydownEvent);

        expect(toggleButton.checked()).toBeTrue();
    });

    it('should have correct ARIA attributes', () => {
        toggleButtonRef.setInput('ariaLabel', 'Toggle Button');
        fixture.detectChanges();

        const button = fixture.nativeElement.querySelector('button');
        expect(button.getAttribute('aria-pressed')).toBe('false');
        expect(button.getAttribute('aria-label')).toBe('Toggle Button');
    });

    it('should write value externally', () => {
        toggleButton.writeValue(true);
        fixture.detectChanges();
        expect(toggleButton.checked()).toBeTrue();

        toggleButton.writeValue(false);
        fixture.detectChanges();
        expect(toggleButton.checked()).toBeFalse();
    });
});
