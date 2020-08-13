import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RadioButton } from './radiobutton';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RadioButton', () => {

    let radiobutton: RadioButton;
    let fixture: ComponentFixture<RadioButton>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                RadioButton
            ]
        });

        fixture = TestBed.createComponent(RadioButton);
        radiobutton = fixture.componentInstance;
    });

    it('should change name inputId value style styleClass label labelStyleClass and tabIndex', () => {
        radiobutton.name = "primeng";
        radiobutton.inputId = "prime"
        radiobutton.value = "Primeng";
        radiobutton.style = {'height': '300px'};
        radiobutton.styleClass = "Primeng ROCKS!";
        radiobutton.label = "Prime";
        radiobutton.labelStyleClass = "Primeng ROCKS";
        radiobutton.tabindex = 13;
        fixture.detectChanges();

        const radiobuttonEl = fixture.debugElement.query(By.css('div'));
        const inputEl = fixture.debugElement.query(By.css('input'));
        const labelEl = fixture.debugElement.query(By.css('label'));
        expect(inputEl.nativeElement.name).toEqual("primeng");
        expect(inputEl.nativeElement.value).toEqual("Primeng");
        expect(inputEl.nativeElement.id).toEqual("prime");
        expect(inputEl.nativeElement.tabIndex).toEqual(13);
        expect(radiobuttonEl.nativeElement.className).toContain("Primeng ROCKS!");
        expect(radiobuttonEl.nativeElement.style.height).toEqual("300px");
        expect(labelEl.nativeElement.className).toContain("Primeng ROCKS");
        expect(labelEl.nativeElement.textContent).toEqual("Prime");
        expect(labelEl.nativeElement.htmlFor).toEqual("prime");
    });

    it('should display active state initially when checked by default', () => {
        fixture.detectChanges();

        radiobutton.checked = true;
        radiobutton.inputViewChild.nativeElement.checked=true;
        fixture.detectChanges();

        radiobutton.cd.detectChanges();
        const boxEl = fixture.nativeElement.querySelector('.p-radiobutton-box');
        expect(boxEl.className).toContain('p-highlight');
    });

    it('should disabled', () => {
        radiobutton.disabled = true;
        radiobutton.label = "prime"
        fixture.detectChanges();

        const handleClickSpy = spyOn(radiobutton,'handleClick').and.callThrough();
        const selectSpy = spyOn(radiobutton,'select').and.callThrough();
        const radiobuttonEl = fixture.debugElement.queryAll(By.css('div'))[2];
        const inputEl = fixture.debugElement.query(By.css('input'));
        const labelEl = fixture.debugElement.query(By.css('label'));
        expect(inputEl.nativeElement.disabled).toEqual(true);
        expect(radiobuttonEl.nativeElement.className).toContain("p-disabled");
        expect(labelEl.nativeElement.className).toContain("p-disabled");

        radiobuttonEl.nativeElement.click();
        fixture.detectChanges();

        expect(handleClickSpy).toHaveBeenCalled();
        expect(selectSpy).not.toHaveBeenCalled();
        expect(radiobutton.checked).toEqual(undefined);
        labelEl.nativeElement.click();
        fixture.detectChanges();

        expect(handleClickSpy).toHaveBeenCalledTimes(1);
        expect(selectSpy).toHaveBeenCalled();
        expect(radiobutton.checked).toEqual(undefined);
    });

    it('should click checkbox', () => {
        fixture.detectChanges();
        
        let value;
        radiobutton.onClick.subscribe(event => value = 5);
        const handleClickSpy = spyOn(radiobutton,'handleClick').and.callThrough();
        const selectSpy = spyOn(radiobutton,'select').and.callThrough();
        const onFocusSpy = spyOn(radiobutton,'onInputFocus').and.callThrough();
        const radiobuttonEl = fixture.debugElement.queryAll(By.css('div'))[2];
        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        radiobuttonEl.nativeElement.click();
        fixture.detectChanges();

        expect(handleClickSpy).toHaveBeenCalled();
        expect(selectSpy).toHaveBeenCalled();
        expect(onFocusSpy).toHaveBeenCalled();
        expect(radiobutton.checked).toEqual(true);
        expect(value).toEqual(5);
        expect(radiobutton.focused).toEqual(true);
        expect(radiobuttonEl.nativeElement.className).toContain("p-focus");
    });

    it('should click label', () => {
        radiobutton.label = "prime"
        fixture.detectChanges();
        
        let value;
        radiobutton.onClick.subscribe(event => value = 5);
        const handleClickSpy = spyOn(radiobutton,'handleClick').and.callThrough();
        const selectSpy = spyOn(radiobutton,'select').and.callThrough();
        const onFocusSpy = spyOn(radiobutton,'onInputFocus').and.callThrough();
        const onBlurSpy = spyOn(radiobutton,'onInputBlur').and.callThrough();
        const inputEl = fixture.debugElement.query(By.css('input'));
        const labelEl = fixture.debugElement.query(By.css('label'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        labelEl.nativeElement.click();
        fixture.detectChanges();

        expect(handleClickSpy).not.toHaveBeenCalled();
        expect(selectSpy).toHaveBeenCalled();
        expect(onFocusSpy).toHaveBeenCalled();
        expect(radiobutton.checked).toEqual(true);
        expect(labelEl.nativeElement.className).toContain("p-radiobutton-label-focus");
        expect(value).toEqual(5);
        inputEl.nativeElement.dispatchEvent(new Event('blur'));
        fixture.detectChanges();

        expect(radiobutton.focused).toEqual(false);
        expect(onBlurSpy).toHaveBeenCalled();
    });

    it('should call writeValue', () => {
        radiobutton.label = "prime";
        radiobutton.value = "prime";
        fixture.detectChanges();
        
        const writeValueSpy = spyOn(radiobutton,'writeValue').and.callThrough();
        radiobutton.writeValue("prime");
        fixture.detectChanges();
        
        expect(writeValueSpy).toHaveBeenCalled();
        expect(radiobutton.checked).toEqual(true);
    });
});
