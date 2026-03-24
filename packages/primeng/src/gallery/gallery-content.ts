import { afterNextRender, ChangeDetectionStrategy, Component, ElementRef, inject, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from 'primeng/bind';
import { GalleryRoot } from './gallery';

/**
 * GalleryContent represents the main content area of the gallery.
 * @group Components
 */
@Component({
    selector: 'p-gallery-content, p-galleryContent',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('content')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'content'"
    },
    hostDirectives: [Bind]
})
export class GalleryContent {
    gallery = inject(GalleryRoot);

    private _el = inject(ElementRef);

    constructor() {
        afterNextRender(() => {
            this.gallery.setContentEl(this._el.nativeElement);
        });
    }
}
