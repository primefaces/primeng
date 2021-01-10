import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Dialog } from './dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { Footer } from 'primeng/api';
import { FocusTrapModule } from '../focustrap/focustrap';
import { ButtonModule } from '../button/button';

@Component({
    template: `
    <p-dialog [(visible)]="display">
    <p-footer>
            <button type="button" pButton icon="pi pi-check" (click)="display=false" label="Yes"></button>
            <button type="button" pButton icon="pi pi-times" (click)="display=false" label="No" class="ui-button-secondary"></button>
    </p-footer>
    </p-dialog>
    <button type="button" (click)="showDialog()" pButton icon="pi pi-info-circle" label="Show"></button>
    `
  })
  class TestDialogComponent {
    display: boolean = false;

    showDialog() {
        this.display = true;
    }
  }

describe('Dialog', () => {
    
    let dialog: Dialog;
    let fixture: ComponentFixture<TestDialogComponent>;
    let testComponent: TestDialogComponent;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                FocusTrapModule,
                ButtonModule 
            ],
            declarations: [
                Dialog,
                Footer,
                TestDialogComponent
            ]
        });
        
        fixture = TestBed.createComponent(TestDialogComponent);
        dialog = fixture.debugElement.children[0].componentInstance;
        testComponent = fixture.debugElement.componentInstance;
    });
    
    it('should display the header', () => {
        dialog.header = 'PrimeNG Dialog Header';
        fixture.detectChanges();
        
        const buttonEl = fixture.debugElement.query(By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();

        const headerEl = fixture.debugElement.query(By.css('.p-dialog-title'));
        expect(headerEl.nativeElement.textContent).toContain('PrimeNG Dialog Header')
    });
    
    it('should display the close icon when closable', () => {
        const buttonEl = fixture.debugElement.query(By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();
        
        const closeEl = fixture.debugElement.query(By.css('.p-dialog-header-close'));
        expect(closeEl).not.toBeNull();
    });
    
    it('should display the resizer when resizable is true', () => {
        const buttonEl = fixture.debugElement.query(By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();

        const resizeEl = fixture.debugElement.query(By.css('.p-resizable-handle'));
        expect(resizeEl).not.toBeNull();
    });

    it('should not create the container element by default', () => {
        fixture.detectChanges();

        expect(fixture.debugElement.children[0].nativeElement.childElementCount).toEqual(0);
        expect(dialog.visible).toEqual(false);
    });
    
    it('should add rtl class when rtl is enabled', () => {
        dialog.rtl = true;
        const buttonEl = fixture.debugElement.query(By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();

        const rtlEl = fixture.debugElement.query(By.css('.p-dialog-rtl'));
        expect(rtlEl).toBeTruthy();
    });
    
    it('should add draggable class when dragging is enabled', () => {
        const buttonEl = fixture.debugElement.query(By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();

        const draggableEl = fixture.debugElement.query(By.css('.p-dialog-draggable'));
        expect(draggableEl).toBeTruthy();
    });
            
    it('should update visible as false binding when close icon is clicked', () => {
        let show = true;
        const buttonEl = fixture.debugElement.query(By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();
        dialog.visibleChange.subscribe(value => show = value);
        
        const closeEl = fixture.nativeElement.querySelector('.p-dialog-header-close');
        closeEl.click();
        
        expect(show).toEqual(false);
    });

    it('should maximizable', fakeAsync(() => {
        dialog.maximizable = true;
        fixture.detectChanges();

        const buttonEl = fixture.debugElement.query(By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();
        
        tick(300);
        const maximizeSpy = spyOn(dialog,'maximize').and.callThrough();
        const maximizableEl = fixture.nativeElement.querySelector('.p-dialog-header-maximize');
        expect(maximizableEl).toBeTruthy();
        maximizableEl.click();
        fixture.detectChanges();

        const minIconEl = fixture.debugElement.query(By.css('.pi-window-minimize'));
        expect(maximizeSpy).toHaveBeenCalled();
        expect(dialog.maximized).toEqual(true);
        expect(minIconEl).toBeTruthy();
        dialog.container = fixture.debugElement.query(By.css('div')).nativeElement;
        fixture.detectChanges();

        maximizableEl.click();
        tick(350);
        fixture.detectChanges();

        expect(dialog.maximized).toEqual(false);
    }));

    it('should close (maximized)', fakeAsync(() => {
        dialog.maximizable = true;
        fixture.detectChanges();

        const buttonEl = fixture.debugElement.query(By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();

        dialog.container = fixture.debugElement.query(By.css('div')).nativeElement;
        fixture.detectChanges();

        const maximizableEl = fixture.nativeElement.querySelector('.p-dialog-header-maximize ');
        expect(maximizableEl).toBeTruthy();
        maximizableEl.click();
        fixture.detectChanges();

        const closeEl = fixture.debugElement.query(By.css('.p-dialog-header-close'));    
        dialog.visibleChange.subscribe(value => dialog.visible = value);
        closeEl.nativeElement.click();
        tick(350);
        fixture.detectChanges();

        expect(dialog.visible).toEqual(false);
    }));

    it('should change modal blockScroll and dismissableMask ', fakeAsync(() => {
        const closeSpy = spyOn(dialog,'close').and.callThrough();
        dialog.modal = true;
        dialog.blockScroll = true;
        dialog.dismissableMask = true;
        fixture.detectChanges();

        const buttonEl = fixture.debugElement.query(By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();

        const dialogEl = fixture.debugElement.query(By.css('div'));
        const closeEl = fixture.debugElement.query(By.css('.p-dialog-header-close'));
        expect(dialogEl).toBeTruthy();
        dialog.visibleChange.subscribe(value => dialog.visible = value);
        closeEl.nativeElement.click();
        closeEl.nativeElement.dispatchEvent(new Event('mousedown'));
        tick(350);
        fixture.detectChanges();
        
        expect(dialog.visible).toEqual(false);
        expect(closeSpy).toHaveBeenCalled();
    }));

    it('should open with focusOnShow', () => {
        dialog.focusOnShow = true;
        fixture.detectChanges();

        const buttonEl = fixture.debugElement.query(By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();

        expect(dialog.visible).toEqual(true);
    });

    it('should change appendTo (body)', () => {
        dialog.appendTo = "body";
        fixture.detectChanges();

        const buttonEl = fixture.debugElement.query(By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();

        expect(dialog.visible).toEqual(true);
    });

    it('should change appendTo (button)', () => {
        dialog.appendTo = fixture.debugElement.query(By.css('button')).nativeElement;
        fixture.detectChanges();

        const buttonEl = fixture.debugElement.query(By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();

        expect(dialog.visible).toEqual(true);
    });

    it('should call ngOnDestroy', fakeAsync(() => {
        dialog.maximizable = true;
        dialog.modal = true;
        dialog.appendTo = "body";
        fixture.detectChanges();

        const restoreAppendSpy = spyOn(dialog,'restoreAppend').and.callThrough();
        const onOverlayHideSpy = spyOn(dialog,'onContainerDestroy').and.callThrough();
        const disableModalitySpy = spyOn(dialog,'disableModality').and.callThrough();
        const buttonEl = fixture.debugElement.query(By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();

        dialog.container = fixture.debugElement.query(By.css('div')).nativeElement;
        fixture.detectChanges();

        const maximizableEl = fixture.nativeElement.querySelector('.p-dialog-header-maximize ');
        maximizableEl.click();
        fixture.detectChanges();

        dialog.container = fixture.debugElement.query(By.css('div')).nativeElement;
        fixture.detectChanges();

        maximizableEl.click();
        tick(350);
        fixture.detectChanges();

        dialog.ngOnDestroy();
        fixture.detectChanges();

        expect(restoreAppendSpy).toHaveBeenCalled();
        expect(onOverlayHideSpy).toHaveBeenCalled();
        expect(disableModalitySpy).toHaveBeenCalled();
        expect(dialog.container).toEqual(null);
    }));
    
    it('should change location with drag actions', fakeAsync(() => {
        fixture.detectChanges();

        const buttonEl = fixture.debugElement.query(By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();

        tick(300);
        let firstLeft = dialog.container.style.left;
        let firstTop = dialog.container.style.top;
        let event = {
            'pageX':500,
            'pageY':500,
            'target': fixture.debugElement.nativeElement.querySelector('.p-dialog-header')
        };
        dialog.initDrag(event as MouseEvent);
        expect(dialog.dragging).toEqual(true);        
        event.pageX = 505;
        event.pageY = 505;
        dialog.onDrag(event as MouseEvent);
        dialog.endDrag(event as MouseEvent);
        fixture.detectChanges();

        expect(dialog.container.style.left).not.toEqual(firstLeft);
        expect(dialog.container.style.top).not.toEqual(firstTop);
        expect(dialog.dragging).toEqual(false);
    }));

    it('should change location with resize actions', fakeAsync(() => {
        fixture.detectChanges();

        const buttonEl = fixture.debugElement.query(By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();

        tick(300);
        let firstWidth = dialog.container.offsetWidth;
        let firstHeight = dialog.container.offsetHeight;
        let event = {
            'pageX':500,
            'pageY':500
        };
        dialog.initResize(event as MouseEvent);
        expect(dialog.resizing).toEqual(true);        
        event.pageX = 505;
        event.pageY = 505;
        dialog.onResize(event as MouseEvent);
        dialog.resizeEnd(event as MouseEvent);
        fixture.detectChanges();

        expect(parseInt(dialog.container.style.width)).not.toEqual(firstWidth);
        expect(parseInt(dialog.container.style.height)).not.toEqual(firstHeight);
        expect(dialog.resizing).toEqual(false);
    }));

    it('should close when press esc key', fakeAsync(() => {
        fixture.detectChanges();

        const buttonEl = fixture.debugElement.query(By.css('button'));
        buttonEl.nativeElement.click();
        const closeSpy = spyOn(dialog,"close").and.callThrough();
        fixture.detectChanges();

        tick(300);
        const escapeEvent: any = document.createEvent('CustomEvent');
        escapeEvent.which = 27;
        escapeEvent.initEvent('keydown', true, true);
        document.dispatchEvent(escapeEvent);
        document.dispatchEvent(escapeEvent as KeyboardEvent);
        fixture.detectChanges();

        expect(closeSpy).toHaveBeenCalled();
    }));
});
