import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Gallery } from './gallery';

/**
 * GalleryZoomToggle represents the zoom toggle action button.
 * @group Components
 */
@Component({
    selector: 'p-gallery-zoom-toggle',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
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
export class GalleryZoomToggle extends BaseComponent {
    gallery = inject(Gallery);

    onToggle() {
        this.gallery.handleClickAction(this.gallery.activeItemTransform().zoomed ? 'zoomOut' : 'zoomIn');
    }
}
