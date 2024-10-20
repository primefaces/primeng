import { ComponentRef } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { IconField } from './iconfield';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('IconField', () => {
    let iconField: IconField;
    let fixture: ComponentFixture<IconField>;
    let iconFieldRef: ComponentRef<IconField>;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [NoopAnimationsModule, IconField] });
        fixture = TestBed.createComponent(IconField);
        iconField = fixture.componentInstance;
        iconFieldRef = fixture.componentRef;
    });

    it('should render IconField with default properties', () => {
        fixture.detectChanges();
        expect(fixture.nativeElement).toBeTruthy();
    });

    it('should apply p-iconfield-left class when iconPosition is left', () => {
        iconFieldRef.setInput('iconPosition', 'left');
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('p-iconfield-left')).toBeTrue();
    });

    it('should apply p-iconfield-right class when iconPosition is right', () => {
        iconFieldRef.setInput('iconPosition', 'right');
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('p-iconfield-right')).toBeTrue();
    });

    it('should not apply any position class when iconPosition is invalid', () => {
        iconFieldRef.setInput('iconPosition', 'invalid');
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('p-iconfield-left')).toBeFalse();
        expect(fixture.nativeElement.classList.contains('p-iconfield-right')).toBeFalse();
    });

    it('should apply custom style class', () => {
        iconFieldRef.setInput('styleClass', 'custom-style');
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('custom-style')).toBeTrue();
    });
});
