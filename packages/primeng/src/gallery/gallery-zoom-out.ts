import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';
import type { GalleryZoomOutPassThrough } from 'primeng/types/gallery';

/**
 * GalleryZoomOut represents the zoom out action button.
 * @group Components
 */
@Component({
    selector: 'p-gallery-zoom-out',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    providers: [{ provide: PARENT_INSTANCE, useExisting: GalleryZoomOut }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('zoomOut')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'zoomOut'",
        '[attr.data-action]': "'zoom-out'",
        '[attr.disabled]': '!gallery.activeItemTransform().zoomed ? true : null',
        '(click)': "gallery.handleClickAction('zoomOut')"
    },
    hostDirectives: [Bind]
})
export class GalleryZoomOut extends BaseComponent<GalleryZoomOutPassThrough> {
    componentName = 'GalleryZoomOut';
    bindDirectiveInstance = inject(Bind, { self: true });

    gallery = inject(Gallery);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
