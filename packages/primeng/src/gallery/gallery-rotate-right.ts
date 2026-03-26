import { Directive, inject } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Gallery } from './gallery';
import { GalleryStyle } from './style/gallerystyle';
import type { GalleryRotateRightPassThrough } from 'primeng/types/gallery';

/**
 * GalleryRotateRight represents the rotate right action button.
 * @group Components
 */
@Directive({
    selector: '[pGalleryRotateRight]',
    standalone: true,
    providers: [GalleryStyle, { provide: PARENT_INSTANCE, useExisting: GalleryRotateRight }],
    host: {
        '[class]': "gallery.cx('rotateRight')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'rotateRight'",
        '[attr.data-action]': "'rotate-right'",
        '(click)': 'onClick()'
    },
    hostDirectives: [Bind]
})
export class GalleryRotateRight extends BaseComponent<GalleryRotateRightPassThrough> {
    componentName = 'GalleryRotateRight';

    gallery = inject(Gallery);

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(GalleryStyle);

    onClick() {
        this.gallery.handleClickAction('rotateRight');
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
