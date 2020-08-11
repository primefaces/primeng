import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Panel } from './panel';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Panel', () => {
    
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
        const headerEl = fixture.debugElement.query(By.css('.p-panel-title'));
        expect(headerEl.nativeElement.textContent).toContain('PrimeNG Panel Header')
    });
    
    it('should not render toggle icon when not toggleable', () => {
        fixture.detectChanges();
        const togglerEl = fixture.debugElement.query(By.css('.p-panel-toggler'));
        expect(togglerEl).toBeNull();
    });
    
    it('should render toggle icon when toggleable', () => {
        panel.toggleable = true;
        fixture.detectChanges();
        const togglerEl = fixture.debugElement.query(By.css('.p-panel-toggler'));
        expect(togglerEl).not.toBeNull();
    });
    
    it('should toggle the panel when toggler is clicked', fakeAsync(() => {
        panel.toggleable = true;
        fixture.detectChanges();
        const togglerEl = fixture.nativeElement.querySelector('.p-panel-toggler');
        
        togglerEl.click();
        expect(panel.collapsed).toEqual(true);
        
        tick(500);
        
        togglerEl.click();
        expect(panel.collapsed).toEqual(false);
    }));

});
