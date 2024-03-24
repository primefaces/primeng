import { TestBed, ComponentFixture } from '@angular/core/testing';
import { InputNumber } from './inputnumber';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    template: `<p-inputNumber [(ngModel)]="val" [readonly]="readonly" [minFractionDigits]="minFractionDigits"></p-inputNumber>`
})
class TestInputNumberComponent {
    val: number;
    readonly: boolean = true;
    minFractionDigits = 2;
}

describe('InputNumber', () => {
    let inputNumber: InputNumber;
    let testComponent: TestInputNumberComponent;
    let fixture: ComponentFixture<TestInputNumberComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, FormsModule],
            declarations: [InputNumber, TestInputNumberComponent]
        });

        fixture = TestBed.createComponent(TestInputNumberComponent);
        inputNumber = fixture.debugElement.children[0].componentInstance;
        testComponent = fixture.componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const inputMaskEl = fixture.debugElement.query(By.css('input'));
        expect(inputMaskEl.nativeElement).toBeTruthy();
    });
    describe('Numepad decimal', () => {
        const pressFiveEvent = new KeyboardEvent('event', {
            code: 'Digit5',
            key: '5',
            keyCode: '5'.charCodeAt(0)
        });
        const pressNumpadDecimalWithDotEvent = new KeyboardEvent('event', {
            code: 'NumpadDecimal',
            key: '.',
            keyCode: '.'.charCodeAt(0)
        });
        const pressNumpadDecimalWithCommaEvent = new KeyboardEvent('event', {
            code: 'NumpadDecimal',
            key: ',',
            keyCode: ','.charCodeAt(0)
        });

        beforeEach(() => {
            testComponent.readonly = false;
            testComponent.val = 0;
            fixture.detectChanges();
        });
        it('should accept numpad dot as decimal separator', () => {
            inputNumber.onInputKeyPress(pressFiveEvent);
            inputNumber.onInputKeyPress(pressNumpadDecimalWithDotEvent);
            inputNumber.onInputKeyPress(pressFiveEvent);
            expect(testComponent.val).toEqual(5.5);
        });
        it('should accept numpad comma as decimal separator', () => {
            inputNumber.onInputKeyPress(pressFiveEvent);
            inputNumber.onInputKeyPress(pressNumpadDecimalWithCommaEvent);
            inputNumber.onInputKeyPress(pressFiveEvent);
            expect(testComponent.val).toEqual(5.5);
        });
        it('should model value', () => {
            inputNumber.onInputKeyPress(pressFiveEvent);
            inputNumber.onInputKeyPress(pressNumpadDecimalWithDotEvent);
            inputNumber.onInputKeyPress(pressFiveEvent);
            expect(typeof inputNumber.value).toEqual('number');
            expect(inputNumber.value).toEqual(5.5);
            inputNumber.onInputBlur({} as Event);
            expect(typeof inputNumber.value).toEqual('number');
            expect(inputNumber.value).toEqual(5.5);
            const inputMaskEl = fixture.debugElement.query(By.css('input'));
            inputMaskEl.nativeElement.value = '';
            const pressMinusEvent = new KeyboardEvent('event', {
                code: 'Minus',
                key: '-',
                keyCode: '-'.charCodeAt(0)
            });
            inputNumber.onInputKeyPress(pressMinusEvent);
            //@ts-ignore primeNG can can set value to string '-'
            expect(inputNumber.value).toEqual('-');
            expect(typeof inputNumber.value).toEqual('string');
            inputNumber.onInputBlur({} as Event);
            expect(inputNumber.value).toEqual(null);
            inputNumber.onInputKeyPress(pressMinusEvent);
            inputNumber.onInputKeyPress(pressFiveEvent);
            expect(typeof inputNumber.value).toEqual('number');
            expect(inputNumber.value).toEqual(-5);
            inputNumber.onInputBlur({} as Event);
            expect(typeof inputNumber.value).toEqual('number');
            expect(inputNumber.value).toEqual(-5);
        });
    });
});
