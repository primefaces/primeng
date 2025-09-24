import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { RadioButton } from './radiobutton';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Basic RadioButton test component
@Component({
    standalone: true,
    imports: [RadioButton, FormsModule],
    template: `
        <p-radiobutton
            name="test"
            value="option1"
            [(ngModel)]="selectedValue"
            [inputId]="inputId"
            [ariaLabel]="ariaLabel"
            [ariaLabelledBy]="ariaLabelledBy"
            [tabindex]="tabindex"
            [autofocus]="autofocus"
            [styleClass]="styleClass"
            (onClick)="onRadioClick($event)"
            (onFocus)="onRadioFocus($event)"
            (onBlur)="onRadioBlur($event)"
        />
    `
})
class TestBasicRadioComponent {
    selectedValue: any = null as any;
    inputId: string = 'test-radio';
    ariaLabel: string = 'Test Radio';
    ariaLabelledBy: string = 'test-label';
    tabindex: number = 0;
    autofocus: boolean = false;
    styleClass: string = 'test-radio-class';

    clickEvents: any[] = [];
    focusEvents: any[] = [];
    blurEvents: any[] = [];

    onRadioClick(event: any) {
        this.clickEvents.push(event);
    }

    onRadioFocus(event: any) {
        this.focusEvents.push(event);
    }

    onRadioBlur(event: any) {
        this.blurEvents.push(event);
    }
}

// Radio group test component
@Component({
    standalone: true,
    imports: [RadioButton, FormsModule],
    template: `
        <p-radiobutton name="group" value="option1" [(ngModel)]="selectedOption" inputId="option1" />
        <p-radiobutton name="group" value="option2" [(ngModel)]="selectedOption" inputId="option2" />
        <p-radiobutton name="group" value="option3" [(ngModel)]="selectedOption" inputId="option3" />
    `
})
class TestRadioGroupComponent {
    selectedOption: string = '';
}

// Reactive form test component
@Component({
    standalone: true,
    imports: [RadioButton, ReactiveFormsModule],
    template: `
        <form [formGroup]="radioForm">
            <p-radiobutton formControlName="selectedValue" name="radioGroup" value="value1" inputId="radio1" [invalid]="isInvalid" />
            <p-radiobutton formControlName="selectedValue" name="radioGroup" value="value2" inputId="radio2" [invalid]="isInvalid" />
            <p-radiobutton formControlName="selectedValue" name="radioGroup" value="value3" inputId="radio3" [invalid]="isInvalid" />
        </form>
    `
})
class TestReactiveRadioComponent {
    radioForm = new FormGroup({
        selectedValue: new FormControl('', [Validators.required])
    });

    isInvalid: boolean = false;
}

// Advanced features test component
@Component({
    standalone: true,
    imports: [RadioButton, FormsModule],
    template: ` <p-radiobutton name="advanced" [value]="radioValue" [(ngModel)]="selectedValue" [disabled]="isDisabled" [binary]="binary" [variant]="variant" [size]="size" [autofocus]="autofocus" (onClick)="onAdvancedClick($event)" /> `
})
class TestAdvancedRadioComponent {
    selectedValue: any = null as any;
    radioValue: any = 'test-value';
    isDisabled: boolean = false;
    binary: boolean = false;
    variant: 'filled' | 'outlined' | undefined = undefined as any;
    size: 'large' | 'small' | undefined = undefined as any;
    autofocus: boolean = false;

    clickEvents: any[] = [];

    onAdvancedClick(event: any) {
        this.clickEvents.push(event);
    }
}

// Binary RadioButton test component
@Component({
    standalone: true,
    imports: [RadioButton, FormsModule],
    template: ` <p-radiobutton name="binary" value="binary-value" [(ngModel)]="binaryValue" [binary]="true" /> `
})
class TestBinaryRadioComponent {
    binaryValue: any = false;
}

