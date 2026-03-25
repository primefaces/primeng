import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';

/**
 * GalleryRotateRight represents the rotate right action button.
 * @group Components
 */
@Component({
    selector: 'p-gallery-rotate-right, p-galleryRotateRight',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('rotateRight')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'rotateRight'",
        '[attr.data-action]': "'rotate-right'",
        '(click)': "gallery.handleClickAction('rotateRight')"
    },
    hostDirectives: [Bind]
})
export class GalleryRotateRight {
    gallery = inject(Gallery);
}
