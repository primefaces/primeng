import { computed, Directive, inject } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Gallery } from './gallery';
import { GalleryStyle } from './style/gallerystyle';
import type { GalleryFullScreenPassThrough } from 'primeng/types/gallery';

/**
 * GalleryFullScreen represents the fullscreen toggle button.
 * @group Components
 */
@Directive({
    selector: '[pGalleryFullScreen]',
    standalone: true,
    providers: [GalleryStyle, { provide: PARENT_INSTANCE, useExisting: GalleryFullScreen }],
    host: {
        '[class]': "gallery.cx('fullScreen')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'fullScreen'",
        '[attr.data-action]': "'fullscreen'",
        '[attr.data-fullscreen]': 'dataFullscreen()',
        '(click)': 'onClick()'
    },
    hostDirectives: [Bind]
})
export class GalleryFullScreen extends BaseComponent<GalleryFullScreenPassThrough> {
    componentName = 'GalleryFullScreen';

    gallery = inject(Gallery);

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(GalleryStyle);

    dataFullscreen = computed(() => (this.gallery.isFullscreen() ? '' : null));

    onClick() {
        this.gallery.handleClickAction('toggleFullScreen');
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
