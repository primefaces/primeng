import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Dialog } from './dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Dialog', () => {
    
    let dialog: Dialog;
    let fixture: ComponentFixture<Dialog>;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule    
            ],
            declarations: [
                Dialog
            ]
        });
        
        fixture = TestBed.createComponent(Dialog);
        dialog = fixture.componentInstance;
    });
    
    it('should display the header', () => {
        dialog.visible=true;
        dialog.header = 'PrimeNG Dialog Header';
        fixture.detectChanges();
        const headerEl = fixture.debugElement.query(By.css('.ui-dialog-title'));
        expect(headerEl.nativeElement.textContent).toContain('PrimeNG Dialog Header')
    });
    
    it('should display close icon when closable', () => {
        dialog.visible=true;
        fixture.detectChanges();
        const closeEl = fixture.debugElement.query(By.css('.ui-dialog-titlebar-close'));
        expect(closeEl).not.toBeNull();
    });
    
    it('should display resizer when resizable', () => {
        dialog.visible=true;
        fixture.detectChanges();
        const resizeEl = fixture.debugElement.query(By.css('.ui-resizable-handle'));
        expect(resizeEl).not.toBeNull();
    });

    it('should not create the container element by default', () => {
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.childElementCount).toEqual(0);
        expect(dialog.visible).toEqual(undefined);
    });
    
    it('should add rtl class when rtl is enabled', () => {
        dialog.visible=true;
        dialog.rtl = true;
        fixture.detectChanges();
        expect(fixture.debugElement.children[0].classes['ui-dialog-rtl']).toEqual(true);
    });
    
    it('should add draggable class when dragging is enabled', () => {
        dialog.visible=true;
        fixture.detectChanges();
        expect(fixture.debugElement.children[0].classes['ui-dialog-draggable']).toEqual(true);
    });
            
    it('should update visible as false binding when close icon is clicked', () => {
        let show = true;
        dialog.visible = show;
        fixture.detectChanges();
        dialog.visibleChange.subscribe(value => show = value);
        
        const closeEl = fixture.nativeElement.querySelector('.ui-dialog-titlebar-close');
        closeEl.click();
        
        expect(show).toEqual(false);
    });

});
