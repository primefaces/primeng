import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FloatLabel } from './floatlabel';

describe('FloatLabel', () => {
    let floatLabel: FloatLabel;
    let fixture: ComponentFixture<FloatLabel>;
    let floatLabelRef: ComponentRef<FloatLabel>;
    let hostElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [FloatLabel] });

        fixture = TestBed.createComponent(FloatLabel);
        floatLabel = fixture.componentInstance;
        floatLabelRef = fixture.componentRef;
        hostElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(floatLabel).toBeTruthy();
    });

    it('should apply p-floatlabel class to the host element', () => {
        expect(hostElement.classList.contains('p-floatlabel')).toBeTrue();
    });

    it('should apply p-floatlabel-over class by default (variant is "over")', () => {
        expect(hostElement.classList.contains('p-floatlabel-over')).toBeTrue();
    });

    it('should apply p-floatlabel-on class when variant is set to "on"', () => {
        floatLabelRef.setInput('variant', 'on');
        fixture.detectChanges();
        expect(hostElement.classList.contains('p-floatlabel-on')).toBeTrue();
        expect(hostElement.classList.contains('p-floatlabel-over')).toBeFalse();
    });

    it('should apply p-floatlabel-in class when variant is set to "in"', () => {
        floatLabelRef.setInput('variant', 'in');
        fixture.detectChanges();
        expect(hostElement.classList.contains('p-floatlabel-in')).toBeTrue();
        expect(hostElement.classList.contains('p-floatlabel-over')).toBeFalse();
    });

    it('should not have p-floatlabel-in or p-floatlabel-on class when variant is "over"', () => {
        floatLabelRef.setInput('variant', 'over');
        fixture.detectChanges();
        expect(hostElement.classList.contains('p-floatlabel-over')).toBeTrue();
        expect(hostElement.classList.contains('p-floatlabel-in')).toBeFalse();
        expect(hostElement.classList.contains('p-floatlabel-on')).toBeFalse();
    });

    it('should project content inside the ng-content area', () => {
        const content = document.createElement('span');
        content.textContent = 'Test Label';
        hostElement.appendChild(content);
        fixture.detectChanges();
        expect(hostElement.textContent).toContain('Test Label');
    });
});
