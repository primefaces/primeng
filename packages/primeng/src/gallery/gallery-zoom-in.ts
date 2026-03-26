import { computed, Directive, inject } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Gallery } from './gallery';
import { GalleryStyle } from './style/gallerystyle';
import type { GalleryZoomInPassThrough } from 'primeng/types/gallery';

/**
 * GalleryZoomIn represents the zoom in action button.
 * @group Components
 */
@Directive({
    selector: '[pGalleryZoomIn]',
    standalone: true,
    providers: [GalleryStyle, { provide: PARENT_INSTANCE, useExisting: GalleryZoomIn }],
    host: {
        '[class]': "gallery.cx('zoomIn')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'zoomIn'",
        '[attr.data-action]': "'zoom-in'",
        '[attr.disabled]': 'disabledState()',
        '(click)': 'onClick()'
    },
    hostDirectives: [Bind]
})
export class GalleryZoomIn extends BaseComponent<GalleryZoomInPassThrough> {
    componentName = 'GalleryZoomIn';

    gallery = inject(Gallery);

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(GalleryStyle);

    disabledState = computed(() => (this.gallery.activeItemTransform().zoomed ? true : null));

    onClick() {
        this.gallery.handleClickAction('zoomIn');
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
