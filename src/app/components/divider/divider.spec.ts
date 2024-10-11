import { ComponentRef } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Divider, DividerModule } from './divider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Divider', () => {
    let divider: Divider;
    let fixture: ComponentFixture<Divider>;
    let dividerRef: ComponentRef<Divider>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, DividerModule],
        });

        fixture = TestBed.createComponent(Divider);
        divider = fixture.componentInstance;
        dividerRef = fixture.componentRef;
    });

    it('should create the component', () => {
        expect(divider).toBeTruthy();
    });

    it('should display by default', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).toContain('p-divider');
    });

    it('should default to horizontal layout when no layout input is provided', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).toContain('p-divider-horizontal');
    });

    it('should apply vertical layout when layout input is set to vertical', () => {
        dividerRef.setInput('layout', 'vertical');
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).toContain('p-divider-vertical');
        expect(fixture.nativeElement.classList).not.toContain('p-divider-horizontal');
    });

    it('should apply solid type by default', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).toContain('p-divider-solid');
    });

    it('should apply dashed type when input is set to dashed', () => {
        dividerRef.setInput('type', 'dashed');
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).toContain('p-divider-dashed');
    });

    it('should apply dotted type when input is set to dotted', () => {
        dividerRef.setInput('type', 'dotted');
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).toContain('p-divider-dotted');
    });

    it('should apply left alignment for horizontal layout', () => {
        dividerRef.setInput('align', 'left');
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).toContain('p-divider-left');
    });

    it('should apply right alignment for horizontal layout', () => {
        dividerRef.setInput('align', 'right');
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).toContain('p-divider-right');
    });

    it('should apply top alignment for vertical layout', () => {
        dividerRef.setInput('layout', 'vertical');
        dividerRef.setInput('align', 'top');
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).toContain('p-divider-top');
    });

    it('should apply bottom alignment for vertical layout', () => {
        dividerRef.setInput('layout', 'vertical');
        dividerRef.setInput('align', 'bottom');
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).toContain('p-divider-bottom');
    });

    it('should apply custom inline styles from style input', () => {
        dividerRef.setInput('style', { backgroundColor: 'red', width: '100px' });
        fixture.detectChanges();

        expect(fixture.nativeElement.style.backgroundColor).toBe('red');
        expect(fixture.nativeElement.style.width).toBe('100px');
    });

    it('should apply custom classes from styleClass input', () => {
        dividerRef.setInput('styleClass', 'custom-class-1 custom-class-2');
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).toContain('custom-class-1');
        expect(fixture.nativeElement.classList).toContain('custom-class-2');
    });

    it('should have role="separator" and aria-orientation based on layout', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.getAttribute('role')).toBe('separator');
        expect(fixture.nativeElement.getAttribute('aria-orientation')).toBe('horizontal');

        dividerRef.setInput('layout', 'vertical');
        fixture.detectChanges();

        expect(fixture.nativeElement.getAttribute('aria-orientation')).toBe('vertical');
    });

    it('should update classes dynamically when inputs change', () => {
        fixture.detectChanges();

        dividerRef.setInput('layout', 'vertical');
        dividerRef.setInput('type', 'dotted');
        dividerRef.setInput('align', 'top');
        fixture.detectChanges();

        const dividerHostElement = fixture.nativeElement;
        expect(dividerHostElement.classList).toContain('p-divider-vertical');
        expect(dividerHostElement.classList).toContain('p-divider-dotted');
        expect(dividerHostElement.classList).toContain('p-divider-top');
    });
});
