import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';

/**
 * GalleryDownload represents the download action button.
 * @group Components
 */
@Component({
    selector: 'p-gallery-download',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
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
export class GalleryDownload {
    gallery = inject(Gallery);
}
