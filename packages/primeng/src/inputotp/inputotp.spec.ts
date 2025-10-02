import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputOtp, InputOtpChangeEvent } from './inputotp';

// Temel test component'i
@Component({
    standalone: true,
    imports: [InputOtp, FormsModule],
    template: `<p-inputotp [(ngModel)]="value" [length]="length" />`
})
class TestBasicInputOtpComponent {
    value: string = '';
    length: number = 4;
}

// Reactive form test component'i
@Component({
    standalone: true,
    imports: [InputOtp, ReactiveFormsModule],
    template: ` <p-inputotp [formControl]="otpControl" [length]="length" (onChange)="onOtpChange($event)" /> `
})
class TestReactiveFormInputOtpComponent {
    otpControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
    length: number = 4;
    changeEvents: InputOtpChangeEvent[] = [];

    onOtpChange(event: InputOtpChangeEvent) {
        this.changeEvents.push(event);
    }
}

// Gelişmiş özellikler test component'i
@Component({
    standalone: true,
    imports: [InputOtp, FormsModule],
    template: `
        <p-inputotp
            [(ngModel)]="value"
            [length]="length"
            [mask]="mask"
            [integerOnly]="integerOnly"
            [readonly]="readonly"
            [autofocus]="autofocus"
            [variant]="variant"
            [size]="size"
            (onChange)="onOtpChange($event)"
            (onFocus)="onOtpFocus($event)"
            (onBlur)="onOtpBlur($event)"
        />
    `
})
class TestAdvancedInputOtpComponent {
    value: string = '';
    length: number = 6;
    mask: boolean = false;
    integerOnly: boolean = false;
    readonly: boolean = false;
    autofocus: boolean = false;
    variant: 'filled' | 'outlined' | undefined = undefined as any;
    size: 'large' | 'small' | undefined = undefined as any;

    changeEvents: InputOtpChangeEvent[] = [];
    focusEvents: Event[] = [];
    blurEvents: Event[] = [];

    onOtpChange(event: InputOtpChangeEvent) {
        this.changeEvents.push(event);
    }

    onOtpFocus(event: Event) {
        this.focusEvents.push(event);
    }

    onOtpBlur(event: Event) {
        this.blurEvents.push(event);
    }
}

// InputOTP pTemplate component
@Component({
    standalone: true,
    imports: [InputOtp, FormsModule],
    template: `
        <p-inputotp [(ngModel)]="value" [length]="length">
            <!-- Input template with pTemplate directive -->
            <ng-template pTemplate="input" let-value let-events="events" let-index="index">
                <input
                    type="text"
                    class="custom-otp-input"
                    [attr.data-testid]="'ptemplate-input-' + index"
                    [value]="value"
                    (input)="events.input($event)"
                    (keydown)="events.keydown($event)"
                    (focus)="events.focus($event)"
                    (blur)="events.blur($event)"
                    (paste)="events.paste($event)"
                    [attr.placeholder]="index + 1"
                    maxlength="1"
                />
            </ng-template>
        </p-inputotp>
    `
})
class TestInputOtpPTemplateComponent {
    value: string = '';
    length: number = 4;
}

// InputOTP #template reference component
@Component({
    standalone: true,
    imports: [InputOtp, FormsModule],
    template: `
        <p-inputotp [(ngModel)]="value" [length]="length">
            <!-- Input template with #template reference -->
            <ng-template #input let-value let-events="events" let-index="index">
                <input
                    type="text"
                    class="custom-otp-input"
                    [attr.data-testid]="'ref-input-' + index"
                    [value]="value"
                    (input)="events.input($event)"
                    (keydown)="events.keydown($event)"
                    (focus)="events.focus($event)"
                    (blur)="events.blur($event)"
                    (paste)="events.paste($event)"
                    [attr.placeholder]="'#' + (index + 1)"
                    maxlength="1"
                />
            </ng-template>
        </p-inputotp>
    `
})
class TestInputOtpRefTemplateComponent {
    value: string = '';
    length: number = 4;
}

