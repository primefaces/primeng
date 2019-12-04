import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Fieldset } from './fieldset';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Fieldset', () => {
    
    let fieldset: Fieldset;
    let fixture: ComponentFixture<Fieldset>;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule    
            ],
            declarations: [
                Fieldset
            ]
        });
        
        fixture = TestBed.createComponent(Fieldset);
        fieldset = fixture.componentInstance;
    });
    
    it('should display the legend', () => {
        fieldset.legend = 'PrimeNG Fieldset Legend';
        fixture.detectChanges();
        const headerEl = fixture.debugElement.query(By.css('.ui-fieldset-legend-text'));
        expect(headerEl.nativeElement.textContent).toContain('PrimeNG Fieldset Legend')
    });
    
    it('should not render toggle icon when not toggleable', () => {
        fixture.detectChanges();
        const toggleIcon = fixture.debugElement.query(By.css('.ui-fieldset-toggler'));
        expect(toggleIcon).toBeNull();
    });
    
    it('should render toggle icon when toggleable', () => {
        fieldset.toggleable = true;
        fixture.detectChanges();
        const toggleIcon = fixture.debugElement.query(By.css('.ui-fieldset-toggler'));
        expect(toggleIcon).not.toBeNull();
    });
    
    it('should toggle the fieldset when toggler is clicked', fakeAsync(() => {
        fieldset.toggleable = true;
        fixture.detectChanges();
        const togglerEl = fixture.nativeElement.querySelector('.ui-fieldset-legend').children[0];
        
        togglerEl.click();
        expect(fieldset.collapsed).toEqual(true);
        
        tick(500);
        
        togglerEl.click();
        expect(fieldset.collapsed).toEqual(false);
    }));

});
