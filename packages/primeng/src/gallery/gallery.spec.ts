import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, provideZonelessChangeDetection } from '@angular/core';
import { GalleryModule, Gallery } from './gallery';
import { GalleryItem } from './gallery-item';
import { GalleryPrev } from './gallery-prev';
import { GalleryNext } from './gallery-next';
import { GalleryZoomIn } from './gallery-zoom-in';
import { GalleryZoomOut } from './gallery-zoom-out';
import { GalleryZoomToggle } from './gallery-zoom-toggle';
import { GalleryRotateLeft } from './gallery-rotate-left';
import { GalleryRotateRight } from './gallery-rotate-right';
import { GalleryFlipX } from './gallery-flip-x';
import { GalleryFlipY } from './gallery-flip-y';
import { GalleryDownload } from './gallery-download';
import { GalleryFullScreen } from './gallery-full-screen';
import { GalleryBackdrop } from './gallery-backdrop';
import { GalleryHeader } from './gallery-header';
import { GalleryContent } from './gallery-content';
import { GalleryFooter } from './gallery-footer';
import { GalleryThumbnailItem } from './gallery-thumbnail-item';

@Component({
    standalone: true,
    imports: [GalleryModule],
    template: `
        <p-gallery [(activeIndex)]="activeIndex" (onActiveIndexChange)="onIndexChange($event)">
            <p-gallery-backdrop></p-gallery-backdrop>
            <button pGalleryPrev id="prev-btn"></button>
            <button pGalleryNext id="next-btn"></button>
            <p-gallery-header>
                <button pGalleryZoomIn id="zoom-in-btn"></button>
                <button pGalleryZoomOut id="zoom-out-btn"></button>
                <button pGalleryZoomToggle id="zoom-toggle-btn"></button>
                <button pGalleryRotateLeft id="rotate-left-btn"></button>
                <button pGalleryRotateRight id="rotate-right-btn"></button>
                <button pGalleryFlipX id="flip-x-btn"></button>
                <button pGalleryFlipY id="flip-y-btn"></button>
                <button pGalleryDownload id="download-btn"></button>
                <button pGalleryFullScreen id="fullscreen-btn"></button>
            </p-gallery-header>
            <p-gallery-content>
                <p-gallery-item><img src="img1.jpg" /></p-gallery-item>
                <p-gallery-item><img src="img2.jpg" /></p-gallery-item>
                <p-gallery-item><img src="img3.jpg" /></p-gallery-item>
            </p-gallery-content>
            <p-gallery-footer>
                <p-gallery-thumbnail>
                    <p-gallery-thumbnail-content>
                        <p-gallery-thumbnail-item [index]="0"><img src="t1.jpg" /></p-gallery-thumbnail-item>
                        <p-gallery-thumbnail-item [index]="1"><img src="t2.jpg" /></p-gallery-thumbnail-item>
                        <p-gallery-thumbnail-item [index]="2"><img src="t3.jpg" /></p-gallery-thumbnail-item>
                    </p-gallery-thumbnail-content>
                </p-gallery-thumbnail>
            </p-gallery-footer>
        </p-gallery>
    `
})
class TestGalleryComponent {
    activeIndex = 0;
    indexChangeEvent: any;

    onIndexChange(event: any) {
        this.indexChangeEvent = event;
    }
}

