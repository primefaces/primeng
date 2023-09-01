import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Toast, ToastItem } from './toast';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ExclamationTriangleIcon } from 'primeng/icons/exclamationtriangle';
import { CheckIcon } from 'primeng/icons/check';
import { TimesIcon } from 'primeng/icons/times';

@Component({
    template: ` <p-toast></p-toast> `,
    providers: [MessageService]
})
class TestToastComponent {
    constructor(private messageService: MessageService) {}

    showDefaultToast(severity) {
        this.messageService.add({ severity: severity, summary: 'summary', detail: 'detail' });
    }

    showWithKey(key) {
        this.messageService.add({ key: key, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
    }

    showWithId(id) {
        this.messageService.add({ id: id, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
    }

    showMultipleToast() {
        this.messageService.addAll([
            { severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' },
            { severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' }
        ]);
    }

    onClearWithKey(key) {
        this.messageService.clear(key);
    }

    onClearWithId(id) {
        this.messageService.remove(id);
    }

    onClear() {
        this.messageService.clear();
    }
}

describe('Toast', () => {
    let toast: Toast;
    let fixture: ComponentFixture<TestToastComponent>;
    let component: TestToastComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, ExclamationTriangleIcon, CheckIcon, TimesIcon],
            declarations: [Toast, ToastItem, TestToastComponent]
        });

        fixture = TestBed.createComponent(TestToastComponent);
        toast = fixture.debugElement.children[0].componentInstance;
        component = fixture.componentInstance;
    });

    it('should create container', () => {
        fixture.detectChanges();

        const toastContainer = fixture.debugElement.query(By.css('.p-toast'));
        expect(toastContainer.nativeElement).toBeTruthy();
    });

    it('should create success toast', () => {
        fixture.detectChanges();

        component.showDefaultToast('success');
        fixture.detectChanges();

        const toastMessage = fixture.debugElement.query(By.css('.p-toast-message'));
        expect(toastMessage.nativeElement).toBeTruthy();
        expect(toastMessage.nativeElement.classList).toContain('p-toast-message-success');
    });

    it('should close toast', () => {
        fixture.detectChanges();

        component.showDefaultToast('success');
        fixture.detectChanges();

        let toastMessage = fixture.debugElement.query(By.css('.p-toast-message'));
        expect(toastMessage.nativeElement).toBeTruthy();
        expect(toastMessage.nativeElement.classList).toContain('p-toast-message-success');
        const closeEl = fixture.debugElement.query(By.css('.p-toast-icon-close'));
        toastMessage.nativeElement.dispatchEvent(new Event('mouseenter'));
        toastMessage.nativeElement.dispatchEvent(new Event('mouseleave'));
        closeEl.nativeElement.click();
        fixture.detectChanges();

        Promise.resolve(null).then(() => {
            toastMessage = fixture.debugElement.query(By.css('.p-toast-message'));
            expect(toastMessage).toBeFalsy();
        });
    });

    it('should create warn toast with key', () => {
        toast.key = 'vv';
        fixture.detectChanges();

        component.showWithKey('vv');
        fixture.detectChanges();

        let toastMessage = fixture.debugElement.query(By.css('.p-toast-message'));
        expect(toastMessage.nativeElement).toBeTruthy();
        expect(toastMessage.nativeElement.classList).toContain('p-toast-message-warn');
    });

    it('should create warn toast with id', () => {
        fixture.detectChanges();

        component.showWithId(1);
        fixture.detectChanges();

        let toastMessage = fixture.debugElement.query(By.css('.p-toast-message'));
        expect(toastMessage.nativeElement).toBeTruthy();
        expect(toastMessage.nativeElement.classList).toContain('p-toast-message-warn');
    });

    it('should clear toast', () => {
        fixture.detectChanges();

        component.showDefaultToast('success');
        fixture.detectChanges();

        let toastMessage = fixture.debugElement.query(By.css('.p-toast-message'));
        expect(toastMessage.nativeElement).toBeTruthy();
        expect(toastMessage.nativeElement.classList).toContain('p-toast-message-success');
        component.onClear();
        fixture.detectChanges();

        Promise.resolve(null).then(() => {
            toastMessage = fixture.debugElement.query(By.css('.p-toast-message'));
            expect(toastMessage).toBeFalsy();
        });
    });

    it('should clear toast with key', () => {
        toast.key = 'vv';
        fixture.detectChanges();

        component.showWithKey('vv');
        fixture.detectChanges();

        let toastMessage = fixture.debugElement.query(By.css('.p-toast-message'));
        expect(toastMessage.nativeElement).toBeTruthy();
        expect(toastMessage.nativeElement.classList).toContain('p-toast-message-warn');
        component.onClearWithKey('vv');
        fixture.detectChanges();

        Promise.resolve(null).then(() => {
            toastMessage = fixture.debugElement.query(By.css('.p-toast-message'));
            expect(toastMessage).toBeFalsy();
        });
    });

    it('should clear toast with id', () => {
        fixture.detectChanges();

        component.showDefaultToast('success');
        component.showWithId(1);
        fixture.detectChanges();

        let toastMessages = fixture.debugElement.queryAll(By.css('.p-toast-message'));
        expect(toastMessages.length).toBe(2);
        expect(toastMessages[0].nativeElement).toBeTruthy();
        expect(toastMessages[0].nativeElement.classList).toContain('p-toast-message-success');
        expect(toastMessages[1].nativeElement).toBeTruthy();
        expect(toastMessages[1].nativeElement.classList).toContain('p-toast-message-warn');
        component.onClearWithId(1);
        fixture.detectChanges();

        Promise.resolve(null).then(() => {
            toastMessages = fixture.debugElement.queryAll(By.css('.p-toast-message'));
            expect(toastMessages.length).toBe(1);
            expect(toastMessages[0].nativeElement).toBeTruthy();
            expect(toastMessages[0].nativeElement.classList).toContain('p-toast-message-success');
        });
    });

    it('should create multiple toast', () => {
        fixture.detectChanges();

        component.showMultipleToast();
        fixture.detectChanges();

        const toastMessage = fixture.debugElement.queryAll(By.css('.p-toast-message'));
        expect(toastMessage.length).toEqual(2);
    });
});
