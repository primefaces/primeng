import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Checkbox } from './checkbox';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Checkbox', () => {

    let checkbox: Checkbox;
    let fixture: ComponentFixture<Checkbox>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                Checkbox
            ]
        });

        fixture = TestBed.createComponent(Checkbox);
        checkbox = fixture.componentInstance;
    });

    it('should check the input on click', () => {
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
        checkbox.style = {'primeng': 'rocks'};
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
        expect(containerEl.style.primeng).toContain('rocks');
    });

    it('should uncheck when twice click', () => {
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
});