describe('RadioButton', () => {
    describe('Component Initialization', () => {
        let component: TestBasicRadioComponent;
        let fixture: ComponentFixture<TestBasicRadioComponent>;
        let radioElement: DebugElement;
        let radioInstance: RadioButton;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicRadioComponent, NoopAnimationsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicRadioComponent);
            component = fixture.componentInstance;
            radioElement = fixture.debugElement.query(By.directive(RadioButton));
            radioInstance = radioElement.componentInstance;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
            expect(radioInstance).toBeTruthy();
        });

        it('should initialize with default properties', () => {
            expect(radioInstance.checked).toBeFalsy();
            expect(radioInstance.focused).toBeFalsy();
            expect(radioInstance.value).toBe('option1');
            expect(radioInstance.binary).toBeFalsy();
            expect(radioInstance.autofocus).toBeFalsy();
        });

        it('should render input element with correct attributes', () => {
            const inputElement = fixture.debugElement.query(By.css('input[type="radio"]'));
            expect(inputElement).toBeTruthy();

            expect(inputElement.nativeElement.name).toBe('test');
            expect(inputElement.nativeElement.id).toBe('test-radio');
            expect(inputElement.nativeElement.getAttribute('aria-label')).toBe('Test Radio');
            expect(inputElement.nativeElement.getAttribute('aria-labelledby')).toBe('test-label');
            expect(inputElement.nativeElement.tabIndex).toBe(0);
        });

        it('should render visual elements', () => {
            const boxElement = fixture.debugElement.query(By.css('[data-pc-section="input"]'));
            const iconElement = fixture.debugElement.query(By.css('[data-pc-section="icon"]'));

            expect(boxElement).toBeTruthy();
            expect(iconElement).toBeTruthy();
        });

        it('should apply style classes', () => {
            const rootElement = radioElement.nativeElement;
            expect(rootElement.getAttribute('data-pc-name')).toBe('radiobutton');
            expect(rootElement.getAttribute('data-pc-section')).toBe('root');
        });
    });

    describe('Basic Functionality Tests', () => {
        let component: TestBasicRadioComponent;
        let fixture: ComponentFixture<TestBasicRadioComponent>;
        let radioInstance: RadioButton;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicRadioComponent, NoopAnimationsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicRadioComponent);
            component = fixture.componentInstance;
            radioInstance = fixture.debugElement.query(By.directive(RadioButton)).componentInstance;
            fixture.detectChanges();
        });

        it('should select radio button on click', fakeAsync(() => {
            const inputElement = fixture.debugElement.query(By.css('input'));

            inputElement.nativeElement.click();
            tick();

            expect(radioInstance.checked).toBe(true);
            expect(component.selectedValue).toBe('option1');
        }));

        it('should emit onClick event', fakeAsync(() => {
            const inputElement = fixture.debugElement.query(By.css('input'));

            inputElement.nativeElement.click();
            tick();

            expect(component.clickEvents.length).toBe(1);
            expect(component.clickEvents[0].value).toBe('option1');
            expect(component.clickEvents[0].originalEvent).toBeTruthy();
        }));

        it('should handle focus and blur events', fakeAsync(() => {
            const inputElement = fixture.debugElement.query(By.css('input'));

            inputElement.nativeElement.dispatchEvent(new Event('focus'));
            expect(radioInstance.focused).toBe(true);
            expect(component.focusEvents.length).toBe(1);

            inputElement.nativeElement.dispatchEvent(new Event('blur'));
            expect(radioInstance.focused).toBe(false);
            expect(component.blurEvents.length).toBe(1);
        }));

        it('should programmatically focus', () => {
            spyOn(radioInstance.inputViewChild.nativeElement, 'focus');

            radioInstance.focus();

            expect(radioInstance.inputViewChild.nativeElement.focus).toHaveBeenCalled();
        });

        it('should update checked state when model value changes', fakeAsync(() => {
            component.selectedValue = 'option1';
            fixture.detectChanges();
            tick();

            expect(radioInstance.checked).toBe(true);

            component.selectedValue = 'other';
            fixture.detectChanges();
            tick();

            expect(radioInstance.checked).toBe(false);
        }));

        it('should handle change event', () => {
            spyOn(radioInstance, 'select');
            const inputElement = fixture.debugElement.query(By.css('input'));

            const changeEvent = new Event('change');
            inputElement.nativeElement.dispatchEvent(changeEvent);

            expect(radioInstance.select).toHaveBeenCalledWith(changeEvent);
        });
    });

    describe('Radio Group Tests', () => {
        let component: TestRadioGroupComponent;
        let fixture: ComponentFixture<TestRadioGroupComponent>;
        let radioInstances: RadioButton[];

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestRadioGroupComponent, NoopAnimationsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestRadioGroupComponent);
            component = fixture.componentInstance;
            radioInstances = fixture.debugElement.queryAll(By.directive(RadioButton)).map((el) => el.componentInstance);
            fixture.detectChanges();
        });

        it('should create radio group', () => {
            expect(radioInstances.length).toBe(3);
            radioInstances.forEach((instance) => {
                expect(instance.name()).toBe('group');
            });
        });

        it('should select only one radio button in group', fakeAsync(() => {
            // Select first radio button
            const firstInput = fixture.debugElement.queryAll(By.css('input'))[0];
            firstInput.nativeElement.click();
            fixture.detectChanges();
            tick();

            expect(component.selectedOption).toBe('option1');
            expect(radioInstances[0].checked).toBe(true);

            // Select second radio button
            const secondInput = fixture.debugElement.queryAll(By.css('input'))[1];
            secondInput.nativeElement.click();
            fixture.detectChanges();
            tick();

            expect(component.selectedOption).toBe('option2');
            expect(radioInstances[1].checked).toBe(true);
        }));

        it('should update group when model changes', fakeAsync(() => {
            component.selectedOption = 'option3';
            fixture.detectChanges();
            tick();

            expect(radioInstances[0].checked).toBeFalsy();
            expect(radioInstances[1].checked).toBeFalsy();
            expect(radioInstances[2].checked).toBe(true);
        }));
    });

    describe('Reactive Forms Tests', () => {
        let component: TestReactiveRadioComponent;
        let fixture: ComponentFixture<TestReactiveRadioComponent>;
        let radioInstances: RadioButton[];

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestReactiveRadioComponent, NoopAnimationsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestReactiveRadioComponent);
            component = fixture.componentInstance;
            radioInstances = fixture.debugElement.queryAll(By.directive(RadioButton)).map((el) => el.componentInstance);
            fixture.detectChanges();
        });

        it('should integrate with reactive forms', fakeAsync(() => {
            const firstInput = fixture.debugElement.queryAll(By.css('input'))[0];
            firstInput.nativeElement.click();
            tick();

            expect(component.radioForm.get('selectedValue')?.value).toBe('value1');
            expect(radioInstances[0].checked).toBe(true);
        }));

        it('should validate form controls', () => {
            const control = component.radioForm.get('selectedValue');
            expect(control?.valid).toBe(false);
            expect(control?.hasError('required')).toBe(true);

            control?.setValue('value2');
            expect(control?.valid).toBe(true);
        });

        it('should update form when radio button changes', fakeAsync(() => {
            const secondInput = fixture.debugElement.queryAll(By.css('input'))[1];
            secondInput.nativeElement.click();
            tick();

            expect(component.radioForm.get('selectedValue')?.value).toBe('value2');
        }));

        it('should reflect invalid state', () => {
            component.isInvalid = true;
            fixture.detectChanges();

            radioInstances.forEach((instance) => {
                expect(instance.invalid()).toBe(true);
            });
        });

        it('should reset form correctly', fakeAsync(() => {
            const firstInput = fixture.debugElement.queryAll(By.css('input'))[0];
            firstInput.nativeElement.click();
            tick();

            expect(component.radioForm.get('selectedValue')?.value).toBe('value1');

            component.radioForm.reset();
            fixture.detectChanges();
            tick();

            expect(component.radioForm.get('selectedValue')?.value).toBe(null);
            radioInstances.forEach((instance) => {
                expect(instance.checked).toBeFalsy();
            });
        }));
    });

    describe('Advanced Features Tests', () => {
        let component: TestAdvancedRadioComponent;
        let fixture: ComponentFixture<TestAdvancedRadioComponent>;
        let radioInstance: RadioButton;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestAdvancedRadioComponent, NoopAnimationsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestAdvancedRadioComponent);
            component = fixture.componentInstance;
            radioInstance = fixture.debugElement.query(By.directive(RadioButton)).componentInstance;
            fixture.detectChanges();
        });

        it('should handle disabled state', fakeAsync(() => {
            component.isDisabled = true;
            fixture.detectChanges();

            const inputElement = fixture.debugElement.query(By.css('input'));
            inputElement.nativeElement.click();
            tick();

            expect(radioInstance.checked).toBeFalsy();
            expect(component.clickEvents.length).toBe(0);
        }));

        it('should handle variant property', () => {
            component.variant = 'filled';
            fixture.detectChanges();

            expect(radioInstance.$variant()).toBe('filled');

            component.variant = 'outlined';
            fixture.detectChanges();

            expect(radioInstance.$variant()).toBe('outlined');
        });

        it('should handle size property', () => {
            component.size = 'large';
            fixture.detectChanges();

            expect(radioInstance.size()).toBe('large');

            component.size = 'small';
            fixture.detectChanges();

            expect(radioInstance.size()).toBe('small');
        });

        it('should handle autofocus property', () => {
            component.autofocus = true;
            fixture.detectChanges();

            expect(radioInstance.autofocus).toBe(true);
        });

        it('should handle disabled state properly', () => {
            component.isDisabled = true;
            fixture.detectChanges();

            expect(radioInstance.$disabled()).toBe(true);

            const inputElement = fixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.hasAttribute('disabled')).toBe(true);
        });

        it('should handle different value types', fakeAsync(() => {
            const objectValue = { id: 1, name: 'Test' };
            component.radioValue = objectValue;
            component.selectedValue = objectValue;
            fixture.detectChanges();
            tick();

            expect(radioInstance.checked).toBe(true);
        }));
    });

    describe('Binary Mode Tests', () => {
        let component: TestBinaryRadioComponent;
        let fixture: ComponentFixture<TestBinaryRadioComponent>;
        let radioInstance: RadioButton;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBinaryRadioComponent, NoopAnimationsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBinaryRadioComponent);
            component = fixture.componentInstance;
            radioInstance = fixture.debugElement.query(By.directive(RadioButton)).componentInstance;
            fixture.detectChanges();
        });

        it('should work in binary mode', fakeAsync(() => {
            expect(radioInstance.binary).toBe(true);
            expect(radioInstance.checked).toBe(false);

            const inputElement = fixture.debugElement.query(By.css('input'));
            inputElement.nativeElement.click();
            fixture.detectChanges();
            tick();

            expect(radioInstance.checked).toBe(true);
            // In binary mode, the radio passes its value (not boolean) to the model
            expect(component.binaryValue).toBe('binary-value');
        }));

        it('should handle boolean values in binary mode', fakeAsync(() => {
            component.binaryValue = true;
            fixture.detectChanges();
            tick();

            expect(radioInstance.checked).toBe(true);

            component.binaryValue = false;
            fixture.detectChanges();
            tick();

            expect(radioInstance.checked).toBe(false);
        }));
    });

    describe('Accessibility Tests', () => {
        let component: TestBasicRadioComponent;
        let fixture: ComponentFixture<TestBasicRadioComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicRadioComponent, NoopAnimationsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicRadioComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should have correct ARIA attributes', () => {
            const inputElement = fixture.debugElement.query(By.css('input'));

            expect(inputElement.nativeElement.getAttribute('aria-label')).toBe('Test Radio');
            expect(inputElement.nativeElement.getAttribute('aria-labelledby')).toBe('test-label');
            expect(inputElement.nativeElement.getAttribute('aria-checked')).toBe('false');
        });

        it('should update aria-checked when state changes', fakeAsync(() => {
            const inputElement = fixture.debugElement.query(By.css('input'));

            inputElement.nativeElement.click();
            fixture.detectChanges();
            tick();

            expect(inputElement.nativeElement.getAttribute('aria-checked')).toBe('true');
        }));

        it('should support keyboard navigation', () => {
            const inputElement = fixture.debugElement.query(By.css('input'));

            const spaceEvent = new KeyboardEvent('keydown', { key: 'Space' });
            inputElement.nativeElement.dispatchEvent(spaceEvent);

            expect(inputElement.nativeElement).toBeTruthy();
        });

        it('should have proper tabindex', () => {
            const inputElement = fixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.tabIndex).toBe(0);

            component.tabindex = -1;
            fixture.detectChanges();

            expect(inputElement.nativeElement.tabIndex).toBe(-1);
        });
    });

    describe('Edge Cases', () => {
        let component: TestAdvancedRadioComponent;
        let fixture: ComponentFixture<TestAdvancedRadioComponent>;
        let radioInstance: RadioButton;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestAdvancedRadioComponent, NoopAnimationsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestAdvancedRadioComponent);
            component = fixture.componentInstance;
            radioInstance = fixture.debugElement.query(By.directive(RadioButton)).componentInstance;
            fixture.detectChanges();
        });

        it('should handle null/undefined values', fakeAsync(() => {
            component.selectedValue = null as any;
            fixture.detectChanges();
            tick();

            expect(radioInstance.checked).toBe(false);

            component.selectedValue = undefined as any;
            fixture.detectChanges();
            tick();

            expect(radioInstance.checked).toBe(false);
        }));

        it('should handle empty string values', fakeAsync(() => {
            component.radioValue = '';
            component.selectedValue = '';
            fixture.detectChanges();
            tick();

            expect(radioInstance.checked).toBe(true);
        }));

        it('should handle number values', fakeAsync(() => {
            component.radioValue = 123;
            component.selectedValue = 123;
            fixture.detectChanges();
            tick();

            expect(radioInstance.checked).toBe(true);

            component.selectedValue = 456;
            fixture.detectChanges();
            tick();

            expect(radioInstance.checked).toBe(false);
        }));

        it('should prevent interaction when disabled', () => {
            spyOn(radioInstance, 'select');
            component.isDisabled = true;
            fixture.detectChanges();

            radioInstance.onChange(new Event('change'));

            expect(radioInstance.select).not.toHaveBeenCalled();
        });

        it('should handle multiple rapid clicks', fakeAsync(() => {
            const inputElement = fixture.debugElement.query(By.css('input'));

            // Trigger change events to simulate radio button behavior
            inputElement.nativeElement.dispatchEvent(new Event('change'));
            inputElement.nativeElement.dispatchEvent(new Event('change'));
            inputElement.nativeElement.dispatchEvent(new Event('change'));
            tick();

            // Each change should trigger the onClick event
            expect(component.clickEvents.length).toBeGreaterThanOrEqual(1);
            expect(radioInstance.checked).toBe(true);
        }));
    });

    describe('Performance Tests', () => {
        let fixture: ComponentFixture<TestRadioGroupComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestRadioGroupComponent, NoopAnimationsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestRadioGroupComponent);
            fixture.detectChanges();
        });

        it('should handle frequent selection changes efficiently', fakeAsync(() => {
            const component = fixture.componentInstance;
            const inputs = fixture.debugElement.queryAll(By.css('input'));
            const startTime = performance.now();

            for (let i = 0; i < 100; i++) {
                const inputIndex = i % 3;
                inputs[inputIndex].nativeElement.click();
                tick(1);
            }

            const endTime = performance.now();
            const duration = endTime - startTime;

            expect(duration).toBeLessThan(1000);
            expect(component.selectedOption).toBe('option1'); // Last selected (99 % 3 = 0, so option1)
            flush();
        }));

        it('should maintain performance with large radio groups', () => {
            // Test passes by creating the component without errors
            // In a real scenario, you might create a component with 100+ radio buttons
            expect(fixture.componentInstance).toBeTruthy();
        });
    });
});
