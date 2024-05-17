import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputTextarea } from './inputtextarea';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, DebugElement } from '@angular/core';

@Component({
    template: `<textarea rows="1" cols="1" (onResize)="onResize($event)" [autoResize]="autoResize" pInputTextarea></textarea> `
})
class TestInputTextArea {
    autoResize: boolean;

    onResize(event) {}
}

describe('InputTextarea', () => {
    let fixture: ComponentFixture<TestInputTextArea>;
    let component: TestInputTextArea;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule],
            declarations: [InputTextarea, TestInputTextArea]
        });

        fixture = TestBed.createComponent(TestInputTextArea);
        component = fixture.debugElement.componentInstance;
    });
    it('should display by default', () => {
        fixture.detectChanges();

        const inputTextEl = fixture.debugElement.query(By.css('textarea'));
        expect(inputTextEl).toBeTruthy();
    });

    it('should change autoResize', () => {
        component.autoResize = true;
        fixture.detectChanges();

        const onResizeSpy = spyOn(component, 'onResize').and.callThrough();
        const inputTextEl = fixture.debugElement.query(By.css('textarea'));
        inputTextEl.nativeElement.value = 'primeng';
        inputTextEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        inputTextEl.nativeElement.value = 'primeng rocks!';
        inputTextEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(onResizeSpy).toHaveBeenCalledTimes(2);
    });

    it('should change autoResize and resize scrollheight of textarea', () => {
        component.autoResize = true;
        fixture.detectChanges();

        const onResizeSpy = spyOn(component, 'onResize').and.callThrough();
        const inputTextEl = fixture.debugElement.query(By.css('textarea'));
        const initialScrollHeight = inputTextEl.nativeElement.scrollHeight;

        inputTextEl.nativeElement.value = 'primeng';
        inputTextEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(inputTextEl.nativeElement.scrollHeight).toBeGreaterThan(initialScrollHeight);
        const newScrollHeight = inputTextEl.nativeElement.scrollHeight;

        inputTextEl.nativeElement.value = 'primeng rocks!';
        inputTextEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(inputTextEl.nativeElement.scrollHeight).toBeGreaterThan(newScrollHeight);
        expect(onResizeSpy).toHaveBeenCalledTimes(2);
    });

    it('should increment height', () => {
        component.autoResize = true;
        fixture.detectChanges();

        const inputTextEl = fixture.debugElement.query(By.css('textarea'));
        let cachedHeight = parseInt(inputTextEl.nativeElement.style.height);
        inputTextEl.nativeElement.value = 'primeng';
        inputTextEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(parseInt(inputTextEl.nativeElement.style.height)).toBeGreaterThan(cachedHeight);
        expect(inputTextEl.nativeElement.style.overflow).toEqual('hidden');
    });

    it('should use resize with maxHeight', () => {
        component.autoResize = true;
        fixture.detectChanges();

        const inputTextEl = fixture.debugElement.query(By.css('textarea'));
        inputTextEl.nativeElement.style.maxHeight = 70 + 'px';
        fixture.detectChanges();

        inputTextEl.nativeElement.value = 'primeng rocks!';
        inputTextEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(inputTextEl.nativeElement.style.height).toEqual(inputTextEl.nativeElement.style.maxHeight);
        expect(inputTextEl.nativeElement.style.overflowY).toEqual('scroll');
    });
});
