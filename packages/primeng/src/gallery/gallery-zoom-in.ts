import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from 'primeng/bind';
import { GalleryRoot } from './gallery';

/**
 * GalleryZoomIn represents the zoom in action button.
 * @group Components
 */
@Component({
    selector: 'p-gallery-zoom-in, p-galleryZoomIn',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('zoomIn')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'zoomIn'",
        '[attr.data-action]': "'zoom-in'",
        '[attr.disabled]': 'gallery.activeItemTransform().zoomed ? true : null',
        '(click)': "gallery.handleClickAction('zoomIn')"
    },
    hostDirectives: [Bind]
})
export class GalleryZoomIn {
    gallery = inject(GalleryRoot);
}
