import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PClass } from './pclass';

@Component({
    template: `
        <div [pClass]="stringClass" data-testid="string"></div>
        <div [pClass]="arrayClass" data-testid="array"></div>
        <div [pClass]="objectClass" data-testid="object"></div>
        <div [pClass]="mixedClass" data-testid="mixed"></div>
        <div [pClass]="nullClass" data-testid="null"></div>
    `,
    standalone: true,
    imports: [PClass]
})
class TestComponent {
    stringClass = 'test-class';
    arrayClass = ['class1', 'class2'];
    objectClass = { active: true, disabled: false };
    mixedClass = ['base', { active: true, hidden: false }];
    nullClass = null;
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
});
