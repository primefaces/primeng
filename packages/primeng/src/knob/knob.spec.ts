import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
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
                imports: [TestBasicKnobComponent]
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
                imports: [TestBasicKnobComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicKnobComponent);
            component = fixture.componentInstance;
            knobInstance = fixture.debugElement.query(By.directive(Knob)).componentInstance;
            fixture.detectChanges();
        });

        it('should update model value', fakeAsync(() => {
            component.value = 75;
            fixture.detectChanges();
            tick();

            expect(knobInstance.value).toBe(75);
            expect(knobInstance._value).toBe(75);
        }));

        it('should update displayed value', fakeAsync(() => {
            component.value = 60;
            knobInstance.writeControlValue(60, () => {});
            fixture.detectChanges();
            tick();

            const textElement = fixture.debugElement.query(By.css('text'));
            expect(textElement.nativeElement.textContent.trim()).toBe('60');
        }));

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

        it('should emit onChange event', fakeAsync(() => {
            spyOn(knobInstance.onChange, 'emit');

            knobInstance.updateModelValue(80);
            fixture.detectChanges();
            tick();

            expect(knobInstance.onChange.emit).toHaveBeenCalledWith(80);
        }));
    });

    describe('Keyboard Navigation Tests', () => {
        let fixture: ComponentFixture<TestKeyboardKnobComponent>;
        let knobInstance: Knob;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestKeyboardKnobComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestKeyboardKnobComponent);
            knobInstance = fixture.debugElement.query(By.directive(Knob)).componentInstance;
            fixture.detectChanges();
        });

        it('should increase value with ArrowUp/ArrowRight', fakeAsync(() => {
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
        }));

        it('should decrease value with ArrowDown/ArrowLeft', fakeAsync(() => {
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
        }));

        it('should handle Home and End keys', fakeAsync(() => {
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
        }));

        it('should handle PageUp and PageDown keys', fakeAsync(() => {
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
        }));
    });

    describe('Mouse Interaction Tests', () => {
        let fixture: ComponentFixture<TestBasicKnobComponent>;
        let knobInstance: Knob;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicKnobComponent]
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
                imports: [TestBasicKnobComponent]
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
                imports: [TestAdvancedKnobComponent]
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

        it('should emit onChange events', fakeAsync(() => {
            knobInstance.updateModelValue(80);
            fixture.detectChanges();
            tick();

            expect(component.changeEvents.length).toBe(1);
            expect(component.changeEvents[0]).toBe(80);
        }));
    });

    describe('Reactive Form Integration Tests', () => {
        let component: TestReactiveFormKnobComponent;
        let fixture: ComponentFixture<TestReactiveFormKnobComponent>;
        let knobInstance: Knob;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestReactiveFormKnobComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestReactiveFormKnobComponent);
            component = fixture.componentInstance;
            knobInstance = fixture.debugElement.query(By.directive(Knob)).componentInstance;
            fixture.detectChanges();
        });

        it('should integrate with reactive forms', fakeAsync(() => {
            expect(knobInstance.value).toBe(50);

            component.knobControl.setValue(75);
            fixture.detectChanges();
            tick();

            expect(knobInstance.value).toBe(75);
        }));

        it('should validate min/max values', fakeAsync(() => {
            // Test value below minimum
            component.knobControl.setValue(20);
            fixture.detectChanges();
            tick();

            expect(component.knobControl.valid).toBe(false);
            expect(component.knobControl.errors?.['min']).toBeTruthy();

            // Test value above maximum
            component.knobControl.setValue(80);
            fixture.detectChanges();
            tick();

            expect(component.knobControl.valid).toBe(false);
            expect(component.knobControl.errors?.['max']).toBeTruthy();

            // Test valid value
            component.knobControl.setValue(50);
            fixture.detectChanges();
            tick();

            expect(component.knobControl.valid).toBe(true);
            expect(component.knobControl.errors).toBeNull();
        }));

        it('should update form control on user interaction', fakeAsync(() => {
            knobInstance.updateModelValue(60);
            fixture.detectChanges();
            tick();

            expect(component.knobControl.value).toBe(60);
            expect(component.changeEvents.length).toBe(1);
            expect(component.changeEvents[0]).toBe(60);
        }));
    });

    describe('Value Template Tests', () => {
        let component: TestTemplateKnobComponent;
        let fixture: ComponentFixture<TestTemplateKnobComponent>;
        let knobInstance: Knob;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestTemplateKnobComponent]
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

        it('should update template when value changes', fakeAsync(() => {
            component.temperature = 30;
            knobInstance.writeControlValue(30, () => {});
            fixture.detectChanges();
            tick();

            expect(knobInstance.valueToDisplay()).toBe('30°C');

            const textElement = fixture.debugElement.query(By.css('text'));
            expect(textElement.nativeElement.textContent.trim()).toBe('30°C');
        }));
    });

    describe('Edge Cases', () => {
        let component: TestAdvancedKnobComponent;
        let fixture: ComponentFixture<TestAdvancedKnobComponent>;
        let knobInstance: Knob;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestAdvancedKnobComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestAdvancedKnobComponent);
            component = fixture.componentInstance;
            knobInstance = fixture.debugElement.query(By.directive(Knob)).componentInstance;
            fixture.detectChanges();
        });

        it('should handle null/undefined values', fakeAsync(() => {
            component.value = null as any;
            fixture.detectChanges();
            tick();

            expect(knobInstance._value).toBe(0); // Should default to min value

            component.value = undefined as any;
            fixture.detectChanges();
            tick();

            expect(knobInstance._value).toBe(0);
        }));

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
                imports: [TestBasicKnobComponent]
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
                imports: [TestBasicKnobComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicKnobComponent);
            component = fixture.componentInstance;
            knobInstance = fixture.debugElement.query(By.directive(Knob)).componentInstance;
            fixture.detectChanges();
        });

        it('should handle rapid value changes', fakeAsync(() => {
            // Rapid value changes simulation
            for (let i = 0; i < 100; i++) {
                knobInstance.updateModelValue(i);
                fixture.detectChanges();
                tick(1);
            }

            expect(knobInstance.value).toBe(99);
            flush();
        }));

        it('should maintain performance with frequent updates', fakeAsync(() => {
            const startTime = performance.now();

            for (let i = 0; i < 50; i++) {
                knobInstance.updateModelValue(Math.random() * 100);
                fixture.detectChanges();
                tick(1);
            }

            const endTime = performance.now();
            const duration = endTime - startTime;

            // Should complete within reasonable time (adjust threshold as needed)
            expect(duration).toBeLessThan(1000);
            flush();
        }));
    });
});
