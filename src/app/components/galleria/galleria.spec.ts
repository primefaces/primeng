import { TestBed, ComponentFixture, fakeAsync, tick, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Galleria, GalleriaModule } from './galleria';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Galleria', () => {
    let galleria: Galleria;
    let fixture: ComponentFixture<Galleria>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, GalleriaModule]
        });

        fixture = TestBed.createComponent(Galleria);
        galleria = fixture.componentInstance;
    });

    it('should not display by default', () => {
        fixture.detectChanges();

        const galleriaEl = fixture.debugElement.query(By.css('.p-galleria'));
        expect(galleriaEl).toBeNull();
    });
});
