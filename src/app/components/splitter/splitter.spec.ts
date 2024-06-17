import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Splitter, SplitterModule } from './splitter';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('Splitter', () => {
    let splitter: Splitter;
    let fixture: ComponentFixture<Splitter>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, SplitterModule]
        });

        fixture = TestBed.createComponent(Splitter);
        splitter = fixture.componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const splitterEl = fixture.debugElement.query(By.css('.p-splitter'));
        expect(splitterEl.nativeElement).toBeTruthy();
    });
});
