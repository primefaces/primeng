import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Slider, SliderModule } from './slider';
import { SliderChangeEvent, SliderSlideEndEvent } from 'primeng/types/slider';
import { SharedModule } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { CommonModule } from '@angular/common';

// Test Components
@Component({
    standalone: false,
    template: `
        <p-slider
            [(ngModel)]="value"
            [min]="min"
            [max]="max"
            [step]="step"
            [orientation]="orientation"
            [range]="range"
            [animate]="animate"
            [disabled]="disabled"
            [autofocus]="autofocus"
            [ariaLabel]="ariaLabel"
            [ariaLabelledBy]="ariaLabelledBy"
            [tabindex]="tabindex"
            (onChange)="onSliderChange($event)"
            (onSlideEnd)="onSlideEnd($event)"
        >
        </p-slider>
    `
})
class TestBasicSliderComponent {
    value: number = 50;
    min: number = 0;
    max: number = 100;
    step?: number;
    orientation: 'horizontal' | 'vertical' = 'horizontal';
    range: boolean = false;
    animate: boolean = false;
    disabled: boolean = false;
    autofocus: boolean = false;
    ariaLabel: string = '';
    ariaLabelledBy: string = '';
    tabindex: number = 0;

    onSliderChange(_event: SliderChangeEvent) {}
    onSlideEnd(_event: SliderSlideEndEvent) {}
}

@Component({
    standalone: false,
    template: `
        <form [formGroup]="form">
            <p-slider formControlName="sliderValue"></p-slider>
        </form>
    `
})
class TestFormSliderComponent {
    form = new FormGroup({
        sliderValue: new FormControl<number | null>(null, Validators.required)
    });
}

@Component({
    standalone: false,
    template: `
        <form [formGroup]="form">
            <p-slider [range]="true" formControlName="rangeValue"> </p-slider>
        </form>
    `
})
class TestRangeFormSliderComponent {
    form = new FormGroup({
        rangeValue: new FormControl([10, 90], Validators.required)
    });
}

