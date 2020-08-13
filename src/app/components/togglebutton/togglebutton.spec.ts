import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToggleButton } from './togglebutton';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ToggleButton', () => {
    let toggleButton: ToggleButton;
    let fixture: ComponentFixture<ToggleButton>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                ToggleButton
            ]
        });

        fixture = TestBed.createComponent(ToggleButton);
        toggleButton = fixture.componentInstance;
    });

    it('should display the onLabel and offLabel', () => {
        toggleButton.onLabel = 'YES';
        toggleButton.offLabel = 'NO';
        fixture.detectChanges();

        const clickEl = fixture.nativeElement.querySelector('.p-togglebutton')
        clickEl.click();
        fixture.detectChanges();

        const labelEl = fixture.debugElement.query(By.css('.p-button-label'));
        expect(labelEl.nativeElement.textContent).toBe('YES');

        clickEl.click();
        fixture.detectChanges();

        expect(labelEl.nativeElement.textContent).toBe('NO');
    });

    it('Should display as checked when value is true by default', () => {
        toggleButton.checked = true;
        fixture.detectChanges();

        expect(toggleButton.checked).toBe(true);
    });
});
