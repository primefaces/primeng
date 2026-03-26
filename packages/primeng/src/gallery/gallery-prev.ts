import { Directive, inject } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Gallery } from './gallery';
import { GalleryStyle } from './style/gallerystyle';
import type { GalleryPrevPassThrough } from 'primeng/types/gallery';

/**
 * GalleryPrev represents the previous navigation button.
 * @group Components
 */
@Directive({
    selector: '[pGalleryPrev]',
    standalone: true,
    providers: [GalleryStyle, { provide: PARENT_INSTANCE, useExisting: GalleryPrev }],
    host: {
        '[class]': "gallery.cx('prev')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'prev'",
        '(click)': 'onClick()'
    },
    hostDirectives: [Bind]
})
export class GalleryPrev extends BaseComponent<GalleryPrevPassThrough> {
    componentName = 'GalleryPrev';

    gallery = inject(Gallery);

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(GalleryStyle);

    onClick() {
        this.gallery.handlePrev();
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
