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
            imports: [NoopAnimationsModule, ToggleButton],
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
});
