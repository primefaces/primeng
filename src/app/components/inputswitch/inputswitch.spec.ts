import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputSwitch } from './inputswitch';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('InputSwitch', () => {
    let inputswitch: InputSwitch;
    let fixture: ComponentFixture<InputSwitch>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule],
            declarations: [InputSwitch]
        });

        fixture = TestBed.createComponent(InputSwitch);
        inputswitch = fixture.componentInstance;
    });

    it('should created by default', () => {
        fixture.detectChanges();

        const inputSwitchEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(inputSwitchEl).toBeTruthy();
    });

    it('should disabled', () => {
        inputswitch.disabled = true;
        fixture.detectChanges();

        const onClickSpy = spyOn(inputswitch, 'onClick').and.callThrough();
        const inputSwitchEl = fixture.debugElement.query(By.css('div')).nativeElement;
        const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
        inputSwitchEl.click();
        fixture.detectChanges();

        expect(inputSwitchEl.className).toContain('p-disabled');
        expect(inputEl.disabled).toEqual(true);
        expect(onClickSpy).not.toHaveBeenCalled();
    });

    it('should change style and styleClass', () => {
        inputswitch.style = { height: '300px' };
        inputswitch.styleClass = 'Primeng ROCKS!';
        fixture.detectChanges();

        const inputSwitchEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(inputSwitchEl.className).toContain('Primeng ROCKS!');
        expect(inputSwitchEl.style.height).toContain('300px');
    });

    it('should get a name inputId and tabindex', () => {
        inputswitch.tabindex = 5;
        inputswitch.inputId = 'Primeng!';
        inputswitch.name = 'Primeng ROCKS!';
        fixture.detectChanges();

        const inputSwitchEl = fixture.debugElement.query(By.css('input')).nativeElement;
        expect(inputSwitchEl.tabIndex).toEqual(5);
        expect(inputSwitchEl.name).toEqual('Primeng ROCKS!');
        expect(inputSwitchEl.id).toEqual('Primeng!');
    });

    it('should checked when click', () => {
        fixture.detectChanges();

        const onClickSpy = spyOn(inputswitch, 'onClick').and.callThrough();
        const inputSwitchEl = fixture.debugElement.query(By.css('div')).nativeElement;
        let data;
        inputswitch.onChange.subscribe((value) => (data = value));
        inputSwitchEl.click();
        fixture.detectChanges();

        expect(inputswitch.checked()).toEqual(true);
        expect(data.checked).toEqual(true);
        expect(onClickSpy).toHaveBeenCalled();
    });

    it('should listen event emitter', () => {
        fixture.detectChanges();

        let data;
        inputswitch.onChange.subscribe((value) => (data = value));
        const inputSwitchEl = fixture.debugElement.query(By.css('div')).nativeElement;
        inputSwitchEl.click();
        fixture.detectChanges();

        expect(data.checked).toEqual(true);
        inputSwitchEl.click();
        expect(data.checked).toEqual(false);
    });

    it('should change focused', () => {
        fixture.detectChanges();

        const onFocusSpy = spyOn(inputswitch, 'onFocus').and.callThrough();
        const onBlurSpy = spyOn(inputswitch, 'onBlur').and.callThrough();
        const onModelTouchedSpy = spyOn(inputswitch, 'onModelTouched').and.callThrough();
        const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
        const inputSwitchEl = fixture.debugElement.query(By.css('div')).nativeElement;
        inputEl.dispatchEvent(new Event('focus'));
        fixture.detectChanges();

        expect(inputSwitchEl.className).toContain('p-focus');
        expect(inputswitch.focused).toEqual(true);
        expect(onFocusSpy).toHaveBeenCalled();
        inputEl.dispatchEvent(new Event('blur'));
        fixture.detectChanges();

        expect(inputswitch.focused).toEqual(false);
        expect(inputSwitchEl.className).not.toContain('p-focus');
        expect(onBlurSpy).toHaveBeenCalled();
        expect(onModelTouchedSpy).toHaveBeenCalled();
    });

    it('should change disabled', () => {
        fixture.detectChanges();

        inputswitch.setDisabledState(true);
        fixture.detectChanges();

        const onClickSpy = spyOn(inputswitch, 'onClick').and.callThrough();
        const inputSwitchEl = fixture.debugElement.query(By.css('div')).nativeElement;
        const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
        inputSwitchEl.click();
        fixture.detectChanges();

        expect(inputSwitchEl.className).toContain('p-disabled');
        expect(inputEl.disabled).toEqual(true);
        expect(onClickSpy).not.toHaveBeenCalled();
    });

    it('should toggle the modelValue and call necessary functions when not disabled and not readonly', () => {
        spyOn(inputswitch, 'onClick');
        const divElement: HTMLElement = fixture.debugElement.query(By.css('div')).nativeElement;
        divElement.click();
        expect(inputswitch.onClick).toHaveBeenCalledWith(jasmine.anything());

        const initialModelValue = inputswitch.modelValue;
        inputswitch.onClick(new Event('click'));
        expect(inputswitch.modelValue).toEqual(initialModelValue ? inputswitch.falseValue : inputswitch.trueValue);
        expect(inputswitch.onModelChange).toHaveBeenCalledWith(inputswitch.modelValue);
        expect(inputswitch.onChange.emit).toHaveBeenCalledWith({
            originalEvent: jasmine.anything(),
            checked: inputswitch.modelValue
        });
    });

    it('should not toggle the modelValue when disabled or readonly', () => {
        inputswitch.disabled = true;
        let initialModelValue = inputswitch.modelValue;
        inputswitch.onClick(new Event('click'));
        expect(inputswitch.modelValue).toEqual(initialModelValue);

        inputswitch.disabled = false;
        inputswitch.readonly = true;
        initialModelValue = inputswitch.modelValue;
        inputswitch.onClick(new Event('click'));
        expect(inputswitch.modelValue).toEqual(initialModelValue);
    });
});
