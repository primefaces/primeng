import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';

/**
 * GalleryFooter represents the footer section of the gallery.
 * @group Components
 */
@Component({
    selector: 'p-gallery-footer',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('footer')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'footer'"
    },
    hostDirectives: [Bind]
})
export class GalleryFooter {
    gallery = inject(Gallery);
}
