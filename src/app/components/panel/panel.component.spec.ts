import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Panel } from './panel';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
    
    let panel: Panel;
    let fixture: ComponentFixture<Panel>;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule    
            ],
            declarations: [
                Panel
            ]
        });
        
        fixture = TestBed.createComponent(Panel);
        panel = fixture.componentInstance;
    });
    
    it('should display the header', () => {
        panel.header = 'PrimeNG Panel Header';
        fixture.detectChanges();
        const headerEl = fixture.debugElement.query(By.css('.ui-panel-title'));
        expect(headerEl.nativeElement.textContent).toContain('PrimeNG Panel Header')
    });
    
    it('should not render toggle icon when not toggleable', () => {
        fixture.detectChanges();
        const closeIcon = fixture.debugElement.query(By.css('.ui-panel-titlebar-toggler'));
        expect(closeIcon).toBeNull();
    });
    
    it('should render toggle icon when toggleable', () => {
        panel.toggleable = true;
        fixture.detectChanges();
        const closeIcon = fixture.debugElement.query(By.css('.ui-panel-titlebar-toggler'));
        expect(closeIcon).not.toBeNull();
    });
    
    it('should toggle the panel when toggler is clicked', fakeAsync(() => {
        panel.toggleable = true;
        fixture.detectChanges();
        const closeIcon = fixture.nativeElement.querySelector('.ui-panel-titlebar-toggler');
        
        closeIcon.click();
        expect(panel.collapsed).toEqual(true);
        
        tick(500);
        
        closeIcon.click();
        expect(panel.collapsed).toEqual(false);
    }));

});