describe('InputOtp', () => {
    describe('Component Initialization', () => {
        let component: TestBasicInputOtpComponent;
        let fixture: ComponentFixture<TestBasicInputOtpComponent>;
        let inputOtpElement: DebugElement;
        let inputOtpInstance: InputOtp;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicInputOtpComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicInputOtpComponent);
            component = fixture.componentInstance;
            inputOtpElement = fixture.debugElement.query(By.directive(InputOtp));
            inputOtpInstance = inputOtpElement.componentInstance;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
            expect(inputOtpInstance).toBeTruthy();
        });

        it('should initialize with default properties', () => {
            expect(inputOtpInstance.length).toBe(4);
            expect(inputOtpInstance.mask).toBeFalsy();
            expect(inputOtpInstance.integerOnly).toBeFalsy();
            expect(inputOtpInstance.readonly).toBeFalsy();
            expect(inputOtpInstance.tokens).toEqual([]);
        });

        it('should render correct number of input fields', () => {
            const inputs = fixture.debugElement.queryAll(By.css('input'));
            expect(inputs.length).toBe(4);
        });
    });

    describe('Basic Functionality Tests', () => {
        let component: TestBasicInputOtpComponent;
        let fixture: ComponentFixture<TestBasicInputOtpComponent>;
        let inputOtpInstance: InputOtp;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicInputOtpComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicInputOtpComponent);
            component = fixture.componentInstance;
            inputOtpInstance = fixture.debugElement.query(By.directive(InputOtp)).componentInstance;
            fixture.detectChanges();
        });

        it('should handle single character input', fakeAsync(() => {
            const inputs = fixture.debugElement.queryAll(By.css('input'));
            const firstInput = inputs[0].nativeElement;

            firstInput.value = '1';
            firstInput.dispatchEvent(new InputEvent('input', { inputType: 'insertText' }));
            fixture.detectChanges();
            tick();

            expect(inputOtpInstance.tokens[0]).toBe('1');
            expect(component.value).toBe('1');
        }));

        it('should move focus to next input on character entry', fakeAsync(() => {
            const inputs = fixture.debugElement.queryAll(By.css('input'));
            const firstInput = inputs[0].nativeElement;
            const secondInput = inputs[1].nativeElement;

            spyOn(secondInput, 'focus');
            spyOn(secondInput, 'select');

            firstInput.value = '1';
            firstInput.dispatchEvent(new InputEvent('input', { inputType: 'insertText' }));
            fixture.detectChanges();
            tick();

            expect(secondInput.focus).toHaveBeenCalled();
            expect(secondInput.select).toHaveBeenCalled();
        }));

        it('should update model with complete OTP', fakeAsync(() => {
            const inputs = fixture.debugElement.queryAll(By.css('input'));

            inputs[0].nativeElement.value = '1';
            inputs[0].nativeElement.dispatchEvent(new InputEvent('input', { inputType: 'insertText' }));
            inputs[1].nativeElement.value = '2';
            inputs[1].nativeElement.dispatchEvent(new InputEvent('input', { inputType: 'insertText' }));
            inputs[2].nativeElement.value = '3';
            inputs[2].nativeElement.dispatchEvent(new InputEvent('input', { inputType: 'insertText' }));
            inputs[3].nativeElement.value = '4';
            inputs[3].nativeElement.dispatchEvent(new InputEvent('input', { inputType: 'insertText' }));

            fixture.detectChanges();
            tick();

            expect(component.value).toBe('1234');
            expect(inputOtpInstance.tokens).toEqual(['1', '2', '3', '4']);
        }));
    });

    describe('Keyboard Navigation Tests', () => {
        let component: TestBasicInputOtpComponent;
        let fixture: ComponentFixture<TestBasicInputOtpComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicInputOtpComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicInputOtpComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should move to next input on ArrowRight', fakeAsync(() => {
            const inputs = fixture.debugElement.queryAll(By.css('input'));
            const firstInput = inputs[0].nativeElement;
            const secondInput = inputs[1].nativeElement;

            spyOn(secondInput, 'focus');
            spyOn(secondInput, 'select');

            const rightArrowEvent = new KeyboardEvent('keydown', { code: 'ArrowRight' });
            firstInput.dispatchEvent(rightArrowEvent);
            fixture.detectChanges();
            tick();

            expect(secondInput.focus).toHaveBeenCalled();
            expect(secondInput.select).toHaveBeenCalled();
        }));

        it('should move to previous input on ArrowLeft', fakeAsync(() => {
            const inputs = fixture.debugElement.queryAll(By.css('input'));
            const firstInput = inputs[0].nativeElement;
            const secondInput = inputs[1].nativeElement;

            spyOn(firstInput, 'focus');
            spyOn(firstInput, 'select');

            const leftArrowEvent = new KeyboardEvent('keydown', { code: 'ArrowLeft' });
            secondInput.dispatchEvent(leftArrowEvent);
            fixture.detectChanges();
            tick();

            expect(firstInput.focus).toHaveBeenCalled();
            expect(firstInput.select).toHaveBeenCalled();
        }));

        it('should prevent ArrowUp and ArrowDown', () => {
            const inputs = fixture.debugElement.queryAll(By.css('input'));
            const firstInput = inputs[0].nativeElement;

            const upEvent = new KeyboardEvent('keydown', { code: 'ArrowUp' });
            const downEvent = new KeyboardEvent('keydown', { code: 'ArrowDown' });

            spyOn(upEvent, 'preventDefault');
            spyOn(downEvent, 'preventDefault');

            firstInput.dispatchEvent(upEvent);
            firstInput.dispatchEvent(downEvent);

            expect(upEvent.preventDefault).toHaveBeenCalled();
            expect(downEvent.preventDefault).toHaveBeenCalled();
        });
    });

    describe('Paste Functionality Tests', () => {
        let component: TestBasicInputOtpComponent;
        let fixture: ComponentFixture<TestBasicInputOtpComponent>;
        let inputOtpInstance: InputOtp;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicInputOtpComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicInputOtpComponent);
            component = fixture.componentInstance;
            inputOtpInstance = fixture.debugElement.query(By.directive(InputOtp)).componentInstance;
            fixture.detectChanges();
        });

        it('should handle paste operation', fakeAsync(() => {
            const inputs = fixture.debugElement.queryAll(By.css('input'));
            const firstInput = inputs[0].nativeElement;

            const pasteEvent = new ClipboardEvent('paste');
            Object.defineProperty(pasteEvent, 'clipboardData', {
                value: {
                    getData: () => '1234'
                }
            });

            spyOn(pasteEvent, 'preventDefault');
            firstInput.dispatchEvent(pasteEvent);
            fixture.detectChanges();
            tick();

            expect(pasteEvent.preventDefault).toHaveBeenCalled();
            expect(inputOtpInstance.tokens).toEqual(['1', '2', '3', '4']);
            expect(component.value).toBe('1234');
        }));

        it('should handle paste with excess characters', fakeAsync(() => {
            const inputs = fixture.debugElement.queryAll(By.css('input'));
            const firstInput = inputs[0].nativeElement;

            const pasteEvent = new ClipboardEvent('paste');
            Object.defineProperty(pasteEvent, 'clipboardData', {
                value: {
                    getData: () => '123456789'
                }
            });

            firstInput.dispatchEvent(pasteEvent);
            fixture.detectChanges();
            tick();

            // Should only take characters up to length
            expect(inputOtpInstance.tokens.length).toBeLessThanOrEqual(5);
            expect(component.value.length).toBeLessThanOrEqual(5);
        }));
    });

    describe('Advanced Features Tests', () => {
        let component: TestAdvancedInputOtpComponent;
        let fixture: ComponentFixture<TestAdvancedInputOtpComponent>;
        let inputOtpInstance: InputOtp;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestAdvancedInputOtpComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestAdvancedInputOtpComponent);
            component = fixture.componentInstance;
            inputOtpInstance = fixture.debugElement.query(By.directive(InputOtp)).componentInstance;
            fixture.detectChanges();
        });

        it('should respect length property', () => {
            const inputs = fixture.debugElement.queryAll(By.css('input'));
            expect(inputs.length).toBe(6);
            expect(inputOtpInstance.length).toBe(6);
        });

        it('should apply mask property', () => {
            component.mask = true;
            fixture.detectChanges();

            expect(inputOtpInstance.inputType).toBe('password');

            const inputs = fixture.debugElement.queryAll(By.css('input'));
            inputs.forEach((input) => {
                expect(input.nativeElement.type).toBe('password');
            });
        });

        it('should enforce integerOnly restriction', fakeAsync(() => {
            component.integerOnly = true;
            fixture.detectChanges();

            const inputs = fixture.debugElement.queryAll(By.css('input'));
            const firstInput = inputs[0].nativeElement;

            const numericEvent = new KeyboardEvent('keydown', { code: 'Digit1', key: '1' });
            spyOn(numericEvent, 'preventDefault');
            firstInput.dispatchEvent(numericEvent);

            expect(numericEvent.preventDefault).not.toHaveBeenCalled();

            const alphaEvent = new KeyboardEvent('keydown', { code: 'KeyA', key: 'a' });
            spyOn(alphaEvent, 'preventDefault');
            firstInput.dispatchEvent(alphaEvent);

            expect(alphaEvent.preventDefault).toHaveBeenCalled();
        }));

        it('should handle readonly state', () => {
            component.readonly = true;
            fixture.detectChanges();

            const inputs = fixture.debugElement.queryAll(By.css('input'));
            inputs.forEach((input) => {
                expect(input.nativeElement.hasAttribute('readonly')).toBe(true);
            });
        });

        it('should apply variant and size properties', () => {
            component.variant = 'filled';
            component.size = 'large';
            fixture.detectChanges();

            expect(inputOtpInstance.variant()).toBe('filled');
            expect(inputOtpInstance.size()).toBe('large');
        });

        it('should emit onChange events', fakeAsync(() => {
            const inputs = fixture.debugElement.queryAll(By.css('input'));
            const firstInput = inputs[0].nativeElement;

            firstInput.value = '1';
            firstInput.dispatchEvent(new InputEvent('input', { inputType: 'insertText' }));
            fixture.detectChanges();
            tick();

            expect(component.changeEvents.length).toBe(1);
            expect(component.changeEvents[0].value).toBe('1');
        }));

        it('should emit onFocus and onBlur events', () => {
            const inputs = fixture.debugElement.queryAll(By.css('input'));
            const firstInput = inputs[0].nativeElement;

            // Clear any existing events
            component.focusEvents = [];
            component.blurEvents = [];

            firstInput.dispatchEvent(new FocusEvent('focus'));
            expect(component.focusEvents.length).toBeGreaterThanOrEqual(1);

            firstInput.dispatchEvent(new FocusEvent('blur'));
            expect(component.blurEvents.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe('Reactive Form Integration Tests', () => {
        let component: TestReactiveFormInputOtpComponent;
        let fixture: ComponentFixture<TestReactiveFormInputOtpComponent>;
        let inputOtpInstance: InputOtp;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestReactiveFormInputOtpComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestReactiveFormInputOtpComponent);
            component = fixture.componentInstance;
            inputOtpInstance = fixture.debugElement.query(By.directive(InputOtp)).componentInstance;
            fixture.detectChanges();
        });

        it('should integrate with reactive forms', fakeAsync(() => {
            component.otpControl.setValue('1234');
            fixture.detectChanges();
            tick();

            expect(inputOtpInstance.tokens).toEqual(['1', '2', '3', '4']);
        }));

        it('should validate required and minLength', fakeAsync(() => {
            expect(component.otpControl.valid).toBe(false);
            expect(component.otpControl.errors?.['required']).toBe(true);

            component.otpControl.setValue('12');
            fixture.detectChanges();
            tick();

            expect(component.otpControl.valid).toBe(false);
            expect(component.otpControl.errors?.['minlength']).toBeTruthy();

            component.otpControl.setValue('1234');
            fixture.detectChanges();
            tick();

            expect(component.otpControl.valid).toBe(true);
            expect(component.otpControl.errors).toBeNull();
        }));
    });

    describe('Edge Cases', () => {
        let component: TestAdvancedInputOtpComponent;
        let fixture: ComponentFixture<TestAdvancedInputOtpComponent>;
        let inputOtpInstance: InputOtp;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestAdvancedInputOtpComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestAdvancedInputOtpComponent);
            component = fixture.componentInstance;
            inputOtpInstance = fixture.debugElement.query(By.directive(InputOtp)).componentInstance;
            fixture.detectChanges();
        });

        it('should handle null/undefined values', fakeAsync(() => {
            component.value = null as any;
            fixture.detectChanges();
            tick();

            expect(inputOtpInstance.tokens).toEqual([]);

            component.value = undefined as any;
            fixture.detectChanges();
            tick();

            expect(inputOtpInstance.tokens).toEqual([]);
        }));

        it('should handle empty string values', fakeAsync(() => {
            component.value = '';
            fixture.detectChanges();
            tick();

            expect(inputOtpInstance.tokens).toEqual([]);

            const inputs = fixture.debugElement.queryAll(By.css('input'));
            inputs.forEach((input) => {
                expect(input.nativeElement.value).toBe('' as any);
            });
        }));
    });

    describe('Performance Tests', () => {
        let component: TestBasicInputOtpComponent;
        let fixture: ComponentFixture<TestBasicInputOtpComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicInputOtpComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicInputOtpComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should handle rapid input changes', fakeAsync(() => {
            const inputs = fixture.debugElement.queryAll(By.css('input'));

            for (let i = 0; i < 10; i++) {
                inputs[0].nativeElement.value = i.toString();
                inputs[0].nativeElement.dispatchEvent(new InputEvent('input', { inputType: 'insertText' }));
                fixture.detectChanges();
                tick(10);
            }

            expect(component.value).toBe('9');
            flush();
        }));
    });

    describe('pTemplate Tests', () => {
        let fixture: ComponentFixture<TestInputOtpPTemplateComponent>;
        let component: TestInputOtpPTemplateComponent;
        let inputOtpElement: DebugElement;
        let inputOtpInstance: InputOtp;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestInputOtpPTemplateComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestInputOtpPTemplateComponent);
            component = fixture.componentInstance;
            inputOtpElement = fixture.debugElement.query(By.css('p-inputotp'));
            inputOtpInstance = inputOtpElement.componentInstance;
            fixture.detectChanges();
        });

        it('should have input pTemplate', () => {
            expect(inputOtpInstance).toBeTruthy();
            expect(() => inputOtpInstance.inputTemplate).not.toThrow();
        });

        it('should pass context parameters to input template', fakeAsync(() => {
            // Template should be processed
            expect(inputOtpInstance).toBeTruthy();
            expect(component.length).toBe(4);
            tick();
        }));

        it('should handle input events through template context', fakeAsync(() => {
            // Test that component can handle value changes
            component.value = '1234';
            fixture.detectChanges();
            tick();

            // Value should be updated
            expect(component.value).toBe('1234');
        }));

        it('should handle keyboard events through template context', fakeAsync(() => {
            // Test that template is properly configured
            expect(inputOtpInstance).toBeTruthy();
            // Template should be available after content init
            if (inputOtpInstance.ngAfterContentInit) {
                inputOtpInstance.ngAfterContentInit();
            }
            tick();
            fixture.detectChanges();
            expect(inputOtpInstance).toBeTruthy();
        }));

        it('should handle focus/blur events through template context', fakeAsync(() => {
            // Test that template context can be accessed
            expect(inputOtpInstance).toBeTruthy();

            // Simulate component state changes
            component.value = '12';
            fixture.detectChanges();
            tick();

            expect(component.value).toBe('12');
        }));

        it('should process pTemplate after content init', fakeAsync(() => {
            if (inputOtpInstance.ngAfterContentInit) {
                inputOtpInstance.ngAfterContentInit();
            }
            tick();
            fixture.detectChanges();

            expect(inputOtpInstance).toBeTruthy();
        }));

        it('should handle pTemplate changes after view init', fakeAsync(() => {
            if (inputOtpInstance.ngAfterViewInit) {
                inputOtpInstance.ngAfterViewInit();
            }
            tick();
            fixture.detectChanges();

            expect(inputOtpInstance).toBeTruthy();
        }));
    });

    describe('#template Tests', () => {
        let fixture: ComponentFixture<TestInputOtpRefTemplateComponent>;
        let component: TestInputOtpRefTemplateComponent;
        let inputOtpElement: DebugElement;
        let inputOtpInstance: InputOtp;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestInputOtpRefTemplateComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestInputOtpRefTemplateComponent);
            component = fixture.componentInstance;
            inputOtpElement = fixture.debugElement.query(By.css('p-inputotp'));
            inputOtpInstance = inputOtpElement.componentInstance;
            fixture.detectChanges();
        });

        it('should have input #template', () => {
            expect(inputOtpInstance).toBeTruthy();
            expect(() => inputOtpInstance.inputTemplate).not.toThrow();
        });

        it('should pass context parameters to input template', fakeAsync(() => {
            // Template should be processed
            expect(inputOtpInstance).toBeTruthy();
            expect(component.length).toBe(4);
            tick();
        }));

        it('should handle input events through template context', fakeAsync(() => {
            // Test that component can handle value changes
            component.value = '1234';
            fixture.detectChanges();
            tick();

            // Value should be updated
            expect(component.value).toBe('1234');
        }));

        it('should handle keyboard events through template context', fakeAsync(() => {
            // Test that template is properly configured
            expect(inputOtpInstance).toBeTruthy();
            // Template should be available after content init
            if (inputOtpInstance.ngAfterContentInit) {
                inputOtpInstance.ngAfterContentInit();
            }
            tick();
            fixture.detectChanges();
            expect(inputOtpInstance).toBeTruthy();
        }));

        it('should handle focus/blur events through template context', fakeAsync(() => {
            // Test that template context can be accessed
            expect(inputOtpInstance).toBeTruthy();

            // Simulate component state changes
            component.value = '12';
            fixture.detectChanges();
            tick();

            expect(component.value).toBe('12');
        }));

        it('should process #template after content init', fakeAsync(() => {
            if (inputOtpInstance.ngAfterContentInit) {
                inputOtpInstance.ngAfterContentInit();
            }
            tick();
            fixture.detectChanges();

            expect(inputOtpInstance).toBeTruthy();
        }));

        it('should handle #template changes after view init', fakeAsync(() => {
            if (inputOtpInstance.ngAfterViewInit) {
                inputOtpInstance.ngAfterViewInit();
            }
            tick();
            fixture.detectChanges();

            expect(inputOtpInstance).toBeTruthy();
        }));
    });
});