describe('Gallery', () => {
    let fixture: ComponentFixture<TestGalleryComponent>;
    let component: TestGalleryComponent;
    let galleryEl: DebugElement;
    let gallery: Gallery;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [TestGalleryComponent],
            providers: [provideZonelessChangeDetection()]
        });

        fixture = TestBed.createComponent(TestGalleryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();

        galleryEl = fixture.debugElement.query(By.directive(Gallery));
        gallery = galleryEl.componentInstance;
    });

    describe('Component Initialization', () => {
        it('should create the gallery component', () => {
            expect(gallery).toBeTruthy();
        });

        it('should have default activeIndex of 0', () => {
            expect(gallery.activeIndex()).toBe(0);
        });

        it('should not be in fullscreen by default', () => {
            expect(gallery.isFullscreen()).toBe(false);
        });

        it('should have default activeItemTransform', () => {
            expect(gallery.activeItemTransform()).toEqual({
                zoomed: false,
                rotated: false,
                flipped: false
            });
        });

        it('should render sub-components', () => {
            expect(fixture.debugElement.query(By.directive(GalleryBackdrop))).toBeTruthy();
            expect(fixture.debugElement.query(By.directive(GalleryHeader))).toBeTruthy();
            expect(fixture.debugElement.query(By.directive(GalleryContent))).toBeTruthy();
            expect(fixture.debugElement.query(By.directive(GalleryFooter))).toBeTruthy();
        });

        it('should register 3 items', () => {
            expect(gallery.itemCounter).toBe(3);
        });
    });

    describe('Data Attributes', () => {
        it('should have data-scope and data-part on root', () => {
            expect(galleryEl.nativeElement.getAttribute('data-scope')).toBe('gallery');
            expect(galleryEl.nativeElement.getAttribute('data-part')).toBe('root');
        });

        it('should not have data-fullscreen by default', () => {
            expect(galleryEl.nativeElement.getAttribute('data-fullscreen')).toBeNull();
        });

        it('should not have data-zoomed by default', () => {
            expect(galleryEl.nativeElement.getAttribute('data-zoomed')).toBeNull();
        });

        it('should not have data-rotated by default', () => {
            expect(galleryEl.nativeElement.getAttribute('data-rotated')).toBeNull();
        });

        it('should not have data-flipped by default', () => {
            expect(galleryEl.nativeElement.getAttribute('data-flipped')).toBeNull();
        });

        it('should have data-scope on action directives', () => {
            const prevBtn = fixture.debugElement.query(By.directive(GalleryPrev));
            expect(prevBtn.nativeElement.getAttribute('data-scope')).toBe('gallery');
            expect(prevBtn.nativeElement.getAttribute('data-part')).toBe('prev');
        });

        it('should have data-action on action directives', () => {
            const zoomInBtn = fixture.debugElement.query(By.directive(GalleryZoomIn));
            expect(zoomInBtn.nativeElement.getAttribute('data-action')).toBe('zoom-in');

            const flipXBtn = fixture.debugElement.query(By.directive(GalleryFlipX));
            expect(flipXBtn.nativeElement.getAttribute('data-action')).toBe('flip-x');
        });
    });

    describe('Navigation', () => {
        it('should navigate to next item on pGalleryNext click', async () => {
            const nextBtn = fixture.debugElement.query(By.css('#next-btn'));
            nextBtn.nativeElement.click();
            await fixture.whenStable();

            expect(gallery.activeIndex()).toBe(1);
        });

        it('should navigate to previous item on pGalleryPrev click', async () => {
            component.activeIndex = 1;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const prevBtn = fixture.debugElement.query(By.css('#prev-btn'));
            prevBtn.nativeElement.click();
            await fixture.whenStable();

            expect(gallery.activeIndex()).toBe(0);
        });

        it('should wrap to first item when navigating next from last item', async () => {
            component.activeIndex = 2;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const nextBtn = fixture.debugElement.query(By.css('#next-btn'));
            nextBtn.nativeElement.click();
            await fixture.whenStable();

            expect(gallery.activeIndex()).toBe(0);
        });

        it('should wrap to last item when navigating prev from first item', async () => {
            const prevBtn = fixture.debugElement.query(By.css('#prev-btn'));
            prevBtn.nativeElement.click();
            await fixture.whenStable();

            expect(gallery.activeIndex()).toBe(2);
        });

        it('should emit onActiveIndexChange on navigation', async () => {
            const nextBtn = fixture.debugElement.query(By.css('#next-btn'));
            nextBtn.nativeElement.click();
            await fixture.whenStable();

            expect(component.indexChangeEvent).toBeDefined();
            expect(component.indexChangeEvent.value).toBe(1);
        });
    });

    describe('Item Active State', () => {
        it('should set data-active="true" on active item', async () => {
            await fixture.whenStable();
            const items = fixture.debugElement.queryAll(By.directive(GalleryItem));

            expect(items[0].nativeElement.getAttribute('data-active')).toBe('true');
            expect(items[1].nativeElement.getAttribute('data-active')).toBe('false');
            expect(items[2].nativeElement.getAttribute('data-active')).toBe('false');
        });

        it('should update data-active when activeIndex changes', async () => {
            component.activeIndex = 1;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const items = fixture.debugElement.queryAll(By.directive(GalleryItem));
            expect(items[0].nativeElement.getAttribute('data-active')).toBe('false');
            expect(items[1].nativeElement.getAttribute('data-active')).toBe('true');
            expect(items[2].nativeElement.getAttribute('data-active')).toBe('false');
        });

        it('should select item directly via selectItem', async () => {
            gallery.selectItem(2);
            await fixture.whenStable();

            expect(gallery.activeIndex()).toBe(2);
        });
    });

    describe('Action Directives', () => {
        it('should dispatch zoom-in action on pGalleryZoomIn click', async () => {
            spyOn(gallery, 'dispatchAction').and.callThrough();

            const zoomInBtn = fixture.debugElement.query(By.css('#zoom-in-btn'));
            zoomInBtn.nativeElement.click();

            expect(gallery.dispatchAction).toHaveBeenCalledWith('zoom-in');
        });

        it('should dispatch zoom-out action on pGalleryZoomOut click', async () => {
            // First zoom in so zoom-out button is not disabled
            gallery.reportItemState({ zoomed: true, rotated: false, flipped: false });
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            spyOn(gallery, 'dispatchAction').and.callThrough();

            const zoomOutBtn = fixture.debugElement.query(By.css('#zoom-out-btn'));
            zoomOutBtn.nativeElement.click();

            expect(gallery.dispatchAction).toHaveBeenCalledWith('zoom-out');
        });

        it('should dispatch rotate-left action on pGalleryRotateLeft click', async () => {
            spyOn(gallery, 'dispatchAction').and.callThrough();

            const btn = fixture.debugElement.query(By.css('#rotate-left-btn'));
            btn.nativeElement.click();
            await fixture.whenStable();

            expect(gallery.dispatchAction).toHaveBeenCalledWith('rotate-left');
        });

        it('should dispatch rotate-right action on pGalleryRotateRight click', async () => {
            spyOn(gallery, 'dispatchAction').and.callThrough();

            const btn = fixture.debugElement.query(By.css('#rotate-right-btn'));
            btn.nativeElement.click();
            await fixture.whenStable();

            expect(gallery.dispatchAction).toHaveBeenCalledWith('rotate-right');
        });

        it('should dispatch flip-x action on pGalleryFlipX click', async () => {
            spyOn(gallery, 'dispatchAction').and.callThrough();

            const btn = fixture.debugElement.query(By.css('#flip-x-btn'));
            btn.nativeElement.click();
            await fixture.whenStable();

            expect(gallery.dispatchAction).toHaveBeenCalledWith('flip-x');
        });

        it('should dispatch flip-y action on pGalleryFlipY click', async () => {
            spyOn(gallery, 'dispatchAction').and.callThrough();

            const btn = fixture.debugElement.query(By.css('#flip-y-btn'));
            btn.nativeElement.click();
            await fixture.whenStable();

            expect(gallery.dispatchAction).toHaveBeenCalledWith('flip-y');
        });

        it('should dispatch download action on pGalleryDownload click', async () => {
            spyOn(gallery, 'dispatchAction').and.callThrough();

            const btn = fixture.debugElement.query(By.css('#download-btn'));
            btn.nativeElement.click();
            await fixture.whenStable();

            expect(gallery.dispatchAction).toHaveBeenCalledWith('download');
        });
    });

    describe('Zoom Disabled States', () => {
        it('should not disable pGalleryZoomIn when not zoomed', () => {
            const zoomInBtn = fixture.debugElement.query(By.directive(GalleryZoomIn));
            expect(zoomInBtn.nativeElement.getAttribute('disabled')).toBeNull();
        });

        it('should disable pGalleryZoomOut when not zoomed', () => {
            const zoomOutBtn = fixture.debugElement.query(By.directive(GalleryZoomOut));
            expect(zoomOutBtn.nativeElement.disabled).toBe(true);
        });

        it('should update disabled states when zoom state changes', async () => {
            gallery.reportItemState({ zoomed: true, rotated: false, flipped: false });
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const zoomInBtn = fixture.debugElement.query(By.directive(GalleryZoomIn));
            const zoomOutBtn = fixture.debugElement.query(By.directive(GalleryZoomOut));

            expect(zoomInBtn.nativeElement.disabled).toBe(true);
            expect(zoomOutBtn.nativeElement.getAttribute('disabled')).toBeNull();
        });
    });

    describe('Zoom Toggle', () => {
        it('should dispatch zoomIn when not zoomed', async () => {
            spyOn(gallery, 'handleClickAction').and.callThrough();

            const btn = fixture.debugElement.query(By.css('#zoom-toggle-btn'));
            btn.nativeElement.click();
            await fixture.whenStable();

            expect(gallery.handleClickAction).toHaveBeenCalledWith('zoomIn');
        });

        it('should dispatch zoomOut when zoomed', async () => {
            gallery.reportItemState({ zoomed: true, rotated: false, flipped: false });
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            spyOn(gallery, 'handleClickAction').and.callThrough();

            const btn = fixture.debugElement.query(By.css('#zoom-toggle-btn'));
            btn.nativeElement.click();
            await fixture.whenStable();

            expect(gallery.handleClickAction).toHaveBeenCalledWith('zoomOut');
        });
    });

    describe('Fullscreen', () => {
        it('should toggle fullscreen on pGalleryFullScreen click', async () => {
            const btn = fixture.debugElement.query(By.css('#fullscreen-btn'));
            btn.nativeElement.click();
            await fixture.whenStable();

            expect(gallery.isFullscreen()).toBe(true);
        });

        it('should set data-fullscreen on gallery root when fullscreen', async () => {
            gallery.toggleFullScreen();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(galleryEl.nativeElement.getAttribute('data-fullscreen')).toBe('');
        });

        it('should remove data-fullscreen when exiting fullscreen', async () => {
            gallery.toggleFullScreen();
            await fixture.whenStable();

            gallery.toggleFullScreen();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(galleryEl.nativeElement.getAttribute('data-fullscreen')).toBeNull();
        });

        it('should set data-fullscreen on fullscreen button', async () => {
            gallery.toggleFullScreen();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const btn = fixture.debugElement.query(By.directive(GalleryFullScreen));
            expect(btn.nativeElement.getAttribute('data-fullscreen')).toBe('');
        });
    });

    describe('Gallery Data Attributes from Item State', () => {
        it('should set data-zoomed when item reports zoomed state', async () => {
            gallery.reportItemState({ zoomed: true, rotated: false, flipped: false });
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(galleryEl.nativeElement.getAttribute('data-zoomed')).toBe('');
        });

        it('should set data-rotated when item reports rotated state', async () => {
            gallery.reportItemState({ zoomed: false, rotated: true, flipped: false });
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(galleryEl.nativeElement.getAttribute('data-rotated')).toBe('');
        });

        it('should set data-flipped when item reports flipped state', async () => {
            gallery.reportItemState({ zoomed: false, rotated: false, flipped: true });
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(galleryEl.nativeElement.getAttribute('data-flipped')).toBe('');
        });
    });

    describe('GalleryItem Transform Methods', () => {
        let activeItem: GalleryItem;

        beforeEach(async () => {
            const items = fixture.debugElement.queryAll(By.directive(GalleryItem));
            activeItem = items[0].componentInstance;
            await fixture.whenStable();
        });

        it('should zoom in to zoomedScale', () => {
            activeItem.zoomIn();
            expect(activeItem.scale()).toBe(3);
        });

        it('should zoom out to normalScale and reset position', () => {
            activeItem.zoomIn();
            activeItem.position.set({ x: 50, y: 50 });

            activeItem.zoomOut();

            expect(activeItem.scale()).toBe(1);
            expect(activeItem.position()).toEqual({ x: 0, y: 0 });
        });

        it('should rotate left by 90 degrees', () => {
            activeItem.rotateLeft();
            expect(activeItem.rotation()).toBe(-90);
        });

        it('should rotate right by 90 degrees', () => {
            activeItem.rotateRight();
            expect(activeItem.rotation()).toBe(90);
        });

        it('should flip x', () => {
            activeItem.flipX();
            expect(activeItem.flip().x).toBe(-1);

            activeItem.flipX();
            expect(activeItem.flip().x).toBe(1);
        });

        it('should flip y', () => {
            activeItem.flipY();
            expect(activeItem.flip().y).toBe(-1);

            activeItem.flipY();
            expect(activeItem.flip().y).toBe(1);
        });

        it('should accumulate rotations', () => {
            activeItem.rotateRight();
            activeItem.rotateRight();
            expect(activeItem.rotation()).toBe(180);
        });
    });

    describe('GalleryItem State Reporting', () => {
        let activeItem: GalleryItem;

        beforeEach(async () => {
            const items = fixture.debugElement.queryAll(By.directive(GalleryItem));
            activeItem = items[0].componentInstance;
            await fixture.whenStable();
        });

        it('should report zoomed state to gallery', async () => {
            activeItem.zoomIn();
            await fixture.whenStable();

            expect(gallery.activeItemTransform().zoomed).toBe(true);
        });

        it('should report rotated state to gallery', async () => {
            activeItem.rotateRight();
            await fixture.whenStable();

            expect(gallery.activeItemTransform().rotated).toBe(true);
        });

        it('should report flipped state to gallery', async () => {
            activeItem.flipX();
            await fixture.whenStable();

            expect(gallery.activeItemTransform().flipped).toBe(true);
        });

        it('should report not zoomed after zoom out', async () => {
            activeItem.zoomIn();
            await fixture.whenStable();
            expect(gallery.activeItemTransform().zoomed).toBe(true);

            activeItem.zoomOut();
            await fixture.whenStable();
            expect(gallery.activeItemTransform().zoomed).toBe(false);
        });
    });

    describe('Gallery Methods', () => {
        it('should handle handleNext correctly', () => {
            gallery.handleNext();
            expect(gallery.activeIndex()).toBe(1);

            gallery.handleNext();
            expect(gallery.activeIndex()).toBe(2);

            gallery.handleNext();
            expect(gallery.activeIndex()).toBe(0);
        });

        it('should handle handlePrev correctly', () => {
            gallery.handlePrev();
            expect(gallery.activeIndex()).toBe(2);

            gallery.handlePrev();
            expect(gallery.activeIndex()).toBe(1);

            gallery.handlePrev();
            expect(gallery.activeIndex()).toBe(0);
        });

        it('should not change index when itemCounter is 0', () => {
            const originalCounter = gallery.itemCounter;
            gallery.itemCounter = 0;

            gallery.handleNext();
            expect(gallery.activeIndex()).toBe(0);

            gallery.handlePrev();
            expect(gallery.activeIndex()).toBe(0);

            gallery.itemCounter = originalCounter;
        });

        it('should ignore selectItem with out-of-range index', () => {
            gallery.selectItem(-1);
            expect(gallery.activeIndex()).toBe(0);

            gallery.selectItem(99);
            expect(gallery.activeIndex()).toBe(0);
        });

        it('should dispatch and clear pending action', () => {
            gallery.dispatchAction('zoom-in');
            expect(gallery.pendingAction()).toBeTruthy();
            expect(gallery.pendingAction()!.type).toBe('zoom-in');

            gallery.clearPendingAction();
            expect(gallery.pendingAction()).toBeNull();
        });
    });

    describe('Thumbnail', () => {
        it('should render thumbnail section', () => {
            const thumbnail = fixture.debugElement.query(By.css('p-gallery-thumbnail'));
            expect(thumbnail).toBeTruthy();
        });

        it('should render carousel inside thumbnail', () => {
            const carousel = fixture.debugElement.query(By.css('p-gallery-thumbnail p-carousel'));
            expect(carousel).toBeTruthy();
        });

        it('should select item via gallery.selectItem', async () => {
            gallery.selectItem(1);
            await fixture.whenStable();

            expect(gallery.activeIndex()).toBe(1);
            expect(component.indexChangeEvent).toBeDefined();
            expect(component.indexChangeEvent.value).toBe(1);
        });

        it('should update active thumbnail when activeIndex changes', async () => {
            gallery.selectItem(2);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const activeThumbnails = fixture.debugElement.queryAll(By.css('[data-active]'));
            expect(activeThumbnails.length).toBeGreaterThan(0);
        });
    });

    describe('Host Classes', () => {
        it('should have gallery class on root', () => {
            expect(galleryEl.nativeElement.classList.toString()).toContain('p-gallery');
        });

        it('should have prev class on prev button', () => {
            const prevBtn = fixture.debugElement.query(By.directive(GalleryPrev));
            expect(prevBtn.nativeElement.classList.toString()).toContain('p-gallery');
        });

        it('should have next class on next button', () => {
            const nextBtn = fixture.debugElement.query(By.directive(GalleryNext));
            expect(nextBtn.nativeElement.classList.toString()).toContain('p-gallery');
        });
    });
});
