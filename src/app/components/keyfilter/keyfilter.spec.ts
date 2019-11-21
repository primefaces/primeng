import { TestBed, ComponentFixture, fakeAsync, tick, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { KeyFilter } from './keyfilter';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';

@Component({
    template: `<input type="text" [pValidateOnly]="validateOnly" [(ngModel)]="cc" pKeyFilter="int" pInputText placeholder="Integers">`
})
class TestKeyFilterComponent {
    type: string = "int";
    cc: any;
    validateOnly = false;
}

describe('KeyFilter', () => {
  
    let keyfilter: KeyFilter;
    let fixture: ComponentFixture<TestKeyFilterComponent>;
    let component: TestKeyFilterComponent;

    beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            NoopAnimationsModule,
            FormsModule
        ],
        declarations: [
            KeyFilter,
            TestKeyFilterComponent,
            InputText
        ]
    });

    fixture = TestBed.createComponent(TestKeyFilterComponent);
    keyfilter = fixture.debugElement.query(By.directive(KeyFilter)).injector.get(KeyFilter);
    component = fixture.componentInstance;
    });

    it('should created', () => {
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css("input"))).toBeTruthy();
    });

    it('should use keypress (string) and return false', () => {
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
		const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.keyCode = 100;
        keydownEvent.initEvent('keypress', true, true);
        const preventDefaultSpy = spyOn(keydownEvent,'preventDefault').and.callThrough();
        inputEl.dispatchEvent(keydownEvent as KeyboardEvent);
        fixture.detectChanges();

        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(keydownEvent.returnValue).toBeFalsy();
    });

    it('should use keypress (int) and return true', () => {
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
		const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.keyCode = 53;
        keydownEvent.initEvent('keypress', true, true);
        inputEl.dispatchEvent(keydownEvent as KeyboardEvent);
        inputEl.dispatchEvent(new KeyboardEvent("input",{'key':"s"}));
        fixture.detectChanges();
        expect(keydownEvent.returnValue).toBeTruthy();
    });

    it('should use keypress (enter) don\'n call prevenDefault', () => {
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
		const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.keyCode = 13;
        keydownEvent.initEvent('keypress', true, true);
        const preventDefaultSpy = spyOn(keydownEvent,'preventDefault').and.callThrough();
        inputEl.dispatchEvent(keydownEvent as KeyboardEvent);
        fixture.detectChanges();

        expect(preventDefaultSpy).not.toHaveBeenCalled();
        expect(keydownEvent.returnValue).toBeTruthy();
    });

    it('should recognize special and nav keys', () => {
        fixture.detectChanges();

		const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.keyCode = 13;
        keydownEvent.initEvent('keypress', true, true);
        fixture.detectChanges();

        let value = keyfilter.isSpecialKey(keydownEvent);
        expect(value).toBeTruthy();
        keydownEvent.keyCode = 38;
        value = keyfilter.isNavKeyPress(keydownEvent);
        expect(value).toBeTruthy();
        keydownEvent.keyCode = 49;
        value = keyfilter.isNavKeyPress(keydownEvent);
        expect(value).toBeFalsy();
        value = keyfilter.isSpecialKey(keydownEvent);
        expect(value).toBeFalsy();
    });

    it('should use pValidateOnly', () => {
        component.validateOnly = true;
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
		const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.keyCode = 13;
        keydownEvent.initEvent('keypress', true, true);
        const preventDefaultSpy = spyOn(keydownEvent,'preventDefault').and.callThrough();
        inputEl.dispatchEvent(keydownEvent as KeyboardEvent);
        fixture.detectChanges();

        expect(preventDefaultSpy).not.toHaveBeenCalled();
        expect(keydownEvent.returnValue).toBeTruthy();
    });

    it('should use metaKey and don\'n call preventDefault', () => {
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
		const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.keyCode = 53;
        keydownEvent.ctrlKey = true;
        keydownEvent.initEvent('keypress', true, true);
        const preventDefaultSpy = spyOn(keydownEvent,'preventDefault').and.callThrough();
        inputEl.dispatchEvent(keydownEvent as KeyboardEvent);
        fixture.detectChanges();

        expect(preventDefaultSpy).not.toHaveBeenCalled();
        expect(keydownEvent.returnValue).toBeTruthy();
    });

    it('should use paste', () => {
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
		const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.clipboardData = {
            getData:(type) => {
                return "53";
            }
        }
        keydownEvent.initEvent('paste', true, true);
        const preventDefaultSpy = spyOn(keydownEvent,'preventDefault').and.callThrough();
        inputEl.dispatchEvent(keydownEvent);
        fixture.detectChanges();

        expect(preventDefaultSpy).not.toHaveBeenCalled();
        expect(keydownEvent.returnValue).toBeTruthy();
    });

    it('should use paste and keyfilter cancel the paste event', () => {
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
		const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.initEvent('paste', true, true);
        keydownEvent.clipboardData = {
            getData:(type) => {
                return "pasteevent";
            }
        }
        const preventDefaultSpy = spyOn(keydownEvent,'preventDefault').and.callThrough();
        inputEl.dispatchEvent(keydownEvent);
        fixture.detectChanges();

        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(keydownEvent.returnValue).toBeFalsy();
    });
    
    it('should use input (mocking android)', () => {
        fixture.detectChanges();

        keyfilter.isAndroid = true;
        keyfilter.el.nativeElement.value = "PrimeNG";
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
		const inputEvent: any = document.createEvent('CustomEvent');
        
        inputEvent.initEvent('input', true, true);
        inputEl.dispatchEvent(inputEvent);
        fixture.detectChanges();

        expect(keyfilter.el.nativeElement.value).not.toContain("PrimeNG");
        keyfilter.el.nativeElement.value = "3507";
        inputEl.dispatchEvent(inputEvent);
        fixture.detectChanges();

        keyfilter.el.nativeElement.value = "35a07";
        inputEl.dispatchEvent(inputEvent);
        fixture.detectChanges();

        expect(keyfilter.el.nativeElement.value).toContain("3507");
    });
});
