import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from 'primeng/bind';
import { GalleryRoot } from './gallery';

/**
 * GalleryBackdrop represents the backdrop element for fullscreen mode.
 * @group Components
 */
@Component({
    selector: 'p-gallery-backdrop, p-galleryBackdrop',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('backdrop')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'backdrop'"
    },
    hostDirectives: [Bind]
})
export class GalleryBackdrop {
    gallery = inject(GalleryRoot);
}
