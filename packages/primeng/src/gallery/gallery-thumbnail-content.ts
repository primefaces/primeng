import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';
import type { GalleryThumbnailContentPassThrough } from 'primeng/types/gallery';

/**
 * GalleryThumbnailContent represents the thumbnail carousel content area.
 * @group Components
 */
@Component({
    selector: 'p-gallery-thumbnail-content',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    providers: [{ provide: PARENT_INSTANCE, useExisting: GalleryThumbnailContent }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('thumbnailContent')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'thumbnailContent'"
    },
    hostDirectives: [Bind]
})
export class GalleryThumbnailContent extends BaseComponent<GalleryThumbnailContentPassThrough> {
    componentName = 'GalleryThumbnailContent';

    bindDirectiveInstance = inject(Bind, { self: true });

    gallery = inject(Gallery);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
