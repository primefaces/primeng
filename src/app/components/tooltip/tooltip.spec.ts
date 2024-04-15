import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InputText } from '@alamote/primeng/inputtext';
import { Tooltip, TooltipModule } from './tooltip';

@Component({
    template: `
        <div style="margin:50px;">
            <input type="text" pInputText pTooltip="Enter your username" [positionStyle]="positionStyle" [appendTo]="appendTo" [tooltipDisabled]="disabled" [tooltipEvent]="event" [tooltipPosition]="position" />
        </div>
    `
})
class TestTooltipComponent {
    position: string = 'right';

    event: string = 'hover';

    positionStyle: string = 'absolute';

    disabled: boolean = false;

    appendTo: any = 'body';
}

describe('Tooltip', () => {
    let tooltip: Tooltip;
    let component: TestTooltipComponent;
    let fixture: ComponentFixture<TestTooltipComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, TooltipModule],
            declarations: [InputText, TestTooltipComponent]
        });

        fixture = TestBed.createComponent(TestTooltipComponent);
        tooltip = fixture.debugElement.children[0].componentInstance;
        component = fixture.componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const tooltipEl = fixture.debugElement.query(By.css('.p-tooltip'));
        expect(tooltipEl).toBeFalsy();
    });
});
