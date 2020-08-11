import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Password } from './password';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';

@Component({
    template: `<input pPassword type="password"/>`
})
class TestPasswordComponent {
}

describe('Password', () => {

    let password: TestPasswordComponent;
    let fixture: ComponentFixture<TestPasswordComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                Password,
                TestPasswordComponent
            ]
        });

        fixture = TestBed.createComponent(TestPasswordComponent);
        password = fixture.componentInstance;
    });

    it('should created', () => {
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css("input"))).toBeTruthy();
    });

    it('should create panel', fakeAsync(() => {
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.triggerEventHandler('focus',null);
        tick(300);
        fixture.detectChanges();

        const panelEl = document.getElementsByClassName('p-password-panel')[0];
        expect(panelEl).toBeTruthy();
    }));

    it('should close panel', fakeAsync(() => {
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.triggerEventHandler('focus',null);
        tick(300);
        fixture.detectChanges();

        let panelEl = document.getElementsByClassName('p-password-panel')[0];
        expect(panelEl).toBeTruthy();
        inputEl.triggerEventHandler('blur',null);
        tick(300);
        fixture.detectChanges();

        panelEl = document.getElementsByClassName('p-password-panel')[0];
        expect(panelEl).toEqual(undefined);
    }));

    it('should show warning', fakeAsync(() => {
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.triggerEventHandler('focus',null);
        tick(300);
        fixture.detectChanges();

        inputEl.triggerEventHandler('keyup',{'target':{'value':''}});
        const panelEl = document.getElementsByClassName('p-password-panel')[0];
        expect(panelEl.children[1].textContent).toEqual("Enter a password");
    }));

    it('should be weak', fakeAsync(() => {
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.triggerEventHandler('focus',null);
        tick(300);
        fixture.detectChanges();

        inputEl.triggerEventHandler('keyup',{'target':{'value':'t'}});
        const panelEl = document.getElementsByClassName('p-password-panel')[0];
        expect(panelEl.children[1].textContent).toEqual("Weak");
    }));

    it('should be medium', fakeAsync(() => {
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.triggerEventHandler('focus',null);
        tick(300);
        fixture.detectChanges();

        inputEl.triggerEventHandler('keyup',{'target':{'value':'t23et23'}});
        const panelEl = document.getElementsByClassName('p-password-panel')[0];
        expect(panelEl.children[1].textContent).toEqual("Medium");
    }));

    it('should be strong', fakeAsync(() => {
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.triggerEventHandler('focus',null);
        tick(300);
        fixture.detectChanges();

        inputEl.triggerEventHandler('keyup',{'target':{'value':'t23eaviciit2with3out4you'}});
        const panelEl = document.getElementsByClassName('p-password-panel')[0];
        expect(panelEl.children[1].textContent).toEqual("Strong");
    }));
});
