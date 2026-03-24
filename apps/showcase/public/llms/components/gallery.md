# Angular Gallery Component

Gallery is an image viewer with zoom, rotate, flip and download capabilities.

## Accessibility

Screen Reader Gallery uses semantic button elements for all interactive controls. The data-scope and data-part attributes identify each part of the gallery for assistive technologies. Use aria-label attributes on buttons to provide accessible names.

## Basic

Gallery provides a composition-based API with sub-components for full control over the layout. Each part of the gallery (header, content, footer, toolbar, thumbnails) is a separate component.

```typescript
import { Component } from '@angular/core';

@Component({
    template: `
        <p-gallery-root style="width: 100%; height: 600px;">
            <p-gallery-backdrop></p-gallery-backdrop>
            <p-gallery-prev>
                <svg data-p-icon="chevron-left"></svg>
            </p-gallery-prev>
            <p-gallery-next>
                <svg data-p-icon="chevron-right"></svg>
            </p-gallery-next>
            <p-gallery-header class="justify-end gap-0.5">
                <p-gallery-rotate-left>
                    <svg data-p-icon="replay"></svg>
                </p-gallery-rotate-left>
                <p-gallery-rotate-right>
                    <svg data-p-icon="refresh"></svg>
                </p-gallery-rotate-right>
                <p-gallery-zoom-in>
                    <svg data-p-icon="search-plus"></svg>
                </p-gallery-zoom-in>
                <p-gallery-zoom-out>
                    <svg data-p-icon="search-minus"></svg>
                </p-gallery-zoom-out>
                <p-gallery-flip-x>
                    <svg data-p-icon="arrows-h"></svg>
                </p-gallery-flip-x>
                <p-gallery-flip-y>
                    <svg data-p-icon="arrows-v"></svg>
                </p-gallery-flip-y>
                <p-gallery-download>
                    <svg data-p-icon="download"></svg>
                </p-gallery-download>
                <p-gallery-full-screen class="group">
                    <svg data-p-icon="arrow-up-right-and-arrow-down-left-from-center" class="group-data-fullscreen:hidden!"></svg>
                    <svg data-p-icon="arrow-down-left-and-arrow-up-right-to-center" class="hidden! group-data-fullscreen:block!"></svg>
                </p-gallery-full-screen>
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
        </p-gallery-root>
    `,
    standalone: true,
    imports: []
})
export class GalleryBasicDemo {
    images: any = photos.map(([id, w, h]) => `https://picsum.photos/id/${id}/${w}/${h}`);
}
```

## Grid

Gallery can be used as a lightbox by combining it with a grid of thumbnails. Click on an image to open the gallery in fullscreen overlay.

```typescript
import { Component, signal } from '@angular/core';

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
            <div class="w-full h-[100dvh] top-0 left-0 !fixed z-[100000] opacity-100 transition-opacity duration-200">
                <p-gallery-root class="w-full h-full" [(activeIndex)]="activeIndex" (onActiveIndexChange)="onActiveIndexChange($event)">
                    <p-gallery-backdrop></p-gallery-backdrop>
                    <p-gallery-prev>
                        <svg data-p-icon="chevron-left"></svg>
                    </p-gallery-prev>
                    <p-gallery-next>
                        <svg data-p-icon="chevron-right"></svg>
                    </p-gallery-next>
                    <p-gallery-header class="justify-end gap-0.5">
                        <p-gallery-rotate-left>
                            <svg data-p-icon="replay"></svg>
                        </p-gallery-rotate-left>
                        <p-gallery-rotate-right>
                            <svg data-p-icon="refresh"></svg>
                        </p-gallery-rotate-right>
                        <p-gallery-zoom-in>
                            <svg data-p-icon="search-plus"></svg>
                        </p-gallery-zoom-in>
                        <p-gallery-zoom-out>
                            <svg data-p-icon="search-minus"></svg>
                        </p-gallery-zoom-out>
                        <p-gallery-flip-x>
                            <svg data-p-icon="arrows-h"></svg>
                        </p-gallery-flip-x>
                        <p-gallery-flip-y>
                            <svg data-p-icon="arrows-v"></svg>
                        </p-gallery-flip-y>
                        <p-gallery-download>
                            <svg data-p-icon="download"></svg>
                        </p-gallery-download>
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
                </p-gallery-root>
            </div>
        }
    `,
    standalone: true,
    imports: []
})
export class GalleryGridDemo {
    images: any = photos.map(([id, w, h]) => `https://picsum.photos/id/${id}/${w}/${h}`);
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

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| backdrop | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the backdrop's DOM element. |
| header | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the header's DOM element. |
| footer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the footer's DOM element. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content's DOM element. |
| item | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the item's DOM element. |
| next | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the next button's DOM element. |
| prev | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the prev button's DOM element. |
| toolbar | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the toolbar's DOM element. |
| toolbarItem | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the toolbar item's DOM element. |
| thumbnail | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the thumbnail's DOM element. |
| thumbnailContent | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the thumbnail content's DOM element. |
| thumbnailItem | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the thumbnail item's DOM element. |
| zoomIn | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the zoom in button's DOM element. |
| zoomOut | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the zoom out button's DOM element. |
| zoomToggle | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the zoom toggle button's DOM element. |
| rotateLeft | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the rotate left button's DOM element. |
| rotateRight | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the rotate right button's DOM element. |
| flipX | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the flip x button's DOM element. |
| flipY | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the flip y button's DOM element. |
| download | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the download button's DOM element. |
| fullScreen | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the fullscreen button's DOM element. |

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

