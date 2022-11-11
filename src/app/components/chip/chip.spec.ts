import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Chip, ChipModule } from './chip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('Chip', () => {
    let button: Chip;
    let fixture: ComponentFixture<Chip>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, ChipModule]
        });

        fixture = TestBed.createComponent(Chip);
        button = fixture.componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const chipEl = fixture.debugElement.query(By.css('.p-chip'));
        expect(chipEl.nativeElement).toBeTruthy();
    });
});
