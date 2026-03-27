# Angular Gallery Component

Gallery is an image viewer with zoom, rotate, flip and download capabilities.

## Accessibility

Screen Reader Gallery uses semantic button elements for all interactive controls. The data-scope and data-part attributes identify each part of the gallery for assistive technologies. Use aria-label attributes on buttons to provide accessible names.

## Basic

Gallery provides a composition-based API with sub-components for full control over the layout. Each part of the gallery (header, content, footer, toolbar, thumbnails) is a separate component.

```typescript
import { Component } from '@angular/core';
import { GalleryModule } from 'primeng/gallery';
import { ChevronLeft } from '@primeicons/angular/chevron-left';
import { ChevronRight } from '@primeicons/angular/chevron-right';
import { Replay } from '@primeicons/angular/replay';
import { Refresh } from '@primeicons/angular/refresh';
import { SearchPlus } from '@primeicons/angular/search-plus';
import { SearchMinus } from '@primeicons/angular/search-minus';
import { ArrowsH } from '@primeicons/angular/arrows-h';
import { ArrowsV } from '@primeicons/angular/arrows-v';
import { Download } from '@primeicons/angular/download';
import { ArrowUpRightAndArrowDownLeftFromCenter } from '@primeicons/angular/arrow-up-right-and-arrow-down-left-from-center';
import { ArrowDownLeftAndArrowUpRightToCenter } from '@primeicons/angular/arrow-down-left-and-arrow-up-right-to-center';

@Component({
    template: `
        <p-gallery class="w-full h-150!">
            <p-gallery-backdrop></p-gallery-backdrop>
            <button pGalleryPrev>
                <svg data-p-icon="chevron-left"></svg>
            </button>
            <button pGalleryNext>
                <svg data-p-icon="chevron-right"></svg>
            </button>
            <p-gallery-header class="justify-end gap-0.5">
                <button pGalleryRotateLeft>
                    <svg data-p-icon="replay"></svg>
                </button>
                <button pGalleryRotateRight>
                    <svg data-p-icon="refresh"></svg>
                </button>
                <button pGalleryZoomIn>
                    <svg data-p-icon="search-plus"></svg>
                </button>
                <button pGalleryZoomOut>
                    <svg data-p-icon="search-minus"></svg>
                </button>
                <button pGalleryFlipX>
                    <svg data-p-icon="arrows-h"></svg>
                </button>
                <button pGalleryFlipY>
                    <svg data-p-icon="arrows-v"></svg>
                </button>
                <button pGalleryDownload>
                    <svg data-p-icon="download"></svg>
                </button>
                <button pGalleryFullScreen class="group">
                    <svg data-p-icon="arrow-up-right-and-arrow-down-left-from-center" class="group-data-fullscreen:hidden!"></svg>
                    <svg data-p-icon="arrow-down-left-and-arrow-up-right-to-center" class="hidden! group-data-fullscreen:block!"></svg>
                </button>
            </p-gallery-header>
            <p-gallery-content>
                @for (image of images; track image) {
                    <p-gallery-item>
                        <img [src]="image" alt="image" />
                    </p-gallery-item>
                }
            </p-gallery-content>
            <p-gallery-footer>
                <p-gallery-thumbnail>
                    <p-gallery-thumbnail-content>
                        @for (image of images; track image; let i = $index) {
                            <p-gallery-thumbnail-item [index]="i">
                                <img [attr.draggable]="false" [src]="image" class="h-full w-full object-cover" />
                            </p-gallery-thumbnail-item>
                        }
                    </p-gallery-thumbnail-content>
                </p-gallery-thumbnail>
            </p-gallery-footer>
        </p-gallery>
    `,
    standalone: true,
    imports: [GalleryModule, ChevronLeft, ChevronRight, Replay, Refresh, SearchPlus, SearchMinus, ArrowsH, ArrowsV, Download, ArrowUpRightAndArrowDownLeftFromCenter, ArrowDownLeftAndArrowUpRightToCenter]
})
export class GalleryBasicDemo {
    photos: [number, number, number][] = [
        [10, 1200, 800],
        [11, 800, 1200],
        [15, 1400, 700],
        [16, 700, 1050],
        [17, 1000, 1000],
        [18, 1300, 650],
        [19, 600, 1200],
        [20, 1200, 900],
        [27, 750, 1125],
        [28, 1400, 800],
        [29, 800, 1100],
        [36, 1100, 700],
        [37, 650, 1300],
        [39, 1200, 750],
        [42, 900, 1200],
        [43, 1300, 800],
        [47, 700, 1400],
        [48, 1000, 800],
        [49, 800, 1000],
        [50, 1400, 600],
        [52, 600, 900],
        [53, 1200, 1200],
        [54, 900, 600],
        [55, 750, 1000],
        [56, 1100, 800],
        [57, 1400, 900],
        [58, 850, 1275],
        [59, 1000, 600],
        [60, 600, 1000],
        [64, 1300, 1300]
    ];
    images: any = this.photos.map(([id, w, h]) => `https://picsum.photos/id/${id}/${w}/${h}`);
}
```

## Grid

Gallery can be used as a lightbox by combining it with a grid of thumbnails. Click on an image to open the gallery in fullscreen overlay.

```typescript
import { Component, signal } from '@angular/core';
import { GalleryModule } from 'primeng/gallery';
import { ChevronLeft } from '@primeicons/angular/chevron-left';
import { ChevronRight } from '@primeicons/angular/chevron-right';
import { Replay } from '@primeicons/angular/replay';
import { Refresh } from '@primeicons/angular/refresh';
import { SearchPlus } from '@primeicons/angular/search-plus';
import { SearchMinus } from '@primeicons/angular/search-minus';
import { ArrowsH } from '@primeicons/angular/arrows-h';
import { ArrowsV } from '@primeicons/angular/arrows-v';
import { Download } from '@primeicons/angular/download';
import { Times } from '@primeicons/angular/times';

