import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputText } from './inputtext';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ApplicationRef, Component } from '@angular/core';

@Component({
    template: `<input id="input" type="text" pInputText> `
  })
  class TestInputTextComponent {
  }
  
describe('InputText', () => {
    let fixture: ComponentFixture<TestInputTextComponent>;

    beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            NoopAnimationsModule
        ],
        declarations: [
            InputText,
            TestInputTextComponent
        ]
    });

    fixture = TestBed.createComponent(TestInputTextComponent);
    });

    it('should display by default', () => {
        fixture.detectChanges();
  
        const inputEl = fixture.debugElement.query(By.css('input'));
        expect(inputEl.nativeElement).toBeTruthy();
        expect(inputEl.nativeElement.className).toContain("p-inputtext");
        expect(inputEl.nativeElement.className).toContain("p-component");

    });

    it('should call updateFilledState', () => {
        fixture.detectChanges();
  
        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.value = "primeng";
        inputEl.nativeElement.dispatchEvent(new Event("input"));
        fixture.detectChanges();

        expect(inputEl.nativeElement.className).toContain("p-filled");
    });

    it('should not run change detection on input events but should update filled state', () => {
        const appRef = TestBed.inject(ApplicationRef);
        const spy = spyOn(appRef, 'tick').and.callThrough();

        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.value = 'primeng-1';
        inputEl.nativeElement.dispatchEvent(new Event('input'));

        inputEl.nativeElement.value = 'primeng-2';
        inputEl.nativeElement.dispatchEvent(new Event('input'));

        expect(inputEl.nativeElement.className).toContain('p-filled');
        // We have manually run change detection only once through `fixture.detectChanges()`.
        // Previously, it would've been run 3 times because of the `HostListener` and 2 `dispatchEvent` calls.
        expect(spy.calls.count()).toEqual(1);

        inputEl.nativeElement.value = '';
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(inputEl.nativeElement.className).not.toContain('p-filled');
    });
});
