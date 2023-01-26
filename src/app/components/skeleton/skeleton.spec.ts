import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Skeleton, SkeletonModule } from './skeleton';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('Skeleton', () => {
    let skeleton: Skeleton;
    let fixture: ComponentFixture<Skeleton>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, SkeletonModule]
        });

        fixture = TestBed.createComponent(Skeleton);
        skeleton = fixture.componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const skeletonEl = fixture.debugElement.query(By.css('.p-skeleton'));
        expect(skeletonEl.nativeElement).toBeTruthy();
    });
});
