import { ComponentRef } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Skeleton, SkeletonModule } from './skeleton';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('Skeleton', () => {
    let skeleton: Skeleton;
    let fixture: ComponentFixture<Skeleton>;
    let skeletonRef: ComponentRef<Skeleton>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, SkeletonModule],
        });

        fixture = TestBed.createComponent(Skeleton);
        skeleton = fixture.componentInstance;
        skeletonRef = fixture.componentRef;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const skeletonEl = fixture.debugElement.query(By.css('.p-skeleton'));
        expect(skeletonEl.nativeElement).toBeTruthy();
    });

    it('should render skeleton with default values', () => {
        fixture.detectChanges();
        const skeletonElement = fixture.nativeElement.querySelector('div');

        expect(skeletonElement).toBeTruthy();
        expect(skeletonElement.classList).toContain('p-skeleton');
        expect(skeletonElement.classList).toContain('p-component');
        expect(skeletonElement.style.width).toBe('100%');
        expect(skeletonElement.style.height).toBe('1rem');
    });

    it('should apply circle shape and no animation', () => {
        skeletonRef.setInput('shape', 'circle');
        skeletonRef.setInput('animation', 'none');
        fixture.detectChanges();

        const skeletonElement = fixture.nativeElement.querySelector('div');
        expect(skeletonElement.classList).toContain('p-skeleton-circle');
        expect(skeletonElement.classList).toContain('p-skeleton-animation-none');
    });

    it('should apply custom styles and borderRadius', () => {
        skeletonRef.setInput('style', { backgroundColor: 'red' });
        skeletonRef.setInput('borderRadius', '50%');
        skeletonRef.setInput('size', '50px');
        fixture.detectChanges();

        const skeletonElement = fixture.nativeElement.querySelector('div');
        expect(skeletonElement.style.backgroundColor).toBe('red');
        expect(skeletonElement.style.borderRadius).toBe('50%');
        expect(skeletonElement.style.width).toBe('50px');
        expect(skeletonElement.style.height).toBe('50px');
    });

    it('should apply size over width and height', () => {
        skeletonRef.setInput('size', '80px');
        skeletonRef.setInput('width', '200px');
        skeletonRef.setInput('height', '300px');
        fixture.detectChanges();

        const skeletonElement = fixture.nativeElement.querySelector('div');
        expect(skeletonElement.style.width).toBe('80px');
        expect(skeletonElement.style.height).toBe('80px');
    });

    it('should set aria-hidden attribute to true', () => {
        fixture.detectChanges();

        const skeletonElement = fixture.nativeElement.querySelector('div');
        expect(skeletonElement.getAttribute('aria-hidden')).toBe('true');
    });
});
