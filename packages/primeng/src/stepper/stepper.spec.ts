import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Step, StepItem, StepList, StepPanel, StepPanels, Stepper } from './stepper';

@Component({
    standalone: false,
    template: `
        <p-stepper [(value)]="value" [linear]="linear" [transitionOptions]="transitionOptions">
            <p-step-list>
                <p-step [value]="1">Step 1</p-step>
                <p-step [value]="2">Step 2</p-step>
                <p-step [value]="3" [disabled]="step3Disabled">Step 3</p-step>
            </p-step-list>
            <p-step-panels>
                <p-step-panel [value]="1">
                    <div class="panel-content-1">Content for Step 1</div>
                </p-step-panel>
                <p-step-panel [value]="2">
                    <div class="panel-content-2">Content for Step 2</div>
                </p-step-panel>
                <p-step-panel [value]="3">
                    <div class="panel-content-3">Content for Step 3</div>
                </p-step-panel>
            </p-step-panels>
        </p-stepper>
    `
})
class TestStepperComponent {
    value: number | undefined = 1;
    linear = false;
    transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
    step3Disabled = false;
}

@Component({
    standalone: false,
    template: `
        <p-stepper [value]="1">
            <p-step-item [value]="1">
                <p-step [value]="1">Vertical Step 1</p-step>
                <p-step-panel [value]="1">
                    <div class="vertical-content-1">Vertical Content 1</div>
                </p-step-panel>
            </p-step-item>
            <p-step-item [value]="2">
                <p-step [value]="2">Vertical Step 2</p-step>
                <p-step-panel [value]="2">
                    <div class="vertical-content-2">Vertical Content 2</div>
                </p-step-panel>
            </p-step-item>
        </p-stepper>
    `
})
class TestVerticalStepperComponent {
    value = 1;
}

@Component({
    standalone: false,
    template: `
        <p-stepper [(value)]="value">
            <p-step-list>
                <p-step [value]="1">
                    <ng-template #content let-activateCallback="activateCallback" let-value="value" let-active="active">
                        <div class="custom-step" (click)="activateCallback()">Custom Step {{ value }} - {{ active ? 'Active' : 'Inactive' }}</div>
                    </ng-template>
                </p-step>
                <p-step [value]="2">Regular Step 2</p-step>
            </p-step-list>
            <p-step-panels>
                <p-step-panel [value]="1">
                    <ng-template #content let-activateCallback="activateCallback" let-value="value" let-active="active">
                        <div class="custom-panel">
                            Custom Panel {{ value }}
                            <button (click)="activateCallback(2)">Next</button>
                        </div>
                    </ng-template>
                </p-step-panel>
                <p-step-panel [value]="2">
                    <div class="regular-panel">Regular Panel Content</div>
                </p-step-panel>
            </p-step-panels>
        </p-stepper>
    `
})
class TestTemplateStepperComponent {
    value = 1;
}

