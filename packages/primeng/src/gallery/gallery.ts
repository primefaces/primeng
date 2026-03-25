import { ChangeDetectionStrategy, Component, ElementRef, inject, model, NgModule, output, signal, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { SharedModule } from 'primeng/api';
import type { GalleryActiveIndexChangeEvent, GalleryPassThrough, GalleryPendingAction } from 'primeng/types/gallery';
import { GalleryStyle } from './style/gallerystyle';
import { GalleryItem } from './gallery-item';
import { GalleryHeader } from './gallery-header';
import { GalleryContent } from './gallery-content';
import { GalleryFooter } from './gallery-footer';
import { GalleryBackdrop } from './gallery-backdrop';
import { GalleryToolbar } from './gallery-toolbar';
import { GalleryToolbarItem } from './gallery-toolbar-item';
import { GalleryPrev } from './gallery-prev';
import { GalleryNext } from './gallery-next';
import { GalleryZoomIn } from './gallery-zoom-in';
import { GalleryZoomOut } from './gallery-zoom-out';
import { GalleryZoomToggle } from './gallery-zoom-toggle';
import { GalleryRotateLeft } from './gallery-rotate-left';
import { GalleryRotateRight } from './gallery-rotate-right';
import { GalleryFlipX } from './gallery-flip-x';
import { GalleryFlipY } from './gallery-flip-y';
import { GalleryFullScreen } from './gallery-full-screen';
import { GalleryDownload } from './gallery-download';
import { GalleryThumbnail } from './gallery-thumbnail';
import { GalleryThumbnailContent } from './gallery-thumbnail-content';
import { GalleryThumbnailItem } from './gallery-thumbnail-item';

/**
 * Gallery is the main container component for the Gallery.
 * @group Components
 */
@Component({
    selector: 'p-gallery',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    providers: [GalleryStyle, { provide: PARENT_INSTANCE, useExisting: Gallery }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cx('root')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'root'",
        '[attr.data-fullscreen]': "isFullscreen() ? '' : null",
        '[attr.data-zoomed]': "activeItemTransform().zoomed ? '' : null",
        '[attr.data-rotated]': "activeItemTransform().rotated ? '' : null",
        '[attr.data-flipped]': "activeItemTransform().flipped ? '' : null"
    },
    hostDirectives: [Bind]
})
export class Gallery extends BaseComponent<GalleryPassThrough> {
    componentName = 'Gallery';

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * The index of the active item.
     * @group Props
     * @defaultValue 0
     */
    activeIndex = model<number>(0);

    /**
     * Callback fired when the gallery's active index changes.
     * @param {GalleryActiveIndexChangeEvent} event - Custom active index change event.
     * @group Emits
     */
    onActiveIndexChange = output<GalleryActiveIndexChangeEvent>();

    _componentStyle = inject(GalleryStyle);

    isFullscreen = signal(false);

    activeItemTransform = signal({ zoomed: false, rotated: false, flipped: false });

    pendingAction = signal<GalleryPendingAction | null>(null);

    itemCounter = 0;

    contentEl = signal<HTMLElement | null>(null);

    private _el = inject(ElementRef);

    registerItem(existingIndex: number | null): number {
        if (existingIndex !== null) {
            if (existingIndex >= this.itemCounter) {
                this.itemCounter = existingIndex + 1;
            }
            return existingIndex;
        }
        const newIndex = this.itemCounter;
        this.itemCounter += 1;
        return newIndex;
    }

    handleNext() {
        if (this.itemCounter <= 0) return;
        const newIndex = (this.activeIndex() + 1) % this.itemCounter;
        this.activeIndex.set(newIndex);
        this.onActiveIndexChange.emit({ value: newIndex });
    }

    handlePrev() {
        if (this.itemCounter <= 0) return;
        const newIndex = (this.activeIndex() - 1 + this.itemCounter) % this.itemCounter;
        this.activeIndex.set(newIndex);
        this.onActiveIndexChange.emit({ value: newIndex });
    }

    selectItem(index: number) {
        if (index < 0 || index >= this.itemCounter) return;
        this.activeIndex.set(index);
        this.onActiveIndexChange.emit({ value: index });
    }

    dispatchAction(type: GalleryPendingAction['type']) {
        this.pendingAction.set({ type, timestamp: Date.now() });
    }

    clearPendingAction() {
        this.pendingAction.set(null);
    }

    toggleFullScreen() {
        const el = this._el.nativeElement;
        if (!el) return;

        if (!this.isFullscreen()) {
            el.style.setProperty('position', 'fixed');
            el.style.setProperty('top', '0');
            el.style.setProperty('left', '0');
            el.style.setProperty('width', '100dvw', 'important');
            el.style.setProperty('height', '100dvh', 'important');
            el.style.setProperty('z-index', '9999');
            document.body.style.overflow = 'hidden';
            this.isFullscreen.set(true);
        } else {
            el.style.removeProperty('position');
            el.style.removeProperty('top');
            el.style.removeProperty('left');
            el.style.removeProperty('width');
            el.style.removeProperty('height');
            el.style.removeProperty('z-index');
            document.body.style.overflow = 'auto';
            this.isFullscreen.set(false);
        }

        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
    }

    reportItemState(itemState: { zoomed: boolean; rotated: boolean; flipped: boolean }) {
        this.activeItemTransform.set(itemState);
    }

    handleClickAction(action?: string) {
        if (!action) return;
        const actionMap: Record<string, () => void> = {
            zoomIn: () => this.dispatchAction('zoom-in'),
            zoomOut: () => this.dispatchAction('zoom-out'),
            rotateLeft: () => this.dispatchAction('rotate-left'),
            rotateRight: () => this.dispatchAction('rotate-right'),
            flipX: () => this.dispatchAction('flip-x'),
            flipY: () => this.dispatchAction('flip-y'),
            download: () => this.dispatchAction('download'),
            next: () => this.handleNext(),
            prev: () => this.handlePrev(),
            toggleFullScreen: () => this.toggleFullScreen()
        };
        actionMap[action]?.();
    }

    setContentEl(el: HTMLElement) {
        this.contentEl.set(el);
    }
}

@NgModule({
    imports: [
        Gallery,
        GalleryItem,
        GalleryHeader,
        GalleryContent,
        GalleryFooter,
        GalleryBackdrop,
        GalleryToolbar,
        GalleryToolbarItem,
        GalleryPrev,
        GalleryNext,
        GalleryZoomIn,
        GalleryZoomOut,
        GalleryZoomToggle,
        GalleryRotateLeft,
        GalleryRotateRight,
        GalleryFlipX,
        GalleryFlipY,
        GalleryFullScreen,
        GalleryDownload,
        GalleryThumbnail,
        GalleryThumbnailContent,
        GalleryThumbnailItem,
        SharedModule
    ],
    exports: [
        Gallery,
        GalleryItem,
        GalleryHeader,
        GalleryContent,
        GalleryFooter,
        GalleryBackdrop,
        GalleryToolbar,
        GalleryToolbarItem,
        GalleryPrev,
        GalleryNext,
        GalleryZoomIn,
        GalleryZoomOut,
        GalleryZoomToggle,
        GalleryRotateLeft,
        GalleryRotateRight,
        GalleryFlipX,
        GalleryFlipY,
        GalleryFullScreen,
        GalleryDownload,
        GalleryThumbnail,
        GalleryThumbnailContent,
        GalleryThumbnailItem,
        SharedModule
    ]
})
export class GalleryModule {}
