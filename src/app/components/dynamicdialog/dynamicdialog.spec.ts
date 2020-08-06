import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { DynamicDialogModule } from './dynamicdialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, NgModule } from '@angular/core';
import { Footer } from 'primeng/api';
import { DialogService } from './dialogservice';
import { DynamicDialogRef} from './dynamicdialog-ref';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';


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
        this.dialogService.open(TestComponent, {
            header: 'Demo Header',
            width: '70%',
            contentStyle: {"max-height": "350px", "overflow": "auto"},
            dismissableMask:true,
            baseZIndex: 0
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
        let dynamicDialogEl = document.getElementsByClassName("p-dialog")[0];
        expect(dynamicDialogEl).toBeTruthy();
        const titleEl = dynamicDialogEl.getElementsByClassName("p-dialog-title")[0];
        const testComponentHeader = dynamicDialogEl.getElementsByTagName("h2")[0];
        expect(titleEl.textContent).toEqual("Demo Header");
        expect(testComponentHeader.textContent).toEqual(" PrimeNG ROCKS! ");
        let dynamicDialogTitlebarIconEl = document.querySelector(".p-dialog-header-icon") as HTMLElement;
        dynamicDialogTitlebarIconEl.click();
        fixture.detectChanges();
        tick(700);

        dynamicDialogEl = document.getElementsByClassName("p-dialog")[0];
        expect(dynamicDialogEl).toBeUndefined();
        testDynamicDialogComponent.dialogService.dialogComponentRef.destroy();
        fixture.detectChanges();
    }));

    it('should close dialog with esc key', fakeAsync(() => {
        fixture.detectChanges();
  
        testDynamicDialogComponent.show();
        fixture.detectChanges();
        
        tick(300);
        let dynamicDialogEl = document.getElementsByClassName("p-dialog")[0];
        expect(dynamicDialogEl).toBeTruthy();
        const titleEl = dynamicDialogEl.getElementsByClassName("p-dialog-title")[0];
        const testComponentHeader = dynamicDialogEl.getElementsByTagName("h2")[0];
        expect(titleEl.textContent).toEqual("Demo Header");
        expect(testComponentHeader.textContent).toEqual(" PrimeNG ROCKS! ");
        const escapeEvent: any = document.createEvent('CustomEvent');
        escapeEvent.which = 27;
        escapeEvent.initEvent('keydown');
        (dynamicDialogEl as HTMLDivElement).style.zIndex = DomHandler.zindex.toString();
        document.dispatchEvent(escapeEvent);
        fixture.detectChanges();
        tick(700);

        dynamicDialogEl = document.getElementsByClassName("p-dialog")[0] as HTMLDivElement;
        expect(dynamicDialogEl).toBeUndefined();
        testDynamicDialogComponent.dialogService.dialogComponentRef.destroy();
        fixture.detectChanges();
    }));

    it('should close dialog with mask click', fakeAsync(() => {
        fixture.detectChanges();
  
        testDynamicDialogComponent.show();
        fixture.detectChanges();
        
        tick(300);
        let dynamicDialogEl = document.getElementsByClassName("p-dialog")[0];
        expect(dynamicDialogEl).toBeTruthy();
        const titleEl = dynamicDialogEl.getElementsByClassName("p-dialog-title")[0];
        const testComponentHeader = dynamicDialogEl.getElementsByTagName("h2")[0];
        expect(titleEl.textContent).toEqual("Demo Header");
        expect(testComponentHeader.textContent).toEqual(" PrimeNG ROCKS! ");
        let maskEl = document.querySelector(".p-dialog-mask") as HTMLElement;
        maskEl.click();
        fixture.detectChanges();
        tick(700);

        dynamicDialogEl = document.getElementsByClassName("p-dialog")[0];
        expect(dynamicDialogEl).toBeUndefined();
        testDynamicDialogComponent.dialogService.dialogComponentRef.destroy();
        fixture.detectChanges();
    }));
});
