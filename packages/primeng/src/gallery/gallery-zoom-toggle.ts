import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';
import type { GalleryZoomTogglePassThrough } from 'primeng/types/gallery';

/**
 * GalleryZoomToggle represents the zoom toggle action button.
 * @group Components
 */
@Component({
    selector: 'p-gallery-zoom-toggle',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    providers: [{ provide: PARENT_INSTANCE, useExisting: GalleryZoomToggle }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "gallery.cx('zoomToggle')",
        '[attr.data-scope]': "'gallery'",
        '[attr.data-part]': "'zoomToggle'",
        '[attr.data-action]': "'zoom-toggle'",
        '(click)': 'onToggle()'
    },
    hostDirectives: [Bind]
})
export class GalleryZoomToggle extends BaseComponent<GalleryZoomTogglePassThrough> {
    componentName = 'GalleryZoomToggle';
    bindDirectiveInstance = inject(Bind, { self: true });

    gallery = inject(Gallery);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    onToggle() {
        this.gallery.handleClickAction(this.gallery.activeItemTransform().zoomed ? 'zoomOut' : 'zoomIn');
    }
}
