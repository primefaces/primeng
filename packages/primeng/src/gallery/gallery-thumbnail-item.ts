import { ChangeDetectionStrategy, Component, computed, inject, input, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { Gallery } from './gallery';

/**
 * GalleryThumbnailItem represents an individual thumbnail item.
 * Exposes its content as a TemplateRef so GalleryThumbnail can render it inside a carousel item.
 * @group Components
 */
@Component({
    selector: 'p-gallery-thumbnail-item, p-galleryThumbnailItem',
    standalone: true,
    template: `
        <ng-template #content>
            <ng-content></ng-content>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class GalleryThumbnailItem {
    /**
     * The index of the thumbnail item.
     * @group Props
     */
    index = input<number>();

    gallery = inject(Gallery);

    templateRef = viewChild<TemplateRef<any>>('content');

    isActive = computed(() => {
        const idx = this.index();
        return idx !== undefined && this.gallery.activeIndex() === idx;
    });

    onClick() {
        const idx = this.index();
        if (idx !== undefined) {
            this.gallery.selectItem(idx);
        }
    }
}
