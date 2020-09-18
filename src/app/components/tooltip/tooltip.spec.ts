import { TestBed, ComponentFixture } from '@angular/core/testing';
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
    position = 'right';

    event = 'hover';

    positionStyle = 'absolute';

    disabled = false;

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
});
