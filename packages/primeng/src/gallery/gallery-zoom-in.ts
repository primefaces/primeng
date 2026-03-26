import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';
import type { GalleryZoomInPassThrough } from 'primeng/types/gallery';

/**
 * GalleryZoomIn represents the zoom in action button.
 * @group Components
 */
@Component({
    selector: 'p-gallery-zoom-in',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    providers: [{ provide: PARENT_INSTANCE, useExisting: GalleryZoomIn }],
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
export class GalleryZoomIn extends BaseComponent<GalleryZoomInPassThrough> {
    componentName = 'GalleryZoomIn';
    bindDirectiveInstance = inject(Bind, { self: true });

    gallery = inject(Gallery);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
