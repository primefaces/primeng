import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputMask } from './inputmask';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    template: `<p-inputMask [(ngModel)]="val" mask="99-9999"></p-inputMask>`
})
class TestInputMaskComponent {
    val: string;
}

describe('InputMask', () => {

    let inputmask: InputMask;
    let testComponent: TestInputMaskComponent;
    let fixture: ComponentFixture<TestInputMaskComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                FormsModule
            ],
            declarations: [
                InputMask,
                TestInputMaskComponent,
            ]
        });

        fixture = TestBed.createComponent(TestInputMaskComponent);
        inputmask = fixture.debugElement.children[0].componentInstance;
        testComponent = fixture.componentInstance;

    });

    it('should display by default', () => {
        inputmask.mask = "99-999999";
        fixture.detectChanges();

        const inputMaskEl = fixture.debugElement.query(By.css('input'));
        expect(inputMaskEl.nativeElement).toBeTruthy();
    });

    it('should change style styleClass placeholder inputId size tabindex title and autoFocus', () => {
        inputmask.mask = "99-999999";
        inputmask.style = { 'height': '300px' }
        inputmask.styleClass = "PrimengRocks";
        inputmask.placeholder = "GiveMeANumber";
        inputmask.inputId = "primeng";
        inputmask.size = 5;
        inputmask.tabindex = "1";
        inputmask.required = true;
        inputmask.autoFocus = true;
        inputmask.title = "TheTitle";
        fixture.detectChanges();

        const inputMaskEl = fixture.debugElement.query(By.css('input'));
        expect(inputMaskEl.nativeElement).toBeTruthy();
        expect(inputMaskEl.nativeElement.style['height']).toEqual("300px");
        expect(inputMaskEl.nativeElement.className).toContain("PrimengRocks");
        expect(inputMaskEl.nativeElement.placeholder).toEqual("GiveMeANumber");
        expect(inputMaskEl.nativeElement.id).toEqual("primeng");
        expect(inputMaskEl.nativeElement.size).toEqual(5);
        expect(inputMaskEl.nativeElement.tabIndex).toEqual(1);
        expect(inputMaskEl.nativeElement.required).toBeTruthy();
        expect(inputMaskEl.nativeElement.autofocus).toBeTruthy();
        expect(inputMaskEl.nativeElement.title).toEqual("TheTitle");
    });

    it('should change value with keydown event', () => {
        inputmask.mask = "99-999999";
        fixture.detectChanges();

        const keydownSpy = spyOn(inputmask, "onKeyDown").and.callThrough();
        const onKeyPressSpy = spyOn(inputmask, "onKeyPress").and.callThrough();
        const onInputSpy = spyOn(inputmask, "onInputChange").and.callThrough();
        const onInputBlurSpy = spyOn(inputmask, "onInputBlur").and.callThrough();
        let inputMaskEl = fixture.debugElement.query(By.css('input'));
        inputMaskEl.nativeElement.focus();
        fixture.detectChanges();

        const event: any = document.createEvent('CustomEvent');
        event.which = 53;
        event.initEvent('keydown', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        event.initEvent('input', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        event.initEvent('keypress', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        fixture.detectChanges();

        inputMaskEl = fixture.debugElement.query(By.css('input'));
        expect(keydownSpy).toHaveBeenCalled();
        expect(onInputSpy).toHaveBeenCalled();
        expect(onKeyPressSpy).toHaveBeenCalled();
        expect(testComponent.val).toContain("5");
        inputMaskEl.nativeElement.dispatchEvent(new Event("blur"));
        fixture.detectChanges();

        expect(onInputBlurSpy).toHaveBeenCalled();
    });

    it('should delete with backspace key', () => {
        inputmask.mask = "99-999999";
        fixture.detectChanges();

        let inputMaskEl = fixture.debugElement.query(By.css('input'));
        inputMaskEl.nativeElement.focus();
        fixture.detectChanges();

        const event: any = document.createEvent('CustomEvent');
        event.which = 53;
        event.initEvent('keydown', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        event.initEvent('input', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        event.initEvent('keypress', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        fixture.detectChanges();

        event.which = 53;
        event.initEvent('keydown', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        event.initEvent('input', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        event.initEvent('keypress', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        fixture.detectChanges();

        expect(testComponent.val).toContain("55");
        event.which = 8;
        event.initEvent('keydown', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        event.initEvent('input', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        event.initEvent('keypress', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        fixture.detectChanges();

        expect(testComponent.val).not.toContain("55");
    });

    it('should call onInputBlur with enter key', () => {
        inputmask.mask = "99-999999";
        inputmask.unmask = true;
        fixture.detectChanges();

        const onInputBlurSpy = spyOn(inputmask, "onInputBlur").and.callThrough();
        let inputMaskEl = fixture.debugElement.query(By.css('input'));
        inputMaskEl.nativeElement.focus();
        fixture.detectChanges();

        const event: any = document.createEvent('CustomEvent');
        event.which = 53;
        event.initEvent('keydown', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        event.initEvent('input', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        event.initEvent('keypress', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        fixture.detectChanges();

        event.which = 53;
        event.initEvent('keydown', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        event.initEvent('input', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        event.initEvent('keypress', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        fixture.detectChanges();

        expect(testComponent.val).toContain("55");
        event.which = 13;
        event.initEvent('keydown', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        event.initEvent('input', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        event.initEvent('keypress', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        fixture.detectChanges();

        expect(onInputBlurSpy).toHaveBeenCalled();
    });

    it('should call updateModel when press esc key', () => {
        inputmask.mask = "99-999999";
        fixture.detectChanges();

        let inputMaskEl = fixture.debugElement.query(By.css('input'));
        const updateModelSpy = spyOn(inputmask, "updateModel").and.callThrough();
        inputMaskEl.nativeElement.focus();
        fixture.detectChanges();

        const event: any = document.createEvent('CustomEvent');
        event.which = 53;
        event.initEvent('keydown', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        event.initEvent('input', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        event.initEvent('keypress', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        fixture.detectChanges();

        event.which = 53;
        event.initEvent('keydown', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        event.initEvent('input', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        event.initEvent('keypress', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        fixture.detectChanges();

        expect(testComponent.val).toContain("55");
        event.which = 27;
        event.initEvent('keydown', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        event.initEvent('input', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        event.initEvent('keypress', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        fixture.detectChanges();

        expect(updateModelSpy).toHaveBeenCalled();
    });

    it('should focus on input', () => {
        inputmask.mask = "99-999999";
        fixture.detectChanges();

        let inputMaskEl = fixture.debugElement.query(By.css('input'));
        const onInputFocusSpy = spyOn(inputmask, "onInputFocus").and.callThrough();
        inputMaskEl.nativeElement.focus();
        inputMaskEl.nativeElement.dispatchEvent(new Event("focus"));
        fixture.detectChanges();

        inputMaskEl = fixture.debugElement.query(By.css('input'));
        expect(inputMaskEl.parent.nativeElement.className).toContain("p-inputwrapper-focus");
        expect(onInputFocusSpy).toHaveBeenCalled();
    });

    it('should disabled with setDisabledState', () => {
        inputmask.setDisabledState(true);
        fixture.detectChanges();

        inputmask.focus();
        fixture.detectChanges();

        expect(document.activeElement).not.toEqual(inputmask.inputViewChild.nativeElement);
    });

    it('should be readonly', () => {
        inputmask.readonly = true;
        fixture.detectChanges();

        const updateModelSpy = spyOn(inputmask, "updateModel").and.callThrough();
        const inputMaskEl = fixture.debugElement.query(By.css("input"));
        const event: any = document.createEvent('CustomEvent');
        event.which = 13;
        event.initEvent('keydown', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        event.initEvent('input', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        event.initEvent('keypress', true, true);
        inputMaskEl.nativeElement.dispatchEvent(event as KeyboardEvent);
        inputMaskEl.nativeElement.dispatchEvent(new Event("focus"));
        fixture.detectChanges();

        expect(document.activeElement).not.toEqual(inputmask.inputViewChild.nativeElement);
        expect(updateModelSpy).not.toHaveBeenCalled();
    });
});
