import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Dialog } from './dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { Footer } from '../common/shared';

@Component({
    template: `
    <p-dialog [(visible)]="display">
    <p-footer>
            <button type="button" pButton icon="pi pi-check" (click)="display=false" label="Yes"></button>
            <button type="button" pButton icon="pi pi-close" (click)="display=false" label="No" class="ui-button-secondary"></button>
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
                NoopAnimationsModule    
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

        const headerEl = fixture.debugElement.query(By.css('.ui-dialog-title'));
        expect(headerEl.nativeElement.textContent).toContain('PrimeNG Dialog Header')
    });
    
    it('should display the close icon when closable', () => {
        const buttonEl = fixture.debugElement.query(By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();
        
        const closeEl = fixture.debugElement.query(By.css('.ui-dialog-titlebar-close'));
        expect(closeEl).not.toBeNull();
    });
    
    it('should display the resizer when resizable is true', () => {
        const buttonEl = fixture.debugElement.query(By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();

        const resizeEl = fixture.debugElement.query(By.css('.ui-resizable-handle'));
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

        expect(fixture.debugElement.children[0].children[0].classes['ui-dialog-rtl']).toEqual(true);
    });
    
    it('should add draggable class when dragging is enabled', () => {
        const buttonEl = fixture.debugElement.query(By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();
        
        expect(fixture.debugElement.children[0].children[0].classes['ui-dialog-draggable']).toEqual(true);
    });
            
    it('should update visible as false binding when close icon is clicked', () => {
        let show = true;
        const buttonEl = fixture.debugElement.query(By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();
        dialog.visibleChange.subscribe(value => show = value);
        
        const closeEl = fixture.nativeElement.querySelector('.ui-dialog-titlebar-close');
        closeEl.click();
        
        expect(show).toEqual(false);
    });

    it('should maximizable', fakeAsync(() => {
        dialog.maximizable = true;
        fixture.detectChanges();

        const buttonEl = fixture.debugElement.query(By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();

        dialog.container = fixture.debugElement.query(By.css('div')).nativeElement;
        fixture.detectChanges();

        const maximizeSpy = spyOn(dialog,'maximize').and.callThrough();
        const revertMaximizSpy = spyOn(dialog,'revertMaximize').and.callThrough();
        const maximizableEl = fixture.nativeElement.querySelector('.ui-dialog-titlebar-maximize ');
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

        expect(revertMaximizSpy).toHaveBeenCalled();
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

        const maximizableEl = fixture.nativeElement.querySelector('.ui-dialog-titlebar-maximize ');
        expect(maximizableEl).toBeTruthy();
        maximizableEl.click();
        fixture.detectChanges();

        const closeEl = fixture.debugElement.query(By.css('.ui-dialog-titlebar-close'));    
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

        dialog.visible = true;
        fixture.detectChanges();

        const dialogEl = fixture.debugElement.query(By.css('div'));
        const onCloseMouseDownSpy = spyOn(dialog,'onCloseMouseDown').and.callThrough();
        const closeEl = fixture.debugElement.query(By.css('.ui-dialog-titlebar-close'));
        expect(dialogEl).toBeTruthy();
        dialog.visibleChange.subscribe(value => dialog.visible = value);
        closeEl.nativeElement.click();
        closeEl.nativeElement.dispatchEvent(new Event('mousedown'));
        tick(350);
        fixture.detectChanges();
        
        expect(dialog.mask.classList).toContain('ui-dialog-mask-scrollblocker');
        expect(dialog.visible).toEqual(false);
        expect(closeSpy).toHaveBeenCalled();
        expect(onCloseMouseDownSpy).toHaveBeenCalled();
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

    it('should open with change height positionLeft and positionTop', fakeAsync(() => {
        dialog.height = 250;
        dialog.positionLeft = 25;
        dialog.positionTop = 25;
        fixture.detectChanges();

        const buttonEl = fixture.debugElement.query(By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();

        tick(300);
        expect(dialog.container.style.height).toEqual('250px');
        expect(dialog.container.style.left).toEqual('25px');
        expect(dialog.container.style.top).toEqual('25px');
    }));

    it('should open with change just positionTop', fakeAsync(() => {
        dialog.positionTop = 25;
        fixture.detectChanges();

        const buttonEl = fixture.debugElement.query(By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();

        tick(300);
        expect(dialog.container.style.top).toEqual('25px');
    }));

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

        const maximizableEl = fixture.nativeElement.querySelector('.ui-dialog-titlebar-maximize ');
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
            'pageY':500
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
        expect(parseInt(dialog.container.style.top) - parseInt(firstTop)).toEqual(5);
        expect(parseInt(dialog.container.style.left) - parseInt(firstLeft)).toEqual(5);
        expect(dialog.dragging).toEqual(false);
        let mousedown;
        dialog.onCloseMouseDown(mousedown as Event);
        dialog.initDrag(event as MouseEvent);
        fixture.detectChanges();

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
        dialog.onResizeEnd(event as MouseEvent);
        fixture.detectChanges();

        expect(parseInt(dialog.container.style.width)).not.toEqual(firstWidth);
        expect(parseInt(dialog.container.style.height)).not.toEqual(firstHeight);
        expect(parseInt(dialog.container.style.height) - firstHeight).toEqual(5);
        expect(parseInt(dialog.container.style.width) - firstWidth).toEqual(5);
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
