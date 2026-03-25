import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';

/**
 * GalleryRotateLeft represents the rotate left action button.
 * @group Components
 */
@Component({
    selector: 'p-gallery-rotate-left, p-galleryRotateLeft',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('rotateLeft')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'rotateLeft'",
        '[attr.data-action]': "'rotate-left'",
        '(click)': "gallery.handleClickAction('rotateLeft')"
    },
    hostDirectives: [Bind]
})
export class GalleryRotateLeft {
    gallery = inject(Gallery);
}
