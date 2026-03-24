import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from 'primeng/bind';
import { GalleryRoot } from './gallery';

/**
 * GalleryThumbnailItem represents an individual thumbnail item.
 * @group Components
 */
@Component({
    selector: 'p-gallery-thumbnail-item, p-galleryThumbnailItem',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('thumbnailItem')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'thumbnailItem'",
        '[attr.data-active]': 'isActive() ? "" : null',
        '(click)': 'onClick()'
    },
    hostDirectives: [Bind]
})
export class GalleryThumbnailItem {
    /**
     * The index of the thumbnail item.
     * @group Props
     */
    index = input<number>();

    gallery = inject(GalleryRoot);

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
