import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SpeedDialModule, SpeedDial } from './speeddial';

describe('SpeedDial', () => {
    let speedDial: SpeedDial;
    let fixture: ComponentFixture<SpeedDial>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, SpeedDialModule]
        });

        fixture = TestBed.createComponent(SpeedDial);
        speedDial = fixture.componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const speedDialEl = fixture.debugElement.query(By.css('.p-speeddial'));
        expect(speedDialEl.nativeElement).toBeTruthy();
    });
});
