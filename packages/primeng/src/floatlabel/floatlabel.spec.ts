import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FloatLabel } from './floatlabel';

@Component({
    standalone: true,
    imports: [FloatLabel, FormsModule],
    template: `
        <p-floatlabel>
            <input id="username" [(ngModel)]="value" />
            <label for="username">Username</label>
        </p-floatlabel>
    `
})
class TestBasicFloatLabelComponent {
    value: string = '';
}

@Component({
    standalone: true,
    imports: [FloatLabel, FormsModule],
    template: `
        <p-floatlabel [variant]="variant">
            <input id="test-input" [(ngModel)]="value" />
            <label for="test-input">Test Label</label>
        </p-floatlabel>
    `
})
class TestVariantFloatLabelComponent {
    value: string = '';
    variant: 'in' | 'over' | 'on' = 'over';
}

describe('FloatLabel', () => {
    describe('Basic Functionality', () => {
        let component: TestBasicFloatLabelComponent;
        let fixture: ComponentFixture<TestBasicFloatLabelComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicFloatLabelComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicFloatLabelComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should render input and label content', () => {
            const inputElement = fixture.debugElement.query(By.css('input'));
            const labelElement = fixture.debugElement.query(By.css('label'));

            expect(inputElement).toBeTruthy();
            expect(labelElement).toBeTruthy();
            expect(labelElement.nativeElement.textContent.trim()).toBe('Username');
            expect(inputElement.nativeElement.id).toBe('username');
        });

        it('should have correct CSS class', () => {
            const floatLabelElement = fixture.debugElement.query(By.directive(FloatLabel));
            expect(floatLabelElement.nativeElement.classList.contains('p-floatlabel')).toBe(true);
        });
    });

    describe('Variant Tests', () => {
        let component: TestVariantFloatLabelComponent;
        let fixture: ComponentFixture<TestVariantFloatLabelComponent>;
        let floatLabelInstance: FloatLabel;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestVariantFloatLabelComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestVariantFloatLabelComponent);
            component = fixture.componentInstance;
            floatLabelInstance = fixture.debugElement.query(By.directive(FloatLabel)).componentInstance;
            fixture.detectChanges();
        });

        it('should have default variant "over"', () => {
            expect(floatLabelInstance.variant).toBe('over');
        });

        it('should apply variant "in"', () => {
            component.variant = 'in';
            fixture.detectChanges();

            expect(floatLabelInstance.variant).toBe('in');
        });

        it('should apply variant "on"', () => {
            component.variant = 'on';
            fixture.detectChanges();

            expect(floatLabelInstance.variant).toBe('on');
        });

        it('should have correct variant classes', () => {
            const floatLabelElement = fixture.debugElement.query(By.directive(FloatLabel));

            // Test 'in' variant
            component.variant = 'in';
            fixture.detectChanges();
            expect(floatLabelElement.nativeElement.classList.contains('p-floatlabel-in')).toBe(true);

            // Test 'on' variant
            component.variant = 'on';
            fixture.detectChanges();
            expect(floatLabelElement.nativeElement.classList.contains('p-floatlabel-on')).toBe(true);

            // Test 'over' variant (default)
            component.variant = 'over';
            fixture.detectChanges();
            expect(floatLabelElement.nativeElement.classList.contains('p-floatlabel-over')).toBe(true);
        });
    });

    describe('Edge Cases', () => {
        let component: TestBasicFloatLabelComponent;
        let fixture: ComponentFixture<TestBasicFloatLabelComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicFloatLabelComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicFloatLabelComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should work without input value', () => {
            const inputElement = fixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.value).toBe('' as any);
        });

        it('should update input value when model changes', fakeAsync(() => {
            component.value = 'test value';
            fixture.detectChanges();
            tick();

            const inputElement = fixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.value).toBe('test value');
        }));
    });
});
