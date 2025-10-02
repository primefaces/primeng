import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputText } from './inputtext';

@Component({
    standalone: true,
    imports: [InputText, FormsModule],
    template: ` <input type="text" pInputText [(ngModel)]="value" placeholder="Enter text" /> `
})
class TestBasicInputTextComponent {
    value: string = '';
}

@Component({
    standalone: true,
    imports: [InputText, FormsModule],
    template: ` <input type="text" pInputText [(ngModel)]="content" [pSize]="size" [variant]="variant" [fluid]="fluid" [invalid]="invalid" placeholder="Advanced input" /> `
})
class TestAdvancedInputTextComponent {
    content: string = '';
    size: 'large' | 'small' | undefined = undefined as any;
    variant: 'filled' | 'outlined' | undefined = undefined as any;
    fluid: boolean | undefined = undefined as any;
    invalid: boolean | undefined = undefined as any;
}

@Component({
    standalone: true,
    imports: [InputText, ReactiveFormsModule],
    template: ` <input type="email" pInputText [formControl]="emailControl" /> `
})
class TestReactiveFormInputTextComponent {
    emailControl = new FormControl('');
}

@Component({
    standalone: true,
    imports: [InputText, FormsModule],
    template: ` <input type="password" pInputText [(ngModel)]="password" /> `
})
class TestPasswordInputComponent {
    password: string = '';
}

