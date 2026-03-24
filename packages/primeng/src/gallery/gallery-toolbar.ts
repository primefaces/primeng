import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from 'primeng/bind';
import { GalleryRoot } from './gallery';

/**
 * GalleryToolbar represents the toolbar container.
 * @group Components
 */
@Component({
    selector: 'p-gallery-toolbar, p-galleryToolbar',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('toolbar')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'toolbar'"
    },
    hostDirectives: [Bind]
})
export class GalleryToolbar {
    gallery = inject(GalleryRoot);
}
