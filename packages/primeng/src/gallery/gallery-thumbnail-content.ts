import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';

/**
 * GalleryThumbnailContent represents the thumbnail carousel content area.
 * @group Components
 */
@Component({
    selector: 'p-gallery-thumbnail-content, p-galleryThumbnailContent',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('thumbnailContent')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'thumbnailContent'"
    },
    hostDirectives: [Bind]
})
export class GalleryThumbnailContent {
    gallery = inject(Gallery);
}
