import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';

/**
 * GalleryNext represents the next navigation button.
 * @group Components
 */
@Component({
    selector: 'p-gallery-next',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('next')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'next'",
        '(click)': 'gallery.handleNext()'
    },
    hostDirectives: [Bind]
})
export class GalleryNext {
    gallery = inject(Gallery);
}
