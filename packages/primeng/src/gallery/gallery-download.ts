import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';
import type { GalleryDownloadPassThrough } from 'primeng/types/gallery';

/**
 * GalleryDownload represents the download action button.
 * @group Components
 */
@Component({
    selector: 'p-gallery-download',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    providers: [{ provide: PARENT_INSTANCE, useExisting: GalleryDownload }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('download')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'download'",
        '[attr.data-action]': "'download'",
        '(click)': "gallery.handleClickAction('download')"
    },
    hostDirectives: [Bind]
})
export class GalleryDownload extends BaseComponent<GalleryDownloadPassThrough> {
    componentName = 'GalleryDownload';
    bindDirectiveInstance = inject(Bind, { self: true });

    gallery = inject(Gallery);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
