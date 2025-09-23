import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PLATFORM_ID } from '@angular/core';
import { KeyFilter, KeyFilterModule } from './keyfilter';
import { KeyFilterPattern } from './keyfilter.interface';
import { CommonModule } from '@angular/common';

// Test Components
@Component({
    standalone: false,
    template: ` <input type="text" [(ngModel)]="value" [pKeyFilter]="pattern" [pValidateOnly]="validateOnly" (ngModelChange)="onModelChange($event)" #inputEl /> `
})
class TestBasicKeyFilterComponent {
    value: string = '';
    pattern: RegExp | KeyFilterPattern | null | undefined = null as any;
    validateOnly: boolean = false;

    onModelChange(event: any) {
        // Callback for testing
    }
}

@Component({
    standalone: false,
    template: `
        <form [formGroup]="form">
            <input type="text" formControlName="testField" [pKeyFilter]="pattern" [pValidateOnly]="validateOnly" />
        </form>
    `
})
class TestFormKeyFilterComponent {
    form = new FormGroup({
        testField: new FormControl('', [Validators.required])
    });
    pattern: RegExp | KeyFilterPattern | null | undefined = null as any;
    validateOnly: boolean = false;
}

describe('KeyFilter', () => {
    let directive: KeyFilter;
    let fixture: ComponentFixture<TestBasicKeyFilterComponent>;
    let testComponent: TestBasicKeyFilterComponent;
    let inputEl: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [KeyFilterModule, FormsModule, ReactiveFormsModule, CommonModule],
            declarations: [TestBasicKeyFilterComponent, TestFormKeyFilterComponent],
            providers: [{ provide: PLATFORM_ID, useValue: 'browser' }]
        }).compileComponents();

        fixture = TestBed.createComponent(TestBasicKeyFilterComponent);
        testComponent = fixture.componentInstance;
        inputEl = fixture.debugElement.query(By.css('input'));
        directive = inputEl.injector.get(KeyFilter);
        fixture.detectChanges();
    });

    describe('Directive Initialization', () => {
        it('should create the directive', () => {
            expect(directive).toBeTruthy();
        });

        it('should have default regex pattern', () => {
            expect(directive.regex).toBeTruthy();
            expect(directive.regex.toString()).toBe('/./');
        });

        it('should initialize with browser platform detection', () => {
            expect(directive.isAndroid).toBeDefined();
            expect(typeof directive.isAndroid).toBe('boolean');
        });

        it('should have element reference', () => {
            expect(directive.el).toBeTruthy();
            expect(directive.el.nativeElement).toBe(inputEl.nativeElement);
        });
    });

    describe('Pattern Setting and Recognition', () => {
        it('should set regex pattern directly', () => {
            const customRegex = /[a-z]/;
            testComponent.pattern = customRegex;
            fixture.detectChanges();

            expect(directive.pattern).toBe(customRegex);
            expect(directive.regex).toBe(customRegex);
        });

        it('should recognize pint pattern', () => {
            testComponent.pattern = 'pint';
            fixture.detectChanges();

            expect(directive.pattern).toBe('pint');
            expect(directive.regex.toString()).toBe('/^[\\d]*$/');
        });

        it('should recognize int pattern', () => {
            testComponent.pattern = 'int';
            fixture.detectChanges();

            expect(directive.pattern).toBe('int');
            expect(directive.regex.toString()).toBe('/^[-]?[\\d]*$/');
        });

        it('should recognize pnum pattern', () => {
            testComponent.pattern = 'pnum';
            fixture.detectChanges();

            expect(directive.pattern).toBe('pnum');
            expect(directive.regex.toString()).toBe('/^[\\d\\.]*$/');
        });

        it('should recognize money pattern', () => {
            testComponent.pattern = 'money';
            fixture.detectChanges();

            expect(directive.pattern).toBe('money');
            expect(directive.regex.toString()).toBe('/^[\\d\\.\\s,]*$/');
        });

        it('should recognize num pattern', () => {
            testComponent.pattern = 'num';
            fixture.detectChanges();

            expect(directive.pattern).toBe('num');
            expect(directive.regex.toString()).toBe('/^[-]?[\\d\\.]*$/');
        });

        it('should recognize hex pattern', () => {
            testComponent.pattern = 'hex';
            fixture.detectChanges();

            expect(directive.pattern).toBe('hex');
            expect(directive.regex.toString()).toBe('/^[0-9a-f]*$/i');
        });

        it('should recognize email pattern', () => {
            testComponent.pattern = 'email';
            fixture.detectChanges();

            expect(directive.pattern).toBe('email');
            expect(directive.regex.toString()).toBe('/^[a-z0-9_\\.\\-@]*$/i');
        });

        it('should recognize alpha pattern', () => {
            testComponent.pattern = 'alpha';
            fixture.detectChanges();

            expect(directive.pattern).toBe('alpha');
            expect(directive.regex.toString()).toBe('/^[a-z_]*$/i');
        });

        it('should recognize alphanum pattern', () => {
            testComponent.pattern = 'alphanum';
            fixture.detectChanges();

            expect(directive.pattern).toBe('alphanum');
            expect(directive.regex.toString()).toBe('/^[a-z0-9_]*$/i');
        });

        it('should use default regex for unknown pattern', () => {
            testComponent.pattern = 'unknown' as KeyFilterPattern;
            fixture.detectChanges();

            expect(directive.regex.toString()).toBe('/./');
        });

        it('should handle null pattern', () => {
            testComponent.pattern = null as any;
            fixture.detectChanges();

            expect(directive.pattern).toBe(null);
            expect(directive.regex.toString()).toBe('/./');
        });
    });

    describe('Key Detection Methods', () => {
        it('should identify navigation keys', () => {
            const navKeyEvent = new KeyboardEvent('keydown', { keyCode: 37 }); // left arrow
            expect(directive.isNavKeyPress(navKeyEvent)).toBe(true);

            const returnKeyEvent = new KeyboardEvent('keydown', { keyCode: 13 }); // return
            expect(directive.isNavKeyPress(returnKeyEvent)).toBe(true);

            const tabKeyEvent = new KeyboardEvent('keydown', { keyCode: 9 }); // tab
            expect(directive.isNavKeyPress(tabKeyEvent)).toBe(true);

            const regularKeyEvent = new KeyboardEvent('keydown', { keyCode: 65 }); // 'a'
            expect(directive.isNavKeyPress(regularKeyEvent)).toBe(false);
        });

        it('should identify special keys', () => {
            const tabKeyEvent = new KeyboardEvent('keydown', { keyCode: 9 });
            expect(directive.isSpecialKey(tabKeyEvent)).toBe(true);

            const enterKeyEvent = new KeyboardEvent('keydown', { keyCode: 13 });
            expect(directive.isSpecialKey(enterKeyEvent)).toBe(true);

            const escKeyEvent = new KeyboardEvent('keydown', { keyCode: 27 });
            expect(directive.isSpecialKey(escKeyEvent)).toBe(true);

            const shiftKeyEvent = new KeyboardEvent('keydown', { keyCode: 16 });
            expect(directive.isSpecialKey(shiftKeyEvent)).toBe(true);

            const regularKeyEvent = new KeyboardEvent('keydown', { keyCode: 65 });
            const result = directive.isSpecialKey(regularKeyEvent);
            // Should return falsy value (false, undefined, or 0)
            expect(result).toBeFalsy();
        });

        it('should get correct key code', () => {
            const keyEvent = new KeyboardEvent('keydown', { keyCode: 65 });
            expect(directive.getKey(keyEvent)).toBe(65);
        });

        it('should get correct char code', () => {
            const keyEvent = new KeyboardEvent('keypress', { charCode: 97 });
            expect(directive.getCharCode(keyEvent)).toBe(97);
        });
    });

    describe('String Validation Methods', () => {
        beforeEach(() => {
            testComponent.pattern = 'pint'; // positive integers only
            fixture.detectChanges();
        });

        it('should validate single character', () => {
            expect(directive.isValidChar('5')).toBe(true);
            expect(directive.isValidChar('a')).toBe(false);
            expect(directive.isValidChar('-')).toBe(false);
        });

        it('should validate entire string', () => {
            expect(directive.isValidString('12345')).toBe(true);
            expect(directive.isValidString('123abc')).toBe(false);
            expect(directive.isValidString('-123')).toBe(false);
            expect(directive.isValidString('')).toBe(true);
        });

        it('should find delta between strings', () => {
            const delta = directive.findDelta('hello', 'hllo');
            expect(delta).toBe('e');

            const delta2 = directive.findDelta('abc123', 'abc');
            expect(delta2).toBe('123');

            const delta3 = directive.findDelta('same', 'same');
            expect(delta3).toBe('' as any);
        });
    });

    describe('Input Event Handling', () => {
        let inputElement: HTMLInputElement;

        beforeEach(() => {
            inputElement = inputEl.nativeElement;
            testComponent.pattern = 'pint';
            fixture.detectChanges();
        });

        it('should handle valid input on Android', fakeAsync(() => {
            // Simulate Android environment
            directive.isAndroid = true;
            directive.lastValue = '123';
            inputElement.value = '1234';

            const inputEvent = new Event('input');
            inputElement.dispatchEvent(inputEvent);
            tick();

            expect(inputElement.value).toBe('1234');
            flush();
        }));

        it('should reject invalid input on Android', fakeAsync(() => {
            // Simulate Android environment
            directive.isAndroid = true;
            directive.lastValue = '123';
            inputElement.value = '123a';
            spyOn(directive.ngModelChange, 'emit');

            const inputEvent = new Event('input');
            inputElement.dispatchEvent(inputEvent);
            tick();

            expect(inputElement.value).toBe('123');
            expect(directive.ngModelChange.emit).toHaveBeenCalledWith('123');
            flush();
        }));

        it('should handle paste validation on Android', fakeAsync(() => {
            // Simulate Android environment
            directive.isAndroid = true;
            directive.lastValue = '';
            inputElement.value = 'abc123'; // pasted mixed content
            spyOn(directive.ngModelChange, 'emit');

            const inputEvent = new Event('input');
            inputElement.dispatchEvent(inputEvent);
            tick();

            expect(inputElement.value).toBe('' as any);
            expect(directive.ngModelChange.emit).toHaveBeenCalledWith('');
            flush();
        }));

        it('should not process input when not Android and validateOnly is false', fakeAsync(() => {
            directive.isAndroid = false;
            inputElement.value = 'test';

            const inputEvent = new Event('input');
            inputElement.dispatchEvent(inputEvent);
            tick();

            // Should not change the value
            expect(inputElement.value).toBe('test');
            flush();
        }));
    });

    describe('Keypress Event Handling', () => {
        let inputElement: HTMLInputElement;

        beforeEach(() => {
            inputElement = inputEl.nativeElement;
            testComponent.pattern = 'pint';
            directive.isAndroid = false; // Ensure we're not on Android
            testComponent.validateOnly = false;
            fixture.detectChanges();
        });

        it('should allow valid characters', () => {
            inputElement.value = '123';
            const keyEvent = new KeyboardEvent('keypress', { keyCode: 52, charCode: 52 }); // '4'
            spyOn(keyEvent, 'preventDefault');

            inputElement.dispatchEvent(keyEvent);

            expect(keyEvent.preventDefault).not.toHaveBeenCalled();
        });

        it('should prevent invalid characters', () => {
            inputElement.value = '123';
            const keyEvent = new KeyboardEvent('keypress', { keyCode: 97, charCode: 97 }); // 'a'
            spyOn(keyEvent, 'preventDefault');

            inputElement.dispatchEvent(keyEvent);

            expect(keyEvent.preventDefault).toHaveBeenCalled();
        });

        it('should allow navigation keys', () => {
            const enterEvent = new KeyboardEvent('keypress', { keyCode: 13 });
            spyOn(enterEvent, 'preventDefault');

            inputElement.dispatchEvent(enterEvent);

            expect(enterEvent.preventDefault).not.toHaveBeenCalled();
        });

        it('should allow ctrl+key combinations', () => {
            const ctrlAEvent = new KeyboardEvent('keypress', { keyCode: 97, ctrlKey: true });
            spyOn(ctrlAEvent, 'preventDefault');

            inputElement.dispatchEvent(ctrlAEvent);

            expect(ctrlAEvent.preventDefault).not.toHaveBeenCalled();
        });

        it('should skip processing on Android', () => {
            directive.isAndroid = true;
            const keyEvent = new KeyboardEvent('keypress', { keyCode: 97, charCode: 97 }); // 'a'
            spyOn(keyEvent, 'preventDefault');

            inputElement.dispatchEvent(keyEvent);

            expect(keyEvent.preventDefault).not.toHaveBeenCalled();
        });

        it('should skip processing when validateOnly is true', () => {
            testComponent.validateOnly = true;
            fixture.detectChanges();

            const keyEvent = new KeyboardEvent('keypress', { keyCode: 97, charCode: 97 }); // 'a'
            spyOn(keyEvent, 'preventDefault');

            inputElement.dispatchEvent(keyEvent);

            expect(keyEvent.preventDefault).not.toHaveBeenCalled();
        });
    });

    describe('Paste Event Handling', () => {
        let inputElement: HTMLInputElement;

        beforeEach(() => {
            inputElement = inputEl.nativeElement;
            testComponent.pattern = 'pint';
            fixture.detectChanges();
        });

        it('should allow valid pasted content', () => {
            // Mock clipboard data
            const mockClipboardData = {
                getData: jasmine.createSpy('getData').and.returnValue('12345')
            };

            const pasteEvent = new Event('paste') as any;
            pasteEvent.clipboardData = mockClipboardData;
            spyOn(pasteEvent, 'preventDefault');

            inputElement.dispatchEvent(pasteEvent);

            expect(pasteEvent.preventDefault).not.toHaveBeenCalled();
        });

        it('should prevent invalid pasted content', () => {
            // Mock clipboard data with invalid content
            const mockClipboardData = {
                getData: jasmine.createSpy('getData').and.returnValue('123abc')
            };

            const pasteEvent = new Event('paste') as any;
            pasteEvent.clipboardData = mockClipboardData;
            spyOn(pasteEvent, 'preventDefault');

            inputElement.dispatchEvent(pasteEvent);

            expect(pasteEvent.preventDefault).toHaveBeenCalled();
        });

        it('should handle complex regex patterns for paste', () => {
            testComponent.pattern = /^\d{3}$/; // exactly 3 digits
            fixture.detectChanges();

            const mockClipboardData = {
                getData: jasmine.createSpy('getData').and.returnValue('123')
            };

            const pasteEvent = new Event('paste') as any;
            pasteEvent.clipboardData = mockClipboardData;
            spyOn(pasteEvent, 'preventDefault');

            inputElement.dispatchEvent(pasteEvent);

            expect(pasteEvent.preventDefault).not.toHaveBeenCalled();
        });

        it('should prevent invalid content with complex regex', () => {
            testComponent.pattern = /^\d{3}$/; // exactly 3 digits
            fixture.detectChanges();

            const mockClipboardData = {
                getData: jasmine.createSpy('getData').and.returnValue('1234') // too many digits
            };

            const pasteEvent = new Event('paste') as any;
            pasteEvent.clipboardData = mockClipboardData;
            spyOn(pasteEvent, 'preventDefault');

            inputElement.dispatchEvent(pasteEvent);

            expect(pasteEvent.preventDefault).toHaveBeenCalled();
        });
    });

    describe('Form Validation', () => {
        let formComponent: TestFormKeyFilterComponent;
        let formFixture: ComponentFixture<TestFormKeyFilterComponent>;

        beforeEach(async () => {
            formFixture = TestBed.createComponent(TestFormKeyFilterComponent);
            formComponent = formFixture.componentInstance;
            formComponent.pattern = 'pint';
            formComponent.validateOnly = true;
            formFixture.detectChanges();
        });

        it('should integrate with reactive forms', () => {
            expect(formComponent.form.get('testField')).toBeTruthy();
        });

        it('should validate form field when validateOnly is true', () => {
            const inputEl = formFixture.debugElement.query(By.css('input'));
            const directive = inputEl.injector.get(KeyFilter);

            inputEl.nativeElement.value = '123abc'; // invalid for pint pattern

            const control = formComponent.form.get('testField');
            const validationResult = directive.validate(control!);

            expect(validationResult).toEqual({ validatePattern: false });
        });

        it('should not validate when validateOnly is false', () => {
            formComponent.validateOnly = false;
            formFixture.detectChanges();

            const inputEl = formFixture.debugElement.query(By.css('input'));
            const directive = inputEl.injector.get(KeyFilter);

            inputEl.nativeElement.value = '123abc';

            const control = formComponent.form.get('testField');
            const validationResult = directive.validate(control!);

            expect(validationResult).toBeUndefined();
        });

        it('should return no validation error for valid input', () => {
            const inputEl = formFixture.debugElement.query(By.css('input'));
            const directive = inputEl.injector.get(KeyFilter);

            inputEl.nativeElement.value = '12345'; // valid for pint pattern

            const control = formComponent.form.get('testField');
            const validationResult = directive.validate(control!);

            expect(validationResult).toBeUndefined();
        });
    });

    describe('Built-in Patterns Integration', () => {
        it('should work with different built-in patterns', () => {
            // Test each pattern individually by setting it on the main test component

            // Test pint pattern
            testComponent.pattern = 'pint';
            fixture.detectChanges();
            expect(directive.isValidString('12345')).toBe(true);
            expect(directive.isValidString('123abc')).toBe(false);
            expect(directive.isValidString('-123')).toBe(false);

            // Test int pattern
            testComponent.pattern = 'int';
            fixture.detectChanges();
            expect(directive.isValidString('12345')).toBe(true);
            expect(directive.isValidString('-123')).toBe(true);
            expect(directive.isValidString('123abc')).toBe(false);

            // Test email pattern
            testComponent.pattern = 'email';
            fixture.detectChanges();
            expect(directive.isValidString('test@example.com')).toBe(true);
            expect(directive.isValidString('user.name@domain')).toBe(true);
            expect(directive.isValidString('invalid email!')).toBe(false);

            // Test hex pattern
            testComponent.pattern = 'hex';
            fixture.detectChanges();
            expect(directive.isValidString('ff00aa')).toBe(true);
            expect(directive.isValidString('123abc')).toBe(true);
            expect(directive.isValidString('xyz')).toBe(false);

            // Test alpha pattern
            testComponent.pattern = 'alpha';
            fixture.detectChanges();
            expect(directive.isValidString('abcdef')).toBe(true);
            expect(directive.isValidString('test_value')).toBe(true);
            expect(directive.isValidString('abc123')).toBe(false);

            // Test alphanum pattern
            testComponent.pattern = 'alphanum';
            fixture.detectChanges();
            expect(directive.isValidString('abc123')).toBe(true);
            expect(directive.isValidString('test_value')).toBe(true);
            expect(directive.isValidString('test-value')).toBe(false);

            // Test pnum pattern
            testComponent.pattern = 'pnum';
            fixture.detectChanges();
            expect(directive.isValidString('123.45')).toBe(true);
            expect(directive.isValidString('123')).toBe(true);
            expect(directive.isValidString('-123')).toBe(false);

            // Test money pattern
            testComponent.pattern = 'money';
            fixture.detectChanges();
            expect(directive.isValidString('123.45')).toBe(true);
            expect(directive.isValidString('1,234.56')).toBe(true);
            expect(directive.isValidString('1 234')).toBe(true);
            expect(directive.isValidString('abc')).toBe(false);

            // Test num pattern
            testComponent.pattern = 'num';
            fixture.detectChanges();
            expect(directive.isValidString('123.45')).toBe(true);
            expect(directive.isValidString('-123.45')).toBe(true);
            expect(directive.isValidString('abc')).toBe(false);
        });
    });

    describe('Edge Cases and Error Handling', () => {
        it('should handle empty clipboard data', () => {
            const pasteEvent = new Event('paste') as any;
            pasteEvent.clipboardData = null as any;
            spyOn(pasteEvent, 'preventDefault');

            expect(() => {
                inputEl.nativeElement.dispatchEvent(pasteEvent);
            }).not.toThrow();
        });

        it('should handle undefined values gracefully', () => {
            expect(() => {
                directive.isValidChar('');
                directive.isValidString('');
                directive.findDelta('', '');
            }).not.toThrow();
        });

        it('should handle very long strings', () => {
            const longString = 'a'.repeat(10000);
            testComponent.pattern = 'alpha';
            fixture.detectChanges();

            expect(() => {
                directive.isValidString(longString);
            }).not.toThrow();
        });

        it('should handle special characters in patterns', () => {
            testComponent.pattern = /[!@#$%^&*()]/;
            fixture.detectChanges();

            expect(directive.isValidChar('!')).toBe(true);
            expect(directive.isValidChar('a')).toBe(false);
        });

        it('should handle Unicode characters', () => {
            testComponent.pattern = /[àáâãäåæçèéêë]/;
            fixture.detectChanges();

            expect(directive.isValidChar('é')).toBe(true);
            expect(directive.isValidChar('a')).toBe(false);
        });

        it('should handle browser compatibility for key codes', () => {
            // Test Safari key code mapping
            const mockSafariKey = 63234; // Safari left arrow
            const keyEvent = new KeyboardEvent('keypress', { keyCode: mockSafariKey });

            expect(() => {
                directive.getKey(keyEvent);
            }).not.toThrow();
        });
    });

    describe('Platform and Browser Detection', () => {
        it('should handle server-side rendering', () => {
            // Create directive with server platform
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [KeyFilterModule, FormsModule, ReactiveFormsModule, CommonModule],
                declarations: [TestBasicKeyFilterComponent],
                providers: [{ provide: PLATFORM_ID, useValue: 'server' }]
            });

            const serverFixture = TestBed.createComponent(TestBasicKeyFilterComponent);
            const serverInputEl = serverFixture.debugElement.query(By.css('input'));
            const serverDirective = serverInputEl.injector.get(KeyFilter);

            expect(serverDirective.isAndroid).toBe(false);
        });

        it('should detect browser environment', () => {
            expect(directive.isAndroid).toBeDefined();
            expect(typeof directive.isAndroid).toBe('boolean');
        });
    });

    describe('Event Integration Tests', () => {
        it('should integrate all events correctly', fakeAsync(() => {
            testComponent.pattern = 'pint';
            testComponent.value = '';
            fixture.detectChanges();

            const inputElement = inputEl.nativeElement;

            // Test valid keypress
            const validKeyEvent = new KeyboardEvent('keypress', { keyCode: 53, charCode: 53 }); // '5'
            spyOn(validKeyEvent, 'preventDefault');
            inputElement.dispatchEvent(validKeyEvent);

            expect(validKeyEvent.preventDefault).not.toHaveBeenCalled();

            // Test invalid keypress
            const invalidKeyEvent = new KeyboardEvent('keypress', { keyCode: 97, charCode: 97 }); // 'a'
            spyOn(invalidKeyEvent, 'preventDefault');
            inputElement.dispatchEvent(invalidKeyEvent);

            expect(invalidKeyEvent.preventDefault).toHaveBeenCalled();

            // Test valid paste
            const validPasteEvent = new Event('paste') as any;
            validPasteEvent.clipboardData = { getData: () => '123' };
            spyOn(validPasteEvent, 'preventDefault');
            inputElement.dispatchEvent(validPasteEvent);

            expect(validPasteEvent.preventDefault).not.toHaveBeenCalled();

            tick();
            flush();
        }));
    });

    describe('Model Change Events', () => {
        it('should emit ngModelChange on Android input correction', fakeAsync(() => {
            directive.isAndroid = true;
            spyOn(testComponent, 'onModelChange');
            spyOn(directive.ngModelChange, 'emit');

            testComponent.pattern = 'pint';
            fixture.detectChanges();

            directive.lastValue = '123';
            inputEl.nativeElement.value = '123a'; // invalid character

            const inputEvent = new Event('input');
            inputEl.nativeElement.dispatchEvent(inputEvent);
            tick();

            expect(directive.ngModelChange.emit).toHaveBeenCalledWith('123');
            flush();
        }));
    });
});
