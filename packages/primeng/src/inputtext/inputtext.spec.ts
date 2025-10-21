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

@Component({
    standalone: true,
    imports: [InputText, FormsModule],
    template: ` <input type="text" pInputText [pt]="pt" [invalid]="invalid" [fluid]="fluid" [variant]="variant" [(ngModel)]="value" /> `
})
class TestPTInputTextComponent {
    value: string = '';
    pt: any = {};
    invalid: boolean | undefined = undefined;
    fluid: boolean | undefined = undefined;
    variant: 'filled' | 'outlined' | undefined = undefined;
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

    describe('PassThrough (PT) Tests', () => {
        let component: TestPTInputTextComponent;
        let fixture: ComponentFixture<TestPTInputTextComponent>;
        let inputEl: HTMLInputElement;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestPTInputTextComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestPTInputTextComponent);
            component = fixture.componentInstance;
            const debugEl = fixture.debugElement.query(By.directive(InputText));
            inputEl = debugEl.nativeElement;
            fixture.detectChanges();
        });

        describe('Case 1: Simple string classes', () => {
            it('should apply root class from pt', fakeAsync(() => {
                component.pt = { root: 'ROOT_CLASS' };
                fixture.detectChanges();
                tick();

                expect(inputEl.classList.contains('ROOT_CLASS')).toBe(true);
            }));

            it('should apply host class from pt', fakeAsync(() => {
                component.pt = { host: 'HOST_CLASS' };
                fixture.detectChanges();
                tick();

                expect(inputEl.classList.contains('HOST_CLASS')).toBe(true);
            }));
        });

        describe('Case 2: Objects', () => {
            it('should apply root object with class, style, data attributes, and aria-label', fakeAsync(() => {
                component.pt = {
                    root: {
                        class: 'ROOT_OBJECT_CLASS',
                        style: { 'border-color': 'red' },
                        'data-p-test': true,
                        'aria-label': 'TEST_ARIA_LABEL'
                    }
                };
                fixture.detectChanges();
                tick();

                expect(inputEl.classList.contains('ROOT_OBJECT_CLASS')).toBe(true);
                expect(inputEl.style.borderColor).toBe('red');
                expect(inputEl.getAttribute('data-p-test')).toBe('true');
                expect(inputEl.getAttribute('aria-label')).toBe('TEST_ARIA_LABEL');
            }));

            it('should apply host object with multiple attributes', fakeAsync(() => {
                component.pt = {
                    host: {
                        class: 'HOST_OBJECT_CLASS',
                        style: { padding: '10px' },
                        'data-custom': 'custom-value'
                    }
                };
                fixture.detectChanges();
                tick();

                expect(inputEl.classList.contains('HOST_OBJECT_CLASS')).toBe(true);
                expect(inputEl.style.padding).toBe('10px');
                expect(inputEl.getAttribute('data-custom')).toBe('custom-value');
            }));
        });

        describe('Case 3: Mixed object and string values', () => {
            it('should apply mixed pt with root object and host string', fakeAsync(() => {
                component.pt = {
                    root: {
                        class: 'ROOT_MIXED_CLASS'
                    },
                    host: 'HOST_MIXED_CLASS'
                };
                fixture.detectChanges();
                tick();

                expect(inputEl.classList.contains('ROOT_MIXED_CLASS')).toBe(true);
                expect(inputEl.classList.contains('HOST_MIXED_CLASS')).toBe(true);
            }));
        });

        describe('Case 4: Use variables from instance', () => {
            it('should apply pt function that accesses instance', fakeAsync(() => {
                component.invalid = true;
                component.pt = {
                    root: ({ instance }) => ({
                        class: 'INSTANCE_ACCESSED',
                        'data-invalid': instance?.invalid()
                    })
                };
                fixture.detectChanges();
                tick();

                expect(inputEl.classList.contains('INSTANCE_ACCESSED')).toBe(true);
                expect(inputEl.getAttribute('data-invalid')).toBe('true');
            }));

            it('should apply pt style based on instance fluid state', fakeAsync(() => {
                component.fluid = true;
                component.pt = {
                    root: ({ instance }) => ({
                        style: {
                            width: instance?.hasFluid ? '100%' : 'auto'
                        }
                    })
                };
                fixture.detectChanges();
                tick();

                expect(inputEl.style.width).toBe('100%');
            }));

            it('should apply pt based on instance variant', fakeAsync(() => {
                component.variant = 'filled';
                component.pt = {
                    root: ({ instance }) => ({
                        'data-variant': instance?.variant()
                    })
                };
                fixture.detectChanges();
                tick();

                expect(inputEl.getAttribute('data-variant')).toBe('filled');
            }));
        });

        describe('Case 5: Event binding', () => {
            it('should handle onclick event from pt', fakeAsync(() => {
                let clicked = false;
                component.pt = {
                    root: {
                        onclick: () => {
                            clicked = true;
                        }
                    }
                };
                fixture.detectChanges();
                tick();

                inputEl.click();
                expect(clicked).toBe(true);
            }));

            it('should handle onfocus event from pt', fakeAsync(() => {
                let focused = false;
                component.pt = {
                    root: {
                        onfocus: () => {
                            focused = true;
                        }
                    }
                };
                fixture.detectChanges();
                tick();

                inputEl.dispatchEvent(new Event('focus'));
                expect(focused).toBe(true);
            }));

            it('should handle onblur event from pt', fakeAsync(() => {
                let blurred = false;
                component.pt = {
                    root: {
                        onblur: () => {
                            blurred = true;
                        }
                    }
                };
                fixture.detectChanges();
                tick();

                inputEl.dispatchEvent(new Event('blur'));
                expect(blurred).toBe(true);
            }));
        });

        describe('Case 6: Inline test', () => {
            it('should apply inline pt with string class', fakeAsync(() => {
                component.pt = { root: 'INLINE_CLASS' };
                fixture.detectChanges();
                tick();

                expect(inputEl.classList.contains('INLINE_CLASS')).toBe(true);
            }));

            it('should apply inline pt with object class', fakeAsync(() => {
                component.pt = { root: { class: 'INLINE_OBJECT_CLASS' } };
                fixture.detectChanges();
                tick();

                expect(inputEl.classList.contains('INLINE_OBJECT_CLASS')).toBe(true);
            }));
        });

        describe('Combined PT scenarios', () => {
            it('should apply multiple pt sections simultaneously', fakeAsync(() => {
                component.pt = {
                    host: 'HOST_MULTI',
                    root: 'ROOT_MULTI'
                };
                fixture.detectChanges();
                tick();

                expect(inputEl.classList.contains('HOST_MULTI')).toBe(true);
                expect(inputEl.classList.contains('ROOT_MULTI')).toBe(true);
            }));

            it('should apply complex pt with functions and objects', fakeAsync(() => {
                component.fluid = true;
                component.pt = {
                    root: ({ instance }) => ({
                        class: 'COMPLEX_CLASS',
                        style: {
                            border: '1px solid green'
                        },
                        'data-fluid': instance?.hasFluid
                    }),
                    host: 'COMPLEX_HOST'
                };
                fixture.detectChanges();
                tick();

                expect(inputEl.classList.contains('COMPLEX_CLASS')).toBe(true);
                expect(inputEl.style.border).toBe('1px solid green');
                expect(inputEl.classList.contains('COMPLEX_HOST')).toBe(true);
                expect(inputEl.getAttribute('data-fluid')).toBe('true');
            }));

            it('should handle PT with placeholder and aria attributes', fakeAsync(() => {
                component.pt = {
                    root: {
                        'aria-required': 'true',
                        'aria-describedby': 'help-text',
                        class: 'custom-input'
                    }
                };
                fixture.detectChanges();
                tick();

                expect(inputEl.getAttribute('aria-required')).toBe('true');
                expect(inputEl.getAttribute('aria-describedby')).toBe('help-text');
                expect(inputEl.classList.contains('custom-input')).toBe(true);
            }));
        });
    });
});
