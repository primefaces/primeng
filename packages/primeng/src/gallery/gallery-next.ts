import { Directive, inject } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Gallery } from './gallery';
import { GalleryStyle } from './style/gallerystyle';
import type { GalleryNextPassThrough } from 'primeng/types/gallery';

/**
 * GalleryNext represents the next navigation button.
 * @group Components
 */
@Directive({
    selector: '[pGalleryNext]',
    standalone: true,
    providers: [GalleryStyle, { provide: PARENT_INSTANCE, useExisting: GalleryNext }],
    host: {
        '[class]': "gallery.cx('next')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'next'",
        '(click)': 'onClick()'
    },
    hostDirectives: [Bind]
})
export class GalleryNext extends BaseComponent<GalleryNextPassThrough> {
    componentName = 'GalleryNext';

    gallery = inject(Gallery);

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(GalleryStyle);

    onClick() {
        this.gallery.handleNext();
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
