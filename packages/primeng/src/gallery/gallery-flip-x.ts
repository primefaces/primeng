import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from 'primeng/bind';
import { GalleryRoot } from './gallery';

/**
 * GalleryFlipX represents the horizontal flip action button.
 * @group Components
 */
@Component({
    selector: 'p-gallery-flip-x, p-galleryFlipX',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('flipX')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'flipX'",
        '[attr.data-action]': "'flip-x'",
        '(click)': "gallery.handleClickAction('flipX')"
    },
    hostDirectives: [Bind]
})
export class GalleryFlipX {
    gallery = inject(GalleryRoot);
}
