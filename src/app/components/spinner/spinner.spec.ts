import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Spinner } from './spinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Spinner', () => {

    let spinner: Spinner;
    let fixture: ComponentFixture<Spinner>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                Spinner
            ]
        });

        fixture = TestBed.createComponent(Spinner);
        spinner = fixture.componentInstance;
    });

    const triggerEvent = (el, type) => {
        const e = document.createEvent('HTMLEvents');
        e.initEvent(type, false, true);
        el.dispatchEvent(e);
    };

    it('should have value as 3 when up clicked 3 times', () => {
        fixture.detectChanges();
        
        const spinnerUp = fixture.nativeElement.querySelector('.ui-spinner-up');
        const clearTimerSpy = spyOn(spinner,'clearTimer').and.callThrough();
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mouseup');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mouseup');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mouseup');
        triggerEvent(spinnerUp, 'mouseleave');
        fixture.detectChanges();

        expect(spinner.value).toBe(3);
        expect(clearTimerSpy).toHaveBeenCalledTimes(7);
    });

    it('should have value as -3 when down clicked 3 times', () => {
        fixture.detectChanges();
        
        const spinnerDown = fixture.nativeElement.querySelector('.ui-spinner-down');
        const clearTimerSpy = spyOn(spinner,'clearTimer').and.callThrough();
        triggerEvent(spinnerDown, 'mousedown');
        triggerEvent(spinnerDown, 'mouseup');
        triggerEvent(spinnerDown, 'mousedown');
        triggerEvent(spinnerDown, 'mouseup');
        triggerEvent(spinnerDown, 'mousedown');
        triggerEvent(spinnerDown, 'mouseup');
        triggerEvent(spinnerDown, 'mouseleave');
        fixture.detectChanges();

        expect(spinner.value).toBe(-3);
        expect(clearTimerSpy).toHaveBeenCalledTimes(7);
    });

    it('Should display the spinner value 0.75  ', () => {
        spinner.step = 0.25;
        fixture.detectChanges();

        const spinnerUp = fixture.nativeElement.querySelector('.ui-spinner-up');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');

        expect(spinner.value).toEqual(0.75);
    });

    it('Should display the formated value with thousand and decimal separator when input is filled by value 1234.1234', () => {
        spinner.precision = 4;
        const spinnerInput = <any>spinner.inputfieldViewChild.nativeElement;
        spinnerInput.value = '1234.1234';
        triggerEvent(spinnerInput, 'input');

        fixture.detectChanges();
        expect(spinner.value).toEqual('1234.1234')
    });
    
    it('Should disabled', () => {
        spinner.disabled = true;
        fixture.detectChanges();
        
        const spinnerInputField = fixture.nativeElement.querySelector('.ui-spinner-input');
        const spinnerUp = fixture.nativeElement.querySelector('.ui-spinner-up');
        const spinnerDown = fixture.nativeElement.querySelector('.ui-spinner-down');

        expect(spinnerInputField.disabled).toEqual(true);
        expect(spinnerUp.disabled).toEqual(true);
        expect(spinnerDown.disabled).toEqual(true);
    });

    it('should value should not change.', () => {
        spinner.disabled=true;
        const spinnerInput = <any>spinner.inputfieldViewChild.nativeElement;
        spinnerInput.value = '1';
        triggerEvent(spinnerInput, 'keyup');
        fixture.detectChanges();

        const spinnerUp = fixture.nativeElement.querySelector('.ui-spinner-up');
        triggerEvent(spinnerUp, 'mousedown');

        expect(spinner.value).toBeUndefined();
    });

    it('should have a maxlength', () => {
        spinner.maxlength = 1;
        fixture.detectChanges();
        const spinnerUp = fixture.nativeElement.querySelector('.ui-spinner-up');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        fixture.detectChanges();

        expect(spinner.value).toBe(9);
    });

    it('should have a max', () => {
        spinner.max = 1;
        fixture.detectChanges();
        const spinnerUp = fixture.nativeElement.querySelector('.ui-spinner-up');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        fixture.detectChanges();

        expect(spinner.value).toBe(1);
    });

    it('should have a min', () => {
        spinner.min = -1;
        fixture.detectChanges();
        const spinnerUp = fixture.nativeElement.querySelector('.ui-spinner-down');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        fixture.detectChanges();

        expect(spinner.value).toBe(-1);
    });

    it('should select with up and down arrows', () => {
        let upArrowEvent = {'which': 38,preventDefault(){}};
        let downArrowEvent = {'which': 40,preventDefault(){}};
        spinner.onInputKeydown(upArrowEvent as KeyboardEvent);
        fixture.detectChanges();

        expect(spinner.value).toEqual(1);
        spinner.onInputKeydown(downArrowEvent as KeyboardEvent);
        fixture.detectChanges();

        expect(spinner.value).toEqual(0);
    });

    it('should change inputStyle and inputStyleClass', () => {
        spinner.inputStyle = {'primeng': 'rocks!'};
        spinner.inputStyleClass = "Primeng ROCKS!";
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        expect(inputEl.nativeElement.className).toContain("Primeng ROCKS!");
        expect(inputEl.nativeElement.style.primeng).toEqual("rocks!");
    });

    it('should change inputId placeholder readonly tabindex and required', () => {
        spinner.inputId = "primeng";
        spinner.placeholder = "Primeng ROCKS!";
        spinner.readonly = true;
        spinner.tabindex = 13;
        spinner.required = true;
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        expect(inputEl.nativeElement.id).toEqual("primeng");
        expect(inputEl.nativeElement.placeholder).toEqual("Primeng ROCKS!");
        expect(inputEl.nativeElement.tabIndex).toEqual(13);
        expect(inputEl.nativeElement.required).toEqual(true);
        expect(inputEl.nativeElement.readOnly).toEqual(true);
    });

    it('should listen onChange onFocus and onBlur', () => {
        fixture.detectChanges();
        let onChangeData;
        spinner.onChange.subscribe(value => onChangeData = value);
        let onFocusData;
        spinner.onFocus.subscribe(value => onFocusData = value);
        let onBlurData;
        spinner.onChange.subscribe(value => onBlurData = value);     
        const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
        inputEl.dispatchEvent(new Event('focus'));
        fixture.detectChanges();

        inputEl.dispatchEvent(new Event('blur'));
        fixture.detectChanges();

        const spinnerUp = fixture.nativeElement.querySelector('.ui-spinner-up');      
        triggerEvent(spinnerUp, 'mousedown');
        fixture.detectChanges();

        expect(onChangeData).toBeTruthy();
        expect(onFocusData).toBeTruthy();
        expect(onBlurData).toBeTruthy();
    });
});