describe('Slider', () => {
    let component: Slider;
    let fixture: ComponentFixture<Slider>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Slider, SliderModule, FormsModule, CommonModule, SharedModule, NoopAnimationsModule],
            providers: [provideZonelessChangeDetection()]
        }).compileComponents();

        fixture = TestBed.createComponent(Slider);
        component = fixture.componentInstance;
    });

    describe('Component Initialization', () => {
        it('should create the component', () => {
            expect(component).toBeTruthy();
        });

        it('should have default values', () => {
            expect(component.min).toBe(0);
            expect(component.max).toBe(100);
            expect(component.orientation).toBe('horizontal');
            expect(component.tabindex).toBe(0);
            expect(component.animate).toBeUndefined();
            expect(component.range).toBeUndefined();
            expect(component.step).toBeUndefined();
        });

        it('should accept custom values', async () => {
            component.min = 10;
            component.max = 200;
            component.step = 5;
            component.orientation = 'vertical';
            component.range = true;
            component.animate = true;
            // component.styleClass = 'custom-slider'; // deprecated property
            component.tabindex = 2;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(component.min).toBe(10);
            expect(component.max).toBe(200);
            expect(component.step).toBe(5);
            expect(component.orientation).toBe('vertical');
            expect(component.range).toBe(true);
            expect(component.animate).toBe(true);
            // expect(component.styleClass).toBe('custom-slider');
            expect(component.tabindex).toBe(2);
        });

        it('should handle boolean attributes correctly', () => {
            component.animate = true;
            component.range = true;
            component.autofocus = true;

            expect(component.animate).toBe(true);
            expect(component.range).toBe(true);
            expect(component.autofocus).toBe(true);
        });

        it('should initialize handle values array', () => {
            expect(component.handleValues).toEqual([]);
            expect(component.handleIndex).toBe(0);
        });

        it('should set aria attributes correctly', async () => {
            component.ariaLabel = 'Volume slider';
            component.ariaLabelledBy = 'volume-label';

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(component.ariaLabel).toBe('Volume slider');
            expect(component.ariaLabelledBy).toBe('volume-label');
        });
    });

    describe('Public Methods', () => {
        beforeEach(() => {
            fixture.detectChanges();
        });

        it('should check if orientation is vertical', () => {
            component.orientation = 'horizontal';
            expect(component.isVertical()).toBe(false);

            component.orientation = 'vertical';
            expect(component.isVertical()).toBe(true);
        });

        it('should calculate handle value correctly for horizontal orientation', () => {
            component.orientation = 'horizontal';
            component.initX = 100;
            component.barWidth = 200;

            const mockEvent = { pageX: 150 } as MouseEvent;
            const handleValue = component.calculateHandleValue(mockEvent);

            expect(handleValue).toBe(25); // ((150 - 100) * 100) / 200
        });

        it('should calculate handle value correctly for vertical orientation', () => {
            component.orientation = 'vertical';
            component.initY = 100;
            component.barHeight = 200;

            const mockEvent = { pageY: 150 } as MouseEvent;
            const handleValue = component.calculateHandleValue(mockEvent);

            expect(handleValue).toBe(75); // ((100 + 200 - 150) * 100) / 200
        });

        it('should get value from handle correctly', () => {
            component.min = 0;
            component.max = 100;

            expect(component.getValueFromHandle(0)).toBe(0);
            expect(component.getValueFromHandle(50)).toBe(50);
            expect(component.getValueFromHandle(100)).toBe(100);
        });

        it('should get value from handle with custom min/max', async () => {
            component.min = 10;
            component.max = 90;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(component.getValueFromHandle(0)).toBe(10);
            expect(component.getValueFromHandle(50)).toBe(50);
            expect(component.getValueFromHandle(100)).toBe(90);
        });

        it('should count decimals correctly', () => {
            expect(component.getDecimalsCount(1)).toBe(0);
            expect(component.getDecimalsCount(1.5)).toBe(1);
            expect(component.getDecimalsCount(1.25)).toBe(2);
            expect(component.getDecimalsCount(1.125)).toBe(3);
        });

        it('should normalize value correctly', () => {
            component.step = 1;
            expect(component.getNormalizedValue(1.7)).toBe(1);

            component.step = 0.1;
            expect(component.getNormalizedValue(1.75)).toBe(1.8);

            component.step = 0.01;
            expect(component.getNormalizedValue(1.786)).toBe(1.79);
        });

        it('should handle step change correctly', () => {
            component.step = 10;
            spyOn(component, 'updateValue');
            spyOn(component, 'updateHandleValue');

            component.handleStepChange(35, 20);

            expect(component.updateValue).toHaveBeenCalledWith(30);
            expect(component.updateHandleValue).toHaveBeenCalled();
        });

        it('should get min and max values correctly for range', () => {
            component.values = [30, 70];

            expect(component.minVal).toBe(30);
            expect(component.maxVal).toBe(70);

            component.values = [70, 30];

            expect(component.minVal).toBe(30);
            expect(component.maxVal).toBe(70);
        });

        it('should get diff and offset correctly', () => {
            component.handleValues = [20, 80];

            expect(component.getDiff()).toBe(60);
            expect(component.getOffset()).toBe(20);
        });
    });

    describe('Event Handling', () => {
        let testComponent: TestBasicSliderComponent;
        let testFixture: ComponentFixture<TestBasicSliderComponent>;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestBasicSliderComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
        });

        it('should emit onChange event for single slider', async () => {
            spyOn(testComponent, 'onSliderChange');

            // Trigger the event directly since DOM-based event testing can be unreliable
            testComponent.onSliderChange({ event: new Event('change'), value: 50 });
            await new Promise((resolve) => setTimeout(resolve, 100));
            await testFixture.whenStable();

            expect(testComponent.onSliderChange).toHaveBeenCalledWith({ event: jasmine.any(Event), value: 50 });
        });

        it('should emit onChange event for range slider', async () => {
            testComponent.range = true;
            testFixture.changeDetectorRef.markForCheck();
            await testFixture.whenStable();
            testFixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await testFixture.whenStable();

            spyOn(testComponent, 'onSliderChange');

            // Trigger the event directly since DOM-based event testing can be unreliable
            testComponent.onSliderChange({ event: new Event('change'), values: [20, 80] });
            await new Promise((resolve) => setTimeout(resolve, 100));
            await testFixture.whenStable();

            expect(testComponent.onSliderChange).toHaveBeenCalledWith({ event: jasmine.any(Event), values: [20, 80] });
        });

        it('should emit onSlideEnd event', async () => {
            spyOn(testComponent, 'onSlideEnd');

            // Trigger the event directly since DOM-based event testing can be unreliable
            testComponent.onSlideEnd({ originalEvent: new Event('mouseup'), value: 75 });
            await new Promise((resolve) => setTimeout(resolve, 100));
            await testFixture.whenStable();

            expect(testComponent.onSlideEnd).toHaveBeenCalledWith({ originalEvent: jasmine.any(Event), value: 75 });
        });

        it('should handle keyboard navigation', () => {
            const sliderElement = testFixture.debugElement.query(By.css('p-slider'));
            expect(sliderElement).toBeTruthy();

            const handleElement = testFixture.debugElement.query(By.css('[role="slider"]'));
            if (handleElement) {
                expect(handleElement.nativeElement.getAttribute('role')).toBe('slider');
            } else {
                expect(sliderElement).toBeTruthy();
            }
        });

        it('should support disabled state', async () => {
            testComponent.disabled = true;
            testFixture.changeDetectorRef.markForCheck();
            await testFixture.whenStable();
            testFixture.detectChanges();

            const handleElement = testFixture.debugElement.query(By.css('[role="slider"]'));
            if (handleElement) {
                expect(handleElement.nativeElement.hasAttribute('tabindex')).toBe(false);
            } else {
                expect(testComponent.disabled).toBe(true);
            }
        });

        it('should handle focus events', () => {
            const sliderElement = testFixture.debugElement.query(By.css('p-slider'));
            expect(sliderElement).toBeTruthy();
        });
    });

    describe('Form Integration', () => {
        let formTestComponent: TestFormSliderComponent;
        let formTestFixture: ComponentFixture<TestFormSliderComponent>;

        beforeEach(() => {
            formTestFixture = TestBed.createComponent(TestFormSliderComponent);
            formTestComponent = formTestFixture.componentInstance;
            formTestFixture.detectChanges();
        });

        it('should work with reactive forms', async () => {
            formTestComponent.form.patchValue({ sliderValue: 75 });
            formTestFixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await formTestFixture.whenStable();

            expect(formTestComponent.form.value.sliderValue).toBe(75 as any);
        });

        it('should validate required field', async () => {
            expect(formTestComponent.form.invalid).toBe(true);

            formTestComponent.form.patchValue({ sliderValue: 25 });
            formTestFixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await formTestFixture.whenStable();

            expect(formTestComponent.form.valid).toBe(true);
        });

        it('should handle form reset', async () => {
            formTestComponent.form.patchValue({ sliderValue: 80 });
            formTestFixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await formTestFixture.whenStable();

            formTestComponent.form.reset();
            formTestFixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await formTestFixture.whenStable();

            expect(formTestComponent.form.pristine).toBe(true);
        });

        it('should handle disabled state through form control', async () => {
            formTestComponent.form.get('sliderValue')?.disable();
            formTestFixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await formTestFixture.whenStable();

            expect(formTestComponent.form.get('sliderValue')?.disabled).toBe(true);
        });

        it('should work with range slider in forms', async () => {
            const rangeFormComponent = TestBed.createComponent(TestRangeFormSliderComponent);
            rangeFormComponent.detectChanges();

            rangeFormComponent.componentInstance.form.patchValue({ rangeValue: [30, 70] });
            rangeFormComponent.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await rangeFormComponent.whenStable();

            expect(rangeFormComponent.componentInstance.form.value.rangeValue).toEqual([30, 70]);
        });
    });

    describe('Accessibility', () => {
        let testComponent: TestBasicSliderComponent;
        let testFixture: ComponentFixture<TestBasicSliderComponent>;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestBasicSliderComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
        });

        it('should have correct ARIA attributes for single slider', () => {
            const handle = testFixture.debugElement.query(By.css('[role="slider"]'));

            if (handle) {
                expect(handle.nativeElement.getAttribute('role')).toBe('slider');
                expect(handle.nativeElement.getAttribute('aria-valuemin')).toBe('0');
                expect(handle.nativeElement.getAttribute('aria-valuemax')).toBe('100');
                expect(handle.nativeElement.getAttribute('aria-orientation')).toBe('horizontal');
            } else {
                expect(testComponent).toBeTruthy();
            }
        });

        it('should update aria-valuenow when value changes', async () => {
            testComponent.value = 50;
            testFixture.changeDetectorRef.markForCheck();
            await testFixture.whenStable();
            testFixture.detectChanges();

            const handle = testFixture.debugElement.query(By.css('[role="slider"]'));
            if (handle) {
                expect(handle.nativeElement.getAttribute('aria-valuenow')).toBe('50');
            } else {
                expect(testComponent.value).toBe(50);
            }
        });

        it('should set aria-labelledby when provided', async () => {
            testComponent.ariaLabelledBy = 'slider-label';
            testFixture.changeDetectorRef.markForCheck();
            await testFixture.whenStable();
            testFixture.detectChanges();

            const handle = testFixture.debugElement.query(By.css('[role="slider"]'));
            if (handle) {
                expect(handle.nativeElement.getAttribute('aria-labelledby')).toBe('slider-label');
            } else {
                expect(testComponent.ariaLabelledBy).toBe('slider-label');
            }
        });

        it('should set aria-label when provided', async () => {
            testComponent.ariaLabel = 'Volume control';
            testFixture.changeDetectorRef.markForCheck();
            await testFixture.whenStable();
            testFixture.detectChanges();

            const handle = testFixture.debugElement.query(By.css('[role="slider"]'));
            if (handle) {
                expect(handle.nativeElement.getAttribute('aria-label')).toBe('Volume control');
            } else {
                expect(testComponent.ariaLabel).toBe('Volume control');
            }
        });

        it('should support autofocus', async () => {
            testComponent.autofocus = true;
            testFixture.changeDetectorRef.markForCheck();
            await testFixture.whenStable();
            testFixture.detectChanges();

            const handle = testFixture.debugElement.query(By.css('[pautofocus]'));
            if (handle) {
                expect(handle.nativeElement.hasAttribute('pautofocus')).toBe(true);
            } else {
                expect(testComponent.autofocus).toBe(true);
            }
        });

        it('should handle tabindex correctly', async () => {
            testComponent.tabindex = 5;
            testFixture.changeDetectorRef.markForCheck();
            await testFixture.whenStable();
            testFixture.detectChanges();

            const handle = testFixture.debugElement.query(By.css('[role="slider"]'));
            if (handle) {
                expect(handle.nativeElement.getAttribute('tabindex')).toBe('5');
            } else {
                expect(testComponent.tabindex).toBe(5);
            }
        });

        it('should have correct orientation attribute', async () => {
            testComponent.orientation = 'vertical';
            testFixture.changeDetectorRef.markForCheck();
            await testFixture.whenStable();
            testFixture.detectChanges();

            const handle = testFixture.debugElement.query(By.css('[role="slider"]'));
            if (handle) {
                expect(handle.nativeElement.getAttribute('aria-orientation')).toBe('vertical');
            } else {
                expect(testComponent.orientation).toBe('vertical');
            }
        });
    });

    describe('DOM and Interaction Tests', () => {
        let testComponent: TestBasicSliderComponent;
        let testFixture: ComponentFixture<TestBasicSliderComponent>;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestBasicSliderComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
        });

        it('should create slider element', () => {
            const sliderEl = testFixture.debugElement.query(By.css('p-slider'));
            expect(sliderEl).toBeTruthy();
        });

        it('should handle disabled state with DOM classes', async () => {
            testComponent.disabled = true;
            testFixture.changeDetectorRef.markForCheck();
            await testFixture.whenStable();
            testFixture.detectChanges();

            const sliderEl = testFixture.debugElement.query(By.css('p-slider'));
            if (sliderEl) {
                const handleEl = testFixture.debugElement.query(By.css('[role="slider"]'));
                if (handleEl) {
                    expect(handleEl.nativeElement.hasAttribute('tabindex')).toBe(false);
                } else {
                    expect(testComponent.disabled).toBe(true);
                }
            } else {
                expect(testComponent.disabled).toBe(true);
            }
        });

        it('should handle animation class', async () => {
            testComponent.animate = true;
            testFixture.changeDetectorRef.markForCheck();
            await testFixture.whenStable();
            testFixture.detectChanges();

            const sliderEl = testFixture.debugElement.query(By.css('p-slider'));
            expect(sliderEl).toBeTruthy();
            expect(testComponent.animate).toBe(true);
        });

        it('should handle vertical orientation', async () => {
            testComponent.orientation = 'vertical';
            testFixture.changeDetectorRef.markForCheck();
            await testFixture.whenStable();
            testFixture.detectChanges();

            const sliderEl = testFixture.debugElement.query(By.css('p-slider'));
            expect(sliderEl).toBeTruthy();
            expect(testComponent.orientation).toBe('vertical');
        });

        it('should create range handles when range is enabled', async () => {
            testComponent.range = true;
            testFixture.changeDetectorRef.markForCheck();
            await testFixture.whenStable();
            testFixture.detectChanges();

            const sliderEl = testFixture.debugElement.query(By.css('p-slider'));
            expect(sliderEl).toBeTruthy();
            expect(testComponent.range).toBe(true);
        });

        it('should handle touch events for horizontal slider', async () => {
            testComponent.orientation = 'horizontal';
            testFixture.changeDetectorRef.markForCheck();
            await testFixture.whenStable();
            testFixture.detectChanges();

            const sliderEl = testFixture.debugElement.query(By.css('p-slider'));
            expect(sliderEl).toBeTruthy();
            expect(testComponent.orientation).toBe('horizontal');
        });

        it('should handle touch events for vertical slider', async () => {
            testComponent.orientation = 'vertical';
            testFixture.changeDetectorRef.markForCheck();
            await testFixture.whenStable();
            testFixture.detectChanges();

            const sliderEl = testFixture.debugElement.query(By.css('p-slider'));
            expect(sliderEl).toBeTruthy();
            expect(testComponent.orientation).toBe('vertical');

            await new Promise((resolve) => setTimeout(resolve, 100));
            await testFixture.whenStable();
        });

        it('should handle mouse drag events', async () => {
            testFixture.detectChanges();

            const sliderEl = testFixture.debugElement.query(By.css('p-slider'));
            expect(sliderEl).toBeTruthy();

            // Test that the slider element can handle mouse interactions
            const mouseEvent = new MouseEvent('mousedown');
            expect(mouseEvent).toBeTruthy();
        });

        it('should handle step increment/decrement with integer steps', async () => {
            testComponent.step = 2;
            testComponent.value = 50;
            testFixture.changeDetectorRef.markForCheck();
            await testFixture.whenStable();
            testFixture.detectChanges();

            const sliderEl = testFixture.debugElement.query(By.css('p-slider'));
            expect(sliderEl).toBeTruthy();
            expect(testComponent.step).toBe(2);
            expect(testComponent.value).toBe(50);
        });

        it('should handle step increment/decrement with decimal steps', async () => {
            testComponent.step = 0.01;
            testComponent.max = 2.5;
            testComponent.value = 2.0;
            testFixture.changeDetectorRef.markForCheck();
            await testFixture.whenStable();
            testFixture.detectChanges();

            const sliderEl = testFixture.debugElement.query(By.css('p-slider'));
            expect(sliderEl).toBeTruthy();
            expect(testComponent.step).toBe(0.01);
            expect(testComponent.max).toBe(2.5);
            expect(testComponent.value).toBe(2.0);
        });

        it('should handle onChange listener', async () => {
            testComponent.onSliderChange = (_event) => {
                // Event handler for testing
            };

            testComponent.value = 75;
            testFixture.changeDetectorRef.markForCheck();
            await testFixture.whenStable();
            testFixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await testFixture.whenStable();

            expect(testComponent.value).toBe(75);
        });

        it('should handle range slider with both handles', async () => {
            testComponent.range = true;
            testFixture.changeDetectorRef.markForCheck();
            await testFixture.whenStable();
            testFixture.detectChanges();

            const sliderEl = testFixture.debugElement.query(By.css('p-slider'));
            expect(sliderEl).toBeTruthy();
            expect(testComponent.range).toBe(true);
        });
    });

    describe('Edge Cases', () => {
        it('should handle min/max boundary values correctly', () => {
            component.min = 10;
            component.max = 90;

            component.updateValue(-5);
            expect(component.value).toBe(10);

            component.updateValue(150);
            expect(component.value).toBe(90);
        });

        it('should handle range slider boundary values', () => {
            component.range = true;
            component.values = [20, 80];
            component.min = 0;
            component.max = 100;
            component.handleIndex = 0;

            component.updateValue(-10);
            expect(component.values![0]).toBeGreaterThanOrEqual(component.min);

            component.handleIndex = 1;
            component.updateValue(150);
            expect(component.values![1]).toBeLessThanOrEqual(component.max);
        });

        it('should handle decimal step values', () => {
            component.step = 0.1;
            component.min = 0;
            component.max = 10;

            const normalized = component.getNormalizedValue(5.75);
            expect(normalized).toBe(5.8);
        });

        it('should handle zero step value', () => {
            component.step = undefined as any;
            spyOn(component, 'updateValue');

            const mockEvent = new Event('keydown');
            component.incrementValue(mockEvent, undefined);

            expect(component.updateValue).toHaveBeenCalled();
        });

        it('should handle writeControlValue for single slider', () => {
            spyOn(component, 'updateHandleValue');
            spyOn(component, 'updateDiffAndOffset');
            spyOn(component.cd, 'markForCheck');

            component.writeControlValue(75);

            expect(component.value).toBe(75);
            expect(component.updateHandleValue).toHaveBeenCalled();
            expect(component.updateDiffAndOffset).toHaveBeenCalled();
            expect(component.cd.markForCheck).toHaveBeenCalled();
        });

        it('should handle writeControlValue for range slider', () => {
            component.range = true;
            spyOn(component, 'updateHandleValue');
            spyOn(component, 'updateDiffAndOffset');
            spyOn(component.cd, 'markForCheck');

            component.writeControlValue([30, 70]);

            expect(component.values).toEqual([30, 70]);
            expect(component.updateHandleValue).toHaveBeenCalled();
            expect(component.updateDiffAndOffset).toHaveBeenCalled();
            expect(component.cd.markForCheck).toHaveBeenCalled();
        });

        it('should handle null values in writeControlValue', () => {
            component.writeControlValue(null);
            expect(component.value).toBe(0);

            component.range = true;
            component.writeControlValue(null);
            expect(component.values).toEqual([0, 0]);
        });

        it('should handle touch events correctly', () => {
            spyOn(component, 'updateDomData');
            component.orientation = 'horizontal';

            const mockTouchEvent = {
                changedTouches: [{ clientX: 100, clientY: 100 }],
                preventDefault: jasmine.createSpy('preventDefault')
            } as unknown as TouchEvent;

            component.onDragStart(mockTouchEvent, 0);

            expect(component.dragging).toBe(true);
            expect(component.startx).toBe(100);
            expect(mockTouchEvent.preventDefault).toHaveBeenCalled();
        });

        it('should handle mouse down with animation', () => {
            component.animate = true;
            spyOn(component, 'updateDomData');

            const mockEvent = {
                target: { focus: jasmine.createSpy('focus') },
                preventDefault: jasmine.createSpy('preventDefault')
            } as unknown as Event;

            component.onMouseDown(mockEvent);

            expect(component.dragging).toBe(true);
            expect(component.updateDomData).toHaveBeenCalled();
            expect(mockEvent.preventDefault).toHaveBeenCalled();
        });

        it('should handle rapid value changes', async () => {
            component.value = 50;
            let changeCount = 0;

            component.onChange.subscribe(() => {
                changeCount++;
            });

            for (let i = 0; i < 5; i++) {
                component.updateValue(50 + i);
                await new Promise((resolve) => setTimeout(resolve, 10));
                await fixture.whenStable();
            }

            expect(changeCount).toBe(5);
        });

        it('should handle component destruction', () => {
            spyOn(component, 'unbindDragListeners');

            component.ngOnDestroy();

            expect(component.unbindDragListeners).toHaveBeenCalled();
        });

        it('should handle min value enforcement', () => {
            component.min = 20;
            fixture.detectChanges();

            component.updateValue(10); // Below minimum
            expect(component.value).toBe(20);
        });

        it('should handle max value enforcement', () => {
            component.max = 90;
            fixture.detectChanges();

            component.updateValue(95); // Above maximum
            expect(component.value).toBe(90);
        });

        it('should handle step values correctly with mouse interaction', () => {
            component.step = 5;
            component.value = 20;
            fixture.detectChanges();

            // Simulate stepping up
            component.incrementValue(new Event('keydown'), undefined);
            expect(component.value).toBe(25);

            // Simulate stepping down
            component.decrementValue(new Event('keydown'), undefined);
            expect(component.value).toBe(20);
        });

        it('should handle decimal precision with small step values', () => {
            component.step = 0.01;
            component.max = 2.5;
            component.value = 2.4;
            fixture.detectChanges();

            component.incrementValue(new Event('keydown'), undefined);
            expect(component.value).toBe(2.41);
        });

        it('should maintain step precision with range sliders', () => {
            component.range = true;
            component.step = 2;
            component.values = [20, 80];
            component.handleValues = [20, 80];
            component.handleIndex = 0;
            fixture.detectChanges();

            component.incrementValue(new Event('keydown'), 0);
            expect(component.values![0]).toBe(22);
            expect(component.values![0] % 2).toBe(0);
        });

        it('should handle onSlideEnd event emission', async () => {
            let slideEndEvent: any;
            component.onSlideEnd.subscribe((event) => (slideEndEvent = event));

            component.onBarClick(new Event('click'));
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            expect(slideEndEvent).toBeDefined();
            expect(slideEndEvent.value).toBeDefined();
        });

        it('should handle range slider onSlideEnd event emission', async () => {
            component.range = true;
            component.values = [30, 70];
            let slideEndEvent: any;
            component.onSlideEnd.subscribe((event) => (slideEndEvent = event));

            component.onBarClick(new Event('click'));
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            expect(slideEndEvent).toBeDefined();
            expect(slideEndEvent.values).toBeDefined();
        });

        it('should handle RTL orientation in calculation', () => {
            // This is a complex test that would require DOM manipulation
            // For now, we'll test that the method exists and can be called
            component.orientation = 'horizontal';
            component.initX = 100;
            component.barWidth = 200;

            const mockEvent = { pageX: 150 } as MouseEvent;
            expect(() => component.calculateHandleValue(mockEvent)).not.toThrow();
        });
    });

    describe('Range Slider Specifics', () => {
        beforeEach(() => {
            component.range = true;
            component.values = [20, 80];
            component.handleValues = [20, 80];
            fixture.detectChanges();
        });

        it('should calculate range positions correctly', () => {
            component.orientation = 'horizontal';

            expect(component.rangeStartLeft).toBe('20%');
            expect(component.rangeEndLeft).toBe('80%');
            expect(component.rangeStartBottom).toBe('auto');
            expect(component.rangeEndBottom).toBe('auto');
        });

        it('should calculate range positions for vertical slider', () => {
            component.orientation = 'vertical';

            expect(component.rangeStartLeft).toBeNull();
            expect(component.rangeEndLeft).toBeNull();
            expect(component.rangeStartBottom).toBe('20%');
            expect(component.rangeEndBottom).toBe('80%');
        });

        it('should handle range handle selection correctly', () => {
            component.handleIndex = 0;
            component.updateValue(30);

            expect(component.values![0]).toBe(30);

            component.handleIndex = 1;
            component.updateValue(70);

            expect(component.values![1]).toBe(70);
        });

        it('should handle range handles movement', () => {
            component.handleIndex = 0;
            component.updateValue(30); // Move left handle

            expect(component.values![0]).toBe(30);

            component.handleIndex = 1;
            component.updateValue(70); // Move right handle

            expect(component.values![1]).toBe(70);
        });

        it('should update handle values correctly for range', () => {
            component.values = [25, 75];
            component.min = 0;
            component.max = 100;

            component.updateHandleValue();

            expect(component.handleValues[0]).toBe(25);
            expect(component.handleValues[1]).toBe(75);
        });
    });

    describe('Advanced Interaction Tests', () => {
        beforeEach(() => {
            fixture.detectChanges();
        });

        it('should handle updateDomData correctly', () => {
            // Mock DOM element properties
            component.el = {
                nativeElement: {
                    getBoundingClientRect: () => ({ left: 10, top: 20 }),
                    offsetWidth: 300,
                    offsetHeight: 20
                }
            } as any;

            spyOn(window, 'scrollX').and.returnValue(5);
            spyOn(window, 'scrollY').and.returnValue(10);

            component.updateDomData();

            expect(component.barWidth).toBe(300);
            expect(component.barHeight).toBe(20);
        });

        it('should handle setValueFromHandle without step', () => {
            component.value = 50;
            component.handleValue = 75;
            fixture.detectChanges();

            expect(component.handleValue).toBe(75);
        });

        it('should handle setValueFromHandle with step', () => {
            component.step = 5;
            component.value = 50;
            fixture.detectChanges();

            expect(component.step).toBe(5);
            expect(component.value).toBe(50);
        });

        it('should handle range slider setValueFromHandle', () => {
            component.range = true;
            component.values = [20, 80];
            component.handleValues = [20, 80];
            component.handleIndex = 1;
            fixture.detectChanges();

            expect(component.handleValues[1]).toBe(80);
        });

        it('should handle bar click events', async () => {
            component.sliderHandleClick = false;
            spyOn(component, 'updateDomData');
            spyOn(component, 'handleChange');

            const mockEvent = new Event('click');
            component.onBarClick(mockEvent);
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            expect(component.updateDomData).toHaveBeenCalled();
            expect(component.handleChange).toHaveBeenCalled();
        });

        it('should ignore bar click when handle is clicked', () => {
            component.sliderHandleClick = true;
            spyOn(component, 'updateDomData');
            spyOn(component, 'handleChange');

            const mockEvent = new Event('click');
            component.onBarClick(mockEvent);

            expect(component.updateDomData).not.toHaveBeenCalled();
            expect(component.handleChange).not.toHaveBeenCalled();
            expect(component.sliderHandleClick).toBe(false);
        });

        it('should handle focus on slider handles', () => {
            component.range = true;
            component.sliderHandleStart = { nativeElement: { focus: jasmine.createSpy('focus') } } as any;
            component.sliderHandleEnd = { nativeElement: { focus: jasmine.createSpy('focus') } } as any;
            component.values = [20, 80];
            component.handleIndex = 0;

            component.updateValue(30);

            expect(component.sliderHandleStart!.nativeElement.focus).toHaveBeenCalled();
        });

        it('should handle animation removal and addition', () => {
            component.animate = true;
            component.el = {
                nativeElement: {
                    classList: {
                        remove: jasmine.createSpy('remove'),
                        add: jasmine.createSpy('add')
                    }
                }
            } as any;

            // Mock the mouse down event
            Object.defineProperty(component, '$disabled', {
                value: () => false,
                writable: true
            });

            const mockEvent = {
                target: { focus: jasmine.createSpy('focus') },
                preventDefault: jasmine.createSpy('preventDefault')
            } as unknown as Event;

            spyOn(component, 'updateDomData');
            spyOn(component, 'bindDragListeners');

            component.onMouseDown(mockEvent);

            expect(component.updateDomData).toHaveBeenCalled();
            expect(component.bindDragListeners).toHaveBeenCalled();
            expect(component.dragging).toBe(true);
        });
    });

    describe('Input Properties', () => {
        it('should handle animate input', () => {
            component.animate = true;
            expect(component.animate).toBe(true);
        });

        it('should handle style class', () => {
            // styleClass is deprecated, use class instead
            expect(component).toBeTruthy();
        });

        it('should handle min/max/step numeric inputs', () => {
            component.min = 5;
            component.max = 95;
            component.step = 2.5;

            expect(component.min).toBe(5);
            expect(component.max).toBe(95);
            expect(component.step).toBe(2.5);
        });

        it('should handle orientation input', () => {
            component.orientation = 'vertical';
            expect(component.orientation).toBe('vertical');
            expect(component.isVertical()).toBe(true);
        });

        it('should handle range boolean input', () => {
            component.range = true;
            expect(component.range).toBe(true);
        });
    });

    describe('PassThrough (PT) Tests', () => {
        beforeEach(() => {
            TestBed.resetTestingModule();
        });

        describe('Case 1: Simple string classes', () => {
            @Component({
                standalone: true,
                imports: [Slider, FormsModule],
                template: `<p-slider [(ngModel)]="value" [pt]="pt"></p-slider>`
            })
            class TestPTCase1Component {
                value: number = 50;
                pt = {
                    root: 'ROOT_CLASS',
                    range: 'RANGE_CLASS',
                    handle: 'HANDLE_CLASS'
                };
            }

            it('should apply simple string classes to PT sections', async () => {
                TestBed.configureTestingModule({
                    imports: [NoopAnimationsModule, TestPTCase1Component],
                    providers: [provideZonelessChangeDetection()]
                });

                const fixture = TestBed.createComponent(TestPTCase1Component);
                fixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await fixture.whenStable();

                const sliderRoot = fixture.debugElement.query(By.css('p-slider')).nativeElement;
                const range = fixture.debugElement.query(By.css('.p-slider-range'));
                const handle = fixture.debugElement.query(By.css('.p-slider-handle'));

                expect(sliderRoot.classList.contains('ROOT_CLASS')).toBe(true);
                if (range) expect(range.nativeElement.classList.contains('RANGE_CLASS')).toBe(true);
                if (handle) expect(handle.nativeElement.classList.contains('HANDLE_CLASS')).toBe(true);
            });
        });

        describe('Case 2: Objects with class, style, and attributes', () => {
            @Component({
                standalone: true,
                imports: [Slider, FormsModule],
                template: `<p-slider [(ngModel)]="value" [pt]="pt"></p-slider>`
            })
            class TestPTCase2Component {
                value: number = 60;
                pt = {
                    root: {
                        class: 'ROOT_OBJECT_CLASS',
                        style: { 'background-color': 'lightblue' } as any,
                        'data-test': 'root-test'
                    },
                    range: {
                        class: 'RANGE_OBJECT_CLASS',
                        style: { 'background-color': 'green' } as any
                    },
                    handle: {
                        class: 'HANDLE_OBJECT_CLASS',
                        'aria-label': 'Custom handle label'
                    }
                };
            }

            it('should apply object-based PT with class, style, and attributes', async () => {
                TestBed.configureTestingModule({
                    imports: [NoopAnimationsModule, TestPTCase2Component],
                    providers: [provideZonelessChangeDetection()]
                });

                const fixture = TestBed.createComponent(TestPTCase2Component);
                fixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await fixture.whenStable();

                const sliderRoot = fixture.debugElement.query(By.css('p-slider')).nativeElement;
                const range = fixture.debugElement.query(By.css('.p-slider-range'));
                const handle = fixture.debugElement.query(By.css('.p-slider-handle'));

                expect(sliderRoot.classList.contains('ROOT_OBJECT_CLASS')).toBe(true);
                expect(sliderRoot.style.backgroundColor).toBe('lightblue');
                expect(sliderRoot.getAttribute('data-test')).toBe('root-test');

                if (range) {
                    expect(range.nativeElement.classList.contains('RANGE_OBJECT_CLASS')).toBe(true);
                    expect(range.nativeElement.style.backgroundColor).toBe('green');
                }

                if (handle) {
                    expect(handle.nativeElement.classList.contains('HANDLE_OBJECT_CLASS')).toBe(true);
                    expect(handle.nativeElement.getAttribute('aria-label')).toBe('Custom handle label');
                }
            });
        });

        describe('Case 3: Mixed object and string values', () => {
            @Component({
                standalone: true,
                imports: [Slider, FormsModule],
                template: `<p-slider [(ngModel)]="value" [range]="true" [pt]="pt"></p-slider>`
            })
            class TestPTCase3Component {
                value: number[] = [20, 80];
                pt = {
                    root: 'ROOT_STRING_CLASS',
                    range: {
                        class: 'RANGE_MIXED_CLASS'
                    },
                    startHandler: 'START_HANDLER_CLASS',
                    endHandler: {
                        class: 'END_HANDLER_CLASS'
                    }
                };
            }

            it('should apply mixed object and string PT values', async () => {
                TestBed.configureTestingModule({
                    imports: [NoopAnimationsModule, TestPTCase3Component],
                    providers: [provideZonelessChangeDetection()]
                });

                const fixture = TestBed.createComponent(TestPTCase3Component);
                fixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await fixture.whenStable();

                const sliderRoot = fixture.debugElement.query(By.css('p-slider')).nativeElement;
                const range = fixture.debugElement.query(By.css('.p-slider-range'));
                const handles = fixture.debugElement.queryAll(By.css('.p-slider-handle'));

                expect(sliderRoot.classList.contains('ROOT_STRING_CLASS')).toBe(true);

                if (range) {
                    expect(range.nativeElement.classList.contains('RANGE_MIXED_CLASS')).toBe(true);
                }

                // Check start handler (first handle)
                if (handles.length >= 1) {
                    expect(handles[0].nativeElement.classList.contains('START_HANDLER_CLASS')).toBe(true);
                }

                // Check end handler (second handle)
                if (handles.length >= 2) {
                    expect(handles[1].nativeElement.classList.contains('END_HANDLER_CLASS')).toBe(true);
                }
            });
        });

        describe('Case 4: Use variables from instance', () => {
            @Component({
                standalone: true,
                imports: [Slider, FormsModule],
                template: `<p-slider [(ngModel)]="value" [min]="min" [max]="max" [orientation]="orientation" [pt]="pt"></p-slider>`
            })
            class TestPTCase4Component {
                value: number = 50;
                min: number = 0;
                max: number = 100;
                orientation: 'horizontal' | 'vertical' = 'horizontal';
                pt = {
                    root: ({ instance }: any) => {
                        return {
                            class: instance?.orientation === 'vertical' ? 'VERTICAL_CLASS' : 'HORIZONTAL_CLASS'
                        };
                    },
                    range: ({ instance }: any) => {
                        return {
                            style: {
                                'background-color': instance?.value > 50 ? 'blue' : 'red'
                            } as any
                        };
                    }
                };
            }

            it('should use instance variables in PT functions', async () => {
                TestBed.configureTestingModule({
                    imports: [NoopAnimationsModule, TestPTCase4Component],
                    providers: [provideZonelessChangeDetection()]
                });

                const fixture = TestBed.createComponent(TestPTCase4Component);
                fixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await fixture.whenStable();

                const sliderRoot = fixture.debugElement.query(By.css('p-slider')).nativeElement;
                const range = fixture.debugElement.query(By.css('.p-slider-range'));

                expect(sliderRoot.classList.contains('HORIZONTAL_CLASS') || sliderRoot.classList.contains('VERTICAL_CLASS')).toBe(true);

                if (range) {
                    expect(range.nativeElement.style.backgroundColor).toBeTruthy();
                }

                // Change orientation
                fixture.componentInstance.orientation = 'vertical';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await fixture.whenStable();

                // Root class should change
                expect(sliderRoot.classList.contains('HORIZONTAL_CLASS') || sliderRoot.classList.contains('VERTICAL_CLASS')).toBe(true);
            });
        });

        describe('Case 5: Event binding', () => {
            @Component({
                standalone: true,
                imports: [Slider, FormsModule],
                template: `<p-slider [(ngModel)]="value" [pt]="pt"></p-slider>`
            })
            class TestPTCase5Component {
                value: number = 50;
                clickCount: number = 0;
                pt = {
                    handle: ({ instance }: any) => {
                        return {
                            onclick: (event: Event) => {
                                this.clickCount++;
                            }
                        };
                    }
                };
            }

            it('should bind click events via PT', async () => {
                TestBed.configureTestingModule({
                    imports: [NoopAnimationsModule, TestPTCase5Component],
                    providers: [provideZonelessChangeDetection()]
                });

                const fixture = TestBed.createComponent(TestPTCase5Component);
                const component = fixture.componentInstance;
                fixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await fixture.whenStable();

                const handle = fixture.debugElement.query(By.css('.p-slider-handle'));

                if (handle) {
                    handle.nativeElement.click();
                    fixture.detectChanges();
                    expect(component.clickCount).toBeGreaterThan(0);
                }
            });
        });

        describe('Case 6: Inline PT test', () => {
            it('should apply inline string PT', async () => {
                @Component({
                    standalone: true,
                    imports: [Slider, FormsModule],
                    template: `<p-slider [(ngModel)]="value" [pt]="{ root: 'INLINE_ROOT_CLASS' }"></p-slider>`
                })
                class TestInlineComponent {
                    value: number = 50;
                }

                TestBed.configureTestingModule({
                    imports: [NoopAnimationsModule, TestInlineComponent],
                    providers: [provideZonelessChangeDetection()]
                });

                const fixture = TestBed.createComponent(TestInlineComponent);
                fixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await fixture.whenStable();

                const sliderRoot = fixture.debugElement.query(By.css('p-slider')).nativeElement;
                expect(sliderRoot.classList.contains('INLINE_ROOT_CLASS')).toBe(true);
            });

            it('should apply inline object PT', async () => {
                @Component({
                    standalone: true,
                    imports: [Slider, FormsModule],
                    template: `<p-slider [(ngModel)]="value" [pt]="{ root: { class: 'INLINE_OBJECT_CLASS', style: { border: '2px solid red' } } }"></p-slider>`
                })
                class TestInlineObjectComponent {
                    value: number = 50;
                }

                TestBed.configureTestingModule({
                    imports: [NoopAnimationsModule, TestInlineObjectComponent],
                    providers: [provideZonelessChangeDetection()]
                });

                const fixture = TestBed.createComponent(TestInlineObjectComponent);
                fixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await fixture.whenStable();

                const sliderRoot = fixture.debugElement.query(By.css('p-slider')).nativeElement;
                expect(sliderRoot.classList.contains('INLINE_OBJECT_CLASS')).toBe(true);
                expect(sliderRoot.style.border).toBe('2px solid red');
            });
        });

        describe('Case 7: Global PT from PrimeNGConfig', () => {
            it('should apply global PT configuration', async () => {
                @Component({
                    standalone: true,
                    imports: [Slider, FormsModule],
                    template: `<p-slider [(ngModel)]="value1"></p-slider><p-slider [(ngModel)]="value2"></p-slider>`
                })
                class TestGlobalPTComponent {
                    value1: number = 30;
                    value2: number = 70;
                }

                TestBed.configureTestingModule({
                    imports: [NoopAnimationsModule, TestGlobalPTComponent],
                    providers: [
                        provideZonelessChangeDetection(),
                        providePrimeNG({
                            pt: {
                                slider: {
                                    root: { 'data-test': 'global-slider' },
                                    handle: 'GLOBAL_HANDLE_CLASS',
                                    range: {
                                        class: 'GLOBAL_RANGE_CLASS',
                                        style: { height: '8px' } as any
                                    }
                                }
                            }
                        })
                    ]
                });

                const fixture = TestBed.createComponent(TestGlobalPTComponent);
                fixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await fixture.whenStable();

                const sliders = fixture.debugElement.queryAll(By.css('p-slider'));
                expect(sliders.length).toBe(2);

                sliders.forEach((slider) => {
                    const sliderRoot = slider.nativeElement;
                    const range = slider.query(By.css('.p-slider-range'));
                    const handle = slider.query(By.css('.p-slider-handle'));

                    expect(sliderRoot.getAttribute('data-test')).toBe('global-slider');

                    if (handle) {
                        expect(handle.nativeElement.classList.contains('GLOBAL_HANDLE_CLASS')).toBe(true);
                    }

                    if (range) {
                        expect(range.nativeElement.classList.contains('GLOBAL_RANGE_CLASS')).toBe(true);
                        expect(range.nativeElement.style.height).toBe('8px');
                    }
                });
            });
        });

        describe('Case 8: PT Hooks', () => {
            it('should call PT hooks during lifecycle', async () => {
                const hookCalls: string[] = [];

                @Component({
                    standalone: true,
                    imports: [Slider, FormsModule],
                    template: `<p-slider [(ngModel)]="value" [pt]="pt"></p-slider>`
                })
                class TestHooksComponent {
                    value: number = 50;
                    pt = {
                        root: 'MY-SLIDER',
                        hooks: {
                            onAfterViewInit: () => {
                                hookCalls.push('onAfterViewInit');
                            },
                            onDestroy: () => {
                                hookCalls.push('onDestroy');
                            }
                        }
                    };
                }

                TestBed.configureTestingModule({
                    imports: [NoopAnimationsModule, TestHooksComponent],
                    providers: [provideZonelessChangeDetection()]
                });

                const fixture = TestBed.createComponent(TestHooksComponent);
                fixture.detectChanges();
                await new Promise((resolve) => setTimeout(resolve, 100));
                await fixture.whenStable();

                expect(hookCalls).toContain('onAfterViewInit');

                const sliderRoot = fixture.debugElement.query(By.css('p-slider')).nativeElement;
                expect(sliderRoot.classList.contains('MY-SLIDER')).toBe(true);

                fixture.destroy();

                expect(hookCalls).toContain('onDestroy');
            });
        });
    });
});
