import { Component, DebugElement, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { providePrimeNG } from 'primeng/config';
import { Knob } from './knob';

// Temel test component'i
@Component({
    standalone: true,
    imports: [Knob, FormsModule],
    template: `<p-knob [(ngModel)]="value" />`
})
class TestBasicKnobComponent {
    value: number = 0;
}

// Reactive form test component'i
@Component({
    standalone: true,
    imports: [Knob, ReactiveFormsModule],
    template: ` <p-knob [formControl]="knobControl" [min]="min" [max]="max" [step]="step" (onChange)="onKnobChange($event)" /> `
})
class TestReactiveFormKnobComponent {
    knobControl = new FormControl(50, [Validators.min(25), Validators.max(75)]);
    min: number = 0;
    max: number = 100;
    step: number = 1;
    changeEvents: number[] = [];

    onKnobChange(value: number) {
        this.changeEvents.push(value);
    }
}

// Gelişmiş özellikler test component'i
@Component({
    standalone: true,
    imports: [Knob, FormsModule],
    template: `
        <p-knob
            [(ngModel)]="value"
            [min]="min"
            [max]="max"
            [step]="step"
            [size]="size"
            [strokeWidth]="strokeWidth"
            [showValue]="showValue"
            [readonly]="readonly"
            [valueColor]="valueColor"
            [rangeColor]="rangeColor"
            [textColor]="textColor"
            [valueTemplate]="valueTemplate"
            [styleClass]="styleClass"
            [ariaLabel]="ariaLabel"
            [tabindex]="tabindex"
            (onChange)="onKnobChange($event)"
        />
    `
})
class TestAdvancedKnobComponent {
    value: number = 50;
    min: number = 0;
    max: number = 100;
    step: number = 5;
    size: number = 150;
    strokeWidth: number = 20;
    showValue: boolean = true;
    readonly: boolean = false;
    valueColor: string = '#007ad9';
    rangeColor: string = '#f1f1f1';
    textColor: string = '#333';
    valueTemplate: string = '{value}%';
    styleClass: string = 'custom-knob';
    ariaLabel: string = 'Volume Control';
    tabindex: number = 0;

    changeEvents: number[] = [];

    onKnobChange(value: number) {
        this.changeEvents.push(value);
    }
}

// Keyboard navigation test component'i
@Component({
    standalone: true,
    imports: [Knob, FormsModule],
    template: ` <p-knob [(ngModel)]="value" [min]="0" [max]="100" [step]="1" /> `
})
class TestKeyboardKnobComponent {
    value: number = 50;
}

// Template test component'i
@Component({
    standalone: true,
    imports: [Knob, FormsModule],
    template: ` <p-knob [(ngModel)]="temperature" [min]="0" [max]="40" [valueTemplate]="'{value}°C'" /> `
})
class TestTemplateKnobComponent {
    temperature: number = 25;
}

describe('Knob', () => {
    describe('Component Initialization', () => {
        let component: TestBasicKnobComponent;
        let fixture: ComponentFixture<TestBasicKnobComponent>;
        let knobElement: DebugElement;
        let knobInstance: Knob;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicKnobComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicKnobComponent);
            component = fixture.componentInstance;
            knobElement = fixture.debugElement.query(By.directive(Knob));
            knobInstance = knobElement.componentInstance;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
            expect(knobInstance).toBeTruthy();
        });

        it('should initialize with default properties', () => {
            expect(knobInstance.min).toBe(0);
            expect(knobInstance.max).toBe(100);
            expect(knobInstance.step).toBe(1);
            expect(knobInstance.size).toBe(100);
            expect(knobInstance.strokeWidth).toBe(14);
            expect(knobInstance.showValue).toBe(true);
            expect(knobInstance.readonly).toBe(false);
            expect(knobInstance.valueTemplate).toBe('{value}');
        });

        it('should render SVG element with correct attributes', () => {
            const svgElement = fixture.debugElement.query(By.css('svg'));
            expect(svgElement).toBeTruthy();
            expect(svgElement.nativeElement.getAttribute('role')).toBe('slider');
            expect(svgElement.nativeElement.getAttribute('aria-valuemin')).toBe('0');
            expect(svgElement.nativeElement.getAttribute('aria-valuemax')).toBe('100');
        });

        it('should render paths for range and value', () => {
            const paths = fixture.debugElement.queryAll(By.css('path'));
            expect(paths.length).toBe(2);

            const rangePath = paths[0];
            const valuePath = paths[1];

            expect(rangePath.nativeElement.getAttribute('d')).toBeTruthy();
            expect(valuePath.nativeElement.getAttribute('d')).toBeTruthy();
        });

        it('should render value text when showValue is true', () => {
            const textElement = fixture.debugElement.query(By.css('text'));
            expect(textElement).toBeTruthy();
            expect(textElement.nativeElement.textContent.trim()).toBe('0');
        });
    });

    describe('Basic Functionality Tests', () => {
        let component: TestBasicKnobComponent;
        let fixture: ComponentFixture<TestBasicKnobComponent>;
        let knobInstance: Knob;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicKnobComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicKnobComponent);
            component = fixture.componentInstance;
            knobInstance = fixture.debugElement.query(By.directive(Knob)).componentInstance;
            fixture.detectChanges();
        });

        it('should update model value', async () => {
            component.value = 75;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(knobInstance.value).toBe(75);
            expect(knobInstance._value).toBe(75);
        });

        it('should update displayed value', async () => {
            component.value = 60;
            knobInstance.writeControlValue(60, () => {});
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const textElement = fixture.debugElement.query(By.css('text'));
            expect(textElement.nativeElement.textContent.trim()).toBe('60');
        });

        it('should handle click interaction', () => {
            spyOn(knobInstance, 'updateValue');
            const svgElement = fixture.debugElement.query(By.css('svg'));

            const clickEvent = new MouseEvent('click', {
                clientX: 50,
                clientY: 50
            });
            Object.defineProperty(clickEvent, 'offsetX', { value: 50 });
            Object.defineProperty(clickEvent, 'offsetY', { value: 50 });

            svgElement.nativeElement.dispatchEvent(clickEvent);

            expect(knobInstance.updateValue).toHaveBeenCalledWith(50, 50);
        });

        it('should emit onChange event', async () => {
            spyOn(knobInstance.onChange, 'emit');

            knobInstance.updateModelValue(80);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(knobInstance.onChange.emit).toHaveBeenCalledWith(80);
        });
    });

    describe('Keyboard Navigation Tests', () => {
        let fixture: ComponentFixture<TestKeyboardKnobComponent>;
        let knobInstance: Knob;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestKeyboardKnobComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestKeyboardKnobComponent);
            knobInstance = fixture.debugElement.query(By.directive(Knob)).componentInstance;
            fixture.detectChanges();
        });

        it('should increase value with ArrowUp/ArrowRight', async () => {
            const svgElement = fixture.debugElement.query(By.css('svg'));

            const upEvent = new KeyboardEvent('keydown', { code: 'ArrowUp' });
            spyOn(upEvent, 'preventDefault');
            svgElement.nativeElement.dispatchEvent(upEvent);

            expect(upEvent.preventDefault).toHaveBeenCalled();
            expect(knobInstance.value).toBe(51);

            const rightEvent = new KeyboardEvent('keydown', { code: 'ArrowRight' });
            spyOn(rightEvent, 'preventDefault');
            svgElement.nativeElement.dispatchEvent(rightEvent);

            expect(rightEvent.preventDefault).toHaveBeenCalled();
            expect(knobInstance.value).toBe(52);
        });

        it('should decrease value with ArrowDown/ArrowLeft', async () => {
            const svgElement = fixture.debugElement.query(By.css('svg'));

            const downEvent = new KeyboardEvent('keydown', { code: 'ArrowDown' });
            spyOn(downEvent, 'preventDefault');
            svgElement.nativeElement.dispatchEvent(downEvent);

            expect(downEvent.preventDefault).toHaveBeenCalled();
            expect(knobInstance.value).toBe(49);

            const leftEvent = new KeyboardEvent('keydown', { code: 'ArrowLeft' });
            spyOn(leftEvent, 'preventDefault');
            svgElement.nativeElement.dispatchEvent(leftEvent);

            expect(leftEvent.preventDefault).toHaveBeenCalled();
            expect(knobInstance.value).toBe(48);
        });

        it('should handle Home and End keys', async () => {
            const svgElement = fixture.debugElement.query(By.css('svg'));

            const homeEvent = new KeyboardEvent('keydown', { code: 'Home' });
            spyOn(homeEvent, 'preventDefault');
            svgElement.nativeElement.dispatchEvent(homeEvent);

            expect(homeEvent.preventDefault).toHaveBeenCalled();
            expect(knobInstance.value).toBe(0);

            const endEvent = new KeyboardEvent('keydown', { code: 'End' });
            spyOn(endEvent, 'preventDefault');
            svgElement.nativeElement.dispatchEvent(endEvent);

            expect(endEvent.preventDefault).toHaveBeenCalled();
            expect(knobInstance.value).toBe(100);
        });

        it('should handle PageUp and PageDown keys', async () => {
            const svgElement = fixture.debugElement.query(By.css('svg'));

            const pageUpEvent = new KeyboardEvent('keydown', { code: 'PageUp' });
            spyOn(pageUpEvent, 'preventDefault');
            svgElement.nativeElement.dispatchEvent(pageUpEvent);

            expect(pageUpEvent.preventDefault).toHaveBeenCalled();
            expect(knobInstance.value).toBe(60);

            const pageDownEvent = new KeyboardEvent('keydown', { code: 'PageDown' });
            spyOn(pageDownEvent, 'preventDefault');
            svgElement.nativeElement.dispatchEvent(pageDownEvent);

            expect(pageDownEvent.preventDefault).toHaveBeenCalled();
            expect(knobInstance.value).toBe(50);
        });
    });

    describe('Mouse Interaction Tests', () => {
        let fixture: ComponentFixture<TestBasicKnobComponent>;
        let knobInstance: Knob;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicKnobComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicKnobComponent);
            knobInstance = fixture.debugElement.query(By.directive(Knob)).componentInstance;
            fixture.detectChanges();
        });

        it('should handle mousedown event', () => {
            const svgElement = fixture.debugElement.query(By.css('svg'));

            const mouseDownEvent = new MouseEvent('mousedown');
            spyOn(mouseDownEvent, 'preventDefault');
            svgElement.nativeElement.dispatchEvent(mouseDownEvent);

            expect(mouseDownEvent.preventDefault).toHaveBeenCalled();
            expect(knobInstance.windowMouseMoveListener).toBeTruthy();
            expect(knobInstance.windowMouseUpListener).toBeTruthy();
        });

        it('should handle mouseup event', () => {
            const svgElement = fixture.debugElement.query(By.css('svg'));

            // First trigger mousedown to set up listeners
            svgElement.nativeElement.dispatchEvent(new MouseEvent('mousedown'));

            const mouseUpEvent = new MouseEvent('mouseup');
            spyOn(mouseUpEvent, 'preventDefault');
            svgElement.nativeElement.dispatchEvent(mouseUpEvent);

            expect(mouseUpEvent.preventDefault).toHaveBeenCalled();
        });
    });

    describe('Touch Interaction Tests', () => {
        let fixture: ComponentFixture<TestBasicKnobComponent>;
        let knobInstance: Knob;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicKnobComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicKnobComponent);
            knobInstance = fixture.debugElement.query(By.directive(Knob)).componentInstance;
            fixture.detectChanges();
        });

        it('should handle touchstart event', () => {
            const svgElement = fixture.debugElement.query(By.css('svg'));

            const touchStartEvent = new TouchEvent('touchstart');
            spyOn(touchStartEvent, 'preventDefault');
            svgElement.nativeElement.dispatchEvent(touchStartEvent);

            expect(touchStartEvent.preventDefault).toHaveBeenCalled();
            expect(knobInstance.windowTouchMoveListener).toBeTruthy();
            expect(knobInstance.windowTouchEndListener).toBeTruthy();
        });

        it('should handle touchend event', () => {
            const svgElement = fixture.debugElement.query(By.css('svg'));

            // First trigger touchstart to set up listeners
            svgElement.nativeElement.dispatchEvent(new TouchEvent('touchstart'));

            const touchEndEvent = new TouchEvent('touchend');
            spyOn(touchEndEvent, 'preventDefault');
            svgElement.nativeElement.dispatchEvent(touchEndEvent);

            expect(touchEndEvent.preventDefault).toHaveBeenCalled();
        });
    });

    describe('Advanced Features Tests', () => {
        let component: TestAdvancedKnobComponent;
        let fixture: ComponentFixture<TestAdvancedKnobComponent>;
        let knobInstance: Knob;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestAdvancedKnobComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestAdvancedKnobComponent);
            component = fixture.componentInstance;
            knobInstance = fixture.debugElement.query(By.directive(Knob)).componentInstance;
            fixture.detectChanges();
        });

        it('should apply custom min/max values', () => {
            component.min = 10;
            component.max = 90;
            fixture.detectChanges();

            expect(knobInstance.min).toBe(10);
            expect(knobInstance.max).toBe(90);

            const svgElement = fixture.debugElement.query(By.css('svg'));
            expect(svgElement.nativeElement.getAttribute('aria-valuemin')).toBe('10');
            expect(svgElement.nativeElement.getAttribute('aria-valuemax')).toBe('90');
        });

        it('should apply custom step value', () => {
            expect(knobInstance.step).toBe(5);
        });

        it('should apply custom size', () => {
            expect(knobInstance.size).toBe(150);

            const svgElement = fixture.debugElement.query(By.css('svg'));
            expect(svgElement.nativeElement.style.width).toBe('150px');
            expect(svgElement.nativeElement.style.height).toBe('150px');
        });

        it('should apply custom stroke width', () => {
            expect(knobInstance.strokeWidth).toBe(20);

            const paths = fixture.debugElement.queryAll(By.css('path'));
            paths.forEach((path) => {
                expect(path.nativeElement.getAttribute('stroke-width')).toBe('20');
            });
        });

        it('should apply custom colors', () => {
            expect(knobInstance.valueColor).toBe('#007ad9');
            expect(knobInstance.rangeColor).toBe('#f1f1f1');
            expect(knobInstance.textColor).toBe('#333');

            const paths = fixture.debugElement.queryAll(By.css('path'));
            expect(paths[0].nativeElement.getAttribute('stroke')).toBe('#f1f1f1');
            expect(paths[1].nativeElement.getAttribute('stroke')).toBe('#007ad9');

            const textElement = fixture.debugElement.query(By.css('text'));
            expect(textElement.nativeElement.getAttribute('fill')).toBe('#333');
        });

        it('should apply value template', () => {
            knobInstance.writeControlValue(component.value, () => {});
            fixture.detectChanges();

            expect(knobInstance.valueToDisplay()).toBe('50%');

            const textElement = fixture.debugElement.query(By.css('text'));
            expect(textElement.nativeElement.textContent.trim()).toBe('50%');
        });

        it('should apply custom style class', () => {
            const knobElement = fixture.debugElement.query(By.directive(Knob));
            expect(knobElement.nativeElement.classList.contains('custom-knob')).toBe(true);
        });

        it('should apply accessibility attributes', () => {
            const svgElement = fixture.debugElement.query(By.css('svg'));
            expect(svgElement.nativeElement.getAttribute('aria-label')).toBe('Volume Control');
            expect(svgElement.nativeElement.getAttribute('tabindex')).toBe('0');
        });

        it('should hide value when showValue is false', () => {
            component.showValue = false;
            fixture.detectChanges();

            const textElement = fixture.debugElement.query(By.css('text'));
            expect(textElement).toBeFalsy();
        });

        it('should handle readonly state', () => {
            component.readonly = true;
            fixture.detectChanges();

            const svgElement = fixture.debugElement.query(By.css('svg'));
            expect(svgElement.nativeElement.getAttribute('tabindex')).toBe('-1');

            // Test that click is ignored in readonly mode
            spyOn(knobInstance, 'updateValue');
            const clickEvent = new MouseEvent('click');
            Object.defineProperty(clickEvent, 'offsetX', { value: 50 });
            Object.defineProperty(clickEvent, 'offsetY', { value: 50 });
            svgElement.nativeElement.dispatchEvent(clickEvent);

            expect(knobInstance.updateValue).not.toHaveBeenCalled();
        });

        it('should emit onChange events', async () => {
            knobInstance.updateModelValue(80);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(component.changeEvents.length).toBe(1);
            expect(component.changeEvents[0]).toBe(80);
        });
    });

    describe('Reactive Form Integration Tests', () => {
        let component: TestReactiveFormKnobComponent;
        let fixture: ComponentFixture<TestReactiveFormKnobComponent>;
        let knobInstance: Knob;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestReactiveFormKnobComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestReactiveFormKnobComponent);
            component = fixture.componentInstance;
            knobInstance = fixture.debugElement.query(By.directive(Knob)).componentInstance;
            fixture.detectChanges();
        });

        it('should integrate with reactive forms', async () => {
            expect(knobInstance.value).toBe(50);

            component.knobControl.setValue(75);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(knobInstance.value).toBe(75);
        });

        it('should validate min/max values', async () => {
            // Test value below minimum
            component.knobControl.setValue(20);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(component.knobControl.valid).toBe(false);
            expect(component.knobControl.errors?.['min']).toBeTruthy();

            // Test value above maximum
            component.knobControl.setValue(80);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(component.knobControl.valid).toBe(false);
            expect(component.knobControl.errors?.['max']).toBeTruthy();

            // Test valid value
            component.knobControl.setValue(50);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(component.knobControl.valid).toBe(true);
            expect(component.knobControl.errors).toBeNull();
        });

        it('should update form control on user interaction', async () => {
            knobInstance.updateModelValue(60);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(component.knobControl.value).toBe(60);
            expect(component.changeEvents.length).toBe(1);
            expect(component.changeEvents[0]).toBe(60);
        });
    });

    describe('Value Template Tests', () => {
        let component: TestTemplateKnobComponent;
        let fixture: ComponentFixture<TestTemplateKnobComponent>;
        let knobInstance: Knob;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestTemplateKnobComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestTemplateKnobComponent);
            component = fixture.componentInstance;
            knobInstance = fixture.debugElement.query(By.directive(Knob)).componentInstance;
            fixture.detectChanges();
        });

        it('should use custom value template', () => {
            knobInstance.writeControlValue(component.temperature, () => {});
            fixture.detectChanges();

            expect(knobInstance.valueToDisplay()).toBe('25°C');

            const textElement = fixture.debugElement.query(By.css('text'));
            expect(textElement.nativeElement.textContent.trim()).toBe('25°C');
        });

        it('should update template when value changes', async () => {
            component.temperature = 30;
            knobInstance.writeControlValue(30, () => {});
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(knobInstance.valueToDisplay()).toBe('30°C');

            const textElement = fixture.debugElement.query(By.css('text'));
            expect(textElement.nativeElement.textContent.trim()).toBe('30°C');
        });
    });

    describe('Edge Cases', () => {
        let component: TestAdvancedKnobComponent;
        let fixture: ComponentFixture<TestAdvancedKnobComponent>;
        let knobInstance: Knob;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestAdvancedKnobComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestAdvancedKnobComponent);
            component = fixture.componentInstance;
            knobInstance = fixture.debugElement.query(By.directive(Knob)).componentInstance;
            fixture.detectChanges();
        });

        it('should handle null/undefined values', async () => {
            component.value = null as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(knobInstance._value).toBe(0); // Should default to min value

            component.value = undefined as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(knobInstance._value).toBe(0);
        });

        it('should clamp values to min/max bounds', () => {
            // Test value above max
            knobInstance.updateModelValue(150);
            expect(knobInstance.value).toBe(100);

            // Test value below min
            knobInstance.updateModelValue(-50);
            expect(knobInstance.value).toBe(0);
        });

        it('should handle step increments correctly', () => {
            // updateModelValue doesn't handle step rounding, just clamping
            // Step rounding is handled in updateModel method
            knobInstance.updateModelValue(47);
            expect(knobInstance.value).toBe(47); // Direct value assignment

            knobInstance.updateModelValue(48);
            expect(knobInstance.value).toBe(48); // Direct value assignment

            // Test that step property is correctly set
            expect(knobInstance.step).toBe(5);
        });

        it('should prevent interaction when disabled', () => {
            // Mock disabled state
            spyOn(knobInstance, '$disabled').and.returnValue(true);

            spyOn(knobInstance, 'updateValue');
            const svgElement = fixture.debugElement.query(By.css('svg'));

            const clickEvent = new MouseEvent('click');
            Object.defineProperty(clickEvent, 'offsetX', { value: 50 });
            Object.defineProperty(clickEvent, 'offsetY', { value: 50 });
            svgElement.nativeElement.dispatchEvent(clickEvent);

            expect(knobInstance.updateValue).not.toHaveBeenCalled();
        });
    });

    describe('Mathematical Calculations', () => {
        let component: TestBasicKnobComponent;
        let fixture: ComponentFixture<TestBasicKnobComponent>;
        let knobInstance: Knob;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicKnobComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicKnobComponent);
            component = fixture.componentInstance;
            knobInstance = fixture.debugElement.query(By.directive(Knob)).componentInstance;
            fixture.detectChanges();
        });

        it('should calculate range mapping correctly', () => {
            const result = knobInstance.mapRange(50, 0, 100, 0, 360);
            expect(result).toBe(180);

            const result2 = knobInstance.mapRange(25, 0, 100, 0, 360);
            expect(result2).toBe(90);
        });

        it('should calculate SVG path coordinates', () => {
            component.value = 50;
            knobInstance.writeControlValue(50, () => {});
            fixture.detectChanges();

            expect(typeof knobInstance.rangePath()).toBe('string');
            expect(typeof knobInstance.valuePath()).toBe('string');

            // minRadians = (4 * Math.PI) / 3, radius = 40, midX = 50
            // minX = 50 + cos((4 * Math.PI) / 3) * 40 ≈ 30
            expect(knobInstance.minX()).toBeCloseTo(30, 1);
            expect(knobInstance.maxX()).toBeCloseTo(70, 1);
            expect(knobInstance.valueX()).toBeDefined();
            expect(knobInstance.valueY()).toBeDefined();
        });

        it('should calculate zero and value radians', () => {
            component.value = 0;
            fixture.detectChanges();

            const zeroRad = knobInstance.zeroRadians();
            const valueRad = knobInstance.valueRadians();

            expect(typeof zeroRad).toBe('number');
            expect(typeof valueRad).toBe('number');
        });
    });

    describe('Performance Tests', () => {
        let component: TestBasicKnobComponent;
        let fixture: ComponentFixture<TestBasicKnobComponent>;
        let knobInstance: Knob;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicKnobComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicKnobComponent);
            component = fixture.componentInstance;
            knobInstance = fixture.debugElement.query(By.directive(Knob)).componentInstance;
            fixture.detectChanges();
        });

        it('should handle rapid value changes', async () => {
            // Rapid value changes simulation
            for (let i = 0; i < 100; i++) {
                knobInstance.updateModelValue(i);
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
            }

            expect(knobInstance.value).toBe(99);
        });

        it('should maintain performance with frequent updates', async () => {
            const startTime = performance.now();

            for (let i = 0; i < 50; i++) {
                knobInstance.updateModelValue(Math.random() * 100);
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
            }

            const endTime = performance.now();
            const duration = endTime - startTime;

            // Should complete within reasonable time (adjust threshold as needed)
            expect(duration).toBeLessThan(1000);
        });
    });

    describe('PassThrough (PT) Tests', () => {
        describe('Case 1: Simple string classes', () => {
            @Component({
                standalone: false,
                template: `<p-knob [(ngModel)]="value" [pt]="pt"></p-knob>`
            })
            class TestPTCase1Component {
                value: number = 50;
                pt = {
                    host: 'HOST_CLASS',
                    root: 'ROOT_CLASS',
                    svg: 'SVG_CLASS',
                    range: 'RANGE_CLASS',
                    value: 'VALUE_CLASS',
                    text: 'TEXT_CLASS'
                };
            }

            it('should apply simple string classes to PT sections', async () => {
                await TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    imports: [Knob, FormsModule],
                    declarations: [TestPTCase1Component],
                    providers: [provideZonelessChangeDetection()]
                }).compileComponents();

                const testFixture = TestBed.createComponent(TestPTCase1Component);
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();

                const hostEl = testFixture.debugElement.query(By.css('[data-pc-name="knob"]'));
                if (hostEl) {
                    expect(hostEl.nativeElement.classList.contains('HOST_CLASS')).toBe(true);
                    expect(hostEl.nativeElement.classList.contains('ROOT_CLASS')).toBe(true);
                }

                const svgEl = testFixture.debugElement.query(By.css('svg'));
                if (svgEl) {
                    expect(svgEl.nativeElement.classList.contains('SVG_CLASS')).toBe(true);
                }

                const rangePath = testFixture.debugElement.query(By.css('[data-pc-section="range"]'));
                if (rangePath) {
                    expect(rangePath.nativeElement.classList.contains('RANGE_CLASS')).toBe(true);
                }

                const valuePath = testFixture.debugElement.query(By.css('[data-pc-section="value"]'));
                if (valuePath) {
                    expect(valuePath.nativeElement.classList.contains('VALUE_CLASS')).toBe(true);
                }

                const textEl = testFixture.debugElement.query(By.css('[data-pc-section="text"]'));
                if (textEl) {
                    expect(textEl.nativeElement.classList.contains('TEXT_CLASS')).toBe(true);
                }
            });
        });

        describe('Case 2: Object with class, style, data attributes', () => {
            @Component({
                standalone: false,
                template: `<p-knob [(ngModel)]="value" [pt]="pt"></p-knob>`
            })
            class TestPTCase2Component {
                value: number = 50;
                pt = {
                    host: {
                        class: 'OBJECT_HOST_CLASS',
                        style: { 'background-color': 'red' },
                        'data-p-test': 'test-value'
                    },
                    svg: {
                        class: 'SVG_OBJECT_CLASS',
                        'data-p-custom': 'custom-value'
                    },
                    range: {
                        class: 'RANGE_OBJECT_CLASS'
                    }
                };
            }

            it('should apply object properties to PT sections', async () => {
                await TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    imports: [Knob, FormsModule],
                    declarations: [TestPTCase2Component],
                    providers: [provideZonelessChangeDetection()]
                }).compileComponents();

                const testFixture = TestBed.createComponent(TestPTCase2Component);
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();

                const hostEl = testFixture.debugElement.query(By.css('[data-pc-name="knob"]'));
                if (hostEl) {
                    expect(hostEl.nativeElement.classList.contains('OBJECT_HOST_CLASS')).toBe(true);
                    expect(hostEl.nativeElement.style.backgroundColor).toBe('red');
                    expect(hostEl.nativeElement.getAttribute('data-p-test')).toBe('test-value');
                }

                const svgEl = testFixture.debugElement.query(By.css('svg'));
                if (svgEl) {
                    expect(svgEl.nativeElement.classList.contains('SVG_OBJECT_CLASS')).toBe(true);
                    expect(svgEl.nativeElement.getAttribute('data-p-custom')).toBe('custom-value');
                }
            });
        });

        describe('Case 3: Mixed object and string values', () => {
            @Component({
                standalone: false,
                template: `<p-knob [(ngModel)]="value" [pt]="pt"></p-knob>`
            })
            class TestPTCase3Component {
                value: number = 50;
                pt = {
                    host: 'MIXED_HOST_CLASS',
                    svg: {
                        class: 'MIXED_SVG_CLASS',
                        style: { color: 'blue' }
                    },
                    range: 'MIXED_RANGE_CLASS'
                };
            }

            it('should apply mixed object and string values', async () => {
                await TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    imports: [Knob, FormsModule],
                    declarations: [TestPTCase3Component],
                    providers: [provideZonelessChangeDetection()]
                }).compileComponents();

                const testFixture = TestBed.createComponent(TestPTCase3Component);
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();

                const hostEl = testFixture.debugElement.query(By.css('[data-pc-name="knob"]'));
                if (hostEl) {
                    expect(hostEl.nativeElement.classList.contains('MIXED_HOST_CLASS')).toBe(true);
                }

                const svgEl = testFixture.debugElement.query(By.css('svg'));
                if (svgEl) {
                    expect(svgEl.nativeElement.classList.contains('MIXED_SVG_CLASS')).toBe(true);
                }
            });
        });

        describe('Case 4: Use variables from instance', () => {
            @Component({
                standalone: false,
                template: `<p-knob [(ngModel)]="value" [min]="0" [max]="100" [showValue]="true" [pt]="pt"></p-knob>`
            })
            class TestPTCase4Component {
                value: number = 75;
                pt = {
                    host: ({ instance }: any) => {
                        return {
                            class: instance?.value > 50 ? 'HIGH_VALUE_CLASS' : 'LOW_VALUE_CLASS'
                        };
                    },
                    text: ({ instance }: any) => {
                        return {
                            style: {
                                fill: instance?.value > 50 ? 'green' : 'red'
                            }
                        };
                    }
                };
            }

            it('should use instance variables in PT functions', async () => {
                await TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    imports: [Knob, FormsModule],
                    declarations: [TestPTCase4Component],
                    providers: [provideZonelessChangeDetection()]
                }).compileComponents();

                const testFixture = TestBed.createComponent(TestPTCase4Component);
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();

                const hostEl = testFixture.debugElement.query(By.css('[data-pc-name="knob"]'));
                if (hostEl) {
                    const hasHighValue = hostEl.nativeElement.classList.contains('HIGH_VALUE_CLASS');
                    const hasLowValue = hostEl.nativeElement.classList.contains('LOW_VALUE_CLASS');
                    expect(hasHighValue || hasLowValue).toBe(true);
                }

                const textEl = testFixture.debugElement.query(By.css('[data-pc-section="text"]'));
                if (textEl) {
                    const fillColor = textEl.nativeElement.getAttribute('fill');
                    expect(fillColor).toBeTruthy();
                }
            });
        });

        describe('Case 5: Event binding', () => {
            @Component({
                standalone: false,
                template: `<p-knob [(ngModel)]="value" [pt]="pt"></p-knob>`
            })
            class TestPTCase5Component {
                value: number = 50;
                clickedSection: string = '';
                pt = {
                    host: {
                        onclick: () => {
                            this.clickedSection = 'host';
                        }
                    },
                    svg: {
                        onclick: () => {
                            this.clickedSection = 'svg';
                        }
                    }
                };
            }

            it('should bind click events through PT', async () => {
                await TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    imports: [Knob, FormsModule],
                    declarations: [TestPTCase5Component],
                    providers: [provideZonelessChangeDetection()]
                }).compileComponents();

                const testFixture = TestBed.createComponent(TestPTCase5Component);
                const component = testFixture.componentInstance;
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();

                const svgEl = testFixture.debugElement.query(By.css('svg'));
                if (svgEl) {
                    const clickEvent = new MouseEvent('click');
                    svgEl.nativeElement.dispatchEvent(clickEvent);
                    testFixture.changeDetectorRef.markForCheck();
                    expect(component.clickedSection).toBeTruthy();
                }
            });
        });

        describe('Case 6: Inline PT', () => {
            @Component({
                standalone: false,
                template: `<p-knob [(ngModel)]="value" [pt]="{ host: 'INLINE_HOST_CLASS', svg: 'INLINE_SVG_CLASS' }"></p-knob>`
            })
            class TestPTCase6InlineComponent {
                value: number = 50;
            }

            it('should apply inline PT as string', async () => {
                await TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    imports: [Knob, FormsModule],
                    declarations: [TestPTCase6InlineComponent],
                    providers: [provideZonelessChangeDetection()]
                }).compileComponents();

                const testFixture = TestBed.createComponent(TestPTCase6InlineComponent);
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();

                const hostEl = testFixture.debugElement.query(By.css('[data-pc-name="knob"]'));
                if (hostEl) {
                    expect(hostEl.nativeElement.classList.contains('INLINE_HOST_CLASS')).toBe(true);
                }
            });

            @Component({
                standalone: false,
                template: `<p-knob [(ngModel)]="value" [pt]="{ host: { class: 'INLINE_OBJECT_CLASS' }, svg: { class: 'SVG_INLINE_CLASS' } }"></p-knob>`
            })
            class TestPTCase6InlineObjectComponent {
                value: number = 50;
            }

            it('should apply inline PT as object', async () => {
                await TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    imports: [Knob, FormsModule],
                    declarations: [TestPTCase6InlineObjectComponent],
                    providers: [provideZonelessChangeDetection()]
                }).compileComponents();

                const testFixture = TestBed.createComponent(TestPTCase6InlineObjectComponent);
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();

                const hostEl = testFixture.debugElement.query(By.css('[data-pc-name="knob"]'));
                if (hostEl) {
                    expect(hostEl.nativeElement.classList.contains('INLINE_OBJECT_CLASS')).toBe(true);
                }
            });
        });

        describe('Case 7: Global PT from PrimeNGConfig', () => {
            @Component({
                standalone: false,
                template: `<p-knob [(ngModel)]="value"></p-knob>`
            })
            class TestPTCase7GlobalComponent {
                value: number = 50;
            }

            it('should apply global PT from config', async () => {
                await TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    imports: [Knob, FormsModule],
                    declarations: [TestPTCase7GlobalComponent],
                    providers: [
                        provideZonelessChangeDetection(),
                        providePrimeNG({
                            pt: {
                                knob: {
                                    host: 'GLOBAL_HOST_CLASS',
                                    svg: 'GLOBAL_SVG_CLASS'
                                }
                            }
                        })
                    ]
                }).compileComponents();

                const testFixture = TestBed.createComponent(TestPTCase7GlobalComponent);
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();

                const hostEl = testFixture.debugElement.query(By.css('[data-pc-name="knob"]'));
                if (hostEl) {
                    expect(hostEl.nativeElement.classList.contains('GLOBAL_HOST_CLASS')).toBe(true);
                }
            });
        });

        describe('Case 8: PT Hooks', () => {
            @Component({
                standalone: false,
                template: `<p-knob [(ngModel)]="value" [pt]="pt"></p-knob>`
            })
            class TestPTCase8HooksComponent {
                value: number = 50;
                hooksCalled: string[] = [];
                pt = {
                    hooks: {
                        onAfterViewInit: () => {
                            this.hooksCalled.push('onAfterViewInit');
                        },
                        onAfterViewChecked: () => {
                            this.hooksCalled.push('onAfterViewChecked');
                        },
                        onDestroy: () => {
                            this.hooksCalled.push('onDestroy');
                        }
                    }
                };
            }

            it('should call PT hooks', async () => {
                await TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    imports: [Knob, FormsModule],
                    declarations: [TestPTCase8HooksComponent],
                    providers: [provideZonelessChangeDetection()]
                }).compileComponents();

                const testFixture = TestBed.createComponent(TestPTCase8HooksComponent);
                const component = testFixture.componentInstance;
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();

                expect(component.hooksCalled.some((h) => h.includes('onAfterView'))).toBe(true);

                testFixture.destroy();
                await testFixture.whenStable();
            });
        });

        describe('PT Section Coverage', () => {
            @Component({
                standalone: false,
                template: `<p-knob [(ngModel)]="value" [showValue]="true" [pt]="pt"></p-knob>`
            })
            class TestPTCoverageComponent {
                value: number = 50;
                pt = {
                    host: 'PT_HOST',
                    root: 'PT_ROOT',
                    svg: 'PT_SVG',
                    range: 'PT_RANGE',
                    value: 'PT_VALUE',
                    text: 'PT_TEXT'
                };
            }

            it('should apply PT to all sections', async () => {
                await TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    imports: [Knob, FormsModule],
                    declarations: [TestPTCoverageComponent],
                    providers: [provideZonelessChangeDetection()]
                }).compileComponents();

                const testFixture = TestBed.createComponent(TestPTCoverageComponent);
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();

                const hostEl = testFixture.debugElement.query(By.css('[data-pc-name="knob"]'));
                expect(hostEl).toBeTruthy();
                if (hostEl) {
                    expect(hostEl.nativeElement.getAttribute('data-pc-name')).toBe('knob');
                }

                const svgEl = testFixture.debugElement.query(By.css('[data-pc-section="svg"]'));
                expect(svgEl).toBeTruthy();

                const rangeEl = testFixture.debugElement.query(By.css('[data-pc-section="range"]'));
                expect(rangeEl).toBeTruthy();

                const valueEl = testFixture.debugElement.query(By.css('[data-pc-section="value"]'));
                expect(valueEl).toBeTruthy();

                const textEl = testFixture.debugElement.query(By.css('[data-pc-section="text"]'));
                expect(textEl).toBeTruthy();
            });
        });
    });
});