describe('InputText', () => {
    describe('Basic Functionality', () => {
        let component: TestBasicInputTextComponent;
        let fixture: ComponentFixture<TestBasicInputTextComponent>;
        let inputEl: DebugElement;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicInputTextComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicInputTextComponent);
            component = fixture.componentInstance;
            inputEl = fixture.debugElement.query(By.directive(InputText));
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should apply pInputText directive', () => {
            expect(inputEl).toBeTruthy();
            expect(inputEl.nativeElement.tagName.toLowerCase()).toBe('input');
            expect(inputEl.nativeElement.type).toBe('text');
        });

        it('should have input element with directive applied', () => {
            expect(inputEl.nativeElement.hasAttribute('pInputText')).toBe(true);
        });

        it('should handle placeholder', () => {
            expect(inputEl.nativeElement.placeholder).toBe('Enter text');
        });

        it('should update model value when input changes', fakeAsync(() => {
            const input = inputEl.nativeElement;
            input.value = 'test input';
            input.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            tick();

            expect(component.value).toBe('test input');
        }));

        it('should update input value when model changes', fakeAsync(() => {
            component.value = 'new value';
            fixture.detectChanges();
            tick();

            expect(inputEl.nativeElement.value).toBe('new value');
        }));
    });

    describe('Advanced Features', () => {
        let component: TestAdvancedInputTextComponent;
        let fixture: ComponentFixture<TestAdvancedInputTextComponent>;
        let inputEl: DebugElement;
        let inputDirective: InputText;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestAdvancedInputTextComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestAdvancedInputTextComponent);
            component = fixture.componentInstance;
            inputEl = fixture.debugElement.query(By.directive(InputText));
            inputDirective = inputEl.injector.get(InputText);
            fixture.detectChanges();
        });

        it('should apply size variants', () => {
            component.size = 'large';
            fixture.detectChanges();

            expect(inputDirective.pSize).toBe('large');

            component.size = 'small';
            fixture.detectChanges();

            expect(inputDirective.pSize).toBe('small');
        });

        it('should apply variant styles', () => {
            component.variant = 'filled';
            fixture.detectChanges();

            expect(inputDirective.variant()).toBe('filled');

            component.variant = 'outlined';
            fixture.detectChanges();

            expect(inputDirective.variant()).toBe('outlined');
        });

        it('should apply fluid styling', () => {
            component.fluid = true;
            fixture.detectChanges();

            expect(inputDirective.fluid()).toBe(true);
            expect(inputDirective.hasFluid).toBe(true);

            component.fluid = false;
            fixture.detectChanges();

            expect(inputDirective.fluid()).toBe(false);
            expect(inputDirective.hasFluid).toBe(false);
        });

        it('should apply invalid state', () => {
            component.invalid = true;
            fixture.detectChanges();

            expect(inputDirective.invalid()).toBe(true);

            component.invalid = false;
            fixture.detectChanges();

            expect(inputDirective.invalid()).toBe(false);
        });
    });

    describe('Reactive Forms', () => {
        let component: TestReactiveFormInputTextComponent;
        let fixture: ComponentFixture<TestReactiveFormInputTextComponent>;
        let inputEl: DebugElement;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestReactiveFormInputTextComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestReactiveFormInputTextComponent);
            component = fixture.componentInstance;
            inputEl = fixture.debugElement.query(By.directive(InputText));
            fixture.detectChanges();
        });

        it('should work with reactive forms', fakeAsync(() => {
            component.emailControl.setValue('test@example.com');
            fixture.detectChanges();
            tick();

            expect(inputEl.nativeElement.value).toBe('test@example.com');
        }));

        it('should update form control when input changes', fakeAsync(() => {
            const input = inputEl.nativeElement;
            input.value = 'user@test.com';
            input.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            tick();

            expect(component.emailControl.value).toBe('user@test.com');
        }));

        it('should handle form control validation', fakeAsync(() => {
            component.emailControl.setErrors({ email: true });
            fixture.detectChanges();
            tick();

            expect(component.emailControl.invalid).toBe(true);
            expect(component.emailControl.errors?.['email']).toBe(true);
        }));

        it('should handle disabled state', fakeAsync(() => {
            component.emailControl.disable();
            fixture.detectChanges();
            tick();

            expect(inputEl.nativeElement.disabled).toBe(true);
            expect(component.emailControl.disabled).toBe(true);
        }));
    });

    describe('Input Types', () => {
        let component: TestPasswordInputComponent;
        let fixture: ComponentFixture<TestPasswordInputComponent>;
        let inputEl: DebugElement;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestPasswordInputComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestPasswordInputComponent);
            component = fixture.componentInstance;
            inputEl = fixture.debugElement.query(By.directive(InputText));
            fixture.detectChanges();
        });

        it('should work with password input type', () => {
            expect(inputEl.nativeElement.type).toBe('password');
        });

        it('should handle password value changes', fakeAsync(() => {
            const input = inputEl.nativeElement;
            input.value = 'secret123';
            input.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            tick();

            expect(component.password).toBe('secret123');
        }));
    });

    describe('Edge Cases', () => {
        let component: TestBasicInputTextComponent;
        let fixture: ComponentFixture<TestBasicInputTextComponent>;
        let inputEl: DebugElement;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicInputTextComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicInputTextComponent);
            component = fixture.componentInstance;
            inputEl = fixture.debugElement.query(By.directive(InputText));
            fixture.detectChanges();
        });

        it('should handle empty string values', fakeAsync(() => {
            component.value = '';
            fixture.detectChanges();
            tick();

            expect(inputEl.nativeElement.value).toBe('' as any);
        }));

        it('should handle null/undefined values', fakeAsync(() => {
            component.value = null as any;
            fixture.detectChanges();
            tick();

            expect(inputEl.nativeElement.value).toBe('' as any);
        }));

        it('should handle special characters', fakeAsync(() => {
            const specialText = 'Hello! @#$%^&*()_+ 123';
            component.value = specialText;
            fixture.detectChanges();
            tick();

            expect(inputEl.nativeElement.value).toBe(specialText);
        }));

        it('should handle whitespace values', fakeAsync(() => {
            component.value = '   spaces   ';
            fixture.detectChanges();
            tick();

            expect(inputEl.nativeElement.value).toBe('   spaces   ');
        }));
    });

    describe('Input Events', () => {
        let component: TestBasicInputTextComponent;
        let fixture: ComponentFixture<TestBasicInputTextComponent>;
        let inputEl: DebugElement;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicInputTextComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicInputTextComponent);
            component = fixture.componentInstance;
            inputEl = fixture.debugElement.query(By.directive(InputText));
            fixture.detectChanges();
        });

        it('should respond to input events', fakeAsync(() => {
            const input = inputEl.nativeElement;

            input.value = 'a';
            input.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            tick();
            expect(component.value).toBe('a');

            input.value = 'ab';
            input.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            tick();
            expect(component.value).toBe('ab');

            input.value = 'abc';
            input.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            tick();
            expect(component.value).toBe('abc');
        }));

        it('should handle focus and blur events', () => {
            const input = inputEl.nativeElement;

            // Test that focus event can be dispatched without errors
            expect(() => {
                input.dispatchEvent(new Event('focus'));
                fixture.detectChanges();
            }).not.toThrow();

            // Test that blur event can be dispatched without errors
            expect(() => {
                input.dispatchEvent(new Event('blur'));
                fixture.detectChanges();
            }).not.toThrow();
        });
    });
});
