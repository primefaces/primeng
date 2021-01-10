import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ColorPicker } from './colorpicker';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
        template: `
            <p-colorPicker [(ngModel)]="color1"></p-colorPicker>
        `
    })
    class TestColorPickerComponent {
        color1:string = '#1976D2';
    }

describe('ColorPicker', () => {

    let colorpicker: ColorPicker;
    let testComponent: TestColorPickerComponent;
    let fixture: ComponentFixture<TestColorPickerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                FormsModule
            ],
            declarations: [
                ColorPicker,
                TestColorPickerComponent
            ]
        });

        fixture = TestBed.createComponent(TestColorPickerComponent);
        colorpicker = fixture.debugElement.children[0].componentInstance;
        testComponent = fixture.componentInstance;
    });

    it('should created by default', () => {
        fixture.detectChanges();
  
        const colorPickerEl = fixture.debugElement.query(By.css('.p-colorpicker'));
        expect(colorPickerEl.nativeElement).toBeTruthy();
    });

    it('should inline', () => {
        colorpicker.inline = true;
        fixture.detectChanges();
  
        const overlayEl = fixture.debugElement.query(By.css('.p-colorpicker-overlay'));
        expect(overlayEl).toBeFalsy();
    });

    it('should select color', () => {
        colorpicker.inline = true;
        fixture.detectChanges();
  
        const pickColorSpy = spyOn(colorpicker,"pickColor").and.callThrough();
        const colorSelectorEl = fixture.debugElement.query(By.css('.p-colorpicker-color-selector'));
        colorSelectorEl.triggerEventHandler("mousedown",{pageX:100,pageY:120});
        fixture.detectChanges();

        document.dispatchEvent(new Event("mouseup"));
        fixture.detectChanges();

        expect(testComponent.color1).not.toEqual("#1976D2");
        expect(pickColorSpy).toHaveBeenCalled();
    });

    it('should select hue', () => {
        colorpicker.inline = true;
        fixture.detectChanges();
  
        const pickHueSpy = spyOn(colorpicker,"pickHue").and.callThrough();
        const hueSelectorEl = fixture.debugElement.query(By.css('.p-colorpicker-hue'));
        hueSelectorEl.triggerEventHandler("mousedown",{pageX:20,pageY:25});
        fixture.detectChanges();

        expect(testComponent.color1).not.toEqual("#1976D2");
        expect(pickHueSpy).toHaveBeenCalled();
    });

    it('should call togglePanel when click on input', () => {
        fixture.detectChanges();
  
        const inputEl = fixture.debugElement.query(By.css('.p-inputtext'));
        const toggleSpy = spyOn(colorpicker,"togglePanel").and.callThrough();
        inputEl.nativeElement.dispatchEvent(new Event("focus"));
        inputEl.nativeElement.click();
        fixture.detectChanges();

        const selectorEl = fixture.debugElement.query(By.css(".p-colorpicker-panel"));
        expect(toggleSpy).toHaveBeenCalled();
        expect(selectorEl).toBeTruthy();
    });

    it('should select color (overlay)', () => {
        colorpicker.appendTo = "body";
        fixture.detectChanges();
  
        const inputEl = fixture.debugElement.query(By.css('.p-inputtext'));
        inputEl.nativeElement.dispatchEvent(new Event("focus"));
        inputEl.nativeElement.click();
        fixture.detectChanges();

        const pickColorSpy = spyOn(colorpicker,"pickColor").and.callThrough();
        const colorSelectorEl = fixture.debugElement.query(By.css('.p-colorpicker-color-selector'));
        colorSelectorEl.nativeElement.click();
        colorSelectorEl.triggerEventHandler("mousedown",{pageX:100,pageY:120});
        const mouseMoveEvent: any = document.createEvent('CustomEvent');
        mouseMoveEvent.pageX = 101;
        mouseMoveEvent.pageY = 121;
        mouseMoveEvent.initEvent('mousemove', true, true);
        document.dispatchEvent(mouseMoveEvent);
        document.dispatchEvent(mouseMoveEvent as MouseEvent);
        fixture.detectChanges();

        document.dispatchEvent(new Event("mouseup"));
        fixture.detectChanges();

        expect(testComponent.color1).not.toEqual("#1976D2");
        expect(pickColorSpy).toHaveBeenCalled();
    });

    it('should close when inputclick', () => {
        fixture.detectChanges();
  
        const hideSpy = spyOn(colorpicker,"hide").and.callThrough();
        const inputEl = fixture.debugElement.query(By.css('.p-inputtext'));
        inputEl.nativeElement.dispatchEvent(new Event("focus"));
        inputEl.nativeElement.click();
        fixture.detectChanges();

        let selectorEl = fixture.debugElement.query(By.css(".p-colorpicker-panel"));
        expect(selectorEl).toBeTruthy();
        inputEl.nativeElement.click();
        fixture.detectChanges();

        selectorEl = fixture.debugElement.query(By.css(".p-colorpicker-panel"));
        expect(hideSpy).toHaveBeenCalled();
    });

    it('should open space keydown and close esc keydown', () => {
        fixture.detectChanges();
  
        const hideSpy = spyOn(colorpicker,"hide").and.callThrough();
        const inputEl = fixture.debugElement.query(By.css('.p-inputtext'));
        const openEvent: any = document.createEvent('CustomEvent');
        openEvent.which = 32;
        openEvent.initEvent('keydown', true, true);
        inputEl.nativeElement.dispatchEvent(openEvent);
        fixture.detectChanges();

        let selectorEl = fixture.debugElement.query(By.css(".p-colorpicker-panel"));
        expect(selectorEl).toBeTruthy();
        const escapeEvent: any = document.createEvent('CustomEvent');
        escapeEvent.which = 27;
        escapeEvent.initEvent('keydown', true, true);
        inputEl.nativeElement.dispatchEvent(escapeEvent);
        fixture.detectChanges();

        selectorEl = fixture.debugElement.query(By.css(".p-colorpicker-panel"));
        expect(hideSpy).toHaveBeenCalled();
    });
});
