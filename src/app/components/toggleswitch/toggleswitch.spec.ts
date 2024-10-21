import { ComponentRef } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToggleSwitch } from './toggleswitch';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ToggleSwitch', () => {
    let toggleSwitch: ToggleSwitch;
    let fixture: ComponentFixture<ToggleSwitch>;
    let toggleSwitchRef: ComponentRef<ToggleSwitch>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, ToggleSwitch],
        });

        fixture = TestBed.createComponent(ToggleSwitch);
        toggleSwitch = fixture.componentInstance;
        toggleSwitchRef = fixture.componentRef;
        fixture.detectChanges();
    });

    it('should render the ToggleSwitch with default values', () => {
        const inputElement = fixture.debugElement.query(By.css('input[type="checkbox"]'));
        expect(inputElement).toBeTruthy();
        expect(inputElement.nativeElement.checked).toBeFalse();
    });

    it('should reflect the correct state when checked', () => {
        toggleSwitch.modelValue.set(true);
        fixture.detectChanges();
        const inputElement = fixture.debugElement.query(By.css('input[type="checkbox"]'));
        expect(inputElement.nativeElement.checked).toBeTrue();
    });

    it('should not allow interaction when disabled', () => {
        toggleSwitch.disabled.set(true);
        fixture.detectChanges();
        const inputElement = fixture.debugElement.query(By.css('input[type="checkbox"]'));
        expect(inputElement.nativeElement.disabled).toBeTrue();
    });

    it('should autofocus the input element if autofocus is true', () => {
        toggleSwitchRef.setInput('autofocus', true);
        fixture.detectChanges();
        const inputElement = fixture.debugElement.query(By.css('input[type="checkbox"]'));
        inputElement.nativeElement.focus(); // Manually trigger focus
        fixture.detectChanges();

        expect(document.activeElement).toBe(inputElement.nativeElement);
    });

    it('should toggle the checked state on click and emit onChange', () => {
        spyOn(toggleSwitch.onChange, 'emit');
        fixture.detectChanges();

        const inputElement = fixture.debugElement.query(By.css('input[type="checkbox"]'));
        inputElement.nativeElement.click();
        fixture.detectChanges();

        expect(toggleSwitch.modelValue()).toBeTrue();
        expect(toggleSwitch.onChange.emit).toHaveBeenCalled();
    });

    it('should not toggle when readonly is true', () => {
        toggleSwitchRef.setInput('readonly', true);
        fixture.detectChanges();

        const inputElement = fixture.debugElement.query(By.css('input[type="checkbox"]'));
        inputElement.nativeElement.click();
        fixture.detectChanges();

        expect(toggleSwitch.modelValue()).toBeFalse(); // default state
    });

    it('should apply correct aria-label and aria-labelledby attributes', () => {
        toggleSwitchRef.setInput('ariaLabel', 'Toggle Switch');
        toggleSwitchRef.setInput('ariaLabelledBy', 'toggleSwitchLabel');
        fixture.detectChanges();

        const inputElement = fixture.debugElement.query(By.css('input[type="checkbox"]'));
        expect(inputElement.nativeElement.getAttribute('aria-label')).toBe('Toggle Switch');
        expect(inputElement.nativeElement.getAttribute('aria-labelledby')).toBe('toggleSwitchLabel');
    });

    it('should apply the correct tabindex attribute', () => {
        toggleSwitchRef.setInput('tabindex', 3);
        fixture.detectChanges();

        const inputElement = fixture.debugElement.query(By.css('input[type="checkbox"]'));
        expect(inputElement.nativeElement.getAttribute('tabindex')).toBe('3'); // Should reflect tabindex value
    });

    it('should initialize with the correct checked state based on modelValue', () => {
        toggleSwitch.modelValue.set(true); // Set initial value to true
        fixture.detectChanges();

        const inputElement = fixture.debugElement.query(By.css('input[type="checkbox"]'));
        expect(inputElement.nativeElement.checked).toBeTrue(); // Should reflect true state
    });

    it('should emit onChange event with the correct value on click', () => {
        spyOn(fixture.componentInstance.onChange, 'emit');
        fixture.detectChanges();

        const inputElement = fixture.debugElement.query(By.css('input[type="checkbox"]'));
        inputElement.nativeElement.click(); // Toggle to true
        fixture.detectChanges();

        expect(toggleSwitch.modelValue()).toBeTrue();
        expect(toggleSwitch.onChange.emit).toHaveBeenCalledWith({ originalEvent: jasmine.any(Event), checked: true });
    });
});
