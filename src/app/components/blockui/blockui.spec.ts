import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BlockUI } from './blockui';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { Panel } from '../panel/panel';

@Component({
    template: `
    <p-blockUI></p-blockUI>
    <p-blockUI [target]="pnl">
    </p-blockUI>
    <p-panel #pnl header="Godfather I" [style]="{'margin-top':'20px'}">
    </p-panel>  
    `
  })
  class TestBlockUIComponent {
  }
  
describe('BlockUI', () => {
  
    let blockui: BlockUI;
    let blockui2: BlockUI;
    let fixture: ComponentFixture<TestBlockUIComponent>;

    beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
        NoopAnimationsModule
        ],
        declarations: [
        BlockUI,
        TestBlockUIComponent,
        Panel
        ]
    });

    fixture = TestBed.createComponent(TestBlockUIComponent);
    blockui = fixture.debugElement.children[0].componentInstance;
    blockui2 = fixture.debugElement.children[1].componentInstance;
    });

    it('should display by default', () => {
        blockui.blocked = false;
        fixture.detectChanges();
  
        const blockEl = fixture.debugElement.query(By.css('div'));
        expect(blockEl.nativeElement).toBeTruthy();
    });

    it('should block body', () => {
        blockui.blocked = false;
        fixture.detectChanges();
        
        const blockSpy = spyOn(blockui,'block').and.callThrough();
        blockui.blocked = true;
        fixture.detectChanges();
        
        expect(blockSpy).toHaveBeenCalled();
    });

    it('should unblock body', () => {
        blockui.blocked = false;
        fixture.detectChanges();
        
        const unBlockSpy = spyOn(blockui,'unblock').and.callThrough();
        blockui.blocked = true;
        fixture.detectChanges();

        blockui.blocked = false;
        fixture.detectChanges();
        
        expect(unBlockSpy).toHaveBeenCalled();
    });

    it('should block element with target', () => {
        blockui2.blocked = false;
        fixture.detectChanges();
        
        const blockSpy = spyOn(blockui2,'block').and.callThrough();
        blockui2.blocked = true;
        fixture.detectChanges();
        
        expect(blockSpy).toHaveBeenCalled();
        expect(blockui2.target.style.position).toEqual("relative");
    });
});
