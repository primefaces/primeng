import { Directive, inject } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Gallery } from './gallery';
import { GalleryStyle } from './style/gallerystyle';
import type { GalleryFlipYPassThrough } from 'primeng/types/gallery';

/**
 * GalleryFlipY represents the vertical flip action button.
 * @group Components
 */
@Directive({
    selector: '[pGalleryFlipY]',
    standalone: true,
    providers: [GalleryStyle, { provide: PARENT_INSTANCE, useExisting: GalleryFlipY }],
    host: {
        '[class]': "gallery.cx('flipY')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'flipY'",
        '[attr.data-action]': "'flip-y'",
        '(click)': 'onClick()'
    },
    hostDirectives: [Bind]
})
export class GalleryFlipY extends BaseComponent<GalleryFlipYPassThrough> {
    componentName = 'GalleryFlipY';

    gallery = inject(Gallery);

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(GalleryStyle);

    onClick() {
        this.gallery.handleClickAction('flipY');
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
