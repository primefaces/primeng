import { afterNextRender, ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';
import type { GalleryContentPassThrough } from 'primeng/types/gallery';

/**
 * GalleryContent represents the main content area of the gallery.
 * @group Components
 */
@Component({
    selector: 'p-gallery-content',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    providers: [{ provide: PARENT_INSTANCE, useExisting: GalleryContent }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('content')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'content'"
    },
    hostDirectives: [Bind]
})
export class GalleryContent extends BaseComponent<GalleryContentPassThrough> {
    componentName = 'GalleryContent';

    bindDirectiveInstance = inject(Bind, { self: true });

    gallery = inject(Gallery);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    constructor() {
        super();
        afterNextRender(() => {
            this.gallery.setContentEl(this.$el);
        });
    }
}
