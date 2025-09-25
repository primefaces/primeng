import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgClass } from '@angular/common';
import { PClass } from './pclass';

@Component({
    template: `
        <div [pClass]="stringClass" data-testid="string"></div>
        <div [pClass]="arrayClass" data-testid="array"></div>
        <div [pClass]="objectClass" data-testid="object"></div>
        <div [pClass]="mixedClass" data-testid="mixed"></div>
        <div [pClass]="nullClass" data-testid="null"></div>
        <div class="p-2 border border-surface-700" [ngClass]="ngClassExample" [pClass]="[combinedExample, 'string_class']" data-testid="combined"></div>
    `,
    standalone: true,
    imports: [PClass, NgClass]
})
class TestComponent {
    stringClass = 'test-class';
    arrayClass = ['class1', 'class2'];
    objectClass = { active: true, disabled: false };
    mixedClass = ['base', { active: true, hidden: false }];
    nullClass = null;

    ngClassExample = {
        rounded: true,
        'bg-green-500': true
    };

    combinedExample = ['text-white', 'font-semibold'];
}

describe('PClass Directive', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply string classes', () => {
        const element = fixture.debugElement.query(By.css('[data-testid="string"]'));
        expect(element.nativeElement.className).toBe('test-class');
    });

    it('should apply array classes', () => {
        const element = fixture.debugElement.query(By.css('[data-testid="array"]'));
        expect(element.nativeElement.className).toBe('class1 class2');
    });

    it('should apply object classes conditionally', () => {
        const element = fixture.debugElement.query(By.css('[data-testid="object"]'));
        expect(element.nativeElement.className).toBe('active');
    });

    it('should apply mixed classes', () => {
        const element = fixture.debugElement.query(By.css('[data-testid="mixed"]'));
        expect(element.nativeElement.className).toBe('base active');
    });

    it('should handle null values', () => {
        const element = fixture.debugElement.query(By.css('[data-testid="null"]'));
        expect(element.nativeElement.className).toBe('');
    });

    it('should update classes when input changes', () => {
        const element = fixture.debugElement.query(By.css('[data-testid="string"]'));

        component.stringClass = 'new-class';
        fixture.detectChanges();

        expect(element.nativeElement.className).toBe('new-class');
    });

    it('should combine static class, ngClass, and pClass correctly', () => {
        const element = fixture.debugElement.query(By.css('[data-testid="combined"]'));
        const classList = element.nativeElement.className.split(' ');

        // Static classes
        expect(classList).toContain('p-2');
        expect(classList).toContain('border');
        expect(classList).toContain('border-surface-700');

        // NgClass classes
        expect(classList).toContain('rounded');
        expect(classList).toContain('bg-green-500');

        // PClass classes
        expect(classList).toContain('text-white');
        expect(classList).toContain('font-semibold');
        expect(classList).toContain('string_class');
    });
});
