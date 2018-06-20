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
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        fixture.detectChanges();

        expect(spinner.value).toBe(3);
        expect(spinner.valueAsString).toBe('3');
    });

    it('should have value as -3 when down clicked 3 times', () => {
        fixture.detectChanges();
        const spinnerDown = fixture.nativeElement.querySelector('.ui-spinner-down');
        triggerEvent(spinnerDown, 'mousedown');
        triggerEvent(spinnerDown, 'mousedown');
        triggerEvent(spinnerDown, 'mousedown');
        fixture.detectChanges();

        expect(spinner.value).toBe(-3);
        expect(spinner.valueAsString).toBe('-3');
    });

    it('Should display the spinner value 0.75  ', () => {
        spinner.step = 0.25;
        fixture.detectChanges();

        const spinnerUp = fixture.nativeElement.querySelector('.ui-spinner-up');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');

        expect(spinner.value).toEqual(0.75);
        expect(spinner.valueAsString).toEqual('0.75');
    });

    it('Should display the formated value with thousand and decimal separator when input is filled by value 1234.1234', () => {
        spinner.precision = 4;
        const spinnerInput = <any>spinner.inputfieldViewChild.nativeElement;
        spinnerInput.value = '1234.1234';
        triggerEvent(spinnerInput, 'keyup');

        fixture.detectChanges();

        expect(spinner.valueAsString).toEqual('1,234.1234');
    });
});
