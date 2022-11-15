import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DockModule, Dock } from './dock';

describe('Dock', () => {
    let dock: Dock;
    let fixture: ComponentFixture<Dock>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, DockModule]
        });

        fixture = TestBed.createComponent(Dock);
        dock = fixture.componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const dockEl = fixture.debugElement.query(By.css('.p-dock'));
        expect(dockEl.nativeElement).toBeTruthy();
    });
});
