import { afterNextRender, ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, input, numberAttribute, signal, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';
import type { GalleryItemPassThrough } from 'primeng/types/gallery';

/**
 * GalleryItem represents an individual item in the gallery.
 * @group Components
 */
@Component({
    selector: 'p-gallery-item',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    providers: [{ provide: PARENT_INSTANCE, useExisting: GalleryItem }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('item')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'item'",
        '[attr.data-index]': 'index()',
        '[attr.data-active]': 'dataActive()',
        '[style.--position-x]': 'stylePositionX()',
        '[style.--position-y]': 'stylePositionY()',
        '[style.--scale]': 'scale()',
        '[style.--rotation]': 'styleRotation()',
        '[style.--flip-x]': 'styleFlipX()',
        '[style.--flip-y]': 'styleFlipY()',
        '(click)': 'handleClick($event)',
        '(pointerdown)': 'handlePointerDown($event)',
        '(pointermove)': 'handlePointerMove($event)',
        '(pointerup)': 'handlePointerUp($event)',
        '(dragstart)': 'handleDragStart($event)'
    },
    hostDirectives: [Bind]
})
export class GalleryItem extends BaseComponent<GalleryItemPassThrough> {
    componentName = 'GalleryItem';
    bindDirectiveInstance = inject(Bind, { self: true });

    /**
     * The normal scale of the gallery item.
     * @group Props
     * @defaultValue 1
     */
    normalScale = input(1, { transform: numberAttribute });

    /**
     * The zoomed scale of the gallery item.
     * @group Props
     * @defaultValue 3
     */
    zoomedScale = input(3, { transform: numberAttribute });

    gallery = inject(Gallery);

    private _destroyRef = inject(DestroyRef);

    index = signal(-1);

    isActive = computed(() => this.gallery.activeIndex() === this.index());
    dataActive = computed(() => (this.isActive() ? 'true' : 'false'));
    stylePositionX = computed(() => this.position().x + 'px');
    stylePositionY = computed(() => this.position().y + 'px');
    styleRotation = computed(() => this.rotation() + 'deg');
    styleFlipX = computed(() => this.flip().x);
    styleFlipY = computed(() => this.flip().y);

    position = signal({ x: 0, y: 0 });

    scale = signal(1);

    rotation = signal(0);

    flip = signal({ x: 1, y: 1 });

    private registeredIndex: number | null = null;

    private pointerData = new Map<number, { x: number; y: number }>();

    private pointerStart = { x: 0, y: 0 };

    private initialPinchDistance = 0;

    private initialPinchScale = 1;

    private liveScale = 1;

    private livePosition = { x: 0, y: 0 };

    private isDragging = false;

    private dragStart = { x: 0, y: 0 };

    private hasDragged = false;

    private wheelSyncTimer: ReturnType<typeof setTimeout> | null = null;

    private wheelListener: (() => void) | null = null;

    private resizeListener: (() => void) | null = null;

    private imageLoadListener: (() => void) | null = null;

    constructor() {
        super();
        afterNextRender(() => {
            const newIndex = this.gallery.registerItem(this.registeredIndex);
            this.registeredIndex = newIndex;
            if (newIndex !== this.index()) {
                this.index.set(newIndex);
            }
            this.setupWheelListener();
            this.setupResizeListener();
            this.setupImageLoadListener();
        });

        // Watch activeIndex to recalculate item size
        effect(() => {
            const activeIndex = this.gallery.activeIndex();
            const idx = this.index();
            if (activeIndex === idx) {
                this.calculateItemSize();
            }
        });

        // Watch rotation changes to recalculate item size
        effect(() => {
            this.rotation(); // track rotation
            const activeIndex = this.gallery.activeIndex();
            const idx = this.index();
            if (activeIndex === idx) {
                this.calculateItemSize();
            }
        });

        // Watch fullscreen changes to recalculate item size
        effect(() => {
            this.gallery.isFullscreen(); // track fullscreen
            const activeIndex = this.gallery.activeIndex();
            const idx = this.index();
            if (activeIndex === idx) {
                this.calculateItemSize();
            }
        });

        // Watch pendingAction and execute on active item
        effect(() => {
            const action = this.gallery.pendingAction();
            if (!action || !this.isActive()) return;

            switch (action.type) {
                case 'zoom-in':
                    this.zoomIn();
                    break;
                case 'zoom-out':
                    this.zoomOut();
                    break;
                case 'rotate-left':
                    this.rotateLeft();
                    break;
                case 'rotate-right':
                    this.rotateRight();
                    break;
                case 'flip-x':
                    this.flipX();
                    break;
                case 'flip-y':
                    this.flipY();
                    break;
                case 'download':
                    this.download();
                    break;
            }

            this.gallery.clearPendingAction();
        });

        // Report item state to gallery
        effect(() => {
            const active = this.isActive();
            const s = this.scale();
            const r = this.rotation();
            const f = this.flip();
            const ns = this.normalScale();
            if (active) {
                this.gallery.reportItemState({
                    zoomed: s > ns,
                    rotated: r !== 0,
                    flipped: f.x === -1 || f.y === -1
                });
            }
        });

        // Reset position when scale <= 1
        effect(() => {
            if (this.scale() <= 1) {
                this.position.set({ x: 0, y: 0 });
            }
        });

        this._destroyRef.onDestroy(() => {
            this.wheelListener?.();
            this.resizeListener?.();
            this.imageLoadListener?.();
            if (this.wheelSyncTimer) {
                clearTimeout(this.wheelSyncTimer);
            }
        });
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    private setupImageLoadListener() {
        const el = this.$el as HTMLElement;
        const imageElement = el.querySelector('img') as HTMLImageElement;
        if (!imageElement) return;

        if (imageElement.complete && imageElement.naturalWidth > 0) {
            this.calculateItemSize();
        }

        const handler = () => {
            this.calculateItemSize();
        };
        imageElement.addEventListener('load', handler);
        this.imageLoadListener = () => imageElement.removeEventListener('load', handler);
    }

    private setupWheelListener() {
        const el = this.$el as HTMLElement;
        const handler = (e: WheelEvent) => {
            if (!e.ctrlKey || !this.isActive()) return;

            e.preventDefault();
            el.style.transition = 'none';

            const delta = -e.deltaY;
            const scaleFactor = 1 + delta * 0.01;
            const newScale = Math.max(this.normalScale(), Math.min(this.zoomedScale(), this.liveScale * scaleFactor));

            const constraints = this.calculateConstraints(newScale);
            const constrainedX = Math.max(constraints.minX, Math.min(constraints.maxX, this.livePosition.x));
            const constrainedY = Math.max(constraints.minY, Math.min(constraints.maxY, this.livePosition.y));

            this.liveScale = newScale;
            this.livePosition = { x: constrainedX, y: constrainedY };

            el.style.setProperty('--scale', `${newScale}`);
            el.style.setProperty('--position-x', `${constrainedX}px`);
            el.style.setProperty('--position-y', `${constrainedY}px`);

            if (this.wheelSyncTimer) {
                clearTimeout(this.wheelSyncTimer);
            }

            this.wheelSyncTimer = setTimeout(() => {
                el.style.transition = '';
                el.style.cursor = this.liveScale > this.normalScale() ? 'zoom-out' : 'zoom-in';
                this.scale.set(this.liveScale);
                this.position.set(this.livePosition);
                this.wheelSyncTimer = null;
            }, 150);
        };

        el.addEventListener('wheel', handler, { passive: false });
        this.wheelListener = () => el.removeEventListener('wheel', handler);
    }

    private setupResizeListener() {
        const handler = () => {
            if (this.gallery.activeIndex() === this.index()) {
                this.calculateItemSize();
            }
        };
        window.addEventListener('resize', handler);
        this.resizeListener = () => window.removeEventListener('resize', handler);
    }

    calculateItemSize() {
        const contentEl = this.gallery.contentEl();
        const el = this.$el as HTMLElement;
        if (!contentEl || !el) return;

        const contentRect = contentEl.getBoundingClientRect();
        const imageElement = el.firstElementChild as HTMLImageElement;
        if (!imageElement) return;

        let naturalWidth = imageElement.naturalWidth || imageElement.offsetWidth;
        let naturalHeight = imageElement.naturalHeight || imageElement.offsetHeight;
        if (naturalWidth === 0 || naturalHeight === 0) return;

        const isRotated = Math.abs(this.rotation()) % 180 === 90;

        if (isRotated) {
            [naturalWidth, naturalHeight] = [naturalHeight, naturalWidth];
        }

        const naturalAspectRatio = naturalWidth / naturalHeight;
        const contentAspectRatio = contentRect.width / contentRect.height;

        let targetWidth: number, targetHeight: number;

        if (naturalAspectRatio > contentAspectRatio) {
            targetWidth = Math.min(contentRect.width * 0.99, naturalWidth);
            targetHeight = targetWidth / naturalAspectRatio;
        } else {
            targetHeight = Math.min(contentRect.height * 0.99, naturalHeight);
            targetWidth = targetHeight * naturalAspectRatio;
        }

        if (isRotated) {
            imageElement.style.width = `${targetHeight}px`;
            imageElement.style.height = `${targetWidth}px`;
            el.style.width = `${targetHeight > 0 ? targetHeight : 'auto'}px`;
            el.style.height = `${targetWidth > 0 ? targetWidth : 'auto'}px`;
        } else {
            imageElement.style.width = `${targetWidth}px`;
            imageElement.style.height = `${targetHeight}px`;
            el.style.width = `${targetWidth > 0 ? targetWidth : 'auto'}px`;
            el.style.height = `${targetHeight > 0 ? targetHeight : 'auto'}px`;
        }

        el.style.aspectRatio = `${naturalWidth / naturalHeight}`;
    }

    calculateConstraints(targetScale?: number) {
        const contentEl = this.gallery.contentEl();
        const el = this.$el as HTMLElement;
        if (!contentEl || !el) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };

        const contentRect = contentEl.getBoundingClientRect();
        const scaleToUse = targetScale !== undefined ? targetScale : this.liveScale;

        const itemElement = el.firstElementChild as HTMLElement;
        if (!itemElement) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };

        let originalWidth = itemElement.offsetWidth;
        let originalHeight = itemElement.offsetHeight;

        const isRotated = Math.abs(this.rotation()) % 180 === 90;
        if (isRotated) {
            [originalWidth, originalHeight] = [originalHeight, originalWidth];
        }

        const scaledWidth = originalWidth * scaleToUse;
        const scaledHeight = originalHeight * scaleToUse;

        const contentCenterX = contentRect.width / 2;
        const contentCenterY = contentRect.height / 2;

        const halfScaledWidth = scaledWidth / 2;
        const halfScaledHeight = scaledHeight / 2;

        const maxX = halfScaledWidth > contentCenterX ? halfScaledWidth - contentCenterX : 0;
        const minX = halfScaledWidth > contentCenterX ? -(halfScaledWidth - contentCenterX) : 0;

        const maxY = halfScaledHeight > contentCenterY ? halfScaledHeight - contentCenterY : 0;
        const minY = halfScaledHeight > contentCenterY ? -(halfScaledHeight - contentCenterY) : 0;

        return { minX, maxX, minY, maxY };
    }

    zoomIn() {
        this.scale.set(this.zoomedScale());
        const el = this.$el as HTMLElement;
        if (el) {
            el.style.cursor = 'zoom-out';
        }
    }

    zoomOut() {
        this.scale.set(this.normalScale());
        this.position.set({ x: 0, y: 0 });
        const el = this.$el as HTMLElement;
        if (el) {
            el.style.cursor = 'zoom-in';
        }
    }

    rotateLeft() {
        const el = this.$el as HTMLElement;
        if (!el) return;
        el.style.transition = 'none';
        this.rotation.update((prev) => prev - 90);
        setTimeout(() => {
            el.style.transition = '';
        }, 0);
    }

    rotateRight() {
        const el = this.$el as HTMLElement;
        if (!el) return;
        el.style.transition = 'none';
        this.rotation.update((prev) => prev + 90);
        setTimeout(() => {
            el.style.transition = '';
        }, 0);
    }

    flipX() {
        this.flip.update((prev) => ({ ...prev, x: Math.sign(prev.x) * -1 }));
    }

    flipY() {
        this.flip.update((prev) => ({ ...prev, y: Math.sign(prev.y) * -1 }));
    }

    download() {
        const el = this.$el as HTMLElement;
        if (!el) return;

        const imageElement = el.querySelector('img') as HTMLImageElement;
        if (!imageElement || !imageElement.src) return;

        const link = document.createElement('a');
        link.href = imageElement.src;

        const urlParts = imageElement.src.split('/');
        const filename = urlParts[urlParts.length - 1] || 'image.jpg';

        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    handleClick(e: MouseEvent) {
        if (this.hasDragged) {
            this.hasDragged = false;
            return;
        }

        const el = this.$el as HTMLElement;

        if (this.liveScale === this.normalScale()) {
            if (el) {
                const itemRect = el.getBoundingClientRect();
                const itemCenterX = itemRect.width / 2;
                const itemCenterY = itemRect.height / 2;

                const clickX = e.clientX - itemRect.left;
                const clickY = e.clientY - itemRect.top;

                const offsetX = itemCenterX - clickX;
                const offsetY = itemCenterY - clickY;

                const zoomedScale = this.zoomedScale();
                const zoomOffsetX = offsetX * (zoomedScale - 1);
                const zoomOffsetY = offsetY * (zoomedScale - 1);

                const constraints = this.calculateConstraints(zoomedScale);
                const constrainedX = Math.max(constraints.minX, Math.min(constraints.maxX, zoomOffsetX));
                const constrainedY = Math.max(constraints.minY, Math.min(constraints.maxY, zoomOffsetY));

                this.position.set({ x: constrainedX, y: constrainedY });
            }
            this.zoomIn();
        } else {
            this.zoomOut();
        }
    }

    handleDragStart(e: DragEvent) {
        e.preventDefault();
    }

    handlePointerDown(e: PointerEvent) {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        this.pointerData.set(e.pointerId, { x: e.clientX, y: e.clientY });
        this.pointerStart = { x: e.clientX, y: e.clientY };

        if (e.pointerType === 'touch' && this.pointerData.size >= 2) {
            this.isDragging = false;
            this.initialPinchDistance = 0;
            this.initialPinchScale = this.liveScale;
        } else if (this.liveScale > 1) {
            if (e.pointerType === 'mouse' || (e.pointerType === 'touch' && this.pointerData.size === 1)) {
                this.isDragging = true;
                this.dragStart = { x: e.clientX - this.livePosition.x, y: e.clientY - this.livePosition.y };
                this.hasDragged = false;
            }
        }
    }

    handlePointerMove(e: PointerEvent) {
        if (!this.pointerData.has(e.pointerId)) return;

        const el = this.$el as HTMLElement;
        if (!el) return;

        el.style.transition = 'none';

        if (e.pointerType === 'mouse' && !el.style.cursor) {
            el.style.cursor = this.liveScale > this.normalScale() ? 'zoom-out' : 'zoom-in';
        }

        this.pointerData.set(e.pointerId, { x: e.clientX, y: e.clientY });

        const pointers = Array.from(this.pointerData.values());

        if (pointers.length === 2) {
            const [p1, p2] = pointers;
            const distance = Math.hypot(p2.x - p1.x, p2.y - p1.y);

            this.hasDragged = true;

            if (this.initialPinchDistance === 0) {
                this.initialPinchDistance = distance;
                this.initialPinchScale = this.liveScale;
            } else {
                const ratio = distance / this.initialPinchDistance;
                const newScale = Math.max(this.normalScale(), Math.min(this.zoomedScale(), this.initialPinchScale * ratio));

                const constraints = this.calculateConstraints(newScale);
                const constrainedX = Math.max(constraints.minX, Math.min(constraints.maxX, this.livePosition.x));
                const constrainedY = Math.max(constraints.minY, Math.min(constraints.maxY, this.livePosition.y));

                this.liveScale = newScale;
                this.livePosition = { x: constrainedX, y: constrainedY };

                el.style.setProperty('--scale', `${newScale}`);
                el.style.setProperty('--position-x', `${constrainedX}px`);
                el.style.setProperty('--position-y', `${constrainedY}px`);
            }
        } else if (pointers.length === 1 && this.isDragging) {
            const pointer = pointers[0];
            const newX = pointer.x - this.dragStart.x;
            const newY = pointer.y - this.dragStart.y;
            const constraints = this.calculateConstraints(this.liveScale);

            const computedX = Math.max(constraints.minX, Math.min(constraints.maxX, newX));
            const computedY = Math.max(constraints.minY, Math.min(constraints.maxY, newY));

            this.livePosition = { x: computedX, y: computedY };

            el.style.setProperty('--position-x', `${computedX}px`);
            el.style.setProperty('--position-y', `${computedY}px`);

            const distFromStart = Math.hypot(pointer.x - this.pointerStart.x, pointer.y - this.pointerStart.y);
            if (distFromStart > 5) {
                this.hasDragged = true;
            }
        }
    }

    handlePointerUp(e: PointerEvent) {
        const el = this.$el as HTMLElement;
        if (!el) return;

        el.style.transition = '';

        if (e.pointerType === 'mouse') {
            el.style.cursor = this.liveScale > this.normalScale() ? 'zoom-out' : 'zoom-in';
        }

        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        this.pointerData.delete(e.pointerId);

        if (this.pointerData.size < 2) {
            this.initialPinchDistance = 0;
            this.initialPinchScale = 1;
        }

        if (this.pointerData.size === 0) {
            this.isDragging = false;
            this.scale.set(this.liveScale);
            this.position.set(this.livePosition);
        }
    }
}
