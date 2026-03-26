import { Directive, inject } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Gallery } from './gallery';
import { GalleryStyle } from './style/gallerystyle';
import type { GalleryDownloadPassThrough } from 'primeng/types/gallery';

/**
 * GalleryDownload represents the download action button.
 * @group Components
 */
@Directive({
    selector: '[pGalleryDownload]',
    standalone: true,
    providers: [GalleryStyle, { provide: PARENT_INSTANCE, useExisting: GalleryDownload }],
    host: {
        '[class]': "gallery.cx('download')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'download'",
        '[attr.data-action]': "'download'",
        '(click)': 'onClick()'
    },
    hostDirectives: [Bind]
})
export class GalleryDownload extends BaseComponent<GalleryDownloadPassThrough> {
    componentName = 'GalleryDownload';

    gallery = inject(Gallery);

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(GalleryStyle);

    onClick() {
        this.gallery.handleClickAction('download');
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
