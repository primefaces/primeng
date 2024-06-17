import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Image, ImageModule } from './image';

describe('Image', () => {
    let image: Image;
    let fixture: ComponentFixture<Image>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, ImageModule]
        });

        fixture = TestBed.createComponent(Image);
        image = fixture.componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const imageEl = fixture.debugElement.query(By.css('.p-image'));
        expect(imageEl.nativeElement).toBeTruthy();
    });
});
