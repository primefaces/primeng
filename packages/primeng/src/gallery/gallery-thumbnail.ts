import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from 'primeng/bind';
import { GalleryRoot } from './gallery';

/**
 * GalleryThumbnail represents the thumbnail carousel wrapper.
 * @group Components
 */
@Component({
    selector: 'p-gallery-thumbnail, p-galleryThumbnail',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('thumbnail')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'thumbnail'"
    },
    hostDirectives: [Bind]
})
export class GalleryThumbnail {
    gallery = inject(GalleryRoot);
}
