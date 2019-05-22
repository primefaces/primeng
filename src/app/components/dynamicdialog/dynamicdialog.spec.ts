import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicDialogModule } from './dynamicdialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, NgModule } from '@angular/core';
import { Footer } from '../common/shared';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from '../common/api';
import { CommonModule } from '@angular/common';


@Component({
    template: `
        <h2>
            PrimeNG ROCKS!
        </h2>
    `
  })
export class TestComponent {
    constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

}


@Component({
    template: `
    <div class="TestDynamicDialog">
    </div>
    `
  })
export class TestDynamicDialogComponent {
    constructor(public dialogService: DialogService) {}

    show() {
        const ref = this.dialogService.open(TestComponent, {
            header: 'Demo Header',
            width: '70%',
            contentStyle: {"max-height": "350px", "overflow": "auto"},
            dismissableMask:true
        });

        ref.onClose.subscribe((car: any) =>{
            if (car) {
            }
        });
    }
}
@NgModule({
    imports: [CommonModule,DynamicDialogModule],
    declarations: [
        TestComponent,
        TestDynamicDialogComponent
    ],
    entryComponents: [TestComponent],
    exports:[TestComponent],
    providers:[DialogService]
  })
  export class FakeTestDialogModule {}


describe('DynamicDialog', () => {
    
    let fixture: ComponentFixture<TestDynamicDialogComponent>;
    let testDynamicDialogComponent: TestDynamicDialogComponent;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                FakeTestDialogModule    
            ],
            declarations: [
                Footer,
            ],
        })
        fixture = TestBed.createComponent(TestDynamicDialogComponent);
        testDynamicDialogComponent = fixture.debugElement.componentInstance;
    });

    it('should open dialog and close dialog', fakeAsync(() => {
        fixture.detectChanges();
  
        testDynamicDialogComponent.show();
        fixture.detectChanges();
        
        tick(300);
        let dynamicDialogEl = document.getElementsByClassName("ui-dynamicdialog")[0];
        expect(dynamicDialogEl).toBeTruthy();
        const titleEl = dynamicDialogEl.getElementsByClassName("ui-dialog-title")[0];
        const testComponentHeader = dynamicDialogEl.getElementsByTagName("h2")[0];
        expect(titleEl.textContent).toEqual("Demo Header");
        expect(testComponentHeader.textContent).toEqual(" PrimeNG ROCKS! ");
        let dynamicDialogTitlebarIconEl = document.querySelector(".ui-dialog-titlebar-icon") as HTMLElement;
        dynamicDialogTitlebarIconEl.click();
        tick(300);
        fixture.detectChanges();

        dynamicDialogEl = document.getElementsByClassName("ui-dynamicdialog")[0];
        expect(dynamicDialogEl).toBeUndefined();
    }));

    it('should close dialog with esc key', fakeAsync(() => {
        fixture.detectChanges();
  
        testDynamicDialogComponent.show();
        fixture.detectChanges();
        
        tick(300);
        let dynamicDialogEl = document.getElementsByClassName("ui-dynamicdialog")[0];
        expect(dynamicDialogEl).toBeTruthy();
        const titleEl = dynamicDialogEl.getElementsByClassName("ui-dialog-title")[0];
        const testComponentHeader = dynamicDialogEl.getElementsByTagName("h2")[0];
        expect(titleEl.textContent).toEqual("Demo Header");
        expect(testComponentHeader.textContent).toEqual(" PrimeNG ROCKS! ");
        const escapeEvent: any = document.createEvent('CustomEvent');
        escapeEvent.which = 27;
        escapeEvent.initEvent('keydown', true, true);
        document.dispatchEvent(escapeEvent);
        tick(300);
        fixture.detectChanges();

        dynamicDialogEl = document.getElementsByClassName("ui-dynamicdialog")[0];
        expect(dynamicDialogEl).toBeUndefined();
    }));

    it('should close dialog with mask click', fakeAsync(() => {
        fixture.detectChanges();
  
        testDynamicDialogComponent.show();
        fixture.detectChanges();
        
        tick(300);
        let dynamicDialogEl = document.getElementsByClassName("ui-dynamicdialog")[0];
        expect(dynamicDialogEl).toBeTruthy();
        const titleEl = dynamicDialogEl.getElementsByClassName("ui-dialog-title")[0];
        const testComponentHeader = dynamicDialogEl.getElementsByTagName("h2")[0];
        expect(titleEl.textContent).toEqual("Demo Header");
        expect(testComponentHeader.textContent).toEqual(" PrimeNG ROCKS! ");
        let maskEl = document.querySelector(".ui-dialog-mask") as HTMLElement;
        maskEl.click();
        tick(300);
        fixture.detectChanges();

        dynamicDialogEl = document.getElementsByClassName("ui-dynamicdialog")[0];
        expect(dynamicDialogEl).toBeUndefined();
    }));
});
