import { Directive, inject } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Gallery } from './gallery';
import { GalleryStyle } from './style/gallerystyle';
import type { GalleryZoomTogglePassThrough } from 'primeng/types/gallery';

/**
 * GalleryZoomToggle represents the zoom toggle action button.
 * @group Components
 */
@Directive({
    selector: '[pGalleryZoomToggle]',
    standalone: true,
    providers: [GalleryStyle, { provide: PARENT_INSTANCE, useExisting: GalleryZoomToggle }],
    host: {
        '[class]': "gallery.cx('zoomToggle')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'zoomToggle'",
        '[attr.data-action]': "'zoom-toggle'",
        '(click)': 'onToggle()'
    },
    hostDirectives: [Bind]
})
export class GalleryZoomToggle extends BaseComponent<GalleryZoomTogglePassThrough> {
    componentName = 'GalleryZoomToggle';

    gallery = inject(Gallery);

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(GalleryStyle);

    onToggle() {
        this.gallery.handleClickAction(this.gallery.activeItemTransform().zoomed ? 'zoomOut' : 'zoomIn');
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
