import { computed, Directive, inject } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Gallery } from './gallery';
import { GalleryStyle } from './style/gallerystyle';
import type { GalleryZoomOutPassThrough } from 'primeng/types/gallery';

/**
 * GalleryZoomOut represents the zoom out action button.
 * @group Components
 */
@Directive({
    selector: '[pGalleryZoomOut]',
    standalone: true,
    providers: [GalleryStyle, { provide: PARENT_INSTANCE, useExisting: GalleryZoomOut }],
    host: {
        '[class]': "gallery.cx('zoomOut')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'zoomOut'",
        '[attr.data-action]': "'zoom-out'",
        '[attr.disabled]': 'disabledState()',
        '(click)': 'onClick()'
    },
    hostDirectives: [Bind]
})
export class GalleryZoomOut extends BaseComponent<GalleryZoomOutPassThrough> {
    componentName = 'GalleryZoomOut';

    gallery = inject(Gallery);

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(GalleryStyle);

    disabledState = computed(() => (!this.gallery.activeItemTransform().zoomed ? true : null));

    onClick() {
        this.gallery.handleClickAction('zoomOut');
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
