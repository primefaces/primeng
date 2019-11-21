import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Tooltip } from './tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { InputText } from 'primeng/inputtext';

@Component({
    template: `
        <div style="margin:50px;">
            <input type="text" pInputText pTooltip="Enter your username" [positionStyle]="positionStyle" [appendTo]="appendTo" [tooltipDisabled]="disabled" [tooltipEvent]="event" [tooltipPosition]="position"> 
        </div>
        `
})
class TestTooltipComponent {
    position: string ="right";

    event: string = "hover";
    
    positionStyle: string = "absolute";
    
    disabled: boolean = false;

    appendTo: any = 'body';
}

describe('Tooltip', () => {

    let tooltip: Tooltip;
    let component: TestTooltipComponent;
    let fixture: ComponentFixture<TestTooltipComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                Tooltip,
                InputText,
                TestTooltipComponent
            ]
        });

        fixture = TestBed.createComponent(TestTooltipComponent);
        tooltip = fixture.debugElement.children[0].componentInstance;
        component = fixture.componentInstance;
    });

    it('should created', () => {
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css("input"))).toBeTruthy();
    });

    it('should create tooltip on right', () => {
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event("mouseenter"));
        fixture.detectChanges();

        const panelEl = document.getElementsByClassName('ui-tooltip-right')[0];
        expect(panelEl).toBeTruthy();
    });

    it('should create tooltip on left (out of bounds and its gonna be on the right)', () => {
        fixture.detectChanges();

        component.position = 'left';
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event("mouseenter"));
        fixture.detectChanges();

        const panelEl = document.getElementsByClassName('ui-tooltip-right')[0];
        expect(panelEl).toBeTruthy();
    });

    it('should create tooltip on top', () => {
        fixture.detectChanges();

        component.position = 'top';
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event("mouseenter"));
        fixture.detectChanges();

        const panelEl = document.getElementsByClassName('ui-tooltip-top')[0];
        expect(panelEl).toBeTruthy();
    });

    it('should create tooltip on bottom', () => {
        fixture.detectChanges();

        component.position = 'bottom';
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event("mouseenter"));
        fixture.detectChanges();

        const panelEl = document.getElementsByClassName('ui-tooltip-bottom')[0];
        expect(panelEl).toBeTruthy();
    });

    it('should hide tooltip when mouseleave', () => {
        fixture.detectChanges();

        component.appendTo = 'target';
        component.position = 'bottom';
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event("mouseenter"));
        fixture.detectChanges();

        let panelEl = document.getElementsByClassName('ui-tooltip-bottom')[0];
        expect(panelEl).toBeTruthy();
        inputEl.nativeElement.dispatchEvent(new Event("mouseleave"));
        fixture.detectChanges();

        panelEl = document.getElementsByClassName('ui-tooltip-bottom')[0];
        expect(panelEl).toBeFalsy();
    });

    it('should hide tooltip when click', () => {
        fixture.detectChanges();

        component.position = 'bottom';
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event("mouseenter"));
        fixture.detectChanges();

        let panelEl = document.getElementsByClassName('ui-tooltip-bottom')[0];
        expect(panelEl).toBeTruthy();
        inputEl.nativeElement.dispatchEvent(new Event("click"));
        fixture.detectChanges();

        panelEl = document.getElementsByClassName('ui-tooltip-bottom')[0];
        expect(panelEl).toBeFalsy();
    });

    it('should create panel when focus', () => {
        component.event = "focus";
        fixture.detectChanges();

        component.position = 'bottom';
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event("focus"));
        fixture.detectChanges();

        let panelEl = document.getElementsByClassName('ui-tooltip-bottom')[0];
        expect(panelEl).toBeTruthy();
    });

    it('should hide panel when blur', () => {
        component.event = "focus";
        fixture.detectChanges();

        component.position = 'bottom';
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event("focus"));
        fixture.detectChanges();

        let panelEl = document.getElementsByClassName('ui-tooltip-bottom')[0];
        expect(panelEl).toBeTruthy();
        inputEl.nativeElement.dispatchEvent(new Event("blur"));
        fixture.detectChanges();

        panelEl = document.getElementsByClassName('ui-tooltip-bottom')[0];
        expect(panelEl).toBeFalsy();
    });

    it('shouldn\'t show panel when disabled', () => {
        component.event = "focus";
        component.disabled = true;
        fixture.detectChanges();

        component.position = 'bottom';
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event("focus"));
        fixture.detectChanges();

        let panelEl = document.getElementsByClassName('ui-tooltip-bottom')[0];
        expect(panelEl).toBeFalsy();
    });

    it('should hide panel when resize', () => {
        component.event = "focus";
        fixture.detectChanges();

        component.position = 'bottom';
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event("focus"));
        fixture.detectChanges();

        let panelEl = document.getElementsByClassName('ui-tooltip-bottom')[0];
        expect(panelEl).toBeTruthy();
        window.dispatchEvent(new Event("resize"));
        fixture.detectChanges();

        panelEl = document.getElementsByClassName('ui-tooltip-bottom')[0];
        expect(panelEl).toBeFalsy();
    });
});
