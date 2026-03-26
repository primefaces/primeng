import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';

/**
 * GalleryPrev represents the previous navigation button.
 * @group Components
 */
@Component({
    selector: 'p-gallery-prev',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('prev')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'prev'",
        '(click)': 'gallery.handlePrev()'
    },
    hostDirectives: [Bind]
})
export class GalleryPrev {
    gallery = inject(Gallery);
}
