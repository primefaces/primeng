import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Checkbox } from './checkbox';
import { CheckIcon } from 'primeng/icons/check';

@Component({
    template: ` <p-checkbox [(ngModel)]="checked"> </p-checkbox> `
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
            imports: [NoopAnimationsModule, FormsModule, CheckIcon],
            declarations: [Checkbox, TestCheckboxComponent]
        });

        fixture = TestBed.createComponent(TestCheckboxComponent);
        testComponent = fixture.componentInstance;
        checkbox = fixture.debugElement.children[0].componentInstance;
    });

    it('should check the input on click', () => {
        checkbox.binary = true;
        fixture.detectChanges();

        const boxEl = fixture.nativeElement.querySelector('.p-checkbox-box');
        boxEl.click();
        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input');
        expect(input.checked).toBe(true);
    });

    it('should disabled', () => {
        checkbox.label = 'primeng';
        checkbox.disabled = true;
        checkbox.cd.detectChanges();

        const onClickSpy = spyOn(checkbox, 'onClick').and.callThrough();
        const boxEl = fixture.nativeElement.querySelector('.p-checkbox-box');
        const labelEl = fixture.nativeElement.querySelector('.p-checkbox-label');

        boxEl.click();
        checkbox.cd.detectChanges();

        const input = fixture.nativeElement.querySelector('input');
        expect(input.checked).toBe(false);
        expect(input.disabled).toEqual(true);
        expect(boxEl.className).toContain('p-disabled');
        expect(labelEl.className).toContain('p-disabled');
        expect(onClickSpy).toHaveBeenCalled();
        expect(checkbox.value).toEqual(undefined);
    });

    it('should get a label name inputId tabindex style styleClass and labelStyleClass', () => {
        checkbox.binary = true;
        checkbox.label = 'Primeng ROCKS!';
        checkbox.name = 'primeng';
        checkbox.inputId = 'primeng';
        checkbox.tabindex = 13;
        checkbox.style = { height: '300px' };
        checkbox.styleClass = 'Primeng Rocks!';
        checkbox.labelStyleClass = 'Primeng ROCKS';
        fixture.detectChanges();

        const boxEl = fixture.nativeElement.querySelector('.p-checkbox-box');
        const labelEl = fixture.nativeElement.querySelector('.p-checkbox-label');
        const containerEl = fixture.nativeElement.querySelector('div');
        boxEl.click();
        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input');
        expect(labelEl).toBeTruthy();
        expect(labelEl.className).toContain('Primeng ROCKS');
        expect(labelEl.className).toContain('p-checkbox-label-active');
        expect(input.name).toEqual('primeng');
        expect(input.id).toEqual('primeng');
        expect(input.tabIndex).toEqual(13);
        expect(containerEl.className).toContain('Primeng Rocks!');
        expect(containerEl.style.height).toContain('300px');
    });

    it('should uncheck when twice click', () => {
        fixture.detectChanges();

        const boxEl = fixture.nativeElement.querySelector('.p-checkbox-box');
        const onClickSpy = spyOn(checkbox, 'onClick').and.callThrough();
        boxEl.click();
        fixture.detectChanges();

        boxEl.click();
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector('input');
        expect(input.checked).toBe(false);
        expect(onClickSpy).toHaveBeenCalledTimes(2);
    });

    it('should check with binary', () => {
        checkbox.binary = true;
        fixture.detectChanges();

        const boxEl = fixture.nativeElement.querySelector('.p-checkbox-box');
        boxEl.click();
        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input');
        expect(input.checked).toBe(true);
    });

    it('should call onBlur and onFocus', () => {
        checkbox.label = 'primeng';
        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input');
        const boxEl = fixture.nativeElement.querySelector('.p-checkbox-box');
        const labelEl = fixture.nativeElement.querySelector('.p-checkbox-label');
        const onBlurSpy = spyOn(checkbox, 'onBlur').and.callThrough();
        const onFocusSpy = spyOn(checkbox, 'onFocus').and.callThrough();
        input.dispatchEvent(new Event('focus'));
        fixture.detectChanges();

        expect(onFocusSpy).toHaveBeenCalled();
        expect(checkbox.focused).toEqual(true);
        expect(boxEl.className).toContain('p-focus');
        expect(labelEl.className).toContain('p-checkbox-label-focus');
        input.dispatchEvent(new Event('blur'));
        fixture.detectChanges();

        expect(onBlurSpy).toHaveBeenCalled();
        expect(checkbox.focused).toEqual(false);
        expect(boxEl.className).not.toContain('p-focus');
        expect(labelEl.className).not.toContain('p-checkbox-label-focus');
    });

    it('should have default checkbox icon', () => {
        checkbox.binary = true;
        fixture.detectChanges();

        const boxEl = fixture.nativeElement.querySelector('.p-checkbox-box');
        boxEl.click();
        fixture.detectChanges();

        const iconEl = fixture.nativeElement.querySelector('.p-checkbox-box .p-checkbox-icon');
        expect(iconEl.parentElement.tagName.toLowerCase()).toEqual('checkicon');
    });

    it('should have custom checkbox icon', () => {
        checkbox.binary = true;
        fixture.detectChanges();

        const boxEl = fixture.nativeElement.querySelector('.p-checkbox-box');
        boxEl.click();
        checkbox.checkboxIcon = 'pi pi-new-check';
        fixture.detectChanges();

        const iconEl = fixture.nativeElement.querySelector('.p-checkbox-box .p-checkbox-icon');

        expect(iconEl.className).toContain('pi pi-new-check');
    });

});
