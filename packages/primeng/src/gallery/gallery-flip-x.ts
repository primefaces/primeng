import { Directive, inject } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Gallery } from './gallery';
import { GalleryStyle } from './style/gallerystyle';
import type { GalleryFlipXPassThrough } from 'primeng/types/gallery';

/**
 * GalleryFlipX represents the horizontal flip action button.
 * @group Components
 */
@Directive({
    selector: '[pGalleryFlipX]',
    standalone: true,
    providers: [GalleryStyle, { provide: PARENT_INSTANCE, useExisting: GalleryFlipX }],
    host: {
        '[class]': "gallery.cx('flipX')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'flipX'",
        '[attr.data-action]': "'flip-x'",
        '(click)': 'onClick()'
    },
    hostDirectives: [Bind]
})
export class GalleryFlipX extends BaseComponent<GalleryFlipXPassThrough> {
    componentName = 'GalleryFlipX';

    gallery = inject(Gallery);

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(GalleryStyle);

    onClick() {
        this.gallery.handleClickAction('flipX');
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
