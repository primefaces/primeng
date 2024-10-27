import { ComponentRef } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputOtp } from './inputotp';

describe('InputOtp', () => {
    let inputOtp: InputOtp;
    let fixture: ComponentFixture<InputOtp>;
    let inputOtpRef: ComponentRef<InputOtp>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InputOtp],
        }).compileComponents();

        fixture = TestBed.createComponent(InputOtp);
        inputOtp = fixture.componentInstance;
        inputOtpRef = fixture.componentRef;
        fixture.detectChanges();
    });

    // 1. Test: Component creation
    it('should create the component', () => {
        expect(inputOtp).toBeTruthy();
    });

    // 2. Test: Number of input fields should match the length
    it('should render the correct number of input fields based on length', () => {
        inputOtpRef.setInput('length', 6);
        fixture.detectChanges();
        const inputs = fixture.debugElement.queryAll(By.css('input'));
        expect(inputs.length).toBe(6);
    });

    // 3. Test: Autofocus on the first input
    it('should autofocus on the first input if autofocus is set', () => {
        inputOtpRef.setInput('autofocus', true);
        fixture.detectChanges();
        const firstInput = fixture.debugElement.query(By.css('input')).nativeElement;
        expect(firstInput.autofocus).toBeTrue();
    });

    // 4. Test: Disabled property
    it('should disable all input fields if disabled is true', () => {
        inputOtpRef.setInput('disabled', true);
        fixture.detectChanges();
        const inputs = fixture.debugElement.queryAll(By.css('input'));
        inputs.forEach((input) => {
            expect(input.nativeElement.disabled).toBeTrue();
        });
    });

    // 5. Test: Readonly property
    it('should set all input fields to readonly if readonly is true', () => {
        inputOtpRef.setInput('readonly', true);
        fixture.detectChanges();
        const inputs = fixture.debugElement.queryAll(By.css('input'));
        inputs.forEach((input) => {
            expect(input.nativeElement.readOnly).toBeTrue();
        });
    });

    // 6. Test: Input type changes to password if mask is true
    it('should set input type to password if mask is true', () => {
        inputOtpRef.setInput('mask', true);
        fixture.detectChanges();
        const inputs = fixture.debugElement.queryAll(By.css('input'));
        inputs.forEach((input) => {
            expect(input.nativeElement.type).toBe('password');
        });
    });

    // 7. Test: Correct variant class applied
    it('should apply the correct variant class', () => {
        inputOtpRef.setInput('variant', 'filled');
        fixture.detectChanges();
        const input = fixture.debugElement.query(By.css('.p-inputotp-input')).nativeElement;
        expect(input.classList).toContain('p-variant-filled');
    });

    // 8. Test: onChange emits correct value on input
    it('should emit the onChange event with correct value on input', () => {
        spyOn(inputOtp.onChange, 'emit');
        const input = fixture.debugElement.query(By.css('input')).nativeElement;
        input.value = '5';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(inputOtp.onChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({ value: '5' }));
    });

    // 9. Test: ArrowRight moves to the next input
    it('should focus the next input on ArrowRight key press', () => {
        const inputs = fixture.debugElement.queryAll(By.css('input'));
        inputs[0].nativeElement.focus();
        const event = new KeyboardEvent('keydown', { code: 'ArrowRight' });
        inputs[0].nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(document.activeElement).toBe(inputs[1].nativeElement);
    });

    // 10. Test: ArrowLeft moves to the previous input
    it('should focus the previous input on ArrowLeft key press', () => {
        const inputs = fixture.debugElement.queryAll(By.css('input'));
        inputs[1].nativeElement.focus();
        const event = new KeyboardEvent('keydown', { code: 'ArrowLeft' });
        inputs[1].nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(document.activeElement).toBe(inputs[0].nativeElement);
    });

    // 11. Test: onPaste pastes only valid content
    it('should update tokens on valid paste event', () => {
        const pasteEvent = new ClipboardEvent('paste', { clipboardData: new DataTransfer() });
        pasteEvent.clipboardData!.setData('text', '1234');
        spyOn(inputOtp, 'updateModel');
        fixture.debugElement.query(By.css('input')).triggerEventHandler('paste', pasteEvent);
        fixture.detectChanges();
        expect(inputOtp.updateModel).toHaveBeenCalled();
    });

    // 12. Test: input fields have maxLength of 1
    it('should set maxLength of each input to 1', () => {
        const inputs = fixture.debugElement.queryAll(By.css('input'));
        inputs.forEach((input) => {
            expect(input.nativeElement.maxLength).toBe(1);
        });
    });

    // 13. Test: Write value method
    it('should write the provided value to the inputs', () => {
        inputOtp.writeValue('5678');
        fixture.detectChanges();
        expect(inputOtp.tokens()).toEqual(['5', '6', '7', '8']);
    });

    // 14. Test: Backspace moves to previous input if empty
    it('should move focus to previous input on Backspace if current input is empty', () => {
        const inputs = fixture.debugElement.queryAll(By.css('input'));
        inputs[1].nativeElement.value = '';
        const event = new KeyboardEvent('keydown', { code: 'Backspace' });
        inputs[1].nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(document.activeElement).toBe(inputs[0].nativeElement);
    });

    // 15. Test: Integer-only inputs
    it('should prevent non-integer input if integerOnly is true', () => {
        inputOtpRef.setInput('integerOnly', true);
        fixture.detectChanges();

        const input = fixture.debugElement.query(By.css('input')).nativeElement;
        const event = new KeyboardEvent('keydown', { key: 'a', code: 'KeyA' });

        spyOn(event, 'preventDefault');

        input.dispatchEvent(event);

        // Check if preventDefault was called to prevent non-integer input
        expect(event.preventDefault).toHaveBeenCalled();
    });

    // 16: Full OTP is populated when selecting an OTP suggestion from mobile keyboard
    fit('should populate all fields with full OTP when selecting an OTP suggestion from the mobile keyboard', () => {
        // OTP code
        const otpCode = '1234';

        // Act: Simulate a single input event with the full OTP code as the suggestion
        const firstInput = fixture.debugElement.query(By.css('input')).nativeElement;
        firstInput.value = otpCode;
        firstInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        // Assert: Ensure each input field contains the correct character from the OTP code
        const inputs = fixture.debugElement.queryAll(By.css('input'));
        inputs.forEach((input, index) => {
            expect(input.nativeElement.value).toBe(otpCode[index]);
        });
    });
});
