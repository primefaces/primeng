import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Fieldset } from './fieldset';
import { MinusIcon } from 'primeng/icons/minus';

describe('Fieldset', () => {
    let fieldset: Fieldset;
    let fixture: ComponentFixture<Fieldset>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, MinusIcon],
            declarations: [Fieldset]
        });

        fixture = TestBed.createComponent(Fieldset);
        fieldset = fixture.componentInstance;
    });

    it('should display the legend', () => {
        fieldset.legend = 'PrimeNG Fieldset Legend';
        fixture.detectChanges();
        const headerEl = fixture.debugElement.query(By.css('.p-fieldset-legend-text'));
        expect(headerEl.nativeElement.textContent).toContain('PrimeNG Fieldset Legend');
    });

    it('should not render toggle icon when not toggleable', () => {
        fixture.detectChanges();
        const toggleIcon = fixture.debugElement.query(By.css('.p-fieldset-toggler'));
        expect(toggleIcon).toBeNull();
    });

    it('should render toggle icon when toggleable', () => {
        fieldset.toggleable = true;
        fixture.detectChanges();
        const toggleIcon = fixture.debugElement.query(By.css('.p-fieldset-toggler'));
        expect(toggleIcon).not.toBeNull();
    });

    it('should toggle the fieldset when toggler is clicked', fakeAsync(() => {
        fieldset.toggleable = true;
        fixture.detectChanges();
        const togglerEl = fixture.nativeElement.querySelector('.p-fieldset-legend').children[0];

        togglerEl.click();
        expect(fieldset.collapsed).toEqual(true);

        tick(500);

        togglerEl.click();
        expect(fieldset.collapsed).toEqual(false);
        flush();
    }));
});