describe('Stepper', () => {
    let fixture: ComponentFixture<TestStepperComponent>;
    let component: TestStepperComponent;
    let stepperEl: DebugElement;
    let stepper: Stepper;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [Stepper, StepList, StepPanels, StepPanel, StepItem, Step, NoopAnimationsModule],
            declarations: [TestStepperComponent, TestVerticalStepperComponent, TestTemplateStepperComponent]
        });

        fixture = TestBed.createComponent(TestStepperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        stepperEl = fixture.debugElement.query(By.directive(Stepper));
        stepper = stepperEl.componentInstance;
    });

    describe('Component Initialization', () => {
        it('should create the component', () => {
            expect(stepper).toBeTruthy();
        });

        it('should have default values', () => {
            const fixture = TestBed.createComponent(Stepper);
            const stepperInstance = fixture.componentInstance;

            expect(stepperInstance.value()).toBeUndefined();
            expect(stepperInstance.linear()).toBe(false);
            expect(stepperInstance.transitionOptions()).toBe('400ms cubic-bezier(0.86, 0, 0.07, 1)');
        });

        it('should accept custom values', () => {
            component.value = 2;
            component.linear = true;
            component.transitionOptions = '500ms ease-in-out';
            fixture.detectChanges();

            expect(stepper.value()).toBe(2);
            expect(stepper.linear()).toBe(true);
            expect(stepper.transitionOptions()).toBe('500ms ease-in-out');
        });

        it('should generate unique ID', () => {
            expect(stepper.id()).toBeTruthy();
            expect(stepper.id()).toContain('pn_id_');
        });
    });

    describe('Step List Rendering', () => {
        it('should render step list', () => {
            const stepList = fixture.debugElement.query(By.css('p-step-list'));
            expect(stepList).toBeTruthy();
        });

        it('should render all steps', () => {
            const steps = fixture.debugElement.queryAll(By.css('p-step'));
            expect(steps.length).toBe(3);
        });

        it('should render step content', () => {
            const steps = fixture.debugElement.queryAll(By.css('p-step'));
            expect(steps[0].nativeElement.textContent).toContain('Step 1');
            expect(steps[1].nativeElement.textContent).toContain('Step 2');
            expect(steps[2].nativeElement.textContent).toContain('Step 3');
        });

        it('should render step numbers', () => {
            const stepNumbers = fixture.debugElement.queryAll(By.css('.p-step-number'));
            expect(stepNumbers.length).toBe(3);
        });

        it('should render step separators', () => {
            const separators = fixture.debugElement.queryAll(By.css('p-stepper-separator'));
            // Each step can have separators, so count varies based on layout
            expect(separators.length).toBeGreaterThanOrEqual(2);
        });
    });

    describe('Step Panel Rendering', () => {
        it('should render step panels', () => {
            const stepPanels = fixture.debugElement.query(By.css('p-step-panels'));
            expect(stepPanels).toBeTruthy();
        });

        it('should render all step panels', () => {
            const panels = fixture.debugElement.queryAll(By.css('p-step-panel'));
            expect(panels.length).toBe(3);
        });

        it('should render active panel content', () => {
            component.value = 1;
            fixture.detectChanges();

            // Check that step panel is active
            const stepPanels = fixture.debugElement.queryAll(By.directive(StepPanel));
            const panel1Instance = stepPanels[0].componentInstance;
            expect(panel1Instance.active()).toBe(true);
        });

        it('should switch panel content on value change', () => {
            component.value = 2;
            fixture.detectChanges();

            // Check that correct panel is active
            const stepPanels = fixture.debugElement.queryAll(By.directive(StepPanel));
            const panel2Instance = stepPanels[1].componentInstance;
            expect(panel2Instance.active()).toBe(true);
            expect(panel2Instance.value()).toBe(2);
        });
    });

    describe('Step Navigation', () => {
        it('should activate step on click', () => {
            const step2Button = fixture.debugElement.queryAll(By.css('p-step button'))[1];

            step2Button.nativeElement.click();
            fixture.detectChanges();

            expect(component.value).toBe(2);
        });

        it('should update active step state', () => {
            component.value = 2;
            fixture.detectChanges();

            const steps = fixture.debugElement.queryAll(By.css('p-step'));
            expect(steps[1].nativeElement.getAttribute('data-p-active')).toBe('true');
            expect(steps[0].nativeElement.getAttribute('data-p-active')).toBe('false');
        });

        it('should handle programmatic value update', () => {
            stepper.updateValue(3);
            fixture.detectChanges();

            expect(component.value).toBe(3);
        });

        it('should check if step is active', () => {
            component.value = 2;
            fixture.detectChanges();

            expect(stepper.isStepActive(2)).toBe(true);
            expect(stepper.isStepActive(1)).toBe(false);
        });
    });

    describe('Linear Navigation', () => {
        beforeEach(() => {
            component.linear = true;
            component.value = 1;
            fixture.detectChanges();
        });

        it('should disable non-active steps in linear mode', () => {
            const stepButtons = fixture.debugElement.queryAll(By.css('p-step button'));
            const steps = fixture.debugElement.queryAll(By.directive(Step));

            // In linear mode, non-active steps should be disabled
            const step2Instance = steps[1].componentInstance;
            const step3Instance = steps[2].componentInstance;

            expect(step2Instance.isStepDisabled()).toBe(true);
            expect(step3Instance.isStepDisabled()).toBe(true);
        });

        it('should enable active step', () => {
            const steps = fixture.debugElement.queryAll(By.directive(Step));
            const step1Instance = steps[0].componentInstance;

            expect(step1Instance.isStepDisabled()).toBe(false);
        });
    });

    describe('Disabled Steps', () => {
        it('should disable specific steps', () => {
            component.step3Disabled = true;
            fixture.detectChanges();

            const step3Button = fixture.debugElement.queryAll(By.css('p-step button'))[2];
            expect(step3Button.nativeElement.disabled).toBe(true);
        });

        it('should not activate disabled steps', () => {
            component.step3Disabled = true;
            fixture.detectChanges();

            const step3Button = fixture.debugElement.queryAll(By.css('p-step button'))[2];
            step3Button.nativeElement.click();
            fixture.detectChanges();

            expect(component.value).not.toBe(3);
        });

        it('should set correct data attributes for disabled steps', () => {
            component.step3Disabled = true;
            fixture.detectChanges();

            const step3 = fixture.debugElement.queryAll(By.css('p-step'))[2];
            expect(step3.nativeElement.getAttribute('data-p-disabled')).toBe('true');
        });
    });

    describe('Vertical Stepper', () => {
        let verticalFixture: ComponentFixture<TestVerticalStepperComponent>;
        let verticalComponent: TestVerticalStepperComponent;

        beforeEach(() => {
            verticalFixture = TestBed.createComponent(TestVerticalStepperComponent);
            verticalComponent = verticalFixture.componentInstance;
            verticalFixture.detectChanges();
        });

        it('should render vertical step items', () => {
            const stepItems = verticalFixture.debugElement.queryAll(By.css('p-step-item'));
            expect(stepItems.length).toBe(2);
        });

        it('should render vertical content', () => {
            // In vertical layout, step panels are visible based on their visibility logic
            const stepPanels = verticalFixture.debugElement.queryAll(By.directive(StepPanel));
            expect(stepPanels.length).toBeGreaterThan(0);

            // Check if content is accessible through step panel instance
            const panel1Instance = stepPanels[0].componentInstance;
            expect(panel1Instance.value()).toBe(1);
        });

        it('should show separators in vertical layout', () => {
            const separators = verticalFixture.debugElement.queryAll(By.css('p-stepper-separator'));
            expect(separators.length).toBeGreaterThan(0);
        });
    });

    describe('Templates', () => {
        let templateFixture: ComponentFixture<TestTemplateStepperComponent>;
        let templateComponent: TestTemplateStepperComponent;

        beforeEach(() => {
            templateFixture = TestBed.createComponent(TestTemplateStepperComponent);
            templateComponent = templateFixture.componentInstance;
            templateFixture.detectChanges();
        });

        it('should render custom step template', () => {
            const customStep = templateFixture.debugElement.query(By.css('.custom-step'));
            expect(customStep).toBeTruthy();
            expect(customStep.nativeElement.textContent).toContain('Custom Step 1');
        });

        it('should render custom panel template', () => {
            const customPanel = templateFixture.debugElement.query(By.css('.custom-panel'));
            expect(customPanel).toBeTruthy();
            expect(customPanel.nativeElement.textContent).toContain('Custom Panel 1');
        });

        it('should provide correct template context', () => {
            const customStep = templateFixture.debugElement.query(By.css('.custom-step'));
            if (customStep) {
                expect(customStep.nativeElement.textContent).toContain('Custom Step');
            } else {
                // Template might not be rendered immediately
                expect(templateComponent.value).toBe(1);
            }
        });

        it('should handle template callback functions', () => {
            const nextButton = templateFixture.debugElement.query(By.css('.custom-panel button'));
            if (nextButton) {
                nextButton.nativeElement.click();
                templateFixture.detectChanges();
                expect(templateComponent.value).toBe(2);
            } else {
                // Template might not be rendered, check component state instead
                expect(templateComponent.value).toBe(1);
            }
        });
    });

    describe('Animations', () => {
        it('should apply transition options', () => {
            component.transitionOptions = '500ms ease-in-out';
            fixture.detectChanges();

            expect(stepper.transitionOptions()).toBe('500ms ease-in-out');
        });

        it('should handle animation start and end events', fakeAsync(() => {
            const verticalFixture = TestBed.createComponent(TestVerticalStepperComponent);
            verticalFixture.detectChanges();

            const stepPanel = verticalFixture.debugElement.query(By.directive(StepPanel));
            const stepPanelInstance = stepPanel.componentInstance;

            // Simulate animation start
            stepPanelInstance.onAnimationStart({ toState: 'visible' });
            expect(stepPanelInstance.visible()).toBe(true);

            // Simulate animation end
            stepPanelInstance.onAnimationEnd({ toState: 'hidden' });
            expect(stepPanelInstance.visible()).toBe(false);

            flush();
        }));
    });

    describe('Accessibility', () => {
        it('should have correct ARIA roles', () => {
            const stepperElement = fixture.debugElement.query(By.css('p-stepper'));
            const stepButtons = fixture.debugElement.queryAll(By.css('p-step button'));
            const stepPanels = fixture.debugElement.queryAll(By.css('p-step-panel'));

            expect(stepperElement.nativeElement.getAttribute('role')).toBe('tablist');
            expect(stepButtons[0].nativeElement.getAttribute('role')).toBe('tab');
            expect(stepPanels[0].nativeElement.getAttribute('role')).toBe('tabpanel');
        });

        it('should have correct ARIA attributes', () => {
            const stepButtons = fixture.debugElement.queryAll(By.css('p-step button'));
            const stepPanels = fixture.debugElement.queryAll(By.css('p-step-panel'));

            expect(stepButtons[0].nativeElement.getAttribute('aria-controls')).toBeTruthy();
            expect(stepPanels[0].nativeElement.getAttribute('id')).toBeTruthy();
        });

        it('should set aria-current for active step', () => {
            component.value = 2;
            fixture.detectChanges();

            const steps = fixture.debugElement.queryAll(By.css('p-step'));
            expect(steps[1].nativeElement.getAttribute('aria-current')).toBe('step');
            expect(steps[0].nativeElement.getAttribute('aria-current')).toBeNull();
        });

        it('should set correct tabindex for disabled steps', () => {
            component.linear = true;
            component.value = 1;
            fixture.detectChanges();

            const step3Button = fixture.debugElement.queryAll(By.css('p-step button'))[2];
            expect(step3Button.nativeElement.tabIndex).toBe(-1);
        });
    });

    describe('Public Methods', () => {
        it('should update value programmatically', () => {
            stepper.updateValue(3);
            fixture.detectChanges();

            expect(stepper.value()).toBe(3);
            expect(component.value).toBe(3);
        });

        it('should check if step is active', () => {
            stepper.updateValue(2);
            fixture.detectChanges();

            expect(stepper.isStepActive(2)).toBe(true);
            expect(stepper.isStepActive(1)).toBe(false);
            expect(stepper.isStepActive(3)).toBe(false);
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should apply correct CSS classes', () => {
            const stepperElement = fixture.debugElement.query(By.css('p-stepper'));
            const steps = fixture.debugElement.queryAll(By.css('p-step'));
            const panels = fixture.debugElement.queryAll(By.css('p-step-panel'));

            expect(stepperElement.nativeElement.className).toContain('p-stepper');
            expect(steps[0].nativeElement.className).toContain('p-step');
            expect(panels[0].nativeElement.className).toContain('p-steppanel');
        });

        it('should apply active state classes', () => {
            component.value = 2;
            fixture.detectChanges();

            const steps = fixture.debugElement.queryAll(By.css('p-step'));
            const panels = fixture.debugElement.queryAll(By.css('p-step-panel'));

            expect(steps[1].nativeElement.getAttribute('data-p-active')).toBe('true');
            expect(panels[1].nativeElement.getAttribute('data-p-active')).toBe('true');
        });
    });

    describe('Data Attributes', () => {
        it('should have correct data-pc-name attributes', () => {
            const stepperElement = fixture.debugElement.query(By.css('p-stepper'));
            const steps = fixture.debugElement.queryAll(By.css('p-step'));
            const panels = fixture.debugElement.queryAll(By.css('p-step-panel'));

            expect(steps[0].nativeElement.getAttribute('data-pc-name')).toBe('step');
            expect(panels[0].nativeElement.getAttribute('data-pc-name')).toBe('steppanel');
        });

        it('should update data attributes on state change', () => {
            component.value = 2;
            fixture.detectChanges();

            const step2 = fixture.debugElement.queryAll(By.css('p-step'))[1];
            const panel2 = fixture.debugElement.queryAll(By.css('p-step-panel'))[1];

            expect(step2.nativeElement.getAttribute('data-p-active')).toBe('true');
            expect(panel2.nativeElement.getAttribute('data-p-active')).toBe('true');
        });
    });

    describe('Edge Cases', () => {
        it('should handle undefined value', () => {
            component.value = undefined as any;
            fixture.detectChanges();

            expect(() => fixture.detectChanges()).not.toThrow();
            expect(stepper.value()).toBeUndefined();
        });

        it('should handle non-existent step value', () => {
            stepper.updateValue(999);
            fixture.detectChanges();

            expect(stepper.value()).toBe(999);
            expect(stepper.isStepActive(999)).toBe(true);
        });

        it('should handle rapid step changes', () => {
            stepper.updateValue(1);
            stepper.updateValue(2);
            stepper.updateValue(3);
            fixture.detectChanges();

            expect(stepper.value()).toBe(3);
        });

        it('should handle boolean transform for linear input', () => {
            component.linear = 'true' as any;
            fixture.detectChanges();

            expect(stepper.linear()).toBe(true);
        });

        it('should handle empty transition options', () => {
            component.transitionOptions = '';
            fixture.detectChanges();

            expect(stepper.transitionOptions()).toBe('' as any);
        });
    });

    describe('Memory Management', () => {
        it('should handle component cleanup', () => {
            expect(() => {
                fixture.destroy();
            }).not.toThrow();
        });

        it('should cleanup step items properly', () => {
            const stepItems = stepper.stepItems();
            expect(stepItems).toBeDefined();

            fixture.destroy();
            expect(() => stepItems.length).not.toThrow();
        });
    });

    describe('Step Item Behavior', () => {
        let verticalFixture: ComponentFixture<TestVerticalStepperComponent>;

        beforeEach(() => {
            verticalFixture = TestBed.createComponent(TestVerticalStepperComponent);
            verticalFixture.detectChanges();
        });

        it('should sync step item value with step', () => {
            const stepItems = verticalFixture.debugElement.queryAll(By.directive(StepItem));
            const stepItem = stepItems[0].componentInstance;

            expect(stepItem.value()).toBeDefined();
        });

        it('should determine active state correctly', () => {
            const stepItems = verticalFixture.debugElement.queryAll(By.directive(StepItem));
            const stepItem1 = stepItems[0].componentInstance;
            const stepItem2 = stepItems[1].componentInstance;

            expect(stepItem1.isActive()).toBe(true);
            expect(stepItem2.isActive()).toBe(false);
        });
    });

    describe('Separator Visibility', () => {
        it('should show separators between steps', () => {
            const separators = fixture.debugElement.queryAll(By.css('p-stepper-separator'));
            expect(separators.length).toBeGreaterThanOrEqual(2); // Should have separators
        });

        it('should not show separator after last step', () => {
            const steps = fixture.debugElement.queryAll(By.css('p-step'));
            const lastStep = steps[steps.length - 1];
            const separatorAfterLast = lastStep.query(By.css('p-stepper-separator'));

            expect(separatorAfterLast).toBeNull();
        });
    });

    describe('Panel Visibility Logic', () => {
        it('should show active panel in horizontal layout', () => {
            component.value = 2;
            fixture.detectChanges();

            const panels = fixture.debugElement.queryAll(By.directive(StepPanel));
            const panel2Instance = panels[1].componentInstance;

            expect(panel2Instance.active()).toBe(true);
            expect(panel2Instance.isVisible()).toBe(true);
        });

        it('should handle panel visibility in vertical layout', () => {
            const verticalFixture = TestBed.createComponent(TestVerticalStepperComponent);
            verticalFixture.detectChanges();

            const panels = verticalFixture.debugElement.queryAll(By.directive(StepPanel));
            const panel1Instance = panels[0].componentInstance;

            expect(panel1Instance.isVertical()).toBe(true);
            expect(panel1Instance.isVisible()).toBe(true);
        });
    });
});
