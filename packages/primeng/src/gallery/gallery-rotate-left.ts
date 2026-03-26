import { Directive, inject } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Gallery } from './gallery';
import { GalleryStyle } from './style/gallerystyle';
import type { GalleryRotateLeftPassThrough } from 'primeng/types/gallery';

/**
 * GalleryRotateLeft represents the rotate left action button.
 * @group Components
 */
@Directive({
    selector: '[pGalleryRotateLeft]',
    standalone: true,
    providers: [GalleryStyle, { provide: PARENT_INSTANCE, useExisting: GalleryRotateLeft }],
    host: {
        '[class]': "gallery.cx('rotateLeft')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'rotateLeft'",
        '[attr.data-action]': "'rotate-left'",
        '(click)': 'onClick()'
    },
    hostDirectives: [Bind]
})
export class GalleryRotateLeft extends BaseComponent<GalleryRotateLeftPassThrough> {
    componentName = 'GalleryRotateLeft';

    gallery = inject(Gallery);

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(GalleryStyle);

    onClick() {
        this.gallery.handleClickAction('rotateLeft');
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
