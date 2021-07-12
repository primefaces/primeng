import { TestBed, ComponentFixture } from '@angular/core/testing';
import { InputNumber } from './inputnumber';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    template: `<p-inputNumber [(ngModel)]="val" [readonly]="readonly"></p-inputNumber>`
})
class TestInputNumberComponent {
    val: number;
    readonly: boolean = true;
}

describe('InputNumber', () => {

    let inputNumber: InputNumber;
    let testComponent: TestInputNumberComponent;
    let fixture: ComponentFixture<TestInputNumberComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                FormsModule
            ],
            declarations: [
                InputNumber,
                TestInputNumberComponent
            ]
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

    it('should not update when readonly', () => {
        fixture.detectChanges();

        const updateModelSpy = spyOn(inputNumber, "updateModel").and.callThrough();
        const inputNumberEl = fixture.debugElement.query(By.css("input"));
        const event: any = document.createEvent('CustomEvent');
        event.which = 13;
        event.initEvent('keydown', true, true);
        inputNumberEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        event.initEvent('input', true, true);
        inputNumberEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        event.initEvent('keypress', true, true);
        inputNumberEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        inputNumberEl.nativeElement.dispatchEvent(new Event("focus"));
        fixture.detectChanges();

        expect(document.activeElement).not.toEqual(inputNumber.input.nativeElement);
        expect(updateModelSpy).not.toHaveBeenCalled();
    });

    it('should not display buttons when readonly', () => {
        inputNumber.showButtons = true;
        fixture.detectChanges();
        
        const inputNumberButtonsElArrayReadonly = fixture.debugElement.queryAll(By.css("button"));
        expect(inputNumberButtonsElArrayReadonly).toHaveSize(0);

        testComponent.readonly = false;
        fixture.detectChanges();
        
        const inputNumberButtonsElArray = fixture.debugElement.queryAll(By.css("button"));
        expect(inputNumberButtonsElArray).toHaveSize(2);
    })
});
