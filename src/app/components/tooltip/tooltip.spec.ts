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
});