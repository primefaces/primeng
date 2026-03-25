import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';

/**
 * GalleryZoomOut represents the zoom out action button.
 * @group Components
 */
@Component({
    selector: 'p-gallery-zoom-out, p-galleryZoomOut',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('zoomOut')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'zoomOut'",
        '[attr.data-action]': "'zoom-out'",
        '[attr.disabled]': '!gallery.activeItemTransform().zoomed ? true : null',
        '(click)': "gallery.handleClickAction('zoomOut')"
    },
    hostDirectives: [Bind]
})
export class GalleryZoomOut {
    gallery = inject(Gallery);
}
