import { ComponentRef } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { InputIcon } from './inputicon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('InputIcon', () => {
    let inputIcon: InputIcon;
    let fixture: ComponentFixture<InputIcon>;
    let inputIconRef: ComponentRef<InputIcon>;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [NoopAnimationsModule, InputIcon] });
        fixture = TestBed.createComponent(InputIcon);
        inputIcon = fixture.componentInstance;
        inputIconRef = fixture.componentRef;
    });

    it('should create the component', () => {
        expect(inputIcon).toBeTruthy();
    });

    it('should always have the p-inputicon class by default', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).toContain('p-inputicon');
    });

    it('should apply custom classes from styleClass input', () => {
        inputIconRef.setInput('styleClass', 'custom-class');
        fixture.detectChanges();

        const inputIconHostElement = fixture.nativeElement;
        expect(inputIconHostElement.classList).toContain('custom-class');
        expect(inputIconHostElement.classList).toContain('p-inputicon');
    });
});
