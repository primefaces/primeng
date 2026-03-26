import { afterNextRender, ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';

/**
 * GalleryContent represents the main content area of the gallery.
 * @group Components
 */
@Component({
    selector: 'p-gallery-content',
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
export class GalleryContent extends BaseComponent {
    gallery = inject(Gallery);

    constructor() {
        super();
        afterNextRender(() => {
            this.gallery.setContentEl(this.$el);
        });
    }
}
