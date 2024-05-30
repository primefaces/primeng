import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Footer } from 'primeng/api';
import { DialogService } from './dialogservice';
import { DynamicDialogModule } from './dynamicdialog';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { DynamicDialogRef } from './dynamicdialog-ref';

@Component({
    template: ` <h2>PrimeNG ROCKS!</h2> `
})
export class TestComponent {
    constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}
}

@Component({
    template: ` <div class="TestDynamicDialog"></div> `
})
export class TestDynamicDialogComponent {
    constructor(public dialogService: DialogService) {}

    show() {
        this.dialogService.open(TestComponent, {
            header: 'Demo Header',
            width: '70%',
            contentStyle: { 'max-height': '350px', overflow: 'auto' },
            dismissableMask: true,
            baseZIndex: 0
        });
    }
}
@Component({
    template: ` <div class="TestDynamicDialogClosableFalse"></div> `
})
export class TestDynamicDialogWithClosableFalseComponent {
    constructor(public dialogService: DialogService) {}

    show() {
        this.dialogService.open(TestComponent, {
            header: 'Demo Header',
            width: '70%',
            contentStyle: { 'max-height': '350px', overflow: 'auto' },
            closable: false,
            closeOnEscape: true,
            dismissableMask: true,
            baseZIndex: 0
        });
    }
}
@NgModule({
    imports: [CommonModule, DynamicDialogModule],
    declarations: [TestComponent, TestDynamicDialogComponent],
    exports: [TestComponent],
    providers: [DialogService]
})
export class FakeTestDialogModule {}

describe('DynamicDialog', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, FakeTestDialogModule, Footer]
        });
    });

    it('should open dialog and close dialog', fakeAsync(() => {
        let fixture: ComponentFixture<TestDynamicDialogComponent>;
        let testDynamicDialogComponent: TestDynamicDialogComponent;

        fixture = TestBed.createComponent(TestDynamicDialogComponent);
        testDynamicDialogComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();

        testDynamicDialogComponent.show();
        fixture.detectChanges();

        tick(300);
        let dynamicDialogEl = document.getElementsByClassName('p-dynamic-dialog')[0];
        expect(dynamicDialogEl).toBeTruthy();
        const titleEl = dynamicDialogEl.getElementsByClassName('p-dialog-title')[0];
        const testComponentHeader = dynamicDialogEl.getElementsByTagName('h2')[0];
        expect(titleEl.textContent).toEqual('Demo Header');
        expect(testComponentHeader.textContent).toEqual('PrimeNG ROCKS!');
        let dynamicDialogTitlebarIconEl = document.querySelector('.p-dynamic-dialog .p-dialog-header-icon') as HTMLElement;
        dynamicDialogTitlebarIconEl.click();
        fixture.detectChanges();
        tick(700);

        dynamicDialogEl = document.getElementsByClassName('p-dynamic-dialog')[0];
        expect(dynamicDialogEl).toBeUndefined();
        flush();
    }));

    it('should open dialog and close dialog without the closing icon enabled', fakeAsync(() => {
        let fixture: ComponentFixture<TestDynamicDialogWithClosableFalseComponent>;
        let testDynamicDialogComponent: TestDynamicDialogWithClosableFalseComponent;
        fixture = TestBed.createComponent(TestDynamicDialogComponent);
        testDynamicDialogComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();

        testDynamicDialogComponent.show();
        fixture.detectChanges();
        tick(300);

        let dynamicDialogEl = document.getElementsByClassName('p-dynamic-dialog')[0];
        expect(dynamicDialogEl).toBeTruthy();
        const titleEl = dynamicDialogEl.getElementsByClassName('p-dialog-title')[0];
        const testComponentHeader = dynamicDialogEl.getElementsByTagName('h2')[0];
        expect(titleEl.textContent).toEqual('Demo Header');
        expect(testComponentHeader.textContent).toEqual('PrimeNG ROCKS!');
        const backdropEl = document.getElementsByClassName('p-dialog-mask')[0];
        backdropEl.dispatchEvent(new Event('mousedown'));
        fixture.detectChanges();
        tick(700);

        dynamicDialogEl = document.getElementsByClassName('p-dynamic-dialog')[0];
        expect(dynamicDialogEl).toBeUndefined();
        flush();
    }));
});