@Component({
    template: `
        <div class="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 gap-2">
            @for (image of images; track image; let i = $index) {
                <div class="aspect-square cursor-pointer hover:opacity-75 transition-opacity" (click)="handleOpen(i)">
                    <img [src]="image" alt="image" class="w-full h-full object-cover rounded-lg" />
                </div>
            }
        </div>
        @if (open()) {
            <div class="w-full h-dvh top-0 left-0 fixed! z-100000 opacity-100 transition-opacity duration-200">
                <p-gallery [(activeIndex)]="activeIndex" (onActiveIndexChange)="onActiveIndexChange($event)">
                    <p-gallery-backdrop></p-gallery-backdrop>
                    <button pGalleryPrev>
                        <svg data-p-icon="chevron-left"></svg>
                    </button>
                    <button pGalleryNext>
                        <svg data-p-icon="chevron-right"></svg>
                    </button>
                    <p-gallery-header class="justify-end gap-0.5">
                        <button pGalleryRotateLeft>
                            <svg data-p-icon="replay"></svg>
                        </button>
                        <button pGalleryRotateRight>
                            <svg data-p-icon="refresh"></svg>
                        </button>
                        <button pGalleryZoomIn>
                            <svg data-p-icon="search-plus"></svg>
                        </button>
                        <button pGalleryZoomOut>
                            <svg data-p-icon="search-minus"></svg>
                        </button>
                        <button pGalleryFlipX>
                            <svg data-p-icon="arrows-h"></svg>
                        </button>
                        <button pGalleryFlipY>
                            <svg data-p-icon="arrows-v"></svg>
                        </button>
                        <button pGalleryDownload>
                            <svg data-p-icon="download"></svg>
                        </button>
                        <button class="p-gallery-action" (click)="close()">
                            <svg data-p-icon="times"></svg>
                        </button>
                    </p-gallery-header>
                    <p-gallery-content>
                        @for (image of images; track image) {
                            <p-gallery-item>
                                <img [src]="image" alt="image" />
                            </p-gallery-item>
                        }
                    </p-gallery-content>
                    <p-gallery-footer>
                        <p-gallery-thumbnail>
                            <p-gallery-thumbnail-content>
                                @for (image of images; track image; let i = $index) {
                                    <p-gallery-thumbnail-item [index]="i">
                                        <img [attr.draggable]="false" [src]="image" class="h-full w-full object-cover" />
                                    </p-gallery-thumbnail-item>
                                }
                            </p-gallery-thumbnail-content>
                        </p-gallery-thumbnail>
                    </p-gallery-footer>
                </p-gallery>
            </div>
        }
    `,
    standalone: true,
    imports: [GalleryModule, ChevronLeft, ChevronRight, Replay, Refresh, SearchPlus, SearchMinus, ArrowsH, ArrowsV, Download, Times]
})
export class GalleryGridDemo {
    photos: [number, number, number][] = [
        [10, 1200, 800],
        [11, 800, 1200],
        [15, 1400, 700],
        [16, 700, 1050],
        [17, 1000, 1000],
        [18, 1300, 650],
        [19, 600, 1200],
        [20, 1200, 900],
        [27, 750, 1125],
        [28, 1400, 800],
        [29, 800, 1100],
        [36, 1100, 700],
        [37, 650, 1300],
        [39, 1200, 750],
        [42, 900, 1200],
        [43, 1300, 800],
        [47, 700, 1400],
        [48, 1000, 800],
        [49, 800, 1000],
        [50, 1400, 600],
        [52, 600, 900],
        [53, 1200, 1200],
        [54, 900, 600],
        [55, 750, 1000],
        [56, 1100, 800],
        [57, 1400, 900],
        [58, 850, 1275],
        [59, 1000, 600],
        [60, 600, 1000],
        [64, 1300, 1300]
    ];
    images: any = this.photos.map(([id, w, h]) => `https://picsum.photos/id/${id}/${w}/${h}`);
    activeIndex: number = 0;
    open = signal(false);

    handleOpen(index: number) {
        this.activeIndex = index;
        this.open.set(true);
    }

    close() {
        this.open.set(false);
    }

    onActiveIndexChange(event: GalleryActiveIndexChangeEvent) {
        this.activeIndex = event.value;
    }
}
```

## Gallery

Gallery is the main container component for the Gallery.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | Object | undefined | Defines scoped design tokens of the component. |
| unstyled | boolean | undefined | Indicates whether the component should be rendered without styles. |
| pt | PassThrough<I, GalleryPassThroughOptions<I>> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | PassThroughOptions | undefined | Used to configure passthrough(pt) options of the component. |
| activeIndex | number | 0 | The index of the active item. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onActiveIndexChange | event: GalleryActiveIndexChangeEvent | Callback fired when the gallery's active index changes. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLElement, I> | Used to pass attributes to the root's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-gallery | Class name of the root element |
| p-gallery-backdrop | Class name of the backdrop element |
| p-gallery-header | Class name of the header element |
| p-gallery-footer | Class name of the footer element |
| p-gallery-content | Class name of the content element |
| p-gallery-item | Class name of the item element |
| p-gallery-next | Class name of the next button element |
| p-gallery-prev | Class name of the prev button element |
| p-gallery-toolbar | Class name of the toolbar element |
| p-gallery-toolbar-item | Class name of the toolbar item element |
| p-gallery-action | Class name of the action element |
| p-gallery-thumbnail | Class name of the thumbnail element |
| p-gallery-thumbnail-content | Class name of the thumbnail content element |
| p-gallery-thumbnail-item | Class name of the thumbnail item element |

