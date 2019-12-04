import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Checkbox } from './checkbox';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
    template: `
        <p-checkbox [(ngModel)]="checked">
    `
})
    class TestCheckboxComponent {
        checked: boolean = false;
    }
  
describe('Checkbox', () => {

    let checkbox: Checkbox;
    let testComponent: TestCheckboxComponent;
    let fixture: ComponentFixture<TestCheckboxComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                FormsModule
            ],
            declarations: [
                Checkbox,
                TestCheckboxComponent
            ]
        });

        fixture = TestBed.createComponent(TestCheckboxComponent);
        testComponent = fixture.componentInstance;
        checkbox = fixture.debugElement.children[0].componentInstance;
    });

    it('should check the input on click', () => {
        fixture.detectChanges();
        
        const boxEl = fixture.nativeElement.querySelector('.ui-chkbox-box');
        boxEl.click();
        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input');
        expect(input.checked).toBe(true);
    });

    it('should disabled', () => {
        checkbox.disabled = true;
        checkbox.label = "primeng"
        fixture.detectChanges();

        const onClickSpy = spyOn(checkbox,'onClick').and.callThrough();
        const boxEl = fixture.nativeElement.querySelector('.ui-chkbox-box');
        const labelEl = fixture.nativeElement.querySelector('.ui-chkbox-label');
        boxEl.click();
        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input');
        expect(input.checked).toBe(false);
        expect(input.disabled).toEqual(true);
        expect(boxEl.className).toContain('ui-state-disabled');
        expect(labelEl.className).toContain('ui-label-disabled');
        expect(onClickSpy).toHaveBeenCalled();
        expect(checkbox.value).toEqual(undefined);
    });

    it('should get a label name inputId tabindex style styleClass and labelStyleClass', () => {
        checkbox.label = "Primeng ROCKS!";
        checkbox.name = "primeng";
        checkbox.inputId = "primeng";
        checkbox.tabindex = 13;
        checkbox.style = {'height': '300px'};
        checkbox.styleClass = "Primeng Rocks!";
        checkbox.labelStyleClass = "Primeng ROCKS";
        fixture.detectChanges();

        const boxEl = fixture.nativeElement.querySelector('.ui-chkbox-box');
        const labelEl = fixture.nativeElement.querySelector('.ui-chkbox-label');
        const containerEl = fixture.nativeElement.querySelector('div');
        boxEl.click();
        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input');
        expect(labelEl).toBeTruthy();
        expect(labelEl.className).toContain("Primeng ROCKS");
        expect(labelEl.className).toContain("ui-label-active");
        expect(input.name).toEqual("primeng");
        expect(input.id).toEqual("primeng");
        expect(input.tabIndex).toEqual(13);
        expect(containerEl.className).toContain('Primeng Rocks!');
        expect(containerEl.style.height).toContain('300px');
    });

    it('should uncheck when twice click', () => {
        fixture.detectChanges();

        const boxEl = fixture.nativeElement.querySelector('.ui-chkbox-box');
        const onClickSpy = spyOn(checkbox,'onClick').and.callThrough();
        boxEl.click();
        fixture.detectChanges();

        boxEl.click();
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector('input');
        expect(input.checked).toBe(false);
        expect(onClickSpy).toHaveBeenCalledTimes(2);
    });

    it('should check with binary', () => {
        checkbox.binary = "true";
        fixture.detectChanges();

        const boxEl = fixture.nativeElement.querySelector('.ui-chkbox-box');
        boxEl.click();
        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input');
        expect(input.checked).toBe(true);
    });

    it('should call onBlur and onFocus', () => {
        checkbox.label = "primeng";
        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input');
        const boxEl = fixture.nativeElement.querySelector('.ui-chkbox-box');
        const labelEl = fixture.nativeElement.querySelector('.ui-chkbox-label');
        const onBlurSpy = spyOn(checkbox,'onBlur').and.callThrough();
        const onFocusSpy = spyOn(checkbox,'onFocus').and.callThrough();
        input.dispatchEvent(new Event('focus'));
        fixture.detectChanges();

        expect(onFocusSpy).toHaveBeenCalled();
        expect(checkbox.focused).toEqual(true);
        expect(input.className).toContain('ui-state-focus');
        expect(boxEl.className).toContain('ui-state-focus');
        expect(labelEl.className).toContain('ui-label-focus');
        input.dispatchEvent(new Event('blur'));
        fixture.detectChanges();

        expect(onBlurSpy).toHaveBeenCalled();
        expect(checkbox.focused).toEqual(false);
        expect(input.className).not.toContain('ui-state-focus');
        expect(boxEl.className).not.toContain('ui-state-focus');
        expect(labelEl.className).not.toContain('ui-label-focus');
    });

    it('should have default checkbox icon', () => {
        fixture.detectChanges();

        const boxEl = fixture.nativeElement.querySelector('.ui-chkbox-box');
        boxEl.click();
        fixture.detectChanges();

        const iconEl = fixture.nativeElement.querySelector('.ui-chkbox-box .ui-chkbox-icon');

        expect(iconEl.className).toContain('pi pi-check');
    });

    it('should have custom checkbox icon', () => {
        fixture.detectChanges();

        const boxEl = fixture.nativeElement.querySelector('.ui-chkbox-box');
        boxEl.click();
        checkbox.checkboxIcon = 'pi pi-new-check';
        fixture.detectChanges();

        const iconEl = fixture.nativeElement.querySelector('.ui-chkbox-box .ui-chkbox-icon');

        expect(iconEl.className).toContain('pi pi-new-check');
    });

    it('should call handleChange', () => {
        fixture.detectChanges();
        
        checkbox.binary = "true";
        const handleChangeSpy = spyOn(checkbox,"handleChange").and.callThrough();
        const input = fixture.nativeElement.querySelector('input');
        input.dispatchEvent(new Event('change'));
        fixture.detectChanges();

        expect(handleChangeSpy).toHaveBeenCalled();
    });
});
