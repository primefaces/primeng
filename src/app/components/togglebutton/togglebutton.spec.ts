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

    it('should display the OFF label when value is undefined', () => {
        toggleButton.offLabel = 'NO';
        fixture.detectChanges();
        const labelEl = fixture.debugElement.query(By.css('.ui-button-text'));
        expect(labelEl.nativeElement.textContent).toBe('NO');
    });

    it('should display the ON label when clicked', () => {
        toggleButton.onLabel = 'YES';
        fixture.detectChanges();
        const clickEl = fixture.nativeElement.querySelector('.ui-togglebutton')
        clickEl.click();
        fixture.detectChanges();

        const labelEl = fixture.debugElement.query(By.css('.ui-button-text'));
        expect(labelEl.nativeElement.textContent).toBe('YES')
    });

    it('Should display as checked when value is true by default', () => {
        toggleButton.checked = true;
        fixture.detectChanges();
        expect(toggleButton.checked).toBe(true);
    });
});
