import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from 'primeng/bind';
import { GalleryRoot } from './gallery';

/**
 * GalleryFlipY represents the vertical flip action button.
 * @group Components
 */
@Component({
    selector: 'p-gallery-flip-y, p-galleryFlipY',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('flipY')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'flipY'",
        '[attr.data-action]': "'flip-y'",
        '(click)': "gallery.handleClickAction('flipY')"
    },
    hostDirectives: [Bind]
})
export class GalleryFlipY {
    gallery = inject(GalleryRoot);
}
